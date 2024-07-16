import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    Chip,
    Pagination,
    CardHeader,
    CardBody,
    Card,
    Tooltip,
    Avatar,
} from "@nextui-org/react";
import { SearchIcon } from "../components/icons/SearchIcon";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";
import useSWR from 'swr'
import { API_USER, API_DATA } from "../constants";
import debounce from "lodash.debounce";
import FormUser from "../components/body/FormUser";
import UserService from "../service/UserService";
import { EyeIcon } from "../components/icons/EyeIcon";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
const INITIAL_VISIBLE_COLUMNS = ["id", "madoan", "tentruong", "sodong", "lienhe", "ngayphanquyen", "ngaytaodoan", "actions"];
function ProfileUser() {

    const { id } = useParams();
    const [phoneUM, setPhoneUM] = useState("")
    const { data: dataProfile, mutate } = useSWR(`${API_USER}/read?${id}`)
    useEffect(() => {
        if (dataProfile && dataProfile.usermanager) {
            setPhoneUM(dataProfile.usermanager.SDT)
        } else {
            setPhoneUM("")
        }
    }, [dataProfile])
    const { data: dataSegmentUsermanager, mutate: fetchDataSegmentUsermanager } = useSWR(`${API_DATA}/segment?SDT_UM=${phoneUM}`)

    const [filterSearchName, setFillterSearchName] = useState('')

    const data = useMemo(() => {
        return dataSegmentUsermanager?.map((segment, index) => {
            return {
                id: index + 1,
                madoan: segment?.MaPQ,
                tentruong: segment?.truong?.TENTRUONG,
                sodong: segment?.Sodong,
                lienhe: segment?.TRANGTHAILIENHE,
                ngayphanquyen: segment?.THOIGIANPQ,
                ngaytaodoan: segment?.createdAt,

            }
        }) || []
    }, [dataSegmentUsermanager])

    const columns = [
        { name: "STT", uid: "id", sortable: true },
        { name: "Mã đoạn", uid: "madoan", sortable: true },
        { name: "Tên trường", uid: "tentruong" },
        { name: "Số dòng", uid: "sodong", sortable: true },
        { name: "Lần liên hệ", uid: "lienhe" },
        { name: "Ngày phân quyền", uid: "ngayphanquyen" },
        { name: "Ngày tạo đoạn", uid: "ngaytaodoan" },
        { name: "Actions", uid: "actions" },

    ];

    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
                data.madoan.toLowerCase().includes(filterSearchName.toLowerCase())
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

    const renderCell = useCallback((segment, columnKey) => {
        const cellValue = segment[columnKey];

        switch (columnKey) {
            case "madoan":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "tentruong":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>

                    </div>
                );

            case "sodong":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "lienhe":
                return (
                    <div className="relative flex items-center gap-2">
                        {!cellValue ? (
                            <Chip variant="flat" radius="sm" size="md" color="warning">
                                Đóng
                            </Chip>
                        ) : (
                            <Chip variant="flat" radius="sm" size="md" color="success">
                                Lần {cellValue}
                            </Chip>
                        )}
                    </div>
                );
            case "ngayphanquyen":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue ? moment(cellValue).format("DD-MM-YYYY") : ''}</span>

                    </div>
                );
            case "ngaytaodoan":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{moment(cellValue).format("DD-MM-YYYY")}</span>

                    </div>
                );
            case "actions":
                return (
                    <div className="flex flex-col justify-center">
                        <Tooltip content="xem danh sách">
                            <Link
                                to={`/admin/division/${segment.madoan}`}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EyeIcon />
                            </Link>
                        </Tooltip>

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

    const onSearchChange = useCallback(
        (value) => {
            if (value) {
                setFillterSearchName(value)
                setPage(1);
            } else {
                setFillterSearchName("")
            }
        }, []);


    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[44%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Tìm kiếm theo mã đoạn"
                        size="sm"
                        startContent={<SearchIcon className="text-default-300" />}
                        // value={filterSearchName}
                        variant="bordered"
                        onClear={() => setFillterSearchName("")}
                        onValueChange={debounce(onSearchChange, 300)}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    size="sm"
                                    variant="flat"
                                >
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {/* {capitalize(column.name)} */}
                                        {column.name}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }, [
        filterSearchName,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        data.length,
        hasSearchFilter,
    ]);
    const [total, setTotal] = useState(1);

    useEffect(() => {
        if (dataSegmentUsermanager) {
            const totalPages = Math.ceil(dataSegmentUsermanager.length / rowsPerPage);
            setTotal(totalPages > 0 ? totalPages : 1);
        }
    }, [dataSegmentUsermanager, rowsPerPage]);
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
                        Total {data.length} segment
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
            <div className="grid grid-cols-3">
                <div className="leftContent col-span-3 md:col-span-1 px-2 flex">
                    <Card className="p-2 w-full">
                        <CardHeader className="py-1">
                        </CardHeader>
                        <CardBody className="overflow-visible py-1 gap-y-4">
                            <Avatar
                                isBordered
                                color="primary"
                                // src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                                src="https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                                className="w-[200px] h-[200px] m-auto"
                            />
                        </CardBody>
                    </Card>
                </div>
                <div className="rightContent col-span-3 md:col-span-2 px-2 mt-3 md:mt-0 flex">
                    <Card className="p-2 w-full">
                        <CardHeader className="py-1">
                            <h1 className="titlePage">Thông tin khách hàng</h1>
                        </CardHeader>
                        <CardBody className="overflow-visible py-1 gap-y-4">
                            <div className="grid grid-cols-3">
                                <div className="font-bold">Họ và tên</div>
                                <div className="col-span-2">{dataProfile?.admin?.HOTEN || dataProfile?.usermanager?.HOTEN || ""}</div>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Email</p>
                                <p className="col-span-2">{dataProfile?.admin?.EMAIL || dataProfile?.usermanager?.EMAIL}</p>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Số điện thoại</p>
                                <p className="col-span-2">{dataProfile?.admin?.SDT || dataProfile?.usermanager?.SDT}</p>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Giới tính</p>
                                <p className="col-span-2">{dataProfile?.admin?.GIOITINH || dataProfile?.usermanager?.GIOITINH}</p>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Địa chỉ</p>
                                <p className="col-span-2">{dataProfile?.admin?.DIACHI || dataProfile?.usermanager?.DIACHI}</p>
                            </div>

                            <div className="grid grid-cols-3">
                                <p className="font-bold">Loại người dùng</p>
                                <div className="col-span-2">
                                    {dataProfile?.admin ? (
                                        <Chip variant="flat" color="primary">
                                            Admin
                                        </Chip>
                                    ) : (
                                        <Chip variant="flat" color="warning">
                                            User manager
                                        </Chip>
                                    )}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
                <div className="rightContent col-span-3 px-2 mt-3">
                    <Card className="p-2">
                        <CardHeader className="py-1">
                            <h1 className="titlePage">Danh sách phân công</h1>

                        </CardHeader>
                        <CardBody className="overflow-visible py-1">
                            <Table
                                isCompact
                                removeWrapper
                                aria-label="Example table with custom cells, pagination and sorting"
                                bottomContent={bottomContent}
                                bottomContentPlacement="outside"
                                checkboxesProps={{
                                    classNames: {
                                        wrapper: "after:bg-foreground after:text-background text-background",
                                    },
                                }}
                                // classNames={classNames}
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
                        </CardBody>
                    </Card>
                </div>

            </div>
        </>
    );
}

export default ProfileUser;