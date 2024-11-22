import { Link } from "react-router-dom";
import RevenueImage from "../../assets/profile/revenue.png";
import TeamPaidImage from "../../assets/profile/team-paid.png";
import TeamImage from "../../assets/profile/team.png";
import Path from "../../routes/path";

export interface PropsProfileCards {
  username?: string;
  userStatus?: string;
  totalEarnDiamond?: string;
  totalEarnGold?: string;
  todayEarnDiamond?: string;
  todayEarnGold?: string;
  teamEarn?: string | number;
  teamPaid?: string | number;
  leftUser?: string;
  rightUser?: string;
  diamondEarn?: string | number;
  leftUsersCount?: string;
  rightUsersCount?: string;
}

export default function ProfileCards({
  username,
  totalEarnDiamond,
  totalEarnGold,
  todayEarnDiamond,
  todayEarnGold,
  teamEarn,
  teamPaid,
  leftUser,
  rightUser,
  leftUsersCount,
  rightUsersCount,
}: PropsProfileCards) {
  if (totalEarnDiamond) {
    const reg = totalEarnDiamond.match(/Diamond:(\d*\.?\d*)\$/);
    if (reg !== null && reg.length == 2) {
      totalEarnDiamond = reg[1];
    }
  } else totalEarnDiamond = "...";

  if (totalEarnGold) {
    const reg = totalEarnGold.match(/Golden:(\d*\.?\d*)\$/);
    if (reg !== null && reg.length == 2) {
      totalEarnGold = reg[1];
    }
  } else totalEarnGold = "...";

  if (todayEarnDiamond) {
    const reg = todayEarnDiamond.match(/Diamond:(\d*\.?\d*)\$/);
    if (reg !== null && reg.length == 2) {
      todayEarnDiamond = reg[1];
    }
  } else todayEarnDiamond = "...";

  if (todayEarnGold) {
    const reg = todayEarnGold.match(/Golden:(\d*\.?\d*)\$/);
    if (reg !== null && reg.length == 2) {
      todayEarnGold = reg[1];
    }
  } else todayEarnGold = "...";

  const cardStyle =
    "rounded-lg relative rounded-xl bg-base-200/50 p-6 flex flex-col gap-2";
  return (
    <section className="mt-4">
      <div className={"bg-gradient-to-br from-emerald-900/50 from-20% to-base-200/10 " + cardStyle}>
        <img
          className={"absolute right-4 top-10 -z-10"}
          width={"80px"}
          src={RevenueImage}
          alt=""
        />

        <span className={"text-gray-400"}>Earned So Far</span>
        <div>
          <div className="text-xl font-bold">
            Diamond: ${totalEarnDiamond}
            <span
              className={
                "text-sm font-bold relative ml-2 text-green-600 top-0 right-0"
              }
            >
              + ${todayEarnDiamond}
            </span>
          </div>
          <div className={"text-xl font-bold"}>
            Golden: ${totalEarnGold}
            <span
              className={
                "text-sm font-bold relative ml-2 text-green-600 top-0 right-0"
              }
            >
              + ${todayEarnGold}
            </span>
          </div>
        </div>
      </div>
      <div className={"grid grid-cols-2 gap-2 mb-2 mt-4"}>
        <div className={"bg-gradient-to-tl from-teal-900/50 from-30% to-base-200/10 " +cardStyle}>
          <span className={"text-gray-400"}>Team</span>
          <img
            className={"absolute right-4 opacity-40"}
            width={"80px"}
            src={TeamImage}
            alt="gg"
          />
          <span className={"text-xl font-bold"}>{teamEarn ?? "..."}</span>
        </div>

        <div className={"bg-gradient-to-tr from-teal-900/50 from-30% to-base-200/10 " + cardStyle}>
          <span className={"text-gray-400"}>Team Paid</span>
          <img
            className={"absolute right-3 top-8 opacity-40"}
            width={"65px"}
            src={TeamPaidImage}
            alt="gg"
          />
          <span className={"text-xl font-bold"}>${teamPaid ?? "..."}</span>
        </div>
      </div>

      <div className={"grid grid-cols-2 gap-2"}>
        <div className={"bg-gradient-to-bl from-teal-800/50 from-30% to-base-200/10 rounded-xl bg-base-200 p-6 flex flex-col gap-2"}>
          <span className={"text-gray-400"}>Left User</span>
          <span className={"text-xl font-bold"}>{leftUser}</span>
        </div>

        <div className={"bg-gradient-to-br from-teal-800/50 from-30% to-base-200/10 rounded-xl  bg-base-200 p-6 flex flex-col gap-2"}>
          <span className={"text-gray-400"}>Right User</span>
          <span className={"text-xl font-bold"}>{rightUser}</span>
        </div>
      </div>




      <div
        className={
          "bg-gradient-to-r from-teal-900 from-20% to-base-200 my-2 rounded-lg flex justify-between gap-3 p-4 mt-4"
        }
      >
        <div className={"flex flex-col gap-2"}>
          <span className={"text-gray-400"}>Total {parseInt(leftUsersCount ?? '0') + parseInt(rightUsersCount ?? '0') } Buisness Partners</span>
          <span className={"font-semibold text-gray-300"}><span className="text-gray-100">{leftUsersCount ?? '...'}</span> partners on left</span>
          <span className={"font-semibold text-gray-300"}><span className="text-gray-100">{rightUsersCount ?? '...'}</span> partners on right</span>
        </div>
        <Link className={"my-auto"} to={`${Path.PROFILE}/${username}/chart`}>
          <button
            className={"btn border-2 border-teal-800/60 text-white/80 rounded-lg"}
          >
            View Chart
          </button>
        </Link>
      </div>
    </section>
  );
}
