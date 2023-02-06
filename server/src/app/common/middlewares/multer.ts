import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, `${__dirname}../../../../static/`);
  },
  filename: (_, file, cb) => {
    const fileName = `${uuidv4()}.jpg`;
    cb(null, fileName);
  },
});
export const upload = multer({ storage });
