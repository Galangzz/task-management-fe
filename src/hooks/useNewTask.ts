import useCloseConfirmation from './NewTaskState/useCloseConfirmation.js';
import useNewTaskPayload from './NewTaskState/useNewTaskPayload.js';
import useNewTaskSubmit from './NewTaskState/useNewTaskSubmit.js';
import useTaskDateTime from './useTaskDateTime.js';
import useTaskForm from './NewTaskState/useTaskForm.js';

function useNewTask(tabId: string) {
    const form = useTaskForm();
    const dateTime = useTaskDateTime(null);
    const buildPayload = useNewTaskPayload(form, {
        deadline: dateTime.deadline.value,
        hasDate: dateTime.hasDate,
        hasTime: dateTime.hasTime,
    });
    const submit = useNewTaskSubmit(buildPayload, form.resetForm, tabId);
    const confirm = useCloseConfirmation(form.title, dateTime.hasDate);

    return {
        form,
        dateTime,
        submit,
        confirm,
    };
}

export default useNewTask;
