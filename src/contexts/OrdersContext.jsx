import { createContext, useContext, useEffect, useState } from 'react';
import baseOrders from '../data/orders.json';
import { generateOrderNumber } from '../utils/order.jsx';
import { loadFromStorage, saveToStorage } from '../utils/storage.jsx';

const OrdersContext = createContext();
const ORDERS_KEY = 'rumeliesepeti-orders';

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => loadFromStorage(ORDERS_KEY, baseOrders));

  useEffect(() => {
    saveToStorage(ORDERS_KEY, orders);
  }, [orders]);

  const addOrder = (payload) => {
    const generatedId =
      typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `order-${Date.now()}`;
    const order = {
      id: generatedId,
      orderNumber: generateOrderNumber(),
      date: new Date().toISOString(),
      status: 'Hazırlanıyor',
      ...payload,
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  const getOrderById = (id) => orders.find((order) => order.id === id);

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) throw new Error('useOrders must be used within OrdersProvider');
  return context;
};
