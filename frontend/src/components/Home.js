import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const userId = localStorage.getItem('userId');

  return (
    <div className="home-container">
      {/* Floating Dollar Notes */}
      <div className="floating-dollar dollar-1">100</div>
      <div className="floating-dollar dollar-2">50</div>
      <div className="floating-dollar dollar-3">20</div>
      
      {/* Floating Coins */}
      <div className="floating-coin coin-1"></div>
      <div className="floating-coin coin-2"></div>
      <div className="floating-coin coin-3"></div>
      <div className="floating-coin coin-4"></div>
      
      {/* Floating Expense Comments */}
      <div className="expense-comment comment-1">
        <span className="icon">📈</span>
        <span>Budget on track!</span>
      </div>
      <div className="expense-comment comment-2">
        <span className="icon">💳</span>
        <span>Payment done</span>
      </div>
      <div className="expense-comment comment-3">
        <span className="icon">✅</span>
        <span>Bill paid!</span>
      </div>
      
      {/* Floating Credit Cards */}
      <div className="floating-card card-1">
        <span className="card-icon">💳</span>
        <span className="card-amount">$450</span>
      </div>
      <div className="floating-card card-2">
        <span className="card-icon">🏦</span>
        <span className="card-amount">$2,100</span>
      </div>
      
      {/* Floating Calculator */}
      <div className="floating-calc calc-1">
        <span className="calc-btn">7</span>
        <span className="calc-btn">8</span>
        <span className="calc-btn">9</span>
        <span className="calc-btn">4</span>
        <span className="calc-btn">5</span>
        <span className="calc-btn">6</span>
      </div>
      
      {/* Floating Pie Charts */}
      <div className="floating-pie pie-1"></div>
      <div className="floating-pie pie-2"></div>

      {/* Professional Background Graphs */}
      {/* Large Area Graph */}
      <div className="home-area-graph area-graph-1">
        <svg viewBox="0 0 500 200">
          <defs>
            <linearGradient id="homeAreaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#667eea" stopOpacity="0.03"/>
            </linearGradient>
          </defs>
          <line x1="50" y1="30" x2="50" y2="170" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
          <line x1="150" y1="30" x2="150" y2="170" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
          <line x1="250" y1="30" x2="250" y2="170" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
          <line x1="350" y1="30" x2="350" y2="170" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
          <line x1="450" y1="30" x2="450" y2="170" stroke="rgba(102, 126, 234, 0.08)" stroke-width="1"/>
          <line x1="50" y1="50" x2="480" y2="50" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="50" y1="90" x2="480" y2="90" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="50" y1="130" x2="480" y2="130" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <path d="M50,150 Q100,120 150,140 T250,100 T350,120 T450,60" fill="none" stroke="url(#homeAreaGradient1)" stroke-width="2.5"/>
          <path d="M50,150 Q100,120 150,140 T250,100 T350,120 T450,60 L450,180 L50,180 Z" fill="url(#homeAreaGradient1)"/>
        </svg>
      </div>

      {/* Bar Chart */}
      <div className="home-bar-chart bar-chart-1">
        <svg viewBox="0 0 300 120">
          <line x1="30" y1="100" x2="280" y2="100" stroke="rgba(102, 126, 234, 0.25)" stroke-width="2"/>
          <line x1="30" y1="100" x2="30" y2="15" stroke="rgba(102, 126, 234, 0.25)" stroke-width="2"/>
          <rect x="45" y="60" width="25" height="40" fill="url(#homeBarGradient1)" rx="3"/>
          <rect x="85" y="35" width="25" height="65" fill="url(#homeBarGradient2)" rx="3"/>
          <rect x="125" y="50" width="25" height="50" fill="url(#homeBarGradient3)" rx="3"/>
          <rect x="165" y="25" width="25" height="75" fill="url(#homeBarGradient1)" rx="3"/>
          <rect x="205" y="45" width="25" height="55" fill="url(#homeBarGradient2)" rx="3"/>
          <rect x="245" y="70" width="25" height="30" fill="url(#homeBarGradient3)" rx="3"/>
          <defs>
            <linearGradient id="homeBarGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea"/>
              <stop offset="100%" stopColor="#764ba2"/>
            </linearGradient>
            <linearGradient id="homeBarGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#43e97b"/>
              <stop offset="100%" stopColor="#38f9d7"/>
            </linearGradient>
            <linearGradient id="homeBarGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5576c"/>
              <stop offset="100%" stopColor="#f093fb"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Pie Chart */}
      <div className="home-pie-chart pie-chart-1">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#homePieGradient1)" stroke-width="20" stroke-dasharray="75 251" transform="rotate(-90 50 50)"/>
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#homePieGradient2)" stroke-width="20" stroke-dasharray="50 251" stroke-dashoffset="-75" transform="rotate(-90 50 50)"/>
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#homePieGradient3)" stroke-width="20" stroke-dasharray="40 251" stroke-dashoffset="-125" transform="rotate(-90 50 50)"/>
          <circle cx="50" cy="50" r="40" fill="transparent" stroke="url(#homePieGradient4)" stroke-width="20" stroke-dasharray="86 251" stroke-dashoffset="-165" transform="rotate(-90 50 50)"/>
          <defs>
            <linearGradient id="homePieGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea"/>
              <stop offset="100%" stopColor="#764ba2"/>
            </linearGradient>
            <linearGradient id="homePieGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#43e97b"/>
              <stop offset="100%" stopColor="#38f9d7"/>
            </linearGradient>
            <linearGradient id="homePieGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5576c"/>
              <stop offset="100%" stopColor="#f093fb"/>
            </linearGradient>
            <linearGradient id="homePieGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fa709a"/>
              <stop offset="100%" stopColor="#fee140"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

