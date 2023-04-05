import React from 'react';

type Props = {
  id: string;
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
};


const TextInput: React.FC<Props> = ({ id, label, value, onChange, required, className }) => {
  return (
    <div className='pb-5'>
      <label htmlFor={id}>{label}</label>
      <input 
      id={id} 
      type="text"
      className="block w-full appearance-none border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:outline-none sm:text-sm rounded-md"
      value={value} 
      onChange={onChange} 
      required={required}
      />
    </div>
  );
};

export default TextInput;
