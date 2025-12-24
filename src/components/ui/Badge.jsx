import clsx from 'clsx';

const Badge = ({ children, variant = 'neutral', className }) => (
  <span className={clsx('badge', `badge--${variant}`, className)}>{children}</span>
);

export default Badge;
