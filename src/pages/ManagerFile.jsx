import { Table, Space, Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import FileService from "../service/FileService";
import Highlighter from "react-highlight-words";
import {
  IconEdit,
  IconPencilMinus,
  IconReload,
  IconTrash,
  IconRefresh,
  IconFile,
} from "@tabler/icons-react";
import { Select } from "antd";
import { Input } from "antd";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";

function UM_ManagerFile() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [totalFile, setTotalFile] = useState(0);
  const [dataFile, setDataFile] = useState([]);
  const [showFile, setShowFile] = useState(null);

  const [isShowModalDeleteFile, setIsShowModalDeleteFile] = useState(false);
  const [dataModalDeleteFile, setDataModalDeleteFile] = useState([]);

  const handleModalDeleteFile = (data) => {
    setIsShowModalDeleteFile(true);
    setDataModalDeleteFile(data?.phieudkxettuyen?.hoso);
  };

  const readAllFile = async () => {
    const res = await FileService.readAll(
      `page=${current}&pageSize=${pageSize}`
    );
    if (res && res.statusCode == 200) {
      let cus = res?.data?.results?.map((item) => ({
        ...item,
        key: item?.SDT,
      }));

      setDataFile(cus);
      setTotal(res?.data?.totalRows);
      setTotalFile(res?.data?.totalRows);
    }
  };

  const handleTableChange = (data) => {
    setCurrent(data.current);
    setPageSize(data.pageSize);
    setTotal(data.total);
  };

  const handlesShowFile = (data) => {
    setShowFile(
      data?.phieudkxettuyen?.MAPHIEUDK === showFile
        ? null
        : data?.phieudkxettuyen?.MAPHIEUDK
    );
  };

  useEffect(() => {
    readAllFile();
  }, [pageSize, current]);

  // search ant table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columnsFile = [
    {
      title: "SDT",
      dataIndex: "SDT",
      key: "SDT",
      ...getColumnSearchProps("SDT"),
    },
    {
      title: "Họ tên",
      dataIndex: "HOTEN",
      key: "Hoten",
      render: (data) => <div>{HOTEN}</div>,
      ...getColumnSearchProps("HOTEN"),
    },
    {
      title: "Hồ sơ",
      dataIndex: "",
      key: "file",
      render: (data) => (
        <div>
          <Button
            onClick={() => handlesShowFile(data)}
            type="primary"
            icon={<IconFile />}
            size="middle"
            className="flex items-center justify-center transition-colors duration-300 ease-in-out bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
          >
            Hồ sơ
          </Button>
          {data?.phieudkxettuyen?.MAPHIEUDK == showFile ? (
            <div>
              {data?.phieudkxettuyen?.hoso.map((item) => {
                return (
                  <a
                    key={item?.MAHOSO}
                    href={`/api/v1/file/downLoadFile?MAHOSO=${item?.MAHOSO}`}
                    className="flex items-center my-2 cursor-pointer text-blue-600"
                  >
                    <div>
                      <IconFile size={17} />
                    </div>
                    <div> {item?.HOSO}</div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ),
      width: 700,
    },
    {
      title: "Năm",
      dataIndex: "",
      key: "nam",
      render: (data) => (
        <div>
          {data?.phieudkxettuyen?.dottuyendung?.map((n) => {
            return n?.NAM;
          })}
        </div>
      ),
    },
    {
      title: "Hành động",
      //   dataIndex: "",
      key: "action",
      render: (record) => {
        return (
          <div>
            <IconTrash
              onClick={() => handleModalDeleteFile(record)}
              color="red"
              width={20}
              className="cursor-pointer"
            />
          </div>
        );
      },
      width: 50,
    },
  ];

  const handleF5 = () => {
    location.reload();
  };

  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      <div className="flex justify-between">
        <h1 className="font-bold text-lg">Danh sách hồ sơ : {totalFile}</h1>
        <div>
          <IconRefresh
            className="cursor-pointer text-blue-900"
            onClick={handleF5}
          />
        </div>
      </div>
      <div className="p-5">
        <Table
          dataSource={dataFile}
          columns={columnsFile}
          bordered
          onChange={handleTableChange}
          pagination={{
            current: current,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "15", "20", "1000"],
          }}
        />
      </div>
      <ModalDeleteFile
        isShowModalDeleteFile={isShowModalDeleteFile}
        setIsShowModalDeleteFile={setIsShowModalDeleteFile}
        dataModalDeleteFile={dataModalDeleteFile}
      />
    </div>
  );

  function ModalDeleteFile(props) {
    const {
      isShowModalDeleteFile,
      setIsShowModalDeleteFile,
      dataModalDeleteFile,
    } = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleOk = () => {
      dataModalDeleteFile?.map(async (item) => {
        const res = await FileService.deleted(item?.MAHOSO);
        if (res && res.statusCode == 200) {
          toast.success(res.message);
          readAllFile();
          handleCancel();
        } else {
          toast.error(res.message);
        }
      });
    };
    const handleCancel = () => {
      setIsShowModalDeleteFile(false);
    };
    return (
      <div>
        <Modal
          title="Xóa hồ sơ"
          open={isShowModalDeleteFile}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div>Bạn có chắc chắn muốn xóa hồ sơ</div>
          <div>Lưu ý hành động này không thể hoàn tác</div>
        </Modal>
      </div>
    );
  }
}

export default UM_ManagerFile;
