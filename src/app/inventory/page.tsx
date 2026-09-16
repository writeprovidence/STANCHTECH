'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';
import { verifyAdminAccess } from '@/app/actions/admin';
import {
  fetchInventoryItems, saveInventoryItem, deleteInventoryItem, deleteAllInventory,
  type InventoryItem
} from '@/app/actions/inventory';
import {
  Package, LogOut, Search, Plus, Save, X, Edit2, Trash2,
  Shield, Lock, AlertCircle, ChevronRight, ExternalLink,
  BarChart3, Warehouse, MapPin, Tag, Hash, DollarSign,
  AlertTriangle, CheckCircle2, Clock, RefreshCcw, Filter,
  ArrowUpDown, Box, Layers, TrendingDown
} from 'lucide-react';

const BRAND = '#155DFC';
const NAVY = '#0b1a2e';
const CATEGORIES = ['Engine Parts','Filters','Pumps','Valves','Bearings','Electrical','Gaskets','Turbocharger','Cooling System','Fuel System','Exhaust','Hydraulic','Safety Equipment','Tools','Other'];
const CONDITIONS = ['New','Refurbished','Used - Good','Used - Fair','Surplus'];

function StatCard({ label, value, sub, icon: Icon, accent, alert }: any) {
  return (
    <div style={{ background: '#fff', border: alert ? '1.5px solid #f59e0b' : '1px solid #e5e7eb', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '2px', position: 'relative', overflow: 'hidden' }}>
      {alert && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#f59e0b' }} />}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9ca3af', fontFamily: 'var(--font-heading)' }}>{label}</span>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={accent} />
        </div>
      </div>
      <div>
        <span style={{ fontSize: '32px', fontWeight: 900, color: '#111', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{value}</span>
        {sub && <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px', fontFamily: 'var(--font-heading)' }}>{sub}</p>}
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState('');
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [condFilter, setCondFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState<'all'|'low'|'out'>('all');
  const [editingItem, setEditingItem] = useState<Partial<InventoryItem> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<InventoryItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success'|'error'|'info' } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeView, setActiveView] = useState<'inventory'|'alerts'|'overview'>('inventory');
  const [sortBy, setSortBy] = useState<'name'|'quantity'|'cost'|'updated'>('name');
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc');
  const [wipeModal, setWipeModal] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { setIsAuthed(false); setAuthError('NOT_SIGNED_IN'); return; }
    verifyAdminAccess().then(r => {
      if (r.authorized) { setIsAuthed(true); setAuthError(''); }
      else { setIsAuthed(false); setAuthError(r.error || 'Forbidden'); }
    });
  }, [isLoaded, isSignedIn]);

  const showToast = useCallback((msg: string, type: 'success'|'error'|'info' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const loadData = useCallback(async () => {
    if (!isAuthed) return;
    setLoading(true);
    try {
      const result = await fetchInventoryItems();
      if (result.success && result.data) setItems(result.data);
      else if (result.error) showToast(result.error, 'error');
    } catch { showToast('Failed to load inventory', 'error'); }
    finally { setLoading(false); }
  }, [isAuthed, showToast]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSave = async () => {
    if (!editingItem || !editingItem.part_name) { showToast('Part name is required', 'error'); return; }
    setLoading(true);
    try {
      const isUpdate = !!editingItem.id && items.some(i => i.id === editingItem.id);
      const result = await saveInventoryItem(editingItem, isUpdate, editingItem.id);
      if (result.success) {
        showToast(isUpdate ? 'Item updated!' : 'Item added!', 'success');
        setEditingItem(null);
        await loadData();
      } else showToast(result.error || 'Save failed', 'error');
    } catch { showToast('Save failed', 'error'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await deleteInventoryItem(id);
      if (result.success) { showToast('Item deleted', 'success'); setDeleteTarget(null); await loadData(); }
      else showToast(result.error || 'Delete failed', 'error');
    } catch { showToast('Delete failed', 'error'); }
    finally { setLoading(false); }
  };

  const handleWipe = async () => {
    setWipeModal(false); setLoading(true);
    try {
      const result = await deleteAllInventory();
      if (result.success) { setItems([]); showToast('Inventory wiped', 'success'); }
      else showToast(result.error || 'Wipe failed', 'error');
    } catch { showToast('Wipe failed', 'error'); }
    finally { setLoading(false); }
  };

  const newItem = () => setEditingItem({
    part_name: '', part_number: '', category: 'Engine Parts', location: '',
    quantity: 0, min_stock: 5, unit_cost: 0, supplier: '', condition: 'New', notes: ''
  });

  // Filtering & sorting
  const filtered = items.filter(i => {
    const q = search.toLowerCase();
    const matchSearch = !q || i.part_name.toLowerCase().includes(q) || i.part_number.toLowerCase().includes(q) || i.supplier.toLowerCase().includes(q);
    const matchCat = catFilter === 'All' || i.category === catFilter;
    const matchCond = condFilter === 'All' || i.condition === condFilter;
    const matchStock = stockFilter === 'all' || (stockFilter === 'low' && i.quantity <= i.min_stock && i.quantity > 0) || (stockFilter === 'out' && i.quantity === 0);
    return matchSearch && matchCat && matchCond && matchStock;
  }).sort((a, b) => {
    const dir = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'name') return dir * a.part_name.localeCompare(b.part_name);
    if (sortBy === 'quantity') return dir * (a.quantity - b.quantity);
    if (sortBy === 'cost') return dir * (a.unit_cost - b.unit_cost);
    return dir * (new Date(a.updated_at || 0).getTime() - new Date(b.updated_at || 0).getTime());
  });

  const lowStockItems = items.filter(i => i.quantity > 0 && i.quantity <= i.min_stock);
  const outOfStockItems = items.filter(i => i.quantity === 0);
  const totalValue = items.reduce((s, i) => s + i.quantity * i.unit_cost, 0);
  const uniqueCategories = [...new Set(items.map(i => i.category).filter(Boolean))];

  // ── Auth Guards ──
  if (!isLoaded) return (
    <div style={{ minHeight: '100vh', background: '#0f0f11', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '40px', height: '40px', border: '3px solid #2a2a32', borderTopColor: BRAND, borderRadius: '50%', animation: 'spin .8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!isSignedIn) return (
    <div style={{ minHeight: '100vh', background: '#0f0f11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', background: BRAND, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Shield size={28} color="#fff" /></div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>INVENTORY ACCESS</h1>
        <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '32px' }}>StanchTech Internal — Restricted</p>
        <div style={{ background: '#1a1a1f', border: '1px solid #2a2a32', borderRadius: '12px', padding: '32px' }}>
          <Lock size={24} color="#4b5563" style={{ marginBottom: '16px' }} />
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px' }}>Sign in with an authorized admin account.</p>
          <a href="/login?next=/inventory" style={{ display: 'block', padding: '14px', background: BRAND, color: '#fff', borderRadius: '8px', fontSize: '15px', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.05em' }}>SIGN IN</a>
        </div>
        <p style={{ fontSize: '12px', color: '#374151', marginTop: '24px' }}><a href="/" style={{ color: '#4b5563', textDecoration: 'none' }}>← Back to StanchTech</a></p>
      </div>
    </div>
  );

  if (!isAuthed) return (
    <div style={{ minHeight: '100vh', background: '#0f0f11', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', background: '#dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><Shield size={28} color="#fff" /></div>
        <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>ACCESS DENIED</h1>
        <div style={{ background: '#1a1a1f', border: '1px solid #2a2a32', borderRadius: '12px', padding: '32px', marginTop: '24px' }}>
          <AlertCircle size={24} color="#ef4444" style={{ marginBottom: '16px' }} />
          <p style={{ color: '#ef4444', fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>Unauthorized</p>
          <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '24px' }}><strong style={{ color: '#9ca3af' }}>{user?.emailAddresses?.[0]?.emailAddress}</strong> is not authorized.</p>
          <button onClick={() => signOut({ redirectUrl: '/inventory' })} style={{ width: '100%', padding: '14px', background: BRAND, color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 800, cursor: 'pointer' }}>SWITCH ACCOUNT</button>
        </div>
      </div>
    </div>
  );

  const NAV = [
    { id: 'inventory', label: 'Inventory', icon: Warehouse },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle, badge: lowStockItems.length + outOfStockItems.length },
    { id: 'overview', label: 'Overview', icon: BarChart3 },
  ];

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '13px', outline: 'none', boxSizing: 'border-box' as const, color: '#111', fontFamily: 'var(--font-heading)' };
  const labelStyle = { fontSize: '11px', fontWeight: 800 as const, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#6b7280', marginBottom: '4px', display: 'block', fontFamily: 'var(--font-heading)' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f7', fontFamily: 'var(--font-heading)', position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999, padding: '14px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 700, color: '#fff', background: toast.type === 'success' ? '#16a34a' : toast.type === 'error' ? '#dc2626' : BRAND, boxShadow: '0 8px 32px rgba(0,0,0,0.2)', animation: 'slideIn .3s ease' }}>
          {toast.msg}
        </div>
      )}
      <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }`}</style>

      {/* Mobile overlay */}
      {mobileMenu && <div onClick={() => setMobileMenu(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }} />}

      {/* Sidebar */}
      <aside style={{ width: sidebarCollapsed ? '72px' : '240px', background: '#0a0e1a', color: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, transition: 'all .25s ease', top: 0, height: '100vh', overflow: 'hidden', zIndex: 150 }} className={`inv-sidebar ${mobileMenu ? 'open' : ''}`}>
        <style>{`
          @media (min-width:1024px) { .inv-sidebar { position: sticky !important; } .inv-mob-toggle { display: none !important; } }
          @media (max-width:1023px) {
            .inv-sidebar { position: fixed !important; width: 240px !important; left: -240px; transition: left .3s ease !important; }
            .inv-sidebar.open { left: 0 !important; }
            .inv-stats-grid { grid-template-columns: 1fr !important; }
            .inv-edit-panel { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; z-index: 200 !important; max-height: 100vh !important; border-radius: 0 !important; margin: 0 !important; }
            .inv-main { padding: 16px !important; }
            .inv-toolbar { flex-direction: column !important; align-items: stretch !important; }
          }
        `}</style>

        {/* Logo */}
        <div style={{ padding: sidebarCollapsed ? '24px 16px' : '24px', borderBottom: '1px solid #161b2e', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #155DFC, #7047eb)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Warehouse size={20} color="#fff" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <p style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '0.08em' }}>STANCHTECH</p>
              <p style={{ fontSize: '10px', color: '#4b5563', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Inventory</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV.map(item => {
            const Icon = item.icon;
            const active = activeView === item.id;
            return (
              <button key={item.id} onClick={() => { setActiveView(item.id as any); setMobileMenu(false); }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left', background: active ? BRAND : 'transparent', color: active ? '#fff' : '#6b7280', transition: 'all .15s', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', position: 'relative' }}
                onMouseOver={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#131829'; }}
                onMouseOut={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && <span style={{ fontSize: '14px', fontWeight: active ? 800 : 600 }}>{item.label}</span>}
                {!sidebarCollapsed && item.badge > 0 && (
                  <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 900, background: '#ef4444', color: '#fff', padding: '2px 7px', borderRadius: '10px', minWidth: '20px', textAlign: 'center' }}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 8px', borderTop: '1px solid #161b2e', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button onClick={() => setSidebarCollapsed(c => !c)} className="inv-mob-hide" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#4b5563', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <ChevronRight size={18} style={{ transform: sidebarCollapsed ? 'rotate(0)' : 'rotate(180deg)', transition: 'transform .25s', flexShrink: 0 }} />
            {!sidebarCollapsed && <span style={{ fontSize: '13px', fontWeight: 600 }}>Collapse</span>}
          </button>
          <a href="/admin" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px', textDecoration: 'none', color: '#4b5563', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <ExternalLink size={17} style={{ flexShrink: 0 }} />
            {!sidebarCollapsed && <span style={{ fontSize: '13px', fontWeight: 600 }}>Admin Panel</span>}
          </a>
          <button onClick={() => signOut({ redirectUrl: '/' })} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: sidebarCollapsed ? '12px' : '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'transparent', color: '#dc2626', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <LogOut size={17} style={{ flexShrink: 0 }} />
            {!sidebarCollapsed && <span style={{ fontSize: '13px', fontWeight: 600 }}>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Header */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setMobileMenu(true)} className="inv-mob-toggle" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#111', display: 'flex' }}><BarChart3 size={20} /></button>
            <h1 style={{ fontSize: '16px', fontWeight: 900, color: '#111', letterSpacing: '-0.01em' }}>
              {activeView === 'inventory' && 'Inventory Management'}
              {activeView === 'alerts' && 'Stock Alerts'}
              {activeView === 'overview' && 'Inventory Overview'}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: '#9ca3af' }}>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #155DFC, #7047eb)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Warehouse size={16} color="#fff" />
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="inv-main" style={{ flex: 1, overflowY: 'auto', padding: '32px', position: 'relative' }}>
          {loading && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${BRAND}, #7047eb)`, zIndex: 100, animation: 'loadbar 1.5s infinite' }} />}
          <style>{`@keyframes loadbar { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>

          {/* ═══ INVENTORY VIEW ═══ */}
          {activeView === 'inventory' && (
            <div style={{ display: 'flex', gap: '24px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Toolbar */}
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', overflow: 'hidden' }}>
                  <div className="inv-toolbar" style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                      <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parts, numbers, suppliers…" style={{ ...inputStyle, paddingLeft: '34px' }} />
                    </div>
                    <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ ...inputStyle, width: 'auto', minWidth: '140px' }}>
                      <option value="All">All Categories</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={stockFilter} onChange={e => setStockFilter(e.target.value as any)} style={{ ...inputStyle, width: 'auto', minWidth: '120px' }}>
                      <option value="all">All Stock</option>
                      <option value="low">Low Stock</option>
                      <option value="out">Out of Stock</option>
                    </select>
                    <button onClick={() => setWipeModal(true)} style={{ padding: '9px 14px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}><Trash2 size={14} /> WIPE</button>
                    <button onClick={newItem} style={{ padding: '9px 14px', background: BRAND, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}><Plus size={14} /> ADD ITEM</button>
                    <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{filtered.length} items</span>
                  </div>

                  {/* Table */}
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                      <thead>
                        <tr style={{ background: '#f9fafb' }}>
                          {[
                            { key: 'name', label: 'Part Name' },
                            { key: '', label: 'Part #' },
                            { key: '', label: 'Category' },
                            { key: 'quantity', label: 'Qty' },
                            { key: '', label: 'Min' },
                            { key: 'cost', label: 'Unit Cost' },
                            { key: '', label: 'Location' },
                            { key: '', label: 'Status' },
                            { key: '', label: '' },
                          ].map((h, i) => (
                            <th key={i} onClick={() => { if (h.key) { setSortBy(h.key as any); setSortDir(d => d === 'asc' ? 'desc' : 'asc'); } }}
                              style={{ padding: '10px 12px', textAlign: 'left', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9ca3af', cursor: h.key ? 'pointer' : 'default', whiteSpace: 'nowrap', userSelect: 'none' }}>
                              {h.label} {h.key && sortBy === h.key && <ArrowUpDown size={10} style={{ display: 'inline' }} />}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(item => {
                          const isLow = item.quantity > 0 && item.quantity <= item.min_stock;
                          const isOut = item.quantity === 0;
                          return (
                            <tr key={item.id} style={{ borderTop: '1px solid #f3f4f6' }}
                              onMouseOver={e => (e.currentTarget as HTMLElement).style.background = '#f9fafb'}
                              onMouseOut={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                            >
                              <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 700, color: '#111' }}>{item.part_name}</td>
                              <td style={{ padding: '10px 12px', fontSize: '12px', color: '#6b7280', fontFamily: 'monospace' }}>{item.part_number}</td>
                              <td style={{ padding: '10px 12px' }}><span style={{ fontSize: '11px', fontWeight: 700, background: '#f3f4f6', padding: '3px 8px', borderRadius: '4px', color: '#374151' }}>{item.category}</span></td>
                              <td style={{ padding: '10px 12px', fontSize: '14px', fontWeight: 900, color: isOut ? '#dc2626' : isLow ? '#f59e0b' : '#111' }}>{item.quantity}</td>
                              <td style={{ padding: '10px 12px', fontSize: '12px', color: '#9ca3af' }}>{item.min_stock}</td>
                              <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 600, color: '#111' }}>${Number(item.unit_cost).toFixed(2)}</td>
                              <td style={{ padding: '10px 12px', fontSize: '12px', color: '#6b7280' }}>{item.location}</td>
                              <td style={{ padding: '10px 12px' }}>
                                {isOut ? <span style={{ fontSize: '10px', fontWeight: 900, background: '#fef2f2', color: '#dc2626', padding: '3px 8px', borderRadius: '4px' }}>OUT</span>
                                  : isLow ? <span style={{ fontSize: '10px', fontWeight: 900, background: '#fffbeb', color: '#d97706', padding: '3px 8px', borderRadius: '4px' }}>LOW</span>
                                  : <span style={{ fontSize: '10px', fontWeight: 900, background: '#f0fdf4', color: '#16a34a', padding: '3px 8px', borderRadius: '4px' }}>OK</span>}
                              </td>
                              <td style={{ padding: '10px 12px' }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                  <button onClick={() => setEditingItem(item)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 10px', border: '1px solid #e5e7eb', borderRadius: '5px', background: '#fff', cursor: 'pointer', fontSize: '12px', color: '#374151', fontWeight: 600 }}><Edit2 size={12} /> Edit</button>
                                  <button onClick={() => setDeleteTarget(item)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', border: '1px solid #fee2e2', borderRadius: '5px', background: '#fff', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={13} /></button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {filtered.length === 0 && (
                          <tr><td colSpan={9} style={{ padding: '60px 20px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                            <Warehouse size={40} color="#e5e7eb" style={{ margin: '0 auto 12px', display: 'block' }} />
                            {items.length === 0 ? 'No inventory items yet. Click ADD ITEM to start.' : 'No items match your filters.'}
                          </td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Edit Panel */}
              {editingItem && (
                <div className="inv-edit-panel" style={{ width: '340px', flexShrink: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', overflow: 'hidden', position: 'sticky', top: 0, maxHeight: 'calc(100vh - 128px)', overflowY: 'auto' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 900, color: '#111' }}>{editingItem.id ? 'Edit Item' : 'Add New Item'}</h3>
                    <button onClick={() => setEditingItem(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}><X size={16} /></button>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div><label style={labelStyle}>Part Name *</label><input value={editingItem.part_name || ''} onChange={e => setEditingItem({ ...editingItem, part_name: e.target.value })} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Part Number</label><input value={editingItem.part_number || ''} onChange={e => setEditingItem({ ...editingItem, part_number: e.target.value })} style={inputStyle} placeholder="e.g. CUM-3802747" /></div>
                    <div><label style={labelStyle}>Category</label><select value={editingItem.category || 'Other'} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} style={inputStyle}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div><label style={labelStyle}>Quantity</label><input type="number" min={0} value={editingItem.quantity ?? 0} onChange={e => setEditingItem({ ...editingItem, quantity: parseInt(e.target.value) || 0 })} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Min Stock</label><input type="number" min={0} value={editingItem.min_stock ?? 0} onChange={e => setEditingItem({ ...editingItem, min_stock: parseInt(e.target.value) || 0 })} style={inputStyle} /></div>
                    </div>
                    <div><label style={labelStyle}>Unit Cost ($)</label><input type="number" min={0} step="0.01" value={editingItem.unit_cost ?? 0} onChange={e => setEditingItem({ ...editingItem, unit_cost: parseFloat(e.target.value) || 0 })} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Location</label><input value={editingItem.location || ''} onChange={e => setEditingItem({ ...editingItem, location: e.target.value })} style={inputStyle} placeholder="e.g. Warehouse A, Shelf 3" /></div>
                    <div><label style={labelStyle}>Supplier</label><input value={editingItem.supplier || ''} onChange={e => setEditingItem({ ...editingItem, supplier: e.target.value })} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Condition</label><select value={editingItem.condition || 'New'} onChange={e => setEditingItem({ ...editingItem, condition: e.target.value })} style={inputStyle}>{CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div><label style={labelStyle}>Notes</label><textarea value={editingItem.notes || ''} onChange={e => setEditingItem({ ...editingItem, notes: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
                    <button onClick={handleSave} disabled={loading} style={{ width: '100%', padding: '12px', background: BRAND, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: loading ? 0.6 : 1 }}><Save size={14} /> {editingItem.id ? 'UPDATE ITEM' : 'ADD ITEM'}</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══ ALERTS VIEW ═══ */}
          {activeView === 'alerts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="inv-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                <StatCard label="Low Stock" value={String(lowStockItems.length)} sub="Below minimum level" icon={TrendingDown} accent="#f59e0b" alert={lowStockItems.length > 0} />
                <StatCard label="Out of Stock" value={String(outOfStockItems.length)} sub="Requires immediate restock" icon={AlertTriangle} accent="#dc2626" alert={outOfStockItems.length > 0} />
                <StatCard label="Healthy Stock" value={String(items.length - lowStockItems.length - outOfStockItems.length)} sub="Within acceptable range" icon={CheckCircle2} accent="#16a34a" />
              </div>

              {outOfStockItems.length > 0 && (
                <div style={{ background: '#fff', border: '1.5px solid #fecaca', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={16} color="#dc2626" /><span style={{ fontSize: '13px', fontWeight: 900, color: '#dc2626' }}>OUT OF STOCK ({outOfStockItems.length})</span></div>
                  {outOfStockItems.map(item => (
                    <div key={item.id} style={{ padding: '14px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div><p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{item.part_name}</p><p style={{ fontSize: '11px', color: '#9ca3af' }}>{item.part_number} · {item.category}</p></div>
                      <button onClick={() => setEditingItem(item)} style={{ padding: '6px 12px', background: BRAND, color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>RESTOCK</button>
                    </div>
                  ))}
                </div>
              )}

              {lowStockItems.length > 0 && (
                <div style={{ background: '#fff', border: '1.5px solid #fde68a', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', background: '#fffbeb', borderBottom: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertCircle size={16} color="#d97706" /><span style={{ fontSize: '13px', fontWeight: 900, color: '#d97706' }}>LOW STOCK ({lowStockItems.length})</span></div>
                  {lowStockItems.map(item => (
                    <div key={item.id} style={{ padding: '14px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div><p style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{item.part_name}</p><p style={{ fontSize: '11px', color: '#9ca3af' }}>{item.part_number} · {item.quantity}/{item.min_stock} units</p></div>
                      <button onClick={() => { setActiveView('inventory'); setEditingItem(item); }} style={{ padding: '6px 12px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>UPDATE</button>
                    </div>
                  ))}
                </div>
              )}

              {lowStockItems.length === 0 && outOfStockItems.length === 0 && (
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', padding: '60px', textAlign: 'center' }}>
                  <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 16px', display: 'block' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#111', marginBottom: '8px' }}>All Stock Healthy</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>No items currently below minimum stock levels.</p>
                </div>
              )}
            </div>
          )}

          {/* ═══ OVERVIEW VIEW ═══ */}
          {activeView === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="inv-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                <StatCard label="Total Items" value={String(items.length)} sub="Unique parts tracked" icon={Package} accent={BRAND} />
                <StatCard label="Total Value" value={`$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`} sub="Estimated inventory value" icon={DollarSign} accent="#16a34a" />
                <StatCard label="Categories" value={String(uniqueCategories.length)} sub="Active categories" icon={Layers} accent="#7047eb" />
                <StatCard label="Locations" value={String(new Set(items.map(i => i.location).filter(Boolean)).size)} sub="Storage locations" icon={MapPin} accent="#0891b2" />
              </div>

              {/* Category breakdown */}
              <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '2px', padding: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 900, color: '#111', marginBottom: '20px' }}>Stock by Category</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {uniqueCategories.map(cat => {
                    const catItems = items.filter(i => i.category === cat);
                    const catQty = catItems.reduce((s, i) => s + i.quantity, 0);
                    const maxQty = Math.max(...uniqueCategories.map(c => items.filter(i => i.category === c).reduce((s, i) => s + i.quantity, 0)), 1);
                    return (
                      <div key={cat}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>{cat} <span style={{ fontWeight: 400, color: '#9ca3af' }}>({catItems.length} items)</span></span>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#111' }}>{catQty} units</span>
                        </div>
                        <div style={{ height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${(catQty / maxQty) * 100}%`, background: 'linear-gradient(90deg, #155DFC, #7047eb)', borderRadius: '3px', transition: 'width .6s ease' }} />
                        </div>
                      </div>
                    );
                  })}
                  {uniqueCategories.length === 0 && <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', padding: '20px' }}>No items yet.</p>}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <Trash2 size={32} color="#dc2626" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px' }}>Delete Item?</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>"{deleteTarget.part_name}" will be permanently removed.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ padding: '10px 20px', background: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => handleDelete(deleteTarget.id)} style={{ padding: '10px 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Wipe Modal */}
      {wipeModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <AlertTriangle size={32} color="#dc2626" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px' }}>Wipe All Inventory?</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>This will permanently delete ALL inventory items. This cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setWipeModal(false)} style={{ padding: '10px 20px', background: '#f3f4f6', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleWipe} style={{ padding: '10px 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 800, cursor: 'pointer' }}>WIPE ALL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
