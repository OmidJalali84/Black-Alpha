import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Marquee from "react-fast-marquee";
import { getContractDetails } from "../../../modules/web3/actions.ts";

export default function ContractDataLine() {
  const { data: contractInfo } = getContractDetails();

  return (
    <section>
      <Marquee className="w-full bg-base-300 border-b-2 border-gray-700 z-[4] py-2 max-sm:overflow-scroll">
        <div
          className={
            " flex flex-row md:justify-center gap-1 items-center w-[120px] mx-5"
          }
        >
          <span className={"text-secondary "}>
            <PeopleAltIcon />
          </span>
          <p className={""}>All Users</p>
          <span className={"text-secondary"}>{contractInfo?.[1] || "0"} </span>
        </div>
        <div
          className={
            "flex flex-row md:justify-center items-center gap-1 w-[180px] mx-5"
          }
        >
          <span className={"text-secondary"}>
            <CurrencyExchangeIcon />
          </span>
          <p>Total Entrance</p>
          <span className={"text-secondary"}>{contractInfo?.[2] || "0$"}</span>
        </div>
        <div
          className={"flex md:justify-center items-center gap-1 w-[180px] mx-5"}
        >
          <span className={"text-secondary"}>
            <AttachMoneyIcon />
          </span>
          <span className={"-ml-2"}>Today Entrance</span>
          <span className={"text-secondary"}>{contractInfo?.[4] || "0$"}</span>
        </div>
        <div
          className={"flex md:justify-center items-center gap-1 w-[150px] mx-5"}
        >
          <span className={"text-secondary"}>
            <PersonAddIcon />
          </span>
          Today Users
          <span className={"text-secondary"}>{contractInfo?.[3] || "0"} </span>
        </div>
      </Marquee>
    </section>
  );
}
