import axios from "axios";
import { useEffect, useState } from "react";

const Mahasiswa = () => {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        progdi_id: '',
        nim: '',
        nama: '',
        alamat: '',
        umur: '',
    });
    const [error, setError] = useState(null);
    const [showModalTambah, setShowModalTambah] = useState(false);

    const token = localStorage.getItem('authToken');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleTambah = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://demo-api.syaifur.io/api/mahasiswa',
                form,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData([...data, response.data.data]);
            setForm({ progdi_id: '', nim: '', nama: '', alamat: '', umur: '' });
            setShowModalTambah(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Terjadi kesalahan saat menambahkan data.');
        }
    };

    useEffect(() => {
        const ambilData = async () => {
            try {
                const response = await axios.get('http://demo-api.syaifur.io/api/mahasiswa', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setData(response.data.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Terjadi kesalahan saat mengambil data.');
            }
        };

        ambilData();
    }, [token]);

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">List Mahasiswa</h2>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                    onClick={() => setShowModalTambah(true)}
                >
                    Tambah
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 w-10">ID</th>
                            <th className="border p-2 w-40">Nama</th>
                            <th className="border p-2 w-56">Alamat</th>
                            <th className="border p-2 w-32">Program Studi</th>
                            <th className="border p-2 w-20">Umur</th>
                            <th className="border p-2 w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td className="border p-2 text-center">{item.id}</td>
                                <td className="border p-2">{item.nama}</td>
                                <td className="border p-2">{item.alamat}</td>
                                <td className="border p-2">{item.progdi?.nama || 'Tidak ada'}</td>
                                <td className="border p-2 text-center">{item.umur}</td>
                                <td className="border p-2 text-center">
                                    <button
                                        className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModalTambah && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
                    onClick={() => setShowModalTambah(false)}
                >
                    <div
                        className="bg-white p-6 rounded"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">Tambah Mahasiswa</h2>
                        <form onSubmit={handleTambah} className="mb-4">
                            <input
                                value={form.progdi_id}
                                onChange={handleInput}
                                type="text"
                                name="progdi_id"
                                placeholder="Masukkan ID Program Studi"
                                className="w-full px-4 py-2 border rounded-lg mb-2"
                            />
                            <input
                                value={form.nim}
                                onChange={handleInput}
                                type="text"
                                name="nim"
                                placeholder="Masukkan NIM"
                                className="w-full px-4 py-2 border rounded-lg mb-2"
                            />
                            <input
                                value={form.nama}
                                onChange={handleInput}
                                type="text"
                                name="nama"
                                placeholder="Masukkan Nama"
                                className="w-full px-4 py-2 border rounded-lg mb-2"
                            />
                            <input
                                value={form.alamat}
                                onChange={handleInput}
                                type="text"
                                name="alamat"
                                placeholder="Masukkan Alamat"
                                className="w-full px-4 py-2 border rounded-lg mb-2"
                            />
                            <input
                                value={form.umur}
                                onChange={handleInput}
                                type="number"
                                name="umur"
                                placeholder="Masukkan Umur"
                                className="w-full px-4 py-2 border rounded-lg mb-2"
                            />
                            <button
                                type="batal"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer mr-2"
                                onClick={() => setShowModalTambah(false)}
                            >
                                Batal
                            </button>
                            <input
                                type="submit"
                                value="Tambah"
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mahasiswa;
