import useCloseConfirmation from './useCloseConfirmation.js';
import useNewTaskPayload from './useNewTaskPayload.js';
import useNewTaskSubmit from './useNewTaskSubmit.js';
import useTaskDateTime from './useTaskDateTime.js';
import useTaskForm from './useTaskForm.js';

function useNewTask() {
    const form = useTaskForm();
    const dateTime = useTaskDateTime();
    const buildPayload = useNewTaskPayload(form, dateTime);
    const submit = useNewTaskSubmit(buildPayload, form.resetForm);
    const confirm = useCloseConfirmation(form.title, dateTime.hasDate);

    return {
        form,
        dateTime,
        submit,
        confirm,
    };
}

export default useNewTask;
