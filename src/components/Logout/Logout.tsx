import { BasicPage } from "../Layouts/BasePage";
import Link from "@mui/material/Link";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink } from "react-router-dom";

export const Logout = () => {
  return (
    <>
      <BasicPage title="You Have Been Logged Out" icon={<LogoutIcon />} />{" "}
      <RouterLink to="/">
        <Link href="#" variant="body2">
          {"Go To HomePage"}
        </Link>
      </RouterLink>
    </>
  );
};
