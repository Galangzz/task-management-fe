import { CgSpinnerTwo } from 'react-icons/cg';
import { getTaskListByTitle } from '../../services/localService';
import Modal from '../ui/Modal';

function ModalTaskTitle({
    titleList,
    setTitleList,
    setToggleTitle,
    handleSubmitTitleList,
    err,
    setErr,
    isLoading,
}) {
    const handleOnChange = (e) => {
        const value = e.target.value;
        setTitleList(value);
        if (value.trim() !== '') {
            const check = getTaskListByTitle(value);
            if (check) {
                setErr('Judul task List tidak boleh duplikat');
            } else {
                setErr('');
            }
        } else {
            setErr('');
        }
    };

    return (
        <Modal setToggle={() => setToggleTitle(false)}>
            <div
                className="ModalTaskTitle flex h-auto w-98 flex-col items-center justify-center gap-6 rounded-3xl border bg-(--background-header) p-4!"
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Masukan Nama Daftar Baru</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (err) setErr('');
                        handleSubmitTitleList();
                    }}
                    className="flex flex-col gap-2"
                >
                    <input
                        type="text"
                        value={titleList}
                        className="rounded-xl border p-2!"
                        onChange={handleOnChange}
                        placeholder="Masukan Nama Daftar Baru ..."
                        maxLength={20}
                    />
                    {err && (
                        <p className="mt-1 text-sm text-red-500! italic">
                            {err}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="flex justify-center rounded-xl border border-(--border-color) bg-(--button-color) p-0.5! transition-all! duration-300 ease-in-out hover:scale-102 hover:bg-(--button-color-hover) disabled:opacity-50 hover:disabled:transform-none! hover:disabled:bg-(--button-color)!"
                        disabled={titleList === '' || err !== ''}
                    >
                        {isLoading ? (
                            <CgSpinnerTwo className="flex animate-spin" />
                        ) : (
                            'Submit'
                        )}
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default ModalTaskTitle;
