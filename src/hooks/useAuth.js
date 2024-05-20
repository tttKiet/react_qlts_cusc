import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction, doLogoutAction } from "../redux/account/accountSlide";
import { toast } from "react-toastify";

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login({ TENDANGNHAP, MATKHAU }) {
    try {
      const res = await AuthService.login({ TENDANGNHAP, MATKHAU });
      console.log("res", res);
      if (res && res.statusCode == 200) {
        //lưu data vô redux
        let dataAccount = {};
        if (res.data.account?.MAADMIN) {
          dataAccount = {
            MAADMIN: res.data.account?.MAADMIN,
            TENDANGNHAP: res.data.account?.TENDANGNHAP,
            SDT: res.data.account?.SDT,
            HOTEN: res.data?.account?.admin?.HOTEN,
            EMAIL: res.data.account?.admin?.EMAIL,
            DIACHI: res.data.account?.admin?.DIACHI,
          };
        } else {
          dataAccount = {
            MAADMIN: res.data?.account?.MAADMIN,
            TENDANGNHAP: res.data?.account?.TENDANGNHAP,
            SDT: res.data?.account?.SDT,
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
          navigate("/admin/manager/user");
        } else {
          navigate("/");
        }

        await mutate();
        return res;
      }
    } catch (err) {
      console.log("err", err);
      toast.error(err.message); 
    }
  }

  async function logout() {
    const res = await AuthService.logout();
    await mutate(null, false);
    distpatch(logoutStore());

    return res;
  }

  return {
    login,
    logout,
  };
}

export default useAuth;
