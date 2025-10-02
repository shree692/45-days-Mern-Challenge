import React, { useState } from 'react';
import './ContactForm.css'; // Import the CSS

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';
    if (name === 'name' && value.trim() === '') errorMsg = 'Name is required';
    if (name === 'email') {
      if (!value) errorMsg = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = 'Email is invalid';
    }
    if (name === 'message' && value.trim() === '') errorMsg = 'Message cannot be empty';

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    const hasErrors = Object.values(errors).some((err) => err !== '');
    if (!hasErrors) {
      console.log('Form Submitted:', formData);
      setSuccess('Your message has been sent!');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setSuccess('');
    }
  };

  return (
    <div className="contact-form-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <p className="error">{errors.message}</p>}

        <button type="submit">Send</button>
      </form>

      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default ContactForm;
