import React, { useRef, useState } from 'react';

function OtpForm() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value.replace(/\D/g, '');

        if (!value) {
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value[0] as string;
        setOtp(newOtp);
        console.log({newOtp: newOtp[index]})
        console.log({index})

        if (newOtp[index] && index < 6 - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        if (newOtp.every(Boolean)) {
            // onComplete(newOtp.join(''));
            alert(newOtp.join(''))
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];

            if (otp[index]) {
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
                newOtp[index - 1] = '';
                setOtp(newOtp);
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '');
        if (!paste) return;

        const newOtp = otp.map((_, i) => paste[i] || '');
        setOtp(newOtp);

        if (paste.length >= length) {
            // onComplete(paste.slice(0, length));
            alert(otp);
        }
    };

    return (
        <div className="flex">
            <form className="flex gap-6">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {inputsRef.current[index] = el}}
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        max={1}
                        className="h-14 w-10 text-center text-2xl backdrop-brightness-90 rounded-xl"
                    />
                ))}
            </form>
        </div>
    );
}

export default OtpForm;
