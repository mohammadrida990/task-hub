import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateWorkspace } from "@/components/workspace/CreateWorkspace";
import { WorkspaceAvatar } from "@/components/workspace/WorkspaceAvatar";

import { useGetWorkspacesQuery } from "@/hooks/use-workspace";
import type { Workspace } from "@/types";
import { PlusCircle, Users } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router";
import { NoDataFound } from "@/components/NoDataFound";

const Workspaces = () => {
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const { data: workspaces, isLoading } = useGetWorkspacesQuery() as {
    data: Workspace[];
    isLoading: boolean;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl md:text-3xl">Workspaces</h2>

          <Button onClick={() => setIsCreatingWorkspace(true)}>
            <PlusCircle className="mr-2 size-4" />
            New Workspace
          </Button>
        </div>

        <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
          {workspaces.map((ws) => (
            <WorkspaceCard key={ws._id} workspace={ws} />
          ))}

          {workspaces.length === 0 && (
            <NoDataFound
              title="No workspaces found"
              description="Create a new workspace to get started"
              buttonText="Create Workspace"
              buttonAction={() => setIsCreatingWorkspace(true)}
            />
          )}
        </div>
      </div>

      <CreateWorkspace
        isCreatingWorkspace={isCreatingWorkspace}
        setIsCreatingWorkspace={setIsCreatingWorkspace}
      />
    </>
  );
};

const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {
  return (
    <Link to={`/workspaces/${workspace._id}`}>
      <Card className="hover:shadow-md transition-all hover:-translate-y-1">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <WorkspaceAvatar name={workspace.name} color={workspace.color} />

              <div>
                <CardTitle>{workspace.name}</CardTitle>

                <span className="text-muted-foreground text-xs">
                  Created at {format(workspace.createdAt, "MMM d, yyyy h:mm a")}
                </span>
              </div>
            </div>

            <div className="flex items-center text-muted-foreground">
              <Users className="mr-1 size-4" />

              <span className="text-xs">{workspace.members.length}</span>
            </div>
          </div>

          <CardDescription>
            {workspace.description || "No description"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="text-muted-foreground text-sm">
            View workspace details and projects
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Workspaces;
