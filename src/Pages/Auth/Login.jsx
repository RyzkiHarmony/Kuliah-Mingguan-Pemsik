import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";
import Swal from "sweetalert2";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await dispatch(loginUser(form));
        
        if (success) {
            setForm({ email: '', password: '' });
            navigate('/admin');
        }
    };

    return (
        <div>
            <div>Halaman Login</div>
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
