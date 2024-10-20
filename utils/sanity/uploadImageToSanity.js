
import { client } from "@/sanity/lib/client";



export const uploadImageToSanity = async (imageFile) => {
  try {
    const imageAsset = await client.assets.upload('image', imageFile, {
      contentType: imageFile.type,
      filename: imageFile.name,
    });
    return imageAsset._id; // Return the image asset ID
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Image upload failed");
  }
};
