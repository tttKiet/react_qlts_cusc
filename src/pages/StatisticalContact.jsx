// import { Tabs } from "antd";
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
import { Tab, Tabs } from "@nextui-org/react";

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
  const [maTinh, setMaTinh] = useState("");
  const [maTruong, setMaTruong] = useState("");
  const [sdtUM, setSdtUM] = useState("");
  const [year, setYear] = useState(2024);

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
    if (year) {
      data = `year=${year}`;
    }
    return data;
  });
  const index = sdtUM ? 3 : 2;
  const { data, error, isLoading } = useSWR(
    `/api/v1/chart/admin?page=data&index=${index}&${conditon}`
  );
  const chartContact = useMemo(() => {
    return data || [];
  }, [data]);

  const handleChangeSelectTinh = (value) => {
    setMaTinh(value);
  };
  const handleChangeSelectTruong = (value) => {
    setMaTruong(value);
  };
  const handleChangeSelectUM = (value) => {
    setSdtUM(value);
  };
  const handleChangeSelectYear = (value) => {
    setYear(value);
  };

  // handleDataChart1
  const labelsChartJS1 = useMemo(() => {
    return chartContact?.data?.map((item) => {
      return `Lần liên hệ ${item?.LAN}`;
    });
  }, [chartContact]);

  const dataCharrJS1 = useMemo(() => {
    return chartContact?.data?.map((item) => {
      return item?.SOLAN;
    });
  }, [chartContact]);

  const dataChart1 = {
    labels: labelsChartJS1,
    datasets: [
      {
        label: "Đã liên hệ",
        data: dataCharrJS1,
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgb(75, 192, 192)"],
        borderWidth: 1,
      },
    ],
  };
  // handleDataChart21
  const defaultLabels = [
    "Hẹn nộp phiếu ĐKXT",
    "Quan tâm",
    "Chưa gặp",
    "Theo dõi",
    "Đóng",
  ];

  const labelsChartJS21 = useMemo(() => {
    const lan_1_labels =
      chartContact?.lan_1?.map((item) => item?.TENTRANGTHAI) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !lan_1_labels.includes(label)
    );
    return [...lan_1_labels, ...missingLabels];
  }, [chartContact]);

  const dataCharrJS21 = useMemo(() => {
    const lan_1_data =
      chartContact?.lan_1?.map((item) => parseInt(item?.percent)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.contactStatus?.lan_1?.find(
        (entry) => entry.TENTRANGTHAI === label
      );
      return item ? parseInt(item.percent) : 0;
    });
    return [...lan_1_data, ...missingData];
  }, [chartContact]);

  const dataChart21 = useMemo(() => {
    if (dataCharrJS21.every((value) => value === 0)) {
      return {
        labels: ["Không có dữ liệu"],
        datasets: [
          {
            label: "%",
            data: [100],
            backgroundColor: ["rgba(201, 203, 207, 0.6)"],
          },
        ],
      };
    } else {
      return {
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
              "rgb(75, 192, 192)",
            ],
          },
        ],
      };
    }
  }, [labelsChartJS21, dataCharrJS21]);

  // handleDataChart22
  const labelsChartJS22 = useMemo(() => {
    const lan_2_labels =
      chartContact?.lan_2?.map((item) => item?.TENTRANGTHAI) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !lan_2_labels.includes(label)
    );
    return [...lan_2_labels, ...missingLabels];
  }, [chartContact]);

  const dataCharrJS22 = useMemo(() => {
    const lan_2_data =
      chartContact?.lan_2?.map((item) => parseInt(item?.percent)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.contactStatus?.lan_2?.find(
        (entry) => entry.TENTRANGTHAI === label
      );
      return item ? parseInt(item.percent) : 0;
    });
    return [...lan_2_data, ...missingData];
  }, [chartContact]);

  const dataChart22 = useMemo(() => {
    if (dataCharrJS22.every((value) => value === 0)) {
      return {
        labels: ["Không có dữ liệu"],
        datasets: [
          {
            label: "%",
            data: [100],
            backgroundColor: ["rgba(201, 203, 207, 0.6)"],
          },
        ],
      };
    } else {
      return {
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
              "rgb(75, 192, 192)",
            ],
          },
        ],
      };
    }
  }, [labelsChartJS22, dataCharrJS22]);

  // handleDataChart23
  const labelsChartJS23 = useMemo(() => {
    const lan_3_labels =
      chartContact?.lan_3?.map((item) => item?.TENTRANGTHAI) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !lan_3_labels.includes(label)
    );
    return [...lan_3_labels, ...missingLabels];
  }, [chartContact]);

  const dataCharrJS23 = useMemo(() => {
    const lan_3_data =
      chartContact?.lan_3?.map((item) => parseInt(item?.percent)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.contactStatus?.lan_3?.find(
        (entry) => entry.TENTRANGTHAI === label
      );
      return item ? parseInt(item.percent) : 0;
    });
    return [...lan_3_data, ...missingData];
  }, [chartContact]);

  const dataChart23 = useMemo(() => {
    if (dataCharrJS23.every((value) => value === 0)) {
      return {
        labels: ["Không có dữ liệu"],
        datasets: [
          {
            label: "%",
            data: [100],
            backgroundColor: ["rgba(201, 203, 207, 0.6)"],
          },
        ],
      };
    } else {
      return {
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
              "rgb(75, 192, 192)",
            ],
          },
        ],
      };
    }
  }, [labelsChartJS23, dataCharrJS23]);

  // handleDataChart24
  const labelsChartJS24 = useMemo(() => {
    const lan_4_labels =
      chartContact?.lan_4?.map((item) => item?.TENTRANGTHAI) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !lan_4_labels.includes(label)
    );
    return [...lan_4_labels, ...missingLabels];
  }, [chartContact]);

  const dataCharrJS24 = useMemo(() => {
    const lan_4_data =
      chartContact?.lan_4?.map((item) => parseInt(item?.percent)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.contactStatus?.lan_4?.find(
        (entry) => entry.TENTRANGTHAI === label
      );
      return item ? parseInt(item.percent) : 0;
    });
    return [...lan_4_data, ...missingData];
  }, [chartContact]);

  const dataChart24 = useMemo(() => {
    if (dataCharrJS24.every((value) => value === 0)) {
      return {
        labels: ["Không có dữ liệu"],
        datasets: [
          {
            label: "%",
            data: [100],
            backgroundColor: ["rgba(201, 203, 207, 0.6)"],
          },
        ],
      };
    } else {
      return {
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
              "rgb(75, 192, 192)",
            ],
          },
        ],
      };
    }
  }, [labelsChartJS24, dataCharrJS24]);

  // handleDataChart25
  const labelsChartJS25 = useMemo(() => {
    const lan_5_labels =
      chartContact?.lan_5?.map((item) => item?.TENTRANGTHAI) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !lan_5_labels.includes(label)
    );
    return [...lan_5_labels, ...missingLabels];
  }, [chartContact]);

  const dataCharrJS25 = useMemo(() => {
    const lan_5_data =
      chartContact?.lan_5?.map((item) => parseInt(item?.percent)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.contactStatus?.lan_5?.find(
        (entry) => entry.TENTRANGTHAI === label
      );
      return item ? parseInt(item.percent) : 0;
    });
    return [...lan_5_data, ...missingData];
  }, [chartContact]);
  const dataChart25 = useMemo(() => {
    if (dataCharrJS25.every((value) => value === 0)) {
      return {
        labels: ["Không có dữ liệu"],
        datasets: [
          {
            label: "%",
            data: [100],
            backgroundColor: ["rgba(201, 203, 207, 0.6)"],
          },
        ],
      };
    } else {
      return {
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
              "rgb(75, 192, 192)",
            ],
          },
        ],
      };
    }
  }, [labelsChartJS25, dataCharrJS25]);

  // handleDataChart26
  const labelsChartJS26 = useMemo(() => {
    const lan_6_labels =
      chartContact?.lan_6?.map((item) => item?.TENTRANGTHAI) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !lan_6_labels.includes(label)
    );
    return [...lan_6_labels, ...missingLabels];
  }, [chartContact]);

  const dataCharrJS26 = useMemo(() => {
    const lan_6_data =
      chartContact?.lan_6?.map((item) => parseInt(item?.percent)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.contactStatus?.lan_6?.find(
        (entry) => entry.TENTRANGTHAI === label
      );
      return item ? parseInt(item.percent) : 0;
    });
    return [...lan_6_data, ...missingData];
  }, [chartContact]);

  const dataChart26 = useMemo(() => {
    if (dataCharrJS26.every((value) => value === 0)) {
      return {
        labels: ["Không có dữ liệu"],
        datasets: [
          {
            label: "%",
            data: [100],
            backgroundColor: ["rgba(201, 203, 207, 0.6)"],
          },
        ],
      };
    } else {
      return {
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
              "rgb(75, 192, 192)",
            ],
          },
        ],
      };
    }
  }, [labelsChartJS26, dataCharrJS26]);
  // handleDataChart27
  // const labelsChartJS27 = useMemo(() => {
  //   return chartContact?.contactStatus?.lan_7?.map((item) => {
  //     return item?.TENTRANGTHAI;
  //   });
  // }, [chartContact]);

  // const dataCharrJS27 = useMemo(() => {
  //   return chartContact?.contactStatus?.lan_7?.map((item) => {
  //     return item?.percent;
  //   });
  // }, [chartContact]);

  // const dataChart27 = {
  //   labels: labelsChartJS27 || [],
  //   datasets: [
  //     {
  //       label: "%",
  //       data: dataCharrJS27 || [],
  //       backgroundColor: [
  //         "rgb(255, 99, 132)",
  //         "rgb(54, 162, 235)",
  //         "rgb(255, 205, 86)",
  //         "rgb(103, 185, 65)",
  //       ],
  //     },
  //   ],
  // };

  const labelsChartJS27 = useMemo(() => {
    const lan_7_labels =
      chartContact?.lan_7?.map((item) => item?.TENTRANGTHAI) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !lan_7_labels.includes(label)
    );
    return [...lan_7_labels, ...missingLabels];
  }, [chartContact]);

  const dataCharrJS27 = useMemo(() => {
    const lan_7_data =
      chartContact?.lan_7?.map((item) => parseInt(item?.percent)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.contactStatus?.lan_7?.find(
        (entry) => entry.TENTRANGTHAI === label
      );
      return item ? parseInt(item.percent) : 0;
    });
    return [...lan_7_data, ...missingData];
  }, [chartContact]);

  const dataChart27 = useMemo(() => {
    if (dataCharrJS27.every((value) => value === 0)) {
      return {
        labels: ["Không có dữ liệu"],
        datasets: [
          {
            label: "%",
            data: [100],
            backgroundColor: ["rgba(201, 203, 207, 0.6)"],
          },
        ],
      };
    } else {
      return {
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
              "rgb(75, 192, 192)",
            ],
          },
        ],
      };
    }
  }, [labelsChartJS27, dataCharrJS27]);

  const [selected, setSelected] = useState("all");
  const onChangeTabs = (e) => {
    setMaTinh("");
    setMaTruong("");
    setSdtUM("");
    setSelected(e);
  };

  return (
    <div>
      <div
        style={{
          padding: 24,
          minHeight: 425,
          background: "#fff",
          borderRadius: "10px",
        }}
        className="shadow-lg"
      >
        <div>
          <h1 className="font-bold text-lg mb-2">Thống kê liên hệ</h1>
          <div className="flex justify-between">
            <div>
              <Tabs
                aria-label="Options"
                selectedKey={selected}
                onSelectionChange={(e) => onChangeTabs(e)}
                variant="light"
              >
                <Tab key="all" title="Tất cả"></Tab>
                <Tab key="province" title="Tỉnh">
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
                </Tab>
                <Tab key="school" title="Trường">
                  <div className="flex gap-2">
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
                </Tab>
                <Tab key="UM" title="User Manager">
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
                </Tab>
              </Tabs>
            </div>
            <div className="mr-80">
              <Tabs
              // aria-label="Options"
              // selectedKey={selected}
              // onSelectionChange={(e) => onChangeTabs(e)}
              // variant="light"
              >
                <Tab key="year" title="Năm">
                  <Select
                    placeholder="Chọn năm nhé"
                    style={{
                      width: 200,
                    }}
                    onChange={handleChangeSelectYear}
                    options={[
                      {
                        label: 2024,
                        value: 2024,
                      },
                      {
                        label: 2023,
                        value: 2023,
                      },
                      {
                        label: 2022,
                        value: 2022,
                      },
                      {
                        label: 2021,
                        value: 2021,
                      },
                      {
                        label: 2020,
                        value: 2020,
                      },
                    ]}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="ss1 max-w-[1000px] flex m-auto">
          <Bar data={dataChart1} />
        </div>
        <h1 className="text-center font-medium text-[17px]">
          Thống kê số lần gọi theo ngày
        </h1>
      </div>
      <div className="flex flex-wrap justify-between mt-5">
        <div
          className="w-72 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="p-2 font-medium">
            Thống kê trạng thái liên hệ lần 1
          </div>
          <Pie
            data={dataChart21}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <div
          className="w-72 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="p-2 font-medium">
            Thống kê trạng thái liên hệ lần 2
          </div>
          <Pie
            data={dataChart22}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <div
          className="w-72 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="p-2 font-medium">
            Thống kê trạng thái liên hệ lần 3
          </div>

          <Pie
            data={dataChart23}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <div
          className="w-72 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="p-2 font-medium">
            Thống kê trạng thái liên hệ lần 4
          </div>

          <Pie
            data={dataChart24}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between mt-5">
        <div
          className="w-72 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="p-2 font-medium">
            Thống kê trạng thái liên hệ lần 5
          </div>

          <Pie
            data={dataChart25}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <div
          className="w-72 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="p-2 font-medium">
            Thống kê trạng thái liên hệ lần 6
          </div>

          <Pie
            data={dataChart26}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
        <div
          className="w-72 shadow-lg"
          style={{
            background: "#fff",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="p-2 font-medium">
            Thống kê trạng thái liên hệ lần 7
          </div>
          <Pie
            data={dataChart27}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatisticalContact;
