import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
    return (
        <>
            <footer className="absolute bg-white shadow dark:bg-gray-900 w-100 min-w-full bottom-0">
                <div className="w-full mx-auto px-10 py-2">
                    <div className="grid grid-cols-3">
                        <div>
                            <img
                                src="/image/Logo.png"
                                className="w-44 m-auto"
                                alt="Flowbite Logo"
                            />
                            <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil amet molestias voluptas expedita, tempore placeat consequuntur at temporibus quam illo.</p>
                        </div>


                        <div className="centerInfo">
                            <h1 className="text-lg font-bold text-center">TRUNG TÂM CÔNG NGHỆ PHẦN MỀM ĐẠI HỌC CẦN THƠ</h1>
                            <p className="text-center"><FontAwesomeIcon icon={faLocationDot} className="mr-2" />Khu III, Đại Học Cần Thơ, 01 Lý Tự Trọng, Q. Ninh Kiều, TP. Cần Thơ</p>
                            <p className="text-center"><FontAwesomeIcon icon={faPhone} className="mr-2" /> 0292 383 5581</p>
                            <p className="text-center"><span className="font-bold">Zalo</span> 0868 952 535</p>
                            <p className="text-center"><FontAwesomeIcon icon={faEnvelope} className="mr-2" />tuyensinh@cusc.ctu.edu.vn</p>
                        </div>

                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.7933383849145!2d105.77767954957537!3d10.033905575169303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0881f9a732075%3A0xfa43fbeb2b00ca73!2sCUSC%20-%20Cantho%20University%20Software%20Center!5e0!3m2!1svi!2s!4v1654614294824!5m2!1svi!2s"
                                width="100%"
                                height={180}
                                style={{ border: 0, marginTop: 10 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;