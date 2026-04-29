import { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    interface Request {
      fileName?: string;
      filePath?: string;
      file?: UploadedFile;
    }
  }
}

export {};