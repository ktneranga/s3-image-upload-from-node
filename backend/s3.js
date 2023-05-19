require("dotenv").config();
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { upload } = require("./multer");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accesskey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_KEY;

const client = new S3Client({
  credentials: {
    accessKeyId: accesskey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

const uploadFile = async (file) => {
  const params = {
    Bucket: bucketName,
    Key: "profile/" + file.filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  const res = await client.send(command);
  return res;
};

exports.uploadFile = uploadFile;

// fetching an image

const getFileStream = async (fileKey) => {
  console.log("fileKey", fileKey);
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };

  const command = new GetObjectCommand(downloadParams);

  console.log("command", command);

  const response = await client.send(command);
  console.log("response", response);
  // const str = response.Body.transformToString();
  // console.log("str", str);
  return response;
};

exports.getFileStream = getFileStream;
