import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const WorkspaceAvatar = ({
  color,
  name,
}: {
  color: string;
  name: string;
}) => {
  return (
    <div
      className="flex justify-center items-center rounded w-6 h-6"
      style={{
        backgroundColor: color,
      }}
    >
      <span className="font-medium text-white text-xs">
        {name.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
