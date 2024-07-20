import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@nextui-org/react";
import { IconEdit } from "@tabler/icons-react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

function DrawerThematicAD(props) {
  const { dataDrawer, nameThematicDetail, handleEXcelDetail } = props;

  const navigate = useNavigate();
  const columnsThematicDetail = [
    {
      title: "Số điện thoại",
      dataIndex: "SDT",
      key: "SDT",
      // ...getColumnSearchProps("SDT"),
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
                navigate(`/admin/data/edit/${record?.SDT}`);
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

  return (
    <>
      <Button
        onClick={() => {
          handleEXcelDetail(dataDrawer, nameThematicDetail);
        }}
        size="sm"
        className="p-4 ms-auto mb-2"
        color="primary"
      >
        <FontAwesomeIcon icon={faFile} /> Xuất file
      </Button>
      <Table
        rowKey="SDT"
        dataSource={dataDrawer}
        columns={columnsThematicDetail}
        bordered
      />
    </>
  );
}

export default DrawerThematicAD;
