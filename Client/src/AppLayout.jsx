import { Outlet } from "react-router";
import NavBar from "./components/NavBar";

function AppLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
