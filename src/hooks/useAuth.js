import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction, doLogoutAction } from "../redux/account/accountSlide";
import { toast } from "react-toastify";
import { useState } from "react";
import { getProfileLoginStore } from "../redux/selector/accountSelector";

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileSelector = useSelector(getProfileLoginStore);

  const { data, error, mutate, isLoading } = useSWR("/api/v1/auth/profile", {
    dedupingInterval: 100,
    revalidateOnFocus: false,
    fallbackData: profileSelector,
    onSuccess(data, key, config) {
      // console.log("profile >>>>", data);
      let dataAccount = {};
      if (data?.MAADMIN) {
        dataAccount = {
          MAADMIN: data?.MAADMIN,
          TENDANGNHAP: data?.TENDANGNHAP,
          HOTEN: data?.admin?.HOTEN,
          EMAIL: data?.admin?.EMAIL,
          DIACHI: data?.admin?.DIACHI,
          ROLE: "ADMIN",
        };
      } else if (data?.SDT_KH) {
        dataAccount = {
          SDT_KH: data?.SDT_KH,
          TENDANGNHAP: data.TENDANGNHAP,
          HOTEN: data?.admin?.HOTEN,
          EMAIL: data.admin?.EMAIL,
          DIACHI: data.admin?.DIACHI,
          ROLE: "CUSTOMER",
        };
      } else {
        dataAccount = {
          SDT: data?.SDT,
          TENDANGNHAP: data?.TENDANGNHAP,
          HOTEN: data?.usermanager?.HOTEN,
          EMAIL: data?.usermanager?.EMAIL,
          DIACHI: data?.usermanager?.DIACHI,
          ROLE: "USER_MANAGER",
        };
      }

      dispatch(doLoginAction(dataAccount));
    },
    onError(error, key, config) {
      dispatch(doLogoutAction());
    },
  });

  async function login({ TENDANGNHAP, MATKHAU }) {
    try {
      const res = await AuthService.login({ TENDANGNHAP, MATKHAU });

      // console.log('res >>>> ', res);

      if (res && res.statusCode == 200) {
        // lưu accessToken vô local
        localStorage.setItem("access_token", res.data.token);
        //lưu data vô redux
        // cho này chỉnh lại 3 người dùng
        let dataAccount = {};
        if (res.data.account?.MAADMIN) {
          dataAccount = {
            MAADMIN: res.data.account?.MAADMIN,
            TENDANGNHAP: res.data.account?.TENDANGNHAP,
            SDT: res.data.account?.SDT,
            SDT_KH: res.data.account?.SDT_KH,
            HOTEN: res.data?.account?.admin?.HOTEN,
            EMAIL: res.data.account?.admin?.EMAIL,
            DIACHI: res.data.account?.admin?.DIACHI,
          };
        } else if (res.data.account?.SDT_KH) {
          dataAccount = {
            MAADMIN: res.data.account?.MAADMIN,
            TENDANGNHAP: res.data.account?.TENDANGNHAP,
            SDT: res.data.account?.SDT,
            SDT_KH: res.data.account?.SDT_KH,
            HOTEN: res.data?.account?.khachhang?.HOTEN,
            EMAIL: res.data.account?.khachhang?.EMAIL,
            DIACHI: res.data.account?.khachhang?.DIACHI,
            CCCD: res.data.account?.khachhang?.CCCD,
          };
        } else {
          dataAccount = {
            MAADMIN: res.data?.account?.MAADMIN,
            TENDANGNHAP: res.data?.account?.TENDANGNHAP,
            SDT: res.data?.account?.SDT,
            SDT_KH: res.data.account?.SDT_KH,
            HOTEN: res.data?.account?.usermanager?.HOTEN,
            EMAIL: res.data?.account?.usermanager?.EMAIL,
            DIACHI: res.data?.account?.usermanager?.DIACHI,
          };
        }

        dispatch(doLoginAction(dataAccount));
        toast.success("Đăng nhập thành công");
        // chuyển hướng
        if (res.data.account.MAADMIN) {
          navigate("/admin");
        } else if (res.data.account.SDT && res.data.account.MAADMIN == null) {
          navigate("/usermanager");
        } else {
          navigate("/");
        }

        await mutate();
        return res;
      }
    } catch (err) {
      console.log("err", err);
      toast.error("Đăng nhập thất bại");
    }
  }

  async function logout() {
    await AuthService.logout();
    dispatch(doLogoutAction());
    toast.success("Đăng xuất thành công");
    navigate("/login");
  }

  return {
    profile: data,
    isLoading,
    login,
    logout,
  };
}

export default useAuth;
