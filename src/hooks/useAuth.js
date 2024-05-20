import useSWR from "swr";
import AuthService from "../service/AuthService";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction, doLogoutAction } from "../redux/account/accountSlide";

function useAuth() {
  const distpatch = useDispatch();

  async function login({ TENDANGNHAP, MATKHAU }) {
    const res = await AuthService.login({ TENDANGNHAP, MATKHAU });
    if (res?.user?.role?.keyType === "admin") {
      router.push("/admin");
    } else if (res?.user?.role?.keyType === "doctor") {
      router.push("/doctor");
    } else if (res?.user?.role?.keyType === "hospital_manager") { 
      router.push("/staff");
    } else {
      router.push("/");
    }

    await mutate();
    return res;  
  }

  async function logout() {
    const res = await AuthService.logout();
    await mutate(null, false);
    distpatch(logoutStore());

    return res;
  }

  return {
    login,
  };
}

export default useAuth;
