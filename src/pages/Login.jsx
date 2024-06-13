import { Input } from "@nextui-org/react";
import { useState } from "react";

// import AuthService from "../services/AuthService";
import { useAuth } from "../hooks";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const haneleLogin = async () => {
    const res = await login({
      TENDANGNHAP: username,
      MATKHAU: password,
    });
  };

  return (
    <div className="container">
      <section className="gradient-form h-full dark:bg-neutral-700 mt-10">
        <div className="container h-full p-10">
          <div className="flex h-full rounded-lg flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-2xl">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  <div className="hidden items-center lg:flex rounded-l-lg lg:w-6/12 bg-[url('/image/background_form.jpg')] bg-cover bg-center">
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <div className="flex">
                        <img
                          src="/image/CUSC_No_Background.png"
                          className="w-72 m-auto"
                          alt=""
                        />
                      </div>
                      <p className="text-center">
                        Hệ thống quản lý tuyển sinh giúp bạn dễ dàng quản lý và truy xuất thông tin học sinh, đảm bảo hiệu quả và an toàn, mang đến trải nghiệm tối ưu cho người dùng.

                      </p>
                    </div>
                  </div>

                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 p-12">
                      {/*Logo*/}
                      <div className="text-center">
                        <h1 className="text-4xl font-bold">ĐĂNG NHẬP</h1>
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          Hệ thống quản lý tuyển sinh
                        </h4>
                      </div>

                      <form>
                        <p className="mb-4">Vùi lòng nhập tài khoản</p>
                        {/*Username input*/}
                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init=""
                        >
                          <Input
                            type="text"
                            label="Tên đăng nhập"
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        {/*Password input*/}
                        <div
                          className="relative mb-4"
                          data-twe-input-wrapper-init=""
                        >
                          <Input
                            type="password"
                            label="Mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        {/*Submit button*/}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            type="button"
                            onClick={haneleLogin}
                            className="mb-3 inline-block w-full rounded-lg text-white p-3 text-lg bg-gradient-to-r from-slate-500 to-slate-800"
                          >
                            Đăng nhập
                          </button>
                          {/*Forgot password link*/}
                          <a href="#!">Quên mật khẩu</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;