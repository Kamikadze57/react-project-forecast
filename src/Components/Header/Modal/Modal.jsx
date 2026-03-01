import { useState } from "react";

const Modal = ({ onClose, onSuccess }) => {
  // Об'єкт для всіх значень
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Стан для відстеження помилок для кожного інпуту
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Оновлення значення в об'єкті values
    setValues((prev) => ({ ...prev, [name]: value }));

    // Якщо була помилка, прибираємо її при введенні тексту
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSignUp = () => {
    // Валідація: перевірка на пусті поля
    const newErrors = {
      username: values.username.trim() === "",
      email: values.email.trim() === "",
      password: values.password.trim() === "",
    };

    setErrors(newErrors);

    // Якщо є хоча б одна помилка - ретурн
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    // Ім'я користувача з об'єкта
    localStorage.setItem("userName", values.username);
    onSuccess(values.username);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal__backdrop" onClick={handleBackdropClick}>
      <div className="modal__body">
        <h6 className="modal__title">Sign Up</h6>
        <button className="modal-close__btn" onClick={onClose}>
          x
        </button>

        <form className="modal__form" onSubmit={(e) => e.preventDefault()}>
          <label className="modal-form__label">
            <p className="modal-form__text">Username</p>
            <input
              name="username"
              className={`modal-form__input input ${errors.username ? "input--error" : ""}`}
              placeholder={errors.username ? "Please enter a username!" : "Username"}
              value={values.username}
              onChange={handleChange}
            />
          </label>

          <label className="modal-form__label">
            <p className="modal-form__text">E-Mail</p>
            <input
              name="email"
              className={`modal-form__input input ${errors.email ? "input--error" : ""}`}
              placeholder={errors.email ? "Please enter an e-mail!" : "E-Mail"}
              value={values.email}
              onChange={handleChange}
            />
          </label>

          <label className="modal-form__label">
            <p className="modal-form__text">Password</p>
            <input
              name="password"
              type="password"
              className={`modal-form__input input ${errors.password ? "input--error" : ""}`}
              placeholder={errors.password ? "Please enter a password!" : "Password"}
              value={values.password}
              onChange={handleChange}
            />
          </label>
        </form>

        <button className="modal-form__btn button" onClick={handleSignUp}>
          Sign Up
        </button>

        <p className="modal__text">
          Already have an account? <span> </span>
          <a className="modal__link" href="#">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Modal;
