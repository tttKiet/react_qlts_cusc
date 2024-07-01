import { Table, Space, Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import FileService from "../service/FileService";
import Highlighter from "react-highlight-words";
import {
  IconEdit,
  IconPencilMinus,
  IconReload,
  IconTrash,
} from "@tabler/icons-react";
import { Select } from "antd";
import { Input } from "antd";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
function ManagerFile() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [dataFile, setDataFile] = useState([]);

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
    }
  };

  const handleTableChange = (data) => {
    setCurrent(data.current);
    setPageSize(data.pageSize);
    setTotal(data.total);
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
          {data?.phieudkxettuyen?.hoso.map((item) => {
            return <div>{item?.HOSO}</div>;
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
    },
  ];

  return (
    <div>
      <div>DANH SACH HO SO</div>
      <div></div>
      <div>
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
            pageSizeOptions: ["5", "10", "15", "20"],
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

export default ManagerFile;
