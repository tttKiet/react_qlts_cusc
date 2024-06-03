import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
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
const INITIAL_VISIBLE_COLUMNS = ["id", "madoan", "tentruong", "sodong", "actions", "status"];
function SegmentData() {

    const { data: dataSegment, mutate: fetchSegment } = useSWR(`${API_DATA}/segment`)
    const [total, setTotal] = useState(1);

    const [provinceSelected, setProvinceSelected] = useState('');
    const [schoolSelected, setSchoolSelected] = useState('');
    const [jobSelected, setJobSelected] = useState('');

    const [urlSchool, setUrlSchool] = useState(`${API_DATA}/school`);
    const [urlJob, setUrlJob] = useState(`${API_DATA}/job-like`);
    const { data: dataProvince, mutate } = useSWR(`${API_DATA}/province`)

    // Modal
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();



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
    const [segment, setSegment] = useState(0)

    const [filterSearchName, setFillterSearchName] = useState('')
    const columns = [
        { name: "STT", uid: "id" },
        { name: "Mã đoạn", uid: "madoan", sortable: true },
        { name: "Tên trường", uid: "tentruong", sortable: true },
        { name: "Số dòng", uid: "sodong", sortable: true },
        { name: "Trạng thái", uid: "status" },
        { name: "Action", uid: "actions" },

    ];

    const data = useMemo(() => {
        return dataSegment?.map((segment, index) => {
            return {
                id: index + 1,
                madoan: segment?.MaPQ,
                tentruong: segment?.truong?.TENTRUONG,
                sodong: segment?.Sodong
            }
        }) || []
    }, [dataSegment])

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
                data.madoan.toLowerCase().includes(filterSearchName.toLowerCase()),
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
            case "status":
                return (
                    <div className="relative flex items-center gap-2">
                        <Chip
                            className="text-tiny"
                            variant="flat"
                            color="success"
                        >
                            Đã phân công
                        </Chip>
                        {/* <Chip
                            className="text-tiny"
                            variant="flat"
                            color="warning"
                        >
                            Chưa phân công
                        </Chip> */}
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <Link to={`/admin/segment/${segment.madoan}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </Link>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    useEffect(() => {
        if (dataSegment) {
            const totalPages = Math.ceil(dataSegment.length / rowsPerPage);
            setTotal(totalPages > 0 ? totalPages : 1);
        }
    }, [dataSegment, rowsPerPage]);


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

    const [errors, setErrors] = useState({})

    const handleSegment = async () => {
        const newErorrs = {};
        if (segment <= 0) {
            newErorrs.segment = 'Vui lòng nhập giá trị phân đoạn'
        } if (Object.keys(newErorrs).length === 0) {
            setErrors({})
            console.log("Segment data", segment);
            console.log("Truong", schoolSelected);
            const dataSend = {
                MATRUONG: schoolSelected,
                SODONG: segment
            }
            try {
                const res = await SegmentService.createSegment(dataSend)
                onClose()
                fetchSegment()
                console.log("Data recieved from backend", res)
            } catch (e) {
                console.log(e)
            }

        } else {
            setErrors(newErorrs)
        }
    }

    return (
        <>
            <div className="">
                <div className="mt-3" style={{
                    padding: 24,
                    minHeight: 390,
                    background: "#fff",
                    borderRadius: "10px"
                }}>
                    <h1 className="mb-2 text-lg font-medium">Phân đoạn dữ liệu</h1>
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
                                    <Select
                                        items={dataJob || []}
                                        aria-labelledby="province-label"
                                        placeholder="Chọn ngành"
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
                                            <SelectItem key={job.MANGANH} textValue={job.TENNGANH} value={jobSelected}>
                                                <div className="flex gap-2 items-center">

                                                    <div className="">
                                                        <span className="text-small">{job.TENNGANH}</span>
                                                        <span className="text-tiny text-default-400 ms-1">{job.count} dòng dữ liệu</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )}
                                    </Select>
                                    <Button color="primary" className="h-100" onPress={onOpen} isDisabled={schoolSelected == ''}>
                                        Phân đoạn
                                    </Button>
                                </div>
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
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Phân đoạn dữ liệu</ModalHeader>
                                <ModalBody>
                                    <div className="">
                                        <Input type="Number"
                                            label="Nhập số lượng phân đoạn"
                                            value={segment} onValueChange={setSegment}
                                            isInvalid={errors && errors.segment ? true : false}
                                            errorMessage={errors && errors.segment}
                                        />
                                    </div>
                                    <div className="flex">
                                        <p className="me-2">
                                            Gợi ý:
                                        </p>
                                        <div className="flex gap-1">
                                            <Chip className="cursor-pointer">1/2</Chip>
                                            <Chip className="cursor-pointer">1/4</Chip>
                                            <Chip className="cursor-pointer">1/6</Chip>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Đóng
                                    </Button>
                                    <Button color="primary" isDisabled={segment > 0 ? false : true} onPress={handleSegment}>
                                        Phân đoạn
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </>
    );
}

export default SegmentData;
