import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
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
    User,
    Pagination,
    useDisclosure,
    Select, SelectItem,
    RadioGroup,
    Radio,
    Tooltip,
    CardHeader,
    CardBody,
    Card,
    Image
} from "@nextui-org/react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { VerticalDotsIcon } from "../components/icons/VerticalDotsIcon";
import { SearchIcon } from "../components/icons/SearchIcon";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";
import ModalComponent from "../components/Modal/ModalComponent";
import { EyeFilledIcon } from "../components/icons/EyeFilledIcon ";
import { EyeIcon } from "../components/icons/EyeIcon";
import { EditIcon } from "../components/icons/EditIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeSlashFilledIcon } from "../components/icons/EyeSlashFiledIcon";
const statusColorMap = {
    1: "success",
    0: "danger",
};
import useSWR from 'swr'
import { API_USER } from "../constants";
import debounce from "lodash.debounce";
import FormUser from "../components/body/FormUser";
import UserService from "../service/UserService";
const INITIAL_VISIBLE_COLUMNS = ["id", "thoigianphan", "tentruong", "sodong", "madoan", "lienhe1", "lienhe2", "lienhe3"];
function ProfileUser() {
    const [filterSearchName, setFillterSearchName] = useState('')
    const data = [{
        id: 1,
        thoigianphan: "7:20",
        tentruong: "Đại học Cần Thơ",
        sodong: "10",
        madoan: "MD1",
        lienhe1: 1,
        lienhe2: "1",
        lienhe3: 0
    },
    {
        id: 2,
        thoigianphan: "8:30",
        tentruong: "Trường Kinh Tế Quốc Dân",
        sodong: "5",
        madoan: "MD2",
        lienhe1: 1,
        lienhe2: 1,
        lienhe3: 1
    },
    {
        id: 3,
        thoigianphan: "9:00",
        tentruong: "Trường Cao đẳng Sư Phạm",
        sodong: "7",
        madoan: "MD3",
        lienhe1: 0,
        lienhe2: 0,
        lienhe3: 0
    }
    ]

    const columns = [
        { name: "STT", uid: "id", sortable: true },
        { name: "Thời gian phân", uid: "thoigianphan" },
        { name: "Tên trường", uid: "tentruong", },
        { name: "Mã đoạn", uid: "madoan", sortable: true },
        { name: "Số dòng", uid: "sodong", sortable: true },
        { name: "Liên hệ lần 1", uid: "lienhe1", sortable: true },
        { name: "Liên hệ lần 2", uid: "lienhe2", sortable: true },
        { name: "Liên hệ lần 3", uid: "lienhe3", sortable: true },

    ];

    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const pages = Math.ceil(data.length / rowsPerPage);
    const hasSearchFilter = Boolean(filterSearchName);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...data];
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

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

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
            case "madoan":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "sodong":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "lienhe1":
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-bold text-small">{cellValue === 1 ? <Chip color="primary" size="sm" variant="flat">Hoàn thành</Chip> : <Chip color="warning" size="sm" variant="flat">Chưa</Chip>}</span>
                    </div>
                );
            case "lienhe2":
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-bold text-small">{cellValue === 1 ? <Chip color="primary" size="sm" variant="flat">Hoàn thành</Chip> : <Chip color="warning" size="sm" variant="flat">Chưa</Chip>}</span>
                    </div>
                );
            case "lienhe3":
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-bold text-small">{cellValue === 1 ? <Chip color="primary" size="sm" variant="flat">Hoàn thành</Chip> : <Chip color="warning" size="sm" variant="flat">Chưa</Chip>}</span>
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
                        placeholder="Search by name..."
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
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {data.length} users</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="4">4</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
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

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    // isDisabled={hasSearchFilter}
                    page={page}

                    total={pages}

                    variant="light"
                    onChange={(e) => {
                        setPage(e)
                    }}
                />
            </div>
        );
    }, [items.length, page, hasSearchFilter]);

    const classNames = useMemo(
        () => ({
            wrapper: ["max-h-[382px]", "max-w-3xl"],
            th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
            td: [
                // changing the rows border radius
                // first
                "group-data-[first=true]:first:before:rounded-none",
                "group-data-[first=true]:last:before:rounded-none",
                // middle
                "group-data-[middle=true]:before:rounded-none",
                // last
                "group-data-[last=true]:first:before:rounded-none",
                "group-data-[last=true]:last:before:rounded-none",
            ],
        }),
        [],
    );
    return (

        <>
            <div className="grid grid-cols-3">
                <div className="leftContent col-span-3 md:col-span-1 px-2">
                    <Card className="p-2">
                        <CardHeader className="py-1">
                            <h1 className="titlePage">Thống kê</h1>
                        </CardHeader>
                        <CardBody className="overflow-visible py-1 gap-y-4">

                        </CardBody>
                    </Card>
                </div>
                <div className="rightContent col-span-3 md:col-span-2 px-2 mt-3 md:mt-0">
                    <Card className="p-2">
                        <CardHeader className="py-1">
                            <h1 className="titlePage">Thông tin khách hàng</h1>
                        </CardHeader>
                        <CardBody className="overflow-visible py-1 gap-y-4">
                            <div className="grid grid-cols-3">
                                <div className="font-bold">Họ và tên</div>
                                <div className="col-span-2">Trần Hoàng Trân</div>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Email</p>
                                <p className="col-span-2">tranhoangtran22225@gmail</p>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Số điện thoại</p>
                                <p className="col-span-2">0971144857</p>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Giới tính</p>
                                <p className="col-span-2">Nam</p>
                            </div>
                            <div className="grid grid-cols-3">
                                <p className="font-bold">Địa chỉ</p>
                                <p className="col-span-2">Phường 2, Quận Ninh Kiều, Thành phố Cần Thơ</p>
                            </div>

                            <div className="grid grid-cols-3">
                                <p className="font-bold">Loại người dùng</p>
                                <div className="col-span-2">
                                    <Chip variant="flat" color="primary">
                                        Admin
                                    </Chip>
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
                                <TableBody emptyContent={"Không tìm thấy người dùng"} items={sortedItems}>
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