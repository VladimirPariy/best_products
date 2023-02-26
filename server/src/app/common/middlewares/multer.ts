import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    const path = __dirname.split("/");
    path.length = path.length - 3;
    const staticPath = `${path.join("/")}/static/`;

    cb(null, staticPath);
  },
  filename: (_, file, cb) => {
    const fileName = `${uuidv4()}.jpg`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });
