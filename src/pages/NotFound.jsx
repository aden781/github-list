import React from 'react';
import { Link } from 'react-router-dom'
import {FaHome } from 'react-icons/fa'

function NotFound() {
  return <div className="hero">
      <div className="text-center hero-content">
          <div className="class-w-lg">
              <h1 className="text-5xl font-bold mb-8">
                 404 - Page Not Found 😵‍💫
              </h1>
              <Link to='/' className="btn btn-primary btn-lg"> <FaHome className='mr-2' /> Home </Link>
          </div>
      </div>
  </div>;
}

export default NotFound;
