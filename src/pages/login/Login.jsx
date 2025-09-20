

import { useRef, useState } from 'react';
import styles from './login.module.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const nameRef = useRef(null);
  const messageRef = useRef(null);
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate();

  function saqla() {
    const name = nameRef.current.value.trim();
    const message = messageRef.current.value.trim();

    if (!name || !message) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    fetch("https://682815d56b7628c52912205f.mockapi.io/murojaatsys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        message: message
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Ma'lumot saqlandi:", data);
      alert("Murojaatingiz yuborildi!");
      nameRef.current.value = '';
      messageRef.current.value = '';
    })
    .catch(error => {
      console.error("Xatolik yuz berdi:", error);
      alert("Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.");
    });
  }

  function tekshir() {
    const val = nameRef.current.value.trim();
    if (val === "admn") {
      setShowPanel(true);
      navigate("/admin");
    } else {
      saqla();
    }
  }

  return (
    <div>
      <div className={styles.bglogin}>
        <h1>Murojaat qilishdan avval shaxsni tasdiqlang</h1>

        <input
          type="text"
          ref={nameRef}
          className={styles.inpt}
          placeholder="Ismingizni kiriting"
        />

        <input
          type="text"
          ref={messageRef}
          className={styles.inpt}
          placeholder="Bizga aytmoqchi bo‘lgan ma’lumotni kiriting"
        />

        <button onClick={tekshir}>Yuborish</button>
        <br />
        <Link to="/" className={styles.panel}>Qaytish</Link>

        {showPanel && (
          <Link to="/admin" className={styles.panel}>
            Admin panel
          </Link>
        )}
      </div>
    </div>
  );
}

export default Login;
