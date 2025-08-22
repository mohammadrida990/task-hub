import { Loader } from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMyTasksQuery } from "@/hooks/use-task";
import type { Task } from "@/types";
import { format } from "date-fns";
import { ArrowUpRight, CheckCircle, Clock, FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const MyTasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialFilter = searchParams.get("filter") || "all";
  const initialSort = searchParams.get("sort") || "desc";
  const initialSearch = searchParams.get("search") || "";

  const [filter, setFilter] = useState<string>(initialFilter);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSort === "asc" ? "asc" : "desc"
  );
  const [search, setSearch] = useState<string>(initialSearch);

  useEffect(() => {
    const params: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    params.filter = filter;
    params.sort = sortDirection;
    params.search = search;

    setSearchParams(params, { replace: true });
  }, [filter, sortDirection, search]);

  useEffect(() => {
    const urlFilter = searchParams.get("filter") || "all";
    const urlSort = searchParams.get("sort") || "desc";
    const urlSearch = searchParams.get("search") || "";

    if (urlFilter !== filter) setFilter(urlFilter);
    if (urlSort !== sortDirection)
      setSortDirection(urlSort === "asc" ? "asc" : "desc");
    if (urlSearch !== search) setSearch(urlSearch);
  }, [searchParams]);

  const { data: myTasks, isLoading } = useGetMyTasksQuery() as {
    data: Task[];
    isLoading: boolean;
  };

  const filteredTasks =
    myTasks?.length > 0
      ? myTasks
          .filter((task) => {
            if (filter === "all") return true;
            if (filter === "todo") return task.status === "To Do";
            if (filter === "inprogress") return task.status === "In Progress";
            if (filter === "done") return task.status === "Done";
            if (filter === "achieved") return task.isArchived === true;
            if (filter === "high") return task.priority === "High";

            return true;
          })
          .filter(
            (task) =>
              task.title.toLowerCase().includes(search.toLowerCase()) ||
              task.description?.toLowerCase().includes(search.toLowerCase())
          )
      : [];

  //   sort task
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.dueDate && b.dueDate) {
      return sortDirection === "asc"
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    }
    return 0;
  });

  const todoTasks = sortedTasks.filter((task) => task.status === "To Do");
  const inProgressTasks = sortedTasks.filter(
    (task) => task.status === "In Progress"
  );
  const doneTasks = sortedTasks.filter((task) => task.status === "Done");

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start md:items-center">
        <h1 className="font-bold text-2xl">My Tasks</h1>

        <div
          className="flex md:flex-row flex-col items-start md"
          itemScope
          gap-2
        >
          <Button
            variant={"outline"}
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
          >
            {sortDirection === "asc" ? "Oldest First" : "Newest First"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <FilterIcon className="w-4 h-4" /> Filter
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Tasks
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setFilter("todo")}>
                To Do
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setFilter("inprogress")}>
                In Progress
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setFilter("done")}>
                Done
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setFilter("achieved")}>
                Achieved
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setFilter("high")}>
                High
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Input
        placeholder="Search tasks ...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>

          <TabsTrigger value="board">Board View</TabsTrigger>
        </TabsList>

        {/* LIST VIEW */}
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>My Tasks</CardTitle>

              <CardDescription>
                {sortedTasks?.length} tasks assigned to you
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="divide-y">
                {sortedTasks?.map((task) => (
                  <div key={task._id} className="hover:bg-muted/50 p-4">
                    <div className="flex md:flex-row flex-col justify-between md:items-center gap-3 mb-2">
                      <div className="flex">
                        <div className="flex gap-2 mr-2">
                          {task.status === "Done" ? (
                            <CheckCircle className="size-4 text-green-500" />
                          ) : (
                            <Clock className="size-4 text-yellow-500" />
                          )}
                        </div>

                        <div>
                          <Link
                            to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                            className="flex items-center font-medium hover:text-primary hover:underline transition-colors"
                          >
                            {task.title}

                            <ArrowUpRight className="ml-1 size-4" />
                          </Link>

                          <div className="flex items-center space-x-2 mt-1">
                            <Badge
                              variant={
                                task.status === "Done" ? "default" : "outline"
                              }
                            >
                              {task.status}
                            </Badge>

                            {task.priority && (
                              <Badge
                                variant={
                                  task.priority === "High"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {task.priority}
                              </Badge>
                            )}

                            {task.isArchived && (
                              <Badge variant="outline">Archived</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 text-muted-foreground text-sm">
                        {task.dueDate && (
                          <div>Due: {format(task.dueDate, "PPPP")}</div>
                        )}

                        <div>
                          Project:{" "}
                          <span className="font-medium">
                            {task.project.title}
                          </span>
                        </div>

                        <div>Modified on: {format(task.updatedAt, "PPPP")}</div>
                      </div>
                    </div>
                  </div>
                ))}

                {sortedTasks?.length === 0 && (
                  <div className="p-4 text-muted-foreground text-sm text-center">
                    No tasks found
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BOARD VIEW */}
        <TabsContent value="board">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  To Do
                  <Badge variant="outline">{todoTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 p-3 max-h-[600px] overflow-y-auto">
                {todoTasks?.map((task) => (
                  <Card
                    key={task._id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                      className="block"
                    >
                      <h3 className="font-medium">{task.title}</h3>

                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {task.description || "No description "}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>

                        {task.dueDate && (
                          <span className="text-muted-foreground text-sm">
                            {format(task.dueDate, "PPPP")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}

                {todoTasks?.length === 0 && (
                  <div className="p-4 text-muted-foreground text-sm text-center">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  In Progress
                  <Badge variant={"outline"}>{inProgressTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 p-3 max-h-[600px] overflow-y-auto">
                {inProgressTasks?.map((task) => (
                  <Card
                    key={task._id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                      className="block"
                    >
                      <h3 className="font-medium">{task.title}</h3>

                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {task.description || "No description "}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>

                        {task.dueDate && (
                          <span className="text-muted-foreground text-sm">
                            {format(task.dueDate, "PPPP")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}

                {inProgressTasks?.length === 0 && (
                  <div className="p-4 text-muted-foreground text-sm text-center">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Done
                  <Badge variant={"outline"}>{doneTasks?.length}</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 p-3 max-h-[600px] overflow-y-auto">
                {doneTasks?.map((task) => (
                  <Card
                    key={task._id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <Link
                      to={`/workspaces/${task.project.workspace}/projects/${task.project._id}/tasks/${task._id}`}
                      className="block"
                    >
                      <h3 className="font-medium">{task.title}</h3>

                      <p className="text-muted-foreground text-sm line-clamp-3">
                        {task.description || "No description "}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>

                        {task.dueDate && (
                          <span className="text-muted-foreground text-sm">
                            {format(task.dueDate, "PPPP")}
                          </span>
                        )}
                      </div>
                    </Link>
                  </Card>
                ))}

                {doneTasks?.length === 0 && (
                  <div className="p-4 text-muted-foreground text-sm text-center">
                    No tasks found
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTasks;
