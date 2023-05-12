import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../customHooks/useAuth";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (user) {
    return <Navigate to="/dashboard/profile" replace />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" },
          { label: "Admin Login", path: "/register" }
        ]}
      />
      {outlet}
    </div>
  );
};
