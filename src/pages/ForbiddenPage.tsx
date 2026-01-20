import React, { useContext } from 'react';

import ForbiddenImgLight from '../assets/forbidden_light.svg';
import ForbiddenImgDark from '../assets/forbidden_dark.svg';
import { ThemeContext } from '../context/Theme.js';
import { motion } from 'framer-motion';

function ForbiddenPage() {
    const { theme } = useContext(ThemeContext);
    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center text-center">
            <h1 className="text-fluid-6xl animate-float font-bold delay-5000!">
                Forbidden
            </h1>
            <motion.img
                src={theme === 'dark' ? ForbiddenImgDark : ForbiddenImgLight}
                alt="Forbidden"
                className="mx-auto flex aspect-3/4 max-h-80 min-h-36 w-full max-w-sm flex-col items-center justify-center gap-8 md:max-h-80 lg:max-h-102 pointer-events-none select-none"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 0.9, 0.8] }}
                transition={{
                    ease: 'easeInOut',
                    repeat: Infinity,
                    duration: 3,

                }}
            />
            <p className='text-fluid-md tracking-widest font-semibold'>Anda tidak memiliki akses ke halaman ini</p>
            <p className='text-fluid-md tracking-widest font-semibold'>Anda dapat kembali ke halaman utama</p>
        </div>
    );
}

export default ForbiddenPage;
