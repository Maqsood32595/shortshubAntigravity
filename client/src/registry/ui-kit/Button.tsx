import React from 'react';

export const Button: React.FC<any> = ({ children, ...props }) => {
    return <button className="bg-indigo-600 text-white px-4 py-2 rounded" {...props}>{children}</button>;
};
