// Require the cloudinary library
import { v2 as cloudinary } from 'cloudinary';
// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: 'dux4vjqzw',
  api_key: '679936916786432',
  api_secret: 'ObFAxRATJF8SSRI_gKI8BHkqQQA',
});

// Log the configuration
console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath);
      console.log(result);
      const { secure_url } = result;
      console.log(secure_url);
      return result.secure_url;
    } catch (error) {
      console.error(error);
    }
};
export default uploadImage;
