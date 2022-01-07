import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { uiActions } from '../../slice/uiSlice';
import {
  loginWithEmailAndPassword,
  startLoginGoogle,
} from '../../slice/usersSlice';

export const LoginScreen = () => {
  const ui = useSelector((state) => state.ui);
  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  });
  const { email, password } = formValues;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const idFormValid = () => {
    const { email, password } = formValues;
    if (email.trim().length === 0 || password.trim().length === 0) {
      dispatch(uiActions.setError('Complete all fields'));
      return false;
    } else if (validator.isEmail(email) === false) {
      dispatch(uiActions.setError('Email is not valid'));
      return false;
    }
    dispatch(uiActions.removeError());
    return true;
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (idFormValid()) {
      dispatch(uiActions.startLoading());
      dispatch(loginWithEmailAndPassword({ email, password }));
      navigate('/');
    }
  };
  const handleGoogleLogin = () => {
    dispatch(startLoginGoogle());
  };
  return (
    <>
      <h3 className='auth__title'>Login</h3>

      <form
        onSubmit={handleLogin}
        className='animate__animated animate__fadeIn animate__faster'
      >
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

        <button
          disabled={ui.isLoading}
          type='submit'
          className='btn btn-primary btn-block'
        >
          Login
        </button>

        <div className='auth__social-networks'>
          <p>Login with social networks</p>

          <div className='google-btn' onClick={handleGoogleLogin}>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to='/auth/register' className='link'>
          Create new account
        </Link>
      </form>
    </>
  );
};
