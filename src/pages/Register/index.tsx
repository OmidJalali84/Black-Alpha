import styles from "./register.module.css";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import {
  approveUser,
  fmtEther,
  getAllowanceValue,
  getAutoReferral,
  getUserInfo,
  registerUser,
  zeroAddr,
} from "../../modules/web3/actions.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import Path from "../../routes/path.ts";
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { config } from "../../modules/web3/config.ts";
import { waitForTransactionReceipt } from "wagmi/actions";

const { open } = useWeb3Modal();

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { address, isConnected } = useAccount();
  const {
    data: allowanceAmount,
    fetchStatus: getAllowanceFetchStatus,
    refetch: refetchAllowance,
  } = getAllowanceValue(address ?? zeroAddr);
  const { data: userInfo } = getUserInfo(
    undefined,
    address ? address : zeroAddr
  );

  const [waitWeb3, setWaitWeb3] = useState(false);
  const isLoading = () => {
    return isConnected && (getAllowanceFetchStatus === "fetching" || waitWeb3);
  };

  useEffect(() => {
    if (userInfo && userInfo[13] === "Active User") {
      navigate(Path.DASHBOARD);
      return;
    }
  }, [userInfo]);

  const [activeStep, setActiveStep] = useState(isConnected ? 1 : 0);
  useEffect(() => {
    if (!isConnected) setActiveStep(0);
    else if (activeStep === 0) setActiveStep(1);
  }, [isConnected]);

  useEffect(() => {
    if (!isConnected) return;

    if (allowanceAmount !== undefined) {
      if (fmtEther(allowanceAmount) >= 33) {
        setActiveStep(2);
      }
    }
  }, [allowanceAmount]);

  const [refUsername, setRefUsername] = useState(searchParams.get("ref") ?? "");
  const [username, setUsername] = useState(searchParams.get("usr") ?? "");
  const [hasReferral, setHasReferral] = useState(false); // New state for check mark

  const submitUser = async () => {
    // if not connected to walletconnect open dialog
    if (!isConnected) {
      open();
      return;
    }

    if (userInfo && userInfo[13] === "Active User") {
      toast.success("You Have Already Registered!");
      navigate(Path.DASHBOARD);
      return;
    }

    try {
      setWaitWeb3(true);
      if (allowanceAmount && fmtEther(allowanceAmount) >= 33) {
        const referral = hasReferral
          ? await getAutoReferral(refUsername.toLowerCase())
          : zeroAddr;

        const registerTransaction = await registerUser(
          username.toLowerCase(),
          referral
        );
        toast.info("Register request sent...");
        await waitForTransactionReceipt(config, {
          hash: registerTransaction,
        });
        toast.info("Registered successfully!");
        navigate(Path.DASHBOARD);
      } else {
        await approveUser();
      }
    } catch (err: any) {
      if (err.name === "ContractFunctionExecutionError") {
        switch (true) {
          case /exceeds balance/.test(err.message):
            toast.error("Insufficient funds!");
            break;
          case /no referral by this name/.test(err.message):
            toast.error("Referral username not found!");
            break;
          case /username must be between/.test(err.message):
            toast.error("Username must be between 3 to 16 characters!");
            break;
          default:
            toast.error(err.message);
            console.error(err);
        }
      }
    }

    setWaitWeb3(false);
  };

  return (
    <main className={"mx-auto max-w-screen-xl"}>
      <div className={"flex flex-col gap-6 pt-12 px-10 mb-10"}>
        <div className={"py-4"}>
          <span className={"font-bold text-2xl "}>Register stage in Rifex</span>
          <br />
          <span>
            Please connect your wallet and then go through the register process
          </span>
        </div>

        <Stepper activeStep={activeStep} orientation="vertical">
          <Step key={0}>
            <StepLabel>
              <span className={styles.label}>Connect Wallet</span>
            </StepLabel>
            <StepContent>
              <Typography className={styles.description}>
                Connect your wallet
              </Typography>
              <button
                disabled={isLoading()}
                className={"btn btn-primary w-full mt-3"}
                onClick={() => open()}
              >
                Continue
              </button>
            </StepContent>
          </Step>

          <Step key={1}>
            <StepLabel>
              <span className={styles.label}>Approve Register</span>
            </StepLabel>
            <StepContent>
              <Typography className={styles.description}>
                Approve the amount for it
              </Typography>
              <div className={styles.input}>
                <button
                  disabled={isLoading()}
                  className={"btn btn-primary"}
                  onClick={async () => {
                    setWaitWeb3(true);
                    try {
                      const approveTransaction = await approveUser();
                      await waitForTransactionReceipt(config, {
                        hash: approveTransaction,
                      });
                      await refetchAllowance();
                    } catch (err: any) {
                      if (
                        err.name === "TransactionExecutionError" &&
                        /rejected/.test(err.message)
                      ) {
                        toast.error("User rejected approval");
                      } else {
                        toast.error(String(err.message));
                      }
                    }
                    setWaitWeb3(false);
                  }}
                >
                  {isLoading() ? (
                    <span className="loading loading-dots loading-md text-gray-500"></span>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </div>
            </StepContent>
          </Step>

          <Step key={2}>
            <StepLabel>
              <span className={styles.label}>Referral</span>
            </StepLabel>
            <StepContent>
              <Typography className={styles.description}>
                Do you have a referral?
              </Typography>
              <div className={styles.input}>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hasReferral}
                    onChange={(e) => setHasReferral(e.target.checked)}
                    className="checkbox"
                  />
                  <span>Yes, I have a referral</span>
                </label>

                {hasReferral && (
                  <input
                    type="text"
                    name={"referral"}
                    disabled={searchParams.get("ref") ? true : false}
                    placeholder={"username"}
                    className={"input input-secondary w-full mt-2"}
                    defaultValue={refUsername}
                    onChange={(e) => {
                      setRefUsername(e.target.value);
                    }}
                  />
                )}

                <button
                  disabled={isLoading()}
                  className={"btn btn-primary mt-3"}
                  onClick={async () => {
                    setWaitWeb3(true);
                    try {
                      if (
                        hasReferral &&
                        (
                          await getAutoReferral(refUsername.toLowerCase())
                        ).trim() === ""
                      ) {
                        throw new Error("Referral Is Not Valid");
                      } else setActiveStep(3);
                    } catch (err: any) {
                      toast.error(String(err.message));
                    }
                    setWaitWeb3(false);
                  }}
                >
                  {isLoading() ? (
                    <span className="loading loading-dots loading-md text-gray-500"></span>
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </div>
            </StepContent>
          </Step>

          <Step key={3}>
            <StepLabel>
              <span className={styles.label}>Register</span>
            </StepLabel>
            <StepContent>
              <Typography className={styles.description}>
                Enter your username
              </Typography>

              <form onSubmit={submitUser} className={styles.input}>
                <input
                  type="text"
                  name={"username"}
                  placeholder={"username"}
                  className={"input input-secondary w-full"}
                  defaultValue={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />

                <span className={"mb-2"}>Stage V1 Details</span>
                <div
                  className={
                    "w-full border-secondary border rounded-lg p-2 flex flex-row justify-evenly -mt-4"
                  }
                >
                  <div className={"text-center"}>
                    <span>Gold </span>
                    <br />
                    <span>11 </span>
                    <span className={"text-green-600"}>$</span>
                  </div>
                  <div className={"text-center"}>
                    <span>Diamond </span>
                    <br />
                    <span>33 </span>
                    <span className={"text-green-600"}>$</span>
                  </div>
                  <div className={"text-center"}>
                    <span>Platinum </span>
                    <br />
                    <span>66 </span>
                    <span className={"text-green-600"}>$</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading()}
                  className={"btn btn-primary mt-3"}
                >
                  {isLoading() ? (
                    <span className="loading loading-dots loading-md text-gray-500"></span>
                  ) : (
                    <span>Register</span>
                  )}
                </button>
              </form>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    </main>
  );
}

export default Register;
