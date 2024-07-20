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
  Pagination,
  useDisclosure,
  Tooltip,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { SearchIcon } from "../components/icons/SearchIcon";
import { ChevronDownIcon } from "../components/icons/ChevronDownIcon";
import ModalComponent from "../components/Modal/ModalComponent";
import { EditIcon } from "../components/icons/EditIcon";
import { DeleteIcon } from "../components/icons/DeleteIcon";
import useSWR from "swr";
import { API_THEMATIC, API_DATA, API_USER } from "../constants";
import debounce from "lodash.debounce";
import moment from "moment";
import FormThematic from "../components/body/FormThematic";
import ThematicService from "../service/ThematicService";
import { toast } from "react-toastify";
import FormThematicEdit from "../components/body/FormThematicEdit";
import ModalThematic from "../components/Modal/ModalThematic";
import { Popconfirm } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import excel from "../components/ExportFile/ExportFile";

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "tenchuyende",
  "tentruong",
  "usermanager",
  "ngaythongbao",
  "ngaytochuc",
  "noidung",
  "soluong",
  "actions",
];
function ManagerThematic() {
  const { data: dataUM, mutate: fetchDataUM } = useSWR(
    `${API_USER}/user-manager`
  );
  const [thematicSelected, setThematicSelected] = useState("");
  const [SDTUM, setSDTUM] = useState("");

  const { data: dataThematic, mutate: fetchDataThematic } = useSWR(
    `${API_THEMATIC}/readAll?MACHUYENDE=${thematicSelected || ""}&SDT=${
      SDTUM || ""
    }`
  );
  const [record, setRecord] = useState();

  // Modal
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  // console.log("Data thematic", dataThematic);

  const [filterSearchName, setFillterSearchName] = useState("");
  const data = useMemo(() => {
    return (
      dataThematic?.results?.map((thematic, index) => {
        return {
          id: index + 1,
          machuyende: thematic?.MACHUYENDE,
          tenchuyende: thematic?.TENCHUYENDE,
          tentruong: thematic?.MATRUONG,
          usermanager: thematic?.usermanager?.HOTEN || "",
          ngaythongbao: thematic?.THOIGIANTHONGBAO,
          ngaytochuc: thematic?.THOIGIANTOCHUCCHUYENDE,
          noidung: thematic?.NOIDUNG,
          soluong: thematic?.truong?.khachhang?.length,
          sdt: thematic?.SDT,
        };
      }) || []
    );
  }, [dataThematic]);

  const columns = [
    { name: "STT", uid: "id", sortable: true },
    { name: "Tên chuyên đề", uid: "tenchuyende" },
    { name: "Tên trường", uid: "tentruong" },
    { name: "User manager", uid: "usermanager" },
    { name: "Ngày thông báo", uid: "ngaythongbao", sortable: true },
    { name: "Ngày tổ chức", uid: "ngaytochuc", sortable: true },
    { name: "Nội dung", uid: "noidung" },
    { name: "Số khách hàng", uid: "soluong" },
    { name: "Tùy chọn", uid: "actions" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
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
        data.tenchuyende.toLowerCase().includes(filterSearchName.toLowerCase())
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

  const renderCell = useCallback((thematic, columnKey) => {
    const cellValue = thematic[columnKey];

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
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="edit">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => hanldeShowEdit(thematic)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => confirm(thematic)}
                onCancel={cancel}
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

  useEffect(() => {
    if (dataThematic) {
      const totalPages = Math.ceil(dataThematic.totalRows / rowsPerPage);
      setTotal(totalPages > 0 ? totalPages : 1);
    }
  }, [dataThematic, rowsPerPage]);

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
            Tổng {data.length} chuyên đề
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

  const onSubmit = async (data) => {
    try {
      const currentDay = moment().format("YYYY-MM-DD");
      const dataThematic = {
        TENCHUYENDE: data.thematicName,
        THOIGIANTHONGBAO: currentDay,
        THOIGIANTOCHUCCHUYENDE: data.dateSelect,
        NOIDUNG: data.thematicContent,
        MATRUONG: data.school,
        SDT: data.usermanager,
      };
      const res = await ThematicService.createThematic(dataThematic);
      fetchDataThematic();
      toast.success(res.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const hanldeShowEdit = (data) => {
    setRecord(data);
    onOpenEdit();
  };

  const onSubmitEdit = async (data) => {
    try {
      const ngaytochucFormat = moment(data.ngaytochuc).format("YYYY-MM-DD");
      const dataThematicEdit = {
        MACHUYENDE: data.id,
        TENCHUYENDE: data.tenchuyende,
        THOIGIANTOCHUCCHUYENDE: ngaytochucFormat,
        NOIDUNG: data.noidung,
        MATRUONG: data.tentruong,
        SDT: data.sdt,
      };
      const res = await ThematicService.updateThematic(dataThematicEdit);
      fetchDataThematic();
      toast.success(res.message);
      setRecord(null);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const confirm = async (e) => {
    try {
      const data = {
        MACHUYENDE: e.machuyende,
      };
      const res = await ThematicService.deleteThematic(data);
      fetchDataThematic();
      toast.success(res.message);
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  };
  const cancel = (e) => {
    console.log(e);
  };

  // XU LI DU LIEU EXCEL
  function combineData(dataDetail) {
    const combinedResults = dataDetail?.truong?.khachhang.map((khachhang) => {
      dataDetail?.chitietchuyende.forEach((cttd) => {
        if (khachhang.SDT == cttd?.SDT) {
          khachhang.chitietchuyende = cttd?.TRANGTHAI;
        } else {
          khachhang.chitietchuyende = "";
        }
      });
      return {
        ...khachhang,
      };
    });

    return combinedResults;
  }
  const handleEXcel = () => {
    const header = [
      {
        header: "STT",
        key: "STT",
      },
      {
        header: "Tên chuyên đề",
        key: "TENCHUYENDE",
      },
      {
        header: "Trường",
        key: "TRUONG",
      },
      {
        header: "Người quản lý",
        key: "NGUOIQUANLY",
      },
      {
        header: "Ngày tổ chức",
        key: "NGAYTOCHUC",
      },
      {
        header: "Đồng ý",
        key: "DONGY",
      },
      {
        header: "Không đồng ý",
        key: "KHONGDONGY",
      },
      {
        header: "Xem lại",
        key: "XEMLAI",
      },
      {
        header: "Khác",
        key: "KHAC",
      },
    ];

    const data = dataThematic?.results?.map((item, index) => {
      let chitiet = combineData(item);
      return {
        ...item,
        chitiet,
      };
    });

    let dataEx = data?.map((item, index) => {
      return {
        STT: index + 1,
        TENCHUYENDE: item?.TENCHUYENDE,
        TRUONG: item?.truong?.TENTRUONG,
        NGUOIQUANLY: item?.usermanager?.HOTEN,
        NGAYTOCHUC: item?.THOIGIANTOCHUCCHUYENDE,
        DONGY: item?.chitiet?.reduce((init, d) => {
          return d?.chitietchuyende == "Đồng ý" ? init + 1 : init;
        }, 0),
        KHONGDONGY: item?.chitiet?.reduce((init, d) => {
          return d?.chitietchuyende == "Không đồng ý" ? init + 1 : init;
        }, 0),
        XEMLAI: item?.chitiet?.reduce((init, d) => {
          return d?.chitietchuyende == "Xem lại" ? init + 1 : init;
        }, 0),
        KHAC: item?.chitiet?.reduce((init, d) => {
          return d?.chitietchuyende == "" ? init + 1 : init;
        }, 0),
      };
    });

    let nameExcel = "Quản lí chuyên đề";

    excel.EX_Excel({ header, data: dataEx, nameFile: nameExcel });
  };

  const handleEXcelDetail = (data) => {
    const header = [
      {
        header: "STT",
        key: "STT",
      },
      {
        header: "Tên chuyên đề",
        key: "TENCHUYENDE",
      },
      {
        header: "Người quản lý",
        key: "NGUOIQUANLY",
      },
      {
        header: "Ngày tổ chức",
        key: "NGAYTOCHUC",
      },
      {
        header: "Đồng ý",
        key: "DONGY",
      },
      {
        header: "Không đồng ý",
        key: "KHONGDONGY",
      },
      {
        header: "Xem lại",
        key: "XEMLAI",
      },
      {
        header: "Khác",
        key: "KHAC",
      },
    ];

    const data1 = data?.map((item, index) => {
      return {
        STT: index + 1,
        NAME: item?.usermanager ? item?.usermanager.HOTEN : item?.admin.HOTEN,
        PHONE: item?.usermanager ? item?.usermanager.SDT : item?.admin.SDT,
        TYPE: item?.usermanager?.SDT
          ? "UM"
          : "" || item?.admin?.MAADMIN
          ? "ADMIN"
          : "",
        TIME: handleTotalTimeWithItem(item?.thoigiandangnhap),
      };
    });

    excel.EX_Excel({ header, data1, nameFile: nameExcel });
  };

  return (
    <>
      <div className="">
        <div
          className="mt-3"
          style={{
            padding: 24,
            minHeight: 385,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <h1 className="mb-2 text-lg font-medium">Quản lý chuyên đề</h1>

          <div className="flex flex-col gap-4 mt-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-3 items-end">
                <div className="flex gap-2">
                  <Autocomplete
                    aria-labelledby="province-label"
                    placeholder="Chọn chuyên đề"
                    variant="bordered"
                    defaultItems={data}
                    className="max-w-xs"
                    selectedKey={thematicSelected}
                    onSelectionChange={setThematicSelected}
                    listboxProps={{
                      emptyContent: "Không có chuyên đề",
                    }}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.machuyende}>
                        {item.tenchuyende}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                  <Autocomplete
                    aria-labelledby="province-label"
                    placeholder="Chọn user manager"
                    variant="bordered"
                    defaultItems={dataUM || []}
                    className="max-w-xs"
                    selectedKey={SDTUM}
                    onSelectionChange={setSDTUM}
                    listboxProps={{
                      emptyContent: "Your own empty content text.",
                    }}
                  >
                    {(item) => (
                      <AutocompleteItem key={item.SDT}>
                        {item.usermanager.HOTEN}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
                {/* <Input
                  isClearable
                  classNames={{
                    base: "w-full sm:max-w-[30%]",
                    inputWrapper: "border-1",
                  }}
                  placeholder="Tìm kiếm theo tên chuyên đề"
                  size="sm"
                  startContent={<SearchIcon className="text-default-300" />}
                  variant="bordered"
                  onClear={() => setFillterSearchName("")}
                  onValueChange={debounce(onSearchChange, 300)}
                /> */}
                <div className="flex gap-3">
                  <Button
                    size="sm"
                    className="p-4 ms-auto"
                    color="primary"
                    onClick={handleEXcel}
                  >
                    <FontAwesomeIcon icon={faFile} /> Xuất file
                  </Button>
                  <Button
                    color="primary"
                    className="h-100 ms-auto"
                    onPress={onOpen}
                    size="sm"
                  >
                    Thêm chuyên đề
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center"></div>
            </div>
          </div>

          <Table
            // isCompact
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
              emptyContent={"Không tìm thấy chuyên đề"}
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
        <ModalThematic
          footer={false}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          size="2xl"
        >
          <FormThematic onClose={onClose} onSubmit={onSubmit} />
        </ModalThematic>
        <ModalThematic
          footer={false}
          isOpen={isOpenEdit}
          onOpen={onOpenEdit}
          onClose={onCloseEdit}
          size="2xl"
          okModal="Thêm người dùng"
          cancelModal="Đóng"
          title="Chỉnh sửa chuyên đề"
        >
          <FormThematicEdit
            onClose={onCloseEdit}
            onSubmit={onSubmitEdit}
            record={record}
          />
        </ModalThematic>
      </div>
    </>
  );
}

export default ManagerThematic;
