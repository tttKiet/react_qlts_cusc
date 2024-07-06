import ExcelJS from "exceljs";
import fs from "fs";

async function EX_Excel({ header, data, nameFile }) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Du lieu full data");

    worksheet.columns = header?.map((item) => {
      return {
        header: item?.header,
        key: item?.key,
      };
    });

    data?.forEach((item) => {
      const row = {};
      header?.forEach((hd) => {
        row[hd.key] = item[hd.key];
      });
      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Tạo URL tạm thời để tải xuống
      const url = window.URL.createObjectURL(blob);

      // Tạo thẻ a để kích hoạt tải xuống
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${nameFile}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  } catch (error) {
    console.error("Error generating Excel:", error);
    res.status(500).send("Internal Server Error");
  }
}

export default { EX_Excel };
