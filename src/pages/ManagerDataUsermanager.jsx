import useSWR from "swr";
import { API_DATA } from "../constants";
import { SearchIcon } from "../components/icons/SearchIcon";
import debounce from "lodash.debounce";
import { Autocomplete, AutocompleteItem, Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";
import { Link } from "react-router-dom";
import { EyeIcon } from "../components/icons/EyeIcon";
import { EditIcon } from "../components/icons/EditIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
const INITIAL_VISIBLE_COLUMNS = ["id", "sdt", "hoten", "email", "sdtba", "sdtme", "zalo", "tentruong", "actions"];
function ManagerDataUsermanager() {
    const contacts = [
        { value: "", lable: "Tất cả" },
        { value: 1, lable: "Chưa liên hệ 1" },
        { value: 2, lable: "Chưa liên hệ 2" },
        { value: 3, lable: "Chưa liên hệ 3" },
        { value: 4, lable: "Chưa liên hệ 4" },
        { value: 5, lable: "Chưa liên hệ 5" },
        { value: 6, lable: "Chưa liên hệ 6" },
        { value: 7, lable: "Chưa liên hệ 7" }
    ]
    const user = useSelector((state) => state.account.user);
    const { data: dataSegmentUsermanager, mutate: fetchDataSegmentUsermanager } = useSWR(`${API_DATA}/segment?SDT_UM=${user?.SDT}`)
    const [segmentSelected, setSegmentSelected] = useState(new Set([]));
    const [contactSelected, setContactSelected] = useState("");
    useEffect(() => {
        if (dataSegmentUsermanager && dataSegmentUsermanager.length > 0) {
            setSegmentSelected([dataSegmentUsermanager[0].MaPQ])
            setContactSelected(`${dataSegmentUsermanager[0].TRANGTHAILIENHE}`)

        }
    }, [dataSegmentUsermanager])

    const handleSelectionChange = (e) => {
        setSegmentSelected([e.currentKey]);
        const segment = dataSegmentUsermanager.find(seg => seg.MaPQ === e.currentKey);
        if (segment) {
            setContactSelected(`${segment.TRANGTHAILIENHE}`)
        }
    }

    const { data: detailSegment, mutate: fetchDetailSegment } = useSWR(`${API_DATA}/segment/${segmentSelected}?lan=${contactSelected}`)
    // console.log("detailSegment", detailSegment)

    const [filterSearchName, setFillterSearchName] = useState('')
    const columns = [
        { name: "STT", uid: "id", sortable: true },
        { name: "SĐT", uid: "sdt" },
        { name: "Họ tên", uid: "hoten", sortable: true },
        { name: "Email", uid: "email" },
        { name: "SĐT Ba", uid: "sdtba" },
        { name: "SĐT Mẹ", uid: "sdtme" },
        { name: "Zalo", uid: "zalo" },
        { name: "Tên trường", uid: "tentruong", sortable: true },
        { name: "Ngành yêu thích", uid: "nganh", sortable: true },
        { name: "Actions", uid: "actions" },

    ];

    const data = useMemo(() => {
        return detailSegment?.map((customer, index) => {
            return {
                id: index + 1,
                sdt: customer?.SDT || '',
                hoten: customer?.HOTEN || '',
                email: (customer?.EMAIL === 'Không có' ? '' : customer?.EMAIL) || '',
                sdtba: (customer?.SDTBA === 'Không có' ? '' : customer?.SDTBA) || '',
                sdtme: (customer?.SDTME === 'Không có' ? '' : customer?.SDTME) || '',
                zalo: (customer?.ZALO === 'Không có' ? '' : customer?.ZALO) || '',
                tentruong: customer?.TENTRUONG || '',
                nganh: customer?.MANGHENGHIEP,

            }
        }) || []
    }, [detailSegment])

    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [rowsPerPage, setRowsPerPage] = useState(40);
    const [sortDescriptor, setSortDescriptor] = useState({

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
                data.sdt.toLowerCase().includes(filterSearchName.toLowerCase()),
            );
            setRowsPerPage(100)
        }
        else {
            setRowsPerPage(5)
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

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "sdt":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small capitalize">{cellValue}</span>

                    </div>
                );
            case "hoten":
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
                    <div className="flex flex-col items-center">
                        <span className="text-bold text-small">{cellValue}</span>
                    </div>
                );
            case "zalo":
                return (
                    <div className="flex flex-col items-center">
                        <span className="text-bold text-small">{cellValue}</span>
                    </div>
                );
            case "tentruong":
                return (
                    <div className="flex flex-col">
                        <span className="text-bold text-small">{cellValue}</span>
                    </div>
                );
            case "nganh":
                return (
                    <div className="flex">
                        {cellValue}
                        {/* {cellValue?.length > 0 ? (
                            <>
                                {cellValue.slice(0, 2).map((job, index) => (
                                    <Tag key={index} bordered={false} color="processing">
                                        {job?.MANGANH}
                                    </Tag>
                                ))}
                                {cellValue.length > 2 && <span>...</span>}
                            </>
                        ) : (
                            ''
                        )} */}
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex gap-2">
                        <Tooltip content="Details">
                            <Link to={`/usermanager/data/${user?.sdt}`} className="text-lg text-default-400 cursor-pointer active:opacity-50" >
                                <EyeIcon />
                            </Link>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Link to={`/usermanager/data/edit/${user?.sdt}`} className="text-lg text-default-400 cursor-pointer active:opacity-50" >
                                    <EditIcon />
                                </Link>
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
                        placeholder="Tìm kiếm bằng số điện thoại"
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

    const [total, setTotal] = useState(1)

    useEffect(() => {
        if (detailSegment) {
            const totalPages = Math.ceil(detailSegment.length / rowsPerPage);
            setTotal(totalPages > 0 ? totalPages : 1);
        }
    }, [detailSegment, rowsPerPage]);


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
                        setPage(e)
                    }}
                />
                <div className="flex justify-between items-center gap-5">
                    <span className="text-default-400 text-small">Total {data.length} users</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                            defaultValue={40}
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
            <div className="contentPage"
                style={{
                    padding: 24,
                    minHeight: 500,
                    background: "#fff",
                    borderRadius: "10px"
                }}>
                <div className="headerContent flex mb-2">
                    <div className="flex">
                        <h1 className="titlePage">Danh sách dữ liệu {segmentSelected && segmentSelected}</h1>
                        {/* <Chip
                            variant="flat"
                            color="success"
                            className="ms-5"
                        >
                            Trạng thái liên hệ: {contactSelected}
                        </Chip> */}
                    </div>
                    <div className="ms-auto flex gap-2">
                        <Select
                            items={dataSegmentUsermanager || []}
                            aria-labelledby="segment-lable"
                            placeholder="Chọn phân đoạn"
                            selectedKeys={segmentSelected}
                            onSelectionChange={handleSelectionChange}
                            className="w-40"
                            renderValue={(items) => {
                                return items.map((item) => (
                                    <div key={item.data.MaPQ} className="flex items-center gap-2">
                                        <div className="flex flex-col">
                                            <p>{item.data.MaPQ} <span className="text-default-500 text-tiny">{item.data.Sodong} dòng dữ liệu</span></p>

                                        </div>
                                    </div>
                                ));
                            }}
                        >
                            {(segment) => (
                                <SelectItem key={segment.MaPQ} textValue={segment.MaPQ} value={segment.MaPQ}>
                                    <div className="flex gap-2 items-center">
                                        <div className="flex flex-col">
                                            <p className="text-small">{segment.MaPQ} <span className="text-default-500 text-tiny"> {segment.Sodong} dòng dữ liệu</span></p>
                                        </div>
                                    </div>
                                </SelectItem>
                            )}
                        </Select>
                        <Autocomplete
                            aria-labelledby="segment-lable"
                            placeholder="Chọn phân đoạn"
                            className="w-48"
                            selectedKey={contactSelected}
                            onSelectionChange={setContactSelected}
                        >
                            {contacts.map((contact) => (
                                <AutocompleteItem key={contact.value} value={contact.value}>
                                    {contact.lable}
                                </AutocompleteItem>
                            ))}
                        </Autocomplete>
                    </div>
                </div>
                <div className="contentPage">
                    <Table
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

export default ManagerDataUsermanager;