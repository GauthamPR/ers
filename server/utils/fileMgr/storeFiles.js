const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, done) => {
    let path = "files/answer-sheets";
    fs.mkdirSync(path, { recursive: true });
    done(null, path);
  },
  filename: (req, file, done) => {
    done(null, Date.now() + file.originalname.replace("#", "h"));
  },
});

module.exports = multer({
  storage: storage,
  fileFilter: (err, file, done) => {
    switch (file.mimetype) {
      case "application/pdf":
        done(null, true);
        break;
      case "application/x-pdf":
        done(null, true);
      default:
        done("Unsupported file type", false);
    }
  },
});
