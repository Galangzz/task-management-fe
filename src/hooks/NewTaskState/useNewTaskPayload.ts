import { useCallback } from "react";

type FormProps = {
    title: string;
    detail: string;
    starred: boolean;
};

type DateTimeProps = {
    selected: Date | null;
    hasDate: boolean;
    hasTime: boolean;
};
function useNewTaskPayload(form: FormProps, dateTime: DateTimeProps) {
    return useCallback(() => {
        return {
            title: form.title.trim(),
            detail: form.detail,
            deadline:
                dateTime.hasDate && dateTime.selected
                    ? new Date(dateTime.selected)
                    : null,
            hasDate: dateTime.hasDate,
            hasTime: dateTime.hasTime,
            starred: form.starred,
            isCompleted: false,
        };
    }, [
        form.title,
        form.detail,
        form.starred,
        dateTime.hasDate,
        dateTime.hasTime,
        dateTime.selected,
    ]);
}

export default useNewTaskPayload;
