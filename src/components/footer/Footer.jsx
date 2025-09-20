import styles from './footer.module.css'

function Footer() {
  return (
    <div className={styles.Footer}>
    <div className={styles.ota}>
      <div>
      <p>sovoliz bormi?</p>
      <p>qaysidur server ip moskelmadimi?</p>
      <p>Biz bilan bog'lanish uchun</p>
      <p>Agar sizham yahshi server bilsez</p>
      </div>
      <div>
        <h3>murojat uchun shu sahifga oting</h3>
      </div>
      <div>
        <a className={styles.aa} href="login">murojat sahifasi</a>
      </div>

    </div>
    </div>
  )
}

export default Footer