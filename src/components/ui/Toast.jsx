import { useEffect } from 'react';
import clsx from 'clsx';

const Toast = ({ message, type = 'success', onDismiss, duration = 2500 }) => {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  if (!message) return null;

  return (
    <div className={clsx('toast', `toast--${type}`)} role="status">
      {message}
    </div>
  );
};

export default Toast;
