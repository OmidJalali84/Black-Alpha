import { keccak256, encodePacked } from "viem";
import { BigNumber } from "ethers";

export function hashAddr(addr) {
  // @ts-ignore
  const hash = keccak256(
    encodePacked(["address", "string"], [addr, "hashMakerNonce"])
  );
  console.log(BigNumber.from(hash).toBigInt());
  return BigNumber.from(hash).toBigInt(); // Converts hexadecimal to BigInt.
}

hashAddr("0x0000000000000000000000000000000000000000");
