import React from 'react';

interface Props {
    content: string;
    className?: string;
    as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
}

export const Text: React.FC<Props> = ({ content, className = '', as: Component = 'div' }) => {
    return (
        <Component className={className}>
            {content}
        </Component>
    );
};

export default Text;
