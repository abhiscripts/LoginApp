import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
} from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Homepage } from "./components/Homepage/Homepage";
import { Register } from "./components/Register/Register";
import { ProfilePage } from "./components/ProfilePage/ProfilePage";
import { SettingsPage } from "./components/Settings/SettingsPage";
import { ProtectedLayout } from "./components/Layouts/ProtectedLayout";
import { AuthLayout } from "./components/Layouts/AuthLayout";
import { HomeLayout } from "./components/Layouts/HomeLayout";
import { Logout } from "./components/Logout/Logout";
import "./index.css";

// ideally this would be an API call to server to get logged in user data

const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 3000)
  );

// for error
// const getUserData = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       reject("Error");
//     }, 3000)
//   );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Route>
  )
);
