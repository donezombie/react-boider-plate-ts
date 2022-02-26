import React from 'react';

interface ButtonI {
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onChange?: React.FormEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonI> = ({ type = 'button', children, className, onChange, onClick, onKeyDown }) => {
  return (
    <button type={type} className={className} onClick={onClick} onKeyDown={onKeyDown} onChange={onChange}>
      {children}
    </button>
  );
};
export default Button;
