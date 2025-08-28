import React from 'react';
import { Button as FlowbiteButton } from 'flowbite-react';

const Button = ({ children, color = 'info', onClick, type = 'button', ...props }) => {
  return (
    <FlowbiteButton
      color={color}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </FlowbiteButton>
  );
};

export default Button;