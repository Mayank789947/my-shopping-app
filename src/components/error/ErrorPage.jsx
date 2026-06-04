import styles from "/src/components/error/ErrorPage.module.css"

function ErrorPage({ title, message }) {

  const errorMessage =
    message || "Something unexpected happened.";

  return (
    <>
      <div className={styles.errorContainer}>
        <div className={styles.icon}>⚠️</div>
        <h2>{title}</h2>
        <p className={styles.errorMsg}>{message}</p>
        <p>Try Again later</p>
      </div>
    </>
  )
}

export default ErrorPage