const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

cloudinary.config({
  cloud_name: 'dv12fxp4w',
  api_key: '188784282419438',
  api_secret: 'Kcx3fOU-lGD5_gcA7QEDc4TSr9g',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);       // e.g. '.pdf'
    const baseName = path.basename(originalName, extension); // 'Business Plan'
    const cleanName = baseName.replace(/[^a-zA-Z0-9-_]/g, '_'); // Clean filename

    return {
      folder: 'fyp_uploads',
      resource_type: file.mimetype === 'application/pdf'
        ? 'raw' // <-- Important: upload PDFs as raw resource type
        : file.mimetype.startsWith('video')
          ? 'video'
          : 'auto',
      public_id: `${Date.now()}-${cleanName}`,
      format: extension.replace('.', ''), // remove dot from extension
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
