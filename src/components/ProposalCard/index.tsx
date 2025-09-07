import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { shortenAddress } from "../../lib/utils";
import { formatEther } from "viem";

const ProposalCard = ({
  id,
  description,
  recipient,
  amount,
  voteCount,
  deadline,
  executed,
  isVoted,
  handleVote,
}: ProposalCardDataType) => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Proposal #{id}</span>
          <span>Vote Count: {voteCount}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span>Recipient</span>
          <span>{shortenAddress({ address: recipient, length: 4 })}</span>
        </div>
        <div>
          <span>Amount: </span>
          <span>{amount ? formatEther(BigInt(amount)) : '0'} Ether</span>
        </div>
        <div>
          <span>Deadline: </span>
          <span>{deadline ? new Date(deadline * 1000).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div>
          <span>Executed: </span>
          <span>{executed ? 'Yes' : 'No'}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={handleVote}
          disabled={isVoted}
          type="submit"
          className="w-full"
        >
          Vote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProposalCard;
