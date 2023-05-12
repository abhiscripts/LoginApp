import { BasicPage } from "../Layouts/BasePage";
import Home from "@mui/icons-material/Home";
import R from "../../../public/R.png"

export const Homepage = () => {
  //return <BasicPage title="Home Page" icon={<Home />} />;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <img src={R} alt="DB dashboard" width="100%" height="100%"/>
    </div>
  );
};
