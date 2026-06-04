import styles from "/src/components/loading/Loading.module.css"

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div data-testid="loading-spinner" className={styles.spinner}>
      </div>
      <p>Loading...</p>
    </div>
  );
}

export default Loading