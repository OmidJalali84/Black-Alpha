import { formatEther, parseEther, encodePacked, keccak256 } from "viem";
import { abiMain, abiUsd } from "./abi";
import { config, contractMainAddr, contractUsdAddr } from "./config";
import { useReadContract } from "wagmi";
import { readContract, writeContract } from "wagmi/actions";
import { BigNumber } from "ethers";

export const zeroAddr = "0x0000000000000000000000000000000000000000";

export function fmtEther(number: bigint) {
  return parseInt(formatEther(number));
}

export function hashAddr(addr: any) {
  // @ts-ignore
  const hash = keccak256(
    encodePacked(["address", "string"], [addr, "hashMakerNonce"])
  );
  return BigNumber.from(hash).toBigInt(); // Converts hexadecimal to BigInt
}

export function getAllowanceValue(address: any) {
  return useReadContract({
    abi: abiUsd,
    address: contractUsdAddr,
    functionName: "allowance",
    args: [address, contractMainAddr],
  });
}

export function getContractInfo() {
  return useReadContract({
    abi: abiMain,
    address: contractMainAddr,
    functionName: "contractInfo",
  });
}

export function getUserInfo(username: string = "", address: any = zeroAddr) {
  return useReadContract({
    abi: abiMain,
    address: contractMainAddr,
    functionName: "userInfo",
    args: [username, hashAddr(address)],
    query: {
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchInterval: 10000,
    },
  });
}

export function getUserStageData(
  username: string = "",
  address: any = zeroAddr,
  stageIndex: number
) {
  return useReadContract({
    abi: abiMain,
    address: contractMainAddr,
    functionName: "userStageData",
    args: [username, hashAddr(address), BigInt(stageIndex)],
  });
}

export function approveUser(amount: string = "33") {
  return writeContract(config, {
    address: contractUsdAddr,
    abi: abiUsd,
    functionName: "approve",
    args: [contractMainAddr, parseEther(amount)],
  });
}

export function registerUser(username: string, referral: string) {
  return writeContract(config, {
    address: contractMainAddr,
    abi: abiMain,
    functionName: "register",
    args: [username, referral],
    value: parseEther("0"),
  });
}

export function withdraw(
  amount: string,
  recepient: `0x{string}`,
  isDai = true
) {
  return writeContract(config, {
    address: contractMainAddr,
    abi: abiMain,
    functionName: "withdraw",
    args: [parseEther(amount), recepient, isDai],
  });
}

export function getAutoReferral(username: string = "") {
  return readContract(config, {
    abi: abiMain,
    address: contractMainAddr,
    functionName: "autoReferral",
    args: [username],
  });
}

export function upgradeUser(amount: string = "0") {
  return writeContract(config, {
    address: contractMainAddr,
    abi: abiMain,
    functionName: "upgrade",
    value: parseEther(amount),
  });
}

export function userTree(username: string = "", level: number = 0) {
  return readContract(config, {
    address: contractMainAddr,
    abi: abiMain,
    functionName: "userTree",
    args: [username, BigInt(level)],
  });
}

export const getContractDetails = () => {
  return useReadContract({
    abi: abiMain,
    address: contractMainAddr,
    functionName: "contractInfo",
  });
};
