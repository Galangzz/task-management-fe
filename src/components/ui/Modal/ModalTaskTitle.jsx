import { CgSpinnerTwo } from 'react-icons/cg';
// import { getTaskListByTitle } from '../../../services/localService';
import Modal from './Modal';

function ModalTaskTitle({
    titleList,
    setTitleList,
    setToggleTitle,
    handleSubmitTitleList,
    err,
    setErr,
    isLoading,
    tabs,
}) {
    console.log({err})
    const handleOnChange = (e) => {
        const value = e.target.value;
        setTitleList(value);
        if (value.trim() !== '') {
            const tabSet = new Set(tabs);
            const check = tabSet.has(value.trim());
            if (check) {
                setErr({ message: 'Judul task List tidak boleh duplikat' });
            } else {
                setErr(null);
            }
        } else {
            setErr(null);
        }
    };

    return (
        <Modal setToggle={() => setToggleTitle(false)}>
            <div
                className="ModalTaskTitle animate-fade-in mx-2! flex h-auto w-sm flex-col items-center justify-center gap-6 rounded-3xl bg-(--background-header) p-6!"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="text-md relative w-full text-center tracking-widest after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-(--background-color) after:content-['']">
                    Masukan Nama Daftar Baru
                </h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (err) setErr('');
                        handleSubmitTitleList();
                    }}
                    className="flex w-full flex-col gap-6"
                >
                    <input
                        type="text"
                        value={titleList}
                        className="rounded-xl border-none p-2! backdrop-invert-25 focus:outline-0"
                        onChange={handleOnChange}
                        placeholder="Masukan Nama Daftar Baru ..."
                        maxLength={25}
                    />
                    {err && (
                        <p className="text-sm text-red-500! italic">
                            {err.message}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="flex w-1/2 justify-center self-end rounded-full bg-(--button-text) p-1! transition-all! duration-300 ease-in-out hover:scale-102 hover:brightness-125! disabled:opacity-50 hover:disabled:scale-100! hover:disabled:bg-(--button-text)!"
                        disabled={titleList === '' || err !== null}
                    >
                        {isLoading ? (
                            <CgSpinnerTwo
                                className="flex animate-spin"
                                size={25}
                            />
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
