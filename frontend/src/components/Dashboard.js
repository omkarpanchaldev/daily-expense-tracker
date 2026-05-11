import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const dayMs = 24 * 60 * 60 * 1000;
const chartPalette = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#64748b'];

const createEmptyAnalytics = () => ({
  totals: {
    today: 0,
    yesterday: 0,
    last7Days: 0,
    last30Days: 0,
    total: 0,
    forecastNext30: 0,
  },
  charts: {
    daily: null,
    weekly: null,
    monthly: null,
    total: null,
    donut: null,
  },
  insights: {
    recordsLoaded: 0,
    activeDays: 0,
    averageTransaction: 0,
    averageDailyLast30: 0,
    topCategoryName: 'No data yet',
    topCategoryTotal: 0,
    topCategoryShare: 0,
    busiestDayLabel: 'No data yet',
    busiestDayTotal: 0,
    monthlyChange: null,
    currentMonthTotal: 0,
    forecastNext7: 0,
    forecastNext30: 0,
    forecastDailyAverage: 0,
    forecastConfidence: 'Low',
    trendDirection: 'Stable',
    recentMonthlyAverage: 0,
  },
});

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const parseExpenseDate = (value) => {
  if (!value) return null;

  const parts = String(value).split('-').map(Number);
  if (parts.length === 3 && parts.every(Number.isFinite)) {
    const [year, month, day] = parts;
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
};

const toDayKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const toMonthKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};

const getWeekStart = (date) => {
  const result = startOfDay(date);
  const dayIndex = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - dayIndex);
  return result;
};

const formatCurrency = (value) => currencyFormatter.format(Number.isFinite(value) ? value : 0);
const roundToCurrency = (value) => Math.round(value * 100) / 100;

const formatDayLabel = (date) =>
  date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

const formatLongDate = (date) =>
  date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const formatMonthLabel = (monthKey) => {
  const [year, month] = monthKey.split('-').map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
};

const sumRange = (entries, fromDate, toDate) =>
  entries.reduce((sum, entry) => {
    if (entry.date >= fromDate && entry.date <= toDate) {
      return sum + entry.amount;
    }
    return sum;
  }, 0);

const sumValues = (values) => values.reduce((sum, value) => sum + value, 0);

const buildCumulativeSeries = (values) => {
  let runningTotal = 0;
  return values.map((value) => {
    runningTotal += value;
    return roundToCurrency(runningTotal);
  });
};

const buildRegressionForecast = (last30Series) => {
  if (!last30Series.length) {
    return {
      next7Total: 0,
      next30Total: 0,
      averageDaily: 0,
      confidence: 'Low',
      slope: 0,
    };
  }

  const total = sumValues(last30Series);
  const average = total / last30Series.length;
  const xMean = (last30Series.length - 1) / 2;
  const yMean = average;

  let numerator = 0;
  let denominator = 0;

  last30Series.forEach((value, index) => {
    numerator += (index - xMean) * (value - yMean);
    denominator += (index - xMean) ** 2;
  });

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yMean - slope * xMean;
  const nonZeroDays = last30Series.filter((value) => value > 0).length;

  const projected30 = Array.from({ length: 30 }, (_, index) => {
    const trendValue = intercept + slope * (last30Series.length + index);
    const blendedValue = average * 0.72 + Math.max(0, trendValue) * 0.28;
    return roundToCurrency(Math.max(0, blendedValue));
  });

  return {
    next7Total: roundToCurrency(sumValues(projected30.slice(0, 7))),
    next30Total: roundToCurrency(sumValues(projected30)),
    averageDaily: roundToCurrency(average),
    confidence: nonZeroDays >= 20 ? 'High' : nonZeroDays >= 10 ? 'Medium' : 'Low',
    slope: roundToCurrency(slope),
  };
};

const getTrendDirection = (slope) => {
  if (slope > 20) return 'Rising';
  if (slope < -20) return 'Cooling';
  return 'Stable';
};

const buildLineChart = ({ labels, data, label, color, fillColor }) => ({
  labels,
  datasets: [
    {
      label,
      data,
      borderColor: color,
      backgroundColor: fillColor,
      fill: true,
      tension: 0.35,
      borderWidth: 3,
      pointRadius: 2,
      pointHoverRadius: 4,
      pointBackgroundColor: color,
      pointBorderColor: '#081120',
    },
  ],
});

