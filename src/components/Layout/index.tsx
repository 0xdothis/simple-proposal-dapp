import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CreateProposalModal } from "../CreateProposalModal";
import { formatEther, isAddressEqual } from "viem";
import { useAccount } from "wagmi";
import { Toaster } from "sonner";
import React from "react";
import { publicClient } from "@/config/clients";
import { Button } from "../ui/button";
import { useContractBalance } from "@/hooks/useContractBalance";

const AppLayout = ({ children, chairPersonAddress }: AppLayoutType) => {
  const { address } = useAccount();
  const [contractBalance, setContractBalance] = React.useState<
    string | undefined
  >();

  const [data] = useContractBalance();

  React.useEffect(() => {
    (async () => {
      const getContractBalance = await publicClient.getBalance({
        address: import.meta.env.VITE_QUADRATIC_GOVERNANCE_VOTING_CONTRACT,
      });

      setContractBalance(formatEther(BigInt(getContractBalance)));
    })();
  }, [contractBalance, data]);

  return (
    <div className="w-full h-full">
      <header className="h-20 bg-green-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-green-300 text-2xl font-bold font-mono">
            LOGO
          </span>
          <div className="flex gap-4 items-center">
            <Button className="font-bold text-md bg-green-700 text-green-300 hover:bg-green-600">
              Contract Balance: {contractBalance}{" "}
              {Number(contractBalance) > 1 ? "Ethers" : "Ether"}{" "}
            </Button>
            <ConnectButton />
            {address &&
              chairPersonAddress &&
              isAddressEqual(chairPersonAddress, address) && (
                <CreateProposalModal />
              )}
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-10rem)] w-full bg-green-50">
        <div className="container mx-auto">{children}</div>
      </main>
      <footer className="h-20 text-lg bg-green-800 p-4 text-green-300 flex flex-row items-center justify-center">
        <div>&copy; 0xdothis:Customized {new Date().getFullYear()}</div>
      </footer>
      <Toaster />
    </div>
  );
};

export default AppLayout;
