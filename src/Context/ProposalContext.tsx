import useProposalEvents from "@/hooks/useProposalEvents";
import { ProposalContext } from "./useProposal";

export default function ProposalProvider({ children }: ProposalProviderProps) {
  const [proposals] = useProposalEvents();
  
  const contextValue: ProposalContextType = {
    proposals,
  };
  
  return (
    <ProposalContext.Provider value={contextValue}>
      {children}
    </ProposalContext.Provider>
  );
}
