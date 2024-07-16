import { faClipboardList, faDatabase, faEllipsisVertical, faPencil, faPlus, faSchool, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Dropdown, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, DropdownTrigger, DropdownMenu, Button, DropdownItem, Chip, Autocomplete, AutocompleteItem, DateRangePicker } from "@nextui-org/react";
import { API_AUTH, API_USER } from "../constants";
import useSWR from "swr";
import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { SearchIcon } from "../components/icons/SearchIcon";
import debounce from "lodash.debounce";
const INITIAL_VISIBLE_COLUMNS = ["id", "hoten", "sdt", "role", "dangnhap", "dangxuat", "tongthoigian"];
function TimeLogin() {
    const [infoUser, setInfoUser] = useState();
    const [dateSelected, setDateSelected] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const hanldeSetInfor = (value) => {
        let formatInfor = "";
        if (value && value.startsWith("AD")) {
            formatInfor = `maadmin=${value}`;
        } else if (value) {
            formatInfor = `sdt=${value}`;
        }
        setInfoUser(formatInfor);

    }

    const handleSetDate = (value) => {
        setStartDate(value.start)
        setEndDate(value.end)
    }

    const { data: dataTime, mutate: fetchDataTime } = useSWR(`${API_AUTH}/time-login?${infoUser || ""}&startDate=${startDate || ""}&endDate=${endDate || ""}`);
    const { data: dataTimeDashBoard, mutate: fetchDataTimeDashBoard } = useSWR(`${API_AUTH}/time-login-dashboard`);
    const { data: listUser, mutate: fetchUser } = useSWR(`${API_USER}`)

    function convertSecondsToDHMS(seconds) {
        const duration = moment.duration(seconds, 'seconds');
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const secs = duration.seconds();
        return `${days} ngày ${hours} giờ ${minutes} phút ${secs} giây`;
    }

    function convertSecondsToHMS(seconds) {
        const duration = moment.duration(seconds, 'seconds');
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        const secs = duration.seconds();
        return `${hours} giờ ${minutes} phút ${secs} giây`;
    }

    const [filterSearchName, setFillterSearchName] = useState("");
    const data = useMemo(() => {
        return (
            dataTime?.result?.map((time, index) => {
                return {
                    id: index + 1,
                    hoten: time?.admin?.HOTEN || time?.usermanager?.HOTEN,
                    sdt: time?.admin?.SDT || time?.usermanager?.SDT,
                    role: time?.usermanager ? "usermanager" : time?.admin ? "admin" : "other",
                    dangnhap: moment(time?.dangnhap, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss"),
                    dangxuat: moment(time?.dangxuat, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY HH:mm:ss"),
                    tongthoigian: convertSecondsToHMS(time?.tongthoigian),
                };
            }) || []
        );
    }, [dataTime]);

    const columns = [
        { name: "STT", uid: "id", sortable: true },
        { name: "Họ và tên", uid: "hoten", sortable: true },
        { name: "Số điện thoại", uid: "sdt" },
        { name: "Loại người dùng", uid: "role", sortable: true },
        { name: "Thời gian đăng nhập", uid: "dangnhap" },
        { name: "Thời gian đăng xuất", uid: "dangxuat" },
        { name: "Tổng thời gian", uid: "tongthoigian" },
    ];

    const [visibleColumns, setVisibleColumns] = useState(
        new Set(INITIAL_VISIBLE_COLUMNS)
    );
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

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid)
        );
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...data];
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((data) =>
                data.hoten.toLowerCase().includes(filterSearchName.toLowerCase())
            );
            setRowsPerPage(100);
        } else {
            setRowsPerPage(5);
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

    const renderCell = useCallback((time, columnKey) => {
        const cellValue = time[columnKey];
        switch (columnKey) {
            case "hoten":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>
                    </div>
                );
            case "sdt":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>
                    </div>
                );
            case "role":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">
                            {cellValue === "admin" ? (
                                <Chip color="primary" variant="flat">
                                    Admin
                                </Chip>
                            ) : cellValue === "usermanager" ? (
                                <Chip color="success" variant="flat">
                                    Usermanager
                                </Chip>
                            ) : (
                                <Chip color="danger" variant="flat">
                                    Khác
                                </Chip>
                            )}
                        </span>
                    </div>
                );
            case "dangnhap":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>
                    </div>
                );
            case "dangxuat":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>
                    </div>
                );
            case "tongthoigian":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFillterSearchName(value);
            setPage(1);
        } else {
            setFillterSearchName("");
        }
    }, []);

    useEffect(() => {
        if (dataTime) {
            const totalPages = Math.ceil(dataTime.totalRows / rowsPerPage);
            setTotal(totalPages > 0 ? totalPages : 1);
        }
    }, [dataTime, rowsPerPage]);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <div>
                        <Input
                            isClearable
                            classNames={{
                                base: "w-full sm:max-w-[250px]",
                                inputWrapper: "border-1",
                            }}
                            placeholder="Tìm kiếm bằng tên"
                            size="sm"
                            startContent={<SearchIcon className="text-default-300" />}
                            // value={filterSearchName}
                            variant="bordered"
                            onClear={() => setFillterSearchName("")}
                            onValueChange={debounce(onSearchChange, 300)}
                        />
                        <div className={infoUser ? '' : 'hidden'}>
                            <p className="font-medium mt-2">Tổng thời gian: {convertSecondsToDHMS(dataTime?.totalTime)}</p>
                        </div>

                    </div>
                    <div className="flex gap-3 mb-auto">

                        <Autocomplete
                            aria-labelledby="user-label"
                            placeholder="Chọn người dùng"
                            className="max-w-xs mt-2 md:mt-0"
                            variant="bordered"
                            size="sm"
                            value={infoUser}
                            onSelectionChange={(value) => hanldeSetInfor(value)}
                        >
                            {listUser?.data?.map((user) => (
                                <AutocompleteItem
                                    key={user?.admin?.MAADMIN || user?.usermanager?.SDT}
                                    value={user?.TENDANGNHAP}
                                >
                                    {user?.admin?.HOTEN || user?.usermanager?.HOTEN}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>

                        <DateRangePicker
                            aria-labelledby="date-label"
                            variant="bordered"
                            size="sm"
                            value={dateSelected}
                            onChange={(value) => handleSetDate(value)}
                        />

                    </div>
                </div>
            </div>
        );
    }, [
        filterSearchName,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        items.length,
        hasSearchFilter,
        listUser
    ]);


    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={total}
                    variant="light"
                    onChange={(e) => {
                        setPage(e);
                    }}
                />
                <div className="flex justify-between items-center gap-5">
                    <span className="text-default-400 text-small">
                        Total {data.length} data
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [items.length, page, hasSearchFilter, rowsPerPage, total]);

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
                                        {dataTimeDashBoard?.totalAccess}
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                                    <span>{convertSecondsToDHMS(dataTimeDashBoard?.totalTime)}</span>

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
                                        {dataTimeDashBoard?.totalTimeAllADMIN_Access}
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                                    <span>{convertSecondsToDHMS(dataTimeDashBoard?.totalTimeAllADMIN)}</span>

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
                                        {dataTimeDashBoard?.totalTimeAllUM_Access}
                                    </Tooltip>
                                </div>
                                <div className="flex items-center space-x-1 rtl:space-x-reverse text-sm font-medium text-green-600">
                                    <span>{convertSecondsToDHMS(dataTimeDashBoard?.totalTimeAllUM)}</span>
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
                    <h1 className="mb-2 text-lg font-medium">Danh sách đăng nhập</h1>
                    <Table
                        removeWrapper
                        aria-label="Example table with custom cells, pagination and sorting"
                        bottomContent={bottomContent}
                        bottomContentPlacement="outside"
                        sortDescriptor={sortDescriptor}
                        topContent={topContent}
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
                        <TableBody emptyContent={"Không tìm thấy dữ liệu"} items={paginatedItems}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div >

        </>
    );
}

export default TimeLogin;