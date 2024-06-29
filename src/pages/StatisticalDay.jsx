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
      return item?.thoigian;
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
        label: "My First Dataset",
        data: dataChearJS,
      },
    ],
  };

  const onChangeDate = (dates, dateStrings) => {
    setStartDate(moment(dates[0].$d).format("YYYY-MM-DD") + "T17:00:00.000Z");
    setEndDate(moment(dates[1].$d).format("YYYY-MM-DD") + "T17:00:00.000Z");
  };

  return (
    <div>
      <div>
        <RangePicker format={"DD-MM-YYYY"} onChange={onChangeDate} />
      </div>
      <Bar data={data} />
    </div>
  );
}

export default StatisticalDay;
