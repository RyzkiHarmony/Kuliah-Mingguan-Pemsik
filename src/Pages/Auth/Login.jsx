import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
    const navigate = useNavigate(); 
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://demo-api.syaifur.io/api/login',
                form,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.code === 200) {
                // Ambil token dari response.data.data.token
                const { token } = response.data.data;

                // Simpan token di localStorage
                localStorage.setItem('authToken', token);

                Swal.fire({
                    icon: "success",
                    title: "Login berhasil cuy",
                    text: response.data.message
                });

                setForm({ email: '', password: '' });
                
                // Arahkan ke halaman admin
                navigate('/admin'); 
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login gagal cuy",
                text: error.response?.data?.message || "Terjadi kesalahan pada sistem"
            });

            setForm({ email: '', password: '' });
        }
    };

    return (
        <div>
            <div>
                Halaman Login
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg" 
                            type="email" 
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            className="w-full px-4 py-2 border rounded-lg"
                            type="password" 
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            type="submit">Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
