import { CirclePlus, LayoutGrid } from "lucide-react";
import { Button } from "./ui/button";

interface NoDataFoundProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

export const NoDataFound = ({
  title,
  description,
  buttonText,
  buttonAction,
}: NoDataFoundProps) => {
  return (
    <div className="col-span-full bg-muted/40 py-12 2xl:py-24 rounded-lg text-center">
      <LayoutGrid className="mx-auto size-12 text-muted-foreground" />

      <h3 className="mt-4 font-semibold text-lg">{title}</h3>

      <p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm">
        {description}
      </p>

      <Button onClick={buttonAction} className="mt-4">
        <CirclePlus className="mr-2 size-4" />

        {buttonText}
      </Button>
    </div>
  );
};
