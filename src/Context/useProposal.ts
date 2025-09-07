import React from "react";

export const ProposalContext = React.createContext<
  ProposalContextType | undefined
>(undefined);

export function useProposal() {
  const context = React.useContext(ProposalContext);

  if (context === undefined) {
    throw new Error(
      "useProposal must be used within a ProposalContextProvider",
    );
  }

  return context;
}
