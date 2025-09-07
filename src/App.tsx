import AppLayout from "./components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProposalCard from "./components/ProposalCard";
import useChairPerson from "./hooks/useChairPerson";
import { useProposal } from "./Context/useProposal";

// Helper function to map CreateProposalType to ProposalCardDataType
function mapProposalForCard(
  proposal: CreateProposalType,
): ProposalCardDataType {
  return {
    id: proposal.proposalId,
    description: proposal.description,
    recipient: proposal.recipient,
    amount: proposal.amountInwei.toString(), // Convert bigint to string
    voteCount: proposal.voteCount || 0,
    deadline: proposal.deadline,
    executed: proposal.executed || false,
    isVoted: proposal.isVoted || false,
    handleVote: () => {}, // This will be passed from the component
  };
}

function App() {
  const chairPerson = useChairPerson();

  const { proposals } = useProposal();

  // Handle loading state
  if (!proposals) {
    return (
      <AppLayout chairPersonAddress={chairPerson}>
        <div className="flex w-full justify-center items-center h-64">
          <span>Loading proposals...</span>
        </div>
      </AppLayout>
    );
  }

  // Map proposals to the format expected by ProposalCard
  const mappedProposals = proposals.map(mapProposalForCard);

  const activeProposals = mappedProposals.filter(
    (proposal) =>
      !proposal.executed &&
      proposal.deadline &&
      proposal.deadline * 1000 > Date.now(),
  );
  const inActiveProposals = mappedProposals.filter(
    (proposal) =>
      proposal.executed ||
      (proposal.deadline && proposal.deadline * 1000 <= Date.now()),
  );

  /** const activePropsals = proposals.filter(
    (proposal) =>
      !proposal.executed ||
      (proposal.deadline && proposal.deadline * 1000 > Date.now()),
  );
  const inActiveProposals = proposals.filter(
    (proposal) =>
      proposal.executed ||
      (proposal.deadline && proposal.deadline * 1000 < Date.now()),
  );*/
  return (
    <AppLayout chairPersonAddress={chairPerson}>
      <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="active" className="mt-4">
          <TabsList>
            <TabsTrigger value="active" className="cursor-pointer">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" className="cursor-pointer">
              InActive
            </TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {activeProposals.length === 0 ? (
              <span>No active proposals</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
                {activeProposals.map((p) => (
                  <ProposalCard
                    key={crypto.randomUUID()}
                    {...p}
                    handleVote={() => console.log(`Voting on proposal ${p.id}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="inactive">
            {inActiveProposals.length === 0 ? (
              <span>No inactive proposals</span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mx-auto">
                {inActiveProposals.map((p) => (
                  <ProposalCard
                    key={crypto.randomUUID()}
                    {...p}
                    handleVote={() => console.log(`Voting on proposal ${p.id}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

export default App;
