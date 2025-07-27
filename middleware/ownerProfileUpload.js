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
//     cb("Error: Images Only!");
//   }
// }

// // Multer storage configuration for profile image
// const profileStorage = multer.diskStorage({
//   destination: "./uploads/owner-profile-pics",
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
const cloudinary = require("../utils/cloudinary");

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "findhome/owner-profile-pics",
    allowed_formats: ["jpeg", "jpg", "png", "gif"],
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  },
});

// Multer config
const profileUpload = multer({ storage });

module.exports = profileUpload;
