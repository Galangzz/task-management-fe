const formatCustomDate = (dateString) => {
    if (dateString === 'TERLEWAT') return 'Terlewat';
    if (dateString === 'HARI_INI') return 'Hari ini';
    if (dateString === 'BESOK') return 'Besok';
    if (dateString === 'TANPA_TANGGAL') return 'Tanpa tanggal';
    const [month, day, year] = dateString.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);

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
            result += ` ${parts[3]}`;
        }
        formattedDate = result;
    }
    return formattedDate;
};

export { formatCustomDate };
