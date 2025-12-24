export const generateOrderNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  const timestamp = new Date().getTime().toString().slice(-4);
  return `RS-${timestamp}${random}`;
};

export const estimateDeliveryTime = () => {
  const now = new Date();
  const estimate = new Date(now.getTime() + 45 * 60000);
  return estimate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};
