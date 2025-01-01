import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Mahasiswa = () => {
    const [data,setData] = useState([]);
    const [form, setForm] = useState({ title: '', body: '' });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', form);
            setData([...data, { ...form}]);
            setForm({title: '', body: ''});
        } catch (error) {
            setError('bang error bang');
        }
    };

    useEffect(() => {
        const ambilData = async () => {
            try {
                const response = await axios('https://jsonplaceholder.typicode.com/posts');

                setData(response.data);
            } catch (error) {
                setError('error bang');
            }
        };
        
        ambilData();
    }, []);
    
    return (
        <div>
            <div>Halaman Mahasiswa</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">nama</label>
                    <input 
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="">Alamat</label>
                    <textarea 
                        name="body"
                        value={form.body}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Kirim</button>
                </div>
            </form>
            <table>
                <tr>
                    <td>id</td>
                    <td>nama</td>
                    <td>alamat</td>
                </tr>
                {data.map((item) => (                    
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default Mahasiswa;