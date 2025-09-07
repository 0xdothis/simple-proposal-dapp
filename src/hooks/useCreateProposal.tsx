import React from "react";
import useChairPerson from "./useChairPerson";
import { toast } from "sonner";
import { isAddressEqual, parseEther } from "viem";
import {
  useAccount,
  usePublicClient,
  useWalletClient,
  useWriteContract,
} from "wagmi";
import { QUADRATIC_GOVERNANCE_VOTING_CONTRACT_ABI } from "../config/ABI";

const useCreateProposal = () => {
  const { address } = useAccount();
  const chairPerson = useChairPerson();
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const { writeContractAsync } = useWriteContract();

  return React.useCallback(
    async ({
      description,
      recipient,
      amountInwei,
      durationInSeconds,
    }: CreateProposalType) => {
      const treasuryBalance = await publicClient?.getBalance({
        address: import.meta.env.VITE_QUADRATIC_GOVERNANCE_VOTING_CONTRACT,
      });

      console.log(parseEther(treasuryBalance!.toString()) > amountInwei);
      console.log(amountInwei);

      if (!address || !walletClient) {
        toast.error("Not connected", {
          description: "Kindly connect your address",
        });
        return;
      }

      if (parseEther(treasuryBalance!.toString()) < amountInwei) {
        toast.error("Unauthorized", {
          description: "Treasury Balance is lower that amount",
        });
        return;
      }

      if (
        chairPerson &&
        !isAddressEqual(address, chairPerson as `0x${string}`)
      ) {
        toast.error("Unauthorized", {
          description: "This action is only available to the chairperson",
        });
        return;
      }

      const txHash = await writeContractAsync({
        address: import.meta.env.VITE_QUADRATIC_GOVERNANCE_VOTING_CONTRACT,
        abi: QUADRATIC_GOVERNANCE_VOTING_CONTRACT_ABI,
        functionName: "createProposal",
        args: [
          description,
          recipient,
          amountInwei,
          BigInt(durationInSeconds.getTime()),
        ],
      });

      console.log("txHash: ", txHash);

      const txReceipt = await publicClient!.waitForTransactionReceipt({
        hash: txHash,
      });

      if (txReceipt.status === "success") {
        toast.success("Create proposal succeussfully", {
          description: "You have successfully created a proposal",
        });
      }
    },
    [address, chairPerson, walletClient, publicClient, writeContractAsync],
  );
};

export default useCreateProposal;
