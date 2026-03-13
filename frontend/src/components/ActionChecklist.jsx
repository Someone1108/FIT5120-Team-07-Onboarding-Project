function ActionChecklist({ actions = [] }) {
  return (
    <div className="info-card">
      <h3>Recommended protection</h3>
      <ul className="tip-list">
        {actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
}

export default ActionChecklist;