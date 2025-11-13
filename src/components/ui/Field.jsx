import React from 'react';

function Field({children}) {
    return (
        <div className="flex justify-center w-full h-max p-8">
            <div className="flex flex-col w-4xl min-h-96 bg-(--background-header) rounded-3xl p-4">
                {children}
            </div>
        </div>
    );
}

export default Field;
