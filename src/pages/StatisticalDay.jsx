import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";

function StatisticalDay() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    data: dataChart,
    error,
    isLoading,
  } = useSWR(
    `/api/v1/chart/admin?page=data&index=1&startDate=${startDate}&endDate=${endDate}`
  );

  if (error) {
    toast.error(error?.message);
  }

  const chart = useMemo(() => {
    return dataChart?.data || [];
  }, [dataChart]);

  const labelsChartJS = useMemo(() => {
    return chart?.map((item) => {
      return moment(item?.thoigian).format("DD-MM-YYYY");
    });
  }, [chart]);

  const dataChearJS = useMemo(() => {
    return chart?.map((item) => {
      return item?.solan;
    });
  }, [chart]);

  const data = {
    labels: labelsChartJS,
    datasets: [
      {
        label: "Số lần gọi",
        data: dataChearJS,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],

  };

  const onChangeDate = (dates, dateStrings) => {
    setStartDate(moment(dates[0].$d).format("YYYY-MM-DD") + "T17:00:00.000Z");
    setEndDate(moment(dates[1].$d).format("YYYY-MM-DD") + "T17:00:00.000Z");
  };

  return (
    <div style={{
      padding: 24,
      minHeight: 425,
      background: "#fff",
      borderRadius: "10px"
    }}>
      <h1 className='font-bold text-lg mb-2'>Thống kê dữ liệu theo ngày</h1>
      <div>
        <RangePicker format={"DD-MM-YYYY"} onChange={onChangeDate} />
      </div>
      <div className="max-w-[1000px] max-h-[500px] flex m-auto mt-1">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default StatisticalDay;
