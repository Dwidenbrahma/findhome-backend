const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // your configured Cloudinary instance

const panoramicStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "findhome/panoramic-uploads-pics",
    allowed_formats: ["jpeg", "jpg", "png", "gif"],
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  },
});

const upload = multer({
  storage: panoramicStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
});

module.exports = upload.array("panoramic", 10); // 👈 This exports the actual middleware
