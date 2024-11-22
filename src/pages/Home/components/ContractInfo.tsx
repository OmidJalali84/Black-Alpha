import Lottie from "lottie-react";
import proccessAnimation from "../../../assets/animations/process.json";
import LaunchIcon from "@mui/icons-material/Launch";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BackgroundShape from "../../../assets/about-shape.png";
import { getContractDetails } from "../../../modules/web3/actions.ts";
import { yankClipboard } from "../../../modules/clipboard.ts";
import { contractMainAddr } from "../../../modules/web3/config.ts";

export default function HowToStartModule() {
  const { data: contractInfo } = getContractDetails();

  return (
    <>
      <section
        className={
          "bg-base-100 flex flex-col items-center justify-center px-8 border-t-2 border-secondary mt-10 pt-5"
        }
      >
        <span className={"text-3xl font-bold mt-4 center"}>
          Contract Information:
        </span>
        <div
          className={
            "w-full grid lg:grid-cols-3 mt-8 bg-transparent backdrop-blur container mx-auto z-[2] border-primary border-2 rounded-3xl"
          }
        >
          <div
            className={
              "flex flex-col items-center justify-center p-4  rounded-3xl"
            }
          >
            <div className={"bg-base-100/50 p-2 rounded-full mt-4"}>
              <span className={"md:text-xl mb-4"}>
                {contractMainAddr?.slice(0, 9) +
                  "..." +
                  contractMainAddr?.slice(33, 42)}
                <button onClick={() => yankClipboard(contractMainAddr)}>
                  <ContentCopyIcon className={"text-blue-600"} />
                </button>
              </span>
            </div>

            <a
              className={"mt-4 mb-10"}
              target={"_blank"}
              href={
                "https://polygonscan.com/address/0x3d5df6e5102eaf028124b84fedd05338b839eddb#readContract"
              }
            >
              <span
                className={
                  "text-blue-700 text-lg bg-blue-600/10 p-3 rounded-full mt-2"
                }
              >
                Polygon Scan
                <LaunchIcon />
              </span>
            </a>
          </div>
          <div className={"flex flex-col items-center justify-center"}>
            <Lottie
              animationData={proccessAnimation}
              loop={true}
              className={"w-2/3"}
            />
          </div>
          <div
            className={
              "flex flex-col items-center justify-center p-4  rounded-3xl"
            }
          >
            <div className={"flex flex-col"}>
              <span className={"text-2xl mt-10"}>Total Entrance </span>
              <span
                className={" text-2xl font-bold text-center text-green-600"}
              >
                {contractInfo?.[2] || "0$"}
              </span>
            </div>
            <div className={"flex flex-col mt-4"}>
              <span className={"text-2xl "}>Total User </span>

              <span
                className={" text-2xl font-bold text-center text-secondary"}
              >
                {contractInfo?.[1] || "0 "}
                &nbsp;
                <PeopleAltIcon />
              </span>
            </div>
            {/*<span>According to your stake amount, choose a plan and go to staking and plan section. Connect your wallet and then enter the referral code.</span>*/}
          </div>
        </div>
        <div className={"absolute z-[1]"}>
          <img
            className={"mt-24 ml-auto mr-auto z-[1] w-[80%] lg:hidden"}
            src={BackgroundShape}
            alt=""
          />
        </div>
      </section>
    </>
  );
}
