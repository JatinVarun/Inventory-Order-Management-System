import React, { useState, useEffect } from 'react';
import api from '../api';
import { ShoppingCart, Trash2, Loader2, Calendar, User, ShoppingBag, DollarSign } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({ customer_id: '', product_id: '', quantity: 1 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        api.get('/orders/'),
        api.get('/customers/'),
        api.get('/products/')
      ]);
      setOrders(ordersRes.data);
      setCustomers(customersRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer_id || !formData.product_id) {
      alert("Please select a customer and a product");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = {
        customer_id: parseInt(formData.customer_id),
        items: [
          {
            product_id: parseInt(formData.product_id),
            quantity: parseInt(formData.quantity)
          }
        ]
      };
      
      await api.post('/orders/', payload);
      setFormData({ ...formData, product_id: '', quantity: 1 }); 
      fetchData(); 
    } catch (error) {
      alert(error.response?.data?.detail || "Error creating order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    try {
      await api.delete(`/orders/${id}`);
      fetchData();
    } catch (error) {
      alert("Error deleting order");
    }
  };

  const getCustomerName = (id) => customers.find(c => c.id === id)?.full_name || 'Unknown';
  const getProductName = (id) => products.find(p => p.id === id)?.name || 'Unknown';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 tracking-tight text-slate-900 dark:text-slate-100">
      
      {/* --- HEADER --- */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h2 className="text-3xl font-bold font-sans tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Order Management
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Generate corporate requests, monitor incoming sales, and track client fulfillments.
        </p>
      </div>
      
      {/* --- CREATE ORDER FORM --- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Create New Order</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Customer</label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
              <select required 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                value={formData.customer_id} onChange={(e) => setFormData({...formData, customer_id: e.target.value})}>
                <option value="" disabled>Select Customer...</option>
                {customers.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
              </select>
            </div>
          </div>
          
          <div className="space-y-1.5 md:col-span-1">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Product Selection</label>
            <div className="relative">
              <ShoppingBag size={16} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
              <select required 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                value={formData.product_id} onChange={(e) => setFormData({...formData, product_id: e.target.value})}>
                <option value="" disabled>Select Product...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id} disabled={p.quantity === 0}>
                    {p.name} (${p.price.toFixed(2)}) {p.quantity === 0 ? ' [OUT OF STOCK]' : ` (${p.quantity} available)`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Quantity</label>
            <input required type="number" min="1" placeholder="Quantity" 
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
          </div>
            
          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer h-[42px]">
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <ShoppingCart size={16} />} 
            <span>{isSubmitting ? 'Processing...' : 'Place Order'}</span>
          </button>
        </form>
      </div>

      {/* --- ORDERS LIST --- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Order History</h3>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 size={24} className="animate-spin text-indigo-500" />
            <span className="text-sm font-medium">Loading transaction ledger...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/20 text-xs font-bold uppercase text-slate-400 tracking-wider">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Line Items</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Transaction Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-400">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900 dark:text-white">
                      {getCustomerName(order.customer_id)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.id} className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50">
                              {item.quantity}x
                            </span>
                            <span className="text-slate-600 dark:text-slate-300 font-medium">{getProductName(item.product_id)}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/20">
                        <DollarSign size={14} className="opacity-80" />
                        {order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar size={14} className="text-slate-400" />
                        {new Date(order.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleDelete(order.id)} 
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Cancel Order"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="max-w-xs mx-auto flex flex-col items-center">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 dark:text-slate-500 mb-3">
                          <ShoppingCart size={24} />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No orders placed yet</p>
                        <p className="text-xs text-slate-400 mt-1">Submit the parameters above to initialize your first checkout process.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;