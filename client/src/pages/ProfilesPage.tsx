import { useBorrowers } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ProfilesPage() {
  const { data: borrowers, isLoading } = useBorrowers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!borrowers) {
    return <div>Error loading borrowers</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Borrower Profiles</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Profile</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Loan Amount</TableHead>
              <TableHead>Days Overdue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowers.map((borrower) => (
              <TableRow key={borrower.id}>
                <TableCell>{borrower.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{borrower.profile}</Badge>
                </TableCell>
                <TableCell>{borrower.riskScore}</TableCell>
                <TableCell>${borrower.loanAmount.toLocaleString()}</TableCell>
                <TableCell>{borrower.daysOverdue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
