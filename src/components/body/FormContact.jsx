import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { API_CUSTOMER, API_DATA } from "../../constants";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { toast } from "react-toastify";

function FormContact({ onSubmit, lan, statusContact }) {
  const { id } = useParams();
  const { data: detailData, mutate } = useSWR(`${API_CUSTOMER}/${id}`);
  const { data: dataStatus, mutate: fetchDataStatus } = useSWR(
    `${API_DATA}/status`
  );
  const detailStatus = [
    { value: "Chưa liên hệ", label: "Chưa liên hệ" },
    { value: "Đã liên hệ", label: "Đã liên hệ" },
    { value: "Tài chính", label: "Tài chính" },
    { value: "Cá nhân", label: "Cá nhân" },
    { value: "Bằng cấp", label: "Bằng cấp" },
    { value: "Việc làm", label: "Việc làm" },
    { value: "Liên thông", label: "Liên thông" },
    { value: "Chương trình", label: "Chương trình" },
    { value: "Chất lượng", label: "Chất lượng" },
    { value: "Xem lại", label: "Xem lại" },
    { value: "Thời gian", label: "Thời gian" },
    { value: "Không liên lạc được", label: "Không liên lạc được" },
    { value: "Không nghe máy", label: "Không nghe máy" },
    { value: "Không phải số", label: "Không phải số" },
    { value: "Trùng", label: "Trùng" },
    { value: "Tự liên lạc", label: "Tự liên lạc" },
    { value: "Đang học", label: "Đang học" },
    { value: "Đang bận", label: "Đang bận" },
    { value: "Sinh viên", label: "Sinh viên" },
    { value: "Học sinh lớp 10", label: "Học sinh lớp 10" },
    { value: "Học sinh lớp 11", label: "Học sinh lớp 11" },
    { value: "Không quan tâm", label: "Không quan tâm" },
    { value: "Người đi làm", label: "Người đi làm" },
    { value: "Học trường khác", label: "Học trường khác" },
    { value: "Nhắn lại", label: "Nhắn lại" },
  ];
  const classDisable = "pointer-events-none opacity-50";

  const [MATRANGTHAI, setMATRANGTHAI] = useState("");
  const [CHITIETTRANGTHAI, setCHITIETTRANGTHAI] = useState("");
  const [KETQUA, setKETQUA] = useState("");
  const [dateSelect, setDateSelected] = useState(null);

  useEffect(() => {
    if (detailData && detailData.lienhe && lan) {
      const contactDetails = [1, 2, 3, 4, 5, 6, 7].map((lan) => {
        const contact = detailData?.lienhe.find((c) => c.LAN == lan);
        return {
          LAN: lan,
          THOIGIAN: contact ? parseDate(contact.THOIGIAN) : null,
          CHITIETTRANGTHAI: contact ? contact.CHITIETTRANGTHAI : "",
          KETQUA: contact ? contact.KETQUA : "",
          TRANGTHAI: contact ? contact.MATRANGTHAI : "",
        };
      });
      if (contactDetails) {
        setMATRANGTHAI(contactDetails[lan - 1].TRANGTHAI || "");
        setCHITIETTRANGTHAI(contactDetails[lan - 1].CHITIETTRANGTHAI || "");
        setKETQUA(contactDetails[lan - 1].KETQUA || "");
        setDateSelected(
          contactDetails[lan - 1].THOIGIAN || today(getLocalTimeZone())
        );
      }
    }
  }, [detailData, lan]);

  const handleSubmit = () => {
    if (MATRANGTHAI === "" || CHITIETTRANGTHAI === "" || KETQUA === "") {
      toast.warn("Vui lòng nhập đầy đủ thông tin");
    } else {
      const data = {
        SDT_KH: detailData.SDT,
        MATRANGTHAI: MATRANGTHAI,
        CHITIETTRANGTHAI: CHITIETTRANGTHAI,
        KETQUA: KETQUA,
        LAN: lan,
      };
      onSubmit(data);
    }
  };
  return (
    <>
      <div className={lan && lan == statusContact ? "" : classDisable}>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="col-span-2 md:col-span-1">
            <DatePicker
              className="max-w-[284px]"
              label="Ngày liên hệ"
              value={dateSelect}
              onChange={setDateSelected}
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="col-span-2 md:col-span-1">
              <Autocomplete
                label="Trạng thái"
                selectedKey={MATRANGTHAI}
                // onChange={setMATRANGTHAI}
                onSelectionChange={setMATRANGTHAI}
              >
                {dataStatus?.map((status) => (
                  <AutocompleteItem
                    key={status.MATRANGTHAI}
                    value={status.MATRANGTHAI}
                  >
                    {status.TENTRANGTHAI}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <Autocomplete
            label="Chi tiết trạng thái"
            selectedKey={CHITIETTRANGTHAI}
            onSelectionChange={setCHITIETTRANGTHAI}
          >
            {detailStatus?.map((detail) => (
              <AutocompleteItem key={detail.value} value={detail.value}>
                {detail.label}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="text"
              label="Kết quả"
              value={KETQUA}
              onValueChange={setKETQUA}
            />
          </div>
        </div>
        <Button color="primary" onPress={handleSubmit}>
          Xác nhận
        </Button>
      </div>
    </>
  );
}

export default FormContact;
