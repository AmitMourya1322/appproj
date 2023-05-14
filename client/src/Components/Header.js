import React from 'react'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
const Header = () => {

  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const logout =()=>{
    setAuth({...auth,user:null,token:""});
    localStorage.removeItem("auth")
    navigate("/login")
  }
  return (
    <>

    {!auth?.user ? (
      <>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            LOGIN
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
            REGISTER
          </NavLink>
        </li>
      </>
    ) : (
      <div className="dropdown">
        <li>
          <a
            className="nav-link pointer dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            {auth?.user?.name?.toUpperCase()}
          </a>

          <ul className="dropdown-menu">
            <li>
              <NavLink
                className="nav-link"
                to={`/${
                  auth?.user?.role === 1 ? "admin" : "user"
                }`}
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item pointer">
              <a onClick={logout} className="nav-link">
                Logout
              </a>
            </li>
          </ul>
        </li>
      </div>
    )}
  
    {/* // <div className='header'>
    //     <h1>FireStation Website</h1>
    //     <div className="link">
    //         <Link to='/signup'>Register</Link>
    //         <Link to='/Login'>Login</Link>
    //     </div>
    // </div> */}
    </>
  )
}

export default Header