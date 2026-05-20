'use client';

import { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '@/data/products';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard, Package, ShoppingBag, Users, LogOut,
  TrendingUp, AlertCircle, Clock, CheckCircle2, Truck,
  ChevronRight, Search, Eye, EyeOff, Edit2, Trash2, X,
  ArrowUpRight, ArrowDownRight, BarChart3, Filter,
  Shield, Lock, RefreshCcw, Plus, Save, ChevronDown,
  ExternalLink, MoreVertical, Circle, Settings
} from 'lucide-react';

// ─── Colors ─────────────────────────────────────────────────────────────────
const BRAND_BLUE = '#155DFC';
const BRAND_NAVY = '#0b1a2e';
const BRAND_ACCENT = '#2563eb';

// ─── Types ──────────────────────────────────────────────────────────────────
interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: { id: number; name: string; price: number; quantity: number; image?: string }[];
  billing: { billingFirstName: string; billingLastName: string; email: string; billingPhone: string; billingAddress: string; billingState: string; billingCity: string };
  paymentMethod: string;
  deliveryMethod: string;
}

interface AdminProduct {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  images: string[];
  description: string;
  sku: string;
  category: string;
  condition: string;
  stock?: number;
}

// ─── Admin PIN ───────────────────────────────────────────────────────────────
const ADMIN_PIN = 'STANCH2025';

// ─── Helpers ────────────────────────────────────────────────────────────────
const fmt = (n: number) => `₦${n.toLocaleString()}`;
const fmtDate = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
const STATUS_META: Record<string, { color: string; bg: string; icon: any }> = {
  Processing: { color: '#d97706', bg: '#fef3c7', icon: Clock },
  Shipped:    { color: '#2563eb', bg: '#dbeafe', icon: Truck },
  Delivered:  { color: '#16a34a', bg: '#dcfce7', icon: CheckCircle2 },
  Cancelled:  { color: '#dc2626', bg: '#fee2e2', icon: X },
};

