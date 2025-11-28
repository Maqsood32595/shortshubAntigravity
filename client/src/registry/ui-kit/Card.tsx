import React from 'react';

export const Card: React.FC<any> = ({ children, className, ...props }) => {
    return <div className={`bg-white shadow rounded-lg ${className}`} {...props}>{children}</div>;
};
