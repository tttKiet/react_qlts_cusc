import {
  Chip,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { API_DATA } from "../constants";
const statusColorMap = {
  1: "success",
  0: "danger",
};

function Story() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [total, setTotal] = useState(1);

  // Call API
  const { data: resStory } = useSWR(`${API_DATA}/story`);
  console.log("resStory", resStory);
  const renderCell = useCallback((data, columnKey) => {
    switch (columnKey) {
      case "time":
        return (
          <div className="flex flex-col justify-center">
            <span className="text-bold text-small">
              {moment(data?.thoigian).format("LLLL")}
            </span>
          </div>
        );

      case "action":
        return (
          <div className="flex flex-col justify-center text-base">
            <Chip
              size="md"
              radius="sm"
              color="primary"
              variant="flat"
              className="text-bold "
            >
              {data?.hanhdong}
            </Chip>
          </div>
        );

      default:
        return "";
    }
  }, []);

  const columns = [
    { name: "Thời gian", uid: "time" },
    { name: "Hành động", uid: "action" },
  ];

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return resStory?.slice(start, end) || [];
  }, [page, resStory, rowsPerPage]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          // isDisabled={hasSearchFilter}
          page={page}
          total={total}
          variant="light"
          onChange={(e) => {
            setPage(e);
          }}
        />
      </div>
    );
  }, [page, total]);

  useEffect(() => {
    if (resStory) {
      setTotal(Math.ceil(resStory?.length / rowsPerPage));
    }
  }, [resStory, rowsPerPage]);

  return (
    <>
      <div
        className="contentPage"
        style={{
          padding: 24,
          minHeight: 500,
          background: "#fff",
          borderRadius: "10px",
        }}
      >
        <h1 className="titlePage">Nhật ký hoạt động</h1>
        <div className="mt-2">
          <Table
            removeWrapper
            aria-label="Example table with custom cells, pagination and sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContentPlacement="outside"
          >
            <TableHeader columns={columns}>
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
            <TableBody emptyContent={"Không tìm thấy!"} items={items || []}>
              {(item) => (
                <TableRow key={item.thoigian}>
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

export default Story;
