"use client";

import { useState, useEffect } from 'react';
import { User, Package, MessageSquare, XCircle, LogOut, Info, Loader2 } from 'lucide-react';
import { useUser, useClerk } from "@clerk/nextjs";
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { NIGERIAN_STATES } from '../checkout/nigeria-data';

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  additionalPhone: string;
  deliveryAddress: string;
  landmark: string;
  state: string;
  areaCouncil: string;
}

const inputStyle: React.CSSProperties = {
  padding: '0 16px',
  border: '1px solid #d3d3d3',
  borderRadius: '5px',
  outline: 'none',
  fontSize: '15px',
  fontFamily: "var(--font-body)",
  fontWeight: 600,
  color: '#25252d',
  background: '#fff',
  width: '100%',
  height: '40px',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 800,
  color: '#374151',
  display: 'block',
  marginBottom: '4px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontFamily: "var(--font-body)"
};

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5]" />}>
      <ProfileContent />
    </Suspense>
  );
}

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [email, setEmail] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isAddingShipping, setIsAddingShipping] = useState(false);
  const [addressForm, setAddressForm] = useState({
    firstName: '', lastName: '', phone: '', additionalPhone: '',
    deliveryAddress: '', landmark: '', state: '', areaCouncil: '',
  });
  const [shippingForm, setShippingForm] = useState({
    firstName: '', lastName: '', phone: '', additionalPhone: '',
    deliveryAddress: '', landmark: '', state: '', areaCouncil: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [shippingErrors, setShippingErrors] = useState<Record<string, boolean>>({});
  const [orders, setOrders] = useState<any[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        setEmail(user.primaryEmailAddress?.emailAddress || '');
        setTempEmail(user.primaryEmailAddress?.emailAddress || '');
      } else {
        router.push('/login');
      }
    }
    
    const saved = localStorage.getItem("stanchtech_user_address");
    if (saved) setUserAddress(JSON.parse(saved));
    const savedShipping = localStorage.getItem("stanchtech_shipping_address");
    if (savedShipping) setShippingAddress(JSON.parse(savedShipping));
    
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    setHasMounted(true);
  }, [isLoaded, user, router]);

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'close-account', label: 'Close Account', icon: XCircle },
  ];

  const handleSaveEmail = () => {
    setEmail(tempEmail);
    setIsEditingEmail(false);
  };

  const handleAddAddress = () => {
    setIsAddingAddress(true);
    setAddressForm({
      firstName: userAddress?.firstName || '', lastName: userAddress?.lastName || '',
      phone: userAddress?.phone || '', additionalPhone: userAddress?.additionalPhone || '',
      deliveryAddress: userAddress?.deliveryAddress || '', landmark: userAddress?.landmark || '',
      state: userAddress?.state || '', areaCouncil: userAddress?.areaCouncil || '',
    });
  };

  const handleSaveAddress = () => {
    const errors: Record<string, boolean> = {};
    if (!addressForm.firstName) errors.firstName = true;
    if (!addressForm.lastName) errors.lastName = true;
    if (!addressForm.phone) errors.phone = true;
    if (!addressForm.deliveryAddress) errors.deliveryAddress = true;
    if (!addressForm.state) errors.state = true;
    if (!addressForm.areaCouncil) errors.areaCouncil = true;
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormErrors({});
    const newAddress = { ...addressForm, id: userAddress?.id || Date.now().toString() };
    setUserAddress(newAddress);
    localStorage.setItem("stanchtech_user_address", JSON.stringify(newAddress));
    setIsAddingAddress(false);
  };

  const handleAddShipping = () => {
    setIsAddingShipping(true);
    setShippingForm({
      firstName: shippingAddress?.firstName || '', lastName: shippingAddress?.lastName || '',
      phone: shippingAddress?.phone || '', additionalPhone: shippingAddress?.additionalPhone || '',
      deliveryAddress: shippingAddress?.deliveryAddress || '', landmark: shippingAddress?.landmark || '',
      state: shippingAddress?.state || '', areaCouncil: shippingAddress?.areaCouncil || '',
    });
  };

  const handleSaveShipping = () => {
    const errors: Record<string, boolean> = {};
    if (!shippingForm.firstName) errors.firstName = true;
    if (!shippingForm.lastName) errors.lastName = true;
    if (!shippingForm.phone) errors.phone = true;
    if (!shippingForm.deliveryAddress) errors.deliveryAddress = true;
    if (!shippingForm.state) errors.state = true;
    if (!shippingForm.areaCouncil) errors.areaCouncil = true;
    if (Object.keys(errors).length > 0) { setShippingErrors(errors); return; }
    setShippingErrors({});
    const newAddress = { ...shippingForm, id: shippingAddress?.id || Date.now().toString() };
    setShippingAddress(newAddress);
    localStorage.setItem("stanchtech_shipping_address", JSON.stringify(newAddress));
    setIsAddingShipping(false);
  };

  return (
    <div style={{ background: '#f5f5f5', marginTop: '78px', paddingBottom: '0' }}>
      <style jsx>{`
        @media (max-width: 991px) {
          .profile-wrapper {
            flex-direction: column !important;
            padding: 24px !important;
          }
          .profile-sidebar {
            width: 100% !important;
            min-width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb;
            padding: 24px !important;
            margin-bottom: 24px;
          }
          .profile-main {
            padding-left: 0 !important;
          }
          .card-base {
            height: auto !important;
            padding: 24px !important;
          }
          .address-card {
            height: auto !important;
          }
        }
      `}</style>

      <div
        className="profile-wrapper"
        style={{
          display: 'flex',
          padding: '16px 48px 16px 48px',
          maxWidth: '1400px',
          margin: '0 auto',
          gap: '0',
          alignItems: 'stretch',
        }}
      >
        <aside
          className="profile-sidebar"
          style={{
            width: '280px',
            minWidth: '280px',
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            borderRight: '1px solid #e5e7eb',
            boxSizing: 'border-box',
            minHeight: '498.75px'
          }}
        >
          <div style={{ padding: '32px 32px 0 32px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#111',
                textTransform: 'uppercase',
                fontFamily: "var(--font-body)"
              }}
            >
              My Account
            </span>
          </div>

          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '28px', padding: '24px 16px' }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '15px',
                  color: activeTab === item.id ? '#111' : '#374151',
                  background: activeTab === item.id ? '#f5f5f5' : 'transparent',
                  fontFamily: "var(--font-body)",
                  transition: 'background 0.15s',
                  fontWeight: activeTab === item.id ? 800 : 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em'
                }}
              >
                <item.icon style={{ width: '20px', height: '20px', color: activeTab === item.id ? '#111' : '#374151', flexShrink: 0 }} strokeWidth={activeTab === item.id ? 2 : 1.5} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div
            style={{
              padding: '24px 20px',
              borderTop: '1px solid #e5e7eb',
              marginTop: 'auto',
            }}
          >
            <button
              onClick={async () => {
                await signOut({ redirectUrl: "/shop" });
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '15px',
                color: '#374151',
                background: 'transparent',
                fontFamily: "var(--font-heading)",
                transition: 'background 0.15s',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.02em'
              }}
            >
              <LogOut style={{ width: '20px', height: '20px', color: '#374151' }} strokeWidth={1.5} />
              <span>LogOut</span>
            </button>
          </div>
        </aside>

        <main
          className="profile-main"
          style={{
            flex: 1,
            background: '#f5f5f5',
            paddingLeft: '32px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ maxWidth: '850px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {activeTab === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '498.75px' }}>
                {/* Email Section */}
                <div style={{ marginBottom: '32px' }}>
                  <div
                    className="card-base"
                    style={{
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      padding: '28px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      gap: '10px',
                      height: '110px',
                      boxSizing: 'border-box',
                      borderRadius: '0'
                    }}
                  >
                    <label style={{...labelStyle, fontSize: '16px'}}>Email</label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      {isEditingEmail ? (
                        <input
                          type="email"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          style={{...inputStyle, fontSize: '18px'}}
                          autoFocus
                        />
                      ) : (
                        <span style={{ fontSize: '18px', color: '#111827', flex: 1, fontFamily: "var(--font-body)", fontWeight: 600 }}>{email}</span>
                      )}
                      <button
                        onClick={() => {
                          if (isEditingEmail) {
                            handleSaveEmail();
                          } else {
                            setTempEmail(email);
                            setIsEditingEmail(true);
                          }
                        }}
                        style={{
                          color: '#2563eb',
                          fontSize: '14px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontFamily: "var(--font-heading)",
                          fontWeight: 800,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          padding: 0,
                          flexShrink: 0,
                        }}
                      >
                        {isEditingEmail ? 'save' : 'Edit Email'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Unified Addresses Section */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div
                    className="card-base address-card"
                    style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box', flex: 1, borderRadius: '0' }}
                  >
                    {/* Card Header */}
                    <span style={{ fontSize: '13px', color: '#111', fontWeight: 600, display: 'block', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb', fontFamily: "var(--font-body)", textTransform: 'uppercase', letterSpacing: '0.08em' }}>Addresses</span>

                    {/* — Customer Address — */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '16px', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "var(--font-body)" }}>Customer Address</span>
                        {!isAddingAddress && !userAddress && (
                          <button onClick={handleAddAddress} style={{ fontSize: '16px', color: '#2563eb', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, fontWeight: 700 }}>+ Add</button>
                        )}
                      </div>

                      {!isAddingAddress && userAddress && (
                        <div style={{ position: 'relative', padding: '24px' }}>
                          <span style={{ position: 'absolute', top: 0, left: 0, width: '14px', height: '14px', borderTop: '2px solid #111827', borderLeft: '2px solid #111827' }} />
                          <span style={{ position: 'absolute', top: 0, right: 0, width: '14px', height: '14px', borderTop: '2px solid #111827', borderRight: '2px solid #111827' }} />
                          <span style={{ position: 'absolute', bottom: 0, left: 0, width: '14px', height: '14px', borderBottom: '2px solid #111827', borderLeft: '2px solid #111827' }} />
                          <span style={{ position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', borderBottom: '2px solid #111827', borderRight: '2px solid #111827' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px', fontFamily: "var(--font-body)" }}>{userAddress.firstName} {userAddress.lastName}</p>
                              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '6px', lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{userAddress.deliveryAddress}, {userAddress.state}, {userAddress.areaCouncil}</p>
                              <p style={{ fontSize: '18px', color: '#6b7280', fontFamily: "var(--font-body)" }}>{userAddress.phone}</p>
                            </div>
                            <button onClick={() => { setAddressForm(userAddress); setIsAddingAddress(true); }} style={{ color: '#2563eb', fontSize: '14px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Edit</button>
                          </div>
                        </div>
                      )}
                      {!isAddingAddress && !userAddress && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af' }}>
                          <Info style={{ width: '16px', height: '16px' }} strokeWidth={1.5} />
                          <span style={{ fontSize: '14px' }}>No customer address added</span>
                        </div>
                      )}
                      {isAddingAddress && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <label style={labelStyle}>First Name <span style={{ color: 'red' }}>*</span></label>
                              <input type="text" value={addressForm.firstName} onChange={(e) => { setAddressForm({ ...addressForm, firstName: e.target.value }); setFormErrors(p => ({ ...p, firstName: false })); }} style={{ ...inputStyle, border: formErrors.firstName ? '1px solid #ef4444' : inputStyle.border }} />
                            </div>
                            <div>
                              <label style={labelStyle}>Last Name <span style={{ color: 'red' }}>*</span></label>
                              <input type="text" value={addressForm.lastName} onChange={(e) => { setAddressForm({ ...addressForm, lastName: e.target.value }); setFormErrors(p => ({ ...p, lastName: false })); }} style={{ ...inputStyle, border: formErrors.lastName ? '1px solid #ef4444' : inputStyle.border }} />
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <label style={labelStyle}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                              <input type="tel" value={addressForm.phone} onChange={(e) => { setAddressForm({ ...addressForm, phone: e.target.value }); setFormErrors(p => ({ ...p, phone: false })); }} style={{ ...inputStyle, border: formErrors.phone ? '1px solid #ef4444' : inputStyle.border }} />
                            </div>
                            <div>
                              <label style={labelStyle}>Additional Phone</label>
                              <input type="tel" value={addressForm.additionalPhone} onChange={(e) => setAddressForm({ ...addressForm, additionalPhone: e.target.value })} style={inputStyle} />
                            </div>
                          </div>
                          <div>
                            <label style={labelStyle}>Address <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={addressForm.deliveryAddress} onChange={(e) => { setAddressForm({ ...addressForm, deliveryAddress: e.target.value }); setFormErrors(p => ({ ...p, deliveryAddress: false })); }} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', border: formErrors.deliveryAddress ? '1px solid #ef4444' : inputStyle.border }} />
                          </div>
                          <div>
                            <label style={labelStyle}>Landmark</label>
                            <input type="text" value={addressForm.landmark} onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={labelStyle}>State <span style={{ color: 'red' }}>*</span></label>
                                <select 
                                  value={addressForm.state} 
                                  onChange={(e) => { 
                                    setAddressForm({ ...addressForm, state: e.target.value, areaCouncil: '' }); 
                                    setFormErrors(p => ({ ...p, state: false })); 
                                  }} 
                                  style={{ ...inputStyle, border: formErrors.state ? '1px solid #ef4444' : inputStyle.border, cursor: 'pointer' }}
                                >
                                  <option value="">Select State</option>
                                  {Object.keys(NIGERIAN_STATES).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                  ))}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Area Council <span style={{ color: 'red' }}>*</span></label>
                                <select 
                                  value={addressForm.areaCouncil} 
                                  onChange={(e) => { 
                                    setAddressForm({ ...addressForm, areaCouncil: e.target.value }); 
                                    setFormErrors(p => ({ ...p, areaCouncil: false })); 
                                  }} 
                                  style={{ ...inputStyle, border: formErrors.areaCouncil ? '1px solid #ef4444' : inputStyle.border, cursor: 'pointer' }}
                                  disabled={!addressForm.state}
                                >
                                  <option value="">Select Area Council</option>
                                  {addressForm.state && NIGERIAN_STATES[addressForm.state]?.map(lga => (
                                    <option key={lga} value={lga}>{lga}</option>
                                  ))}
                                </select>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
                            <button onClick={() => setIsAddingAddress(false)} style={{ padding: '8px 32px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>Cancel</button>
                            <button onClick={handleSaveAddress} style={{ padding: '8px 32px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>Save</button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div style={{ borderTop: '1px solid #f3f4f6' }} />

                    {/* — Shipping Address — */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '16px', color: '#9ca3af', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "var(--font-body)" }}>Shipping Address</span>
                        {!isAddingShipping && !shippingAddress && (
                          <button onClick={handleAddShipping} style={{ fontSize: '16px', color: '#2563eb', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', padding: 0, fontWeight: 700 }}>+ Add</button>
                        )}
                      </div>

                      {!isAddingShipping && shippingAddress && (
                        <div style={{ position: 'relative', padding: '24px' }}>
                          <span style={{ position: 'absolute', top: 0, left: 0, width: '14px', height: '14px', borderTop: '2px solid #111827', borderLeft: '2px solid #111827' }} />
                          <span style={{ position: 'absolute', top: 0, right: 0, width: '14px', height: '14px', borderTop: '2px solid #111827', borderRight: '2px solid #111827' }} />
                          <span style={{ position: 'absolute', bottom: 0, left: 0, width: '14px', height: '14px', borderBottom: '2px solid #111827', borderLeft: '2px solid #111827' }} />
                          <span style={{ position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', borderBottom: '2px solid #111827', borderRight: '2px solid #111827' }} />
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <p style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px', fontFamily: "var(--font-body)" }}>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                              <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '6px', lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{shippingAddress.deliveryAddress}, {shippingAddress.state}, {shippingAddress.areaCouncil}</p>
                              <p style={{ fontSize: '18px', color: '#6b7280', fontFamily: "var(--font-body)" }}>{shippingAddress.phone}</p>
                            </div>
                            <button onClick={() => { setShippingForm(shippingAddress); setIsAddingShipping(true); }} style={{ color: '#2563eb', fontSize: '14px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Edit</button>
                          </div>
                        </div>
                      )}
                      {!isAddingShipping && !shippingAddress && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af' }}>
                          <Info style={{ width: '16px', height: '16px' }} strokeWidth={1.5} />
                          <span style={{ fontSize: '14px' }}>No shipping address added</span>
                        </div>
                      )}
                      {isAddingShipping && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                             <div>
                              <label style={labelStyle}>First Name <span style={{ color: 'red' }}>*</span></label>
                              <input type="text" value={shippingForm.firstName} onChange={(e) => { setShippingForm({ ...shippingForm, firstName: e.target.value }); setShippingErrors(p => ({ ...p, firstName: false })); }} style={{ ...inputStyle, border: shippingErrors.firstName ? '1px solid #ef4444' : inputStyle.border }} />
                            </div>
                            <div>
                              <label style={labelStyle}>Last Name <span style={{ color: 'red' }}>*</span></label>
                              <input type="text" value={shippingForm.lastName} onChange={(e) => { setShippingForm({ ...shippingForm, lastName: e.target.value }); setShippingErrors(p => ({ ...p, lastName: false })); }} style={{ ...inputStyle, border: shippingErrors.lastName ? '1px solid #ef4444' : inputStyle.border }} />
                            </div>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                              <label style={labelStyle}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                              <input type="tel" value={shippingForm.phone} onChange={(e) => { setShippingForm({ ...shippingForm, phone: e.target.value }); setShippingErrors(p => ({ ...p, phone: false })); }} style={{ ...inputStyle, border: shippingErrors.phone ? '1px solid #ef4444' : inputStyle.border }} />
                            </div>
                            <div>
                              <label style={labelStyle}>Additional Phone</label>
                              <input type="tel" value={shippingForm.additionalPhone} onChange={(e) => setShippingForm({ ...shippingForm, additionalPhone: e.target.value })} style={inputStyle} />
                            </div>
                          </div>
                          <div>
                            <label style={labelStyle}>Address <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" value={shippingForm.deliveryAddress} onChange={(e) => { setShippingForm({ ...shippingForm, deliveryAddress: e.target.value }); setShippingErrors(p => ({ ...p, deliveryAddress: false })); }} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', border: shippingErrors.deliveryAddress ? '1px solid #ef4444' : inputStyle.border }} />
                          </div>
                          <div>
                            <label style={labelStyle}>Landmark</label>
                            <input type="text" value={shippingForm.landmark} onChange={(e) => setShippingForm({ ...shippingForm, landmark: e.target.value })} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div>
                                <label style={labelStyle}>State <span style={{ color: 'red' }}>*</span></label>
                                <select 
                                  value={shippingForm.state} 
                                  onChange={(e) => { 
                                    setShippingForm({ ...shippingForm, state: e.target.value, areaCouncil: '' }); 
                                    setShippingErrors(p => ({ ...p, state: false })); 
                                  }} 
                                  style={{ ...inputStyle, border: shippingErrors.state ? '1px solid #ef4444' : inputStyle.border, cursor: 'pointer' }}
                                >
                                  <option value="">Select State</option>
                                  {Object.keys(NIGERIAN_STATES).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                  ))}
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Area Council <span style={{ color: 'red' }}>*</span></label>
                                <select 
                                  value={shippingForm.areaCouncil} 
                                  onChange={(e) => { 
                                    setShippingForm({ ...shippingForm, areaCouncil: e.target.value }); 
                                    setShippingErrors(p => ({ ...p, areaCouncil: false })); 
                                  }} 
                                  style={{ ...inputStyle, border: shippingErrors.areaCouncil ? '1px solid #ef4444' : inputStyle.border, cursor: 'pointer' }}
                                  disabled={!shippingForm.state}
                                >
                                  <option value="">Select Area Council</option>
                                  {shippingForm.state && NIGERIAN_STATES[shippingForm.state]?.map(lga => (
                                    <option key={lga} value={lga}>{lga}</option>
                                  ))}
                                </select>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
                            <button onClick={() => setIsAddingShipping(false)} style={{ padding: '8px 32px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>Cancel</button>
                            <button onClick={handleSaveShipping} style={{ padding: '8px 32px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit' }}>Save</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '498.75px' }}>
                <div
                  className="card-base"
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ padding: '24px 28px 0 28px' }}>
                    <span style={{ 
                      fontSize: '13px', 
                      color: '#6b7280', 
                      fontWeight: 500,
                      display: 'block',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Recent Purchases
                    </span>
                  </div>

                  <div style={{ padding: '28px', flex: 1, overflowY: 'auto' }}>
                    {(() => {
                      if (!hasMounted) return <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader2 className="animate-spin" /></div>;
                      
                      if (orders.length === 0) {
                        return (
                          <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                            <Package style={{ width: '48px', height: '48px', color: '#d1d5db' }} strokeWidth={1.5} />
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>No orders yet</p>
                              <p style={{ fontSize: '14px', color: '#6b7280' }}>You haven't placed any orders with us yet.</p>
                            </div>
                            <button onClick={() => router.push('/shop')} style={{ padding: '10px 24px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', borderRadius: '4px' }}>
                              Start Shopping
                            </button>
                          </div>
                        );
                      }
                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          {orders.map((order: any, idx: number) => (
                            <div key={idx} style={{ padding: '20px', border: '1px solid #f3f4f6', background: '#f9fafb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ width: '60px', height: '60px', background: '#fff', border: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                                  <img src={order.items[0]?.image} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <div>
                                  <p style={{ fontSize: '14px', fontWeight: 800, color: '#111827', marginBottom: '4px', fontFamily: "var(--font-body)" }}>Order {order.id}</p>
                                  <p style={{ fontSize: '13px', color: '#6b7280' }}>
                                    {new Date(order.date).toLocaleDateString()} • {order.items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0)} {order.items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0) === 1 ? 'item' : 'items'}
                                  </p>
                                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <span style={{ fontSize: '11px', background: '#e5e7eb', padding: '2px 8px', borderRadius: '4px', color: '#4b5563', textTransform: 'uppercase', fontWeight: 600 }}>{order.status}</span>
                                    <span style={{ fontSize: '11px', background: '#eff6ff', padding: '2px 8px', borderRadius: '4px', color: '#2563eb', fontWeight: 600 }}>
                                      {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Direct Bank Transfer'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '16px', fontWeight: 800, color: '#111827', marginBottom: '8px', fontFamily: "var(--font-body)" }}>₦ {order.total.toLocaleString()}</p>
                                <button style={{ color: '#2563eb', fontSize: '13px', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}>View Details</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '498.75px' }}>
                <div
                  className="card-base"
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ padding: '24px 28px 0 28px' }}>
                    <span style={{ 
                      fontSize: '13px', 
                      color: '#6b7280', 
                      fontWeight: 500,
                      display: 'block',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      My Reviews
                    </span>
                  </div>
                  <div style={{ padding: '48px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                    <MessageSquare style={{ width: '48px', height: '48px', color: '#d1d5db' }} strokeWidth={1.5} />
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '16px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>No reviews yet</p>
                      <p style={{ fontSize: '14px', color: '#6b7280' }}>You haven't reviewed any products yet.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'close-account' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: '498.75px' }}>
                <div
                  className="card-base"
                  style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ padding: '24px 28px 0 28px' }}>
                    <span style={{ 
                      fontSize: '13px', 
                      color: '#6b7280', 
                      fontWeight: 500,
                      display: 'block',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      Close Account
                    </span>
                  </div>
                  <div style={{ padding: '48px', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <XCircle style={{ width: '24px', height: '24px', color: '#ef4444' }} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>Are you sure you want to close your account?</h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>Closing your account is permanent and will delete all your data, including order history and saved addresses. This action cannot be undone.</p>
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: 'auto' }}>
                      <button 
                        onClick={() => setActiveTab('profile')}
                        style={{ padding: '10px 20px', border: '1px solid #d1d5db', background: '#fff', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}
                      >
                        Keep Account
                      </button>
                      <button 
                        onClick={() => setShowDeleteModal(true)}
                        style={{ padding: '10px 20px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}
                      >
                        Close My Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '24px'
        }}>
          <div style={{
            background: '#fff',
            maxWidth: '500px',
            width: '100%',
            padding: '40px',
            border: '1px solid #111',
            boxShadow: '24px 24px 0 rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <XCircle style={{ width: '24px', height: '24px', color: '#ef4444' }} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111', fontFamily: "var(--font-heading)", textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                  Confirm Deletion
                </h3>
              </div>
              
              <div style={{ height: '1px', background: '#e5e7eb' }} />
              
              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.6', fontFamily: 'inherit' }}>
                This is your final confirmation. By clicking "Permanently Delete," you acknowledge that all your account data, order history, and saved preferences will be <span style={{ color: '#ef4444', fontWeight: 700 }}>erased forever</span>.
              </p>

              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: '#fff',
                    border: '1px solid #000',
                    color: '#000',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={async () => {
                    setIsDeleting(true);
                    localStorage.removeItem("stanchtech_user_address");
                    localStorage.removeItem('orders');
                    await signOut({ redirectUrl: "/shop" });
                  }}
                  disabled={isDeleting}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: '#ef4444',
                    border: '1px solid #ef4444',
                    color: '#fff',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '13px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    opacity: isDeleting ? 0.7 : 1
                  }}
                >
                  {isDeleting ? "Deleting..." : "Permanently Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: '180px', background: '#f5f5f5' }} />
    </div>
  );
}
