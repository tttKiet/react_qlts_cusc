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
    ModalContent,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
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
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const INITIAL_VISIBLE_COLUMNS = ["name", "phone", "email", "gender", "role",
    "status", "actions"];
function ManagerUser() {
    const [filterSearchName, setFillterSearchName] = useState('')
    const [pagination, setPanigation] = useState({ take: 5, skip: 0 })
    const [total, setTotal] = useState(1);
    const [nameSearch, setNameSearch] = useState('');
    // Call API
    const { data: dataPagination, error, isLoading, mutate } = useSWR(`${API_USER}?name=${filterSearchName}&take=${pagination.take}&skip=${pagination.skip}`)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

    const [record, setRecord] = useState({})
    const [isEditUser, setIsEditUser] = useState(false)

    const closeModal = () => {
        onClose();
        setRecord({});
        setIsEditUser(false);
    };


    const hanldeShowEdit = (data) => {
        if (data) {
            const dataSetModal = {
                id: data.id,
                fullName: data.name,
                email: data.email,
                gender: data.gender,
                phone: data.phone,
                address: data.address,
                role: data.role,
            }
            setRecord(dataSetModal)
            setIsEditUser(true)
            onOpen();
        } else {
            setRecord({})
            setIsEditUser(false)
        }

    }

    const [recordDelete, setRecordDelete] = useState("")

    const handleShowDelete = (data) => {
        if (data) {
            setRecordDelete(data)
            onOpenDelete()
            console.log(data)
        }
    }

    const handleCloseDelete = () => {
        setRecordDelete("");
        onCloseDelete();
    }

    const handleDelete = async () => {
        try {
            let dataSendToDelete = {};
            if (recordDelete.role === "usermanager") {
                dataSendToDelete = {
                    SDT: recordDelete.username
                }
            } else if (recordDelete.role === "admin") {
                dataSendToDelete = {
                    MAADMIN: recordDelete.username
                }
            }
            const res = await UserService.deleteProfile(dataSendToDelete)
            console.log(res)
            toast.success(res.message)
            handleCloseDelete()
            mutate()
        } catch (e) {
            toast.error(e.message)
        }

    }

    const columns = [
        { name: "ID", uid: "id", sortable: true },
        { name: "Họ và tên", uid: "name", sortable: true },
        { name: "Số điện thoại", uid: "phone", },
        { name: "Email", uid: "email" },
        { name: "Giới tính", uid: "gender", sortable: true },
        { name: "Địa chỉ", uid: "address", sortable: true },
        { name: "Loại người dùng", uid: "role", sortable: true },
        { name: "Trạng thái", uid: "status" },
        { name: "ACTIONS", uid: "actions" },
    ];

    const users = useMemo(() => {
        return dataPagination?.data?.map((user, index) => {
            return {
                id: user?.TENDANGNHAP,
                role: user?.usermanager ? 'usermanager' : (user?.admin ? 'admin' : 'other'),
                name: user?.usermanager?.HOTEN || user?.admin?.HOTEN || '',
                phone: user?.usermanager?.SDT || user?.admin?.SDT || '',
                email: user?.usermanager?.EMAIL || user?.admin?.EMAIL || '',
                gender: user?.usermanager?.GIOITINH || user?.admin?.GIOITINH || '',
                address: user?.usermanager?.DIACHI || user?.admin?.DIACHI || '',
                status: user?.usermanager?.TRANGTHAIUM || user?.admin?.TRANGTHAIADMIN || 0,
                avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                username: user?.usermanager?.SDT || user?.admin?.MAADMIN,
            }
        }) || []
    }, [dataPagination])

    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
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
        let filteredUsers = [...users];
        return filteredUsers;
    }, [users, filterSearchName]);

    const items = useMemo(() => {
        setPanigation({ skip: (page - 1) * rowsPerPage, take: rowsPerPage })
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
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
                        classNames={{
                            description: "text-default-500",
                        }}

                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case "phone":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>

                    </div>
                );
            case "email":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "role":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue === 'admin' ? <Chip color="primary" variant="flat">Admin</Chip> : (cellValue === 'usermanager' ? <Chip color="success" variant="flat">Usermanager</Chip> : <Chip color="danger" variant="flat">Khác</Chip>)}</span>

                    </div>
                );
            case "status":
                return (
                    <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color={statusColorMap[user.status]}
                        size="sm"
                        variant="dot"
                    >
                        {cellValue === 1 ? 'Online' : 'Offline'}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <Link to={`/admin/user/${user.role === "admin" ? `MAADMIN=${user.username}` : `SDT=${user.username}`}`}>
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <EyeIcon />
                                </span>
                            </Link>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => hanldeShowEdit(user)}>
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleShowDelete(user)} >
                                <DeleteIcon />
                            </span>
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

    useEffect(() => {
        if (dataPagination) {
            setTotal(Math.ceil(dataPagination?.total / rowsPerPage))
        }
    }, [dataPagination])

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
                        placeholder="Tìm kiếm theo tên"
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
                        <Button
                            color="primary"
                            endContent={<PlusIcon />}
                            size="sm"
                            onPress={onOpen}
                        >
                            Thêm người dùng
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {users.length} users</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
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
        users.length,
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

                    total={total}

                    variant="light"
                    onChange={(e) => {
                        setPage(e)
                    }}
                />
                <span className="text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${items.length} selected`}
                </span>
            </div>
        );
    }, [selectedKeys, items.length, page, dataPagination, total, hasSearchFilter]);

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
    const onSubmit = async (data) => {
        if (isEditUser) {
            const dataSend = {
                HOVATEN: data.fullName,
                MATKHAU: data.password,
                SDT: data.phone,
                GIOITINH: data.gender,
                EMAIL: data.email,
                DIACHI: data.address,
                ROLE: data.role,
                TENDANGNHAP: data.id,
            }

            try {
                const res = await UserService.updateUser(dataSend)
                onClose()
                toast.success(res.message)
                mutate()
                setRecord({})
            } catch (e) {
                toast.error(e.message)
            }

        } else {
            const dataSend = {
                HOVATEN: data.fullName,
                MATKHAU: data.password,
                SDT: data.phone,
                GIOITINH: data.gender,
                EMAIL: data.email,
                DIACHI: data.address,
                ROLE: data.role
            };
            try {
                const res = await UserService.createUser(dataSend)
                if (res.message) {
                    mutate();
                    console.log(res.message)
                    toast.success(res.message)
                    onClose()
                    setRecord({})
                }
            } catch (e) {
                console.log(e)
                toast.error(e.message)
            }
        }
    }

    return (
        <>
            <div className="contentPage"
                style={{
                    padding: 24,
                    minHeight: 500,
                    background: "#fff",
                    borderRadius: "10px"
                }}>
                <h1 className="titlePage">Danh sách người dùng</h1>
                <div className="listUser mt-2">
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
                        <TableBody emptyContent={"Không tìm thấy người dùng"} items={sortedItems}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <ModalComponent footer={false} isOpen={isOpen} onOpen={onOpen} onClose={closeModal} size="2xl" title={isEditUser ? 'Chỉnh sửa thông tin' : 'Thêm người dùng'} okModal="Thêm người dùng" cancelModal="Đóng"  >
                <FormUser onClose={closeModal} onSubmit={onSubmit} record={record} isEditUser={isEditUser} />
            </ModalComponent>
            <Modal isOpen={isOpenDelete}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Xóa người dùng</ModalHeader>
                    <ModalBody>
                        <p>
                            Bạn chắc chắn muốn xóa người dùng {recordDelete?.name}
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => handleCloseDelete()}>
                            Đóng
                        </Button>
                        <Button color="danger" onPress={() => handleDelete()}>
                            Xóa
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ManagerUser;