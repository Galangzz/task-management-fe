import { getTaskListByTitle } from '../services/localService';

function FormTitleList({ titleList, setTitleList, setToggleTitle, handleSubmitTitleList, err, setErr }) {
    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm"
            onClick={() => {
                setTitleList('');
                setToggleTitle(false);
            }}
        >
            <div
                className="formTitleList flex flex-col w-98 h-auto gap-6 p-4 justify-center items-center rounded-3xl border  "
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
                        onChange={(e) => {
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
                                setErr(''); // reset error kalau input kosong
                            }
                        }}
                        placeholder="Masukan Nama Daftar Baru ..."
                        maxLength={20}
                    />
                    {err && <p className="text-red-500! text-sm italic mt-1">{err}</p>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FormTitleList;
