function FormTitleList({ titleList, setTitleList, setToggleTitle }) {
    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 backdrop-blur-sm"
            onClick={()=> setToggleTitle(false)}
        >
            <div
                className="formTitleList flex flex-col w-98 h-auto gap-6 p-4 justify-center items-center rounded-3xl border  "
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Masukan Nama Daftar Baru</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // handleSubmit();
                    }}
                    className="flex flex-col gap-2"
                >
                    <input
                        type="text"
                        value={titleList}
                        className=" border rounded-xl p-2"
                        onChange={(e) => setTitleList(e.target.value)}
                        placeholder="Masukan Nama Daftar Baru ..."
                        maxLength={20}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FormTitleList;
