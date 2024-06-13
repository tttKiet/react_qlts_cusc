import { faLocationDot, faMagnifyingGlass, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

function HomePage() {
    const navigate = useNavigate();
    const [phone, setPhone] = useState("");
    const handleSearch = () => {
        const phoneRegex = /^0\d{9}$/;
        if (phone && phoneRegex.test(phone)) {
            navigate(`/thongtinkhachhang/${phone}`);
        } else {
            toast.warning("Số điện thoại sai định dạng");
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    return (
        <>
            <div className="h-100 bg-[url('/image/background_test2.jpg')] min-h-screen bg-cover bg-center" >
                <div className="container mx-auto">
                    <div className="grid grid-cols-2" style={{ minHeight: "100vh" }}>
                        <div className="leftContent flex flex-col items-center justify-center">
                            <div className="titleIntro">
                                <h1 className="text-4xl font-bold text-center text-blue-700" style={{ color: "#240750" }}>CHÀO MỪNG ĐẾN VỚI HỆ THỐNG QUẢN LÝ TUYỂN SINH</h1>
                            </div>
                            <div className="desIntro text-center mt-5 mb-5">
                                <p>Đến với chúng tôi, quy trình tuyển sinh trở nên dễ dàng và hiệu quả hơn bao giờ hết. Với giao diện thân thiện, bảo mật cao và nhiều tính năng hữu ích, chúng tôi cam kết mang đến trải nghiệm tốt nhất cho cả học sinh và nhà quản lý.</p>
                            </div>
                            <div className="search w-10/12">
                                <input type="text" className="py-3 px-5 w-full rounded-full bg-neutral-200 outline-none" value={phone}
                                    onChange={(e) => setPhone(e.target.value)} placeholder="Vui lòng nhập số điện thoại" onKeyDown={handleEnter} />
                                <button onClick={handleSearch} className="bg-blue-500 w-full p-3 rounded-full mt-5 text-white">Tra cứu thông tin</button>
                            </div>

                        </div>
                        <div className="rightContent h-full flex flex-col ">
                            <img src="/image/download.png" className="w-full max-w-md mt-auto ms-auto me-auto" alt="" />
                        </div>
                    </div>
                </div>


            </div >
        </>
    );
}

export default HomePage;