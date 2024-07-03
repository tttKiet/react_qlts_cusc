import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Divider,
  Input,
  Link,
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
import { Popconfirm } from "antd";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FcAcceptDatabase } from "react-icons/fc";
import { FiFolder } from "react-icons/fi";
import { TbFilterDown } from "react-icons/tb";
import { toast } from "react-toastify";
import useSWR from "swr";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import { EditIcon } from "../components/icons/EditIcon";
import { EyeIcon } from "../components/icons/EyeIcon";
import { SearchIcon } from "../components/icons/SearchIcon";
import ModalSegment from "../components/Modal/ModalSegment";
import { API_DATA } from "../constants";
import segmentService from "../service/SegmentService";
import moment from "moment";
import ModalSegmentPermission from "../components/Modal/ModalSegmentPermission";
import { AiOutlinePhone } from "react-icons/ai";
import ModalConfirm from "../components/Modal/ModalConfirm";
import ModalSegmentOpenContact from "../components/Modal/ModalSegmentOpenContact";
import { TbReceiptRefund } from "react-icons/tb";

function DivisionData() {
  // Const
  const otherJob = [
    { value: "1", label: "CNTT" },
    { value: "2", label: "Gần CNTT" },
    { value: "3", label: "Học bổng" },
  ];

  const columns = [
    { name: "Mã đoạn", uid: "madoan", sortable: true },
    { name: "User manager", uid: "usermanager", sortable: true },
    { name: "Tên trường", uid: "tentruong", sortable: true },
    { name: "Số dòng", uid: "sodong", sortable: true },
    { name: "Lần liên hệ", uid: "contacts" },
    { name: "Ngày phân quyền", uid: "tgphan", sortable: true },
    { name: "Ngày tạo đoạn", uid: "createdAt", sortable: true },
    { name: "Action", uid: "actions" },
  ];

  const INITIAL_VISIBLE_COLUMNS = [
    "usermanager",
    "tentruong",
    "sodong",
    "madoan",
    "contacts",
    "actions",
    "tgphan",
    "createdAt",
  ];

  const optionTimes = [
    {
      label: "Lần 1",
      value: "1",
    },
    {
      label: "Lần 2",
      value: "2",
    },
    {
      label: "Lần 3",
      value: "3",
    },
    {
      label: "Lần 4",
      value: "4",
    },
    {
      label: "Lần 5",
      value: "5",
    },
    {
      label: "Lần 6",
      value: "6",
    },
    {
      label: "Lần 7",
      value: "7",
    },
    {
      label: "Đóng",
      value: "0",
    },
  ];

  // State
  const [schoolSelected, setSchoolSelected] = useState("");
  const [provinceSelected, setProvinceSelected] = useState("");
  const [jobSelected, setJobSelected] = useState("");
  const [sementEdit, setSementEdit] = useState("");
  const [segmentEditOpen, setSegmentEditOpen] = useState(null);
  const [typeCodeSelected, setTypeCodeSelected] = useState("");
  const [typeSelected, setTypeSelected] = useState("1");
  const [doneSelected, setDoneSelected] = useState("all");
  const [filterSearchName, setFillterSearchName] = useState("");
  const [page, setPage] = useState(1);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const {
    isOpen: isOpenRefund,
    onOpen: onOpenRefund,
    onClose: onCloseRefund,
  } = useDisclosure();

  const {
    isOpen: isOpenOpenContact,
    onOpen: onOpenOpenContact,
    onClose: onCloseOpenContact,
  } = useDisclosure();

  const [total, setTotal] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "STT",
    direction: "ascending",
  });
  const [visibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));

  // Chip
  const [notification, setNotification] = useState(["Notification"]);
  const handleClose = (fruitToRemove) => {
    setNotification(notification.filter((fruit) => fruit !== fruitToRemove));
  };

  // Fetch api
  const { data: dataProvince } = useSWR(`${API_DATA}/province`);
  const { data: dataSchool } = useSWR(
    `${API_DATA}/school?provinceCode=${provinceSelected || ""}`
  );
  const { data: dataJob } = useSWR(`${API_DATA}/job-like`);

  const { data: dataSegment, mutate: mutateSegment } = useSWR(
    `${API_DATA}/segment?MATINH=${provinceSelected || ""}&MANGANH=${
      jobSelected || ""
    }&schoolCode=${schoolSelected || ""}&MANHOM=${
      typeCodeSelected || ""
    }&type=${doneSelected || ""}`
  );

  // Function
  async function handleSubmitOpencontact(choose) {
    try {
      const data = {
        MAPQ: segmentEditOpen.madoan,
        TRANGTHAILIENHE: choose,
      };
      const res = await segmentService.updateSegment(data);
      console.log("res: ", res);
      toast.success("Đã cập nhật.");
      onCloseOpenContact();
      setSegmentEditOpen("");
      mutateSegment();
    } catch (error) {
      console.log("error ", error);
      toast.error(
        error?.message ||
          error?.message?.[0] ||
          "Lỗi không xác định. Vui lòng thử lại."
      );
    }
  }

  function handleOpenContact(segment) {
    if (!segment.usermanager) {
      return toast.warning(
        "Bạn cần phân quyền cho Usermanager để mở liên hệ.",
        {}
      );
    }
    setSegmentEditOpen(segment);
    onOpenOpenContact();
  }

  async function handleClickDeleteSegment(madoan) {
    setSementEdit(madoan);
    onOpenConfirm();
  }

  async function handleClickRefundSegment(madoan) {
    setSementEdit(madoan);
    onOpenRefund();
  }

  async function handleClickSegment(madoan) {
    try {
      const res = await segmentService.deleteSegment([madoan]);
      console.log("res: ", res);
      toast.success("Đã xóa thành công.");
      onCloseConfirm();
      setSementEdit("");
      mutateSegment();
    } catch (error) {
      console.log("error ", error);
      toast.error(
        error?.message ||
          error?.message?.[0] ||
          "Lỗi không xác định. Vui lòng thử lại."
      );
    }
  }

  async function handleRefundSegment(madoan) {
    try {
      const res = await segmentService.refundSegment({
        MAPQ: madoan,
      });
      console.log("res: ", res);
      toast.success("Đã thu hồi thành công.");
      onCloseRefund();
      setSementEdit("");
      mutateSegment();
    } catch (error) {
      console.log("error ", error);
      toast.error(
        error?.message ||
          error?.message?.[0] ||
          "Lỗi không xác định. Vui lòng thử lại."
      );
    }
  }

  async function handleSubmitCreateSegment({ usermanager }) {
    const arrRows = Array.from(selectedKeys.values());

    const data = {
      SDT_USERMANAGER: usermanager,
      MAPQ: arrRows,
      TRANGTHAILIENHE: "0",
    };

    try {
      const res = await segmentService.divisionSegment(data);
      //
      console.log("res:", res);
      toast.success("Phân quyền thành công.");
      setSelectedKeys(new Set([]));
      mutateSegment();
    } catch (error) {
      console.log("error ", error);

      toast.error(
        error?.message ||
          error?.message?.[0] ||
          "Lỗi không xác định. Vui lòng thử lại."
      );
    }
  }

  function handleChangeChooseRows(rows) {
    if (rows == "all") {
      const indexes = sortedItems?.map((d) => d.madoan) || [];

      setSelectedKeys(new Set(indexes));
    } else {
      setSelectedKeys(rows);
    }
  }

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const data = useMemo(() => {
    return (
      dataSegment?.map((segment, i) => {
        return {
          key: i + 1,
          id: i + 1,
          madoan: segment?.MaPQ,
          tgphan: segment?.THOIGIANPQ,
          usermanager: segment?.usermanager?.HOTEN,
          tentruong: segment?.truong?.TENTRUONG,
          sodong: segment?.Sodong,
          sdt: segment?.SDT,
          contacts: segment?.TRANGTHAILIENHE,
          createdAt: segment?.createdAt,
        };
      }) || []
    );
  }, [dataSegment]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...data];
    if (filterSearchName) {
      filteredUsers = filteredUsers.filter(
        (data) =>
          data?.madoan
            ?.toLowerCase()
            .includes(filterSearchName.toLowerCase()) ||
          data?.usermanager
            ?.toLowerCase()
            .includes(filterSearchName.toLowerCase())
      );
    }
    return filteredUsers;
  }, [data, filterSearchName]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const paginatedItems = useMemo(() => {
    const startIdx = (page - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    return sortedItems.slice(startIdx, endIdx);
  }, [sortedItems, page, rowsPerPage]);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns]);

  const dataJobAuto = useMemo(() => {
    let temp = Array.isArray(dataJob)
      ? dataJob
          ?.map((d) => ({
            label: d.TENNGANH,
            value: d.MANGANH,
            ...d,
          }))
          ?.filter((d) => d.TENNGANH != "NGÀNH KHÁC")
      : dataJob?.data
          ?.map((d) => ({
            label: d.TENNGANH,
            value: d.MANGANH,
            ...d,
          }))
          ?.filter((d) => d.TENNGANH != "NGÀNH KHÁC");

    return temp;
  }, [dataJob]);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFillterSearchName(value);
      setPage(1);
    } else {
      setFillterSearchName("");
    }
  }, []);

  useEffect(() => {
    if (!provinceSelected) {
      setSchoolSelected("");
    }
  }, [provinceSelected]);

  useEffect(() => {
    if (sortedItems) {
      const totalPages = Math.ceil(sortedItems.length / rowsPerPage);
      setTotal(totalPages > 0 ? totalPages : 1);
    }
  }, [sortedItems, rowsPerPage]);

  // Component Table
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
        </div>
        <div className="flex justify-between items-center mb-2 gap-5">
          <span className="text-default-400 text-small">
            Tổng {data.length} dòng
          </span>
          <span>|</span>
          <label className="flex items-center text-default-400 text-small">
            Dòng trên trang:
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
  }, [data.length, onRowsPerPageChange, page, rowsPerPage, total]);

  const renderCell = useCallback((segment, columnKey) => {
    const cellValue = segment[columnKey];

    switch (columnKey) {
      case "tgphan":
        return (
          <div className="flex flex-col justify-center">
            <span className="text-bold text-small">
              {cellValue ? (
                moment(cellValue)?.format("DD-MM-YYYY")
              ) : (
                <span className="text-gray-400">./</span>
              )}
            </span>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex flex-col justify-center">
            <span className="text-bold text-small">
              {cellValue ? (
                moment(cellValue)?.format("DD-MM-YYYY")
              ) : (
                <span className="text-gray-400">./</span>
              )}
            </span>
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
            <span className="text-bold text-small">
              {cellValue ? (
                <Chip color="success" radius="sm" size="sm" variant="flat">
                  {cellValue}
                </Chip>
              ) : (
                <span className="text-gray-400"> Chưa phân</span>
              )}
            </span>
          </div>
        );
      case "tentruong":
        return (
          <div className="flex flex-col justify-center">
            <span className="text-bold text-small capitalize">
              {cellValue ? (
                <span className="font-medium">{cellValue}</span>
              ) : (
                <span className=" text-gray-400">Không có dữ liệu</span>
              )}
            </span>
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
      case "actions":
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip content="Mở liên hệ">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => handleOpenContact(segment)}
              >
                <EditIcon />
              </span>
            </Tooltip>

            <Tooltip content="Xem danh sách">
              <Link
                href={`/admin/segment/${segment?.madoan}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </Link>
            </Tooltip>

            <Tooltip color="danger" content="Thu hồi">
              <span
                onClick={() => handleClickRefundSegment(segment?.madoan)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <TbReceiptRefund />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Xóa đoạn">
              <span
                onClick={() => handleClickDeleteSegment(segment?.madoan)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="p-6 bg-white min-h-[425px] rounded-lg shadow">
      <div className="mb-6">
        <h1 className="mb-2 text-lg font-medium col-span-12 flex items-center gap-2">
          <TbFilterDown size={20} />
          Lọc dữ liệu
        </h1>

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
                isDisabled={provinceSelected != "" ? false : true}
                selectedKey={schoolSelected}
                onSelectionChange={(value) => setSchoolSelected(value)}
              >
                {dataSchool?.map((school) => (
                  <AutocompleteItem
                    key={school.MATRUONG}
                    value={school.MATRUONG}
                  >
                    {school.TENTRUONG}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-6">
          <div className="col-span-1 w-full">
            <h4 className="text-base font-medium mb-2">Loại</h4>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-5">
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

              {typeSelected == 2 && (
                <div className="col-span-5">
                  <Autocomplete
                    aria-label="Job"
                    placeholder="Chọn ngành"
                    variant="bordered"
                    onSelectionChange={(value) => {
                      setJobSelected(value);
                    }}
                    selectedKeys={jobSelected}
                    size="sm"
                    required={true}
                  >
                    {dataJobAuto?.map((job) => (
                      <AutocompleteItem
                        key={job.MANGANH}
                        value={job.MANGANH}
                        textValue={job.TENNGANH}
                        classNames={{}}
                      >
                        <div className="font-medium"> {job.TENNGANH}</div>
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>
                </div>
              )}
              {typeSelected == 3 && (
                <div className="col-span-5">
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
          <div className="col-span-1 w-full">
            <h4 className="text-base font-medium mb-2">Phân quyền</h4>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-5">
                <Autocomplete
                  aria-labelledby="province-label"
                  placeholder=""
                  variant="bordered"
                  className="w-full"
                  defaultSelectedKey={1}
                  allowsEmptyCollection={false}
                  size="sm"
                  selectedKey={doneSelected}
                  isClearable={false}
                  onSelectionChange={(value) => {
                    setDoneSelected(value);
                  }}
                >
                  <AutocompleteItem key={"all"} value={"all"}>
                    Tất cả
                  </AutocompleteItem>
                  <AutocompleteItem key={"done"} value={"done"}>
                    Đã phân quyền
                  </AutocompleteItem>
                  <AutocompleteItem key={"doing"} value={"doing"}>
                    Chưa phân quyền
                  </AutocompleteItem>
                </Autocomplete>
              </div>
            </div>
          </div>
        </div>

        {/* Show data availble */}
        <div>
          <span className="font-medium flex items-center justify-start gap-1">
            <FcAcceptDatabase size={22} /> Tổng số đoạn:
            <span>{dataSegment?.length}</span>
          </span>
        </div>
      </div>

      <Divider />

      <div className="mt-4">
        <div className="grid-cols-12">
          <div className="flex gap-2">
            <h1 className="mb-2 text-lg font-medium flex items-center gap-2 ">
              <FiFolder size={18} />
              Đoạn dữ liệu
            </h1>
          </div>
          <div className="flex mb-4 mt-2 items-center justify-between gap-2">
            <div className="">
              <Input
                isClearable
                className="min-w-[300px]"
                placeholder="Tìm kiếm theo tên"
                size="md"
                startContent={<SearchIcon className="text-default-300" />}
                variant="bordered"
                onClear={() => setFillterSearchName("")}
                onValueChange={debounce(onSearchChange, 300)}
              />
            </div>

            <div className="col-span-1 flex items-center gap-3">
              <span>Chọn: {selectedKeys.size || 0}</span>
              <span> | </span>
              <Button
                color="primary"
                className=""
                onPress={onOpen}
                isDisabled={sortedItems.length == 0 || selectedKeys.size == 0}
              >
                Phân quyền
              </Button>
            </div>
          </div>
        </div>

        {/* table */}
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
          selectedKeys={selectedKeys}
          sortDescriptor={sortDescriptor}
          topContentPlacement="outside"
          onSelectionChange={handleChangeChooseRows}
          onSortChange={setSortDescriptor}
          selectionMode="multiple"
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
            emptyContent={
              <div className=" font-medium text-base">
                Tất cả khách hàng đã được phân đoạn.
              </div>
            }
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

      {/* modal */}
      <ModalSegmentPermission
        isOpen={isOpen}
        selectedKeys={selectedKeys}
        onClose={onClose}
        handleSubmit={handleSubmitCreateSegment}
      />

      <ModalSegmentOpenContact
        isOpen={isOpenOpenContact}
        onClose={onCloseOpenContact}
        segmentEditOpen={segmentEditOpen}
        handleSubmit={handleSubmitOpencontact}
      />

      <ModalConfirm
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        madoan={sementEdit}
        handleSubmit={handleClickSegment}
        title={"Bạn có chắc muốn xóa đoạn " + sementEdit + "?"}
        content={"Thao tác xóa đoạn sẽ không thể khôi phục."}
      />

      <ModalConfirm
        isOpen={isOpenRefund}
        onClose={onCloseRefund}
        madoan={sementEdit}
        handleSubmit={handleRefundSegment}
        title={"Thu hồi quyền cho đoạn đoạn " + sementEdit + "?"}
        content={"Thao tác xóa quyền cập nhật của Usermanager."}
      />
    </div>
  );
}

export default DivisionData;
