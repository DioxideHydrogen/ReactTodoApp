import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ children, className, type = 'button', ...props }: ButtonProps) {
  return (
  <button
    type={type}
    className={className ?? 'px-4 py-2 bg-blue-500 text-white rounded'}
    {...props}
  >
    {children}
  </button>
  );
}

export default Button