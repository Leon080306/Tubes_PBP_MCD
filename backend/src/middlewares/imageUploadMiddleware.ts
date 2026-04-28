import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const uploadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Uploading files")
    if (!req.files || !req.files.image) {
        console.log("No file uplodaed")
        return res.status(400).json({
            message: "No file uploaded",
        });
    }
    
    console.log("file: " + req.files.image)
    const file = req.files.image;

    if (Array.isArray(file)) {
        console.log("only one file allowed")
      return res.status(400).json({
        message: "Only one file allowed",
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
        console.log("Invalid file type")
      return res.status(400).json({
        message: "Invalid file type",
      });
    }

    // create uploads folder if not exists
    const uploadDir = path.join(__dirname, "../../uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // generate uuid filename
    const ext = path.extname(file.name);
    const fileName = `${uuidv4()}${ext}`;

    const uploadPath = path.join(uploadDir, fileName);

    // move file
    await file.mv(uploadPath);

    // attach to request
    req.fileName = fileName;
    req.filePath = uploadPath;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
    });
  }
};