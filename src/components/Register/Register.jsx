import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BASE_AUTH_URL } from "../../customHooks/useAuth";
import { DataGrid } from "@mui/x-data-grid";
//import { Link as RouterLink } from "react-router-dom";

export const Register = () => {
  //const navigate = useNavigate();
  const [adminValidated, validateAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [empData, setEmpData] = useState([]);
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    axios
      .get(BASE_AUTH_URL)
      //.then((results) => results.json())
      .then((res) => {
        console.log("EMP: ", res);
        setEmpData(res.data);
      })
      .catch((err) => {
        alert(`Some Error Occured, ${err}`);
      });
  }, [flag]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("eemail");
    const organization = data.get("org");
    const orgunit = data.get("orgunit");
    const password = data.get("crpassword");
    const reqBody = {
      name,
      email,
      password,
      organization,
      orgunit,
    };
    // const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Headers": "*",
    //       "Access-Control-Allow-Methods": "*"
    //       }
    //     }
    axios
      .put(BASE_AUTH_URL, reqBody)
      .then((res) => {
        alert(`USER Added Successfully, ${res.data}`);
        setFlag(!flag);
      })
      .catch((err) => {
        alert(`Some Error Occured, ${err}`);
      });
    console.log("reqBody ", reqBody, event);
  };
  const handleAdminSubmit = () => {
    adminEmail === "admin" && adminPass === "admin"
      ? validateAdmin(true)
      : alert("Wrong Admin Credentials");
  };
  return (
    <Container component="main" maxWidth="s">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <HowToRegIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {!adminValidated ? "Admin Login" : " Register new Data Officer/ Data User "}
        </Typography>
        <Container maxWidth="xs">
          {!adminValidated ? (
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Aemail"
                label="Admin Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setAdminEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Admin Password"
                type="password"
                id="Apassword"
                autoComplete="current-password"
                onChange={(e) => setAdminPass(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAdminSubmit}
              >
                Admin Login
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Employee name"
                name="name"
                id="name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Employee Email"
                name="eemail"
                id="eemail"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Employee Domain"
                name="org"
                id="org"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Employee Role"
                name="orgunit"
                id="orgunit"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Create Employee Password"
                name="crpassword"
                id="crpassword"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Confirm Employee Password"
                name="Confirm Employee Password"
                type="password"
                id="conpassword"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create ORG User
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      {empData.length && adminValidated && renderUserTable(empData)}
    </Container>
  );
};

const renderUserTable = (data) => {
  const rows = data.map((item, id) => {
    item["id"] = id;
    return item;
  });
  const columns = [
    { field: "id", headerName: "Id" },
    { field: "email", headerName: "email", width: 390 },
    { field: "name", headerName: "name" , width: 290},
    { field: "organization", headerName: "domain", width: 290 },
    { field: "orgunit", headerName: "role", width: 290 },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Typography component="h1" variant="h5">
        Registered Data Officer/ Data User
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
