// src/Pages/Admin/Mahasiswa.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { 
    fetchMahasiswa, 
    addMahasiswa, 
    updateMahasiswa, 
    deleteMahasiswa 
} from '../../redux/actions/mahasiswaActions';

const Mahasiswa = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.mahasiswa);
    const [form, setForm] = useState({
        progdi_id: '',
        nim: '',
        nama: '',
        alamat: '',
        umur: '',
    });
    const [showModalTambah, setShowModalTambah] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        dispatch(fetchMahasiswa(token));
    }, [dispatch, token]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleTambah = async (e) => {
        e.preventDefault();
        const success = await dispatch(addMahasiswa(form, token));
        if (success) {
            setForm({ progdi_id: '', nim: '', nama: '', alamat: '', umur: '' });
            setShowModalTambah(false);
        }
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        const success = await dispatch(updateMahasiswa(selectedId, form, token));
        if (success) {
            setForm({ progdi_id: '', nim: '', nama: '', alamat: '', umur: '' });
            setShowModalEdit(false);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Yakin Bang Dihapus?',
            text: 'Data yang dihapus tidak bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Iya cuy, hapus!',
            cancelButtonText: 'Batal dah',
        }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(deleteMahasiswa(id, token));
            }
        });
    };

    const handleEditOpen = (item) => {
        setForm({
            progdi_id: item.progdi_id || '',
            nim: item.nim,
            nama: item.nama,
            alamat: item.alamat,
            umur: item.umur,
        });
        setSelectedId(item.id);
        setShowModalEdit(true);
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

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
                                        onClick={() => handleEditOpen(item)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Tambah */}
            {showModalTambah && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded" onClick={(e) => e.stopPropagation()}>
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
                                type="button"
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

            {/* Modal Edit */}
            {showModalEdit && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-xl font-semibold mb-4">Edit Mahasiswa</h2>
                        <form onSubmit={handleEdit} className="mb-4">
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
                                type="button"
                                className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer mr-2"
                                onClick={() => setShowModalEdit(false)}
                            >
                                Batal
                            </button>
                            <input
                                type="submit"
                                value="Simpan"
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