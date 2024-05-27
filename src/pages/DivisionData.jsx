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
import UserService from "../service/UserService";
const INITIAL_VISIBLE_COLUMNS = ["id", "thoigianphan", "tentruong", "sodong", "madoan", "lienhe1", "lienhe2", "lienhe3"];
function DivisionData() {
    const [provinceSelected, setProvinceSelected] = useState('');
    const [schoolSelected, setSchoolSelected] = useState('');
    const [jobSelected, setJobSelected] = useState('');

    const [urlSchool, setUrlSchool] = useState(`${API_DATA}/school`);
    const [urlJob, setUrlJob] = useState(`${API_DATA}/job-like`);
    const { data: dataProvince, mutate } = useSWR(`${API_DATA}/province`)

    // Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const segment = [
        {
            label: "5 dòng", value: "5"
        },
        {
            label: "10 dòng", value: "10"
        },
        {
            label: "15 dòng", value: "15"
        },
    ]

    useEffect(() => {
        if (provinceSelected) {
            setUrlSchool(`${API_DATA}/school?provinceCode=${provinceSelected}`)
        }
    }, [provinceSelected])
    const { data: dataSchool } = useSWR(urlSchool)

    useEffect(() => {
        if (schoolSelected) {
            setUrlJob(`${API_DATA}/job-like?schoolCode=${schoolSelected}`)
        }
    }, [schoolSelected])
    const { data: dataJob } = useSWR(urlJob);

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
        tentruong: "Trường Cao Đăng Sư Phạm",
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

                    total={pages}

                    variant="light"
                    onChange={(e) => {
                        setPage(e)
                    }}
                />
            </div>
        );
    }, [items.length, page, hasSearchFilter]);

    return (
        <>
            <div className="">
                <div className="mt-3" style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#fff",
                    borderRadius: "10px"
                }}>
                    <h1 className="mb-2 text-lg font-medium">Phân chia dữ liệu</h1>
                    <div className="flex flex-col gap-4">


                        <div className="col-span-4 md:col-span-3">
                            <div className="flex gap-3">

                                <Autocomplete
                                    aria-labelledby="province-label"
                                    placeholder="Chọn tỉnh"
                                    className="max-w-xs"
                                    variant="bordered"
                                    size="sm"
                                    onSelectionChange={(value) => setProvinceSelected(value)}
                                >
                                    {dataProvince?.map((province) => (
                                        <AutocompleteItem key={province.MATINH} value={province.MATINH}>
                                            {province.TENTINH}
                                        </AutocompleteItem>
                                    ))}

                                </Autocomplete>
                                <Autocomplete
                                    aria-labelledby="province-label"
                                    placeholder="Chọn trường"
                                    className="max-w-xs"
                                    variant="bordered"
                                    size="sm"
                                    isDisabled={provinceSelected != '' ? false : true}
                                    onSelectionChange={(value) => setSchoolSelected(value)}
                                >
                                    {dataSchool?.map((school) => (
                                        <AutocompleteItem key={school.MATRUONG} value={school.MATRUONG}>
                                            {school.TENTRUONG}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <Autocomplete
                                    aria-labelledby="province-label"
                                    placeholder="Chọn user manager"
                                    className="max-w-xs"
                                    variant="bordered"
                                    size="sm"
                                    isDisabled={provinceSelected != '' ? false : true}
                                    onSelectionChange={(value) => setSchoolSelected(value)}
                                >
                                    {dataSchool?.map((school) => (
                                        <AutocompleteItem key={school.MATRUONG} value={school.MATRUONG}>
                                            {school.TENTRUONG}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <Select
                                    items={dataJob || []}
                                    aria-labelledby="province-label"
                                    placeholder="Chọn phân đoạn dữ liệu"
                                    className="max-w-xs"
                                    variant="bordered"
                                    isDisabled={schoolSelected != '' ? false : true}
                                    onSelectionChange={(value) => setJobSelected(value)}
                                    size="sm"
                                    listboxProps={{
                                        itemClasses: {
                                            base: [
                                                "rounded-md",
                                                "text-default-500",
                                                "transition-opacity",
                                                "data-[hover=true]:text-foreground",
                                                "data-[hover=true]:bg-default-100",
                                                "dark:data-[hover=true]:bg-default-50",
                                                "data-[selectable=true]:focus:bg-default-50",
                                                "data-[pressed=true]:opacity-70",
                                                "data-[focus-visible=true]:ring-default-500",
                                            ],
                                        },
                                    }}
                                    popoverProps={{
                                        classNames: {
                                            base: "before:bg-default-200",
                                            content: "p-0 border-small border-divider bg-background",
                                        },
                                    }}
                                    renderValue={(items) => {
                                        return items.map((item) => (
                                            <div key={item.data.MANGANH} className="flex items-center gap-2">
                                                <div className="">
                                                    <span>{item.data.TENNGANH}</span>
                                                    <span className="text-default-500 text-tiny ms-1">{item.data.count} dòng dữ liệu</span>
                                                </div>
                                            </div>
                                        ));
                                    }}
                                >
                                    {(job) => (
                                        <SelectItem key={job.MANGANH} textValue={job.TENNGANH}>
                                            <div className="flex gap-2 items-center">

                                                <div className="">
                                                    <span className="text-small">{job.TENNGANH}</span>
                                                    <span className="text-tiny text-default-400 ms-1">{job.count} dòng dữ liệu</span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    )}
                                </Select>
                                <Button color="primary" className="h-100">
                                    Xác nhận
                                </Button>
                            </div>


                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-3 items-end">
                                <Input
                                    isClearable
                                    classNames={{
                                        base: "w-full sm:max-w-[24%]",
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
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                    </select>
                                </label>
                            </div>
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
                        // classNames={classNames}
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
        </>
    );
}

export default DivisionData;