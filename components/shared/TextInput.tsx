import React from 'react';

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
};


const TextInput: React.FC<Props> = ({ id, label, value, onChange, required, className }) => {
  return (
    <div className='py-5'>
      <label htmlFor={id}>{label}</label>
      <input 
      id={id} 
      type="text"
      className="block w-full appearance-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      value={value} 
      onChange={onChange} 
      required={required} 
      />
    </div>
  );
};

export default TextInput;
