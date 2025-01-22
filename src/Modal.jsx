import React from "react";

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2>توضیحات توزیع‌ها</h2>
        <p>
          در اینجا شما می‌توانید انواع توزیع‌های احتمالی را مشاهده کنید. هر توزیع شامل فرمول ریاضی و نمودار مربوطه است.
          {/* برای هر توزیع فرمول‌های ریاضی و توضیحات را اضافه کنید */}
        </p>
        <button onClick={onClose} style={closeButtonStyles}>بستن</button>
      </div>
    </div>
  );
}

const modalStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "50%",
};

const closeButtonStyles = {
  padding: "10px 20px",
  marginTop: "20px",
};

export default Modal;
