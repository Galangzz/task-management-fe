import { useCallback } from "react";

type FormProps = {
    title: string | null;
    detail: string;
    starred: boolean;
};

type DateTimeProps = {
    deadline: Date | null;
    hasDate: boolean;
    hasTime: boolean;
};
function useNewTaskPayload(form: FormProps, dateTime: DateTimeProps) {
    return useCallback(() => {
        return {
            title: form.title?.trim() || '',
            detail: form.detail,
            deadline:
                dateTime.hasDate && dateTime.deadline
                    ? new Date(dateTime.deadline)
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
        dateTime.deadline,
    ]);
}

export default useNewTaskPayload;
