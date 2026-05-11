import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const handleLogout = () => {
       localStorage.removeItem('userId');
       navigate('/login');
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className='container'>
                <Link className="navbar-brand" to="/"> 
                    <div className="brand-icon-container">
                        <i className="fas fa-wallet brand-icon"></i>
                    </div>
                    <span className="brand-text">Daily Expense Tracker</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <span className="nav-icon-container">
                                    <i className="fas fa-home nav-icon"></i>
                                </span>
                                <span>Home</span>
                            </Link>
                        </li>
                        
                        {userId ? (
                            <>
                            <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">
                                <span className="nav-icon-container">
                                    <i className="fas fa-chart-line nav-icon"></i>
                                </span>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-expense">
                                <span className="nav-icon-container">
                                    <i className="fas fa-plus-circle nav-icon"></i>
                                </span>
                                <span>Add Expense</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/manage-expense">
                                <span className="nav-icon-container">
                                    <i className="fas fa-edit nav-icon"></i>
                                </span>
                                <span>Manage</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/expense-report">
                                <span className="nav-icon-container">
                                    <i className="fas fa-chart-pie nav-icon"></i>
                                </span>
                                <span>Reports</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/change-password">
                                <span className="nav-icon-container">
                                    <i className="fas fa-key nav-icon"></i>
                                </span>
                                <span>Password</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-logout" onClick={handleLogout}>
                                <span className="nav-icon-container">
                                    <i className="fas fa-sign-out-alt nav-icon"></i>
                                </span>
                                <span>Logout</span>
                            </button>
                        </li>
                            </>
                        ) : (
                            <>
                            <li className="nav-item">
                            <Link className="nav-link nav-link-special" to="/signup">
                                <span className="nav-icon-container">
                                    <i className="fas fa-user-plus nav-icon"></i>
                                </span>
                                <span>Signup</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn-login" to="/login">
                                <span className="nav-icon-container">
                                    <i className="fas fa-sign-in-alt nav-icon"></i>
                                </span>
                                <span>Login</span>
                            </Link>
                        </li>
                            </>
                        ) }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

