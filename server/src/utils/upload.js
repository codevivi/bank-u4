import fs from "node:fs/promises";
import multer, { diskStorage } from "multer";
const UPLOADS_DIR = "./uploads";

const storageOptions = {
  destination: async (req, file, next) => {
    try {
      await fs.access(UPLOADS_DIR);
    } catch {
      await fs.mkdir(UPLOADS_DIR);
    }
    next(null, UPLOADS_DIR);
  },
  filename: (req, file, next) => {
    let name;
    if (req.session.filename) {
      name = req.session.filename; //just save name from previous middleware, and clear from session
      req.session.filename = null;
    } else {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); //one billion
      const nameParts = file.originalname.split(".");
      const extension = nameParts[nameParts.length - 1];
      name = uniqueSuffix + "." + extension;
    }
    next(null, name);
  },
};

const storage = multer.diskStorage(storageOptions);
const upload = multer({
  storage,
  fileFilter: (req, file, next) => {
    const allowed = ["image/jpeg"];
    if (allowed.includes(file.mimetype)) {
      next(null, true);
    }
  },
});
export default upload;
