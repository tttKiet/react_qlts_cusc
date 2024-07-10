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
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  useDisclosure,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Tooltip,
  CardHeader,
  CardBody,
  Card,
  Image,
  Autocomplete,
  AutocompleteItem,
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
import useSWR from "swr";
import { API_DATA, API_USER } from "../constants";
import debounce from "lodash.debounce";
import FormUser from "../components/body/FormUser";
import UserService from "../service/UserService";
import { Link } from "react-router-dom";
import { Popconfirm, Tag } from "antd";
import { toast } from "react-toastify";
const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "sdt",
  "hoten",
  "email",
  "sdtba",
  "sdtme",
  "zalo",
  "tentruong",
  "nganh",
  "actions",
];

import excel from "../components/ExportFile/ExportFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
function ListData() {
  const [provinceSelected, setProvinceSelected] = useState("");
  const [schoolSelected, setSchoolSelected] = useState("");
  const [jobSelected, setJobSelected] = useState("");

  const [urlCustomer, setUrlCustomer] = useState("");

  const [urlSchool, setUrlSchool] = useState(`${API_DATA}/school`);
  const [urlJob, setUrlJob] = useState(`${API_DATA}/job-like`);
  const { data: dataProvince, mutate } = useSWR(`${API_DATA}/province`);

  useEffect(() => {
    if (provinceSelected) {
      setSchoolSelected("");
      setUrlSchool(`${API_DATA}/school?provinceCode=${provinceSelected}`);
      setUrlCustomer(`provinceCode=${provinceSelected}`);
    }
  }, [provinceSelected]);
  const { data: dataSchool } = useSWR(urlSchool);

  useEffect(() => {
    if (schoolSelected) {
      setUrlJob(`${API_DATA}/job-like?schoolCode=${schoolSelected}`);
      setUrlCustomer(
        `provinceCode=${provinceSelected}&schoolCode=${schoolSelected}`
      );
    }
  }, [schoolSelected]);

  const { data: dataJob } = useSWR(urlJob);

  useEffect(() => {
    if (jobSelected) {
      setUrlCustomer(
        `provinceCode=${provinceSelected}&schoolCode=${schoolSelected}&jobCode=${jobSelected}`
      );
    }
  }, [jobSelected]);

  const { data: dataCustomer, mutate: fetchDataCusomter } = useSWR(
    `${API_DATA}/customer?${urlCustomer}`
  );
  //   console.log("dataCustomer", dataCustomer);

  const [filterSearchName, setFillterSearchName] = useState("");
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
    return (
      dataCustomer?.map((customer, index) => {
        return {
          id: index + 1,
          sdt: customer?.dulieukhachhang?.SDT || "",
          hoten: customer?.HOTEN || "",
          email:
            (customer?.EMAIL === "Không có" ? "" : customer?.EMAIL) ||
            "",
          sdtba:
            (customer?.SDTBA === "Không có" ? "" : customer?.SDTBA) ||
            "",
          sdtme:
            (customer?.SDTME === "Không có" ? "" : customer?.SDTME) ||
            "",
          zalo:
            (customer?.ZALO === "Không có" ? "" : customer?.ZALO) ||
            "",
          tentruong: customer?.truong?.TENTRUONG || "",
          nganh: customer?.nganhyeuthich,
        };
      }) || []
    );
  }, [dataCustomer]);

  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({});
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
        data.sdt.toLowerCase().includes(filterSearchName.toLowerCase())
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
            {cellValue?.length > 0 ? (
              <>
                {cellValue.slice(0, 2).map((job, index) => (
                  <Tag key={index} bordered={false} color="processing">
                    {job?.MANGANH}
                  </Tag>
                ))}
                {cellValue.length > 2 && <span>...</span>}
              </>
            ) : (
              ""
            )}
          </div>
        );
      case "actions":
        return (
          <div className="relative flex gap-2">
            <Tooltip content="Details">
              <Link
                to={`/admin/data/${user?.sdt}`}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </Link>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Link
                  to={`/admin/data/edit/${user?.sdt}`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EditIcon />
                </Link>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => confirm(user)}
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

  const [total, setTotal] = useState(1);

  useEffect(() => {
    if (dataCustomer) {
      const totalPages = Math.ceil(dataCustomer.length / rowsPerPage);
      setTotal(totalPages > 0 ? totalPages : 1);
    }
  }, [dataCustomer, rowsPerPage]);

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
            Total {data.length} users
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

  const confirm = async (e) => {
    try {
      console.log(e);
      const data = {
        TENDANGNHAP: e.sdt,
      };
      const res = await UserService.deleteUser(data);
      fetchDataCusomter();
      toast.success(res.message);
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  // XU LI DU LIEU EXCEL
  const handleEXcel = () => {
    const header = [
      {
        header: "STT",
        key: "STT",
      },
      {
        header: "Họ và tên",
        key: "HOTEN",
      },
      {
        header: "Tỉnh/Thành phố",
        key: "CCCD",
      },
      {
        header: "Trường",
        key: "TRUONG",
      },
      {
        header: "Điện thoại",
        key: "DIENTHOAI",
      },
      {
        header: "Điện thoại ba",
        key: "DIENTHOAIBA",
      },
      {
        header: "Điện thoại mẹ",
        key: "DINETHOAIME",
      },
      {
        header: "Số Zalo",
        key: "ZALO",
      },
      {
        header: "Facebook",
        key: "FACEBOOK",
      },
      {
        header: "Email",
        key: "EMAIL",
      },
    ];
    const data2 = [
      {
        STT: 1,
        HOTEN: "Phan dai cat",
        CCCD: "123456789012",
        TRUONG: "CAN THO",
        DIENTHOAI: "0328472724",
        DIENTHOAIBA: "0328472724",
        DINETHOAIME: "",
        ZALO: "",
        FACEBOOK: "",
        EMAIL: "phandaicat12032002@gmail.com",
      },
    ];

    const data = dataCustomer?.map((item, index) => {
      return {
        STT: index + 1,
        HOTEN: item?.HOTEN,
        CCCD: item?.CCCD,
        TRUONG: item?.truong?.TENTRUONG,
        DIENTHOAI: item?.SDT,
        DIENTHOAIBA: item?.dulieukhachhang?.SDTBA,
        DIENTHOAIME: item?.dulieukhachhang?.SDTME,
        ZALO: item?.dulieukhachhang?.SDTZALO,
        FACEBOOK: item?.dulieukhachhang?.FACEBOOK,
        EMAIL: item?.EMAIL,
      };
    });

    excel.EX_Excel({ header, data, nameFile: "Danh sách khách hàng" });
  };

  return (
    <>
      <div className="">
        {/* <h1 className="titlePage">Danh sách dữ liệu</h1> */}
        <div
          className="p-2"
          style={{
            padding: 24,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <h1 className="mb-2 text-lg font-medium">Lọc dữ liệu</h1>
          <div className="justify-items-center grid grid-cols-3">
            <Autocomplete
              // label="Chọn tỉnh thành"
              aria-labelledby="province-label"
              placeholder="Chọn tỉnh"
              className="max-w-xs col-span-3 md:col-span-1 "
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
              // label="Chọn trường"
              aria-labelledby="province-label"
              placeholder="Chọn trường"
              className="max-w-xs col-span-3 md:col-span-1 mt-2 md:mt-0"
              variant="bordered"
              size="sm"
              value={schoolSelected}
              isDisabled={provinceSelected != "" ? false : true}
              onSelectionChange={(value) => setSchoolSelected(value)}
            >
              {dataSchool?.map((school) => (
                <AutocompleteItem key={school.MATRUONG} value={school.MATRUONG}>
                  {school.TENTRUONG || ""}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Select
              items={dataJob || []}
              // label="Chọn ngành"
              aria-labelledby="province-label"
              placeholder="Chọn ngành"
              className="max-w-xs col-span-3 md:col-span-1 mt-2 md:mt-0"
              variant="bordered"
              // selectedKeys={jobSelected}
              // onSelectionChange={setJobSelected}
              onChange={(e) => setJobSelected(e.target.value)}
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
                  <div
                    key={item.data.MANGANH}
                    className="flex items-center gap-2"
                  >
                    <div className="">
                      <span>{item.data.TENNGANH}</span>
                      <span className="text-default-500 text-tiny ms-1">
                        {item.data.count} dòng dữ liệu
                      </span>
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
                      <span className="text-tiny text-default-400 ms-1">
                        {job.count} dòng dữ liệu
                      </span>
                    </div>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
        <div
          className="mt-3"
          style={{
            padding: 24,
            minHeight: 360,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <div className="flex items-center my-2">
            <h1 className="mb-2 text-lg font-medium">Danh sách dữ liệu</h1>
            <div className="ms-auto">
              <Button
                size="sm"
                className="p-4"
                color="primary"
                onClick={handleEXcel}
              >
                <FontAwesomeIcon icon={faFile} /> Xuất file
              </Button>
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
            <TableBody
              emptyContent={"Không tìm thấy người dùng"}
              items={paginatedItems}
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default ListData;
