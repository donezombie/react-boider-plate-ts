import React from 'react';

interface Button {
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<Button> = ({ type = 'button', children, className }) => {
  return (
    <button
      type={type}
      className={`${className} class="inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"`}
    >
      {children}
    </button>
  );
};
export default Button;
