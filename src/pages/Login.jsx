import { Input } from "@nextui-org/react";

function Login() {
    return (
        <>
            <div className="container">
                <section className="gradient-form h-full dark:bg-neutral-700 mt-5">
                    <div className="container h-full p-10">
                        <div className="flex h-full rounded-lg flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-2xl">
                            <div className="w-full">
                                <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                                    <div className="g-0 lg:flex lg:flex-wrap">

                                        <div
                                            className="hidden items-center lg:flex rounded-l-lg lg:w-6/12 bg-[url('/image/background_form.jpg')] bg-cover bg-center"


                                        >
                                            <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                                                <div className="flex">
                                                    <img src="/image/Logo.png" className="w-72 m-auto" alt="" />
                                                </div>
                                                <p className="text-sm text-center">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                                                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                    laboris nisi ut aliquip ex ea commodo consequat.
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
                                                    <div className="relative mb-4" data-twe-input-wrapper-init="">
                                                        <Input type="text" label="Tên đăng nhập" />
                                                    </div>
                                                    {/*Password input*/}
                                                    <div className="relative mb-4" data-twe-input-wrapper-init="">
                                                        <Input type="password" label="Mật khẩu" />
                                                    </div>
                                                    {/*Submit button*/}
                                                    <div className="mb-12 pb-1 pt-1 text-center">
                                                        <button
                                                            className="mb-3 inline-block w-full rounded-lg text-white p-3 text-lg bg-gradient-to-r from-slate-500 to-slate-800"
                                                            type="button"

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
                    </div >
                </section >

            </div >
        </>
    );
}

export default Login;