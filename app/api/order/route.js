import { getSession } from "@/utils/lib/auth/getSession";
import { initializePaystack } from "@/utils/lib/paystack";
import { createAnonymousUser, createOrder, createTransaction } from "@/utils/sanity";
import { updateAnonymousUserAfterOrder } from "@/utils/sanity/updateAnonymousUser";
import { updateTransaction, updateUserAfterOrder, } from "@/utils/sanity/updateUserAfterOrder"; // Import the new function
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  const { cartItems, amount, fullName, email, serviceFee, phoneNumber, streetAddress, orderNotes, apartment, townCity, deliveryAddress, userId } = await req.json();

  let currentUserId;
  let isAnonymous = false;
  const formattedEmail = email.toLowerCase();
  try {
    // Check if the user is signed in
    let session = await getSession(req);

    if (!session || !session.user) {
      // User is not signed in, create an anonymous user
      const anonymousUser = await createAnonymousUser(formattedEmail, fullName);
      currentUserId = anonymousUser._id; // Use the anonymous user's ID
      isAnonymous = true;
    } else {
      currentUserId = userId;
    }

    // Proceed with the order processing
    const paymentResponse = await initializePaystack(formattedEmail, amount);
    const transactionRef = paymentResponse?.data.reference;

    const order = await createOrder({
      total: amount,
      products: cartItems,
      serviceFee: { _type: "reference", _ref: serviceFee },
      email: formattedEmail,
      name: fullName,
      streetAddress,
      apartment,
      townCity,
      phone: phoneNumber,
      transactionRef,
      notes: orderNotes,
      customer: { _type: "reference", _ref: currentUserId }, 
    });

    if (order?._id) {
      const transaction = await createTransaction({
        order: { _type: "reference", _ref: order._id },
        amount,
        transactionRef,
        userId: { _type: "reference", _ref: currentUserId }, 
        status: 'pending',
        method: 'paystack',
        transactionDate: new Date().toISOString(),
      });

      // Update the user's order history, order count, and total spent
      if (isAnonymous) {
        await updateAnonymousUserAfterOrder(currentUserId, amount, order, true);
      } else {
        await updateUserAfterOrder(currentUserId, amount, order, true);
      }

      // Update the transaction status if needed
      await updateTransaction(currentUserId, transaction);

      return new Response(JSON.stringify({ success: true, order, transaction, paymentResponse }), { status: 200 });
    } else {
      if (isAnonymous) {
        await updateAnonymousUserAfterOrder(currentUserId, amount, { _id: uuidv4() }, false);
      } else {
        await updateUserAfterOrder(currentUserId, amount, { _id: uuidv4() }, false, email);
      }
      return new Response(JSON.stringify({ error: 'Error creating order' }), { status: 500 });
    }
  } catch (error) {
    if (isAnonymous) {
      await updateAnonymousUserAfterOrder(currentUserId, amount, { _id: uuidv4() }, false);
    } else {
      await updateUserAfterOrder(currentUserId, amount, { _id: uuidv4() }, false, email);
    }
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
