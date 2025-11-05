import React from 'react';
import Field from './Field';

function TaskContent({ title, task = [] }) {
    const groupedData = task.reduce((acc, item) => {
        const dateKey = item.dateDeadline ? item.dateDeadline : 'Tanpa tanggal';

        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(item.name);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedData).sort((a, b) => {
        if (a === 'Tanpa tanggal') return 1; 
        if (b === 'Tanpa tanggal') return -1;
        return a.localeCompare(b); 
    });

    const formatCustomDate = (dateString) => {
        if (dateString == 'Tanpa tanggal') return;
        const dateObj = new Date(dateString);

        const currentYear = new Date().getFullYear();
        const targetYear = dateObj.getFullYear();

        const dateOptions = {
            weekday: 'short', 
            day: 'numeric', 
            month: 'short', 
            timeZone: 'Asia/Jakarta', 
        };

        if (targetYear !== currentYear) {
            dateOptions.year = 'numeric';
        }

        let formattedDate = dateObj.toLocaleDateString('id-ID', dateOptions);

        formattedDate = formattedDate
            .replace(/\./g, '') 
            .replace(/,\s+/g, ' ') 
            .replace(/,\s*$/g, '') 
            .trim();

        const parts = formattedDate.split(/\s+/).filter((p) => p.length > 0);
        if (parts.length >= 3) {
            let result = `${parts[0]}, ${parts[1]} ${parts[2]}`;
            if (parts.length === 4) {
                // Jika tahun disertakan (tahun berbeda)
                result += ` ${parts[3]}`; // 'Jum, 7 Nov 2026'
            }
            formattedDate = result;
        }
        return formattedDate;
    };

    return (
        <Field>
            <div className="flex">
                <h1 className="font-bold text-xl tracking-wide">{title}</h1>
            </div>
            <div className="flex flex-col">
                {sortedDates.map((date) => (
                    <div key={date}>
                        <h2 className="font-bold text-lg mb-1">📅 {formatCustomDate(date)}</h2>
                        <ul className="ml-4 list-disc">
                            {groupedData[date].map((nama, idx) => (
                                <li key={idx}>{nama}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Field>
    );
}

export default TaskContent;
