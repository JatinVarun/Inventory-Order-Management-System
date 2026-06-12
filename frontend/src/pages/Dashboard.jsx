import React, { useState, useEffect } from 'react';
import api from '../api';
import { Package, Users, ShoppingCart, AlertTriangle, TrendingUp, RefreshCw, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsRefreshing(true);
    try {
      const [productsRes, customersRes, ordersRes] = await Promise.all([
        api.get('/products/'),
        api.get('/customers/'),
        api.get('/orders/')
      ]);

      const products = productsRes.data;
      const customers = customersRes.data;
      const orders = ordersRes.data;

      const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
      const lowStock = products.filter(p => p.quantity <= 5);

      setStats({
        totalProducts: products.length,
        totalCustomers: customers.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        lowStockProducts: lowStock
      });
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const StatCard = ({ title, value, icon, colorClass, trend }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all group duration-300">
      <div className="space-y-2">
        <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {value}
        </h3>
        {trend && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <span className="bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 rounded">{trend}</span>
            <span className="text-slate-400">vs last month</span>
          </p>
        )}
      </div>
      <div className={`p-4 rounded-xl ${colorClass} shadow-inner transition-transform group-hover:scale-110 duration-300`}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 tracking-tight text-slate-900 dark:text-slate-100">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-3xl font-bold font-sans tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            Dashboard Overview
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time analytics and corporate inventory monitoring data.
          </p>
        </div>
        
        <button 
          onClick={fetchDashboardData} 
          disabled={isRefreshing}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl shadow-sm text-sm font-semibold text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 disabled:opacity-50 cursor-pointer w-full sm:w-auto"
        >
          <RefreshCw size={15} className={`text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Syncing...' : 'Sync Data'}</span>
        </button>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-400">
          <RefreshCw size={32} className="animate-spin text-indigo-500" />
          <span className="text-sm font-medium tracking-wide">Aggregating analytical streams...</span>
        </div>
      ) : (
        <>
          {/* --- STATS GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Revenue" 
              value={`$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
              icon={<TrendingUp size={22} className="text-emerald-600 dark:text-emerald-400" />} 
              colorClass="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30"
              trend="+12.4%"
            />
            <StatCard 
              title="Total Orders" 
              value={stats.totalOrders.toLocaleString()} 
              icon={<ShoppingCart size={22} className="text-blue-600 dark:text-blue-400" />} 
              colorClass="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30"
              trend="+4.1%"
            />
            <StatCard 
              title="Total Customers" 
              value={stats.totalCustomers.toLocaleString()} 
              icon={<Users size={22} className="text-indigo-600 dark:text-indigo-400" />} 
              colorClass="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30"
            />
            <StatCard 
              title="Total Products" 
              value={stats.totalProducts.toLocaleString()} 
              icon={<Package size={22} className="text-amber-600 dark:text-amber-400" />} 
              colorClass="bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30"
            />
          </div>

          {/* --- LOW STOCK ALERT SECTION --- */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {stats.lowStockProducts.length === 0 ? (
                  <CheckCircle2 className="text-emerald-500" size={20} />
                ) : (
                  <AlertTriangle className="text-rose-500" size={20} />
                )}
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Critical Inventory Alerts
                </h3>
              </div>
              {stats.lowStockProducts.length > 0 && (
                <span className="bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold px-2.5 py-1 rounded-full border border-rose-100 dark:border-rose-900/30">
                  {stats.lowStockProducts.length} action required
                </span>
              )}
            </div>
            
            <div className="p-6">
              {stats.lowStockProducts.length === 0 ? (
                <div className="py-6 flex flex-col items-center justify-center gap-2 text-center">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Inventory Status Stable</p>
                  <p className="text-xs text-slate-400 max-w-sm">All operational SKU items currently meet or exceed minimum target safety thresholds.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.lowStockProducts.map(p => (
                    <Link to="/products" key={p.id} className="block group">
                      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl group-hover:border-rose-400 dark:group-hover:border-rose-500/50 group-hover:bg-white dark:group-hover:bg-slate-900/50 shadow-sm transition-all duration-200">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1 overflow-hidden">
                            <p className="font-semibold text-sm text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {p.name}
                            </p>
                            <p className="text-xs font-mono text-slate-400 dark:text-slate-500">SKU: {p.sku}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                            <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-md text-xs font-bold border border-rose-200 dark:border-rose-900/50">
                              {p.quantity} units
                            </span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                              Restock <ArrowUpRight size={10} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;