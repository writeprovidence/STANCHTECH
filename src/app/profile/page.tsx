"use client";

import { useState, useEffect } from 'react';
import { User, Package, MessageSquare, XCircle, LogOut, Info } from 'lucide-react';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';
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

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [email, setEmail] = useState('');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    additionalPhone: '',
    deliveryAddress: '',
    landmark: '',
    state: '',
    areaCouncil: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || '');
        setTempEmail(user.email || '');
      } else {
        router.push('/login');
      }
    };
    fetchUser();

    const saved = localStorage.getItem("stanchtech_user_address");
    if (saved) {
      setUserAddress(JSON.parse(saved));
    }
  }, [router]);

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
      firstName: userAddress?.firstName || '',
      lastName: userAddress?.lastName || '',
      phone: userAddress?.phone || '',
      additionalPhone: userAddress?.additionalPhone || '',
      deliveryAddress: userAddress?.deliveryAddress || '',
      landmark: userAddress?.landmark || '',
      state: userAddress?.state || '',
      areaCouncil: userAddress?.areaCouncil || '',
    });
  };

  const handleSaveAddress = () => {
    const newAddress = { ...addressForm, id: userAddress?.id || Date.now().toString() };
    setUserAddress(newAddress);
    localStorage.setItem("stanchtech_user_address", JSON.stringify(newAddress));
    setIsAddingAddress(false);
  };

  return (
    <div style={{ background: '#f5f5f5', marginTop: '78px' }}>
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
          padding: '48px 48px 0 48px',
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
            height: '498.75px' // Synchronized with new card totals
          }}
        >
          <div style={{ padding: '32px 32px 0 32px', marginBottom: '8px' }}> {/* Top alignment with Email label offset */}
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#111',
                textTransform: 'uppercase',
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
                  fontFamily: 'inherit',
                  transition: 'background 0.15s',
                  fontWeight: activeTab === item.id ? 600 : 400
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
                await supabase.auth.signOut();
                router.push("/shop");
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
                fontFamily: 'inherit',
                transition: 'background 0.15s',
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
            boxSizing: 'border-box'
          }}
        >
          <div style={{ maxWidth: '850px' }}>
            {activeTab === 'profile' && (
              <>
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
                      borderRadius: '0' // Sharp corners
                    }}
                  >
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      Email
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      {isEditingEmail ? (
                        <input
                          type="email"
                          value={tempEmail}
                          onChange={(e) => setTempEmail(e.target.value)}
                          style={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontSize: '15px',
                            color: '#111827',
                            fontFamily: 'inherit',
                            padding: 0,
                          }}
                          placeholder="Email Address"
                          autoFocus
                        />
                      ) : (
                        <span style={{ fontSize: '15px', color: '#111827', flex: 1 }}>{email}</span>
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
                          fontFamily: 'inherit',
                          padding: 0,
                          flexShrink: 0,
                        }}
                      >
                        {isEditingEmail ? 'save' : 'Edit Email'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div style={{ marginTop: '0' }}>
                  <div
                    className="card-base address-card"
                    style={{
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      padding: '32px 28px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      height: '356.75px',
                      boxSizing: 'border-box',
                      overflowY: 'auto',
                      borderRadius: '0' // Sharp corners
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span
                        style={{
                          fontSize: '13px',
                          color: '#6b7280',
                          fontWeight: 500,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        Addresses
                      </span>
                      {!isAddingAddress && !userAddress && (
                        <button
                          onClick={handleAddAddress}
                          style={{
                            fontSize: '14px',
                            color: '#2563eb',
                            border: 'none',
                            background: 'transparent',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            padding: 0,
                          }}
                        >
                          + Add
                        </button>
                      )}
                    </div>

                    {!isAddingAddress && userAddress && (
                      <div style={{ padding: '0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ fontSize: '15px', fontWeight: 500, color: '#111827', marginBottom: '8px' }}>
                              {userAddress.firstName} {userAddress.lastName}
                            </p>
                            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                              {userAddress.deliveryAddress}, {userAddress.state}, {userAddress.areaCouncil}
                            </p>
                            <p style={{ fontSize: '14px', color: '#6b7280' }}>
                              {userAddress.phone}
                            </p>
                          </div>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                              onClick={() => { setAddressForm(userAddress); setIsAddingAddress(true); }}
                              style={{ color: '#2563eb', fontSize: '14px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {!isAddingAddress && !userAddress && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#6b7280' }}>
                        <Info style={{ width: '20px', height: '20px' }} strokeWidth={1.5} />
                        <span style={{ fontSize: '15px' }}>No Addresses added</span>
                      </div>
                    )}

                    {isAddingAddress && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <input type="text" placeholder="first name" value={addressForm.firstName} onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })} style={inputStyle} />
                          <input type="text" placeholder="last name" value={addressForm.lastName} onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })} style={inputStyle} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <input type="tel" placeholder="Phone number" value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} style={inputStyle} />
                          <input type="tel" placeholder="additional phone number" value={addressForm.additionalPhone} onChange={(e) => setAddressForm({ ...addressForm, additionalPhone: e.target.value })} style={inputStyle} />
                        </div>
                        <input type="text" placeholder="delivery address" value={addressForm.deliveryAddress} onChange={(e) => setAddressForm({ ...addressForm, deliveryAddress: e.target.value })} style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                          <div style={{ position: 'relative' }}>
                            <select 
                              value={addressForm.state} 
                              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value, areaCouncil: '' })} 
                              style={{ ...inputStyle, appearance: 'none', paddingRight: '40px' }}
                            >
                              <option value="">State</option>
                              {Object.keys(NIGERIAN_STATES).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                          </div>
                          <div style={{ position: 'relative' }}>
                            <select 
                              value={addressForm.areaCouncil} 
                              onChange={(e) => setAddressForm({ ...addressForm, areaCouncil: e.target.value })} 
                              style={{ ...inputStyle, appearance: 'none', paddingRight: '40px' }}
                            >
                              <option value="">Area Council</option>
                              {addressForm.state && NIGERIAN_STATES[addressForm.state]?.map(lga => <option key={lga} value={lga}>{lga}</option>)}
                            </select>
                            <div style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
                          <button onClick={() => { setIsAddingAddress(false); }} style={{ padding: '10px 40px', background: '#6b7280', color: '#fff', border: 'none', borderRadius: '0', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' }}>Cancel</button>
                          <button onClick={handleSaveAddress} style={{ padding: '10px 40px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '0', cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' }}>Save</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab !== 'profile' && (
              <div style={{ color: '#6b7280', fontSize: '15px', background: '#fff', border: '1px solid #e5e7eb', padding: '48px', height: '498.75px', boxSizing: 'border-box', borderRadius: '0', overflowY: 'auto' }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content goes here
              </div>
            )}
          </div>
        </main>
      </div>

      <div style={{ height: '180px', background: '#f5f5f5' }} />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: '12px 16px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  outline: 'none',
  fontSize: '14px',
  fontFamily: 'inherit',
  color: '#111827',
  background: '#fff',
  width: '100%',
  boxSizing: 'border-box',
};
