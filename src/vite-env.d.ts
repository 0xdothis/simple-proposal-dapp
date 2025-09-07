/// <reference types="vite/client" />

//ProposalCardData
type ProposalCardDataType = {
  id?: number;
  description: string;
  recipient: string;
  amount?: string;
  voteCount?: number;
  deadline?: number;
  executed?: boolean;
  isVoted?: boolean;
  handleVote?: () => void;
};

// shortenAddressType
type ShortenAddressType = {
  length: number;
  address: string;
};

// APP LAYOUT
type AppLayoutType = {
  children: React.ReactNode;
  chairPersonAddress: address;
};

// CreateProposalType - Extended to include UI properties
type CreateProposalType = {
  proposalId?: number;
  description: string;
  recipient: address;
  amountInwei: bigint;
  deadline?: number;
  voteCount?: number;
  executed?: boolean;
  isVoted?: boolean;
};

//DatePickerType
type DatePickerType = {
  date: Date;
  setDate: (date: Date) => void;
};

//ProposalContext
type ProposalContextType = {
  proposals: CreateProposalType[] | undefined;
};

// ProposalProvider Props
type ProposalProviderProps = {
  children: React.ReactNode;
};
