import { useState } from "react";
import ReactFileReader from "react-file-reader";
import {
  Button,
  Select,
  MenuItem,
  Container,
  Typography,
  Avatar,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import PersonIcon from "@mui/icons-material/Person";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CsvToHtmlTable } from "react-csv-to-table";
import AWS from "aws-sdk";
// import ActionProvider from "./ActionProvider";
// import MessageParser from "./MessageParser";
// import config from "./config";

AWS.config.update({
  accessKeyId: "AKIA6O47ZWKNDNEOAR4M",
  secretAccessKey: "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",
  region: "us-east-1",
  signatureVersion: "v4",
});
export const ProfilePage = () => {
  const s3 = new AWS.S3();
  const [dataType, setDataType] = useState("Select Upload Data Type");
  const [upladData, setUploadData] = useState("");
  const [getData, setGetData] = useState("");
  const [userItems, setUserItems] = useState("");
  const [file, setFile] = useState(null);
  const email = JSON.parse(localStorage.getItem("user")).email;
  const [fileUrl, setFileUrl] = useState(null);

  const handleChange = (event) => {
    setDataType(event.target.value);
  };
  const handleFiles = (files) => {
    setFile(files[0]);
    var reader = new FileReader();
    reader.onload = function (e) {
      // Use reader.result
      setUploadData(reader.result);
    };
    reader.readAsText(files[0]);
  };
  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = {
      Bucket: `acrs-datalake-bucket/${email}`,
      Key: `${Date.now()}.${file.name}`,
      Body: file,
    };
    const { Location } = await s3.upload(params).promise();
    setFileUrl(Location);
    console.log("uploading to s3", Location);
  };

  const listS3 = async () => {
    const params = {
      Bucket: `acrs-datalake-bucket`,
    };
    const { Contents } = await s3.listObjects(params).promise();
    const userItems = Contents.filter((content) =>
      content.Key.startsWith(`${email}`)
    );
    setUserItems(userItems);
  };

  const getFromS3 = async (event) => {
    const key = event.target.value;
    const params = {
      Bucket: `acrs-datalake-bucket`,
      Key: `${key}`,
    };
    const item = await s3.getObject(params).promise();
    setGetData(item.Body.toString('utf-8'));
  };
  const renderUserItem = (data) => {
    return (
      <Select
        defaultValue="User Data"
        sx={{
          width: 300,
          height: 40,
        }}
        onChange={getFromS3}
      >
        {data.map((item) => {
          console.log("item", item.Key);
          const value = `${item.Key}`
          return <MenuItem value={value}>{item.Key}</MenuItem>;
        })}
      </Select>
    );
  };

  return (
    <Container Container component="main" maxWidth="s">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4">
          <PersonIcon />
          {`   Hello, ${email}    `}
        </Typography>
        <br />
        <br />
        <br />
        <br />
        <Typography component="h1" variant="h6">
          Select Data Type to Upload :
        </Typography>
        <Select
          defaultValue="Real Data"
          sx={{
            width: 300,
            height: 40,
          }}
          value={dataType}
          onChange={handleChange}
        >
          <MenuItem value="Real Data">Real Data</MenuItem>
          <MenuItem value="Forecast Data">Forecast Data</MenuItem>
        </Select>
        <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
          <Button>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <FileUploadIcon />
            </Avatar>
            UPLOAD DATA
          </Button>
        </ReactFileReader>
        {fileUrl && `Uploaded at ${fileUrl}`}
        {upladData && (
          <Button onClick={uploadToS3}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <CloudUploadIcon />
            </Avatar>
            Submit to DATA Lake
          </Button>
        )}
        <CsvToHtmlTable
          data={upladData}
          csvDelimiter=","
          tableClassName="table table-striped table-hover"
        />
        <Button onClick={listS3}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <FilterListIcon />
          </Avatar>
          List My Data
        </Button>
        {userItems && renderUserItem(userItems)}
        <CsvToHtmlTable
          data={getData}
          csvDelimiter=","
          tableClassName="table table-striped table-hover"
        />
      </Box>
      {/* <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      /> */}
    </Container>
  );
};
