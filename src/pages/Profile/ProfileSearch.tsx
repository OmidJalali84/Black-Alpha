import { useParams } from "react-router-dom";
import { getUserInfo, getUserStageData } from "../../modules/web3/actions";
import ProfileBanner, {
  PropsProfileBanner,
} from "../../components/profile/ProfileBanner";
import { yankClipboard } from "../../modules/clipboard";
import { useNavigate } from "react-router-dom";
import Path from "../../routes/path";
import { toast } from "react-toastify";
import ProfileCards from "../../components/profile/ProfileCards";
import ProfileStage from "../../components/profile/ProfileStage";
import { useEffect } from "react";

export default function ProfileSearch() {
  const { username } = useParams();
  const navigate = useNavigate();

  const { data: userInfo } = getUserInfo(username);
  useEffect(() => {
    (async () => {
      if (userInfo?.[13] === "Unregistered User") {
        await toast.info("User not found!");
        navigate(Path.PROFILE);
        return;
      }
    })();
  }, [userInfo, navigate]);

  const { data: getUserStageDetails } = getUserStageData(
    username,
    undefined,
    0
  );

  const profileBannerData: PropsProfileBanner = {
    walletAddr: userInfo?.[0],
    reagentId: userInfo?.[2],
    rootLevel: getUserStageDetails?.[9],
    accountId: userInfo?.[1],
    joined: getUserStageDetails?.[0],
  };

  const data = {
    username: username,
    userStatus: userInfo?.[13],
    totalEarnDiamond: getUserStageDetails?.[1].split("-")[0],
    totalEarnGold: getUserStageDetails?.[1].split("-")[1],
    todayEarnDiamond: getUserStageDetails?.[3].split("-")[0],
    todayEarnGold: getUserStageDetails?.[3].split("-")[1],
    teamEarn: parseInt(userInfo?.[8] ?? "0") + parseInt(userInfo?.[9] ?? "0"),
    teamPaid: parseInt(userInfo?.[10] ?? "0") + parseInt(userInfo?.[11] ?? "0"),
    leftUser: userInfo?.[4] || "nobody",
    rightUser: userInfo?.[5] || "nobody",
    diamondEarn: userInfo?.[7],
    leftUsersCount: userInfo?.[8],
    rightUsersCount: userInfo?.[9],
    stageValue: parseInt(userInfo?.[3] ?? "0"),
    upgradeAmount: parseInt(userInfo?.[12] ?? "0"),
  };

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
          https://Rifex.com/register?ref={data.username}
        </span>
        <button
          className={
            "w-full btn border-0 bg-blue-600 text-white/80 rounded-full mt-2"
          }
          onClick={() =>
            yankClipboard("https://Rifex.com/register?ref=" + data.username)
          }
        >
          Copy Link
        </button>
      </div>

      <ProfileCards {...data} />

      <ProfileStage
        address={""}
        stageValue={data.stageValue}
        upgradeAmount={data.upgradeAmount}
        showOnly={true}
      />

      <div className={"my-2"} />
    </main>
  );
}
