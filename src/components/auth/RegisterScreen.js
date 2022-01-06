import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { uiActions } from '../../slice/uiSlice';
import { registerWithEmailAndPassword } from '../../slice/usersSlice';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { msgError } = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    name: 'anthony',
    email: 'logan@gmail.com',
    password: '123456',
    password2: '123456',
  });
  const { name, email, password, password2 } = formValues;

  const idFormValid = () => {
    const { name, email, password, password2 } = formValues;
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      password2.trim().length === 0
    ) {
      dispatch(uiActions.setError('Complete all fields'));
      return false;
    } else if (validator.isEmail(email) === false) {
      dispatch(uiActions.setError('Email is not valid'));
      return false;
    } else if (password !== password2 || password.length < 6) {
      dispatch(
        uiActions.setError(
          'Password is not valid, Password should at least 6 characters and match each other'
        )
      );
      return false;
    }
    dispatch(uiActions.removeError());
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (idFormValid()) {
      dispatch(registerWithEmailAndPassword({ email, password, name }));
      navigate('/');
    }
  };
  return (
    <>
      <h3 className='auth__title'>Register</h3>

      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          className='auth__input'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />

        <input
          type='text'
          placeholder='Email'
          name='email'
          className='auth__input'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />

        <input
          type='password'
          placeholder='Password'
          name='password'
          className='auth__input'
          value={password}
          onChange={handleInputChange}
        />

        <input
          type='password'
          placeholder='Confirm password'
          name='password2'
          className='auth__input'
          value={password2}
          onChange={handleInputChange}
        />
        {msgError && <div className='auth__alert-error'>{msgError}</div>}

        <button
          type='submit'
          className='btn btn-primary btn-block mb-5'
          onClick={handleRegister}
        >
          Register
        </button>

        <Link to='/auth/login' className='link'>
          Already registered?
        </Link>
      </form>
    </>
  );
};
