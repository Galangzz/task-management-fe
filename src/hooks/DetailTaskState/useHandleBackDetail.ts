import { useEffect } from 'react';
export function useHandleBackDetail(isDirty: () => boolean) {
    const handleBackDetail = () => {
        if (isDirty()) {
            return window.confirm(
                'Catatan mungkin belum tersimpan, apakah kamu yakin ingin meninggalkan halaman ini?'
            );
        }
        return true;
    };

    useEffect(() => {
        const handler = (e: BeforeUnloadEvent) => {
            if (!isDirty()) return;
            e.preventDefault();
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [isDirty]);

    return { handleBackDetail };
}
