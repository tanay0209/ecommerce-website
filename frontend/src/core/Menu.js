import { Link, useNavigate } from 'react-router-dom';
import withRouter from '../withRouter';
import { isAuthenticated, signout } from '../auth/helper';

const currentTab = (history, path) => {
  if (window.location.pathname === path) {
    return {
      color: '#2ecc72',
    };
  } else {
    return {
      color: '#ffffff',
    };
  }
};

const Menu = ({ history }) => {
  const navigation = useNavigate();
  return (
    <div>
      <ul className='nav nav-tabs bg-dark'>
        <li className='nav-item'>
          <Link
            style={currentTab(history, '/')}
            className='nav-link'
            to='/'
          >
            Home
          </Link>
        </li>

        {isAuthenticated() && (
          <li className='nav-item'>
            <Link
              style={currentTab(history, '/cart')}
              className='nav-link'
              to='/cart'
            >
              Cart
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='/user/dashboard'
              style={currentTab(history, '/user/dashboard')}
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className='nav-item'>
            <Link
              className='nav-link'
              to='/admin/dashboard'
              style={currentTab(history, '/admin/dashboard')}
            >
              A Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/signup'
                style={currentTab(history, '/signup')}
              >
                Sign Up
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/signin'
                style={currentTab(history, '/signin')}
              >
                Sign in
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className='nav-item'>
            <span
              className='nav-link text-warning'
              onClick={() => {
                signout(() => {
                  navigation('/');
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};
export default withRouter(Menu);
