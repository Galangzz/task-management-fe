import React from 'react';

function TitleTaskContent({ title }: { title?: string }) {
    return (
        <h1 className="mb-6 flex-1 text-xl font-bold tracking-wide">{title}</h1>
    );
}

export default TitleTaskContent;
