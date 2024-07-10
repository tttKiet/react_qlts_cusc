import { Table, Space, Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import ThematicService from "../service/ThematicService";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import {
  IconEdit,
  IconPencilMinus,
  IconReload,
  IconTrash,
  IconRefresh,
  IconFile,
  IconListDetails,
} from "@tabler/icons-react";
import { Select } from "antd";
import { Input } from "antd";
import { toast } from "react-toastify";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import moment from "moment";
import { Drawer } from "antd";

function UM_ManagerThematic() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(50);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(100);
  const [dataThematic, setDataThematic] = useState([]);

  const user = useSelector((state) => state.account.user);

  const readAllThematic = async () => {
    const res = await ThematicService.readAllThematic(
      `page=${current}&pageSize=${pageSize}&SDT_UM=${user?.SDT}`
    );
    if (res && res.statusCode == 200) {
      let cus = res?.data?.results?.map((item) => ({
        ...item,
        key: item?.MACHUYENDE,
      }));
      setDataThematic(cus);
      setTotal(res?.data?.totalRows);
    }
  };

  const handleTableChange = (data) => {
    setCurrent(data.current);
    setPageSize(data.pageSize);
    setTotal(data.total);
  };

  useEffect(() => {
    readAllThematic();
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

  const columnsThematic = [
    {
      title: "Tên chuyên đề",
      dataIndex: "TENCHUYENDE",
      key: "TENCHUYENDE",
      ...getColumnSearchProps("TENCHUYENDE"),
    },
    {
      title: "Thời gian tổ chức",
      dataIndex: "THOIGIANTOCHUCCHUYENDE",
      key: "THOIGIANTOCHUCCHUYENDE",
      render: (THOIGIANTOCHUCCHUYENDE) => (
        <div>{moment(THOIGIANTOCHUCCHUYENDE).format("DD-MM-YYYY")}</div>
      ),
    },

    {
      title: "Số khách hàng",
      dataIndex: "",
      key: "",
      render: (data) => <div>{data?.chitietchuyende?.length}</div>,
    },

    {
      title: "Chi tiết",
      key: "action",
      render: (record) => {
        return (
          <div>
            <IconListDetails
              onClick={() => {
                setDataDrawer(record);
                setIsShowDrawer(true);
              }}
              color="orange"
              width={20}
              className="cursor-pointer"
            />
          </div>
        );
      },
      width: 150,
    },
  ];

  const columnsThematicDetail = [
    {
      title: "Số điện thoại",
      dataIndex: "SDT",
      key: "SDT",
      ...getColumnSearchProps("SDT"),
    },
    {
      title: "Trạng thái",
      dataIndex: "TRANGTHAI",
      key: "TRANGTHAI",
      ...getColumnSearchProps("TRANGTHAI"),
    },
    {
      title: "Cập nhật",
      key: "action",
      render: (record) => {
        return (
          <div>
            <IconEdit
              onClick={() => {
                navigate(`/usermanager/data/edit/${record?.SDT}`);
              }}
              color="orange"
              width={20}
              className="cursor-pointer"
            />
          </div>
        );
      },
      width: 150,
    },
  ];

  const handleF5 = () => {
    location.reload();
  };

  // Drawer
  const [isshowDrawer, setIsShowDrawer] = useState(false);
  const [dataDrawer, setDataDrawer] = useState([]);

  return (
    <div
      style={{
        padding: 24,
        minHeight: 450,
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      <div className="flex justify-between ">
        <h1 className="mb-2 text-lg font-medium">Danh sách hồ sơ</h1>
        <div>
          <IconRefresh
            className="cursor-pointer text-blue-900"
            onClick={handleF5}
          />
        </div>
      </div>
      <div className="p-5">
        <Table
          dataSource={dataThematic}
          columns={columnsThematic}
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

        <Drawer
          title="Basic Drawer"
          onClose={() => setIsShowDrawer(false)}
          open={isshowDrawer}
          width={600}
        >
          <Table
            dataSource={dataDrawer?.chitietchuyende}
            columns={columnsThematicDetail}
            bordered
          />
        </Drawer>
      </div>
    </div>
  );
}

export default UM_ManagerThematic;
