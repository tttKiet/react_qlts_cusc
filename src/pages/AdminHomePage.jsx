import { faClipboardList, faDatabase, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AdminHomePage() {
    return (
        <>
            <div>
                <div class="m-6">
                    <div class="flex flex-wrap -mx-6">
                        <div class="w-full px-2 sm:w-1/2 xl:w-1/4">
                            <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div class="p-3 rounded-full bg-blue-700 bg-opacity-75">
                                    <FontAwesomeIcon className="h-5 w-6 text-white" icon={faDatabase} />
                                </div>

                                <div class="mx-5">
                                    <h4 class="text-2xl font-semibold text-gray-700">10</h4>
                                    <div class="text-gray-500 font-medium">Dữ liệu</div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 sm:mt-0">
                            <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div class="p-3 rounded-full bg-green-600 bg-opacity-75">
                                    <FontAwesomeIcon className="h-5 w-6 text-white" icon={faClipboardList} />
                                </div>

                                <div class="mx-5">
                                    <h4 class="text-2xl font-semibold text-gray-700">20</h4>
                                    <div class="text-gray-500 font-medium">Chuyên đề</div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                            <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div class="p-3 rounded-full bg-purple-700 bg-opacity-75">
                                    <FontAwesomeIcon className="h-5 w-6 text-white" icon={faSchool} />
                                </div>

                                <div class="mx-5">
                                    <h4 class="text-2xl font-semibold text-gray-700">15</h4>
                                    <div class="text-gray-500 font-medium">Trường</div>
                                </div>
                            </div>
                        </div>
                        <div class="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                            <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div class="p-3 rounded-full bg-pink-600 bg-opacity-75">
                                    <FontAwesomeIcon className="h-5 w-6 text-white" icon={faUsers} flip="horizontal" />
                                </div>

                                <div class="mx-5">
                                    <h4 class="text-2xl font-semibold text-gray-700">120</h4>
                                    <div class="text-gray-500 font-medium">Người dùng</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminHomePage;