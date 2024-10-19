import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

        // Derived state: Calculate total quantities
        totalQuantities: () => {
          return get().cart.reduce((total, item) => total + item.quantity, 0);
        },
      // Add to cart or update quantity if product exists
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingProductIndex = state.cart.findIndex((item) => item.id === product.id);

          if (existingProductIndex !== -1) {
            // If the product already exists, increase its quantity
            // const updatedCart = [...state.cart];
            // updatedCart[existingProductIndex].quantity += quantity;
            throw new Error("Product already exists in the cart.");

            return { cart: updatedCart };
          } else {
            // Add new product to the cart
            return { cart: [...state.cart, { ...product, quantity }] };
          }
        }),

      // Remove a product from the cart
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      // Increment the quantity of a specific product
      incrementQuantity: (productId) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          );
          return { cart: updatedCart };
        }),

      // Decrement the quantity of a specific product
      decrementQuantity: (productId) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
          );
          return { cart: updatedCart };
        }),

      // Clear the cart
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'gc-storage', // Unique name for the storage key
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
    }
  )
);

export default useCartStore;
