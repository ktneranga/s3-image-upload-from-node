const express = require("express");
const dotenv = require("dotenv").config();
const { upload } = require("./multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const { uploadFile, getFileStream } = require("./s3");

const app = express();

app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

const PORT = process.env.PORT || 5000;

app.post("/images", upload.single("file"), async (req, res, next) => {
  try {
    const result = await uploadFile(req.file);
    console.log("res", result);
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.get("/images/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const fileStream = await getFileStream(key);
    res.set("Content-Type", "image/png");
    fileStream.Body.pipe(res);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log("server is runnig on port", PORT));
