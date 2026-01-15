export function passwordChecker(password: string, repeatPassword: string) {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

    if (!passwordRegex.test(password)) {
        return {
            err: 'Password minimal 8 karakter, mengandung huruf besar, kecil, angka, dan simbol',
        };
    }

    if (password !== repeatPassword) {
        return {
            err: 'Password dan Repeat Password harus sama',
        };
    }

    return {
        err: null,
    };
}

export function emailChecker(email: string) {
    const comEmailRegex = /^[^\s@]+@[^\s@]+\.com$/i;

    if (!comEmailRegex.test(email.trim())) {
        return {
            err: 'Email tidak valid. contoh: user@gmail.com',
        };
    }

    return { err: null };
}
