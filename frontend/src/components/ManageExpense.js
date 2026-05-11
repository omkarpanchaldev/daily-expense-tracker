import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import './ManageExpense.css';

const ManageExpense = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([])
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
        fetchExpenses(userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, userId]);

    const [editExpense, setEditExpense] = useState(null);
    const [deleteExpense, setDeleteExpense] = useState(null);

    const handleEdit = (expense) => {
        setEditExpense(expense);
    }

    const confirmDelete = (expense) => {
        setDeleteExpense(expense);
    }

    const handleChange = (e) => {
        setEditExpense({ ...editExpense, [e.target.name]: e.target.value });
    };

    // This will fetch expense from the backend
    const fetchExpenses = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}`);
            const data = await response.json();
            setExpenses(data);
        }
        catch (error) {
            console.error("Error fetching expenses: ", error)
        }
    };

    /// This will update the exiting expense from the backend
    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/update_expense/${editExpense.id}/`, {
                method: 'PUT',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editExpense)
            });
            if (response.status === 200) {
                toast.success('Expense updated successfully!');
                setEditExpense(null);
                fetchExpenses(userId);
            }
            else {
                toast.error('Failed to update expense');
            }
        }
        catch (error) {
            console.error("Error Updating expenses: ", error)
            toast.error('Something went wrong! OOPs')
        }
    };

    //// This will Delete the expense that you want to delete through delete button
    const handleDelete = async () => {
        if (!deleteExpense) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete_expense/${deleteExpense.id}/`, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                toast.success('Expense Deleted successfully!');
                setDeleteExpense(null);
                fetchExpenses(userId);
            }
            else {
                toast.error('Failed to Delete expense');
            }
        }
        catch (error) {
            console.error("Error Deleting expenses: ", error)
            toast.error('Something went wrong! OOPs')
        }
    };

    return (
        <div className='manage-expense-container'>
            {/* SVG Line Graph Background */}
            <div className="manage-line-graph">
                <svg viewBox="0 0 1200 200" preserveAspectRatio="none">
                    <path d="M0,150 Q150,120 300,100 T600,80 T900,60 T1200,40" />
                    <path d="M0,120 Q200,140 400,110 T800,90 T1200,70" />
                    <circle cx="0" cy="150" r="5" />
                    <circle cx="300" cy="100" r="5" />
                    <circle cx="600" cy="80" r="5" />
                    <circle cx="900" cy="60" r="5" />
                    <circle cx="1200" cy="40" r="5" />
                </svg>
            </div>
            
            {/* Secondary Line Graph */}
            <div className="manage-line-graph-bg">
                <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                    <path d="M0,100 Q100,70 200,85 T400,50" />
                </svg>
            </div>

            {/* Floating Background Shapes */}
            <div className="manage-shape manage-shape-1"></div>
            <div className="manage-shape manage-shape-2"></div>
            <div className="manage-shape manage-shape-3"></div>
            <div className="manage-shape manage-shape-4"></div>

            <div className='manage-content'>
                <div className='text-center mb-3'>
                    <div className="manage-title">
                        <div className="manage-title-icon">
                            <i className="fas fa-edit"></i>
                        </div>
                        <span>Manage Expense</span>
                    </div>
                    <p className='manage-subtitle'>View, Edit, or Delete your expenses</p>
                </div>
                
                <div className='manage-table-container'>
                    <table className='table table-striped table-bordered manage-table'>
                        <thead className='text-center'>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Cost (₹)</th>
                                <th style={{ width: '120px' }}>Actions</th>
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
                                        <td className='text-center'>
                                            <button className='btn-manage-edit' onClick={() => handleEdit(exp)}>
                                                <i className='fas fa-edit'></i>
                                            </button>
                                            <button className='btn-manage-delete' onClick={() => confirmDelete(exp)}>
                                                <i className='fas fa-trash-alt'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className='text-center'>
                                        <div className='manage-empty-state'>
                                            <div className="manage-empty-icon">
                                                <i className='fas fa-exclamation-circle'></i>
                                            </div>
                                            <p>No Expenses found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {editExpense && (
                <div className="manage-modal-overlay" onClick={() => setEditExpense(null)}>
                    <div className="manage-modal edit-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="manage-modal-header">
                            <h5 className="manage-modal-title">
                                <i className='fas fa-pen'></i>
                                Edit Expense
                            </h5>
                            <button className="manage-modal-close" onClick={() => setEditExpense(null)}>
                                <i className='fas fa-times'></i>
                            </button>
                        </div>
                        <div className="manage-modal-body">
                            <div className="edit-modal-icon-container">
                                <i className='fas fa-edit'></i>
                            </div>
                            <h5 className="edit-modal-title">Update Expense</h5>
                            <p className="edit-modal-subtitle">Modify your expense details below</p>
                            
                            <div className='manage-form-group'>
                                <label className='manage-form-label'>
                                    <i className="fas fa-calendar-alt"></i>
                                    Expense Date
                                </label>
                                <div className='manage-input-group'>
                                    <input type='date' name="ExpenseDate" className='manage-form-control' value={editExpense.ExpenseDate} onChange={handleChange} required />
                                    <span className="manage-input-icon">
                                        <i className="fas fa-calendar-alt"></i>
                                    </span>
                                </div>
                            </div>
                            <div className='manage-form-group'>
                                <label className='manage-form-label'>
                                    <i className="fas fa-shopping-cart"></i>
                                    Expense Item
                                </label>
                                <div className='manage-input-group'>
                                    <input type='text' name="ExpenseItem" className='manage-form-control' value={editExpense.ExpenseItem} onChange={handleChange} required placeholder='Enter expense item' />
                                    <span className="manage-input-icon">
                                        <i className="fas fa-shopping-cart"></i>
                                    </span>
                                </div>
                            </div>
                            <div className='manage-form-group'>
                                <label className='manage-form-label'>
                                    <i className="fas fa-rupee-sign"></i>
                                    Expense Cost (₹)
                                </label>
                                <div className='manage-input-group'>
                                    <input type='number' name="ExpenseCost" className='manage-form-control' value={editExpense.ExpenseCost} onChange={handleChange} required placeholder='Enter amount' />
                                    <span className="manage-input-icon">
                                        <i className="fas fa-rupee-sign"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="manage-modal-footer">
                            <button className="btn-manage-close" onClick={() => setEditExpense(null)}>
                                <i className='fas fa-times me-1'></i> Cancel
                            </button>
                            <button className="btn-manage-save" onClick={handleUpdate}>
                                <i className='fas fa-save me-1'></i> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteExpense && (
                <div className="manage-modal-overlay" onClick={() => setDeleteExpense(null)}>
                    <div className="manage-modal delete-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="manage-modal-header">
                            <h5 className="manage-modal-title">
                                <i className='fas fa-exclamation-triangle'></i>
                                Delete Expense
                            </h5>
                            <button className="manage-modal-close" onClick={() => setDeleteExpense(null)}>
                                <i className='fas fa-times'></i>
                            </button>
                        </div>
                        <div className="manage-modal-body">
                            <div className="delete-icon-container">
                                <i className='fas fa-trash-alt'></i>
                            </div>
                            <h5 className="delete-modal-title">Are you sure?</h5>
                            <p className="delete-modal-message">
                                You are about to delete this expense. This action cannot be undone.
                            </p>
                            <div className="delete-modal-item">
                                <i className="fas fa-calendar-alt"></i>
                                <span>Date: {deleteExpense.ExpenseDate}</span>
                            </div>
                            <div className="delete-modal-item">
                                <i className="fas fa-shopping-cart"></i>
                                <span>Item: {deleteExpense.ExpenseItem}</span>
                            </div>
                            <div className="delete-modal-item">
                                <i className="fas fa-rupee-sign"></i>
                                <span>Cost: ₹{deleteExpense.ExpenseCost}</span>
                            </div>
                        </div>
                        <div className="manage-modal-footer">
                            <button className="btn-delete-cancel" onClick={() => setDeleteExpense(null)}>
                                <i className='fas fa-times me-1'></i> Cancel
                            </button>
                            <button className="btn-delete-confirm" onClick={handleDelete}>
                                <i className='fas fa-trash-alt me-1'></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    )
}

export default ManageExpense;
