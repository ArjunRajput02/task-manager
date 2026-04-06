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
          className={`text-xs ${statusFilter === status ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600" : "border-gray-300 text-gray-600 hover:bg-blue-50"}`}
        >
          {status === "InProgress" ? "In Progress" : status}
        </Button>
      ))}
    </div>
  );
}
