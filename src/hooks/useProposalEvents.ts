import React from "react";
import { publicClient } from "@/config/clients";
import { parseAbiItem } from "viem";

function useProposalEvents() {
  const [proposals, setProposals] = React.useState<
    CreateProposalType[] | undefined
  >(undefined);

  async function pastLogs() {
    const logs = await publicClient.getLogs({
      address: import.meta.env.VITE_QUADRATIC_GOVERNACE_VOTING_CONTRACT,
      event: parseAbiItem(
        "event ProposalCreated(uint indexed proposalId, string description, address recipient, uint amount, uint deadline)",
      ),
      fromBlock: 9149221n,
      toBlock: "latest",
    });

    const filteredData: CreateProposalType[] = logs.map((data) => ({
      proposalId: Number(data.args.proposalId),
      description: data.args.description as string,
      deadline: Number(data.args.deadline),
      amountInwei: data.args.amount as bigint,
      recipient: data.args.recipient,
      // Default values for UI properties (these would come from other contract calls)
      voteCount: 0,
      executed: false,
      isVoted: false,
    }));

    setProposals(filteredData);
  }

  React.useEffect(function () {
    //Fetch past logs
    pastLogs();

    const unwatch = publicClient.watchEvent({
      address: import.meta.env.VITE_QUADRATIC_GOVERNACE_VOTING_CONTRACT,
      event: parseAbiItem(
        "event ProposalCreated(uint indexed proposalId, string description, address recipient, uint amount, uint deadline)",
      ),
      onLogs: () => {
        pastLogs();
      },
    });

    return () => unwatch();
  }, []);

  return [proposals];
}

export default useProposalEvents;