// ─── Status Badge ────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const m = STATUS_META[status] || { color: '#6b7280', bg: '#f3f4f6', icon: Circle };
  const Icon = m.icon;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '20px', background: m.bg, color: m.color, fontSize: '12px', fontWeight: 700, fontFamily: "var(--font-heading)", whiteSpace: 'nowrap' }}>
      <Icon size={11} />
      {status}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, accent, trend }: { label: string; value: string; sub?: string; icon: any; accent: string; trend?: { up: boolean; text: string } }) {
  const Icon = icon;
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '2px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', fontFamily: "var(--font-heading)" }}>{label}</span>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={accent} />
        </div>
      </div>
      <div>
        <span style={{ fontSize: '32px', fontWeight: 900, color: '#111', fontFamily: "var(--font-heading)", lineHeight: 1 }}>{value}</span>
        {sub && <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px', fontFamily: "var(--font-heading)" }}>{sub}</p>}
      </div>
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: trend.up ? '#16a34a' : '#dc2626', fontFamily: "var(--font-heading)" }}>
          {trend.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend.text}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [pinInput, setPinInput] = useState('');
  const [showLoginPin, setShowLoginPin] = useState(false);
  const [showChangePin, setShowChangePin] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'settings'>('overview');
  const [dynamicPin, setDynamicPin] = useState(ADMIN_PIN);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchOrders, setSearchOrders] = useState('');
  const [searchProducts, setSearchProducts] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<AdminProduct | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [migrationModal, setMigrationModal] = useState<{ open: boolean; status: 'idle' | 'syncing' | 'success' | 'error'; message?: string }>({ open: false, status: 'idle' });
  const [toastMessage, setToastMessage] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [wipeModalOpen, setWipeModalOpen] = useState(false);
  const [nukeModalOpen, setNukeModalOpen] = useState(false);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4000);
  }, []);

  // Load data
  const loadData = useCallback(async () => {
    if (!isAuthed) return;
    setIsLoading(true);

    try {
      // 1. Fetch Products
      const { data: dbProducts, error: pError } = await supabase.from('products').select('*').order('id', { ascending: false });
      
      // 2. Fetch Orders
      const { data: dbOrders, error: oError } = await supabase.from('orders').select('*').order('date', { ascending: false });

      if (dbProducts !== null && !pError) {
        setProducts(dbProducts);
      } else {
        // Fallback if database totally fails to connect
        const overrides = localStorage.getItem('admin_products');
        let prods: AdminProduct[] = PRODUCTS.map(p => ({ ...p, stock: 10 }));
        if (overrides) {
          try {
            const ov: AdminProduct[] = JSON.parse(overrides);
            prods = prods.map(p => { const o = ov.find(x => x.id === p.id); return o ? { ...p, ...o } : p; });
          } catch {}
        }
        setProducts(prods);
      }

      if (dbOrders !== null && !oError) {
        setOrders(dbOrders);
      } else {
        // Only fall back to localStorage if Supabase itself failed to connect
        const raw = localStorage.getItem('orders');
        if (raw) try { setOrders(JSON.parse(raw)); } catch {}
      }
    } catch (err) {
      console.error('Supabase load error:', err);
    } finally {
      setIsLoading(false);
    }

  }, [isAuthed]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Fetch custom PIN on mount unconditionally
  useEffect(() => {
    const fetchPin = async () => {
      try {
        const { data: dbSettings } = await supabase.from('site_settings').select('*').eq('key', 'admin_pin').single();
        if (dbSettings?.value) setDynamicPin(dbSettings.value);
      } catch {}
    };
    fetchPin();
  }, []);

  const checkPin = () => {
    const localPinOverride = localStorage.getItem('CUSTOM_ADMIN_PIN');
    const validPin = localPinOverride || dynamicPin;
    
    if (pinInput.trim().toUpperCase() === validPin) {
      setIsAuthed(true);
      setPinError(false);
      sessionStorage.setItem('stanch_admin', '1');
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  // Check session
  useEffect(() => {
    if (sessionStorage.getItem('stanch_admin') === '1') setIsAuthed(true);
  }, []);

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    // 1. Update Supabase
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    
    // 2. Update local state
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
    if (selectedOrder?.id === orderId) setSelectedOrder(prev => prev ? { ...prev, status } : prev);
  };

  const deleteProduct = async (id: number) => {
    // 1. Update Supabase
    await supabase.from('products').delete().eq('id', id);

    // 2. Update local state
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('admin_products', JSON.stringify(updated));
    setProductToDelete(null);
  };

  const deleteAllProducts = async () => {
    setIsLoading(true);
    setWipeModalOpen(false);
    try {
      // The fastest way to delete all is to delete where id > -1 (all of them)
      await supabase.from('products').delete().gt('id', -1);
      setProducts([]);
      localStorage.setItem('admin_products', JSON.stringify([]));
      showToast("All products have been permanently deleted.", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to delete all products.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const nukeAllData = async () => {
    setNukeModalOpen(false);
    setIsLoading(true);
    try {
      // Delete products (integer id)
      await supabase.from('products').delete().gt('id', -1);
      // Delete orders — use neq on a field that always has a value (works for string/UUID ids too)
      await supabase.from('orders').delete().neq('id', '');
      // Clear local state immediately
      setProducts([]);
      setOrders([]);
      setSelectedOrder(null);
      // Clear ALL relevant localStorage keys
      localStorage.removeItem('admin_products');
      localStorage.removeItem('admin_orders');
      localStorage.removeItem('orders');
      showToast('All data has been permanently wiped. Dashboard is clean.', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to wipe all data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const executeMigration = async () => {
    setMigrationModal(prev => ({ ...prev, status: 'syncing' }));
    try {
      if (products.length > 0) {
        await supabase.from('products').upsert(products.map(({ id, ...p }) => p), { onConflict: 'sku' });
      }
      if (orders.length > 0) {
        await supabase.from('orders').upsert(orders);
      }
      setMigrationModal({ open: true, status: 'success', message: 'Migration complete! All local data is fully synchronized.' });
      loadData();
    } catch (err: any) {
      setMigrationModal({ open: true, status: 'error', message: err.message || 'Migration failed. Check console.' });
      console.error(err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const currentImages = editingProduct.images || [];
      setEditingProduct({ 
        ...editingProduct, 
        image: editingProduct.image || dataUrl,
        images: [...currentImages, dataUrl] 
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    if (!editingProduct) return;
    const newImages = [...(editingProduct.images || [])];
    newImages.splice(index, 1);
    setEditingProduct({
      ...editingProduct,
      images: newImages,
      image: editingProduct.image === editingProduct.images[index] ? (newImages[0] || '') : editingProduct.image
    });
  };

  const setPrimaryImage = (index: number) => {
    if (!editingProduct) return;
    setEditingProduct({ ...editingProduct, image: editingProduct.images[index] });
  };

  const saveProduct = async (p: AdminProduct) => {
    setIsLoading(true);
    try {
      const { id, ...pData } = p;
      const exists = products.find(x => x.id === p.id);
      
      if (exists) {
        await supabase.from('products').update(pData).eq('id', id);
      } else {
        await supabase.from('products').insert([pData]);
      }

      await loadData();
      setEditingProduct(null);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsLoading(false);
    }

    // Still sync to local as a backup
    let updated;
    const existsLocal = products.find(x => x.id === p.id);
    if (existsLocal) {
      updated = products.map(x => x.id === p.id ? p : x);
    } else {
      updated = [p, ...products];
    }
    localStorage.setItem('admin_products', JSON.stringify(updated));
  };

  // ─── Computed stats ───────────────────────────────────────────────────────
  const totalRevenue = orders.reduce((s, o) => s + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Processing').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const uniqueCustomers = new Set(orders.map(o => o.billing?.email).filter(Boolean)).size;

  const filteredOrders = orders.filter(o => {
    const q = searchOrders.toLowerCase();
    const matchSearch = !q || o.id.toLowerCase().includes(q) ||
      (o.billing?.billingFirstName + ' ' + o.billing?.billingLastName).toLowerCase().includes(q) ||
      o.billing?.email?.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const filteredProducts = products.filter(p => {
    const q = searchProducts.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  // Category totals for mini chart
  const categoryTotals = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const maxCat = Math.max(...Object.values(categoryTotals));

  // ─── PIN Guard ────────────────────────────────────────────────────────────
  if (!isAuthed) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0f11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "var(--font-heading)" }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ width: '56px', height: '56px', background: BRAND_BLUE, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Shield size={28} color="#fff" />
            </div>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '8px' }}>ADMIN ACCESS</h1>
            <p style={{ fontSize: '15px', color: '#6b7280' }}>StanchTech Control Panel — Restricted</p>
          </div>

          <div style={{ background: '#1a1a1f', border: '1px solid #2a2a32', borderRadius: '12px', padding: '32px' }}>
            <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6b7280', display: 'block', marginBottom: '10px' }}>
              Admin Passphrase
            </label>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <Lock size={15} color="#4b5563" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showLoginPin ? 'text' : 'password'}
                value={pinInput}
                onChange={e => { setPinInput(e.target.value); setPinError(false); }}
                onKeyDown={e => e.key === 'Enter' && checkPin()}
                placeholder="Enter passphrase"
                autoFocus
                style={{
                  width: '100%', padding: '14px 40px 14px 40px', background: '#0f0f11', border: `1px solid ${pinError ? '#dc2626' : '#2a2a32'}`,
                  borderRadius: '8px', color: '#fff', fontSize: '16px', outline: 'none', boxSizing: 'border-box',
                  fontFamily: "var(--font-heading)", letterSpacing: '0.1em',
                }}
              />
              <button 
                type="button"
                onClick={() => setShowLoginPin(!showLoginPin)}
                style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', outline: 'none', padding: 0, color: '#4b5563', display: 'flex' }}
              >
                {showLoginPin ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {pinError && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>
                <AlertCircle size={13} />
                Incorrect passphrase. Please try again.
              </div>
            )}
            <button
              onClick={checkPin}
              style={{ width: '100%', padding: '14px', background: '#7047eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', fontFamily: "var(--font-heading)", letterSpacing: '0.05em', transition: 'opacity 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
              onMouseOut={e => (e.currentTarget.style.opacity = '1')}
            >
              ACCESS DASHBOARD
            </button>
          </div>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#374151', marginTop: '24px' }}>
            <a href="/" style={{ color: '#4b5563', textDecoration: 'none' }}>← Back to StanchTech</a>
          </p>
        </div>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────
  const NAV = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f7', fontFamily: "var(--font-heading)", position: 'relative' }}>
      {/* ── Overlay for Mobile Menu ── */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, cursor: 'pointer' }} 
        />
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarCollapsed ? '72px' : '240px', background: '#111', color: '#fff',
        display: 'flex', flexDirection: 'column', flexShrink: 0, transition: 'all 0.25s ease',
        top: 0, height: '100vh', overflow: 'hidden', zIndex: 150
      }} className={`admin-sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <style dangerouslySetInnerHTML={{ __html: `
          @media (min-width: 1024px) {
            .admin-sidebar { position: sticky !important; left: 0 !important; }
            .mobile-toggle { display: none !important; }
            .content-container { padding-left: 0 !important; }
          }
          @media (max-width: 1023px) {
            .admin-sidebar { 
              position: fixed !important; 
              width: 240px !important; 
              left: -240px;
              transition: left 0.3s ease !important;
            }
            .admin-sidebar.open { left: 0 !important; }
            .stats-grid { grid-template-columns: 1fr !important; }
            .overview-grid { grid-template-columns: 1fr !important; }
            .admin-panel-overlay {
              position: fixed !important;
              inset: 0 !important;
              width: 100% !important;
              height: 100% !important;
              z-index: 200 !important;
              margin: 0 !important;
              max-height: 100vh !important;
              border-radius: 0 !important;
            }
            .mobile-stack { flex-direction: column !important; align-items: stretch !important; gap: 16px !important; }
            .mobile-hide { display: none !important; }
            .main-content { padding: 16px !important; }
          }
        `}} />

        {/* Logo */}
        <div style={{ padding: sidebarCollapsed ? '24px 16px' : '24px', borderBottom: '1px solid #1f1f1f', display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
          <div style={{ width: '36px', height: '36px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
            <img src="/asset/Landing_page_image/stanch_tech_logo.png" alt="Logo" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
          </div>
          {!sidebarCollapsed && (
            <div>
              <p style={{ fontFamily: "var(--font-heading)", fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em', color: '#fff' }}>STANCHTECH</p>
              <p style={{ fontSize: '10px', color: '#4b5563', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV.map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                  padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: active ? BRAND_BLUE : 'transparent',
                  color: active ? '#fff' : '#6b7280',
                  transition: 'all 0.15s', overflow: 'hidden',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                }}
                onMouseOver={e => { if (!active) e.currentTarget.style.background = '#1a1a1f'; }}
                onMouseOut={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && <span style={{ fontSize: '14px', fontWeight: active ? 800 : 600 }}>{item.label}</span>}
                {!sidebarCollapsed && item.id === 'orders' && pendingOrders > 0 && (
                  <span style={{ marginLeft: 'auto', background: '#ef4444', color: '#fff', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 800 }}>{pendingOrders}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 8px', borderTop: '1px solid #1f1f1f', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            onClick={() => setSidebarCollapsed(c => !c)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#4b5563', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
            onMouseOver={e => e.currentTarget.style.background = '#1a1a1f'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <ChevronRight size={18} style={{ transform: sidebarCollapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.25s', flexShrink: 0 }} />
            {!sidebarCollapsed && <span style={{ fontSize: '13px', fontWeight: 600 }}>Collapse</span>}
          </button>

          <a href="/shop" target="_blank" rel="noreferrer" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px', textDecoration: 'none', color: '#4b5563', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
            onMouseOver={e => (e.currentTarget as HTMLElement).style.background = '#1a1a1f'}
            onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <ExternalLink size={17} style={{ flexShrink: 0 }} />
            {!sidebarCollapsed && <span style={{ fontSize: '13px', fontWeight: 600 }}>View Store</span>}
          </a>

          <button
            onClick={() => { sessionStorage.removeItem('stanch_admin'); setIsAuthed(false); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#dc2626', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
            onMouseOver={e => e.currentTarget.style.background = '#1a1a1f'}
            onMouseOut={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={17} style={{ flexShrink: 0 }} />
            {!sidebarCollapsed && <span style={{ fontSize: '13px', fontWeight: 600 }}>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 16px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="mobile-toggle"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#111', display: 'flex', alignItems: 'center' }}
            >
              <BarChart3 size={20} />
            </button>
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontSize: '16px', fontWeight: 900, color: '#111', letterSpacing: '-0.01em', marginBottom: '1px' }}>
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'orders' && 'Order Management'}
                {activeTab === 'products' && 'Product Catalog'}
                {activeTab === 'customers' && 'Customers'}
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              {activeTab === 'overview' && (
                <button 
                  onClick={() => setMigrationModal({ open: true, status: 'idle' })}
                  disabled={migrationModal.status === 'syncing'}
                  style={{ 
                    padding: '2px 8px', fontSize: '10px', color: BRAND_BLUE, fontWeight: 800, background: '#fff', 
                    border: `1.5px solid ${BRAND_BLUE}`, borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s',
                    opacity: migrationModal.status === 'syncing' ? 0.6 : 1
                  }}
                >
                  {migrationModal.status === 'syncing' ? 'SYNCING...' : 'SYNC TO SUPABASE'}
                </button>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '34px', height: '34px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/asset/Landing_page_image/stanch_tech_logo.png" alt="" style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <p style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>Admin</p>
              <p style={{ fontSize: '11px', color: '#9ca3af' }}>Super User</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '32px', position: 'relative' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: BRAND_BLUE, zIndex: 100, animation: 'loading-bar 2s infinite linear' }}>
              <style>{`
                @keyframes loading-bar {
                  0% { left: -40%; width: 40%; }
                  100% { left: 100%; width: 40%; }
                }
              `}</style>
            </div>
          )}

          {/* ═══════════════ OVERVIEW TAB ═══════════════ */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Stat Cards */}
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                <StatCard label="Total Revenue" value={fmt(totalRevenue)} sub={`From ${orders.filter(o => o.status !== 'Cancelled').length} orders`} icon={TrendingUp} accent="#7047eb" trend={{ up: true, text: 'All time earnings' }} />
                <StatCard label="Total Orders" value={String(orders.length)} sub={`${pendingOrders} pending`} icon={ShoppingBag} accent="#2563eb" />
                <StatCard label="Products" value={String(products.length)} sub="In catalog" icon={Package} accent="#16a34a" />
                <StatCard label="Customers" value={String(uniqueCustomers)} sub="Unique buyers" icon={Users} accent="#f59e0b" />
              </div>

              {/* Two columns: recent orders + category chart */}
              <div className="overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
                {/* Recent Orders */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', overflowX: 'auto' }}>

                  <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '14px', fontWeight: 900, color: '#111' }}>Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} style={{ fontSize: '12px', color: '#7047eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>View all →</button>
                  </div>
                  {orders.length === 0 ? (
                    <div style={{ padding: '48px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>No orders yet</div>
                  ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f9fafb' }}>
                          {['Order ID', 'Customer', 'Amount', 'Status', 'Date'].map((h, i) => (
                            <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 8).map((o, i) => (
                          <tr key={o.id} style={{ borderTop: '1px solid #f3f4f6', cursor: 'pointer' }}
                            onClick={() => { setSelectedOrder(o); setActiveTab('orders'); }}
                            onMouseOver={e => (e.currentTarget as HTMLElement).style.background = '#f9fafb'}
                            onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                          >
                            <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, color: '#7047eb', fontFamily: "var(--font-heading)" }}>{o.id}</td>
                            <td style={{ padding: '12px 16px', fontSize: '13px', color: '#374151' }}>{o.billing?.billingFirstName} {o.billing?.billingLastName}</td>
                            <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 700, color: '#111' }}>{fmt(o.total)}</td>
                            <td style={{ padding: '12px 16px' }}><StatusBadge status={o.status} /></td>
                            <td style={{ padding: '12px 16px', fontSize: '12px', color: '#9ca3af' }}>{fmtDate(o.date)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                {/* Category Distribution */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '14px', fontWeight: 900, color: '#111' }}>Product Categories</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {Object.entries(categoryTotals).map(([cat, count]) => (
                      <div key={cat}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{cat}</span>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>{count}</span>
                        </div>
                        <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(count / maxCat) * 100}%`, background: '#7047eb', borderRadius: '3px', transition: 'width 0.6s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px', marginTop: 'auto' }}>
                    <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                      Order status breakdown
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                      {Object.entries(STATUS_META).map(([s, m]) => {
                        const Icon = m.icon;
                        const count = orders.filter(o => o.status === s).length;
                        return (
                          <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Icon size={13} color={m.color} />
                              <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>{s}</span>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ ORDERS TAB ═══════════════ */}
          {activeTab === 'orders' && (
            <div style={{ display: 'flex', gap: '24px' }}>
              {/* Orders list */}
              <div style={{ flex: 1, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', overflow: 'hidden', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                {/* Toolbar */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      value={searchOrders}
                      onChange={e => setSearchOrders(e.target.value)}
                      placeholder="Search by order ID, name or email…"
                      style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', color: '#111' }}
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={e => setFilterStatus(e.target.value)}
                    style={{ padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', color: '#374151', background: '#fff', cursor: 'pointer' }}
                  >
                    {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                {filteredOrders.length === 0 ? (
                  <div style={{ padding: '64px', textAlign: 'center', color: '#9ca3af', fontSize: '15px' }}>
                    {orders.length === 0 ? 'No orders have been placed yet.' : 'No orders match your filters.'}
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                      <thead>
                        <tr style={{ background: '#f9fafb' }}>
                          {['Order ID', 'Customer', 'Items', 'Total', 'Payment', 'Status', ''].map((h, i) => (
                            <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map(o => (
                          <tr
                            key={o.id}
                            style={{ borderTop: '1px solid #f3f4f6', background: selectedOrder?.id === o.id ? '#f0f4ff' : 'transparent', cursor: 'pointer' }}
                            onClick={() => setSelectedOrder(o)}
                            onMouseOver={e => { if (selectedOrder?.id !== o.id) (e.currentTarget as HTMLElement).style.background = '#f9fafb'; }}
                            onMouseOut={e => { if (selectedOrder?.id !== o.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                          >
                            <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 800, color: BRAND_BLUE, fontFamily: "var(--font-heading)", whiteSpace: 'nowrap' }}>{o.id}</td>
                            <td style={{ padding: '12px 16px' }}>
                              <p style={{ fontSize: '13px', fontWeight: 700, color: '#0b1a2e', marginBottom: '1px' }}>{o.billing?.billingFirstName} {o.billing?.billingLastName}</p>
                              <p style={{ fontSize: '11px', color: '#9ca3af' }}>{o.billing?.email}</p>
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>
                              {o.items?.reduce((s, i) => s + (i.quantity || 1), 0)} item(s)
                            </td>
                            <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 800, color: '#111', whiteSpace: 'nowrap' }}>{fmt(o.total)}</td>
                            <td style={{ padding: '12px 16px', fontSize: '12px', color: '#6b7280', textTransform: 'capitalize' }}>
                              {o.paymentMethod === 'cod' ? 'Cash on Delivery' : o.paymentMethod === 'bank' ? 'Bank Transfer' : 'OPay'}
                            </td>
                            <td style={{ padding: '12px 16px' }}><StatusBadge status={o.status} /></td>
                            <td style={{ padding: '12px 16px' }}>
                              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px' }}>
                                <Eye size={15} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Order detail panel */}
              {selectedOrder && (
                <div className="order-detail-panel admin-panel-overlay" style={{ width: '340px', flexShrink: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: 'calc(100vh - 128px)', position: 'sticky', top: 0 }}>

                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '13px', fontWeight: 900, color: '#111' }}>Order Details</h3>
                    <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={16} /></button>
                  </div>

                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>Order ID</p>
                      <p style={{ fontSize: '15px', fontWeight: 900, color: '#7047eb', fontFamily: "var(--font-heading)" }}>{selectedOrder.id}</p>
                      <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>{fmtDate(selectedOrder.date)}</p>
                    </div>

                    <div>
                      <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Update Status</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {(['Processing', 'Shipped', 'Delivered', 'Cancelled'] as const).map(s => {
                          const m = STATUS_META[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateOrderStatus(selectedOrder.id, s)}
                              style={{
                                width: '100%', padding: '8px 12px', borderRadius: '6px', border: `1.5px solid ${selectedOrder.status === s ? m.color : '#e5e7eb'}`,
                                background: selectedOrder.status === s ? m.bg : '#fff', color: selectedOrder.status === s ? m.color : '#6b7280',
                                fontSize: '13px', fontWeight: 700, cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.15s',
                                fontFamily: "var(--font-heading)",
                              }}
                            >
                              {(() => { const Icon = m.icon; return <Icon size={13} />; })()}
                              {s}
                              {selectedOrder.status === s && <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 800 }}>CURRENT</span>}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Customer</p>
                      <div style={{ background: '#f9fafb', borderRadius: '6px', padding: '12px', fontSize: '13px', lineHeight: 1.7 }}>
                        <p style={{ fontWeight: 800, color: '#111' }}>{selectedOrder.billing?.billingFirstName} {selectedOrder.billing?.billingLastName}</p>
                        <p style={{ color: '#6b7280' }}>{selectedOrder.billing?.email}</p>
                        <p style={{ color: '#6b7280' }}>{selectedOrder.billing?.billingPhone}</p>
                        <p style={{ color: '#6b7280', marginTop: '4px' }}>{selectedOrder.billing?.billingAddress}, {selectedOrder.billing?.billingCity}, {selectedOrder.billing?.billingState}</p>
                      </div>
                    </div>

                    <div>
                      <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>Items ({selectedOrder.items?.length})</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {selectedOrder.items?.map((item, i) => (
                          <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '8px', background: '#f9fafb', borderRadius: '6px' }}>
                            {item.image && <img src={item.image} style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '4px', padding: '4px' }} alt="" />}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ fontSize: '12px', fontWeight: 700, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                              <p style={{ fontSize: '11px', color: '#9ca3af' }}>Qty: {item.quantity} × {fmt(item.price)}</p>
                            </div>
                            <p style={{ fontSize: '12px', fontWeight: 800, color: '#111', whiteSpace: 'nowrap' }}>{fmt(item.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}>Subtotal</span>
                        <span style={{ fontSize: '13px', color: '#111' }}>{fmt(selectedOrder.total)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: '#6b7280' }}>Shipping</span>
                        <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 700 }}>Free</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#111' }}>Total</span>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: '#111', fontFamily: "var(--font-heading)" }}>{fmt(selectedOrder.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ PRODUCTS TAB ═══════════════ */}
          {activeTab === 'products' && (
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Toolbar */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
                  <div className="mobile-stack" style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        value={searchProducts}
                        onChange={e => setSearchProducts(e.target.value)}
                        placeholder="Search products by name, SKU or category…"
                        style={{ width: '100%', padding: '9px 12px 9px 34px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', color: '#111' }}
                      />
                    </div>
                    <button
                      onClick={() => setWipeModalOpen(true)}
                      style={{ padding: '9px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "var(--font-heading)" }}
                    >
                      <Trash2 size={16} /> WIPE DATABASE
                    </button>
                    <button
                      onClick={() => setEditingProduct({
                        id: Math.max(0, ...products.map(p => p.id)) + 1,
                        name: '',
                        price: 0,
                        currency: '₦',
                        image: 'https://images.unsplash.com/photo-1590674899484-d564fa070e6c?auto=format&fit=crop&q=80&w=200',
                        images: ['https://images.unsplash.com/photo-1590674899484-d564fa070e6c?auto=format&fit=crop&q=80&w=200'],
                        description: '',
                        sku: `SS${String(Math.max(0, ...products.map(p => p.id)) + 1).padStart(3, '0')}`,
                        category: 'Hardware',
                        condition: 'Genuine New'
                      })}
                      style={{ padding: '9px 16px', background: BRAND_BLUE, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "var(--font-heading)" }}
                    >
                      <Plus size={16} /> ADD PRODUCT
                    </button>
                    <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{filteredProducts.length} products</span>
                  </div>

                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                      <thead>
                        <tr style={{ background: '#f9fafb' }}>
                          {['', 'Product', 'SKU', 'Category', 'Condition', 'Price', ''].map((h, i) => (
                            <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map(p => (
                          <tr key={p.id} style={{ borderTop: '1px solid #f3f4f6' }}
                            onMouseOver={e => (e.currentTarget as HTMLElement).style.background = '#f9fafb'}
                            onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                          >
                          <td style={{ padding: '10px 12px 10px 16px' }}>
                            <div style={{ width: '44px', height: '44px', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              <img src={p.image} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <p style={{ fontSize: '13px', fontWeight: 700, color: '#111', marginBottom: '1px' }}>{p.name}</p>
                              {products.slice(0, 3).some(fp => fp.id === p.id) && (
                                <span style={{ 
                                  fontSize: '10px', 
                                  fontWeight: 900, 
                                  background: '#000', 
                                  color: '#fff', 
                                  padding: '2px 6px', 
                                  borderRadius: '2px',
                                  fontFamily: "var(--font-heading)",
                                  letterSpacing: '0.05em'
                                }}>
                                  LIVE ON STORE
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '12px', color: '#9ca3af', fontFamily: "var(--font-heading)" }}>{p.sku}</td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: '#ede9fe', color: '#7047eb', padding: '2px 8px', borderRadius: '4px' }}>{p.category}</span>
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '12px', color: '#6b7280' }}>{p.condition}</td>
                          <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 800, color: '#111', whiteSpace: 'nowrap' }}>{fmt(p.price)}</td>
                          <td style={{ padding: '10px 16px' }}>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button
                                onClick={() => setEditingProduct({ ...p })}
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 10px', border: '1px solid #e5e7eb', borderRadius: '5px', background: '#fff', cursor: 'pointer', fontSize: '12px', color: '#374151', fontWeight: 600 }}
                              >
                                <Edit2 size={12} /> Edit
                              </button>
                              <button
                                onClick={() => setProductToDelete(p)}
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', border: '1px solid #fee2e2', borderRadius: '5px', background: '#fff', cursor: 'pointer', color: '#ef4444' }}
                                title="Delete Product"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Edit product panel */}
              {editingProduct && (
                <div className="admin-panel-overlay" style={{ width: '320px', flexShrink: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', overflow: 'hidden', position: 'sticky', top: 0, maxHeight: 'calc(100vh - 128px)', overflowY: 'auto' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '13px', fontWeight: 900, color: '#111' }}>
                      {products.find(x => x.id === editingProduct.id) ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button onClick={() => setEditingProduct(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={16} /></button>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'block', marginBottom: '8px' }}>Product Images</label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                        {(editingProduct.images || []).map((img, idx) => (
                          <div key={idx} style={{ position: 'relative', aspectRatio: '1', background: '#f9fafb', borderRadius: '4px', border: editingProduct.image === img ? `2px solid ${BRAND_BLUE}` : '1px solid #e5e7eb', overflow: 'hidden' }}>
                            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />
                            <div style={{ position: 'absolute', top: '2px', right: '2px', display: 'flex', gap: '2px' }}>
                              <button onClick={() => removeImage(idx)} style={{ background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '2px', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={10} /></button>
                            </div>
                            <button 
                              onClick={() => setPrimaryImage(idx)}
                              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: editingProduct.image === img ? BRAND_BLUE : 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', fontSize: '9px', fontWeight: 800, padding: '2px 0', cursor: 'pointer' }}
                            >
                              {editingProduct.image === img ? 'PRIMARY' : 'SET'}
                            </button>
                          </div>
                        ))}
                        <label style={{ aspectRatio: '1', background: '#f5f5f7', borderRadius: '4px', border: '2px dashed #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexWrap: 'wrap', flexDirection: 'column', gap: '4px' }}>
                          <Plus size={16} color="#9ca3af" />
                          <span style={{ fontSize: '10px', color: '#9ca3af', fontWeight: 700 }}>ADD</span>
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                        </label>
                      </div>
                      <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '12px', textAlign: 'center' }}>SKU: <span style={{ fontWeight: 800 }}>{editingProduct.sku}</span></p>
                    </div>

                    {[
                      { label: 'Product Name', key: 'name', type: 'text' },
                      { label: 'Price (₦)', key: 'price', type: 'number' },
                      { label: 'Description', key: 'description', type: 'textarea' },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'block', marginBottom: '5px' }}>{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={(editingProduct as any)[field.key]}
                            onChange={e => setEditingProduct({ ...editingProduct, [field.key]: e.target.value })}
                            rows={3}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '16px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', color: '#111', fontFamily: "var(--font-heading)" }}
                          />
                        ) : (
                          <input
                            type={field.type}
                            value={(editingProduct as any)[field.key]}
                            onChange={e => setEditingProduct({ ...editingProduct, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', color: '#111' }}
                          />
                        )}
                      </div>
                    ))}

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'block', marginBottom: '5px' }}>Category</label>
                      <select
                        value={editingProduct.category}
                        onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', color: '#111', background: '#fff' }}
                      >
                        {['Fuel Injectors', 'Turbos', 'Controllers', 'Filters', 'Hardware'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'block', marginBottom: '5px' }}>Condition</label>
                      <select
                        value={editingProduct.condition}
                        onChange={e => setEditingProduct({ ...editingProduct, condition: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', color: '#111', background: '#fff' }}
                      >
                        {['Genuine New', 'OEM Standard', 'Refurbished', 'Used / Tested'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <button onClick={() => setEditingProduct(null)} style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 700, color: '#6b7280' }}>Cancel</button>
                      <button onClick={() => saveProduct(editingProduct)} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', background: BRAND_BLUE, cursor: 'pointer', fontSize: '13px', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <Save size={13} /> Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ CUSTOMERS TAB ═══════════════ */}
          {activeTab === 'customers' && (
            <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '14px', fontWeight: 900, color: '#111' }}>All Customers</h3>
                <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '2px' }}>Derived from order history</p>
              </div>

              {orders.length === 0 ? (
                <div style={{ padding: '64px', textAlign: 'center', color: '#9ca3af', fontSize: '15px' }}>
                  <Users size={40} color="#e5e7eb" style={{ margin: '0 auto 16px' }} />
                  <p>No customer data yet. Customers will appear here once orders are placed.</p>
                </div>
              ) : (() => {
                // Build unique customers
                const map = new Map<string, { name: string; email: string; phone: string; orderCount: number; totalSpent: number; lastOrder: string; state: string }>();
                orders.forEach(o => {
                  const email = o.billing?.email || 'unknown';
                  const existing = map.get(email);
                  if (existing) {
                    existing.orderCount += 1;
                    existing.totalSpent += (o.status !== 'Cancelled' ? (o.total || 0) : 0);
                    if (new Date(o.date) > new Date(existing.lastOrder)) existing.lastOrder = o.date;
                  } else {
                    map.set(email, {
                      name: `${o.billing?.billingFirstName || ''} ${o.billing?.billingLastName || ''}`.trim() || '—',
                      email,
                      phone: o.billing?.billingPhone || '—',
                      orderCount: 1,
                      totalSpent: (o.status !== 'Cancelled' ? (o.total || 0) : 0),
                      lastOrder: o.date,
                      state: o.billing?.billingState || '—',
                    });
                  }
                });
                const customers = Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);

                return (
                  <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        {['Customer', 'Email', 'Phone', 'State', 'Orders', 'Total Spent', 'Last Order'].map(h => (
                          <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', whiteSpace: 'nowrap' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c, i) => (
                        <tr key={c.email} style={{ borderTop: '1px solid #f3f4f6' }}
                          onMouseOver={e => (e.currentTarget as HTMLElement).style.background = '#f9fafb'}
                          onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                        >
                          <td style={{ padding: '12px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: `hsl(${(i * 47) % 360}, 60%, 92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <span style={{ fontSize: '13px', fontWeight: 800, color: `hsl(${(i * 47) % 360}, 50%, 35%)` }}>{c.name[0]?.toUpperCase() || '?'}</span>
                              </div>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{c.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '15px', fontWeight: 600, color: '#111' }}>{c.email}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{c.phone}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{c.state}</td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{ display: 'inline-flex', padding: '2px 8px', background: '#ede9fe', color: '#7047eb', borderRadius: '10px', fontSize: '12px', fontWeight: 800 }}>{c.orderCount}</span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 800, color: '#111' }}>{fmt(c.totalSpent)}</td>
                          <td style={{ padding: '12px 16px', fontSize: '12px', color: '#9ca3af' }}>{fmtDate(c.lastOrder)}</td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ═══════════════ SETTINGS TAB ═══════════════ */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: 640 }}>
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: '8px' }}>Security Settings</h2>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Update your dashboard access PIN.</p>
                
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    const fd = new FormData(e.currentTarget);
                    const newPin = (fd.get('newPin') as string).trim().toUpperCase();
                    
                    if (newPin.length < 4) {
                      showToast('PIN must be at least 4 characters.', 'error');
                      setIsLoading(false);
                      return;
                    }
                    
                    try {
                      // Attempt to store in Supabase globally
                      const { error } = await supabase.from('site_settings').upsert({ key: 'admin_pin', value: newPin });
                      if (error) throw error;
                      showToast('PIN Changed successfully', 'success');
                      localStorage.removeItem('CUSTOM_ADMIN_PIN');
                      (e.target as HTMLFormElement).reset();
                    } catch (err: any) {
                      // Fallback to local storage if table doesn't exist
                      console.warn('Could not save PIN to Supabase (missing site_settings table or config). Saving to local device storage instead.', err);
                      localStorage.setItem('CUSTOM_ADMIN_PIN', newPin);
                      showToast(`PIN updated locally! (Sync failed: ${err?.message || 'Unknown'})`, 'error');
                    }
                    
                    setDynamicPin(newPin);
                    setIsLoading(false);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>New Access PIN</label>
                    <div style={{ position: 'relative' }}>
                      <input name="newPin" type={showChangePin ? 'text' : 'password'} placeholder="e.g. NEWPIN2025" required style={{ width: '100%', padding: '12px 40px 12px 16px', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '14px', fontFamily: "var(--font-heading)", textTransform: 'uppercase', boxSizing: 'border-box' }} />
                      <button 
                        type="button"
                        onClick={() => setShowChangePin(!showChangePin)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', outline: 'none', padding: 0, color: '#9ca3af', display: 'flex' }}
                      >
                        {showChangePin ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading} style={{ alignSelf: 'flex-start', background: BRAND_BLUE, color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', opacity: isLoading ? 0.7 : 1 }}>
                    {isLoading ? 'Updating...' : 'Change PIN'}
                  </button>
                </form>
              </div>

              {/* ── Nuclear Danger Zone ── */}
              <div style={{ background: '#fff', border: '1px solid #ef4444', borderRadius: '4px', padding: '24px', marginTop: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: '8px', color: '#dc2626' }}>☢ Danger Zone</h2>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Permanently remove ALL data from the live database including products, orders, and customers. This cannot be reversed.</p>

                <div style={{ padding: '16px', border: '1px solid #fee2e2', background: '#fef2f2', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#991b1b' }}>Full Database Reset</h4>
                    <p style={{ fontSize: '12px', color: '#b91c1c', marginTop: '4px' }}>Wipes {products.length} products, {orders.length} orders, and all customer records.</p>
                  </div>
                  <button
                    onClick={() => setNukeModalOpen(true)}
                    style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', fontFamily: "var(--font-heading)", whiteSpace: 'nowrap' }}
                  >
                    RESET ALL DATA
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ NUKE ALL DATA MODAL ═══════════════ */}
          {nukeModalOpen && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1001, padding: '24px' }}>
              <div style={{ background: '#fff', width: '100%', maxWidth: '440px', borderRadius: '2px', overflow: 'hidden', boxShadow: '24px 24px 0px rgba(0,0,0,1)' }}>
                <div style={{ background: '#111', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <AlertCircle size={20} color="#fff" />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '16px', fontWeight: 900, color: '#fff', margin: 0 }}>FULL DATABASE RESET</h3>
                </div>
                <div style={{ padding: '28px 24px' }}>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.7, marginBottom: '20px' }}>
                    This will <strong style={{ color: '#dc2626' }}>permanently delete</strong> every record from your live Supabase database:
                  </p>
                  <ul style={{ fontSize: '13px', color: '#6b7280', lineHeight: 2, marginBottom: '28px', paddingLeft: '20px' }}>
                    <li>🗑 All <strong style={{ color: '#111' }}>{products.length} products</strong> from the store</li>
                    <li>🗑 All <strong style={{ color: '#111' }}>{orders.length} orders</strong> and order history</li>
                    <li>🗑 All customer records derived from orders</li>
                    <li>🗑 All local cache and browser storage</li>
                  </ul>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '20px' }}>⚠ This action is irreversible and cannot be undone.</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setNukeModalOpen(false)}
                      style={{ flex: 1, padding: '14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#4b5563', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={nukeAllData}
                      style={{ flex: 1, padding: '14px', background: '#111', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#fff', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                    >
                      CONFIRM RESET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ DELETE MODAL ═══════════════ */}
          {productToDelete && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
              <div style={{ background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '2px', overflow: 'hidden', boxShadow: '24px 24px 0px rgba(0,0,0,1)' }}>
                <div style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', background: '#fee2e2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <AlertCircle size={32} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '20px', fontWeight: 900, color: '#111', marginBottom: '12px' }}>Delete Product?</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '32px' }}>
                    Are you sure you want to delete <span style={{ fontWeight: 800, color: '#111' }}>{productToDelete.name}</span>? This action is permanent and cannot be undone.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setProductToDelete(null)}
                      style={{ flex: 1, padding: '14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#4b5563', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={() => deleteProduct(productToDelete.id)}
                      style={{ flex: 1, padding: '14px', background: '#111', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#fff', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                    >
                      CONFIRM DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ WIPE DATABASE MODAL ═══════════════ */}
          {wipeModalOpen && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
              <div style={{ background: '#fff', width: '100%', maxWidth: '400px', borderRadius: '2px', overflow: 'hidden', boxShadow: '24px 24px 0px rgba(220, 38, 38, 1)' }}>
                <div style={{ padding: '32px', textAlign: 'center' }}>
                  <div style={{ width: '64px', height: '64px', background: '#fee2e2', color: '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <Trash2 size={32} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '20px', fontWeight: 900, color: '#dc2626', marginBottom: '12px' }}>WIPE DATABASE?</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6, marginBottom: '32px' }}>
                    Are you absolutely sure you want to PERMANENTLY delete <span style={{ fontWeight: 800, color: '#111' }}>ALL {products.length} PRODUCTS</span> from your database? This action overrides everything and cannot be undone.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => setWipeModalOpen(false)}
                      style={{ flex: 1, padding: '14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#4b5563', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={deleteAllProducts}
                      style={{ flex: 1, padding: '14px', background: '#dc2626', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#fff', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                    >
                      CONFIRM WIPE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ TOAST NOTIFICATION ═══════════════ */}
          {toastMessage && (
            <div style={{
              position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999,
              background: toastMessage.type === 'error' ? '#ef4444' : toastMessage.type === 'info' ? '#3b82f6' : '#16a34a',
              color: '#fff', padding: '16px 24px', borderRadius: '8px',
              fontFamily: "var(--font-heading)", fontSize: '15px', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
              animation: 'toast-slide-up 0.3s ease-out forwards'
            }}>
              {toastMessage.type === 'error' ? <AlertCircle size={18} /> : toastMessage.type === 'info' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              {toastMessage.message}
              <style>{`@keyframes toast-slide-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
            </div>
          )}

          {/* ═══════════════ MIGRATION MODAL ═══════════════ */}
          {migrationModal.open && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
              <div style={{ background: '#fff', width: '100%', maxWidth: '420px', borderRadius: '4px', overflow: 'hidden', boxShadow: '24px 24px 0px rgba(0,0,0,1)' }}>
                <div style={{ padding: '36px', textAlign: 'center' }}>
                  {migrationModal.status === 'idle' && (
                    <>
                      <div style={{ width: '64px', height: '64px', background: '#e0e7ff', color: BRAND_BLUE, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <RefreshCcw size={32} />
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '20px', fontWeight: 900, color: '#111', marginBottom: '12px' }}>Database Synchronization</h3>
                      <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, marginBottom: '32px' }}>
                        This will securely push all localized application data (products and orders) to the live Supabase Postgres Database. Are you ready to continue?
                      </p>
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                          onClick={() => setMigrationModal({ open: false, status: 'idle' })}
                          style={{ flex: 1, padding: '14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#4b5563', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                        >
                          CANCEL
                        </button>
                        <button
                          onClick={executeMigration}
                          style={{ flex: 1, padding: '14px', background: BRAND_BLUE, border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#fff', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                        >
                          PROCEED
                        </button>
                      </div>
                    </>
                  )}
                  {migrationModal.status === 'syncing' && (
                    <div style={{ padding: '20px 0' }}>
                      <div className="spinner" style={{ border: '4px solid rgba(0,0,0,0.1)', borderTop: `4px solid ${BRAND_BLUE}`, borderRadius: '50%', width: '48px', height: '48px', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }}></div>
                      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '18px', fontWeight: 800, color: '#111' }}>Synchronizing Data...</h3>
                      <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>Please do not close this window.</p>
                    </div>
                  )}
                  {(migrationModal.status === 'success' || migrationModal.status === 'error') && (
                    <>
                      <div style={{ width: '64px', height: '64px', background: migrationModal.status === 'success' ? '#dcfce7' : '#fee2e2', color: migrationModal.status === 'success' ? '#16a34a' : '#dc2626', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        {migrationModal.status === 'success' ? <Shield size={32} /> : <X size={32} />}
                      </div>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '20px', fontWeight: 900, color: '#111', marginBottom: '12px' }}>
                        {migrationModal.status === 'success' ? 'Success' : 'Action Failed'}
                      </h3>
                      <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.6, marginBottom: '32px' }}>
                        {migrationModal.message}
                      </p>
                      <button
                        onClick={() => setMigrationModal({ open: false, status: 'idle' })}
                        style={{ width: '100%', padding: '14px', background: '#111', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: 800, color: '#fff', cursor: 'pointer', fontFamily: "var(--font-heading)" }}
                      >
                        CLOSE
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
