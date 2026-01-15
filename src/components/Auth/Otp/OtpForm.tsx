import React, { useRef, useState } from 'react';

type OtpFormProps = {
    otp: string[];
    inputsRef: React.RefObject<(HTMLInputElement | null)[]>;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    handleKeyDown: (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => void;
    handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    handleClick: (value: number) => void;
};

function OtpForm({
    otp,
    inputsRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleClick,
}: OtpFormProps) {
    
    return (
        <div className="flex">
            <form className="flex gap-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputsRef.current[index] = el;
                        }}
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        onClick={() => handleClick(index)}
                        type="text"
                        inputMode="numeric"
                        // maxLength={1}
                        className="h-14 w-10 rounded-xl text-center text-2xl backdrop-brightness-90"
                    />
                ))}
            </form>
        </div>
    );
}

export default OtpForm;
