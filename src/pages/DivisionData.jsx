import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Select,
  SelectItem,
  Autocomplete,
  AutocompleteItem,
  Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Chip,
} from "@nextui-org/react";
import { SearchIcon } from "../components/icons/SearchIcon";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";
import useSWR from "swr";
import { API_DATA, API_USER } from "../constants";
import debounce from "lodash.debounce";
<<<<<<< HEAD
const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "tgphan",
  "tentruong",
  "sodong",
  "madoan",
  "contacts",
  "actions",
];
import moment from "moment";
import { Segmented } from "antd";
=======
const INITIAL_VISIBLE_COLUMNS = ["id", "tgphan", "usermanager", "tentruong", "sodong", "madoan", "contacts", "actions"];
import moment from 'moment';
import { Popconfirm, Segmented } from 'antd';
>>>>>>> a6b24a083f3967c54952c2b5ff79ed181dad8259
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import SegmentService from "../service/SegmentService";

function DivisionData() {
  const [value, setValue] = useState("1");

<<<<<<< HEAD
  const [provinceSelected, setProvinceSelected] = useState("");
  const [schoolSelected, setSchoolSelected] = useState("");
  const [segmentSelected, setSegmentSelected] = useState("");
  const [usermanangerSelected, setUserManagerSelected] = useState("");
=======
    const [statusContact, setStatusContact] = useState('');

    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    const [provinceSelected, setProvinceSelected] = useState('');
    const [schoolSelected, setSchoolSelected] = useState('');
    const [segmentSelected, setSegmentSelected] = useState('');
    const [usermanangerSelected, setUserManagerSelected] = useState('');

  const [total, setTotal] = useState(1);

  const [urlSchool, setUrlSchool] = useState(`${API_DATA}/school`);
  const [urlJob, setUrlJob] = useState("");
  const { data: dataProvince, mutate } = useSWR(`${API_DATA}/province`);

  const { data: dataSegment, mutate: fetchSegment } = useSWR(
    `${API_DATA}/segment?type=done`
  );

<<<<<<< HEAD
  useEffect(() => {
    if (provinceSelected) {
      setUrlSchool(`${API_DATA}/school?provinceCode=${provinceSelected}`);
    }
  }, [provinceSelected]);
  const { data: dataSchool } = useSWR(urlSchool);

  useEffect(() => {
    if (schoolSelected) {
      setUrlJob(`${API_DATA}/segment?schoolCode=${schoolSelected}&type=doing`);
    }
  }, [schoolSelected]);
  const { data: listSegment } = useSWR(urlJob);
  console.log(listSegment);
  useEffect(() => {
    if (listSegment && !listSegment?.length > 0) {
      toast.success("Trường đã phân đoạn hết dữ liệu");
    }
  }, [listSegment, listSegment?.length]);

  const [filterSearchName, setFillterSearchName] = useState("");
=======
    const { data: dataSegment, mutate: fetchSegment } = useSWR(`${API_DATA}/segment?type=done`)
    // console.log("dataSegment", dataSegment)

    useEffect(() => {
        if (provinceSelected) {
            setUrlSchool(`${API_DATA}/school?provinceCode=${provinceSelected}`)
            setSchoolSelected('')
            setSegmentSelected('')
        }
    }, [provinceSelected])
    const { data: dataSchool } = useSWR(urlSchool)

    useEffect(() => {
        if (schoolSelected) {
            setUrlJob(`${API_DATA}/segment?schoolCode=${schoolSelected}&type=doing`)
            setSegmentSelected('')
        }
    }, [schoolSelected])
    const { data: listSegment, mutate: fetchListSegment } = useSWR(urlJob);

    const { data: listUserManager, mutate: fetchUserManager } = useSWR(`${API_USER}/user-manager`)

    useEffect(() => {
        if (listSegment && !listSegment?.length > 0) {
            toast.success("Trường đã phân đoạn hết dữ liệu")
        }
    }, [listSegment, listSegment?.length])
>>>>>>> a6b24a083f3967c54952c2b5ff79ed181dad8259

  const columns = [
    { name: "STT", uid: "id" },
    { name: "Mã đoạn", uid: "madoan", sortable: true },
    { name: "Thời gian phân", uid: "tgphan", sortable: true },
    { name: "Tên trường", uid: "tentruong", sortable: true },
    { name: "Số dòng", uid: "sodong", sortable: true },
    { name: "Mở liên hệ", uid: "contacts" },
    { name: "Action", uid: "actions" },
  ];

<<<<<<< HEAD
  const data = useMemo(() => {
    return (
      dataSegment?.map((segment, index) => {
        return {
          id: index + 1,
          madoan: segment?.MaPQ,
          tgphan: segment?.THOIGIANPQ,
          tentruong: segment?.truong?.TENTRUONG,
          sodong: segment?.Sodong,
          sdt: segment?.SDT,
        };
      }) || []
=======
    const columns = [
        { name: "STT", uid: "id" },
        { name: "Mã đoạn", uid: "madoan", sortable: true },
        { name: "Thời gian phân", uid: "tgphan", sortable: true },
        { name: "User manager", uid: "usermanager", sortable: true },
        { name: "Tên trường", uid: "tentruong", sortable: true },
        { name: "Số dòng", uid: "sodong", sortable: true },
        { name: "Lần liên hệ", uid: "contacts" },
        { name: "Action", uid: "actions" },

    ];

    const data = useMemo(() => {
        return dataSegment?.map((segment, index) => {
            return {
                id: index + 1,
                madoan: segment?.MaPQ,
                tgphan: segment?.THOIGIANPQ,
                usermanager: segment?.usermanager?.HOTEN,
                tentruong: segment?.truong?.TENTRUONG,
                sodong: segment?.Sodong,
                sdt: segment?.SDT,
                contacts: segment?.TRANGTHAILIENHE
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

    const [record, setRecord] = useState();
    const [contactTimes, setContactTimes] = useState();

    const options = [
        {
            label: "Lần 1", value: "1"
        },
        {
            label: "Lần 2", value: "2"
        },
        {
            label: "Lần 3", value: "3"
        },
        {
            label: "Lần 4", value: "4"
        },
        {
            label: "Lần 5", value: "5"
        },
        {
            label: "Lần 6", value: "6"
        },
        {
            label: "Lần 7", value: "7"
        },
        {
            label: "Đóng", value: "0"
        },
    ]


    const renderCell = useCallback((segment, columnKey) => {
        const cellValue = segment[columnKey];

        switch (columnKey) {
            case "tgphan":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{moment(cellValue).format('DD-MM-YYYY')}</span>

                    </div>
                );
            case "madoan":
                return (
                    <div className="flex flex-col justify-center">
                        <span className="text-bold text-small">{cellValue}</span>

                    </div>
                );
            case "usermanager":
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
            case "contacts":
                return (
                    <div className="relative flex items-center gap-2">

                        <Chip variant="bordered" radius="sm" className="text-black"> {cellValue == 0 ? 'Đóng' : `Lần ${cellValue}`}</Chip>
                    </div>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Chip color="primary" className="text-white cursor-pointer" radius="sm" onClick={() => hanldeOpen(segment)}>
                            Mở liên hệ
                        </Chip>

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

    const divisionSegment = async () => {
        try {
            const dataDivisionSegment = {
                SDT_USERMANAGER: usermanangerSelected,
                MAPQ: segmentSelected,
                TRANGTHAILIENHE: 1
            }
            const res = await SegmentService.divisionSegment(dataDivisionSegment)
            console.log(res)
            fetchListSegment()
            setSegmentSelected('')
            setSchoolSelected('')
            setUserManagerSelected('')
            toast.success(res.message)
            fetchSegment()
        } catch (e) {
            console.log(e.message)
            toast.error(e.message)
        }

    }

    const hanldeOpen = (data) => {
        console.log("record", data);
        setRecord(data)
        setContactTimes(data.contacts);
        onOpen();
    }

    // useEffect(() => {
    //     setRecord();
    // }, [record])

    const handleUpdateSegment = async (segment, contact) => {
        try {
            const dataUpdateSegment = {
                MAPQ: segment.madoan,
                TRANGTHAILIENHE: contact
            }
            const res = await SegmentService.updateSegment(dataUpdateSegment)
            // console.log(res)
            toast.success(res.message)
            fetchSegment()
            setContactTimes(contact)

        } catch (e) {
            console.log(e.message)
            toast.error(e.message)
        }
    };

    const confirm = async (segment) => {
        try {
            const dataRefundSegment = {
                MAPQ: segment.madoan
            }
            const res = await SegmentService.refundSegment(dataRefundSegment)
            console.log(res)
            toast.success(res.message)
            fetchSegment()
            onClose();
        }
        catch (e) {
            console.log(e)
            toast.error(e.message)
        }
    };
    const cancel = (e) => {
        console.log(e);
    };

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
                                    selectedKey={provinceSelected}
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
                                    selectedKey={schoolSelected}
                                    onSelectionChange={(value) => setSchoolSelected(value)}
                                >
                                    {dataSchool?.map((school) => (
                                        <AutocompleteItem key={school.MATRUONG} value={school.MATRUONG}>
                                            {school.TENTRUONG || 'Trống'}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>
                                <Select
                                    items={listSegment || []}
                                    aria-labelledby="province-label"
                                    placeholder="Chọn phân đoạn"
                                    className="max-w-xs"
                                    variant="bordered"
                                    isDisabled={schoolSelected != '' ? false : true}
                                    selectedKeys={[segmentSelected]}
                                    onChange={(e) => setSegmentSelected(e.target.value)}
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
                                            < div key={item.data.MaPQ} className="flex items-center gap-2" >
                                                <div className="">
                                                    <span>{item.data.MaPQ}({item.data.Sodong} dòng dữ liệu)</span>

                                                </div>
                                            </div>
                                        ));
                                    }}
                                >
                                    {(segment) => (
                                        <SelectItem key={segment?.MaPQ} textValue={segment.MaPQ} value={segment.MaPQ}>
                                            <div className="flex gap-2 items-center">
                                                <div className="">
                                                    <span className="text-small">{segment?.MaPQ}</span>
                                                    <span className="text-tiny text-default-400 ms-1">{segment?.Sodong} dòng dữ liệu</span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    )}

                                </Select>
                                <Autocomplete
                                    aria-labelledby="province-label"
                                    placeholder="Chọn user manager"
                                    className="max-w-xs"
                                    variant="bordered"
                                    size="sm"
                                    selectedKey={usermanangerSelected}
                                    onSelectionChange={(value) => setUserManagerSelected(value)}
                                >
                                    {listUserManager?.map((usermanager) => (
                                        <AutocompleteItem key={usermanager.SDT} value={usermanager.SDT}>
                                            {usermanager.usermanager.HOTEN}
                                        </AutocompleteItem>
                                    ))}
                                </Autocomplete>

                                <Button color="primary" className="h-100" onClick={divisionSegment}>
                                    Xác nhận
                                </Button>
                            </div>


                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-3 items-end mb-2">
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
                                <TableRow key={item.madoan}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div >
            </div >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" className="w-50">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Thao tác liên hệ</ModalHeader>
                            <ModalBody>
                                <div>
                                    <p className="pb-2">Mở liên hệ</p>
                                    <div className="flex">
                                        <Segmented options={options} value={`${contactTimes}`}
                                            onChange={(value) => {
                                                setStatusContact(value);
                                                handleUpdateSegment(record, value);
                                            }}
                                        />
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this task?"
                                            onConfirm={() => confirm(record)}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-2 py-1 rounded inline-flex items-center ">
                                                <FontAwesomeIcon className="mr-1" icon={faRotateLeft} />
                                                <span>Thu hồi</span>
                                            </button>
                                        </Popconfirm>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default DivisionData;