const buildAnalytics = (rawExpenses) => {
  const today = startOfDay(new Date());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const last7Start = new Date(today);
  last7Start.setDate(today.getDate() - 6);
  const last30Start = new Date(today);
  last30Start.setDate(today.getDate() - 29);

  const expenses = rawExpenses
    .map((item) => ({
      ...item,
      date: parseExpenseDate(item.ExpenseDate),
      amount: Number.parseFloat(item.ExpenseCost) || 0,
      category: item.ExpenseItem?.trim() || 'Other',
    }))
    .filter((item) => item.date)
    .sort((a, b) => a.date - b.date);

  if (!expenses.length) {
    return createEmptyAnalytics();
  }

  const dailyTotalsMap = new Map();
  const weeklyTotalsMap = new Map();
  const monthlyTotalsMap = new Map();
  const categoryTotalsMap = new Map();

  expenses.forEach((expense) => {
    const dayKey = toDayKey(expense.date);
    const weekStart = getWeekStart(expense.date);
    const weekKey = toDayKey(weekStart);
    const monthKey = toMonthKey(expense.date);

    dailyTotalsMap.set(dayKey, (dailyTotalsMap.get(dayKey) || 0) + expense.amount);
    weeklyTotalsMap.set(weekKey, (weeklyTotalsMap.get(weekKey) || 0) + expense.amount);
    monthlyTotalsMap.set(monthKey, (monthlyTotalsMap.get(monthKey) || 0) + expense.amount);
    categoryTotalsMap.set(expense.category, (categoryTotalsMap.get(expense.category) || 0) + expense.amount);
  });

  const firstDate = startOfDay(expenses[0].date);
  const continuousDailyDates = [];
  for (let cursor = new Date(firstDate); cursor <= today; cursor = new Date(cursor.getTime() + dayMs)) {
    continuousDailyDates.push(new Date(cursor));
  }

  const dailyValues = continuousDailyDates.map((date) => roundToCurrency(dailyTotalsMap.get(toDayKey(date)) || 0));
  const cumulativeValues = buildCumulativeSeries(dailyValues);

  const dailyChartDates = continuousDailyDates.slice(-21);
  const totalChartDates = continuousDailyDates.slice(-45);

  const weeklySeries = [...weeklyTotalsMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12);

  const monthlySeries = [...monthlyTotalsMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-12);

  const recent30Series = [];
  for (let index = 29; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    recent30Series.push(roundToCurrency(dailyTotalsMap.get(toDayKey(date)) || 0));
  }

  const forecast = buildRegressionForecast(recent30Series);
  const total = roundToCurrency(sumValues(expenses.map((expense) => expense.amount)));
  const todayTotal = roundToCurrency(sumRange(expenses, today, today));
  const yesterdayTotal = roundToCurrency(sumRange(expenses, yesterday, yesterday));
  const last7DaysTotal = roundToCurrency(sumRange(expenses, last7Start, today));
  const last30DaysTotal = roundToCurrency(sumRange(expenses, last30Start, today));

  const categoryTotals = [...categoryTotalsMap.entries()].sort((a, b) => b[1] - a[1]);
  const topCategory = categoryTotals[0];
  const busiestDayEntry = [...dailyTotalsMap.entries()].sort((a, b) => b[1] - a[1])[0];
  const previousMonthTotal = monthlySeries.length > 1 ? monthlySeries[monthlySeries.length - 2][1] : null;
  const currentMonthTotal = monthlySeries.length ? monthlySeries[monthlySeries.length - 1][1] : 0;
  const recentMonthlyAverage =
    monthlySeries.length > 0 ? roundToCurrency(sumValues(monthlySeries.map(([, value]) => value)) / monthlySeries.length) : 0;

  return {
    totals: {
      today: todayTotal,
      yesterday: yesterdayTotal,
      last7Days: last7DaysTotal,
      last30Days: last30DaysTotal,
      total,
      forecastNext30: forecast.next30Total,
    },
    charts: {
      daily: buildLineChart({
        labels: dailyChartDates.map((date) => formatDayLabel(date)),
        data: dailyValues.slice(-21),
        label: 'Daily expense',
        color: '#39ff14',
        fillColor: 'rgba(57, 255, 20, 0.16)',
      }),
      weekly: buildLineChart({
        labels: weeklySeries.map(([weekKey]) => {
          const weekDate = parseExpenseDate(weekKey);
          return weekDate ? `Week of ${formatDayLabel(weekDate)}` : weekKey;
        }),
        data: weeklySeries.map(([, value]) => roundToCurrency(value)),
        label: 'Weekly expense',
        color: '#ff1744',
        fillColor: 'rgba(255, 23, 68, 0.16)',
      }),
      monthly: buildLineChart({
        labels: monthlySeries.map(([monthKey]) => formatMonthLabel(monthKey)),
        data: monthlySeries.map(([, value]) => roundToCurrency(value)),
        label: 'Monthly expense',
        color: '#00f5d4',
        fillColor: 'rgba(0, 245, 212, 0.16)',
      }),
      total: buildLineChart({
        labels: totalChartDates.map((date) => formatDayLabel(date)),
        data: cumulativeValues.slice(-45),
        label: 'Total expense growth',
        color: '#ff8a00',
        fillColor: 'rgba(255, 138, 0, 0.18)',
      }),
      donut: {
        labels: categoryTotals.map(([label]) => label),
        datasets: [
          {
            label: 'Category share',
            data: categoryTotals.map(([, value]) => roundToCurrency(value)),
            backgroundColor: categoryTotals.map((_, index) => chartPalette[index % chartPalette.length]),
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
    },
    insights: {
      recordsLoaded: expenses.length,
      activeDays: dailyTotalsMap.size,
      averageTransaction: roundToCurrency(total / expenses.length),
      averageDailyLast30: roundToCurrency(last30DaysTotal / 30),
      topCategoryName: topCategory?.[0] || 'No data yet',
      topCategoryTotal: roundToCurrency(topCategory?.[1] || 0),
      topCategoryShare: total > 0 ? roundToCurrency(((topCategory?.[1] || 0) / total) * 100) : 0,
      busiestDayLabel: busiestDayEntry ? formatLongDate(parseExpenseDate(busiestDayEntry[0])) : 'No data yet',
      busiestDayTotal: roundToCurrency(busiestDayEntry?.[1] || 0),
      monthlyChange:
        previousMonthTotal && previousMonthTotal > 0
          ? roundToCurrency(((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100)
          : null,
      currentMonthTotal: roundToCurrency(currentMonthTotal),
      forecastNext7: forecast.next7Total,
      forecastNext30: forecast.next30Total,
      forecastDailyAverage: forecast.averageDaily,
      forecastConfidence: forecast.confidence,
      trendDirection: getTrendDirection(forecast.slope),
      recentMonthlyAverage,
    },
  };
};

const lineChartOptions = (accentColor) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: '#081120',
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#6b7280',
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 7,
      },
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#6b7280',
        callback: (value) => formatCurrency(value),
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.14)',
      },
      border: {
        color: accentColor,
      },
    },
  },
});

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '64%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#475569',
        padding: 16,
        usePointStyle: true,
      },
    },
    tooltip: {
      backgroundColor: '#081120',
      padding: 12,
      callbacks: {
        label: (context) => `${context.label}: ${formatCurrency(context.parsed)}`,
      },
    },
  },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const userId = localStorage.getItem('userId');

  const [analytics, setAnalytics] = useState(createEmptyAnalytics());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [plannedExpense, setPlannedExpense] = useState('');

  const loadExpenses = useCallback(async () => {
    if (!userId) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setAnalytics(buildAnalytics(data));
    } catch (fetchError) {
      console.error('Error fetching expenses:', fetchError);
      setAnalytics(createEmptyAnalytics());
      setError(`Failed to load dashboard data. ${fetchError.message}`);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    loadExpenses();
  }, [loadExpenses, navigate, userId]);

  const plannedExpenseValue = Number.parseFloat(plannedExpense) || 0;
  const adjustedForecast7 = roundToCurrency(analytics.insights.forecastNext7 + plannedExpenseValue);
  const adjustedForecast30 = roundToCurrency(analytics.insights.forecastNext30 + plannedExpenseValue);
  const forecastImpact =
    analytics.insights.forecastNext30 > 0
      ? roundToCurrency((plannedExpenseValue / analytics.insights.forecastNext30) * 100)
      : 0;
  const recommendedBuffer = roundToCurrency(
    Math.max(adjustedForecast30 * 0.12, analytics.insights.averageDailyLast30 * 5, 0)
  );
  const riskLevel =
    adjustedForecast30 > analytics.totals.last30Days * 1.2
      ? 'High'
      : adjustedForecast30 > analytics.totals.last30Days * 0.95
        ? 'Moderate'
        : 'Low';
  const customerRiskLabel =
    riskLevel === 'High'
      ? 'Needs attention'
      : riskLevel === 'Moderate'
        ? 'Watch closely'
        : 'Looks comfortable';

  const monthlyMovementText =
    analytics.insights.monthlyChange === null
      ? 'Not enough data'
      : `${analytics.insights.monthlyChange >= 0 ? '+' : ''}${analytics.insights.monthlyChange}%`;

  const aiNarrative =
    plannedExpenseValue > 0
      ? `If you add ${formatCurrency(plannedExpenseValue)} as an upcoming expense, your estimated spend for the next 30 days becomes ${formatCurrency(adjustedForecast30)}. This looks ${customerRiskLabel.toLowerCase()}, and keeping around ${formatCurrency(recommendedBuffer)} aside as a buffer would be safer.`
      : `Based on your recent spending pattern, you may spend around ${formatCurrency(analytics.insights.forecastNext30)} in the next 30 days. Add an upcoming expense below to see how that changes your estimate.`;

  const snapshotCards = [
    { label: 'This month', value: formatCurrency(analytics.insights.currentMonthTotal) },
    { label: 'Average per day', value: formatCurrency(analytics.insights.averageDailyLast30) },
    { label: 'Top category', value: analytics.insights.topCategoryName },
    { label: 'Busiest day', value: analytics.insights.busiestDayLabel },
  ];

  const statCards = [
    {
      title: "Today's Expense",
      value: analytics.totals.today,
      hint: 'What you spent today',
      accent: 'green',
    },
    {
      title: "Yesterday's Expense",
      value: analytics.totals.yesterday,
      hint: 'Previous day comparison',
      accent: 'red',
    },
    {
      title: 'Last 7 Days',
      value: analytics.totals.last7Days,
      hint: 'Recent weekly spending',
      accent: 'cyan',
    },
    {
      title: 'Last 30 Days',
      value: analytics.totals.last30Days,
      hint: 'Rolling monthly spend',
      accent: 'orange',
    },
    {
      title: 'Total Expense',
      value: analytics.totals.total,
      hint: 'All recorded expenses',
      accent: 'violet',
    },
    {
      title: 'Forecast Next 30 Days',
      value: analytics.totals.forecastNext30,
      hint: `${analytics.insights.forecastConfidence} confidence prediction`,
      accent: 'lime',
    },
  ];

  const lineCharts = [
    {
      key: 'weekly',
      title: 'Weekly Expense',
      subtitle: 'Recent weekly totals',
      chart: analytics.charts.weekly,
      accent: '#ff1744',
    },
    {
      key: 'monthly',
      title: 'Monthly Expense',
      subtitle: 'Month by month trend',
      chart: analytics.charts.monthly,
      accent: '#00f5d4',
    },
    {
      key: 'total',
      title: 'Total Expense',
      subtitle: 'Cumulative growth over time',
      chart: analytics.charts.total,
      accent: '#ff8a00',
    },
    {
      key: 'daily',
      title: 'Daily Expense',
      subtitle: 'Latest daily activity',
      chart: analytics.charts.daily,
      accent: '#39ff14',
    },
  ];

  const forecastSummaryCards = [
    { label: 'Expected in next 7 days', value: formatCurrency(analytics.insights.forecastNext7) },
    { label: 'Expected in next 30 days', value: formatCurrency(analytics.insights.forecastNext30) },
    { label: 'After your upcoming expense (7 days)', value: formatCurrency(adjustedForecast7) },
    { label: 'After your upcoming expense (30 days)', value: formatCurrency(adjustedForecast30) },
    { label: 'Extra impact from new expense', value: plannedExpenseValue > 0 ? `${forecastImpact}%` : '0%' },
  ];

  const forecastGuideCards = [
    { label: 'Budget pressure', value: customerRiskLabel },
    { label: 'Suggested safety buffer', value: formatCurrency(recommendedBuffer) },
    { label: 'Average spending per day', value: formatCurrency(analytics.insights.forecastDailyAverage) },
    { label: 'Main spending category', value: analytics.insights.topCategoryName },
    { label: 'Current month spending', value: formatCurrency(analytics.insights.currentMonthTotal) },
    { label: 'Recent monthly average', value: formatCurrency(analytics.insights.recentMonthlyAverage) },
  ];

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="dashboard-spinner" />
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-bar-graph">
        <svg viewBox="0 0 400 180" preserveAspectRatio="none">
          <rect x="10" y="40" width="50" height="140" />
          <rect x="70" y="10" width="50" height="170" />
          <rect x="130" y="50" width="50" height="130" />
          <rect x="190" y="0" width="50" height="180" />
          <rect x="250" y="30" width="50" height="150" />
          <rect x="310" y="60" width="50" height="120" />
        </svg>
      </div>

      <div className="dashboard-bar-graph-2">
        <svg viewBox="0 0 280 140" preserveAspectRatio="none">
          <rect x="10" y="30" width="40" height="110" />
          <rect x="60" y="10" width="40" height="130" />
          <rect x="110" y="50" width="40" height="90" />
          <rect x="160" y="20" width="40" height="120" />
          <rect x="210" y="40" width="40" height="100" />
        </svg>
      </div>

      <div className="dashboard-bg-icon dashboard-bg-icon-1">
        <i className="fas fa-chart-bar"></i>
      </div>
      <div className="dashboard-bg-icon dashboard-bg-icon-2">
        <i className="fas fa-wallet"></i>
      </div>
      <div className="dashboard-bg-icon dashboard-bg-icon-3">
        <i className="fas fa-rupee-sign"></i>
      </div>
      <div className="dashboard-bg-icon dashboard-bg-icon-4">
        <i className="fas fa-receipt"></i>
      </div>
      <div className="dashboard-bg-icon dashboard-bg-icon-5">
        <i className="fas fa-chart-line"></i>
      </div>
      <div className="dashboard-bg-icon dashboard-bg-icon-6">
        <i className="fas fa-piggy-bank"></i>
      </div>

      <div className="dashboard-pie-chart">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#667eea" strokeWidth="20" strokeDasharray="70 170" transform="rotate(-90 50 50)" />
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#764ba2" strokeWidth="20" strokeDasharray="50 170" strokeDashoffset="-70" transform="rotate(-90 50 50)" />
          <circle cx="50" cy="50" r="45" fill="transparent" stroke="#43e97b" strokeWidth="20" strokeDasharray="50 170" strokeDashoffset="-120" transform="rotate(-90 50 50)" />
        </svg>
      </div>

      <div className="dashboard-line-graph">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none">
          <path d="M0,80 Q75,60 150,40 T300,20" />
        </svg>
      </div>

      <div className="dashboard-line-graph-red">
        <svg viewBox="0 0 250 80" preserveAspectRatio="none">
          <path d="M0,60 Q60,40 125,30 T250,15" />
        </svg>
      </div>

      <div className="dashboard-line-graph-green">
        <svg viewBox="0 0 200 70" preserveAspectRatio="none">
          <path d="M0,55 Q50,35 100,50 T200,20" />
        </svg>
      </div>

      <div className="dashboard-shape dashboard-shape-1"></div>
      <div className="dashboard-shape dashboard-shape-2"></div>
      <div className="dashboard-shape dashboard-shape-3"></div>
      <div className="dashboard-shape dashboard-shape-4"></div>

      <div className="dashboard-shell">
        <section className="dashboard-hero">
          <div>
            <p className="dashboard-eyebrow">Expense Control Center</p>
            <h1>Professional expense dashboard</h1>
            <p className="dashboard-subtitle">
              Review your latest spending, read trends quickly, explore category share, and simulate future expense impact in one clear dashboard.
            </p>
          </div>

          <div className="dashboard-hero-actions">
            <div className="dashboard-user-chip">{userName ? `Welcome, ${userName}` : 'Personal expense analytics'}</div>
            <button type="button" className="dashboard-refresh-button" onClick={loadExpenses}>
              Refresh Dashboard
            </button>
          </div>
        </section>

        {error ? <div className="dashboard-alert">{error}</div> : null}

        <section className="dashboard-snapshot-panel">
          <div className="dashboard-section-title">
            <p className="dashboard-panel-kicker">Quick Snapshot</p>
            <h2>Short summary of your spending</h2>
          </div>

          <div className="dashboard-snapshot-grid">
            {snapshotCards.map((item) => (
              <div key={item.label} className="dashboard-snapshot-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="dashboard-snapshot-summary">
            <span>{analytics.insights.recordsLoaded} expenses tracked</span>
            <span>{analytics.insights.activeDays} active spending days</span>
            <span>Monthly movement {monthlyMovementText}</span>
            <span>{analytics.insights.forecastConfidence} forecast confidence</span>
          </div>
        </section>

        <section className="dashboard-stats-grid">
          {statCards.map((card) => (
            <article key={card.title} className={`dashboard-stat-card accent-${card.accent}`}>
              <span className="dashboard-stat-label">{card.title}</span>
              <strong className="dashboard-stat-value">{formatCurrency(card.value)}</strong>
              <span className="dashboard-stat-hint">{card.hint}</span>
            </article>
          ))}
        </section>

        <section className="dashboard-lines-grid">
          {lineCharts.map((item) => (
            <article key={item.key} className="dashboard-chart-panel">
              <div className="dashboard-chart-header">
                <div>
                  <p className="dashboard-panel-kicker">Line Graph</p>
                  <h2>{item.title}</h2>
                </div>
                <span className="dashboard-panel-meta">{item.subtitle}</span>
              </div>

              <div className="dashboard-chart-area dashboard-chart-area-line">
                {item.chart ? (
                  <Line data={item.chart} options={lineChartOptions(item.accent)} />
                ) : (
                  <div className="dashboard-empty-chart">No expense data available yet.</div>
                )}
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-insights-grid">
          <article className="dashboard-chart-panel dashboard-donut-panel">
            <div className="dashboard-chart-header">
              <div>
                <p className="dashboard-panel-kicker">Category View</p>
                <h2>Expense donut chart</h2>
              </div>
              <span className="dashboard-panel-meta">All categories</span>
            </div>

            <div className="dashboard-chart-area dashboard-chart-area-donut">
              {analytics.charts.donut ? (
                <Doughnut data={analytics.charts.donut} options={donutOptions} />
              ) : (
                <div className="dashboard-empty-chart">Add expenses to see category distribution.</div>
              )}
            </div>

            <div className="dashboard-mini-list">
              <div className="dashboard-mini-item">
                <span>Top category</span>
                <strong>{analytics.insights.topCategoryName}</strong>
              </div>
              <div className="dashboard-mini-item">
                <span>Top category spend</span>
                <strong>{formatCurrency(analytics.insights.topCategoryTotal)}</strong>
              </div>
              <div className="dashboard-mini-item">
                <span>Share of total spend</span>
                <strong>{analytics.insights.topCategoryShare}%</strong>
              </div>
            </div>
          </article>

          <article className="dashboard-forecast-panel">
            <div className="dashboard-chart-header dashboard-chart-header-forecast">
              <div>
                <p className="dashboard-panel-kicker">AI Forecasting</p>
                <h2>Easy future expense estimate</h2>
              </div>
              <span className="dashboard-forecast-badge">{analytics.insights.forecastConfidence} confidence</span>
            </div>

            <div className="dashboard-forecast-topline">
              <strong>{formatCurrency(adjustedForecast30)}</strong>
              <span>This is your estimated total spending for the next 30 days, including any upcoming expense you enter below.</span>
            </div>

            <div className="dashboard-forecast-input-row">
              <label className="dashboard-forecast-label" htmlFor="plannedExpense">
                Add an upcoming expense to check the effect
              </label>
              <input
                id="plannedExpense"
                type="number"
                min="0"
                step="1"
                className="dashboard-forecast-input"
                placeholder="Example: rent, fees, travel, or shopping amount"
                value={plannedExpense}
                onChange={(event) => setPlannedExpense(event.target.value)}
              />
            </div>

            <div className="dashboard-forecast-help">
              <div className="dashboard-forecast-help-item">
                <span>How this works</span>
                <strong>We look at your recent spending pattern and estimate what you may spend next.</strong>
              </div>
              <div className="dashboard-forecast-help-item">
                <span>What to enter</span>
                <strong>Add one planned expense to see how it changes the forecast instantly.</strong>
              </div>
            </div>

            <div className="dashboard-forecast-cards">
              {forecastSummaryCards.map((item) => (
                <div key={item.label} className="dashboard-forecast-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="dashboard-forecast-guide-grid">
              {forecastGuideCards.map((item) => (
                <div key={item.label} className="dashboard-forecast-guide-card">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="dashboard-forecast-highlight">
              <span>What this means for you</span>
              <strong>{customerRiskLabel}</strong>
              <p>{aiNarrative}</p>
              <p>
                Spending trend:
                {' '}
                <strong>{analytics.insights.trendDirection}</strong>
              </p>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
