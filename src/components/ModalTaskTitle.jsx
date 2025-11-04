import { getTaskListByTitle } from '../services/localService';
import Modal from './Modal';

function ModalTaskTitle({ titleList, setTitleList, setToggleTitle, handleSubmitTitleList, err, setErr }) {
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
        <Modal setToggle={setToggleTitle}>
            <div
                className="ModalTaskTitle flex flex-col w-98 h-auto gap-6 p-4 justify-center items-center rounded-3xl border  "
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
                        className=" border rounded-xl p-2"
                        onChange={handleOnChange}
                        placeholder="Masukan Nama Daftar Baru ..."
                        maxLength={20}
                    />
                    {err && <p className="text-red-500! text-sm italic mt-1">{err}</p>}
                    <button
                        type="submit"
                        className="disabled:opacity-50 hover:disabled:transform-none! hover:disabled:bg-(--button-color)!"
                        disabled={titleList === '' || err !== ''}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Modal>
    );
}

export default ModalTaskTitle;
