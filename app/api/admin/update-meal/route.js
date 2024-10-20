import { client } from '@/sanity/lib/client';
import { isAdmin } from '@/utils/lib/auth';
import { uploadImageToSanity } from '@/utils/sanity/uploadImageToSanity';
import { NextResponse } from 'next/server';

export async function PATCH(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { mealId, title, description, price, status, selectedImage, existingImageAssetId } = body;

    // Check if the user is an admin (authentication/authorization)
    if (!isAdmin(req.headers)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!mealId) {
      return NextResponse.json({ error: 'Meal ID is required' }, { status: 400 });
    }

    let imageAssetId = existingImageAssetId; // Use existing image ID if available

    // Only upload a new image if the user selected a new one
    if (selectedImage && typeof selectedImage !== 'string') {
      imageAssetId = await uploadImageToSanity(selectedImage);
    }

    const updatedMeal = {
      _type: 'dish', // Ensure this matches the type in your schema
      title,
      description,
      price: Number(price),
      status: status === "true", // Convert string "true"/"false" to a boolean
      // Only include image if it exists (either new or existing one)
      ...(imageAssetId && {
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAssetId,
          },
        },
      }),
    };

    // Update the meal in Sanity
    await client.patch(mealId).set(updatedMeal).commit();

    // Return a success response
    return NextResponse.json({ message: `Meal with ID ${mealId} updated successfully.` }, { status: 200 });
  } catch (error) {
    console.error('Error updating meal:', error);
    // Return an error response
    return NextResponse.json({ error: 'Failed to update the meal' }, { status: 500 });
  }
}
