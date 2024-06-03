import { faClipboardList, faDatabase, faEllipsisVertical, faPencil, faPlus, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Progress, User } from "@nextui-org/react";
import { Button, Dropdown, message, Popconfirm, Space } from 'antd';

function AdminHomePage() {

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const items = [
        {
            label: <p className="font-medium text-red-500">Xóa</p>,
            key: '0',
        },
    ];
    return (
        <>
            <div>
                <div className="m-4">
                    <div className="flex flex-wrap -mx-6">
                        <div className="w-full px-2 sm:w-1/2 xl:w-1/4">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div className="p-3 rounded-full bg-blue-700 bg-opacity-75">
                                    <FontAwesomeIcon
                                        className="h-5 w-6 text-white"
                                        icon={faDatabase}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">10</h4>
                                    <div className="text-gray-500 font-medium">Dữ liệu</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 sm:mt-0">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                                    <FontAwesomeIcon
                                        className="h-5 w-6 text-white"
                                        icon={faClipboardList}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">20</h4>
                                    <div className="text-gray-500 font-medium">Chuyên đề</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div className="p-3 rounded-full bg-purple-700 bg-opacity-75">
                                    <FontAwesomeIcon
                                        className="h-5 w-6 text-white"
                                        icon={faSchool}
                                    ></FontAwesomeIcon>
                                </div>
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">15</h4>
                                    <div className="text-gray-500 font-medium">Trường</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
                            <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                                    <FontAwesomeIcon
                                        className="h-5 w-6 text-white"
                                        icon={faUsers}
                                        flip="horizontal"
                                    ></FontAwesomeIcon>
                                </div>
                                <div className="mx-5">
                                    <h4 className="text-2xl font-semibold text-gray-700">120</h4>
                                    <div className="text-gray-500 font-medium">Người dùng</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    padding: 24,
                    minHeight: 450,
                    background: "#fff",
                    borderRadius: "10px"
                }}  >
                    <h1 className="mb-2 text-lg font-medium">Ghi chú</h1>
                    <div className="grid grid-cols-3">
                        <div className="col-span-3 md:col-span-1 px-0 md:px-5">
                            <h2 className="mb-2 text-medium font-medium text-center">Số phiếu</h2>
                            <div className="content">
                                <Progress
                                    label="Hẹn nộp phiếu ĐKXT"
                                    value={7}
                                    maxValue={10}
                                    color="primary"
                                    showValueLabel={true}
                                    className="max-w-md"
                                />
                                <Progress
                                    label="Quan tâm"
                                    value={2}
                                    maxValue={10}
                                    color="success"
                                    showValueLabel={true}
                                    className="max-w-md"
                                />
                                <Progress
                                    label="Theo dõi"
                                    value={4}
                                    maxValue={10}
                                    color="secondary"
                                    showValueLabel={true}
                                    className="max-w-md"
                                />
                                <Progress
                                    label="Chưa gặp"
                                    value={8}
                                    maxValue={10}
                                    color="warning"
                                    showValueLabel={true}
                                    className="max-w-md"
                                />
                                <Progress
                                    label="Đóng"
                                    value={3}
                                    maxValue={10}
                                    color="danger"
                                    showValueLabel={true}
                                    className="max-w-md"
                                />
                            </div>
                        </div>
                        <div className="col-span-3 md:col-span-1 px-0 md:px-6 mt-5 md:mt-0">
                            <div className="border-double border-5 border-gray-100 rounded-xl shadow-lg">
                                <div className="title w-full bg-green-400 rounded-t-lg text-white">
                                    <h2 className="mb-2 text-medium font-medium text-center py-2">Gọi điện</h2>
                                </div>
                                <div className="content min-h-64 max-h-64 overflow-y-auto">

                                    <div className="note my-2">
                                        <div className="grid grid-cols-12">
                                            <User className="col-span-2"
                                                avatarProps={{
                                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                                }}
                                            />
                                            <div className="bg-gray-100 col-span-9 h-10 rounded-t-xl rounded-ee-xl px-2">
                                                <p className="font-medium">Nguyễn Thị Lan</p>
                                                <p>0971144587 (Nguyễn Minh Tùng)</p>

                                            </div>
                                            <Dropdown className="col-span-1 m-auto"
                                                menu={{
                                                    items,
                                                }}
                                                trigger={['click']}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className="timeCreateNote text-end text-xs text-gray-400">
                                            15-02-2023 7:59
                                        </div>
                                    </div>
                                    <div className="note my-2">
                                        <div className="grid grid-cols-12">
                                            <User className="col-span-2"
                                                avatarProps={{
                                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                                }}
                                            />
                                            <div className="bg-gray-100 col-span-9 h-10 rounded-t-xl rounded-ee-xl px-2">
                                                <p className="font-medium">Nguyễn Thị Lan</p>
                                                <p>0971144587 (Nguyễn Minh Tùng)</p>

                                            </div>
                                            <Dropdown className="col-span-1 m-auto"
                                                menu={{
                                                    items,
                                                }}
                                                trigger={['click']}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className="timeCreateNote text-end text-xs text-gray-400">
                                            15-02-2023 7:59
                                        </div>
                                    </div>


                                </div>
                                <div className="createNote">
                                    <div className="groupInput mt-5 grid grid-cols-[1fr_1fr_auto] gap-0 border-t-1 px-2">
                                        <input type="text" className="outline-none h-10" placeholder="Nhập số điện thoại" />
                                        <input type="date" className="outline-none h-10" />
                                        <div className="flex"><FontAwesomeIcon fontSize={16} className="bg-green-400 m-auto p-2 rounded-full text-white ms-2 w-4" icon={faPlus} /></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-span-3 md:col-span-1 px-0 md:px-6 mt-5 md:mt-0">
                            <div className="border-double border-5 border-gray-100 rounded-xl shadow-lg">
                                <div className="title w-full bg-yellow-400 rounded-t-lg text-white">
                                    <h2 className="mb-2 text-medium font-medium text-center py-2">Ghi chú</h2>
                                </div>
                                <div className="content min-h-64 max-h-64 overflow-y-auto">

                                    <div className="note my-2">
                                        <div className="grid grid-cols-12">
                                            <User className="col-span-2"
                                                avatarProps={{
                                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                                }}
                                            />
                                            <div className="bg-gray-100 col-span-9 h-10 rounded-t-xl rounded-ee-xl px-2">
                                                <p className="font-medium">Nguyễn Thị Lan</p>
                                                <p>Lorem ipsum dolor sit amet.</p>

                                            </div>
                                            <Dropdown className="col-span-1 m-auto"
                                                menu={{
                                                    items,
                                                }}
                                                trigger={['click']}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className="timeCreateNote text-end text-xs text-gray-400">
                                            15-02-2023 7:59
                                        </div>
                                    </div>
                                    <div className="note my-2">
                                        <div className="grid grid-cols-12">
                                            <User className="col-span-2"
                                                avatarProps={{
                                                    src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                                                }}
                                            />
                                            <div className="bg-gray-100 col-span-9 h-10 rounded-t-xl rounded-ee-xl px-2">
                                                <p className="font-medium">Nguyễn Thị Lan</p>
                                                <p>Lorem ipsum dolor sit amet.</p>

                                            </div>
                                            <Dropdown className="col-span-1 m-auto"
                                                menu={{
                                                    items,
                                                }}
                                                trigger={['click']}
                                            >
                                                <a onClick={(e) => e.preventDefault()}>
                                                    <Space>
                                                        <FontAwesomeIcon icon={faEllipsisVertical} />
                                                    </Space>
                                                </a>
                                            </Dropdown>
                                        </div>
                                        <div className="timeCreateNote text-end text-xs text-gray-400">
                                            15-02-2023 7:59
                                        </div>
                                    </div>

                                </div>
                                <div className="createNote">
                                    <div className="groupInput mt-5 grid grid-cols-[1fr_auto] gap-0 border-t-1 px-5">
                                        <input type="text" className="outline-none  h-10 px-2" placeholder="Viết ghi chú" />
                                        <div className="flex"><FontAwesomeIcon fontSize={16} className="bg-yellow-400 m-auto p-2 rounded-full text-white" icon={faPencil} /></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div style={{
                    padding: 24,
                    minHeight: 450,
                    background: "#fff",
                    borderRadius: "10px"
                }} className="mt-4"  >
                    <h1 className="mb-2 text-lg font-medium">Tiến trình liên hệ</h1>

                </div>
            </div>

        </>
    );
}

export default AdminHomePage;