import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Divider, Popconfirm } from "antd";
import debounce from "lodash.debounce";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { SearchIcon } from "../components/icons/SearchIcon";
import { API_DATA } from "../constants";
import SegmentService from "../service/SegmentService";
const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "madoan",
  "tentruong",
  "sodong",
  "actions",
  "sdt",
];
function SegmentData() {
  // Fetch Api

  const otherJob = [
    { value: "1", label: "CNTT" },
    { value: "2", label: "Gần CNTT" },
    { value: "3", label: "Học bổng" },
  ];
  // const { data: dataSegment, mutate: fetchSegment } = useSWR(`${API_DATA}/segment`)
  const [urlSegment, setUrlSegment] = useState(`${API_DATA}/segment`);
  const [total, setTotal] = useState(1);

  const [provinceSelected, setProvinceSelected] = useState("");
  const [schoolSelected, setSchoolSelected] = useState("");
  const [typeSelected, setTypeSelected] = useState("1");
  const [typeCodeSelected, setTypeCodeSelected] = useState("");
  const [jobSelected, setJobSelected] = useState("");

  const [urlSchool, setUrlSchool] = useState(`${API_DATA}/school`);
  const [urlJob, setUrlJob] = useState(`${API_DATA}/job-like`);
  const { data: dataProvince, mutate } = useSWR(`${API_DATA}/province`);

  // Modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // Chip
  const [notification, setNotification] = useState(["Notification"]);
  const handleClose = (fruitToRemove) => {
    setNotification(notification.filter((fruit) => fruit !== fruitToRemove));
  };

  useEffect(() => {
    if (provinceSelected) {
      setUrlSchool(`${API_DATA}/school?provinceCode=${provinceSelected}`);
      fetchSchool();
      fetchJob();
      setSchoolSelected("");
    }
  }, [provinceSelected]);
  const { data: dataSchool, mutate: fetchSchool } = useSWR(urlSchool);

  useEffect(() => {
    if (schoolSelected) {
      setUrlSegment(`${API_DATA}/segment?schoolCode=${schoolSelected}`);
      fetchJob();
    }
  }, [schoolSelected]);

  const { data: dataSegment, mutate: fetchSegment } = useSWR(urlSegment);

  const { data: dataJob, mutate: fetchJob } = useSWR(
    `${API_DATA}/job-like?schoolCode=${schoolSelected}&isAvalable=true`
  );
  //   const { data: dataJob, mutate: fetchJob } = useSWR(
  //     `${API_DATA}/job-like?isAvalable=true`
  //   );

  const dataJobAuto = useMemo(
    () =>
      dataJob
        ?.map((d) => ({
          label: d.TENNGANH,
          value: d.MANGANH,
          ...d,
        }))
        ?.filter((d) => d.TENNGANH != "NGÀNH KHÁC") || [],
    [dataJob]
  );
  console.log("dataJob", dataJob);

  // const extendedDataJob = useMemo(() => {
  //     return dataJob?.allCount ? [{ MANGANH: "0", TENNGANH: "Tất cả", count: dataJob?.allCount }, ...dataJob.data] : [{ MANGANH: "-1", TENNGANH: "Trống", count: 0 }];

  // }, [dataJob])

  const [segment, setSegment] = useState(0);

  const [filterSearchName, setFillterSearchName] = useState("");
  const columns = [
    { name: "STT", uid: "id" },
    { name: "Mã đoạn", uid: "madoan", sortable: true },
    { name: "Tên trường", uid: "tentruong", sortable: true },
    { name: "Số dòng", uid: "sodong", sortable: true },
    { name: "Trạng thái", uid: "sdt" },
    { name: "Action", uid: "actions" },
  ];

  const data = useMemo(() => {
    return (
      dataSegment?.map((segment, index) => {
        return {
          id: index + 1,
          madoan: segment?.MaPQ,
          tentruong: segment?.truong?.TENTRUONG,
          sodong: segment?.Sodong,
          sdt: segment?.SDT,
        };
      }) || []
    );
  }, [dataSegment]);

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const handleDeleteSegment = async () => {
    try {
      const selectedArray = Array.from(selectedKeys);
      const res = await SegmentService.deleteSegment(selectedArray);
      toast.success(res.message);
      fetchSegment();
      fetchJob();
      setJobSelected("");
      setSelectedKeys([]);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const confirm = async (madoan) => {
    try {
      const madoanArray = madoan.split(",").map((item) => item.trim());
      const res = await SegmentService.deleteSegment(madoanArray);
      toast.success(res.message);
      fetchSegment();
      fetchJob();
      setJobSelected("");
      setSelectedKeys([]);
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "STT",
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
        data.madoan.toLowerCase().includes(filterSearchName.toLowerCase())
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
      case "sdt":
        return (
          <div className="relative flex items-center gap-2">
            {cellValue != null ? (
              <Chip className="text-tiny" variant="flat" color="success">
                Đã phân công
              </Chip>
            ) : (
              <Chip className="text-tiny" variant="flat" color="warning">
                Đợi phân công
              </Chip>
            )}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <Link
                to={`/admin/segment/${segment.madoan}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => confirm(segment.madoan)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Popconfirm>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  //   Fetch Api
  const { data: dataAvailable, mutate: mutateDataAvailable } = useSWR(
    `${API_DATA}/data-available?MATINH=${provinceSelected}&MANGANH=${jobSelected}&MATRUONG=${schoolSelected}&MANHOM=${typeCodeSelected}`
  );

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

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFillterSearchName(value);
      setPage(1);
    } else {
      setFillterSearchName("");
    }
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="flex gap-2 items-center">
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
              setPage(e);
            }}
          />
          {selectedKeys.size > 0 ? (
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={handleDeleteSegment}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                color="danger"
                size="sm"
                startContent={<DeleteIcon />}
                //    onClick={handleDeleteSegment}
              >
                Delete
              </Button>
            </Popconfirm>
          ) : (
            ""
          )}
        </div>
        <div className="flex justify-between items-center mb-2 gap-5">
          <span className="text-default-400 text-small">
            Total {data.length} data
          </span>
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
  }, [
    items.length,
    page,
    hasSearchFilter,
    rowsPerPage,
    total,
    selectedKeys.size,
  ]);

  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (dataJob?.allCount == 0) {
      toast.success("Trường đã phân đoạn hết dữ liệu");
    }
  }, [dataJob?.allCount]);
  const handleSegment = async () => {
    const newErorrs = {};
    if (segment <= 0) {
      newErorrs.segment = "Vui lòng nhập giá trị phân đoạn";
    }
    if (Object.keys(newErorrs).length === 0) {
      setErrors({});
      let dataSend = {};
      if (jobSelected === "NG08") {
        dataSend = {
          ...(jobSelected != 0 ? { MANGANH: jobSelected } : {}),
          MATRUONG: schoolSelected,
          SODONG: segment,
          NHOMNGANH: typeMajorsSelected,
        };
      } else {
        dataSend = {
          ...(jobSelected != 0 ? { MANGANH: jobSelected } : {}),
          MATRUONG: schoolSelected,
          SODONG: segment,
        };
      }

      try {
        const res = await SegmentService.createSegment(dataSend);
        toast.success(res.message);
        onClose();
        fetchSegment();
        fetchJob();
        setJobSelected("");
      } catch (e) {
        console.log(e);

        toast.error(e.message);
      }
    } else {
      setErrors(newErorrs);
    }
  };

  const [numberSegment, setNumberSegment] = useState("");
  const [typeMajors, setTypeMajors] = useState([]);
  const [typeMajorsSelected, setTypeMajorsSelected] = useState();

  useEffect(() => {
    if (jobSelected != "" && jobSelected != 0) {
      if (jobSelected === "NG08") {
        setTypeMajors(dataJob.dataDir);
        setNumberSegment(dataJob.dataDir[0].count);
        setTypeMajorsSelected(`${dataJob.dataDir[0].MANHOMNGANH}`);
      } else {
        setNumberSegment(
          dataJob?.data.filter((item) => item.MANGANH === jobSelected)
        );
        setTypeMajors([]);
      }
    } else if (jobSelected == 0) {
      setNumberSegment(0);
    }
  }, [jobSelected]);

  useEffect(() => {
    const numberSegmentTypeMarjorsSelected = dataJob?.dataDir?.find(
      (item) => item.MANHOMNGANH == typeMajorsSelected
    )?.count;
    setNumberSegment(numberSegmentTypeMarjorsSelected);
  }, [typeMajorsSelected]);

  const handleCloseModal = () => {
    setSegment(0);
    onClose();
  };

  return (
    <>
      <div
        className="mt-3"
        style={{
          padding: 24,
          minHeight: 425,
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <div className="mb-6">
          <h1 className="mb-2 text-lg font-medium col-span-12">Lọc dữ liệu</h1>

          <div className="mb-4">
            <h4 className="text-base font-medium mb-2">Vị trí</h4>
            <div className="grid grid-cols-12  gap-4">
              <div className="col-span-4">
                <Autocomplete
                  aria-labelledby="province-label"
                  placeholder="Chọn tỉnh"
                  variant="bordered"
                  className="w-full"
                  size="sm"
                  selectedKey={provinceSelected}
                  onSelectionChange={(value) => setProvinceSelected(value)}
                >
                  {dataProvince?.map((province) => (
                    <AutocompleteItem
                      key={province.MATINH}
                      value={province.MATINH}
                    >
                      {province.TENTINH}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="col-span-4">
                <Autocomplete
                  aria-labelledby="province-label"
                  placeholder="Chọn trường"
                  variant="bordered"
                  size="sm"
                  className="w-full"
                  defaultItems={dataSchool || []}
                  isDisabled={provinceSelected != "" ? false : true}
                  selectedKey={schoolSelected}
                  onSelectionChange={(value) => setSchoolSelected(value)}
                >
                  {(item) => (
                    <AutocompleteItem key={item.MATRUONG}  value={item.MATRUONG}>
                      {item.TENTRUONG || "Trống"}
                    </AutocompleteItem>
                  )}
                  {/* {dataSchool?.map((school) => (
                    <AutocompleteItem
                      key={school.MATRUONG}
                      value={school.MATRUONG}
                    >
                      {school.TENTRUONG || "Trống"}
                    </AutocompleteItem>
                  ))} */}
                </Autocomplete>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-base font-medium mb-2">Loại</h4>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2">
                <Autocomplete
                  aria-labelledby="province-label"
                  placeholder=""
                  variant="bordered"
                  className="w-full"
                  defaultSelectedKey={1}
                  allowsEmptyCollection={false}
                  size="sm"
                  selectedKey={typeSelected}
                  isClearable={false}
                  onSelectionChange={(value) => {
                    if (value == 1) {
                      setJobSelected("");
                      setTypeCodeSelected("");
                    } else if (value == 2) {
                      setTypeCodeSelected("");
                    } else if (value == 3) {
                      setJobSelected("");
                    }
                    setTypeSelected(value);
                  }}
                >
                  <AutocompleteItem key={"1"} value={"1"}>
                    Tất cả
                  </AutocompleteItem>
                  <AutocompleteItem key={"2"} value={"2"}>
                    Ngành
                  </AutocompleteItem>
                  <AutocompleteItem key={"3"} value={"3"}>
                    Nhóm
                  </AutocompleteItem>
                </Autocomplete>
              </div>

              {/* {typeSelected == 2 && (
                <div className="col-span-3">
                  <Autocomplete
                    aria-label="Job"
                    placeholder="Chọn ngành"
                    variant="bordered"
                    onSelectionChange={(value) => {
                      console.log("\n\n\n=>value", value);
                      setJobSelected(value);
                    }}
                    selectedKeys={jobSelected}
                    size="sm"
                  >
                    {dataJobAuto?.map((job) => (
                      <AutocompleteItem
                        key={job.MANGANH}
                        value={job.MANGANH}
                        textValue={job.MANGANH}
                        endContent={<div> {job.count} dòng khả dụng</div>}
                      >
                        {job.TENNGANH}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              )} */}

              {typeSelected == 3 && (
                <div className="col-span-3">
                  <Autocomplete
                    isClearable={false}
                    allowsEmptyCollection={false}
                    aria-labelledby="province-label"
                    placeholder="Chọn nhóm"
                    selectedKey={typeCodeSelected}
                    onSelectionChange={(value) => setTypeCodeSelected(value)}
                    variant="bordered"
                    size="sm"
                  >
                    {otherJob.map((job) => (
                      <AutocompleteItem key={job.value} value={job.value}>
                        {job.label}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              )}
            </div>
          </div>

          {/* Show data availble */}
          <div>
            <span>
              Tổng số dòng chưa phân đoạn: <span>{dataAvailable?.total}</span>
            </span>
          </div>
        </div>

        <Divider />

        <div className="grid-cols-12">
          <div className="flex gap-2">
            <h1 className="mb-2 text-lg font-medium">Dữ liệu</h1>
            {notification?.map((notification, index) => (
              <Chip
                key={index}
                onClose={() => handleClose(notification)}
                variant="flat"
                color="primary"
              >
                Một học sinh có thể có nhiều ngành yêu thích
              </Chip>
            ))}
          </div>
          <div className="flex mb-2 items-center justify-between gap-2">
            <div className="border-1">
              <Input
                isClearable
                className="min-w-[300px]"
                placeholder="Tìm kiếm theo tên"
                size="sm"
                startContent={<SearchIcon className="text-default-300" />}
                variant="bordered"
                onClear={() => setFillterSearchName("")}
                onValueChange={debounce(onSearchChange, 300)}
              />
            </div>

            <div className="col-span-1 ">
              <Button
                color="primary"
                className=""
                onPress={onOpen}
                isDisabled={schoolSelected == ""}
              >
                Phân đoạn
              </Button>
            </div>
          </div>
        </div>

        <Table
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          checkboxesProps={{
            classNames: {
              wrapper:
                "after:bg-foreground after:text-background text-background",
            },
          }}
          sortDescriptor={sortDescriptor}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
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
          <TableBody
            emptyContent={"Không tìm thấy người dùng"}
            items={paginatedItems}
          >
            {(item) => (
              <TableRow key={item.madoan}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Phân đoạn dữ liệu
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-2">
                  {jobSelected && jobSelected === "NG08" && (
                    <Autocomplete
                      label="Chọn nhóm ngành"
                      defaultItems={typeMajors}
                      className="max-w-xs"
                      selectedKey={typeMajorsSelected}
                      onSelectionChange={setTypeMajorsSelected}
                    >
                      {(item) => (
                        <AutocompleteItem
                          key={item.MANHOMNGANH}
                          value={item.MANHOMNGANH}
                          textValue={item.TENNHOMNGANH}
                        >
                          {item.TENNHOMNGANH} {item.count} dòng khả dụng
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                  <Input
                    type="Number"
                    label="Nhập số lượng dòng trên 1 đoạn"
                    value={segment}
                    onValueChange={setSegment}
                    isInvalid={errors && errors.segment ? true : false}
                    errorMessage={errors && errors.segment}
                  />
                </div>
                <div className="flex">
                  <div className="flex gap-1">
                    Dữ liệu khả dụng:{" "}
                    {jobSelected === "NG08"
                      ? numberSegment
                      : numberSegment != 0
                      ? numberSegment?.[0].count
                      : dataJob?.allCount}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleCloseModal}
                >
                  Đóng
                </Button>
                <Button
                  color="primary"
                  isDisabled={segment > 0 ? false : true}
                  onPress={handleSegment}
                >
                  Phân đoạn
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default SegmentData;
