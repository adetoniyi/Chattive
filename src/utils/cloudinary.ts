import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export const uploadToCloudinary = async (
  filePath: string,
  folder = "chattive"
) => {
  return await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
