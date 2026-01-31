import React, { useEffect, useState } from 'react';
import styles from './admin.module.css';
import { Link } from 'react-router-dom';

const API_URL = 'https://682815d56b7628c52912205f.mockapi.io/sys';

const defaultForm = {
  name: '',
  info: '',
  type: '',
  img: '',
  game: '',
  ip: ''
};

export default function Admin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(API_URL);
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      fetchData();
      setForm(defaultForm);
      setEditingId(null);
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Rostdan ham o‘chirmoqchimisiz?');
    if (!confirm) return;

    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    fetchData();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>
      <div className={styles.mrjt}>
      <Link to='/murojat'>Murojatla</Link>
      <Link to='/'>Bosh sahifaga qaytiah</Link>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="info" placeholder="Info" value={form.info} onChange={handleChange} required />
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
        <input name="img" placeholder="Image URL" value={form.img} onChange={handleChange} required />
        <input name="game" placeholder="Game" value={form.game} onChange={handleChange} required />
        <input name="ip" placeholder="IP Address" value={form.ip} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Yangilash' : 'Qo‘shish'}</button>
        {editingId && (
          <button type="button" onClick={() => { setForm(defaultForm); setEditingId(null); }}>
            Bekor qilish
          </button>
        )}
      </form>

      {loading ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rasm</th>
              <th>Nomi</th>
              <th>Info</th>
              <th>Tur</th>
              <th>O'yin</th>
              <th>IP</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>
                  <img src={item.img} alt={item.name} className={styles.image} />
                </td>
                <td>{item.name}</td>
                <td>{item.info}</td>
                <td>{item.type}</td>
                <td>{item.game}</td>
                <td>{item.ip}</td>
                <td>
                  <button onClick={() => handleEdit(item)} className={styles.editBtn}>✏️</button>
                  <button onClick={() => handleDelete(item.id)} className={styles.deleteBtn}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
