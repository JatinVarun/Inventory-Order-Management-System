import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingCart, Layers } from 'lucide-react';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 antialiased selection:bg-indigo-500/30">
        
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800/80 p-5 flex flex-col gap-1 z-10 shrink-0">
          
          {/* Brand/Logo Section */}
          <div className="px-3 py-4 mb-6 flex items-center gap-2.5 select-none border-b border-slate-100 dark:border-slate-800/50 pb-6">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-600/20">
              <Layers size={20} className="animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-sans tracking-tight text-slate-900 dark:text-white">
                OrderSync
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">Enterprise ERP</p>
            </div>
          </div>
          
          {/* Navigation Link Directory */}
          <div className="space-y-1.5 flex-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600 pl-3 shadow-sm shadow-indigo-500/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutDashboard size={18} className="shrink-0" /> 
              <span>Dashboard</span>
            </NavLink>

            <NavLink 
              to="/products" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600 pl-3 shadow-sm shadow-indigo-500/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Package size={18} className="shrink-0" /> 
              <span>Products</span>
            </NavLink>

            <NavLink 
              to="/customers" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600 pl-3 shadow-sm shadow-indigo-500/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Users size={18} className="shrink-0" /> 
              <span>Customers</span>
            </NavLink>

            <NavLink 
              to="/orders" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                isActive 
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600 pl-3 shadow-sm shadow-indigo-500/5' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShoppingCart size={18} className="shrink-0" /> 
              <span>Orders</span>
            </NavLink>
          </div>

          {/* System Footer Node */}
          <div className="border-t border-slate-100 dark:border-slate-800/60 pt-4 px-3 select-none">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">Production Sync Active</span>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950 focus:outline-none relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;