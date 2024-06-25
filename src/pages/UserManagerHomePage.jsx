import { faClipboardList, faDatabase, faEllipsisVertical, faPencil, faPhone, faPlus, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Dropdown, message, Popconfirm, Space } from 'antd';
import useSWR from "swr";
import { API_THEMATIC } from "../constants";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    useDisclosure,
    Tooltip, User
} from "@nextui-org/react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { Space } from "antd";
const INITIAL_VISIBLE_COLUMNS = ["id", "tenchuyende", "tentruong", "usermanager", "ngaythongbao", "ngaytochuc", "noidung", "actions"];
function UserManagerHomePage() {

    const { data: dataThematic, mutate: fetchDataThematic } = useSWR(`${API_THEMATIC}/readAll`)
    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    const [filterSearchName, setFillterSearchName] = useState('')
    const data = useMemo(() => {
        return dataThematic?.map((thematic, index) => {
            return {
                id: index + 1,
                tenchuyende: thematic?.TENCHUYENDE,
                tentruong: thematic?.MATRUONG,
                usermanager: thematic?.usermanager?.HOTEN || 'Trống',
                ngaythongbao: thematic?.THOIGIANTHONGBAO,
                ngaytochuc: thematic?.THOIGIANTOCHUCCHUYENDE,
                noidung: thematic?.NOIDUNG

            }
        }) || []
    }, [dataThematic])

    const columns = [
        { name: "STT", uid: "id", sortable: true },
        { name: "Tên chuyên đề", uid: "tenchuyende" },
        { name: "Tên trường", uid: "tentruong", },
        { name: "User manager", uid: "usermanager" },
        { name: "Ngày thông báo", uid: "ngaythongbao", sortable: true },
        { name: "Ngày tổ chức", uid: "ngaytochuc", sortable: true },
        { name: "Nội dung", uid: "noidung" },
        { name: "Tùy chọn", uid: "actions" },

    ];

    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [total, setTotal] = useState(1);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterSearchName);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...data];
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((data) =>
                data.tenchuyende.toLowerCase().includes(filterSearchName.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [data, filterSearchName]);

    const items = useMemo(() => {

        return filteredItems;
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const paginatedItems = useMemo(() => {
        const startIdx = (page - 1) * rowsPerPage;
        const endIdx = startIdx + rowsPerPage;
        return sortedItems.slice(startIdx, endIdx);
    }, [sortedItems, page, rowsPerPage]);

    const renderCell = useCallback((thematic, columnKey) => {
        const cellValue = thematic[columnKey];

        switch (columnKey) {
            case "thoigianphan":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>

                    </div>
                );
            case "tentruong":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">

                    </div>
                );

            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        if (dataThematic) {
            const totalPages = Math.ceil(dataThematic.length / rowsPerPage);
            setTotal(totalPages > 0 ? totalPages : 1);
        }
    }, [dataThematic, rowsPerPage]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback(
        (value) => {
            if (value) {
                setFillterSearchName(value)
                setPage(1);
            } else {
                setFillterSearchName("")

            }
        }, []);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    page={page}

                    total={total}

                    variant="light"
                    onChange={(e) => {
                        setPage(e)
                    }}
                />
                <div className="flex justify-between items-center mb-2 gap-5">
                    <span className="text-default-400 text-small">Total {data.length} data</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                            value={rowsPerPage}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [items.length, page, hasSearchFilter, rowsPerPage, total]);

    return (
        <>
            <div>
                <div class="grid gap-4 lg:gap-8 md:grid-cols-3 pb-5">
                    <div class="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div class="space-y-5">
                            <div className="flex gap-4">
                                <div className="my-auto">
                                    <FontAwesomeIcon icon={faPhone} size="xl" className="border-1 p-3 rounded-lg bg-blue-600 text-white" />
                                </div>
                                <div>
                                    <div
                                        class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <span>Liên hệ lần 1</span>
                                    </div>

                                    <div class="text-2xl dark:text-gray-100">
                                        4/125
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-blue-500 cursor-pointer">
                                <span>Danh sách chi tiết</span>
                            </div>
                        </div>
                    </div>

                    <div class="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div class="space-y-2">
                            <div
                                class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">
                                <span>Liên hệ lần 2</span>
                            </div>

                            <div class="text-3xl dark:text-gray-100">
                                1340
                            </div>

                            <div class="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-blue-500 cursor-pointer">
                                <span>Danh sách chi tiết</span>
                            </div>
                        </div>

                    </div>

                    <div class="relative p-6 rounded-2xl bg-white shadow dark:bg-gray-800">
                        <div class="space-y-2">
                            <div
                                class="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-gray-500 dark:text-gray-400">

                                <span>Liên hệ lần 3</span>
                            </div>

                            <div class="text-3xl dark:text-gray-100">
                                3543
                            </div>
                            <div class="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-blue-500 cursor-pointer">
                                <span>Danh sách chi tiết</span>
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
                        <div className="col-span-3 md:col-span-2 px-0 md:px-5">
                            <Table
                                // isCompact
                                removeWrapper
                                aria-label="Example table with custom cells, pagination and sorting"
                                bottomContent={bottomContent}
                                bottomContentPlacement="outside"
                                checkboxesProps={{
                                    classNames: {
                                        wrapper: "after:bg-foreground after:text-background text-background",
                                    },
                                }}
                                // classNames={{
                                //     base: "max-h-[520px] overflow-scroll",
                                // }}
                                sortDescriptor={sortDescriptor}

                                topContentPlacement="outside"
                                onSortChange={setSortDescriptor}
                            >
                                <TableHeader columns={headerColumns}>
                                    {(column) => (
                                        <TableColumn
                                            key={column.uid}
                                            align={column.uid === "actions" ? "center" : "start"}
                                            allowsSorting={column.sortable}
                                        >
                                            {column.name}
                                        </TableColumn>
                                    )}
                                </TableHeader>
                                <TableBody emptyContent={"Không tìm thấy người dùng"} items={paginatedItems}>
                                    {(item) => (
                                        <TableRow key={item.madoan}>
                                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
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
                                            <div className="bg-gray-100 col-span-9 rounded-t-xl rounded-ee-xl px-2 h-auto">
                                                <p className="font-medium">Nguyễn Thị Lan</p>
                                                <p>Lorem ipsum dolor sit amet.</p>

                                            </div>
                                            <Dropdown className="col-span-1 m-auto"
                                                menu={{
                                                    //         {
                                                    //             label: <p className="font-medium text-red-500">Xóa</p>,
                                                    // key: '0',
                                                    //         },
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
                                            <div className="bg-gray-100 col-span-9 rounded-t-xl rounded-ee-xl px-2 h-auto">
                                                <p className="font-medium">Nguyễn Thị Lan</p>
                                                <p>Lorem ipsum dolor sit amet.</p>

                                            </div>
                                            <Dropdown className="col-span-1 m-auto"
                                                menu={{
                                                    // items,
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
            </div >

        </>
    );
}

export default UserManagerHomePage;