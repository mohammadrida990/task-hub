import type { StatsCardProps } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const StatsCard = ({ data }: { data: StatsCardProps }) => {
  return (
    <div className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="font-medium text-sm">Total Projects</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="font-bold text-2xl">{data.totalProjects}</div>

          <p className="text-muted-foreground text-xs">
            {data.totalProjectInProgress} in progress
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="font-medium text-sm">Total Tasks</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="font-bold text-2xl">{data.totalTasks}</div>

          <p className="text-muted-foreground text-xs">
            {data.totalTaskCompleted} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="font-medium text-sm">To Do</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="font-bold text-2xl">{data.totalTaskToDo}</div>

          <p className="text-muted-foreground text-xs">
            Tasks waiting to be done
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2">
          <CardTitle className="font-medium text-sm">In Progress</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="font-bold text-2xl">{data.totalTaskInProgress}</div>

          <p className="text-muted-foreground text-xs">
            Tasks currently in progress
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
