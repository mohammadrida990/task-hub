import type { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Watchers = ({ watchers }: { watchers: User[] }) => {
  return (
    <div className="bg-card shadow-sm mb-6 p-6 rounded-lg">
      <h3 className="mb-4 font-medium text-lg">Watchers</h3>

      <div className="space-y-2">
        {watchers && watchers.length > 0 ? (
          watchers.map((watcher) => (
            <div key={watcher._id} className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={watcher.profilePicture} />
                <AvatarFallback>{watcher.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <p className="text-muted-foreground text-sm">{watcher.name}</p>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-sm">No watchers</p>
        )}
      </div>
    </div>
  );
};
