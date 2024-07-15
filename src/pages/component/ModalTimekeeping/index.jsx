import { IconEdit } from "@tabler/icons-react";
import { Drawer, Table } from "antd";
import moment from "moment";

function ModalTimekeeping(props) {
  const {
    isshowDrawer,
    setIsShowDrawer,
    dataDrawer,
    readAllTimeLogin,
    nameExcel,
  } = props;
  const dataSource = dataDrawer?.thoigiandangnhap;

  const convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours} giờ ${minutes} phút ${remainingSeconds} giây`;
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
      <Table dataSource={dataSource} columns={columns} />
    </Drawer>
  );
}

export default ModalTimekeeping;
