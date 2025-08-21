import type { ActionType } from "@/types";
import {
  Building2,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  FileEdit,
  FolderEdit,
  FolderPlus,
  LogIn,
  MessageSquare,
  Upload,
  UserMinus,
  UserPlus,
} from "lucide-react";

export const getActivityIcon = (action: ActionType) => {
  switch (action) {
    case "created_task":
      return (
        <div className="bg-green-600/10 p-2 rounded-md">
          <CheckSquare className="rounded-full w-5 h-5 text-green-600" />
        </div>
      );
    case "created_subtask":
      return (
        <div className="bg-emerald-600/10 p-2 rounded-md">
          <CheckSquare className="rounded-full w-5 h-5 text-emerald-600" />
        </div>
      );
    case "updated_task":
    case "updated_subtask":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <FileEdit className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    case "completed_task":
      return (
        <div className="bg-green-600/10 p-2 rounded-md">
          <CheckCircle className="rounded-full w-5 h-5 text-green-600" />
        </div>
      );
    case "created_project":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <FolderPlus className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    case "updated_project":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <FolderEdit className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    case "completed_project":
      return (
        <div className="bg-green-600/10 p-2 rounded-md">
          <CheckCircle2 className="rounded-full w-5 h-5 text-green-600" />
        </div>
      );
    case "created_workspace":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <Building2 className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    case "added_comment":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <MessageSquare className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    case "added_member":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <UserPlus className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    case "removed_member":
      return (
        <div className="bg-red-600/10 p-2 rounded-md">
          <UserMinus className="rounded-full w-5 h-5 text-red-600" />
        </div>
      );
    case "joined_workspace":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <LogIn className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    case "added_attachment":
      return (
        <div className="bg-blue-600/10 p-2 rounded-md">
          <Upload className="rounded-full w-5 h-5 text-blue-600" />
        </div>
      );
    default:
      return null;
  }
};
