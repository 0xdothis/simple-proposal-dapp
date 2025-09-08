import React from "react";
import { publicClient } from "@/config/clients";
import { parseAbiItem } from "viem";

export function useContractBalance() {
  const [newBalance, setNewBalance] = React.useState<bigint | undefined>(
    undefined,
  );
  publicClient.watchEvent({
    address: import.meta.env.VITE_QUADRATIC_GOVERNACE_VOTING_CONTRACT,
    event: parseAbiItem(
      "event ETHRecieved(uint indexed amount, address indexed sender, uint timestamp)",
    ),
    onLogs: (logs) => setNewBalance(logs[logs.length - 1].args.amount),
  });

  return [newBalance];
}
