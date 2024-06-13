import { faClipboardList, faDatabase, faEllipsisVertical, faPencil, faPlus, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Progress, Tooltip, User } from "@nextui-org/react";
import { Button, Dropdown, message, Popconfirm, Space } from 'antd';

function TimeLogin() {

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
                <div className="my-4">
                    <div className="grid gap-4 lg:gap-8 md:grid-cols-3">
                        <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 cursor-pointer">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <span>Tổng</span>
                                </div>
                                <div className="text-3xl dark:text-gray-100 flex">
                                    <Tooltip showArrow={true} className="capitalize" color="foreground" placement="right" content="Lượt truy cập" closeDelay={100}>
                                        1340
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                                    <span> 837 ngày 7 giờ 3 phút 7 giây</span>

                                </div>
                            </div>
                        </div>
                        <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 cursor-pointer">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <span>Admin</span>
                                </div>
                                <div className="text-3xl dark:text-gray-100 flex">
                                    <Tooltip showArrow={true} className="capitalize" color="foreground" placement="right" content="Lượt truy cập" closeDelay={100}>
                                        1340
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                                    <span>346 ngày 17 giờ 30 phút 42 giây</span>

                                </div>
                            </div>
                        </div>
                        <div className="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800 cursor-pointer">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <span>User Manager</span>
                                </div>
                                <div className="text-3xl dark:text-gray-100 flex">
                                    <Tooltip showArrow={true} className="capitalize" color="foreground" placement="right" content="Lượt truy cập" closeDelay={100}>
                                        1340
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                                    <span>490 ngày 13 giờ 32 phút 25 giây</span>
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
                            <div className="border-double border-5 border-gray-100 rounded-xl">
                                <div className="title w-full bg-green-400 rounded-t-lg text-white">
                                    <h2 className="mb-2 text-medium font-medium text-center py-2">Gọi điện</h2>
                                </div>
                                <div className="content min-h-64">

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
                            <div className="border-double border-5 border-gray-100 rounded-xl ">
                                <div className="title w-full bg-yellow-400 rounded-t-lg text-white">
                                    <h2 className="mb-2 text-medium font-medium text-center py-2">Ghi chú</h2>
                                </div>
                                <div className="content min-h-64">

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
            </div >

        </>
    );
}

export default TimeLogin;