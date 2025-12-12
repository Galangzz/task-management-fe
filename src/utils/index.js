const formatCustomDate = (dateString) => {
    if (dateString === '') return 'Tanpa tanggal';
    const dateObj = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (tomorrow.toLocaleDateString() === dateObj.toLocaleDateString()) return 'Besok';
    if (today.toLocaleDateString() === dateObj.toLocaleDateString()) return 'Hari ini';
    if (today.toLocaleDateString() > dateObj.toLocaleDateString()) return 'Terlewat';

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

    formattedDate = formattedDate.replace(/\./g, '').replace(/,\s+/g, ' ').replace(/,\s*$/g, '').trim();

    const parts = formattedDate.split(/\s+/).filter((p) => p.length > 0);
    if (parts.length >= 3) {
        let result = `${parts[0]}, ${parts[1]} ${parts[2]}`;
        if (parts.length === 4) {
            result += ` ${parts[3]}`;
        }
        formattedDate = result;
    }
    return formattedDate;
};

export { formatCustomDate };
