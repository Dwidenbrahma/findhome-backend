// const multer = require("multer");
// const path = require("path");

// // Function to check file type
// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (mimetype && extname) {
//     return cb(null, true);
//   } else {
//     cb(new Error("Error: Images Only!"));
//   }
// }

// // Multer storage configuration for profile image
// const profileStorage = multer.diskStorage({
//   destination: "./uploads/user-profile-pics",
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// // Multer upload configuration
// const profileUpload = multer({
//   storage: profileStorage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

// module.exports = profileUpload;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // import cloudinary config

const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "findhome/user-profile-pics", // or any folder you want
    allowed_formats: ["jpeg", "jpg", "png", "gif"],
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  },
});

const profileUpload = multer({
  storage: profileStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

module.exports = profileUpload;
