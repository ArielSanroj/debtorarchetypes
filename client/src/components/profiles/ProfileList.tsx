import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BorrowerProfile } from "@db/schema";

interface Borrower {
  id: number;
  name: string;
  email: string;
  phone?: string;
  profile: BorrowerProfile;
  riskScore: number;
  loanAmount: number;
  daysOverdue: number;
}

interface ProfileListProps {
  borrowers: Borrower[];
  onSelect?: (borrower: Borrower) => void;
}

export function ProfileList({ borrowers, onSelect }: ProfileListProps) {
  const [search, setSearch] = useState("");
  const [profileFilter, setProfileFilter] = useState<BorrowerProfile | "all">("all");

  const filteredBorrowers = borrowers.filter((borrower) => {
    const matchesSearch = 
      borrower.name.toLowerCase().includes(search.toLowerCase()) ||
      borrower.email.toLowerCase().includes(search.toLowerCase());
    const matchesProfile = profileFilter === "all" || borrower.profile === profileFilter;
    return matchesSearch && matchesProfile;
  });

  const getRiskBadge = (score: number) => {
    if (score >= 80) {
      return (
        <div className="flex items-center space-x-1">
          <Badge variant="destructive">High Risk</Badge>
          <TrendingUp className="h-4 w-4 text-destructive" />
        </div>
      );
    } else if (score >= 50) {
      return (
        <div className="flex items-center space-x-1">
          <Badge variant="secondary">Medium Risk</Badge>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-1">
          <Badge variant="default">Low Risk</Badge>
          <TrendingDown className="h-4 w-4 text-primary" />
        </div>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="Search borrowers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={profileFilter}
          onValueChange={(value) => setProfileFilter(value as BorrowerProfile | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by profile" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Profiles</SelectItem>
            <SelectItem value="autonomous">Autonomous</SelectItem>
            <SelectItem value="isolated">Isolated</SelectItem>
            <SelectItem value="avoidant">Avoidant</SelectItem>
            <SelectItem value="impulsive">Impulsive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Risk Assessment</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead>Days Overdue</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBorrowers.map((borrower) => (
              <TableRow
                key={borrower.id}
                onClick={() => onSelect?.(borrower)}
                className={cn("cursor-pointer", onSelect && "hover:bg-accent")}
              >
                <TableCell className="font-medium">{borrower.name}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant="secondary">{borrower.profile}</Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">
                          {borrower.profile === "autonomous" && "Self-directed, responds to data"}
                          {borrower.profile === "isolated" && "Limited engagement, needs outreach"}
                          {borrower.profile === "avoidant" && "Hesitant to engage, requires patience"}
                          {borrower.profile === "impulsive" && "Quick decisions, needs guidance"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>{getRiskBadge(borrower.riskScore)}</TableCell>
                <TableCell>${borrower.loanAmount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={borrower.daysOverdue > 90 ? "destructive" : "outline"}>
                    {borrower.daysOverdue} days
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>{borrower.email}</span>
                    {borrower.phone && (
                      <span className="text-muted-foreground">{borrower.phone}</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
