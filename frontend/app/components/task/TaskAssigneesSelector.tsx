import type { ProjectMemberRole, Task, User } from "@/types";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useUpdateTaskAssigneesMutation } from "@/hooks/use-task";
import { toast } from "sonner";

export const TaskAssigneesSelector = ({
  task,
  assignees,
  projectMembers,
}: {
  task: Task;
  assignees: User[];
  projectMembers: { user: User; role: ProjectMemberRole }[];
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    assignees.map((assignee) => assignee._id)
  );
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const { mutate, isPending } = useUpdateTaskAssigneesMutation();

  const handleSelectAll = () => {
    const allIds = projectMembers.map((m) => m.user._id);

    setSelectedIds(allIds);
  };

  const handleUnSelectAll = () => {
    setSelectedIds([]);
  };

  const handleSelect = (id: string) => {
    let newSelected: string[] = [];

    if (selectedIds.includes(id)) {
      newSelected = selectedIds.filter((sid) => sid !== id);
    } else {
      newSelected = [...selectedIds, id];
    }

    setSelectedIds(newSelected);
  };

  const handleSave = () => {
    mutate(
      {
        taskId: task._id,
        assignees: selectedIds,
      },
      {
        onSuccess: () => {
          setDropDownOpen(false);
          toast.success("Assignees updated successfully");
        },
        onError: (error: any) => {
          const errMessage =
            error.response?.data?.message || "Failed to update assignees";
          toast.error(errMessage);
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="mb-6">
      <h3 className="mb-2 font-medium text-muted-foreground text-sm">
        Assignees
      </h3>

      <div className="flex flex-wrap gap-2 mb-2">
        {selectedIds.length === 0 ? (
          <span className="text-muted-foreground text-xs">Unassigned</span>
        ) : (
          projectMembers
            .filter((member) => selectedIds.includes(member.user._id))
            .map((m) => (
              <div
                key={m.user._id}
                className="flex items-center bg-gray-100 px-2 py-1 rounded"
              >
                <Avatar className="mr-1 size-6">
                  <AvatarImage src={m.user.profilePicture} />
                  <AvatarFallback>{m.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <span className="text-muted-foreground text-xs">
                  {m.user.name}
                </span>
              </div>
            ))
        )}
      </div>

      {/* dropdown */}
      <div className="relative">
        <button
          className="bg-white px-3 py-2 border rounded w-full text-muted-foreground text-sm text-left"
          onClick={() => setDropDownOpen(!dropDownOpen)}
        >
          {selectedIds.length === 0
            ? "Select assignees"
            : `${selectedIds.length} selected`}
        </button>

        {dropDownOpen && (
          <div className="z-10 absolute bg-white shadow-lg mt-1 border rounded w-full max-h-60 overflow-y-auto">
            <div className="flex justify-between px-2 py-1 border-b">
              <button
                className="text-blue-600 text-xs"
                onClick={handleSelectAll}
              >
                Select all
              </button>

              <button
                className="text-red-600 text-xs"
                onClick={handleUnSelectAll}
              >
                Unselect all
              </button>
            </div>

            {projectMembers.map((m) => (
              <label
                className="flex items-center hover:bg-gray-50 px-3 py-2 cursor-pointer"
                key={m.user._id}
              >
                <Checkbox
                  checked={selectedIds.includes(m.user._id)}
                  onCheckedChange={() => handleSelect(m.user._id)}
                  className="mr-2"
                />

                <Avatar className="mr-2 size-6">
                  <AvatarImage src={m.user.profilePicture} />
                  <AvatarFallback>{m.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <span>{m.user.name}</span>
              </label>
            ))}

            <div className="flex justify-between px-2 py-1">
              <Button
                variant="outline"
                size="sm"
                className="font-light"
                onClickCapture={() => setDropDownOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button
                size="sm"
                className="font-light"
                disabled={isPending}
                onClickCapture={() => handleSave()}
              >
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
