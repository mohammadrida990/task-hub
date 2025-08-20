import { NoDataFound } from "@/components/NoDataFound";
import { ProjectCard } from "@/components/project/ProjectCard";
import type { Project } from "@/types";

interface ProjectListProps {
  workspaceId: string;
  projects: Project[];
  onCreateProject: () => void;
}

export const ProjectList = ({
  workspaceId,
  projects,
  onCreateProject,
}: ProjectListProps) => {
  return (
    <div>
      <h3 className="mb-4 font-medium text-xl">Projects</h3>

      <div className="gap-6 grid sm:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <NoDataFound
            title="No projects found"
            description="Create a project to get started"
            buttonText="Create Project"
            buttonAction={onCreateProject}
          />
        ) : (
          projects.map((project) => {
            const projectProgress = 0;

            return (
              <ProjectCard
                key={project._id}
                project={project}
                progress={projectProgress}
                workspaceId={workspaceId}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
