import React from 'react';
import { Label, TextInput } from 'flowbite-react';

const Input = ({ id, label, type = 'text', value, onChange, placeholder, required = false, ...props }) => {
  return (
    <div className="w-full">
      <div className="mb-2 block">
        <Label htmlFor={id} value={label} />
      </div>
      <TextInput
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;