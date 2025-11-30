import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('egyptToursCart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch {
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('egyptToursCart', serializedCart);
  } catch {
    // Ignore write errors
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
    total: 0,
    itemCount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, type, name, price, date, location, quantity = 1 } = action.payload;
      
      // For events, include date in the unique identifier
      const uniqueId = type === 'event' ? `${id}-${date}` : id;
      
      const existingItem = state.items.find(item => 
        item.uniqueId === uniqueId && item.type === type
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          uniqueId,
          id,
          type,
          name,
          price: parseInt(price),
          date: date || null,
          location,
          quantity,
          addedAt: new Date().toISOString()
        });
      }

      saveCartToStorage(state.items);
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    removeFromCart: (state, action) => {
      const { uniqueId } = action.payload;
      state.items = state.items.filter(item => item.uniqueId !== uniqueId);
      
      saveCartToStorage(state.items);
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    updateQuantity: (state, action) => {
      const { uniqueId, quantity } = action.payload;
      const item = state.items.find(item => item.uniqueId === uniqueId);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.uniqueId !== uniqueId);
        } else {
          item.quantity = quantity;
        }
      }

      saveCartToStorage(state.items);
      state.itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
      state.total = state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      localStorage.removeItem('egyptToursCart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;