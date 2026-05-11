import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import './ExpenseReport.css';

const ExpenseReport = () => {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [expenses, setExpenses] = useState([])
    const [grandTotal, setGrandTotal] = useState(0)

    const userId = localStorage.getItem('userId');
    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, userId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://https://daily-expense-tracker-1mso.onrender.com/api/search_expense/${userId}/?from=${fromDate}&to=${toDate}`);

            const data = await response.json();
            setExpenses(data.expenses);
            setGrandTotal(data.total);

        }
        catch (error) {
            console.error('Error fetching expenses:', error);
            toast.error('something went wrong. Try again.');
        }
    };
    return (
        <div className='expense-report-container'>
            {/* Bar Graph Background */}
            <div className="report-bar-graph">
                <svg viewBox="0 0 400 180" preserveAspectRatio="none">
                    <rect x="10" y="40" width="50" height="140" />
                    <rect x="70" y="10" width="50" height="170" />
                    <rect x="130" y="50" width="50" height="130" />
                    <rect x="190" y="0" width="50" height="180" />
                    <rect x="250" y="30" width="50" height="150" />
                    <rect x="310" y="60" width="50" height="120" />
                </svg>
            </div>
            
            {/* Secondary Bar Graph */}
            <div className="report-bar-graph-2">
                <svg viewBox="0 0 280 140" preserveAspectRatio="none">
                    <rect x="10" y="30" width="40" height="110" />
                    <rect x="60" y="10" width="40" height="130" />
                    <rect x="110" y="50" width="40" height="90" />
                    <rect x="160" y="20" width="40" height="120" />
                    <rect x="210" y="40" width="40" height="100" />
                </svg>
            </div>
            
            {/* Floating Background Icons */}
            <div className="report-bg-icon report-bg-icon-1">
                <i className="fas fa-chart-bar"></i>
            </div>
            <div className="report-bg-icon report-bg-icon-2">
                <i className="fas fa-wallet"></i>
            </div>
            <div className="report-bg-icon report-bg-icon-3">
                <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="report-bg-icon report-bg-icon-4">
                <i className="fas fa-receipt"></i>
            </div>
            <div className="report-bg-icon report-bg-icon-5">
                <i className="fas fa-chart-line"></i>
            </div>
            <div className="report-bg-icon report-bg-icon-6">
                <i className="fas fa-piggy-bank"></i>
            </div>

            {/* Pie Chart Background */}
            <div className="report-pie-chart">
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#667eea" strokeWidth="20" strokeDasharray="70 170" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#764ba2" strokeWidth="20" strokeDasharray="50 170" strokeDashoffset="-70" transform="rotate(-90 50 50)" />
                    <circle cx="50" cy="50" r="45" fill="transparent" stroke="#43e97b" strokeWidth="20" strokeDasharray="50 170" strokeDashoffset="-120" transform="rotate(-90 50 50)" />
                </svg>
            </div>

            {/* Line Graph Background */}
            <div className="report-line-graph">
                <svg viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path d="M0,80 Q75,60 150,40 T300,20" />
                </svg>
            </div>

            {/* Red Line Graph */}
            <div className="report-line-graph-red">
                <svg viewBox="0 0 250 80" preserveAspectRatio="none">
                    <path d="M0,60 Q60,40 125,30 T250,15" />
                </svg>
            </div>

            {/* Green Line Graph */}
            <div className="report-line-graph-green">
                <svg viewBox="0 0 200 70" preserveAspectRatio="none">
                    <path d="M0,55 Q50,35 100,50 T200,20" />
                </svg>
            </div>

            {/* Floating Background Shapes */}
            <div className="report-shape report-shape-1"></div>
            <div className="report-shape report-shape-2"></div>
            <div className="report-shape report-shape-3"></div>
            <div className="report-shape report-shape-4"></div>

            <div className='expense-report-content'>
                <div className='text-center mb-4'>
                    <div className="report-title">
                        <div className="report-title-icon">
                            <i className="fas fa-chart-bar"></i>
                        </div>
                        <span>Expense Report</span>
                    </div>
                    <p className='report-subtitle'>Search and Analyze your Expenses between two dates</p>
                </div>

                <div className='report-form-container'>
                    <form className='report-form-row' onSubmit={handleSubmit}>
                        <div className='report-form-group'>
                            <div className='report-input-wrapper'>
                                <input 
                                    type='date' 
                                    name="fromdate" 
                                    value={fromDate} 
                                    className='report-form-control' 
                                    onChange={(e) => setFromDate(e.target.value)} 
                                    required 
                                />
                                <span className="report-input-icon">
                                    <i className="fas fa-calendar-alt"></i>
                                </span>
                            </div>
                        </div>

                        <div className='report-form-group'>
                            <div className='report-input-wrapper'>
                                <input 
                                    type='date' 
                                    name="todate" 
                                    value={toDate} 
                                    className='report-form-control' 
                                    onChange={(e) => setToDate(e.target.value)} 
                                    required 
                                />
                                <span className="report-input-icon">
                                    <i className="fas fa-calendar-check"></i>
                                </span>
                            </div>
                        </div>

                        <button type="submit" className='report-search-btn'>
                            <i className='fas fa-search'></i>
                            Search
                        </button>
                    </form>
                </div>


                <div className='report-table-container'>
                    <table className='table table-striped table-bordered report-table'>
                        <thead className='text-center'>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Cost (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
{expenses.length > 0 ? (
                                expenses.map((exp, index) => (
                                    <tr key={exp.id}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{exp.ExpenseDate}</td>
                                        <td>{exp.ExpenseItem}</td>
                                        <td>{exp.ExpenseCost}</td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan="5" className='text-center'>
                                        <div className='report-empty-state'>
                                            <div className="report-empty-icon">
                                                <i className="fas fa-search"></i>
                                            </div>
                                            <p className='mb-0'>No Expenses found</p>
                                            <small className='text-muted'>Try selecting different dates</small>
                                        </div>
                                    </td>
                                </tr>
                            )}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className='text-end fw-bold'>Grand Total:</td>
                                <td className='fw-bold text-success text-center'>₹ {grandTotal.toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ExpenseReport;
