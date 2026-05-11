import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import './AddExpense.css';

const AddExpense = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ExpenseDate: '',
        ExpenseItem: '',
        ExpenseCost: '',
    })

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, userId]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://https://daily-expense-tracker-1mso.onrender.com/api/add_expense/", {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    UserId: userId
                })
            });
            const data = await response.json();
            if (response.status === 201) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            console.error('Error:', error);
            toast.error('something went wrong. Try again.');
        }
    };

    return (
        <div className='add-expense-container'>
            {/* Neon Grid Background */}
            <div className="neon-grid"></div>

            {/* Animated Particles */}
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>

            {/* Glowing Orbs */}
            <div className="glowing-orb orb-1"></div>
            <div className="glowing-orb orb-2"></div>
            <div className="glowing-orb orb-3"></div>

            {/* Geometric Floating Shapes */}
            <div className="geo-shape"></div>
            <div className="geo-shape"></div>
            <div className="geo-shape"></div>
            
            {/* Currency Background Pattern */}
            <div className="currency-bg"></div>
            
            {/* Floating Expense Tracker Icons */}
            <div className="expense-float-icon">
                <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="expense-float-icon">
                <i className="fas fa-receipt"></i>
            </div>
            <div className="expense-float-icon">
                <i className="fas fa-wallet"></i>
            </div>
            <div className="expense-float-icon">
                <i className="fas fa-chart-line"></i>
            </div>
            <div className="expense-float-icon">
                <i className="fas fa-piggy-bank"></i>
            </div>
            <div className="expense-float-icon">
                <i className="fas fa-file-invoice-dollar"></i>
            </div>
            <div className="expense-float-icon">
                <i className="fas fa-money-bill-wave"></i>
            </div>
            <div className="expense-float-icon">
                <i className="fas fa-coins"></i>
            </div>

            {/* Bar Chart Elements */}
            <div className="chart-bar"></div>
            <div className="chart-bar"></div>
            <div className="chart-bar"></div>
            <div className="chart-bar"></div>
            <div className="chart-bar"></div>

            {/* Line Graph Elements */}
            <div className="graph-line"></div>
            <div className="graph-line"></div>

            {/* Pie Chart Elements */}
            <div className="pie-chart"></div>
            <div className="pie-chart"></div>

            {/* Trend Graph */}
            <div className="trend-graph">
                <svg viewBox="0 0 150 65">
                    <path d="M10,55 Q30,20 50,40 T90,25 T130,45 T150,15" />
                    <circle cx="10" cy="55" r="3" />
                    <circle cx="50" cy="40" r="3" />
                    <circle cx="90" cy="25" r="3" />
                    <circle cx="130" cy="45" r="3" />
                    <circle cx="150" cy="15" r="3" />
                </svg>
            </div>

            {/* Data Points */}
            <div className="data-point"></div>
            <div className="data-point"></div>
            <div className="data-point"></div>
            <div className="data-point"></div>

            {/* Additional Line Graphs */}
            <div className="line-graph-line">
                <svg viewBox="0 0 200 80">
                    <path d="M0,70 Q40,50 80,55 T160,30 T200,10" fill="none" stroke="url(#lineGradient1)" stroke-width="3" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#667eea" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#764ba2" stopOpacity="0.6"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="line-graph-line">
                <svg viewBox="0 0 200 80">
                    <path d="M0,20 Q50,40 100,25 T200,15" fill="none" stroke="url(#lineGradient2)" stroke-width="3" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#43e97b" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#38f9d7" stopOpacity="0.6"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div className="line-graph-line">
                <svg viewBox="0 0 200 80">
                    <path d="M0,60 Q60,40 120,50 T200,35" fill="none" stroke="url(#lineGradient3)" stroke-width="3" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f5576c" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#f093fb" stopOpacity="0.6"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Coins */}
            <div className="coin coin-1">
                <span className="coin-icon"><i className="fas fa-coins"></i></span>
                <span className="coin-value">₹10</span>
            </div>
            <div className="coin coin-2">
                <span className="coin-icon"><i className="fas fa-coins"></i></span>
                <span className="coin-value">₹20</span>
            </div>
            <div className="coin coin-3">
                <span className="coin-icon"><i className="fas fa-coins"></i></span>
                <span className="coin-value">₹50</span>
            </div>
            <div className="coin coin-4">
                <span className="coin-icon"><i className="fas fa-coins"></i></span>
                <span className="coin-value">₹100</span>
            </div>

            {/* Banknotes */}
            <div className="banknote banknote-1">
                <span className="banknote-icon"><i className="fas fa-money-bill"></i></span>
                <span className="banknote-value">₹500</span>
            </div>
            <div className="banknote banknote-2">
                <span className="banknote-icon"><i className="fas fa-money-bill"></i></span>
                <span className="banknote-value">₹2000</span>
            </div>

            {/* PAID Badges */}
            <div className="paid-badge paid-1">
                <span className="paid-icon"><i className="fas fa-check-circle"></i></span>
                <span className="paid-text">PAID</span>
            </div>
            <div className="paid-badge paid-2">
                <span className="paid-icon"><i className="fas fa-check-double"></i></span>
                <span className="paid-text">PAID</span>
            </div>
            <div className="paid-badge paid-3">
                <span className="paid-icon"><i className="fas fa-solid fa-circle-check"></i></span>
                <span className="paid-text">PAID</span>
            </div>

            {/* Receipts */}
            <div className="receipt receipt-1">
                <span className="receipt-icon"><i className="fas fa-receipt"></i></span>
            </div>
            <div className="receipt receipt-2">
                <span className="receipt-icon"><i className="fas fa-file-invoice"></i></span>
            </div>

            {/* Calculator */}
            <div className="calculator calc-1">
                <span className="calc-icon"><i className="fas fa-calculator"></i></span>
            </div>

            {/* Credit Card */}
            <div className="credit-card card-1">
                <span className="card-icon"><i className="fas fa-credit-card"></i></span>
            </div>

            {/* Transaction */}
            <div className="transaction txn-1">
                <span className="txn-icon"><i className="fas fa-exchange-alt"></i></span>
            </div>

            {/* Percentage/Discount */}
            <div className="percent-badge percent-1">
                <span className="percent-icon"><i className="fas fa-percent"></i></span>
            </div>

            {/* Shopping Cart with items */}
            <div className="shopping-cart cart-1">
                <span className="cart-icon"><i className="fas fa-shopping-cart"></i></span>
            </div>

            {/* Red Glowing Elements (similar to delete modal) */}
            {/* Red Glowing Orbs */}
            <div className="red-glow-orb red-orb-1"></div>
            <div className="red-glow-orb red-orb-2"></div>

            {/* Red Warning/Danger Icon */}
            <div className="red-warning warning-1">
                <span className="warning-icon"><i className="fas fa-exclamation-triangle"></i></span>
            </div>

            {/* Red Fire/Flame (for burning money concept) */}
            <div className="red-fire fire-1">
                <span className="fire-icon"><i className="fas fa-fire"></i></span>
            </div>

            {/* Red Tag */}
            <div className="red-tag tag-1">
                <span className="tag-icon"><i className="fas fa-tag"></i></span>
                <span className="tag-text">SPENT</span>
            </div>

            {/* Red Heart */}
            <div className="red-heart heart-1">
                <span className="heart-icon"><i className="fas fa-heart"></i></span>
            </div>

            {/* Red Arrow (money flowing out) */}
            <div className="red-arrow arrow-1">
                <span className="arrow-icon"><i className="fas fa-arrow-down"></i></span>
            </div>

            {/* Coins */}
            <div className="coin coin-1">
                <span className="coin-icon"><i className="fas fa-coins"></i></span>
                <span className="coin-value">₹10</span>
            </div>
            <div className="coin coin-2">
                <span className="coin-icon"><i className="fas fa-coins"></i></span>
                <span className="coin-value">₹50</span>
            </div>

            {/* Banknote */}
            <div className="banknote banknote-1">
                <span className="banknote-icon"><i className="fas fa-money-bill"></i></span>
                <span className="banknote-value">₹500</span>
            </div>

            {/* PAID Badge */}
            <div className="paid-badge paid-1">
                <span className="paid-icon"><i className="fas fa-check-circle"></i></span>
                <span className="paid-text">PAID</span>
            </div>

            {/* Receipt */}
            <div className="receipt receipt-1">
                <span className="receipt-icon"><i className="fas fa-receipt"></i></span>
            </div>

            {/* Calculator */}
            <div className="calculator calc-1">
                <span className="calc-icon"><i className="fas fa-calculator"></i></span>
            </div>

            {/* Line Graph */}
            <div className="line-graph-line">
                <svg viewBox="0 0 200 80">
                    <path d="M0,70 Q40,50 80,55 T160,30 T200,10" fill="none" stroke="url(#lineGradient1)" stroke-width="3" stroke-linecap="round"/>
                    <defs>
                        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#667eea" stopOpacity="0.6"/>
                            <stop offset="100%" stopColor="#764ba2" stopOpacity="0.6"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Big Professional Background Graphs */}
            {/* Large Area Graph */}
            <div className="big-area-graph area-graph-1">
                <svg viewBox="0 0 500 200">
                    <defs>
                        <linearGradient id="areaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#667eea" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#667eea" stopOpacity="0.05"/>
                        </linearGradient>
                        <linearGradient id="areaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#43e97b" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#43e97b" stopOpacity="0.03"/>
                        </linearGradient>
                        <linearGradient id="areaGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f5576c" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#f5576c" stopOpacity="0.03"/>
                        </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="50" y1="30" x2="50" y2="170" stroke="rgba(102, 126, 234, 0.1)" stroke-width="1"/>
                    <line x1="150" y1="30" x2="150" y2="170" stroke="rgba(102, 126, 234, 0.1)" stroke-width="1"/>
                    <line x1="250" y1="30" x2="250" y2="170" stroke="rgba(102, 126, 234, 0.1)" stroke-width="1"/>
                    <line x1="350" y1="30" x2="350" y2="170" stroke="rgba(102, 126, 234, 0.1)" stroke-width="1"/>
                    <line x1="450" y1="30" x2="450" y2="170" stroke="rgba(102, 126, 234, 0.1)" stroke-width="1"/>
                    {/* Horizontal lines */}
                    <line x1="50" y1="50" x2="480" y2="50" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
                    <line x1="50" y1="90" x2="480" y2="90" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
                    <line x1="50" y1="130" x2="480" y2="130" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
                    <path d="M50,150 Q100,120 150,140 T250,100 T350,120 T450,60" fill="none" stroke="url(#areaGradient1)" stroke-width="2.5"/>
                    <path d="M50,150 Q100,120 150,140 T250,100 T350,120 T450,60 L450,180 L50,180 Z" fill="url(#areaGradient1)"/>
                </svg>
            </div>

            {/* Secondary Area Graph */}
            <div className="big-area-graph area-graph-2">
                <svg viewBox="0 0 400 150">
                    <defs>
                        <linearGradient id="areaGradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#43e97b" stopOpacity="0.3"/>
                            <stop offset="100%" stopColor="#43e97b" stopOpacity="0.05"/>
                        </linearGradient>
                    </defs>
                    <path d="M30,120 Q80,90 130,100 T230,60 T330,80 T370,40" fill="none" stroke="url(#areaGradientGreen)" stroke-width="2.5"/>
                    <path d="M30,120 Q80,90 130,100 T230,60 T330,80 T370,40 L370,140 L30,140 Z" fill="url(#areaGradientGreen)"/>
                    {/* Data points */}
                    <circle cx="130" cy="100" r="4" fill="#43e97b" opacity="0.6"/>
                    <circle cx="230" cy="60" r="4" fill="#43e97b" opacity="0.6"/>
                    <circle cx="330" cy="80" r="4" fill="#43e97b" opacity="0.6"/>
                    <circle cx="370" cy="40" r="4" fill="#43e97b" opacity="0.6"/>
                </svg>
            </div>

            {/* Bar Chart Graph */}
            <div className="big-bar-chart bar-chart-1">
                <svg viewBox="0 0 300 120">
                    <line x1="30" y1="100" x2="280" y2="100" stroke="rgba(102, 126, 234, 0.3)" stroke-width="2"/>
                    <line x1="30" y1="100" x2="30" y2="15" stroke="rgba(102, 126, 234, 0.3)" stroke-width="2"/>
                    {/* Bars */}
                    <rect x="45" y="60" width="25" height="40" fill="url(#barGradient1)" rx="3"/>
                    <rect x="85" y="35" width="25" height="65" fill="url(#barGradient2)" rx="3"/>
                    <rect x="125" y="50" width="25" height="50" fill="url(#barGradient3)" rx="3"/>
                    <rect x="165" y="25" width="25" height="75" fill="url(#barGradient1)" rx="3"/>
                    <rect x="205" y="45" width="25" height="55" fill="url(#barGradient2)" rx="3"/>
                    <rect x="245" y="70" width="25" height="30" fill="url(#barGradient3)" rx="3"/>
                    <defs>
                        <linearGradient id="barGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#667eea"/>
                            <stop offset="100%" stopColor="#764ba2"/>
                        </linearGradient>
                        <linearGradient id="barGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#43e97b"/>
                            <stop offset="100%" stopColor="#38f9d7"/>
                        </linearGradient>
                        <linearGradient id="barGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f5576c"/>
                            <stop offset="100%" stopColor="#f093fb"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Pie Chart Graph */}
            <div className="big-pie-chart pie-chart-1">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#pieGradient1)" stroke-width="20" stroke-dasharray="75 251" transform="rotate(-90 50 50)"/>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#pieGradient2)" stroke-width="20" stroke-dasharray="50 251" stroke-dashoffset="-75" transform="rotate(-90 50 50)"/>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#pieGradient3)" stroke-width="20" stroke-dasharray="40 251" stroke-dashoffset="-125" transform="rotate(-90 50 50)"/>
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#pieGradient4)" stroke-width="20" stroke-dasharray="86 251" stroke-dashoffset="-165" transform="rotate(-90 50 50)"/>
                    <defs>
                        <linearGradient id="pieGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#667eea"/>
                            <stop offset="100%" stopColor="#764ba2"/>
                        </linearGradient>
                        <linearGradient id="pieGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#43e97b"/>
                            <stop offset="100%" stopColor="#38f9d7"/>
                        </linearGradient>
                        <linearGradient id="pieGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f5576c"/>
                            <stop offset="100%" stopColor="#f093fb"/>
                        </linearGradient>
                        <linearGradient id="pieGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fa709a"/>
                            <stop offset="100%" stopColor="#fee140"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Stats/Metrics Cards */}
            <div className="stats-card stats-card-1">
                <div className="stats-value">₹12,450</div>
                <div className="stats-label">Total Expenses</div>
            </div>
            <div className="stats-card stats-card-2">
                <div className="stats-value">24</div>
                <div className="stats-label">Transactions</div>
            </div>
            <div className="stats-card stats-card-3">
                <div className="stats-value">₹518</div>
                <div className="stats-label">Average</div>
            </div>




            <div className='container mt-4'>
                <div className='text-center mb-3'>
                    <div className="expense-icon-container">
                        <span className="expense-main-icon"><i className="fas fa-wallet"></i></span>
                    </div>
                    <h2 className="expense-title">Add New Expense</h2>
                    <p className='expense-subtitle'>Track your spending and stay on budget</p>
                </div>

                <form className='add-expense-form' onSubmit={handleSubmit}>
                    <div className='form-group-container'>
                        <div className='mb-3'>
                            <label className='form-label-custom'>
                                <span className="label-icon"><i className="fas fa-calendar-alt"></i></span>
                                Expense Date
                            </label>
                            <div className='input-group-custom'>
                                <span className="input-icon">
                                    <i className="fas fa-calendar-alt"></i>
                                </span>
                                <input type='date' name="ExpenseDate" value={formData.ExpenseDate} className='form-control-custom' onChange={handleChange} required />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label-custom'>
                                <span className="label-icon"><i className="fas fa-shopping-cart"></i></span>
                                Expense Item
                            </label>
                            <div className='input-group-custom'>
                                <span className="input-icon">
                                    <i className="fas fa-shopping-cart"></i>
                                </span>
                                <input type='text' name="ExpenseItem" value={formData.ExpenseItem} className='form-control-custom' onChange={handleChange} required placeholder='Enter expense item (e.g. Groceries, Petrol)' />
                            </div>
                        </div>

                        <div className='mb-3'>
                            <label className='form-label-custom'>
                                <span className="label-icon"><i className="fas fa-rupee-sign"></i></span>
                                Expense Cost (₹)
                            </label>
                            <div className='input-group-custom'>
                                <span className="input-icon">
                                    <i className="fas fa-rupee-sign"></i>
                                </span>
                                <input type='number' name="ExpenseCost" value={formData.ExpenseCost} className='form-control-custom' onChange={handleChange} required placeholder='Enter amount spent' />
                            </div>
                        </div>

                        <button type="submit" className='btn btn-submit-expense'>
                            <span className="btn-icon"><i className="fas fa-plus-circle"></i></span>
                            Add Expense
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddExpense;

