import clsx from 'clsx';

const Button = ({
  as: Component = 'button',
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  type = 'button',
  ...props
}) => {
  const componentProps = Component === 'button' ? { type } : {};
  return (
    <Component className={clsx('btn', `btn--${variant}`, `btn--${size}`, className)} {...componentProps} {...props}>
      {icon && <span className="btn__icon">{icon}</span>}
      <span>{children}</span>
    </Component>
  );
};

export default Button;
