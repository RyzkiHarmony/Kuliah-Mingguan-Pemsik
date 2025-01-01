import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Hapus token dari localStorage
        navigate('/'); // Arahkan ke halaman login
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex">
                <aside className="w-64 bg-indigo-900 text-white min-h-screen">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold">Admin Panel</h1>
                        <nav className="mt-4">
                            <ul>
                                <li className="py-1 px-4 hover:bg-indigo-700">
                                    <a href="/admin">Dashboard</a>
                                </li>
                                <li className="py-1 px-4 hover:bg-indigo-700">
                                    <a href="/admin/mahasiswa">Mahasiswa</a>
                                </li>
                                <li className="py-1 px-4 hover:bg-indigo-700">
                                    <a href="#">Setting</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>

                <div className="flex flex-1 flex-col bg-blue-50">
                    <header className="bg-white shadow p-4">
                        <div className="flex justify-end">
                            <button
                                onClick={handleLogout}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800"
                            >
                                Log out
                            </button>
                        </div>
                    </header>

                    <main className="flex-grow p-4">
                        <Outlet />
                    </main>

                    <footer className="bg-indigo-900 p-4 text-white text-center">
                        &copy; Rizki Harmony
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
