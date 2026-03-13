function LoadingState({ message = "Loading..." }) {
  return (
    <div className="info-card state-card">
      <p>{message}</p>
    </div>
  );
}

export default LoadingState;