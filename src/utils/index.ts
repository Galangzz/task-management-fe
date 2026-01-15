const formatCustomDate = (dateString: string)=> {
    const specialLabels: Record<string, string> = {
        TERLEWAT: 'Terlewat',
        HARI_INI: 'Hari ini',
        BESOK: 'Besok',
        TANPA_TANGGAL: 'Tanpa tanggal',
    };

    if (dateString in specialLabels) {
        return specialLabels[dateString] as string;
    }

    const parts = dateString.split('/').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
        return 'Format tanggal salah';
    }

    const [month, day, year] = parts;
    const dateObj = new Date(year!, month! - 1, day);

    const currentYear = new Date().getFullYear();
    const targetYear = dateObj.getFullYear();

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: 'Asia/Jakarta',
        ...(targetYear !== currentYear && { year: 'numeric' }),
    };


    const formatter = new Intl.DateTimeFormat('id-ID', dateOptions);
    let formattedDate = formatter.format(dateObj);

    return formattedDate.replace(/\./g, '');
};

export { formatCustomDate };
