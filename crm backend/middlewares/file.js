// // const multer=require('multer');

// // const storage=multer.diskStorage({
// //     destination:(req,file,cb)=>
// //         {
// //             cb(null,'./images/')
// //         },
// //     filename:(req,file,cb)=>
// //             {
// //                 cb(null,file.originalname)
// //             }
// // })
// // const upload=multer({storage:storage})
// // module.exports=upload

// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');




// // Define the upload directory
// const uploadDir = path.join(__dirname, 'uploads');

// // Create the directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'images', // Cloudinary folder name
//       format: async (req, file) => 'jpg', // supports promises as well
//       public_id: (req, file) => 'computed-filename-using-request', // Define a custom public ID if needed
//     },
//   });


// // Create multer instance
// const upload = multer({ storage: storage });

// module.exports = upload;

//-----------------------------------------------------------------------------------------

// const multer = require('multer');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;



// // Storage setup for Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Folder to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Set unique filename using timestamp and file extension
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// // File filter for accepting specific file types
// const fileFilter = (req, file, cb) => {
    
//     const fileTypes = {
//       image: ['image/jpeg', 'image/png'],
//       pdf: ['application/pdf'],
//       word: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
//       video: ['video/mp4', 'video/x-matroska', 'video/avi', 'video/mov', 'video/quicktime']  // Ensure correct video MIME types
//     };
  
//     // Check for image files
//     if (file.fieldname === 'image_file' && fileTypes.image.includes(file.mimetype)) {
//       return cb(null, true); // Accept image files
//     } 
//     // Check for PDF files
//     else if (file.fieldname === 'pdf_file' && fileTypes.pdf.includes(file.mimetype)) {
//       return cb(null, true); // Accept PDF files
//     } 
//     // Check for Word files
//     else if (file.fieldname === 'word_file' && fileTypes.word.includes(file.mimetype)) {
//       return cb(null, true); // Accept Word files
//     } 
//     // Check for video files (allow dynamic field names like add_Content[0].video_file)
//     else if (file.fieldname.includes('video_file') && fileTypes.video.includes(file.mimetype)) {
//       return cb(null, true); // Accept video files
//     } 
//     // Reject file if it doesn't match the allowed types
//     else {
//       console.log('Rejected File:', file);  // Log rejected file for debugging
//       return cb(new Error('Invalid file type'), false); 
//     }
//   };
  
  
  

// // Multer upload setup
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 50 * 1024 * 1024 }, // Max file size 50MB
//   fileFilter: fileFilter
// });

// // Use upload.any() to allow all fields, since we are using dynamic fields
// const uploadFields = upload.any(); // Allow all fields (works with dynamic field names)

// module.exports = uploadFields;



//------------------------------------------------------------------------


const multer= require('multer');

const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload= multer({storage:storage});

module.exports=upload;