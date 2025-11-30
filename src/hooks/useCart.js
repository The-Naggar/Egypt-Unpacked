import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../../src/Store/Cartslice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  return {
    // State
    items: cart.items,
    total: cart.total,
    itemCount: cart.itemCount,
    
    // Actions
    addItem: (item) => dispatch(addToCart(item)),
    removeItem: (uniqueId) => dispatch(removeFromCart({ uniqueId })),
    updateItemQuantity: (uniqueId, quantity) => dispatch(updateQuantity({ uniqueId, quantity })),
    clearCart: () => dispatch(clearCart()),
    
    // Helpers
    getItemCount: () => cart.itemCount,
    getTotalPrice: () => cart.total,
  };
};