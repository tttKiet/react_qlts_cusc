import { faLocationDot, faMagnifyingGlass, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HomePage() {
    return (
        <>
            <div className="h-100 bg-[url('/image/background_test2.jpg')] min-h-screen bg-cover bg-center" >
                <div className="container mx-auto">
                    <div className="grid grid-cols-2 h-96">
                        <div className="leftContent flex flex-col items-center justify-center">
                            <div className="titleIntro">
                                <h1 className="text-4xl font-bold text-center text-blue-700" style={{ color: "#240750" }}>CHÀO MỪNG ĐẾN VỚI HỆ THỐNG QUẢN LÝ TUYỂN SINH</h1>
                            </div>
                            <div className="desIntro text-center mt-5 mb-5">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore cupiditate quidem officiis dicta vel sit, aut eum unde iure sed. Recusandae temporibus deserunt, aspernatur nostrum ipsum repudiandae totam adipisci. Laborum!</p>
                            </div>
                            <div className="search w-10/12">
                                <input type="text" className="p-3 w-full rounded-full bg-neutral-200 outline-none" placeholder="Vui lòng nhập số điện thoại" />
                                <button className="bg-blue-500 w-full p-3 rounded-full mt-5 text-white">Tra cứu thông tin</button>
                            </div>

                        </div>
                        <div className="rightContent">
                            <img src="/image/student.png" className="w-full max-w-96 m-auto" alt="" />
                        </div>
                    </div>
                </div>


            </div >
        </>
    );
}

export default HomePage;