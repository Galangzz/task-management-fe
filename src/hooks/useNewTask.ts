import useCloseConfirmation from './NewTaskState/useCloseConfirmation.js';
import useNewTaskPayload from './NewTaskState/useNewTaskPayload.js';
import useNewTaskSubmit from './NewTaskState/useNewTaskSubmit.js';
import useTaskDateTime from './NewTaskState/useTaskDateTime.js';
import useTaskForm from './NewTaskState/useTaskForm.js';

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
