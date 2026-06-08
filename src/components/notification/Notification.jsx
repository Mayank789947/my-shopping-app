import styles from "/src/components/notification/Notification.module.css"


function Notification({ notification }) {
  if (!notification) return null;

  const { message, type } = notification;

  const icons = {
    success: "✓",
    error: "🗑",
    info: "ℹ",
  };

  return (
    <div
      className={`
        ${styles.notification}
        ${styles.show}
        ${styles[type]}
      `}
    >
      <span className={styles.icon}>
        {icons[type] || "✓"}
      </span>

      <span className={styles.message}>
        {message}
      </span>
    </div>
  );
}

export default Notification;