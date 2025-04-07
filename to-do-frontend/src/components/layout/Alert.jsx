"use client"
// displaying alert on close 
const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      {message}
      {onClose && (
        <button onClick={onClose} style={{ float: "right", background: "none", border: "none", cursor: "pointer" }}>
          &times;
        </button>
      )}
    </div>
  )
}

export default Alert

