import { Button } from "@/components/ui/button";
import type { Route } from "../../+types/root";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub" },
    { name: "description", content: "Welcome to TaskHub" },
  ];
}

const Homepage = () => {
  return (
    <div className="flex justify-center items-center gap-4 w-full h-screen">
      <Link to="/signin">
        <Button className="bg-blue-500 text-white">Login</Button>
      </Link>

      <Link to="/signup">
        <Button variant="outline" className="bg-blue-500 text-white">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default Homepage;