{/* Light Big Background Graphs */}
      <div className="light-graph light-graph-1">
        <svg viewBox="0 0 600 250">
          <defs>
            <linearGradient id="lightGraphGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="#667eea" stopOpacity="0.01"/>
            </linearGradient>
          </defs>
          <line x1="60" y1="40" x2="60" y2="210" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="160" y1="40" x2="160" y2="210" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="260" y1="40" x2="260" y2="210" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="360" y1="40" x2="360" y2="210" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="460" y1="40" x2="460" y2="210" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="560" y1="40" x2="560" y2="210" stroke="rgba(102, 126, 234, 0.05)" stroke-width="1"/>
          <line x1="60" y1="70" x2="570" y2="70" stroke="rgba(102, 126, 234, 0.03)" stroke-width="1"/>
          <line x1="60" y1="120" x2="570" y2="120" stroke="rgba(102, 126, 234, 0.03)" stroke-width="1"/>
          <line x1="60" y1="170" x2="570" y2="170" stroke="rgba(102, 126, 234, 0.03)" stroke-width="1"/>
          <path d="M60,180 Q120,150 180,170 T300,120 T420,140 T540,80" fill="none" stroke="url(#lightGraphGrad1)" stroke-width="3"/>
          <path d="M60,180 Q120,150 180,170 T300,120 T420,140 T540,80 L540,230 L60,230 Z" fill="url(#lightGraphGrad1)"/>
        </svg>
      </div>

      <div className="light-graph light-graph-2">
        <svg viewBox="0 0 500 200">
          <defs>
            <linearGradient id="lightGraphGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#43e97b" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#43e97b" stopOpacity="0.01"/>
            </linearGradient>
          </defs>
          <path d="M40,160 Q100,130 160,145 T280,95 T400,115 T460,55" fill="none" stroke="url(#lightGraphGrad2)" stroke-width="2.5"/>
          <path d="M40,160 Q100,130 160,145 T280,95 T400,115 T460,55 L460,190 L40,190 Z" fill="url(#lightGraphGrad2)"/>
        </svg>
      </div>

      <div className="light-graph light-graph-3">
        <svg viewBox="0 0 400 180">
          <defs>
            <linearGradient id="lightGraphGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f5576c" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#f5576c" stopOpacity="0.01"/>
            </linearGradient>
          </defs>
          <path d="M30,140 Q80,110 130,125 T250,75 T340,95" fill="none" stroke="url(#lightGraphGrad3)" stroke-width="2.5"/>
          <path d="M30,140 Q80,110 130,125 T250,75 T340,95 L340,170 L30,170 Z" fill="url(#lightGraphGrad3)"/>
        </svg>
      </div>

      {/* Red Warning Elements */}
      <div className="home-red-orb red-orb-1"></div>
      <div className="home-red-orb red-orb-2"></div>
      <div className="home-warning warning-1">
        <span className="warning-icon">⚠️</span>
      </div>

      {/* Line Graph */}
      <div className="home-line-graph line-graph-1">
        <svg viewBox="0 0 200 80">
          <path d="M0,70 Q40,50 80,55 T160,30 T200,10" fill="none" stroke="url(#homeLineGradient1)" stroke-width="3" stroke-linecap="round"/>
          <defs>
            <linearGradient id="homeLineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#667eea" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#764ba2" stopOpacity="0.5"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating Expense Comment Badges */}
      <div className="floating-badge badge-1">
        <span className="badge-icon">💰</span>
        <span className="badge-text">$1,234 saved this month!</span>
      </div>
      
      <div className="floating-badge badge-2">
        <span className="badge-icon">📊</span>
        <span className="badge-text">85% under budget</span>
      </div>
      
      <div className="floating-badge badge-3">
        <span className="badge-icon">🎯</span>
        <span className="badge-text">Track every expense</span>
      </div>
      
      <div className="floating-badge badge-4">
        <span className="badge-icon">📱</span>
        <span className="badge-text">Easy mobile tracking</span>
      </div>
      
      <div className="floating-badge badge-5">
        <span className="badge-icon">💳</span>
        <span className="badge-text">Smart expense insights</span>
      </div>

