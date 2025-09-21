import styles from './header.module.css'

function Header() {
  return (
    <div className={styles.bg}>
        <header >
          <div className={styles.top}>
          <img src="./Logo.png" alt="" />
          <h1 className={styles.sys}>Seek Your Server</h1>
          <select name="" id="">
            <option value="ru">ruscha</option>
            <option value="uz">ozbekcha</option>
          </select>
          </div>
        </header>
    </div>
  )
}

export default Header