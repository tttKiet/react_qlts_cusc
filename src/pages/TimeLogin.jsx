import { Table } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import { useEffect, useState } from "react";
import AuthService from "../service/AuthService";
import { IconEdit } from "@tabler/icons-react";
import { Tabs } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import useSWR from "swr";

import ModalTimekeeping from "../pages/component/ModalTimekeeping";
import excel from "../components/ExportFile/ExportFile";
import { API_AUTH } from "../constants";

function TimeLogin() {
  const [pageSize, setPageSize] = useState(20);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(40);
  const [listLogin, setListLogin] = useState([]);
  const [selectUM, setSelectUM] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [tabs, setTabs] = useState("day");
  const [user, setUser] = useState("");
  const [time, setTime] = useState("");
  const [nameExcel, setNameExcel] = useState("Công tất cả");

  // fetch
  const { data: resTimeLogin } = useSWR(
    `${API_AUTH}/time-login?${time}&${user}`
  );

  console.log("resTimeLogin", resTimeLogin);

  useEffect(() => {
    let cus = resTimeLogin?.results?.map((item) => ({
      ...item,
      key: item?.TENDANGNHAP,
    }));
    setListLogin(cus);
    setTotal(resTimeLogin?.totalRows);
    setTotalTime(resTimeLogin?.totalTime);
  }, [time, user, resTimeLogin]);

  console.log("listLogin", listLogin);

  // const readAllTimeLogin = async () => {
  //   const res = await AuthService.timeLogin(`${time}&${user}`);

  //   if (res && res.statusCode == 200) {
  //     let cus = res?.data?.results?.map((item) => ({
  //       ...item,
  //       key: item?.TENDANGNHAP,
  //     }));

  //     setListLogin(cus);
  //     setTotal(res?.data?.totalRows);
  //     setTotalTime(res?.data?.totalTime);
  //   }
  // };

  const readSelectUM = async () => {
    const res = await AuthService.timeLogin();

    if (res && res.statusCode == 200) {
      let cus = res?.data?.results?.map((item) => ({
        ...item,
        key: item?.TENDANGNHAP,
      }));

      setSelectUM(cus);
    }
  };

  useEffect(() => {
    // readAllTimeLogin();
    readSelectUM();
  }, [user, time]);

  // Xử lí Drawer
  const [isshowDrawer, setIsShowDrawer] = useState(false);
  const [dataDrawer, setDataDrawer] = useState([]);

  const handleDrawer = (data) => {
    setIsShowDrawer(true);
    setDataDrawer(data);
  };

  // Xu li tab
  const onChangeTab = (key) => {
    setTabs(key);
  };
  const itemsTab = [
    {
      key: "day",
      label: "Ngày",
    },
    {
      key: "month",
      label: "Tháng",
    },
    {
      key: "year",
      label: "Năm",
    },
  ];

  const handleRangePickerChange = (dates, dateStrings) => {
    setTime(`startDate=${dateStrings[0]}&endDate=${dateStrings[1]}`);
    setNameExcel(
      `Công từ ngày ${moment(dateStrings[0]).format(
        "DD-MM-YYYY"
      )} đến ngày  ${moment(dateStrings[1]).format("DD-MM-YYYY")}`
    );
  };

  const handleMonth = (month, monthString) => {
    setTime(`month=${monthString}`);
    setNameExcel(`Công tháng ${moment(monthString).format("MM-YYYY")}`);
  };

  const handleYear = (year, yearString) => {
    setTime(`year=${yearString}`);
    setNameExcel(`Công năm ${moment(yearString).format("YYYY")}`);
  };

  const renderDate = () => {
    if (tabs === "day") {
      return (
        <div>
          <RangePicker onChange={handleRangePickerChange} />
        </div>
      );
    } else if (tabs === "month") {
      return (
        <div>
          <DatePicker
            picker="month"
            style={{ width: "288px" }}
            onChange={handleMonth}
          />
        </div>
      );
    } else if (tabs === "year") {
      return (
        <div>
          <DatePicker
            picker="year"
            style={{ width: "288px" }}
            onChange={handleYear}
          />
        </div>
      );
    }
    return null;
  };

  const onChangeSelectUM = (value, label) => {
    console.log("value", value);
    console.log("label", label);
    setUser(value);
    setNameExcel(nameExcel + " của " + label?.label);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  const convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} giờ ${minutes} phút ${remainingSeconds} giây`;
  };

  const handleTotalTimeWithItem = (arr) => {
    // arr là mảng thời gian đăng nhập luôn
    const time = arr?.reduce((init, item) => {
      return (init += item?.tongthoigian);
    }, 0);

    return convertSeconds(time);
  };

  const columns = [
    {
      title: "Họ tên",
      dataIndex: "",
      key: "name",
      render: (data) => {
        return <div>{data?.usermanager?.HOTEN || data?.admin?.HOTEN}</div>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "",
      key: "phone",
      render: (data) => {
        return <div>{data?.usermanager?.SDT || data?.admin?.SDT}</div>;
      },
    },
    {
      title: "Loại người dùng",
      dataIndex: "",
      key: "type",
      render: (data) => {
        return (
          <div>
            {data?.usermanager?.SDT
              ? "UM"
              : "" || data?.admin?.MAADMIN
              ? "ADMIN"
              : ""}
          </div>
        );
      },
    },

    {
      title: "Tổng thời gian",
      dataIndex: "",
      key: "timeTotal",
      render: (data) => {
        return <div>{handleTotalTimeWithItem(data?.thoigiandangnhap)}</div>;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => {
        return (
          <div>
            <IconEdit
              onClick={() => handleDrawer(record)}
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

  // hanle Xuất file
  // XU LI DU LIEU EXCEL
  const handleEXcel = () => {
    const header = [
      {
        header: "STT",
        key: "STT",
      },
      {
        header: "Họ tên",
        key: "NAME",
      },
      {
        header: "Số điện thoại",
        key: "PHONE",
      },
      {
        header: "Loại người dùng",
        key: "TYPE",
      },
      {
        header: "Tổng thời gian",
        key: "TIME",
      },
    ];

    const data = listLogin?.map((item, index) => {
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

    excel.EX_Excel({ header, data, nameFile: nameExcel });
  };
  return (
    <div>
      <div>
        <div className="flex   justify-between align-middle  items-center">
          <div className="flex">
            <div>
              <Tabs items={itemsTab} onChange={onChangeTab} />
              <div>{renderDate()}</div>
            </div>

            <div className="p-3">
              <div>Chọn người dùng</div>
              <Select
                className="mt-7"
                showSearch
                placeholder="Chọn người dùng"
                optionFilterProp="label"
                onChange={onChangeSelectUM}
                onSearch={onSearch}
                style={{ width: "288px" }}
                options={selectUM?.map((item) => {
                  return {
                    value: item?.usermanager
                      ? `sdt=${item.usermanager.SDT}`
                      : `maadmin=${item.admin.MAADMIN}`,
                    label: item?.usermanager?.HOTEN || item?.admin?.HOTEN,
                  };
                })}
              />
            </div>
          </div>

          <div className="border flex ">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size={"small"}
              onClick={handleEXcel}
            >
              Xuất file
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Table dataSource={listLogin} columns={columns} bordered />
      </div>

      <ModalTimekeeping
        isshowDrawer={isshowDrawer}
        setIsShowDrawer={setIsShowDrawer}
        dataDrawer={dataDrawer}
        setDataDrawer={setDataDrawer}
        nameExcel={nameExcel}
      />
    </div>
  );
}

export default TimeLogin;
