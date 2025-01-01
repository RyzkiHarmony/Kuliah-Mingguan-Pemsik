import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm ({ ...form, [name]:value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://demo-api.syaifur.io/api/register', form, { headers: { "Content-Type": "application/json" } });

            if (response.data.code === 201){
                
                Swal.fire({
                    icon: "success",
                    title: "Daftar berhasil cuy",
                    text: response.data.message
                });

                setForm({ name: '', email: '', password: '' });

                navigate('/');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Daftar gagal cuy",
                text: error.response?.data?.message || "error bjir"
            });
            
            setForm({ name: '', email: '', password: '' });
        }
    };

    return (
        <div>
            <div>
                Halaman Register
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            className="w-full px-4 py-2 border rounded-lg" 
                            type="text" 
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
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
                            type="submit">Daftar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;