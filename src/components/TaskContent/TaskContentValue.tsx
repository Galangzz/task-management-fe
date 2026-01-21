import React from 'react';

function TaskContentValue({
    title,
    detail,
    hasTime,
    deadline,
}: {
    title: string | null;
    detail: string | null;
    hasTime: boolean;
    deadline: Date | null;
}) {
    const t = { title, detail, hasTime };

    const formatDeadlineTaskValue = (deadline: Date | null) => {
        if (!deadline) return null;
        const today = new Date();
        const d = new Date(deadline);

        if (
            d.getFullYear() < today.getFullYear() ||
            (d.getFullYear() === today.getFullYear() &&
                d.getMonth() <= today.getMonth() &&
                d.getDate() < today.getDate())
        ) {
            const day = today.getDate() - d.getDate();
            const month =
                (today.getFullYear() - d.getFullYear()) * 12 +
                today.getMonth() -
                d.getMonth();
            if (month > 0) {
                if (Math.floor(month / 12) > 0) {
                    return `${String(Math.floor(month / 12))} tahun yang lalu`;
                } else {
                    return `${String(month)} bulan yang lalu`;
                }
            } else {
                if (day > 7) {
                    return `${String(Math.floor(day / 7))} minggu yang lalu`;
                }
                return `${String(day)} hari yang lalu`;
            }
        }
        return `${String(d.getHours()).padStart(2, '0')}:${String(
            d.getMinutes()
        ).padStart(2, '0')}`;
    };

    const dl = formatDeadlineTaskValue(deadline);
    return (
        <>
            <p className="text-fluid-sm font-semibold">{t.title}</p>
            {t.detail && (
                <p className="ml-2! line-clamp-2 w-full max-w-sm break-all">
                    {t.detail}
                </p>
            )}
            {t.hasTime && (
                <div className="ml-2! flex w-fit items-center justify-center font-bold opacity-90 border-t px-2!">
                    {dl && dl}
                </div>
            )}
        </>
    );
}

export default TaskContentValue;
