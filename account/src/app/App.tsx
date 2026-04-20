import { useState } from 'react';
import { User, Package, MessageSquare, XCircle, LogOut, Info } from 'lucide-react';

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

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [email, setEmail] = useState('writeprovidence@gmail.com');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
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
    setEditingAddressId(null);
    setAddressForm({
      firstName: '',
      lastName: '',
      phone: '',
      additionalPhone: '',
      deliveryAddress: '',
      landmark: '',
      state: '',
      areaCouncil: '',
    });
  };

  const handleSaveAddress = () => {
    if (editingAddressId) {
      setAddresses(addresses.map(addr =>
        addr.id === editingAddressId ? { ...addressForm, id: addr.id } : addr
      ));
    } else {
      const newAddress = { ...addressForm, id: Date.now().toString() };
      setAddresses([...addresses, newAddress]);
    }
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setAddressForm({
      firstName: '',
      lastName: '',
      phone: '',
      additionalPhone: '',
      deliveryAddress: '',
      landmark: '',
      state: '',
      areaCouncil: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-[280px] bg-white p-8 flex flex-col">
          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  activeTab === item.id
                    ? 'bg-[#f5f5f5]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                <span className="text-[15px] text-gray-700">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-200 mt-auto">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <LogOut className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              <span className="text-[15px] text-gray-700">LogOut</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#f5f5f5] p-12">
          <div className="max-w-[850px]">
            {activeTab === 'profile' && (
              <>
                {/* Email Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[15px] text-gray-600">Email</h2>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[15px] text-gray-900">{email}</span>
                      <button
                        onClick={() => {
                          setTempEmail(email);
                          setIsEditingEmail(!isEditingEmail);
                        }}
                        className="text-blue-600 text-[14px] hover:underline"
                      >
                        {isEditingEmail ? 'save' : 'Edit Address'}
                      </button>
                    </div>
                    {isEditingEmail && (
                      <input
                        type="email"
                        value={tempEmail}
                        onChange={(e) => setTempEmail(e.target.value)}
                        onBlur={handleSaveEmail}
                        className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-gray-400 bg-transparent text-[15px] mt-2"
                        placeholder="Email Address"
                        autoFocus
                      />
                    )}
                  </div>
                </div>

                {/* Addresses Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-[15px] text-gray-600">Addresses</h2>
                    {!isAddingAddress && (
                      <button
                        onClick={handleAddAddress}
                        className="text-[14px] text-gray-700"
                      >
                        + Add
                      </button>
                    )}
                  </div>

                  {/* Empty State */}
                  {!isAddingAddress && addresses.length === 0 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-3">
                      <Info className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                      <span className="text-[15px] text-gray-600">No Addresses added</span>
                    </div>
                  )}

                  {/* Address Form */}
                  {isAddingAddress && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="first name"
                          value={addressForm.firstName}
                          onChange={(e) => setAddressForm({ ...addressForm, firstName: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 text-[14px]"
                        />
                        <input
                          type="text"
                          placeholder="last name"
                          value={addressForm.lastName}
                          onChange={(e) => setAddressForm({ ...addressForm, lastName: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 text-[14px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={addressForm.phone}
                          onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 text-[14px]"
                        />
                        <input
                          type="tel"
                          placeholder="additional phone number"
                          value={addressForm.additionalPhone}
                          onChange={(e) => setAddressForm({ ...addressForm, additionalPhone: e.target.value })}
                          className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 text-[14px]"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="delivery address"
                        value={addressForm.deliveryAddress}
                        onChange={(e) => setAddressForm({ ...addressForm, deliveryAddress: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 text-[14px]"
                      />

                      <input
                        type="text"
                        placeholder="landmark"
                        value={addressForm.landmark}
                        onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder:text-gray-400 text-[14px]"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <select
                            value={addressForm.state}
                            onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-400 text-[14px] appearance-none bg-white"
                          >
                            <option value="">State</option>
                            <option value="Rivers">Rivers</option>
                            <option value="Lagos">Lagos</option>
                            <option value="Abuja">Abuja</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select
                            value={addressForm.areaCouncil}
                            onChange={(e) => setAddressForm({ ...addressForm, areaCouncil: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-gray-400 text-[14px] appearance-none bg-white"
                          >
                            <option value="">Area Coucil</option>
                            <option value="PORTHARCOURT-WOJI YKC">PORTHARCOURT-WOJI YKC</option>
                            <option value="Ikeja">Ikeja</option>
                            <option value="Victoria Island">Victoria Island</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={handleSaveAddress}
                          className="px-10 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-[15px]"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="text-gray-600">Orders content goes here</div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-gray-600">Reviews content goes here</div>
            )}

            {activeTab === 'close-account' && (
              <div className="text-gray-600">Close Account content goes here</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
