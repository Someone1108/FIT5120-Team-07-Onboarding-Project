function ErrorState({ message, onRetry }) {
  return (
    <div className="info-card state-card error-card">
      <p>{message || "Something went wrong."}</p>
      {onRetry && (
        <button className="primary-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export default ErrorState;