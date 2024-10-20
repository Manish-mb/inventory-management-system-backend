import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import commonRoutes from "./routes/commonRoutes.js";
import bodyParser from "body-parser";
import path from "path";
import { saveAttachmentModal } from "./models/attachments.js";
import multer from "multer";
import fs from "fs";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// CORS Policy
app.use(cors({ origin: "*" }));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//swagger
app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api", commonRoutes);

app.post("/uploadAttachment", upload.single("file"), async (req, res) => {
  try {
    // Accessing the uploaded file from req.file
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    // Create a new attachment document
    saveAttachmentModal({
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      fileData: file.buffer, // Buffer from Multer
    })
      .then((result) => {
        sendResult(res, result, "Data Saved");
      })
      .catch((error) => {
        console.log(error);
        sendError(res, error, "Something Went Wrong");
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
