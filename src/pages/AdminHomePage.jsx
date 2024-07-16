import {
  faClipboardList,
  faDatabase,
  faEllipsisVertical,
  faPencil,
  faPlus,
  faSchool,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, message, Space } from "antd";
import useSWR from "swr";
import { API_CHART, API_MISSCALL, API_NOTE, API_THEMATIC } from "../constants";
import { useEffect, useMemo, useState, useCallback } from "react";
const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "usermanager",
  "segment",
  "contact_1",
  "contact_2",
  "contact_3",
  "contact_4",
  "contact_5",
  "contact_6",
  "contact_7",
];
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
  Progress,
  User,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import NoteService from "../service/NoteService";
function AdminHomePage() {
  const user = useSelector((state) => state.account.user);
  const { data: dataStatic, mutate: fetchDataStatic } = useSWR(
    `${API_CHART}/admin?page=home&index=1`
  );
  const { data: dataAdmission, mutate: fetchDataAdmission } = useSWR(
    `${API_CHART}/admin?page=home&index=2`
  );
  const { data: dataMisscall, mutate: fetchDataMisscall } = useSWR(
    `${API_MISSCALL}/readAll?TRANGTHAI=0`
  );

  const { data: dataSegment, mutate: fetchDataSegment } = useSWR(
    `${API_CHART}/admin?page=home&index=3`
  );
  // console.log("dataSegment", dataSegment);
  const { data: dataNote, mutate: fetchDataNote } = useSWR(
    `${API_NOTE}/readAll?MAADMIN=${user.MAADMIN}`
  );
  const data = useMemo(() => {
    return (
      dataSegment?.map((segment, index) => {
        return {
          id: index + 1,
          usermanager: segment?.segment,
          segment: segment.segment.MaPQ,
          contact_1: segment,
          contact_2: segment,
          contact_3: segment,
          contact_4: segment,
          contact_5: segment,
          contact_6: segment,
          contact_7: segment,
        };
      }) || []
    );
  }, [dataSegment]);

  const columns = [
    { name: "STT", uid: "id", sortable: true },
    { name: "User manager", uid: "usermanager" },
    { name: "Mã phân đoạn", uid: "segment" },
    { name: "Liên hệ lần 1", uid: "contact_1" },
    { name: "Liên hệ lần 2", uid: "contact_2" },
    { name: "Liên hệ lần 3", uid: "contact_3" },
    { name: "Liên hệ lần 4", uid: "contact_4" },
    { name: "Liên hệ lần 5", uid: "contact_5" },
    { name: "Liên hệ lần 6", uid: "contact_6" },
    { name: "Liên hệ lần 7", uid: "contact_7" },
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

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const sortedItems = useMemo(() => {
    return [...data].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, data]);

  const paginatedItems = useMemo(() => {
    const startIdx = (page - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    return sortedItems.slice(startIdx, endIdx);
  }, [sortedItems, page, rowsPerPage]);

  const renderCell = useCallback((thematic, columnKey) => {
    const cellValue = thematic[columnKey];
    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col justify-center">
            <span className="text-bold text-small capitalize">{cellValue}</span>
          </div>
        );
      case "usermanager":
        return (
          <div className="flex flex-col justify-center">
            <span className="text-bold text-small capitalize">
              {cellValue.HOTEN}
            </span>
            <span className="text-bold text-tiny capitalize">
              {cellValue.SDT}
            </span>
          </div>
        );
      case "segment":
        return (
          <div className="flex flex-col justify-center">
            <span className="text-bold text-small capitalize">{cellValue}</span>
          </div>
        );
      case "contact_1":
        return (
          <div className="flex flex-col justify-center">
            <Progress
              aria-label="Loading..."
              size="sm"
              value={cellValue.lienheList.l1}
              maxValue={cellValue.phoneCustomerArray.length}
              color="success"
              showValueLabel={true}
              formatOptions={{ style: "decimal", currencyDisplay: "symbol" }}
            />
          </div>
        );
      case "contact_2":
        return (
          <div className="flex flex-col justify-center">
            <Progress
              aria-label="Loading..."
              size="sm"
              value={cellValue.lienheList.l2}
              maxValue={cellValue.phoneCustomerArray.length}
              color="success"
              showValueLabel={true}
              formatOptions={{ style: "decimal", currencyDisplay: "symbol" }}
            />
          </div>
        );
      case "contact_3":
        return (
          <div className="flex flex-col justify-center">
            <Progress
              aria-label="Loading..."
              size="sm"
              value={cellValue.lienheList.l3}
              maxValue={cellValue.phoneCustomerArray.length}
              color="success"
              showValueLabel={true}
              formatOptions={{ style: "decimal", currencyDisplay: "symbol" }}
            />
          </div>
        );
      case "contact_4":
        return (
          <div className="flex flex-col justify-center">
            <Progress
              aria-label="Loading..."
              size="sm"
              value={cellValue.lienheList.l4}
              maxValue={cellValue.phoneCustomerArray.length}
              color="success"
              showValueLabel={true}
              formatOptions={{ style: "decimal", currencyDisplay: "symbol" }}
            />
          </div>
        );
      case "contact_5":
        return (
          <div className="flex flex-col justify-center">
            <Progress
              aria-label="Loading..."
              size="sm"
              value={cellValue.lienheList.l5}
              maxValue={cellValue.phoneCustomerArray.length}
              color="success"
              showValueLabel={true}
              formatOptions={{ style: "decimal", currencyDisplay: "symbol" }}
            />
          </div>
        );
      case "contact_6":
        return (
          <div className="flex flex-col justify-center">
            <Progress
              aria-label="Loading..."
              size="sm"
              value={cellValue.lienheList.l6}
              maxValue={cellValue.phoneCustomerArray.length}
              color="success"
              showValueLabel={true}
              formatOptions={{ style: "decimal", currencyDisplay: "symbol" }}
            />
          </div>
        );
      case "contact_7":
        return (
          <div className="flex flex-col justify-center">
            <Progress
              aria-label="Loading..."
              size="sm"
              value={cellValue.lienheList.l7}
              maxValue={cellValue.phoneCustomerArray.length}
              color="success"
              showValueLabel={true}
              formatOptions={{ style: "decimal", currencyDisplay: "symbol" }}
            />
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
            setPage(e);
          }}
        />
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
  }, [data.length, page, rowsPerPage, total]);

  const [note, setNote] = useState("");

  const handleCreateNote = async () => {
    try {
      const currentDay = new Date();
      const data = {
        MAADMIN: user.MAADMIN,
        NOIDUNG: note,
        THOIGIAN: currentDay,
        TRANGTHAI: 0,
      };
      const res = await NoteService.createNote(data);
      fetchDataNote();
      toast.success(res.message);
      setNote("");
    } catch (e) {
      console.log(e);
      toast.error(e.message[0]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleCreateNote();
    }
  };

  const handleDeleteNote = async (e) => {
    try {
      const STT = e.STT;
      const res = await NoteService.deleteUser(STT);
      toast.success(res.message);
      fetchDataNote();
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  console.log("start", dataAdmission);

  return (
    <>
      <div>
        <div className="m-4">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full px-2 sm:w-1/2 xl:w-1/4">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-blue-700 bg-opacity-75">
                  <FontAwesomeIcon
                    className="h-5 w-6 text-white"
                    icon={faDatabase}
                  ></FontAwesomeIcon>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {dataStatic?.data.dulieu}
                  </h4>
                  <div className="text-gray-500 font-medium">Dữ liệu</div>
                </div>
              </div>
            </div>
            <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 sm:mt-0">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-green-600 bg-opacity-75">
                  <FontAwesomeIcon
                    className="h-5 w-6 text-white"
                    icon={faClipboardList}
                  ></FontAwesomeIcon>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {dataStatic?.data.chuyendethamgia}
                  </h4>
                  <div className="text-gray-500 font-medium">Chuyên đề</div>
                </div>
              </div>
            </div>
            <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-purple-700 bg-opacity-75">
                  <FontAwesomeIcon
                    className="h-5 w-6 text-white"
                    icon={faSchool}
                  ></FontAwesomeIcon>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {dataStatic?.data.truong}
                  </h4>
                  <div className="text-gray-500 font-medium">Trường</div>
                </div>
              </div>
            </div>
            <div className="w-full mt-6 px-2 sm:w-1/2 xl:w-1/4 xl:mt-0">
              <div className="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                <div className="p-3 rounded-full bg-pink-600 bg-opacity-75">
                  <FontAwesomeIcon
                    className="h-5 w-6 text-white"
                    icon={faUsers}
                    flip="horizontal"
                  ></FontAwesomeIcon>
                </div>
                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    {dataStatic?.data.taikhoan}
                  </h4>
                  <div className="text-gray-500 font-medium">Tài khoản</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 450,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          <h1 className="mb-2 text-lg font-medium">Ghi chú</h1>
          <div className="grid grid-cols-3">
            <div className="col-span-3 md:col-span-1 px-0 md:px-5">
              <h2 className="mb-2 text-medium font-medium text-center">
                Số phiếu
              </h2>
              <div className="content">
                <Progress
                  label={dataAdmission && dataAdmission[0]?.TENTRANGTHAI}
                  value={dataAdmission && dataAdmission[0]?.count}
                  maxValue={dataStatic?.data.dulieu}
                  color="primary"
                  showValueLabel={true}
                  className="max-w-md"
                  formatOptions={{
                    style: "decimal",
                    currencyDisplay: "symbol",
                  }}
                />
                <Progress
                  label={dataAdmission && dataAdmission[1]?.TENTRANGTHAI}
                  value={dataAdmission && dataAdmission[1]?.count}
                  maxValue={dataStatic?.data.dulieu}
                  color="success"
                  showValueLabel={true}
                  className="max-w-md"
                  formatOptions={{
                    style: "decimal",
                    currencyDisplay: "symbol",
                  }}
                />
                <Progress
                  label={dataAdmission && dataAdmission[2]?.TENTRANGTHAI}
                  value={dataAdmission && dataAdmission[2]?.count}
                  maxValue={dataStatic?.data.dulieu}
                  color="secondary"
                  showValueLabel={true}
                  className="max-w-md"
                  formatOptions={{
                    style: "decimal",
                    currencyDisplay: "symbol",
                  }}
                />
                <Progress
                  label={dataAdmission && dataAdmission[3]?.TENTRANGTHAI}
                  value={dataAdmission && dataAdmission[3]?.count}
                  maxValue={dataStatic?.data.dulieu}
                  color="warning"
                  showValueLabel={true}
                  className="max-w-md"
                  formatOptions={{
                    style: "decimal",
                    currencyDisplay: "symbol",
                  }}
                />
                <Progress
                  label={dataAdmission && dataAdmission[4]?.TENTRANGTHAI}
                  value={dataAdmission && dataAdmission[4]?.count}
                  maxValue={dataStatic?.data.dulieu}
                  color="danger"
                  showValueLabel={true}
                  className="max-w-md"
                  formatOptions={{
                    style: "decimal",
                    currencyDisplay: "symbol",
                  }}
                />
              </div>
            </div>
            <div className="col-span-3 md:col-span-1 px-0 md:px-6 mt-5 md:mt-0">
              <div className="border-double border-5 border-gray-100 rounded-xl shadow-lg">
                <div className="title w-full bg-green-400 rounded-t-lg text-white">
                  <h2 className="mb-2 text-medium font-medium text-center py-2">
                    Gọi điện
                  </h2>
                </div>
                <div className="content min-h-[320px] max-h-[320px] overflow-y-auto">
                  {dataMisscall?.length > 0 ? (
                    dataMisscall?.map((call, index) => (
                      <div key={index} className="note my-2">
                        <div className="grid grid-cols-12">
                          <User
                            className="col-span-2"
                            avatarProps={{
                              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            }}
                          />
                          <div className="bg-gray-100 col-span-9 rounded-t-xl rounded-ee-xl px-2 h-auto">
                            <p className="font-medium">User manager</p>
                            <p>
                              {call.SDT} ({call.khachhang.HOTEN})
                            </p>
                          </div>
                        </div>
                        <div className="timeCreateNote text-end text-xs text-gray-400">
                          {moment(call.thoigian).format("DD-MM-YYYY HH:mm")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      Không có gọi nhỡ
                    </div>
                  )}
                </div>

                {/* <div className="createNote">
                                    <div className="groupInput mt-5 grid grid-cols-[1fr_1fr_auto] gap-0 border-t-1 px-2">
                                        <input type="text" className="outline-none h-10" placeholder="Nhập số điện thoại" />
                                        <input type="date" className="outline-none h-10" />
                                        <div className="flex"><FontAwesomeIcon fontSize={16} className="bg-green-400 m-auto p-2 rounded-full text-white ms-2 w-4" icon={faPlus} /></div>
                                    </div>
                                </div> */}
              </div>
            </div>
            <div className="col-span-3 md:col-span-1 px-0 md:px-6 mt-5 md:mt-0">
              <div className="border-double border-5 border-gray-100 rounded-xl shadow-lg">
                <div className="title w-full bg-yellow-400 rounded-t-lg text-white">
                  <h2 className="mb-2 text-medium font-medium text-center py-2">
                    Ghi chú
                  </h2>
                </div>
                <div className="content min-h-64 max-h-64 overflow-y-auto">
                  {dataNote && dataNote.length > 0 ? (
                    dataNote.map((note, index) => (
                      <div key={index} className="note my-2">
                        <div className="grid grid-cols-12">
                          <User
                            className="col-span-2"
                            avatarProps={{
                              src: "https://i.pinimg.com/564x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg",
                            }}
                          />
                          <div className="bg-gray-100 col-span-9 rounded-t-xl rounded-ee-xl px-2 h-auto">
                            <p className="font-medium">{user.HOTEN}</p>
                            <p>{note.NOIDUNG}</p>
                          </div>
                          <Dropdown
                            className="col-span-1 m-auto"
                            menu={{
                              items: [
                                {
                                  label: (
                                    <p
                                      className="font-medium text-red-500"
                                      onClick={() => handleDeleteNote(note)}
                                    >
                                      Xóa
                                    </p>
                                  ),
                                  key: "0",
                                },
                              ],
                            }}
                            trigger={["click"]}
                          >
                            <a onClick={(e) => e.preventDefault()}>
                              <Space>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                              </Space>
                            </a>
                          </Dropdown>
                        </div>
                        <div className="timeCreateNote text-end text-xs text-gray-400">
                          {moment(note.THOIGIAN).format("DD-MM-YYYY HH:mm")}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500">
                      Không có ghi chú nào
                    </div>
                  )}
                </div>
                <div className="createNote">
                  <div className="groupInput mt-5 grid grid-cols-[1fr_auto] gap-0 border-t-1 px-5">
                    <input
                      type="text"
                      className="outline-none  h-10 px-2"
                      placeholder="Viết ghi chú"
                      value={note}
                      onChange={(value) => setNote(value.target.value)}
                      onKeyDown={handleEnter}
                    />
                    <div className="flex">
                      <FontAwesomeIcon
                        fontSize={16}
                        className="bg-yellow-400 m-auto p-2 rounded-full text-white"
                        icon={faPencil}
                        onClick={handleCreateNote}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: 24,
            minHeight: 450,
            background: "#fff",
            borderRadius: "10px",
          }}
          className="mt-4"
        >
          <h1 className="mb-2 text-lg font-medium">Tiến trình liên hệ</h1>
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
      </div>
    </>
  );
}

export default AdminHomePage;
