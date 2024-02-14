import { useState } from 'react';
import Base from '../core/Base';
import { Navigate } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth/helper';

const Signin = () => {
  const [values, setValues] = useState({
    email: 'tanay@tanay.com',
    password: 'tanay@tanay.com',
    loading: false,
    didRedirect: false,
    error: '',
  });

  const { email, password, loading, didRedirect, error } = values;

  const { user } = isAuthenticated();

  const errorMessage = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <div
            className='alert alert-danger'
            style={{ display: error ? '' : 'none' }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className='alert alert-info'>
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues(
      {
        ...values,
        error: false,
        loading: true,
      },
      signin({ email, password })
        .then((data) => {
          if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
          } else {
            authenticate(data, () => {
              setValues({ ...values, didRedirect: true });
            });
          }
        })
        .catch(console.log('Unable to signin'))
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to='/admin/dashboard' />;
      } else {
        return <Navigate to='/user/dashboard' />;
      }
    }
    if (isAuthenticated) {
      return <redirect to='/' />;
    }
  };

  const signInForm = () => {
    return (
      <div className='row'>
        <div className='col-md-6 offset-sm-3 text-left'>
          <form>
            <div className='form-group'>
              <label className='text-light'>Email</label>
              <input
                value={email}
                onChange={handleChange('email')}
                className='form-control'
                type='email'
              />
            </div>
            <div className='form-group mt-2'>
              <label className='text-light'>Password</label>
              <input
                onChange={handleChange('password')}
                value={password}
                className='form-control'
                type='password'
              />
            </div>
            <button
              onClick={handleSubmit}
              className='btn btn-success form-control mt-2 btn-block'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base
      title='Sign In page'
      description='A Page for user to signin!!'
    >
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className='text-white text-center'>{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
