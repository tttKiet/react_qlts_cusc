import { Tabs } from "antd";
import { useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { toast } from "react-toastify";
import { Select } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import useSWR from "swr";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function StatisticalContact() {
  const [tabs, setTabs] = useState();
  const [maTinh, setMaTinh] = useState("");
  const [maTruong, setMaTruong] = useState("");
  const [sdtUM, setSdtUM] = useState("");

  const onChangeTab = (key) => {
    setMaTinh("");
    setMaTruong("");
    setSdtUM("");
    setTabs(key);
  };

  const {
    data: dataProvince,
    error: errProvince,
    isLoading: isLoadingProvince,
  } = useSWR(`/api/v1/data/province`);
  const provinces = useMemo(() => {
    return dataProvince || [];
  }, [dataProvince]);

  const {
    data: dataSchool,
    error: errSchool,
    isLoading: isLoadingSchool,
  } = useSWR(`/api/v1/data/school?provinceCode=${maTinh}`);
  const schools = useMemo(() => {
    return dataSchool || [];
  }, [dataSchool]);

  const {
    data: dataUM,
    error: errUM,
    isLoading: isLoadingUM,
  } = useSWR(`/api/v1/data/table-UM`);
  const sdt_UMs = useMemo(() => {
    return dataUM || [];
  }, [dataUM]);

  // FETCH DATA
  const conditon = useMemo(() => {
    let data = "";
    if (maTinh) {
      data += `MATINH=${maTinh}&`;
    }
    if (maTruong) {
      data += `MATRUONG=${maTruong}&`;
    }
    if (sdtUM) {
      data = `SDT_UM=${sdtUM}`;
    }
    return data;
  });

  const { data, error, isLoading } = useSWR(
    `/api/v1/chart/admin?page=data&index=2&${conditon}`
  );
  const chartContact = useMemo(() => {
    return data || [];
  }, [data]);

  console.log("chartContact", chartContact);

  const items = [
    {
      key: "",
      label: "Tất cả",
    },
    {
      key: "MATINH",
      label: "Tỉnh",
    },
    {
      key: "MATRUONG",
      label: "Trường",
    },
    {
      key: "SDT_UM",
      label: "User manager",
    },
  ];

  const handleChangeSelectTinh = (value) => {
    setMaTinh(value);
  };
  const handleChangeSelectTruong = (value) => {
    setMaTruong(value);
  };
  const handleChangeSelectUM = (value) => {
    setSdtUM(value);
  };

  // handleDataChart1
  const labelsChartJS1 = useMemo(() => {
    return chartContact?.data?.map((item) => {
      return item.LAN;
    });
  }, [chartContact]);

  const dataCharrJS1 = useMemo(() => {
    return chartContact?.data?.map((item) => {
      return item.SOLAN;
    });
  }, [chartContact]);

  const dataChart1 = {
    labels: labelsChartJS1,
    datasets: [
      {
        label: "1",
        data: dataCharrJS1,
      },
    ],
  };

  // handleDataChart21
  const labelsChartJS21 = useMemo(() => {
    return chartContact?.contactStatus?.lan_1?.map((item) => {
      return item.TENTRANGTHAI;
    });
  }, [chartContact]);

  const dataCharrJS21 = useMemo(() => {
    return chartContact?.contactStatus?.lan_1?.map((item) => {
      return item.percent;
    });
  }, [chartContact]);

  const dataChart21 = {
    labels: labelsChartJS21,
    datasets: [
      {
        label: "%",
        data: dataCharrJS21,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(103, 185, 65)",
        ],
      },
    ],
  };

  // handleDataChart22
  const labelsChartJS22 = useMemo(() => {
    return chartContact?.contactStatus?.lan_2?.map((item) => {
      return item.TENTRANGTHAI;
    });
  }, [chartContact]);

  const dataCharrJS22 = useMemo(() => {
    return chartContact?.contactStatus?.lan_2?.map((item) => {
      return item.percent;
    });
  }, [chartContact]);

  const dataChart22 = {
    labels: labelsChartJS22,
    datasets: [
      {
        label: "%",
        data: dataCharrJS22,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(103, 185, 65)",
        ],
      },
    ],
  };

  // handleDataChart23
  const labelsChartJS23 = useMemo(() => {
    return chartContact?.contactStatus?.lan_3?.map((item) => {
      return item.TENTRANGTHAI;
    });
  }, [chartContact]);

  const dataCharrJS23 = useMemo(() => {
    return chartContact?.contactStatus?.lan_3?.map((item) => {
      return item.percent;
    });
  }, [chartContact]);

  const dataChart23 = {
    labels: labelsChartJS23,
    datasets: [
      {
        label: "%",
        data: dataCharrJS23,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(103, 185, 65)",
        ],
      },
    ],
  };

  // handleDataChart24
  const labelsChartJS24 = useMemo(() => {
    return chartContact?.contactStatus?.lan_4?.map((item) => {
      return item.TENTRANGTHAI;
    });
  }, [chartContact]);

  const dataCharrJS24 = useMemo(() => {
    return chartContact?.contactStatus?.lan_4?.map((item) => {
      return item.percent;
    });
  }, [chartContact]);

  const dataChart24 = {
    labels: labelsChartJS24,
    datasets: [
      {
        label: "%",
        data: dataCharrJS24,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(103, 185, 65)",
        ],
      },
    ],
  };

  // handleDataChart25
  const labelsChartJS25 = useMemo(() => {
    return chartContact?.contactStatus?.lan_5?.map((item) => {
      return item.TENTRANGTHAI;
    });
  }, [chartContact]);

  const dataCharrJS25 = useMemo(() => {
    return chartContact?.contactStatus?.lan_5?.map((item) => {
      return item.percent;
    });
  }, [chartContact]);

  const dataChart25 = {
    labels: labelsChartJS25,
    datasets: [
      {
        label: "%",
        data: dataCharrJS25,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(103, 185, 65)",
        ],
      },
    ],
  };

  // handleDataChart26
  const labelsChartJS26 = useMemo(() => {
    return chartContact?.contactStatus?.lan_6?.map((item) => {
      return item.TENTRANGTHAI;
    });
  }, [chartContact]);

  const dataCharrJS26 = useMemo(() => {
    return chartContact?.contactStatus?.lan_6?.map((item) => {
      return item.percent;
    });
  }, [chartContact]);

  const dataChart26 = {
    labels: labelsChartJS26,
    datasets: [
      {
        label: "%",
        data: dataCharrJS26,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(103, 185, 65)",
        ],
      },
    ],
  };
  // handleDataChart27
  const labelsChartJS27 = useMemo(() => {
    return chartContact?.contactStatus?.lan_7?.map((item) => {
      return item.TENTRANGTHAI;
    });
  }, [chartContact]);

  const dataCharrJS27 = useMemo(() => {
    return chartContact?.contactStatus?.lan_7?.map((item) => {
      return item.percent;
    });
  }, [chartContact]);

  const dataChart27 = {
    labels: labelsChartJS27,
    datasets: [
      {
        label: "%",
        data: dataCharrJS27,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(103, 185, 65)",
        ],
      },
    ],
  };

  return (
    <div>
      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
      </div>
      <div>
        {tabs == "MATINH" && (
          <Select
            placeholder="Chọn tỉnh đi nhé"
            style={{
              width: 300,
            }}
            onChange={handleChangeSelectTinh}
            options={provinces?.map((item) => {
              return {
                label: item?.TENTINH,
                value: item?.MATINH,
              };
            })}
          />
        )}
        {tabs == "MATRUONG" && (
          <div>
            <Select
              placeholder="Chọn tỉnh đi nhé"
              style={{
                width: 300,
              }}
              onChange={handleChangeSelectTinh}
              options={provinces?.map((item) => {
                return {
                  label: item?.TENTINH,
                  value: item?.MATINH,
                };
              })}
            />

            <Select
              placeholder="Chọn trường đi nhé"
              style={{
                width: 300,
              }}
              onChange={handleChangeSelectTruong}
              options={schools?.map((item) => {
                return {
                  label: item?.TENTRUONG,
                  value: item?.MATRUONG,
                };
              })}
            />
          </div>
        )}
        {tabs == "SDT_UM" && (
          <Select
            placeholder="Chọn user manager đi nhé"
            style={{
              width: 300,
            }}
            onChange={handleChangeSelectUM}
            options={sdt_UMs?.map((item) => {
              return {
                label: item?.HOTEN,
                value: item?.SDT,
              };
            })}
          />
        )}
      </div>
      <div className="ss1">
        <Bar data={dataChart1} />
      </div>
      <div className="border flex flex-wrap justify-between">
        <div className="w-72 border border-blue-600">
          <div className="border border-blue-600 border-x-1">
            Biểu đồ thống kê trạng thái liên hệ lần 1
          </div>
          <Pie data={dataChart21} />
        </div>
        <div className="w-72 border border-blue-600">
          <div className="border border-blue-600 border-x-1">
            Biểu đồ thống kê trạng thái liên hệ lần 2
          </div>
          <Pie data={dataChart22} />
        </div>
        <div className="w-72 border border-blue-600">
          <div className="border border-blue-600 border-x-1">
            Biểu đồ thống kê trạng thái liên hệ lần 3
          </div>

          <Pie data={dataChart23} />
        </div>
        <div className="w-72 border border-blue-600">
          <div className="border border-blue-600 border-x-1">
            Biểu đồ thống kê trạng thái liên hệ lần 4
          </div>

          <Pie data={dataChart23} />
        </div>
      </div>
      <div className="border flex flex-wrap justify-between">
        <div className="w-72 border border-blue-600">
          <div className="border border-blue-600 border-x-1">
            Biểu đồ thống kê trạng thái liên hệ lần 5
          </div>

          <Pie data={dataChart23} />
        </div>
        <div className="w-72 border border-blue-600">
          <div className="border border-blue-600 border-x-1">
            Biểu đồ thống kê trạng thái liên hệ lần 6
          </div>

          <Pie data={dataChart23} />
        </div>
        <div className="w-72 border border-blue-600">
          <div className="border border-blue-600 border-x-1">
            Biểu đồ thống kê trạng thái liên hệ lần 7
          </div>
          <Pie data={dataChart23} />
        </div>
      </div>
    </div>
  );
}

export default StatisticalContact;
