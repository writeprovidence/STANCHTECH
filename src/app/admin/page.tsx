'use client';

import { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from '@/data/products';
import { supabase } from '@/lib/supabase';
import { useUser } from '@clerk/nextjs';
import {
  saveAdminProduct,
  deleteAdminProduct,
  deleteAllAdminProducts,
  nukeAllAdminData,
  executeMigrationAction,
  verifyAdminAccess
} from '@/app/actions/admin';
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
  billing: { billingFirstName: string; billingLastName: string; email: string; billingPhone: string; billingAddress: string; billingState: string; billingCity: string; deliveryMethod?: string };
  paymentMethod: string;
  deliveryMethod: string;
}

interface AdminProduct {
  id: number;
  name: string;
  image: string;
  images: string[];
  description: string;
  sku: string;
  category?: string;
  weight?: string;
  condition: string;
  stock?: number;
  is_featured?: boolean;
  is_hidden?: boolean;
}

// ─── Admin Auth (Clerk-based) ────────────────────────────────────────────────
// PIN is no longer hardcoded. Auth is handled by Clerk + server-side email check.

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
  const { isSignedIn, user, isLoaded: clerkLoaded } = useUser();
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab ] = useState<'overview' | 'products' | 'settings'>('products');
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

  // ─── Clerk-Based Admin Verification ─────────────────────────────────────
  useEffect(() => {
    if (!clerkLoaded) return;
    if (!isSignedIn) {
      setIsAuthed(false);
      setAuthError('NOT_SIGNED_IN');
      return;
    }
    // Verify admin access via server action
    verifyAdminAccess().then(result => {
      if (result.authorized) {
        setIsAuthed(true);
        setAuthError('');
      } else {
        setIsAuthed(false);
        setAuthError(result.error || 'Forbidden');
      }
    });
  }, [clerkLoaded, isSignedIn]);

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

      if (dbProducts !== null && !pError) {
        setProducts(dbProducts);
      } else if (pError) {
        // Only if there's an actual ERROR (not just empty), we might show a message or fallback
        console.error('Products fetch error:', pError);
        const overrides = localStorage.getItem('admin_products');
        if (overrides) {
          try { setProducts(JSON.parse(overrides)); } catch {}
        }
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

  const deleteProduct = async (id: number) => {
    setIsLoading(true);
    try {
      const result = await deleteAdminProduct(id);
      if (!result.success) {
        showToast(`Failed to delete: ${result.error}`, "error");
        return;
      }

      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      setProductToDelete(null);
      showToast("Product deleted successfully", "success");
    } catch (err: any) {
      showToast(`Error: ${err.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAllProducts = async () => {
    setIsLoading(true);
    setWipeModalOpen(false);
    try {
      const result = await deleteAllAdminProducts();
      if (!result.success) {
        showToast(`Failed: ${result.error}`, "error");
        return;
      }
      setProducts([]);
      showToast("All products have been permanently deleted.", "success");
    } catch (err: any) {
      showToast("Failed to delete all products.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const nukeAllData = async () => {
    setNukeModalOpen(false);
    setIsLoading(true);
    try {
      const result = await nukeAllAdminData();
      if (!result.success) {
        showToast(`Failed: ${result.error}`, "error");
        return;
      }
      setProducts([]);
      localStorage.removeItem('admin_products');
      showToast('All data has been permanently wiped. Dashboard is clean.', 'success');
    } catch (err: any) {
      showToast('Failed to wipe all data.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const executeMigration = async () => {
    setMigrationModal(prev => ({ ...prev, status: 'syncing' }));
    try {
      if (products.length > 0) {
        const insertPayload = products.map(p => ({
          name: p.name,
          image: p.image || '',
          images: p.images || [],
          description: p.description || '',
          sku: p.sku || '',
          category: p.category || '',
          condition: p.condition || '',
          stock: typeof p.stock === 'number' ? p.stock : 1,
          is_featured: p.is_featured || false,
          is_hidden: p.is_hidden || false,
        }));
        const result = await executeMigrationAction(insertPayload);
        if (!result.success) throw new Error(result.error);
      }

      setMigrationModal({ open: true, status: 'success', message: 'Synchronization complete! Database is now identical to your dashboard.' });
      loadData();
    } catch (err: any) {
      setMigrationModal({ open: true, status: 'error', message: err.message || 'Sync failed. Check console.' });
      console.error(err);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Compress image before storing to avoid Supabase payload limits
      const img = new window.Image();
      img.onload = () => {
        const MAX_W = 800;
        const MAX_H = 800;
        let { width, height } = img;
        if (width > MAX_W) { height = Math.round(height * MAX_W / width); width = MAX_W; }
        if (height > MAX_H) { width = Math.round(width * MAX_H / height); height = MAX_H; }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d')!.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
        const currentImages = editingProduct.images?.filter(i => !i.startsWith('https://images.unsplash.com')) || [];
        setEditingProduct({
          ...editingProduct,
          image: compressedDataUrl,  // Always update to the newly uploaded image
          images: [...currentImages, compressedDataUrl]
        });
      };
      img.src = reader.result as string;
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
      const dbPayload: Record<string, any> = {
        name: p.name,
        image: p.image || '',
        images: p.images || [],
        description: p.description || '',
        sku: p.sku || '',
        category: p.category || '',
        weight: p.weight || '',
        condition: p.condition || '',
        stock: typeof p.stock === 'number' ? p.stock : 1,
        is_featured: p.is_featured || false,
        is_hidden: p.is_hidden || false,
      };

      const exists = products.find(x => x.id === p.id);
      const result = await saveAdminProduct(dbPayload, !!exists, p.id);

      if (!result.success) {
        showToast(`Failed to save: ${result.error}`, 'error');
        return;
      }

      await loadData();
      setEditingProduct(null);
      showToast(exists ? 'Product updated successfully!' : 'Product added successfully!', 'success');
    } catch (err: any) {
      console.error('Save error:', err);
      showToast(`Error: ${err.message || 'Unknown error'}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Computed stats ───────────────────────────────────────────────────────
  const uniqueCustomers = 0; // Disabled

  const filteredOrders: any[] = [];

  const filteredProducts = products.filter(p => {
    const q = searchProducts.toLowerCase();
    return !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  // Condition totals for mini chart
  const conditionTotals = products.reduce((acc, p) => {
    acc[p.condition] = (acc[p.condition] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const maxCat = Math.max(0, ...Object.values(conditionTotals));

  // ─── Auth Guard (Clerk-based) ──────────────────────────────────────────────
  if (!clerkLoaded) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0f11', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #2a2a32', borderTopColor: BRAND_BLUE, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#6b7280', fontSize: '14px', fontFamily: "var(--font-heading)" }}>Loading...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0f11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "var(--font-heading)" }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ width: '56px', height: '56px', background: BRAND_BLUE, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Shield size={28} color="#fff" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '8px' }}>ADMIN ACCESS</h1>
            <p style={{ fontSize: '15px', color: '#6b7280' }}>StanchTech Control Panel — Restricted</p>
          </div>

          <div style={{ background: '#1a1a1f', border: '1px solid #2a2a32', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <Lock size={24} color="#4b5563" style={{ marginBottom: '16px' }} />
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>
              You must be signed in with an authorized admin account to access this panel.
            </p>
            <a
              href="/login"
              style={{ display: 'inline-block', width: '100%', padding: '14px', background: '#7047eb', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', textDecoration: 'none', letterSpacing: '0.05em' }}
            >
              SIGN IN
            </a>
          </div>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#374151', marginTop: '24px' }}>
            <a href="/" style={{ color: '#4b5563', textDecoration: 'none' }}>← Back to StanchTech</a>
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0f11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "var(--font-heading)" }}>
        <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ width: '56px', height: '56px', background: '#dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Shield size={28} color="#fff" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '8px' }}>ACCESS DENIED</h1>
            <p style={{ fontSize: '15px', color: '#6b7280' }}>StanchTech Control Panel — Restricted</p>
          </div>

          <div style={{ background: '#1a1a1f', border: '1px solid #2a2a32', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
            <AlertCircle size={24} color="#ef4444" style={{ marginBottom: '16px' }} />
            <p style={{ color: '#ef4444', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>
              Unauthorized Account
            </p>
            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '24px' }}>
              The account <strong style={{ color: '#9ca3af' }}>{user?.emailAddresses?.[0]?.emailAddress}</strong> is not authorized for admin access. Contact your system administrator.
            </p>
            <a
              href="/"
              style={{ display: 'inline-block', width: '100%', padding: '14px', background: '#2a2a32', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 800, cursor: 'pointer', textDecoration: 'none', letterSpacing: '0.05em' }}
            >
              RETURN TO WEBSITE
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────
  const NAV = [
    { id: 'products', label: 'Inventory', icon: Package },
    { id: 'overview', label: 'Insights', icon: LayoutDashboard },
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
                {activeTab === 'products' && 'Product Catalog'}
                {activeTab === 'settings' && 'Settings'}
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
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <StatCard label="Total Inventory" value={String(products.length)} sub="Active spare parts" icon={Package} accent="#2563eb" />
                <StatCard label="Featured Items" value={String(products.filter(p => p.is_featured).length)} sub="Showcased on shop" icon={TrendingUp} accent="#16a34a" />
                <StatCard label="Visibility" value={String(products.filter(p => !p.is_hidden).length)} sub="Visible to public" icon={Eye} accent="#7047eb" />
              </div>

              {/* Two columns: recent orders + category chart */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: '#f5f5f7', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={40} color={BRAND_BLUE} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '8px' }}>Inventory Catalog Model</h3>
                    </div>
                    <button 
                        onClick={() => setActiveTab('products')}
                        style={{ padding: '12px 24px', background: BRAND_BLUE, color: '#white', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                    >
                        MANAGE SPARES
                    </button>
                </div>

                {/* Category Distribution */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: '14px', fontWeight: 900, color: '#111' }}>Product Conditions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {Object.entries(conditionTotals).map(([cat, count]) => (
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
                      Inventory Health
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Package size={13} color={BRAND_BLUE} />
                                <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>Total Items</span>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>{products.length}</span>
                        </div>
                    </div>
                  </div>
                </div>
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
                        placeholder="Search products by name, SKU or Engine Model…"
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
                        image: 'https://images.unsplash.com/photo-1590674899484-d564fa070e6c?auto=format&fit=crop&q=80&w=200',
                        images: ['https://images.unsplash.com/photo-1590674899484-d564fa070e6c?auto=format&fit=crop&q=80&w=200'],
                        description: '',
                        sku: `SS${String(Math.max(0, ...products.map(p => p.id)) + 1).padStart(3, '0')}`,
                        weight: '',
                        condition: 'Genuine Part',
                        quantity: 0,
                        is_featured: false,
                        is_hidden: false,
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
                          {['', 'Product', 'Condition', ''].map((h, i) => (
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
                              {p.is_featured && (
                                <span style={{ 
                                  fontSize: '10px', 
                                  fontWeight: 900, 
                                  background: BRAND_BLUE, 
                                  color: '#fff', 
                                  padding: '2px 6px', 
                                  borderRadius: '2px',
                                  fontFamily: "var(--font-heading)",
                                  letterSpacing: '0.05em'
                                }}>
                                  FEATURED
                                </span>
                              )}
                              {p.is_hidden && (
                                <span style={{ 
                                  fontSize: '10px', 
                                  fontWeight: 900, 
                                  background: '#ef4444', 
                                  color: '#fff', 
                                  padding: '2px 6px', 
                                  borderRadius: '2px',
                                  fontFamily: "var(--font-heading)",
                                  letterSpacing: '0.05em'
                                }}>
                                  HIDDEN
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: '12px', color: '#6b7280' }}>{p.condition}</td>
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

                    </div>

                    {[
                      { label: 'Product Name', key: 'name', type: 'text' },
                      { label: 'Weight (kg)', key: 'weight', type: 'text' },
                      { label: 'Specification', key: 'description', type: 'textarea' },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'block', marginBottom: '5px' }}>{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={(editingProduct as any)[field.key] ?? ''}
                            onChange={e => setEditingProduct({ ...editingProduct, [field.key]: e.target.value })}
                            rows={3}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '16px', outline: 'none', resize: 'vertical', boxSizing: 'border-box', color: '#111', fontFamily: "var(--font-heading)" }}
                          />
                        ) : (
                          <input
                            type={field.type}
                            value={(editingProduct as any)[field.key] ?? ''}
                            onChange={e => setEditingProduct({ ...editingProduct, [field.key]: field.type === 'number' ? (e.target.value === '' ? '' as unknown as number : Number(e.target.value)) : e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', color: '#111' }}
                          />
                        )}
                      </div>
                    ))}

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'block', marginBottom: '5px' }}>Condition</label>
                      <select
                        value={editingProduct.condition}
                        onChange={e => setEditingProduct({ ...editingProduct, condition: e.target.value })}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', color: '#111', background: '#fff' }}
                      >
                        {['Genuine Part', 'OEM', 'Rerun/Reman', 'Used'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'block', marginBottom: '5px' }}>Stock Status</label>
                      <select
                        value={typeof editingProduct.stock === 'number' && editingProduct.stock === 0 ? 'Out of Stock' : 'In Stock'}
                        onChange={e => setEditingProduct({ ...editingProduct, stock: e.target.value === 'In Stock' ? 1 : 0 })}
                        style={{ width: '100%', padding: '8px 10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', color: '#111', background: '#fff' }}
                      >
                        {['In Stock', 'Out of Stock'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: '#f5f7ff', borderRadius: '8px', marginBottom: '10px', border: `1px solid ${BRAND_BLUE}20` }}>
                      <input 
                        type="checkbox" 
                        id="is_featured"
                        checked={editingProduct.is_featured || false}
                        onChange={e => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <label htmlFor="is_featured" style={{ fontSize: '12px', fontWeight: 700, color: BRAND_BLUE, cursor: 'pointer', fontFamily: "var(--font-heading)" }}>FEATURE ON HOMEPAGE</label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: editingProduct.is_hidden ? '#fef2f2' : '#f9fafb', borderRadius: '8px', marginBottom: '10px', border: editingProduct.is_hidden ? `1px solid #ef444420` : '1px solid #e5e7eb' }}>
                      <input 
                        type="checkbox" 
                        id="is_hidden"
                        checked={editingProduct.is_hidden || false}
                        onChange={e => setEditingProduct({ ...editingProduct, is_hidden: e.target.checked })}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <label htmlFor="is_hidden" style={{ fontSize: '12px', fontWeight: 700, color: editingProduct.is_hidden ? '#dc2626' : '#6b7280', cursor: 'pointer', fontFamily: "var(--font-heading)" }}>HIDE FROM STOREFRONT</label>
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


          {/* ═══════════════ SETTINGS TAB ═══════════════ */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: 640 }}>
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={24} color={BRAND_BLUE} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: '4px' }}>Admin Account</h2>
                    <p style={{ fontSize: '13px', color: '#6b7280' }}>Authenticated via Clerk · Role-based access control</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Signed in as</label>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>{user?.emailAddresses?.[0]?.emailAddress || '—'}</p>
                  </div>
                  <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', display: 'block', marginBottom: '6px' }}>Name</label>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#111' }}>{user?.fullName || user?.firstName || '—'}</p>
                  </div>
                  <div style={{ padding: '16px', background: '#dcfce7', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} color="#16a34a" />
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Authorized Admin</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#15803d', marginTop: '6px' }}>This account has full access to the inventory catalog and admin operations.</p>
                  </div>
                </div>

                <div style={{ marginTop: '24px', padding: '16px', background: '#f5f7ff', borderRadius: '8px', border: `1px solid ${BRAND_BLUE}20` }}>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>
                    <strong style={{ color: '#374151' }}>Security Note:</strong> Admin access is controlled server-side via Clerk authentication and email verification. 
                    To add or remove admin users, update the <code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '3px', fontSize: '11px' }}>ADMIN_EMAILS</code> environment variable.
                  </p>
                </div>
              </div>

              {/* ── Nuclear Danger Zone ── */}
              <div style={{ background: '#fff', border: '1px solid #ef4444', borderRadius: '4px', padding: '24px', marginTop: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: '8px', color: '#dc2626' }}>☢ Danger Zone</h2>
                <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>Permanently remove ALL data from the live database including products. This cannot be reversed.</p>

                <div style={{ padding: '16px', border: '1px solid #fee2e2', background: '#fef2f2', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#991b1b' }}>Full Database Reset</h4>
                    <p style={{ fontSize: '12px', color: '#b91c1c', marginTop: '4px' }}>Wipes {products.length} products and all associated records.</p>
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
