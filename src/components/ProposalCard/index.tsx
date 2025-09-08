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
    <Card className="w-full mx-auto bg-green-50">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Proposal #{id}</span>
          <span>Vote Count: {voteCount}</span>
        </CardTitle>
        <CardDescription className="text-lg capitalize tracking-wider font-bold">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span className="font-bold mr-2">Recipient:</span>
          <span>{shortenAddress({ address: recipient, length: 4 })}</span>
        </div>
        <div>
          <span className="font-bold mr-2">Amount:</span>
          <span>{amount ? formatEther(BigInt(amount)) : "0"} Ether</span>
        </div>
        <div>
          <span className="font-bold mr-2">Deadline:</span>
          <span>
            {deadline ? new Date(deadline * 1000).toLocaleDateString() : "N/A"}
          </span>
        </div>
        <div>
          <span className="font-bold mr-2">Executed:</span>
          <span>{executed ? "Yes" : "No"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          onClick={handleVote}
          disabled={isVoted}
          type="submit"
          className="w-full bg-green-700 text-gray-100 hover:bg-green-800"
        >
          Vote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProposalCard;
