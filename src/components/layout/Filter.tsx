import { Button } from "../../components/ui/button";

type Status = string;

type StatusFilterProps = {
  statusFilter: Status;
  setStatusFilter: (status: Status) => void;
};

export default function Filter({
  statusFilter,
  setStatusFilter,
}: StatusFilterProps) {
  const statuses: Status[] = ["ALL", "TODO", "IN_PROGRESS", "DONE"];

  return (
    <div className="flex gap-2 flex-wrap">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={statusFilter === status ? "default" : "outline"}
          onClick={() => setStatusFilter(status)}
          className="text-xs"
        >
          {status === "IN_PROGRESS" ? "In Progress" : status}
        </Button>
      ))}
    </div>
  );
}
