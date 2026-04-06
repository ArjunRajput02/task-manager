import { Button } from "../../components/ui/button";
import type { StatusFilterProps, Status } from "../../utils/types";

export default function Filter({
  statusFilter,
  setStatusFilter,
}: StatusFilterProps) {
  const statuses: Status[] = ["ALL", "Todo", "InProgress", "Done"];

  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={statusFilter === status ? "default" : "outline"}
          onClick={() => setStatusFilter(status)}
          className="text-xs"
        >
          {status === "InProgress" ? "In Progress" : status}
        </Button>
      ))}
    </div>
  );
}
