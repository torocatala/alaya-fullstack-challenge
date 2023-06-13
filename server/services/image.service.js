const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const fileExtension = '.jpg';
const filePath = './tmp/';

/**
 * Helper function that transform a base64 image into a image file and saves it temporarily into our server within a random name.
 *
 * @param {string} img - The base64 data of the image.
 * @returns {string} - The randomly and unique name of the file.
 */
async function saveBase64Image(img){

	// We generate a timestamp
	const timestamp = new Date().getTime();
	// We generate a base-34 random string
	const randomString = Math.random().toString(36).substring(2, 15);
  	// We generate a unique file name with it's temporary path
	const uniqueImgName = timestamp+'-'+randomString;
	// Remove the data URL prefix in case we decide to upload it(as right now it being excluded on the frontend)
	const base64DataWithoutPrefix = img.replace(/^data:image\/\w+;base64,/, '');

	try {
		// Decode the Base64 data
		const buffer = Buffer.from(base64DataWithoutPrefix, 'base64');

		// Save the buffer to a file
		fs.writeFileSync(filePath+uniqueImgName+fileExtension, buffer);

		return uniqueImgName;
	} 
	catch (error) {
		console.log('There was an error while saving the image');
		return false;
	}
}

class ImageService {

	constructor(){

		// Cloudinary configuration
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
		});

		this.temporaryDir = 'tmp';

		// We create a folder in our server(if it doesn't exist) where we will store the temporary images.
		if (!fs.existsSync(this.temporaryDir)) {
            fs.mkdirSync(this.temporaryDir);
        }

	}
	

	/**
	 * Upload an image to a Cloudinary server
	 *
	 * @param {string} img - The base64 data of the image.
	 * @returns {string} - Object with the success status and the image url
	 * @throws {Error} - If there is any porblem with the image upload.
	 */
	async upload(img){

		try {
			const uniqueImgName = await saveBase64Image(img);

			if (filePath && uniqueImgName) {

				const response = await cloudinary.uploader .upload(filePath + uniqueImgName + fileExtension, {
					public_id: uniqueImgName,
					folder: process.env.CLOUDINARY_FOLDER
				});

				fs.unlink(filePath + uniqueImgName + fileExtension, (error) => {
					if (error) {
						// TODO: Handle this error
						console.error('Error deleting the file:', error);
					}
				});

				return {success: true, url: response.secure_url}
			}
		} 
		catch (error) {
			console.log('Unexpected error:', error);
			throw new Error('Cloudinary service failed to upload the image.');
		}
	}


	/**
	 * Delete an image from a Cloudinary server
	 *
	 * @param {string} img - Url of the image.
	 * @returns {boolean}
	 * @throws {Error} - If there is any porblem with the image deletion.
	 */
	async deleteImage(imgUrl){

		try {
            // Extract the image ID from the image URL
            const imgUrlArray = imgUrl.split('/');
			const imageId = imgUrlArray[imgUrlArray.length -1].split('.')[0];
            
            // Delete the image from Cloudinary
			return await cloudinary.uploader.destroy(process.env.CLOUDINARY_FOLDER+'/'+imageId);
        } catch (error) {
            throw new Error('Failed to delete image from Cloudinary');
        }
	}
	
}
module.exports = ImageService;



