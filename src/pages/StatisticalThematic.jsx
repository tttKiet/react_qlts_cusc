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

function StatisticalThematic() {
  const [maTinh, setMaTinh] = useState("");
  const [maTruong, setMaTruong] = useState("");
  const [sdtUM, setSdtUM] = useState("");
  const [thematic, setThematic] = useState("");

  const {
    data: dataThematic,
    error: errThematic,
    isLoading: isLoadingThematic,
  } = useSWR(`/api/v1/thematic/readAll`);
  const thematics = useMemo(() => {
    return dataThematic || [];
  }, [dataThematic]);

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
    if (thematic) {
      data += `MACHUYENDE=${thematic}&`;
    }
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
    `/api/v1/chart/admin?page=data&index=${4}&${conditon}`
  );
  const chartContact = useMemo(() => {
    return data || [];
  }, [data]);

  console.log("chartContact", chartContact);

  const handleChangeSelectThematic = (value) => {
    setThematic(value);
  };

  const handleChangeSelectTinh = (value) => {
    setMaTinh(value);
  };
  const handleChangeSelectTruong = (value) => {
    setMaTruong(value);
  };
  const handleChangeSelectUM = (value) => {
    setSdtUM(value);
  };

  const defaultLabels = ["Đồng ý", "Không đồng ý", "Xem lại"];

  const labelChart = useMemo(() => {
    const labels =
      chartContact?.data
        ?.map((item) => item?.TRANGTHAI)
        .filter((label) => label !== null) || [];
    const missingLabels = defaultLabels.filter(
      (label) => !labels.includes(label)
    );
    return [...labels, ...missingLabels];
  }, [chartContact]);

  // console.log("labelChart", labelChart)

  const dataChart = useMemo(() => {
    const chart_data =
      chartContact?.data?.map((item) => parseInt(item?.count)) || [];
    const missingData = defaultLabels.map((label) => {
      const item = chartContact?.data?.find(
        (entry) => entry.TRANGTHAI === label
      );
      return item ? parseInt(item.count) : 0;
    });
    return [...missingData];
  }, [chartContact]);

  console.log("labelChart", labelChart);

  console.log(dataChart);

  const dataBar = {
    labels: defaultLabels,
    datasets: [
      {
        data: dataChart,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const [selected, setSelected] = useState("all");
  const onChangeTabs = (e) => {
    setMaTinh("");
    setMaTruong("");
    setSdtUM("");
    setThematic("");
    setSelected(e);
  };

  return (
    <>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          borderRadius: "10px",
        }}
        className="shadow-lg"
      >
        <h1 className='font-bold text-lg mb-2'>Thống kê chuyên đề</h1>
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={(e) => onChangeTabs(e)}
          variant="light"
        >
          <Tab key="all" title="Tất cả">
            <Select
              placeholder="Chọn chuyên đề đi nhé"
              style={{
                width: 300,
              }}
              onChange={handleChangeSelectThematic}
              options={thematics?.map((item) => {
                return {
                  label: `${item?.TENCHUYENDE} - được quản lý bởi ${item?.usermanager?.HOTEN}`,
                  value: item?.MACHUYENDE,
                };
              })}
            />
          </Tab>
          <Tab key="province" title="Tỉnh">
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
                placeholder="Chọn chuyên đề đi nhé"
                style={{
                  width: 300,
                }}
                onChange={handleChangeSelectThematic}
                options={thematics?.map((item) => {
                  return {
                    label: `${item?.TENCHUYENDE} - được quản lý bởi ${item?.usermanager?.HOTEN}`,
                    value: item?.MACHUYENDE,
                  };
                })}
              />
            </div>
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
              <Select
                placeholder="Chọn chuyên đề đi nhé"
                style={{
                  width: 300,
                }}
                onChange={handleChangeSelectThematic}
                options={thematics?.map((item) => {
                  return {
                    label: `${item?.TENCHUYENDE} - được quản lý bởi ${item?.usermanager?.HOTEN}`,
                    value: item?.MACHUYENDE,
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
        <div className="max-w-[950px] flex m-auto">
          <Bar
            data={dataBar}
            options={{
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
        <h1 className="text-center font-medium text-[17px]">Thống kê chuyên đề</h1>
      </div>
    </>
  );
}

export default StatisticalThematic;
