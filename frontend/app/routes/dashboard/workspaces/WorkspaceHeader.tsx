import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { WorkspaceAvatar } from "@/components/workspace/WorkspaceAvatar";
import type { User, Workspace } from "@/types";
import { Plus, UserPlus } from "lucide-react";

interface WorkspaceHeaderProps {
  workspace: Workspace;
  members: {
    _id: string;
    user: User;
    role: "admin" | "member" | "owner" | "viewer";
    joinedAt: Date;
  }[];
  onCreateProject: () => void;
  onInviteMember: () => void;
}

export const WorkspaceHeader = ({
  workspace,
  members,
  onCreateProject,
  onInviteMember,
}: WorkspaceHeaderProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="flex md:flex-row flex-col-reverse md:justify-between md:items-center gap-3">
          <div className="flex md:items-center gap-3">
            {workspace.color && (
              <WorkspaceAvatar color={workspace.color} name={workspace.name} />
            )}

            <h2 className="font-semibold text-xl md:text-2xl">
              {workspace.name}
            </h2>
          </div>

          <div className="flex justify-between md:justify-start items-center gap-3 mb-4 md:mb-0">
            <Button variant="outline" onClick={onInviteMember}>
              <UserPlus className="mr-2 size-4" />
              Invite
            </Button>

            <Button onClick={onCreateProject}>
              <Plus className="mr-2 size-4" />
              Create Project
            </Button>
          </div>
        </div>

        {workspace.description && (
          <p className="text-muted-foreground text-sm md:text-base">
            {workspace.description}
          </p>
        )}
      </div>

      {members.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Members</span>

          <div className="flex space-x-2">
            {members.map((member) => (
              <Avatar
                key={member._id}
                className="relative border-2 border-background rounded-full w-8 h-8 overflow-hidden"
                title={member.user.name}
              >
                <AvatarImage
                  src={member.user.profilePicture}
                  alt={member.user.name}
                />

                <AvatarFallback>{member.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
