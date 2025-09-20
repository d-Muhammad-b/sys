import React, { useEffect, useState } from 'react';
import styles from './murojat.module.css';

const API_URL = 'https://682815d56b7628c52912205f.mockapi.io/murojaatsys';

const defaultForm = {
  name: '',
  game: '',
};

export default function murojat() {
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
      <h1 className={styles.title}>Murojat Panel</h1>
            <div className={styles.mrjt}>
            <a  href='/admin'>Qaytish</a>
            </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="game" placeholder="Game" value={form.game} onChange={handleChange} required />
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
              <th className={styles.odam}>Nomi</th>
              <th>murojat</th>
              <th className={styles.amallar}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td className={styles.odam}>{item.name}</td>
                <td>{item.message}</td>
                <td className={styles.amallar}>
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
