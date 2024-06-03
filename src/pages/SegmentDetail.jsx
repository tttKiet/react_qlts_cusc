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
    Image,
    Autocomplete,
    AutocompleteItem,
    Modal,
    ModalContent,
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
import { API_DATA, API_USER } from "../constants";
import debounce from "lodash.debounce";
import FormUser from "../components/body/FormUser";
import SegmentService from "../service/SegmentService";
import { useParams } from "react-router-dom";
const INITIAL_VISIBLE_COLUMNS = ["id", "sdt", "hoten", "tentruong", "email", "sdtba", "sdtme", "zalo"];
function SegmentDetail() {

    const { id } = useParams();

    const { data: dataSegmentDetail, mutate: fetchSegmentDetail } = useSWR(`${API_DATA}/segment/${id}`)
    const [total, setTotal] = useState(1);



    const [filterSearchName, setFillterSearchName] = useState('')
    const columns = [
        { name: "STT", uid: "id" },
        { name: "SDT", uid: "sdt", sortable: true },
        { name: "Họ tên", uid: "hoten", sortable: true },
        { name: "Tên trường", uid: "tentruong", sortable: true },
        { name: "Email", uid: "email", sortable: true },
        { name: "SĐT Ba", uid: "sdtba" },
        { name: "SĐT Mẹ", uid: "sdtme" },
        { name: "Zalo", uid: "zalo" },
    ];

    const data = useMemo(() => {
        return dataSegmentDetail?.map((user, index) => {
            return {
                id: index + 1,
                sdt: user?.SDT,
                hoten: user?.HOTEN,
                tentruong: user?.TENTRUONG,
                email: user?.EMAIL || 'Trống',
                sdtba: user?.SDTBA || 'Trống',
                sdtme: user?.SDTME || 'Trống',
                zalo: user?.SDTZALO || 'Trống',
            }
        }) || []
    }, [dataSegmentDetail])

    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "STT",
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
                data.hoten.toLowerCase().includes(filterSearchName.toLowerCase()),
            );
        }

        return filteredUsers;
    }, [data, filterSearchName]);
    const items = useMemo(() => {
        return filteredItems;
    }, [filteredItems]);

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

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "hoten":
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

            case "email":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "sdtba":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "sdtme":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "zalo":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        if (dataSegmentDetail) {
            const totalPages = Math.ceil(dataSegmentDetail.length / rowsPerPage);
            setTotal(totalPages > 0 ? totalPages : 1);
        }
    }, [dataSegmentDetail, rowsPerPage]);


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
                    isDisabled={hasSearchFilter}
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
                    <span className="text-default-400 text-small">Total {data.length} users</span>
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
            <div className="">
                <div className="mt-3" style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#fff",
                    borderRadius: "10px"
                }}>
                    <h1 className="mb-2 text-lg font-medium">Danh sách dữ liệu {id}</h1>
                    <div className="flex flex-col gap-4 mb-3">
                        <div className="grid grid-cols-4">
                            <Input
                                isClearable
                                classNames={{
                                    base: "w-full sm:max-w-[90%]",
                                    inputWrapper: "border-1",
                                }}
                                className="col-span-4 md:col-span-1"
                                placeholder="Search by name..."
                                size="sm"
                                startContent={<SearchIcon className="text-default-300" />}
                                variant="bordered"
                                onClear={() => setFillterSearchName("")}
                                onValueChange={debounce(onSearchChange, 300)}
                            />


                        </div>

                    </div >
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
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default SegmentDetail;
