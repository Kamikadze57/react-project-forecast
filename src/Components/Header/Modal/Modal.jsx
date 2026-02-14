import { useState } from "react";

const Modal = ({ onClose, onSuccess }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSignUp = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a username");
      return;
    }
    localStorage.setItem("userName", inputValue);
    onSuccess(inputValue);
  };

  return (
    <>
      <div className="modal__backdrop">
        <div className="modal__body">
          <h6 className="modal__title">Sign Up</h6>
          <button className="modal-close__btn" onClick={onClose}>
            x
          </button>
          <form className="modal__form" onSubmit={(e) => e.preventDefault()}>
            <label className="modal-form__label">
              <p className="modal-form__text">Username</p>
              <input className="modal-form__input input" placeholder="Username" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            </label>
            <label className="modal-form__label">
              <p className="modal-form__text">E-Mail</p>
              <input className="modal-form__input input" placeholder="E-Mail" />
            </label>
            <label className="modal-form__label">
              <p className="modal-form__text">Password</p>
              <input className="modal-form__input input" placeholder="Password" type="password" />
            </label>
          </form>
          <button className="modal-form__btn button" onClick={handleSignUp}>
            Sign Up
          </button>
          <p className="modal__text">
            Already have an account?<span> </span>
            <a className="modal__link" href="#">
              Log In
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Modal;
