import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getUserById } from './helper/userapicalls';

const Profile = () => {
  const [UserbyId, setUserById] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getUserById().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUserById(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base
      title='Welcome User'
      description='View Profile here'
    >
      <h2 className='mb-4'>Profile:</h2>
      <Link
        className='btn btn-info'
        to={`/User/dashboard`}
      >
        <span className=''>User Home</span>
      </Link>
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center text-white my-3'>Total Profile</h2>
          {UserbyId.map((User, index) => {
            return (
              <h3
                className='text-white'
                key={index}
              >
                {User.name}
              </h3>
            );
          })}
          <div className='row text-center mb-2 '>
            <div className='col-4'>
              <h3 className='text-white text-left'></h3>
            </div>
            <div className='col-4'>
              <Link
                className='btn btn-success'
                to={`/user/userI}`}
              >
                <span className=''>Update</span>
              </Link>
            </div>
            <div className='col-4'>
              <button
                onClick={() => {}}
                className='btn btn-danger'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Profile;
