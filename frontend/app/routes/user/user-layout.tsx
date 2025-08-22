import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <div className="mx-auto py-8 md:py-16 max-w-3xl container">
      <Outlet />
    </div>
  );
};

export default UserLayout;
