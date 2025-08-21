import type { Comment, User } from "@/types";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  useAddCommentMutation,
  useGetCommentsByTaskIdQuery,
} from "@/hooks/use-task";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "../Loader";
import { Separator } from "../ui/separator";

export const CommentSection = ({
  taskId,
  members,
}: {
  taskId: string;
  members: User[];
}) => {
  const [newComment, setNewComment] = useState("");

  const { mutate: addComment, isPending } = useAddCommentMutation();
  const { data: comments, isLoading } = useGetCommentsByTaskIdQuery(taskId) as {
    data: Comment[];
    isLoading: boolean;
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    addComment(
      { taskId, text: newComment },
      {
        onSuccess: () => {
          setNewComment("");
          toast.success("Comment added successfully");
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
          console.log(error);
        },
      }
    );
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="bg-card shadow-sm p-6 rounded-lg">
      <h3 className="mb-4 font-medium text-lg">Comments</h3>

      <ScrollArea className="mb-4 h-[300px]">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex gap-4 py-2">
              <Avatar className="size-8">
                <AvatarImage src={comment.author.profilePicture} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">
                    {comment.author.name}
                  </span>

                  <span className="text-muted-foreground text-xs">
                    {formatDistanceToNow(comment.createdAt, {
                      addSuffix: true,
                    })}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center py-8">
            <p className="text-muted-foreground text-sm">No comment yet</p>
          </div>
        )}
      </ScrollArea>

      <Separator className="my-4" />

      <div className="mt-4">
        <Textarea
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <div className="flex justify-end mt-4">
          <Button
            disabled={!newComment.trim() || isPending}
            onClick={handleAddComment}
          >
            Post Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
