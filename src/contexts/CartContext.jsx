import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import products from '../data/products.json';
import coupons from '../data/coupons.json';
import { loadFromStorage, saveToStorage } from '../utils/storage.jsx';

const CartContext = createContext();

const CART_KEY = 'rumeliesepeti-cart';
const TAX_RATE = 0.08;

const defaultState = { items: [], coupon: null };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex((item) => item.optionsKey === action.payload.optionsKey);
      if (existingIndex > -1) {
        const updatedItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item,
        );
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartItemId === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        ),
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.cartItemId !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, items: [], coupon: null };
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload };
    default:
      return state;
  }
};

const getProductById = (id) => products.find((product) => product.id === id);

const computeTotals = (items, coupon) => {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  let discount = 0;
  if (coupon) {
    discount = coupon.discountType === 'percentage'
      ? +(subtotal * (coupon.discountValue / 100)).toFixed(2)
      : coupon.discountValue;
    if (discount > subtotal) discount = subtotal;
  }
  const total = +(subtotal + tax - discount).toFixed(2);
  return { subtotal, tax, discount, total };
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    defaultState,
    () => loadFromStorage(CART_KEY, defaultState),
  );

  useEffect(() => {
    saveToStorage(CART_KEY, state);
  }, [state]);

  const addToCart = (productId, options) => {
    const product = getProductById(productId);
    if (!product) return;
    const {
      size = product.sizes?.[0]?.name ?? null,
      extras = [],
      quantity = 1,
      note = '',
    } = options;

    const selectedSize = product.sizes?.find((item) => item.name === size) ?? { name: null, price: 0 };
    const selectedExtras = (extras || []).map((extraName) => {
      const match = product.extras?.find((extra) => extra.name === extraName);
      return match || { name: extraName, price: 0 };
    });

    const extrasPrice = selectedExtras.reduce((sum, extra) => sum + (extra.price || 0), 0);
    const basePrice = product.price;
    const unitPrice = basePrice + (selectedSize?.price || 0) + extrasPrice;
    const optionsKey = `${product.id}-${selectedSize?.name || 'std'}-${selectedExtras
      .map((extra) => extra.name)
      .sort()
      .join('|')}`;

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        cartItemId: `${optionsKey}-${Date.now()}`,
        optionsKey,
        productId: product.id,
        name: product.name,
        image: product.image,
        category: product.category,
        size: selectedSize?.name,
        extras: selectedExtras,
        quantity,
        note,
        unitPrice,
      },
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { id, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    const match = coupons.find((coupon) => coupon.code === normalized && coupon.isActive);
    const { subtotal } = computeTotals(state.items, null);
    if (!match) {
      dispatch({ type: 'APPLY_COUPON', payload: null });
      return { success: false, message: 'Kupon bulunamadı.' };
    }
    if (subtotal < match.minOrderAmount) {
      return { success: false, message: `Kupon için minimum tutar ${match.minOrderAmount}₺` };
    }
    dispatch({ type: 'APPLY_COUPON', payload: match });
    return { success: true, message: 'Kupon uygulandı.' };
  };

  const setCartItemsFromOrder = (items) => {
    const hydratedItems = items.map((item) => {
      const product = getProductById(item.productId);
      const extrasDetailed = (item.extras || []).map((extraName) =>
        product?.extras?.find((extra) => extra.name === extraName) || { name: extraName, price: 0 },
      );
      const sizePrice = product?.sizes?.find((size) => size.name === item.size)?.price || 0;
      const extrasPrice = extrasDetailed.reduce((sum, extra) => sum + (extra.price || 0), 0);
      const computedUnit = (product?.price || 0) + sizePrice + extrasPrice;
      const unitPrice = product ? computedUnit : item.price || computedUnit;
      const optionsKey = `${item.productId}-${item.size || 'std'}-${extrasDetailed
        .map((extra) => extra.name)
        .sort()
        .join('|')}`;
      return {
        cartItemId: `${optionsKey}-${Date.now()}-${Math.random()}`,
        optionsKey,
        productId: item.productId,
        name: product?.name || item.name,
        image: product?.image,
        category: product?.category,
        size: item.size,
        extras: extrasDetailed,
        quantity: item.quantity,
        note: item.note,
        unitPrice,
      };
    });
    dispatch({ type: 'SET_STATE', payload: { items: hydratedItems, coupon: null } });
  };

  const totals = useMemo(() => computeTotals(state.items, state.coupon), [state.items, state.coupon]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        coupon: state.coupon,
        totals,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        setCartItemsFromOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
