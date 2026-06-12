import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Edit2, X, Check, Loader2, Tag, Hash, DollarSign, Package } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionId, setActionId] = useState(null); // Tracks submission for specific row IDs
  
  // State for new product form
  const [formData, setFormData] = useState({ name: '', sku: '', price: '', quantity: '' });
  
  // State for editing a product
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', sku: '', price: '', quantity: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products/');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/products/', formData);
      setFormData({ name: '', sku: '', price: '', quantity: '' }); 
      fetchProducts(); 
    } catch (error) {
      alert(error.response?.data?.detail || "Error adding product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts(); 
    } catch (error) {
      alert("Error deleting product");
    }
  };

  const startEditing = (product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    setActionId(id);
    try {
      await api.put(`/products/${id}`, editFormData);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.detail || "Error updating product");
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 tracking-tight text-slate-900 dark:text-slate-100">
      
      {/* --- HEADER --- */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h2 className="text-3xl font-bold font-sans tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
          Product Catalog & Inventory
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage system SKUs, modify core configurations, and update live wholesale quantity distributions.
        </p>
      </div>
      
      {/* --- ADD PRODUCT FORM --- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Add New Product</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Product Name</label>
            <div className="relative">
              <Tag size={16} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
              <input required type="text" placeholder="Enterprise Server Bundle" 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">SKU Code</label>
            <div className="relative">
              <Hash size={16} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
              <input required type="text" placeholder="SRV-MD-901" 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-mono text-xs uppercase"
                value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Price (USD)</label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
              <input required type="number" min="0.01" step="0.01" placeholder="0.00" 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Initial Stock</label>
            <div className="relative">
              <Package size={16} className="absolute left-3 top-3.5 text-slate-400 pointer-events-none" />
              <input required type="number" min="0" placeholder="0" 
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            </div>
          </div>
            
          <button type="submit" disabled={isSubmitting} className="md:col-span-4 w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 text-white font-semibold text-sm py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer h-[42px]">
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} 
            <span>{isSubmitting ? 'Creating Product...' : 'Add Product to Catalog'}</span>
          </button>
        </form>
      </div>

      {/* --- INVENTORY LIST --- */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Current Inventory</h3>
        </div>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 size={24} className="animate-spin text-indigo-500" />
            <span className="text-sm font-medium">Loading inventory structures...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/20 text-xs font-bold uppercase text-slate-400 tracking-wider">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">SKU</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4">Stock Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group min-h-[64px]">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-400">
                      #{product.id}
                    </td>
                    
                    {/* --- INLINE EDIT MODE --- */}
                    {editingId === product.id ? (
                      <>
                        <td className="px-6 py-3 min-w-[200px]">
                          <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-2 py-1.5 rounded text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} />
                        </td>
                        <td className="px-6 py-3 min-w-[140px]">
                          <input type="text" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-2 py-1.5 rounded text-xs font-mono uppercase text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editFormData.sku} onChange={(e) => setEditFormData({...editFormData, sku: e.target.value})} />
                        </td>
                        <td className="px-6 py-3 min-w-[120px]">
                          <input type="number" step="0.01" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-2 py-1.5 rounded text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: e.target.value})} />
                        </td>
                        <td className="px-6 py-3 min-w-[120px]">
                          <input type="number" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 px-2 py-1.5 rounded text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={editFormData.quantity} onChange={(e) => setEditFormData({...editFormData, quantity: e.target.value})} />
                        </td>
                        <td className="px-6 py-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button 
                              onClick={() => saveEdit(product.id)} 
                              disabled={actionId === product.id}
                              className="text-emerald-600 hover:text-emerald-500 disabled:opacity-50 p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded transition-all cursor-pointer" 
                              title="Save Changes"
                            >
                              {actionId === product.id ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                            </button>
                            <button 
                              onClick={cancelEditing} 
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-all cursor-pointer" 
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      /* --- NORMAL ROW VIEW --- */
                      <>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-900 dark:text-white">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          {product.sku}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-700 dark:text-slate-300">
                          ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {product.quantity > 5 ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-900/30">
                              {product.quantity} in stock
                            </span>
                          ) : product.quantity > 0 ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/40 dark:border-amber-900/30">
                              Low Stock ({product.quantity})
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200/40 dark:border-rose-900/30">
                              Out of Stock
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1.5 md:opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-150">
                            <button 
                              onClick={() => startEditing(product)} 
                              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all cursor-pointer" 
                              title="Edit Product"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button 
                              onClick={() => handleDelete(product.id)} 
                              className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all cursor-pointer" 
                              title="Delete Product"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="max-w-xs mx-auto flex flex-col items-center">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 dark:text-slate-500 mb-3">
                          <Package size={24} />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No products found</p>
                        <p className="text-xs text-slate-400 mt-1">Populate your warehouse logs by committing an entry item above.</p>
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

export default Products;