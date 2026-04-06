
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

function Input({ type = 'text', name, placeholder, ...props }: InputProps) {
  return (
	<input type={type} name={name} placeholder={placeholder} className="border p-2 rounded w-full mb-4" {...props} />
  );
}

export default Input