import React, { useState, useEffect } from "react";

export default function ModalForm({ isOpen, onClose, onSubmit, fields, initialData }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "20px",
    zIndex: 1000,
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 999
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <div key={f.name} style={{ marginBottom: "10px" }}>
              <label>{f.label}</label>
              <input
                name={f.name}
                type={f.type || "text"}
                value={form[f.name] || ""}
                onChange={handleChange}
                required={f.required || false}
                style={{ width: "100%", padding: "5px" }}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
        </form>
      </div>
    </>
  );
}
