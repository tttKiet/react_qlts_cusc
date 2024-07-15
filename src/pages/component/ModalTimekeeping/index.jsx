import { IconEdit } from "@tabler/icons-react";
import { Button, Drawer, Table } from "antd";
import moment from "moment";
import { DownloadOutlined } from "@ant-design/icons";
import excel from "../../../components/ExportFile/ExportFile";

function ModalTimekeeping(props) {
  const {
    isshowDrawer,
    setIsShowDrawer,
    dataDrawer,
    readAllTimeLogin,
    nameExcel,
  } = props;
  console.log("dataDrawer", dataDrawer);
  const dataSource = dataDrawer?.thoigiandangnhap;

  const convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} giờ ${minutes} phút ${remainingSeconds} giây`;
  };

  const handleEXcel = () => {
    const header = [
      {
        header: "ID",
        key: "ID",
      },
      {
        header: "Thời gian đăng nhập",
        key: "loginTime",
      },
      {
        header: "Thời gian đăng xuất",
        key: "logoutTime",
      },
      {
        header: "Tổng thời gian",
        key: "totalTime",
      },
    ];

    const data = dataDrawer?.thoigiandangnhap?.map((item, index) => {
      return {
        ID: item?.id,
        loginTime: moment(item?.dangnhap).format("DD-MM-YYYY hh:mm:ss"),
        logoutTime: moment(item?.dangxuat).format("DD-MM-YYYY hh:mm:ss"),
        totalTime: convertSeconds(item?.tongthoigian),
      };
    });

    excel.EX_Excel({ header, data, nameFile: nameExcel + "chi tiết" });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Thời gian đăng nhập",
      dataIndex: "dangnhap",
      key: "dangnhap",
      render: (dangnhap) => {
        return <div>{moment(dangnhap).format("DD-MM-YYYY hh:mm:ss")}</div>;
      },
    },
    {
      title: "Thời gian đăng xuất",
      dataIndex: "dangxuat",
      key: "dangxuat",
      render: (dangxuat) => {
        return <div>{moment(dangxuat).format("DD-MM-YYYY hh:mm:ss")}</div>;
      },
    },
    {
      title: "Tổng thời gian",
      dataIndex: "tongthoigian",
      key: "tongthoigian",
      render: (tongthoigian) => {
        return <div>{convertSeconds(tongthoigian)}</div>;
      },
    },
  ];

  return (
    <Drawer
      title="Chi tiết chấm công"
      onClose={() => setIsShowDrawer(false)}
      open={isshowDrawer}
      width={800}
    >
      <div>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size={"small"}
          onClick={handleEXcel}
        >
          Xuất file chi tiết
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </Drawer>
  );
}

export default ModalTimekeeping;
