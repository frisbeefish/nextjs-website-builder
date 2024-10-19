const { promises: fs } = require("fs");

const path = require("path");
var express = require("express");

const multer = require("multer");
const upload = multer({ dest: path.join(process.cwd(), "uploads") });

const router = express.Router();

async function moveUploadedFile({ file, destinationFolder }) {
  const fileDestination = path.join(
    process.cwd(),
    "public",
    destinationFolder,
    file.originalname
  );

  await fs.copyFile(file.path, fileDestination);

  await fs.unlink(file.path);
}

router.post("/image", upload.single("file"), async function (req, res, next) {
  const file = req.file;

  await moveUploadedFile({ file, destinationFolder: "images" });

  res.json({
    filename: file.originalname,
    url: `http://localhost:9999/public/images/${file.originalname}`,
  });
});

router.post("/file", upload.single("file"), async function (req, res, next) {
  const file = req.file;

  await moveUploadedFile({ file, destinationFolder: "files" });

  res.json({
    filename: file.originalname,
    url: `http://localhost:9999/public/files/${file.originalname}`,
  });
});

module.exports = router;
