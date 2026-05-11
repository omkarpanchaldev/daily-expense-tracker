import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ChangePassword = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    
    useEffect(() => {
        if (!userId) {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, userId]);

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Password strength calculation
        if (name === 'newPassword') {
            calculatePasswordStrength(value);
        }
    };

    const calculatePasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength('');
            return;
        }

        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 1) {
            setPasswordStrength('weak');
        } else if (strength <= 2) {
            setPasswordStrength('medium');
        } else {
            setPasswordStrength('strong');
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        if (passwordStrength === 'weak') {
            toast.error('Please choose a stronger password');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/change_password/${userId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword,
                })
            });
            const data = await response.json();
            
            if (response.status === 200) {
                toast.success(data.message || 'Password changed successfully!');
                setIsSuccess(true);
                setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                setPasswordStrength('');
            }
            else {
                toast.error(data.message || 'Failed to change password');
            }
        }
        catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordStrength('');
    };

    // Success state component
    if (isSuccess) {
        return (
            <div className="change-password-container">
                {/* Graph Background Elements */}
                <GraphBackground />

                {/* Floating Background Shapes */}
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>
                <div className="floating-shape shape-4"></div>

                <div className="text-center">
                    {/* Icon Container */}
                    <div className="password-icon-container">
                        <i className="fas fa-check-circle password-main-icon"></i>
                    </div>

                    <h1 className="password-title">Password Changed!</h1>
                    <p className="password-subtitle">Your password has been updated successfully</p>

                    <div className="change-password-form">
                        <div className="success-message">
                            <i className="fas fa-shield-alt success-icon"></i>
                            <h3 className="success-title">Security Updated</h3>
                            <p className="success-text">Your account is now more secure with your new password.</p>
                        </div>

                        <button 
                            className="btn-submit-password"
                            onClick={resetForm}
                        >
                            <i className="fas fa-plus btn-icon"></i>
                            Change Password Again
                        </button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }

    return (
        <div className="change-password-container">
            {/* Graph Background Elements */}
            <GraphBackground />

            {/* Floating Background Shapes */}
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
            <div className="floating-shape shape-4"></div>

            <div className="text-center">
                {/* Icon Container */}
                <div className="password-icon-container">
                    <i className="fas fa-key password-main-icon"></i>
                </div>

                <h1 className="password-title">Change Password</h1>
                <p className="password-subtitle">Secure your account with a new password</p>

                <form className="change-password-form" onSubmit={handleSubmit}>
                    {/* Old Password Field */}
                    <div className="form-group-container">
                        <label className="form-label-custom">
                            <i className="fas fa-lock label-icon"></i>
                            Old Password
                        </label>
                        <div className="input-group-custom">
                            <span className="input-icon">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input 
                                type={showPassword.oldPassword ? 'text' : 'password'} 
                                name="oldPassword" 
                                value={formData.oldPassword} 
                                className="form-control-custom" 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter your old password"
                            />
                            <button 
                                type="button" 
                                className={`password-toggle ${showPassword.oldPassword ? 'active' : ''}`}
                                onClick={() => togglePasswordVisibility('oldPassword')}
                            >
                                <i className={showPassword.oldPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                        </div>
                    </div>

                    {/* New Password Field */}
                    <div className="form-group-container">
                        <label className="form-label-custom">
                            <i className="fas fa-lock-open label-icon"></i>
                            New Password
                        </label>
                        <div className="input-group-custom">
                            <span className="input-icon">
                                <i className="fas fa-key"></i>
                            </span>
                            <input 
                                type={showPassword.newPassword ? 'text' : 'password'} 
                                name="newPassword" 
                                value={formData.newPassword} 
                                className="form-control-custom" 
                                onChange={handleChange} 
                                required 
                                placeholder="Enter your new password"
                            />
                            <button 
                                type="button" 
                                className={`password-toggle ${showPassword.newPassword ? 'active' : ''}`}
                                onClick={() => togglePasswordVisibility('newPassword')}
                            >
                                <i className={showPassword.newPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {formData.newPassword && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div className={`strength-bar-fill ${passwordStrength}`}></div>
                                </div>
                                <span className={`strength-text ${passwordStrength}`}>
                                    {passwordStrength === 'weak' && 'Weak - Add more characters, numbers, or symbols'}
                                    {passwordStrength === 'medium' && 'Medium - Add special characters for stronger password'}
                                    {passwordStrength === 'strong' && 'Strong - Great password!'}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-group-container">
                        <label className="form-label-custom">
                            <i className="fas fa-check-circle label-icon"></i>
                            Confirm New Password
                        </label>
                        <div className="input-group-custom">
                            <span className="input-icon">
                                <i className="fas fa-check-double"></i>
                            </span>
                            <input 
                                type={showPassword.confirmPassword ? 'text' : 'password'} 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                className="form-control-custom" 
                                onChange={handleChange} 
                                required 
                                placeholder="Confirm your new password"
                            />
                            <button 
                                type="button" 
                                className={`password-toggle ${showPassword.confirmPassword ? 'active' : ''}`}
                                onClick={() => togglePasswordVisibility('confirmPassword')}
                            >
                                <i className={showPassword.confirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                        </div>
                        
                        {/* Password Match Indicator */}
                        {formData.confirmPassword && (
                            <div className="password-strength">
                                {formData.newPassword === formData.confirmPassword ? (
                                    <span className="strength-text strong">
                                        <i className="fas fa-check-circle"></i> Passwords match
                                    </span>
                                ) : (
                                    <span className="strength-text weak">
                                        <i className="fas fa-times-circle"></i> Passwords do not match
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className="btn-submit-password"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner-border-sm"></div>
                                Changing Password...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save btn-icon"></i>
                                Change Password
                            </>
                        )}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

// Graph Background Component
const GraphBackground = () => {
    return (
        <div className="graph-background">
            {/* Grid Pattern */}
            <div className="grid-pattern"></div>
            
            {/* Line Graphs */}
            <svg className="line-graph-container" viewBox="0 0 800 600" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="100%" stopColor="#764ba2" />
                    </linearGradient>
                    <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f093fb" />
                        <stop offset="100%" stopColor="#f5576c" />
                    </linearGradient>
                    <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4facfe" />
                        <stop offset="100%" stopColor="#00f2fe" />
                    </linearGradient>
                    <linearGradient id="lineGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#43e97b" />
                        <stop offset="100%" stopColor="#38f9d7" />
                    </linearGradient>
                </defs>
                {/* Line Graph 1 */}
                <path 
                    className="line-graph-path line-graph-path-1"
                    d="M0,300 Q100,250 200,280 T400,200 T600,250 T800,150"
                    stroke="url(#lineGradient1)"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                />
                {/* Line Graph 2 */}
                <path 
                    className="line-graph-path line-graph-path-2"
                    d="M0,400 Q150,350 300,380 T500,300 T700,350 T800,280"
                    stroke="url(#lineGradient2)"
                    strokeDasharray="800"
                    strokeDashoffset="800"
                />
                {/* Line Graph 3 */}
                <path 
                    className="line-graph-path line-graph-path-3"
                    d="M0,200 Q200,150 400,180 T600,120 T800,100"
                    stroke="url(#lineGradient3)"
                    strokeDasharray="600"
                    strokeDashoffset="600"
                />
                {/* Line Graph 4 */}
                <path 
                    className="line-graph-path line-graph-path-4"
                    d="M0,500 Q100,450 200,480 T400,420 T600,470 T800,400"
                    stroke="url(#lineGradient4)"
                    strokeDasharray="1200"
                    strokeDashoffset="1200"
                />
                {/* Line Graph 5 */}
                <path 
                    className="line-graph-path line-graph-path-5"
                    d="M0,350 Q250,300 500,320 T750,280 T800,250"
                    stroke="#667eea"
                    strokeDasharray="700"
                    strokeDashoffset="700"
                />
            </svg>

            {/* Wave Graphs at Bottom */}
            <div className="wave-graph-container">
                <svg className="wave-graph-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#667eea" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#764ba2" stopOpacity="0.5" />
                        </linearGradient>
                        <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f093fb" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#f5576c" stopOpacity="0.5" />
                        </linearGradient>
                        <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4facfe" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>
                    {/* Wave 1 */}
                    <path 
                        className="wave-path wave-path-1"
                        d="M0,150 Q100,120 200,150 T400,130 T600,150 T800,120 V200 H0 Z"
                        fill="none"
                    />
                    {/* Wave 2 */}
                    <path 
                        className="wave-path wave-path-2"
                        d="M0,170 Q150,140 300,170 T500,150 T700,170 T800,140 V200 H0 Z"
                        fill="none"
                    />
                    {/* Wave 3 */}
                    <path 
                        className="wave-path wave-path-3"
                        d="M0,190 Q200,160 400,190 T600,170 T800,190 V200 H0 Z"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Area Graphs */}
            <svg className="area-graph-container" viewBox="0 0 800 600" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="areaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#667eea" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#667eea" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="areaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f093fb" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f093fb" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="areaGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#43e97b" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#43e97b" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                {/* Area 1 */}
                <path 
                    className="area-fill-1"
                    d="M0,400 Q200,350 400,380 T800,300 V600 H0 Z"
                />
                {/* Area 2 */}
                <path 
                    className="area-fill-2"
                    d="M0,450 Q300,400 500,430 T800,380 V600 H0 Z"
                />
                {/* Area 3 */}
                <path 
                    className="area-fill-3"
                    d="M0,500 Q250,460 450,490 T800,420 V600 H0 Z"
                />
            </svg>

            {/* Bar Graph */}
            <svg className="bar-graph-container" viewBox="0 0 800 600" preserveAspectRatio="none">
                {/* Bar Group 1 */}
                <g className="bar-group bar-group-1">
                    <rect x="50" y="400" width="20" height="100" fill="#667eea" opacity="0.5" />
                    <rect x="80" y="420" width="20" height="80" fill="#764ba2" opacity="0.5" />
                </g>
                {/* Bar Group 2 */}
                <g className="bar-group bar-group-2">
                    <rect x="150" y="380" width="20" height="120" fill="#f093fb" opacity="0.5" />
                    <rect x="180" y="400" width="20" height="100" fill="#f5576c" opacity="0.5" />
                </g>
                {/* Bar Group 3 */}
                <g className="bar-group bar-group-3">
                    <rect x="250" y="360" width="20" height="140" fill="#4facfe" opacity="0.5" />
                    <rect x="280" y="390" width="20" height="110" fill="#00f2fe" opacity="0.5" />
                </g>
                {/* Bar Group 4 */}
                <g className="bar-group bar-group-4">
                    <rect x="350" y="370" width="20" height="130" fill="#43e97b" opacity="0.5" />
                    <rect x="380" y="410" width="20" height="90" fill="#38f9d7" opacity="0.5" />
                </g>
                {/* Bar Group 5 */}
                <g className="bar-group bar-group-5">
                    <rect x="450" y="350" width="20" height="150" fill="#667eea" opacity="0.4" />
                    <rect x="480" y="380" width="20" height="120" fill="#764ba2" opacity="0.4" />
                </g>
            </svg>

            {/* Scatter Plot Points */}
            <div className="scatter-plot-container">
                <svg width="100%" height="100%">
                    <circle cx="10%" cy="30%" r="4" fill="#667eea" className="scatter-point scatter-point-1" opacity="0.6" />
                    <circle cx="25%" cy="20%" r="3" fill="#764ba2" className="scatter-point scatter-point-2" opacity="0.6" />
                    <circle cx="40%" cy="45%" r="5" fill="#f093fb" className="scatter-point scatter-point-3" opacity="0.6" />
                    <circle cx="55%" cy="35%" r="4" fill="#4facfe" className="scatter-point scatter-point-4" opacity="0.6" />
                    <circle cx="70%" cy="25%" r="3" fill="#43e97b" className="scatter-point scatter-point-5" opacity="0.6" />
                    <circle cx="85%" cy="50%" r="4" fill="#f5576c" className="scatter-point scatter-point-1" opacity="0.6" />
                    <circle cx="15%" cy="60%" r="5" fill="#667eea" className="scatter-point scatter-point-2" opacity="0.6" />
                    <circle cx="30%" cy="55%" r="3" fill="#764ba2" className="scatter-point scatter-point-3" opacity="0.6" />
                    <circle cx="60%" cy="65%" r="4" fill="#f093fb" className="scatter-point scatter-point-4" opacity="0.6" />
                    <circle cx="75%" cy="70%" r="5" fill="#4facfe" className="scatter-point scatter-point-5" opacity="0.6" />
                </svg>
            </div>

            {/* Data Flow Lines */}
            <svg className="data-flow-container" viewBox="0 0 800 600" preserveAspectRatio="none">
                <line className="data-flow-line data-flow-line-1" x1="0" y1="100" x2="800" y2="100" />
                <line className="data-flow-line data-flow-line-2" x1="800" y1="200" x2="0" y2="200" />
                <line className="data-flow-line data-flow-line-3" x1="0" y1="300" x2="800" y2="300" />
                <line className="data-flow-line data-flow-line-1" x1="400" y1="400" x2="400" y2="600" />
                <line className="data-flow-line data-flow-line-2" x1="200" y1="400" x2="200" y2="600" />
                <line className="data-flow-line data-flow-line-3" x1="600" y1="400" x2="600" y2="600" />
            </svg>

            {/* Animated Dots */}
            <div className="dots-container">
                <div className="animated-dot dot-1"></div>
                <div className="animated-dot dot-2"></div>
                <div className="animated-dot dot-3"></div>
                <div className="animated-dot dot-4"></div>
                <div className="animated-dot dot-5"></div>
                <div className="animated-dot dot-6"></div>
                <div className="animated-dot dot-7"></div>
                <div className="animated-dot dot-8"></div>
            </div>

            {/* Rising Graph Lines */}
            <svg className="rising-graph-container" viewBox="0 0 800 150" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="risingGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#667eea" />
                        <stop offset="50%" stopColor="#764ba2" />
                        <stop offset="100%" stopColor="#f093fb" />
                    </linearGradient>
                    <linearGradient id="risingGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f093fb" />
                        <stop offset="50%" stopColor="#f5576c" />
                        <stop offset="100%" stopColor="#4facfe" />
                    </linearGradient>
                    <linearGradient id="risingGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#43e97b" />
                        <stop offset="50%" stopColor="#38f9d7" />
                        <stop offset="100%" stopColor="#667eea" />
                    </linearGradient>
                </defs>
                {/* Rising Line 1 */}
                <path 
                    className="rising-line rising-line-1"
                    d="M0,130 Q100,110 200,100 T400,70 T600,50 T800,30"
                />
                {/* Rising Line 2 */}
                <path 
                    className="rising-line rising-line-2"
                    d="M0,140 Q150,125 250,115 T450,85 T650,65 T800,45"
                />
                {/* Rising Line 3 */}
                <path 
                    className="rising-line rising-line-3"
                    d="M0,145 Q200,130 300,120 T500,90 T700,70 T800,50"
                />
            </svg>

            {/* Circular Charts */}
            <svg className="circular-chart-container circular-chart-1" viewBox="0 0 100 100">
                <circle className="circular-chart-bg" cx="50" cy="50" r="45" />
                <circle className="circular-chart-bg" cx="50" cy="50" r="35" strokeDasharray="5 3" />
                <circle className="circular-chart-bg" cx="50" cy="50" r="25" strokeDasharray="8 4" />
            </svg>

            <svg className="circular-chart-container circular-chart-2" viewBox="0 0 100 100">
                <circle className="circular-chart-bg" cx="50" cy="50" r="40" strokeDasharray="6 4" />
                <circle className="circular-chart-bg" cx="50" cy="50" r="30" strokeDasharray="10 5" />
                <circle className="circular-chart-bg" cx="50" cy="50" r="20" strokeDasharray="4 3" />
            </svg>
        </div>
    );
};

export default ChangePassword;

