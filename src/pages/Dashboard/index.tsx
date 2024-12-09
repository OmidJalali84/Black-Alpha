import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  getUserInfo,
  getUserStageData,
  zeroAddr,
} from "../../modules/web3/actions";
import ProfileBanner, {
  PropsProfileBanner,
} from "../../components/profile/ProfileBanner";
import { yankClipboard } from "../../modules/clipboard";
import { useNavigate } from "react-router-dom";
import Path from "../../routes/path";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import ProfileCards from "../../components/profile/ProfileCards";
import Withdraw from "./component/Withdraw";
import ProfileStage from "../../components/profile/ProfileStage";

const { open } = useWeb3Modal();

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [modalOpen, setModalClose] = useState(false);
  const handleOpen = () => setModalClose(true);
  const navigate = useNavigate();

  const { data: userInfo, refetch: refetchUserInfo } = getUserInfo(
    undefined,
    isConnected ? address : zeroAddr
  );

  const { data: getUserStageDetails, refetch: refetchUserStageData } =
    getUserStageData(undefined, isConnected ? address : zeroAddr, 0);

  const reloadProfileData = async () => {
    await refetchUserInfo();
    await refetchUserStageData();
  };

  const profileBannerData: PropsProfileBanner = {
    walletAddr: address,
    reagentId: userInfo?.[2],
    rootLevel: getUserStageDetails?.[9],
    accountId: userInfo?.[1],
    joined: getUserStageDetails?.[0],
  };

  const data = {
    username: userInfo?.[1],
    userStatus: userInfo?.[13],
    totalEarnDiamond: getUserStageDetails?.[1].split("-")[0],
    totalEarnGold: getUserStageDetails?.[1].split("-")[1],
    todayEarnDiamond: getUserStageDetails?.[3].split("-")[0],
    todayEarnGold: getUserStageDetails?.[3].split("-")[1],
    teamEarn: parseInt(userInfo?.[8] ?? "0") + parseInt(userInfo?.[9] ?? "0"),
    teamPaid: parseInt(userInfo?.[10] ?? "0") + parseInt(userInfo?.[11] ?? "0"),
    leftUser: userInfo?.[4] || "nobody",
    rightUser: userInfo?.[5] || "nobody",
    diamondEarn: userInfo?.[7].slice(8, 12) ?? "0",
    leftUsersCount: userInfo?.[8],
    rightUsersCount: userInfo?.[9],
    stageValue: parseInt(userInfo?.[3] ?? "0"),
    upgradeAmount: parseInt(userInfo?.[12] ?? "0"),
  };

  // its for withdraw modal
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "black",
    boxShadow: 24,
    borderRadius: "8px",
  };

  useEffect(() => {
    if (data.userStatus === "Unregistered User") {
      if (isConnected) {
        navigate(Path.REGISTER);
        return;
      }

      // open wallet connect dialog
      open();
      return;
    }
  }, [userInfo]);

  return (
    <main
      className={
        "pt-4 mx-auto max-w-screen-xl max-md:px-6 gap-x-4 flex flex-col justify-center content-around"
      }
    >
      <ProfileBanner {...profileBannerData} />

      {/* share profile link part */}
      <div className={"mt-1 w-full bg-gray-950 bg-opacity-30 p-3 rounded-2xl"}>
        <span className={"text-md text-gray-200"}>Referral Link </span>
        <br />
        <span className={"text-sm"}>
          https://rifex.io/register?ref={data.username}
        </span>
        <button
          className={
            "w-full btn border-0 bg-blue-600 text-white/80 rounded-lg mt-2"
          }
          onClick={() =>
            yankClipboard("https://rifex.io/register?ref=" + data.username)
          }
        >
          Copy Link
        </button>
      </div>

      <ProfileCards {...data} />

      <div
        className={
          "bg-gradient-to-r from-sky-900 from-20% to-base-200 my-2 rounded-lg flex justify-between gap-3 p-4 mt-2"
        }
      >
        <span className={"flex items-center text-md font-bold text-white/80"}>
          Diamond Earn: ${data.diamondEarn}
        </span>
        <button
          className={"btn border-2 border-sky-800/60 text-white/80 rounded-lg"}
          onClick={handleOpen}
        >
          Withdraw
        </button>
      </div>

      <ProfileStage
        address={address ?? ""}
        stageValue={data.stageValue}
        upgradeAmount={data.upgradeAmount}
        refetch={reloadProfileData}
      />

      <div className={"my-2"} />

      <Modal
        open={modalOpen}
        onClose={() => setModalClose(true)}
        hideBackdrop={false}
        disableEscapeKeyDown={true}
      >
        <Box sx={style}>
          <div className={"bg-base-100 rounded-t-lg text-end"}>
            <button
              className="font-bold mt-2 pr-4"
              onClick={() => setModalClose(false)}
            >
              <CloseIcon className="w-full" />
            </button>
          </div>
          <Withdraw withdrawValue={data.diamondEarn} walletAddress={address} />
        </Box>
      </Modal>
    </main>
  );
}
