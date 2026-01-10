import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

type ToggleThemeProps = {
    checked: boolean;
    onChange: () => void;
    className?: string;
};

function ToggleTheme({ checked, onChange, className }: ToggleThemeProps) {
    return (
        <Tooltip
            title="Change Theme"
            enterDelay={1000}
            arrow
        >
            <button
                type="button"
                className={`${className}  rounded-full transition-all duration-300 ease-in-out hover:backdrop-brightness-125`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative flex items-center justify-center">
                    <input
                        type="checkbox"
                        name="Toggle Theme"
                        id="toggle-theme"
                        className="sr-only"
                        onChange={onChange}
                        aria-label="Toggle Mode"
                    />
                    <label
                        htmlFor="toggle-theme"
                        className="relative flex h-10 w-10 items-center justify-center rounded-full border text-2xl transition-all duration-300 ease-in-out hover:backdrop-brightness-75 cursor-pointer"
                    >
                        {/* Light */}
                        <MdLightMode
                            className={`absolute transition-all ${
                                checked
                                    ? 'animate-fade-out pointer-events-none'
                                    : 'animate-fade-in'
                            } `}
                        />

                        {/* Dark */}
                        <MdDarkMode
                            className={`absolute transition-all ${
                                checked
                                    ? 'animate-fade-in'
                                    : 'animate-fade-out pointer-events-none'
                            } `}
                        />
                    </label>
                </div>
            </button>
        </Tooltip>
    );
}

export default ToggleTheme;
