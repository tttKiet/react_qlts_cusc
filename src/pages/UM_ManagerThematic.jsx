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
import { Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation, faHourglassHalf, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
function UM_ManagerThematic() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const [pageSize, setPageSize] = useState(50);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(100);
  const [dataThematic, setDataThematic] = useState([]);
  const [thematicSelected, setThematicSelected] = useState("");

  const readAllThematic = async () => {
    const res = await ThematicService.readAllThematic(
      `page=${current}&pageSize=${pageSize}&SDT=${user?.SDT}&MACHUYENDE=${thematicSelected || ""}`
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

  console.log("Data thematic", dataThematic)
  const totalCustomer = dataThematic?.reduce((totalCus, currentValue) => { return totalCus + currentValue.truong.khachhang.length }, 0)
  const totalSuccess = dataThematic?.reduce((total, item) => {
    const count = item.chitietchuyende.filter(chitiet => chitiet.TRANGTHAI === "Đồng ý").length;
    return total + count;
  }, 0);
  const totalDenied = dataThematic?.reduce((total, item) => {
    const count = item.chitietchuyende.filter(chitiet => chitiet.TRANGTHAI === "Không đồng ý").length;
    return total + count;
  }, 0);
  const totalReview = dataThematic?.reduce((total, item) => {
    const count = item.chitietchuyende.filter(chitiet => chitiet.TRANGTHAI === "Xem lại").length;
    return total + count;
  }, 0);
  const totalOther = totalCustomer - (totalSuccess + totalDenied + totalReview)

  const data = {
    labels: ['Đồng ý', 'Không đồng ý', 'Xem lại', 'Khác'],
    datasets: [
      {
        label: 'Số lượng',
        data: [totalSuccess, totalDenied, totalReview, totalOther],
        backgroundColor: [
          '#399918',
          '#EF5A6F',
          '#FFB22C',
          '#DDDDDD',
        ],
        borderColor: [
          '#399918',
          '#EF5A6F',
          '#FFB22C',
          '#DDDDDD',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ thống kê trạng thái chuyên đề',
        font: {
          size: 16
        }
      },
    },
  };


  const handleTableChange = (data) => {
    setCurrent(data.current);
    setPageSize(data.pageSize);
    setTotal(data.total);
  };

  useEffect(() => {
    readAllThematic();
  }, [pageSize, current, thematicSelected]);

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
      title: "Trường",
      dataIndex: "",
      key: "",
      render: (data) => <div>{data?.truong?.TENTRUONG}</div>,
    },

    {
      title: "Số khách hàng",
      dataIndex: "",
      key: "",
      render: (data) => <div>{data?.truong?.khachhang?.length}</div>,
    },

    {
      title: "Chi tiết",
      key: "action",
      render: (record) => {
        return (
          <div>
            <IconListDetails
              onClick={() => haneleShowModalDetail(record)}
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
      dataIndex: "",
      key: "trangthai",
      render: (data) => {
        return <div>{data?.chitietchuyende}</div>;
      },
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

  function combineData(dataDetail) {
    const combinedResults = dataDetail?.truong?.khachhang.map((khachhang) => {
      dataDetail?.chitietchuyende.forEach((cttd) => {
        if (khachhang.SDT == cttd?.SDT) {
          khachhang.chitietchuyende = cttd?.TRANGTHAI;
        }
      });
      return {
        ...khachhang,
      };
    });

    return combinedResults;
  }

  const haneleShowModalDetail = (data) => {
    const dataTable = combineData(data);
    console.log("dataTable", dataTable);
    setDataDrawer(dataTable);
    setIsShowDrawer(true);
  };

  return (
    <div>
      <div className="shadow-lg"
        style={{
          padding: 24,
          // minHeight: 450,
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

        <div className="">
          <Autocomplete
            aria-labelledby="province-label"
            placeholder="Chọn chuyên đề"
            variant="bordered"
            defaultItems={dataThematic}
            className="max-w-xs mb-2"
            selectedKey={thematicSelected}
            onSelectionChange={setThematicSelected}
            listboxProps={{
              emptyContent: 'Your own empty content text.'
            }}

          >
            {(item) => <AutocompleteItem key={item.MACHUYENDE}>{item.TENCHUYENDE}</AutocompleteItem>}
          </Autocomplete>
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
            title="Chi tiết chuyên đề"
            onClose={() => setIsShowDrawer(false)}
            open={isshowDrawer}
            width={600}
          >
            <Table
              dataSource={dataDrawer}
              columns={columnsThematicDetail}
              bordered
            />
          </Drawer>
        </div>

      </div>
      <div className="grid grid-cols-10 mt-5 gap-5">
        <div className="col-span-6">
          <div className="grid grid-cols-12 gap-5">
            <div className="flex gap-2 col-span-6 shadow-lg" style={{
              padding: 15,
              background: "#fff",
              borderRadius: "10px",
            }}>
              <div>
                <FontAwesomeIcon color="#399918" className="h-6 w-6 p-3 bg-green-50 rounded-full" icon={faCheck} />
              </div>
              <div className="">
                <h4 className="font-bold  text-[17px]">Khách hàng đồng ý</h4>
                <p className="font-bold text-gray-500">{totalSuccess}</p>
              </div>
            </div>
            <div className="flex gap-2 col-span-6 shadow-lg" style={{
              padding: 15,
              background: "#fff",
              borderRadius: "10px",
            }}>
              <div>
                <FontAwesomeIcon color="#EF5A6F" className="h-6 w-6 p-3 bg-red-50 rounded-full" icon={faXmark} />
              </div>
              <div className="">
                <h4 className="font-bold  text-[17px]">Khách hàng không đồng ý</h4>
                <p className="font-bold text-gray-500">{totalDenied}</p>
              </div>
            </div>
            <div className="flex gap-2 col-span-6 shadow-lg" style={{
              padding: 15,
              background: "#fff",
              borderRadius: "10px",
            }}>
              <div>
                <FontAwesomeIcon color="#FFB22C" className="h-6 w-6 p-3 bg-yellow-50 rounded-full" icon={faHourglassHalf} />
              </div>
              <div className="">
                <h4 className="font-bold  text-[17px]">Khách hàng xem lại</h4>
                <p className="font-bold text-gray-500">{totalReview}</p>
              </div>
            </div>
            <div className="flex gap-2 col-span-6 shadow-lg" style={{
              padding: 15,
              background: "#fff",
              borderRadius: "10px",
            }}>
              <div>
                <FontAwesomeIcon color="#758694" className="h-6 w-6 p-3 bg-gray-50 rounded-full" icon={faExclamation} />
              </div>
              <div className="">
                <h4 className="font-bold  text-[17px]">Khách hàng khác</h4>
                <p className="font-bold text-gray-500">{totalOther}</p>
              </div>
            </div>
          </div>

        </div>
        <div className="col-span-4 flex justify-center shadow-lg" style={{
          padding: 15,
          background: "#fff",
          borderRadius: "10px",
        }}>
          <Pie className="max-w-[300px] max-h-[300px]" data={data} options={options} />

        </div>

      </div>
    </div>

  );
} 

export default UM_ManagerThematic; 