{/* iPhone 16 Pro Mockup */}
      <div className="iphone-container">
        <div className="iphone-frame">
          {/* Dynamic Island */}
          <div className="dynamic-island"></div>
          
          {/* iPhone Screen with Expense Tracker UI */}
          <div className="iphone-screen">
            {/* Comments Coming Out of Screen */}
            <div className="screen-comment screen-comment-1">
              <span className="screen-comment-emoji">💰</span>
              <span className="screen-comment-text">Track Expenses!</span>
            </div>
            <div className="screen-comment screen-comment-2">
              <span className="screen-comment-emoji">📊</span>
              <span className="screen-comment-text">View Reports</span>
            </div>
            <div className="screen-comment screen-comment-3">
              <span className="screen-comment-emoji">💳</span>
              <span className="screen-comment-text">Easy Payments</span>
            </div>
            
            {/* Status Bar */}
            <div className="status-bar">
              <span>9:41</span>
              <div className="status-icons">
                <span>📶</span>
                <span>📡</span>
                <span>🔋</span>
              </div>
            </div>
            
            {/* App Header */}
            <div className="app-header">
              <h3>💰 Daily Expense Tracker</h3>
              <span className="app-date">January 15, 2025</span>
            </div>
            
            {/* Balance Card */}
            <div className="balance-card">
              <div className="balance-label">Total Balance</div>
              <div className="balance-amount">$2,456.78</div>
              <div className="balance-stats">
                <span className="stat-income">↑ $3,500</span>
                <span className="stat-expense">↓ $1,043.22</span>
              </div>
            </div>
            
            {/* Recent Transactions */}
            <div className="transactions-section">
              <h4>📝 Recent Expenses</h4>
              
              <div className="transaction-item">
                <div className="transaction-icon food">🍔</div>
                <div className="transaction-details">
                  <span className="transaction-title">Food & Dining</span>
                  <span className="transaction-desc">Restaurant dinner</span>
                </div>
                <div className="transaction-amount expense">-$45.00</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon transport">🚗</div>
                <div className="transaction-details">
                  <span className="transaction-title">Transportation</span>
                  <span className="transaction-desc">Uber ride</span>
                </div>
                <div className="transaction-amount expense">-$23.50</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon shopping">🛒</div>
                <div className="transaction-details">
                  <span className="transaction-title">Shopping</span>
                  <span className="transaction-desc">Grocery store</span>
                </div>
                <div className="transaction-amount expense">-$89.99</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon entertainment">🎬</div>
                <div className="transaction-details">
                  <span className="transaction-title">Entertainment</span>
                  <span className="transaction-desc">Movie tickets</span>
                </div>
                <div className="transaction-amount expense">-$32.00</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon income-badge">💵</div>
                <div className="transaction-details">
                  <span className="transaction-title">Salary</span>
                  <span className="transaction-desc">Monthly salary</span>
                </div>
                <div className="transaction-amount income">+$3,500.00</div>
              </div>
              
              <div className="transaction-item">
                <div className="transaction-icon utilities">💡</div>
                <div className="transaction-details">
                  <span className="transaction-title">Utilities</span>
                  <span className="transaction-desc">Electricity bill</span>
                </div>
                <div className="transaction-amount expense">-$125.00</div>
              </div>
            </div>
            
            {/* Bottom Navigation */}
            <div className="bottom-nav">
              <div className="nav-item active">
                <span>🏠</span>
                <span>Home</span>
              </div>
              <div className="nav-item">
                <span>📊</span>
                <span>Reports</span>
              </div>
              <div className="nav-item">
                <span>➕</span>
                <span>Add</span>
              </div>
              <div className="nav-item">
                <span>👤</span>
                <span>Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small Red Bubbles Going Upward */}
      <div className="red-bubble bubble-1"></div>
      <div className="red-bubble bubble-2"></div>
      <div className="red-bubble bubble-3"></div>
      <div className="red-bubble bubble-4"></div>
      <div className="red-bubble bubble-5"></div>
      <div className="red-bubble bubble-6"></div>
      <div className="red-bubble bubble-7"></div>
      <div className="red-bubble bubble-8"></div>

      {/* Additional Red Glowing Orbs */}
      <div className="red-glow-orb orb-glow-1"></div>
      <div className="red-glow-orb orb-glow-2"></div>
      <div className="red-glow-orb orb-glow-3"></div>

      {/* Red Sparkles */}
      <div className="red-sparkle sparkle-1"></div>
      <div className="red-sparkle sparkle-2"></div>
      <div className="red-sparkle sparkle-3"></div>
      <div className="red-sparkle sparkle-4"></div>
      <div className="red-sparkle sparkle-5"></div>

      {/* Main Content */}
      <div className="container text-center mt-5 main-content">
        <h1 className="home-title">Welcome to <span className='text-primary'>Daily Expense Tracker</span></h1>
        <p className='lead home-subtitle'>Track your daily expenses easily and efficiently</p>
         
         <div className='mt-4 home-buttons'>
          {userId ? (
              <>
              <Link to="/dashboard" className='btn btn-warning mx-2'>
            <i className="fas fa-chart-line me-2"></i>Start Tracking For Free</Link>
            </>
          ) : (
              <>
              <Link to="/signup" className='btn btn-primary mx-2'>
            <i className="fas fa-user-plus me-2"></i> Signup</Link>

            <Link to="/login" className='btn btn-success mx-2'>
            <i className="fas fa-sign-in-alt me-2"></i> Login</Link>
            </>
          )}

         </div>
      </div>
    </div>
  )
}

export default Home;

