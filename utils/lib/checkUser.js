// Function to ensure a user document exists, or return the existing one
export const ensureUserExists = async (customerId) => {
  try {
    // Check if a customer document with the given ID exists
    const existingCustomer = await client.fetch(
      `*[_type == "customer" && _id == $customerId][0]`,
      { customerId }
    );

    if (existingCustomer) {
      // Return the existing customer document if found
      // console.log("Existing customer found:", existingCustomer);
      return existingCustomer;
    }

    // If no such customer document exists, create a new one (anonymous customer)
    const newCustomer = await client.createIfNotExists({
      _id: customerId, // Use the customerId as the customer ID or generate a new one if needed
      _type: "customer",
      isAnonymous: true,
      createdAt: new Date().toISOString(), // Add any default fields required for a customer document
    });

    // console.log('Created new anonymous customer:', newCustomer);
    return newCustomer;
  } catch (error) {
    console.error('Error ensuring customer exists:', error);
    throw new Error('Failed to ensure customer existence');
  }
};

