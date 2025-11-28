import React from 'react';

interface ContainerProps {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
    children?: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    maxWidth = 'lg',
    className = '',
    children
}) => {
    const maxWidthClasses = {
        'sm': 'max-w-screen-sm',
        'md': 'max-w-screen-md',
        'lg': 'max-w-screen-lg',
        'xl': 'max-w-screen-xl',
        '2xl': 'max-w-screen-2xl'
    };

    return (
        <div className={`container mx-auto px-4 ${maxWidthClasses[maxWidth]} ${className}`}>
            {children}
        </div>
    );
};

export default Container;

