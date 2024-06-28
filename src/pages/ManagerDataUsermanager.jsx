import useSWR from "swr";
import { API_DATA } from "../constants";

function ManagerDataUsermanager() {
    const { data: dataSegmentUsermanager, mutate: fetchDataSegmentUsermanager } = useSWR(`${API_DATA}/segment?SDT_UM=0704388113`)
    console.log("dataSegmentUsermanager", dataSegmentUsermanager)
    return (
        <>
            <div className="contentPage"
                style={{
                    padding: 24,
                    minHeight: 500,
                    background: "#fff",
                    borderRadius: "10px"
                }}>

            </div>
        </>
    );
}

export default ManagerDataUsermanager;