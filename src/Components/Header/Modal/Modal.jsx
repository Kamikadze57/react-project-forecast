const Modal = ({}) => {
  return (
    <>
      <div className="modal__backdrop">
        <div className="modal__body">
          <h6 className="modal__title">Sign Up</h6>
          <form className="modal__form">
            <label>
              <p className="modal-form__text">Username</p>
              <input className="modal-form__input" placeholder="Username" />
            </label>
            <label>
              <p className="modal-form__text">E-Mail</p>
              <input className="modal-form__input" placeholder="E-Mail" />
            </label>
            <label>
              <p className="modal-form__text">Password</p>
              <input className="modal-form__input" placeholder="Password" />
            </label>
          </form>
          <button className="modal-form__btn">Sign Up</button>
          <p className="modal__text">
            Already have an account?
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
