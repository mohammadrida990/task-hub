import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => navigate(-1)}
      className="mr-4 p-4"
    >
      ← Back
    </Button>
  );
};
