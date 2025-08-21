import { fetchData } from "@/lib/fetch-util";
import { useQuery } from "@tanstack/react-query";
import type { ActivityLog } from "@/types";
import { Loader } from "../Loader";
import { getActivityIcon } from "./task-icon";

export const TaskActivity = ({ resourceId }: { resourceId: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["task-activity", resourceId],
    queryFn: () => fetchData(`/tasks/${resourceId}/activity`),
  }) as {
    data: ActivityLog[];
    isPending: boolean;
  };

  if (isPending) return <Loader />;

  return (
    <div className="bg-card shadow-sm p-6 rounded-lg">
      <h3 className="mb-4 text-muted-foreground text-lg">Activity</h3>

      <div className="space-y-4">
        {data?.map((activity) => (
          <div key={activity._id} className="flex gap-2">
            <div className="flex justify-center items-center bg-primary/10 rounded-full size-8 text-primary">
              {getActivityIcon(activity.action)}
            </div>

            <div>
              <p className="text-sm">
                <span className="font-medium">{activity.user.name}</span>{" "}
                {activity.details?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
