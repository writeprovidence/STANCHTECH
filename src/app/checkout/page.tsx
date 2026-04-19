'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Copy, Loader2, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from "@/context/cart-context";
import { supabase } from "@/lib/supabase";
import { svgPaths } from './svg-paths';
import { NIGERIAN_STATES } from './nigeria-data';

interface CheckoutFormData {
  email: string;
  billingFirstName: string;
  billingLastName: string;
  billingPhone: string;
  billingAdditionalPhone: string;
  billingAddress: string;
  billingLandmark: string;
  billingState: string;
  billingCity: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingPhone: string;
  shippingAdditionalPhone: string;
  shippingAddress: string;
  shippingLandmark: string;
  shippingState: string;
  shippingCity: string;
  agreeToTerms: boolean;
  emailSignup: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart, setIsCartOpen } = useCart();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, setValue, watch, reset } = useForm<CheckoutFormData>({
    defaultValues: {
      email: '',
      billingFirstName: '',
      billingLastName: '',
      billingPhone: '',
      billingAdditionalPhone: '',
      billingAddress: '',
      billingLandmark: '',
      billingState: '',
      billingCity: '',
      shippingFirstName: '',
      shippingLastName: '',
      shippingPhone: '',
      shippingAdditionalPhone: '',
      shippingAddress: '',
      shippingLandmark: '',
      shippingState: '',
      shippingCity: '',
      agreeToTerms: false,
      emailSignup: false,
    }
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'opay'>('cod');
  const [bankExpanded, setBankExpanded] = useState(false);
  const [opayExpanded, setOpayExpanded] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'store'>('home');
  const [promoExpanded, setPromoExpanded] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);



  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuth(!!user);

      const savedProfileStr = localStorage.getItem("stanchtech_checkout_profile");
      if (savedProfileStr) {
        try {
          const savedProfile = JSON.parse(savedProfileStr);
          reset({ ...savedProfile, email: user?.email || savedProfile.email || "", agreeToTerms: false });
        } catch (e) {
          if (user) setValue('email', user.email || "");
        }
      } else {
        if (user) setValue('email', user.email || "");
      }
    };
    checkUser();
  }, [router, setValue, reset]);

  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) {
      const bFields = watch();
      setValue('shippingFirstName', bFields.billingFirstName);
      setValue('shippingLastName', bFields.billingLastName);
      setValue('shippingPhone', bFields.billingPhone);
      setValue('shippingAdditionalPhone', bFields.billingAdditionalPhone);
      setValue('shippingAddress', bFields.billingAddress);
      setValue('shippingLandmark', bFields.billingLandmark);
      setValue('shippingState', bFields.billingState);
      setValue('shippingCity', bFields.billingCity);
    }
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('9021080395');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const shareViaWhatsApp = () => {
    window.open('https://wa.me/2348037340959', '_blank');
  };

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    if (cartItems.length === 0) return;
    if (!data.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    if (!isAuth) {
      localStorage.setItem("stanchtech_checkout_profile", JSON.stringify(data));
      router.push("/login?next=/checkout");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Success logic: save the order to localStorage for the orders page
    const newOrder = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      status: "Processing",
      total: cartTotal,
      items: cartItems,
      billing: data,
      paymentMethod,
      deliveryMethod
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));
    localStorage.setItem("stanchtech_checkout_profile", JSON.stringify(data));

    clearCart();
    setIsSubmitting(false);
    router.push("/profile/orders");
  };
  const formValues = watch();
  const isFormValid = !!(
    formValues.email &&
    formValues.billingFirstName &&
    formValues.billingLastName &&
    formValues.billingPhone &&
    formValues.billingAddress &&
    formValues.billingState &&
    formValues.billingCity &&
    (sameAsBilling || (
      formValues.shippingFirstName &&
      formValues.shippingLastName &&
      formValues.shippingPhone &&
      formValues.shippingAddress &&
      formValues.shippingState &&
      formValues.shippingCity
    )) &&
    formValues.agreeToTerms
  );

  if (isAuth === null) {
      return (
        <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-black" />
        </div>
      );
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif', paddingLeft: '20px', paddingRight: '20px' }}>
      <style jsx global>{`
        nav, footer { display: none !important; }
        input[type="text"], input[type="email"], input[type="tel"] {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        select {
          padding-left: 20px !important;
          padding-right: 40px !important;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2325252d%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
        }
      `}</style>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[1100px] mx-auto" style={{ paddingTop: '40px', paddingBottom: '100px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(auto,459px)_380px] lg:gap-[160px] gap-12">
          {/* Left Column */}
          <div className="flex flex-col w-full">
            <h1 className="text-[24px] font-semibold text-black" style={{ marginBottom: '56px' }}>Checkout</h1>
            
            {!isAuth && (
              <>
                <div className="bg-[#fff5ea] border border-[#ffe4c7] rounded-[3px] flex items-center justify-start mb-[32px] w-full lg:w-[459px] h-[32px] box-border" style={{ paddingLeft: '32px' }}>
                  <p className="text-[12px] text-[#25252d]">
                    Already have an account?{' '}
                    <button type="button" className="text-[#7047eb] hover:underline" onClick={() => router.push('/login?next=/checkout')}>
                      Log in
                    </button>{' '}
                    for faster checkout
                  </p>
                </div>

                <p className="text-center text-[#484243] text-[14px]" style={{ marginBottom: '20px' }}>OR</p>
              </>
            )}

            {/* Customer Email */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[16px] text-black">Customer email address</h2>
                <button type="button" className="text-[#016fd0] text-[12px] hover:underline" onClick={() => router.push('/profile')}>
                  edit details &gt;
                </button>
              </div>
              <div style={{ width: '100%' }}>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="email for order confirmation"
                  style={{ width: '100%' }}
                  className="border rounded-[3px] px-4 h-[33px] text-[13.31px] text-[#25252d] placeholder:text-[#828282] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                />
              </div>
            </div>

            {/* Customer Address */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[16px] text-black">Customer address</h2>
                <button type="button" className="text-[#016fd0] text-[12px] hover:underline" onClick={() => router.push('/profile')}>
                  edit details &gt;
                </button>
              </div>
              <div style={{ width: '100%' }}>
                <input
                  {...register('billingFirstName')}
                  type="text"
                  placeholder="first name"
                  className="border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                  style={{ width: '100%', marginBottom: '16px' }}
                />
                <input
                  {...register('billingLastName')}
                  type="text"
                  placeholder="last name"
                  className="border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                  style={{ width: '100%', marginBottom: '16px' }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                  <input
                    {...register('billingPhone')}
                    type="tel"
                    placeholder="phone number"
                    className="border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                  />
                  <input
                    {...register('billingAdditionalPhone')}
                    type="tel"
                    placeholder="additional phone number"
                    className="border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                  />
                </div>
                <input
                    {...register('billingAddress')}
                    type="text"
                    placeholder="delivery address"
                    className="border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                    style={{ width: '100%', marginBottom: '16px' }}
                />
                <input
                    {...register('billingLandmark')}
                    type="text"
                    placeholder="landmark"
                    className="border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                    style={{ width: '100%', marginBottom: '16px' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <select
                        {...register('billingState')}
                        className="border rounded-[3px] px-4 h-[33px] text-[13.31px] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                    >
                        <option value="" disabled>State</option>
                        {Object.keys(NIGERIAN_STATES).map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <select
                        {...register('billingCity')}
                        className="border rounded-[3px] px-4 h-[33px] text-[13.31px] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                    >
                        <option value="" disabled>Local council</option>
                        {watch('billingState') && NIGERIAN_STATES[watch('billingState')] ? (
                            NIGERIAN_STATES[watch('billingState')].map(lga => (
                                <option key={lga} value={lga}>{lga}</option>
                            ))
                        ) : null}
                    </select>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[16px] text-black">Shipping address</h2>
                {!sameAsBilling && (
                  <button type="button" className="text-[#016fd0] text-[12px] hover:underline" onClick={() => router.push('/profile')}>
                    edit details &gt;
                  </button>
                )}
              </div>
              <label className="flex items-center cursor-pointer" style={{ gap: '12px', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={(e) => handleSameAsBillingChange(e.target.checked)}
                  className="w-[16px] h-[15px] border border-[#d3d3d3] rounded-[3px] accent-[#7047eb]"
                />
                <span className="text-[12px] text-[#25252d]">Same as customer address</span>
              </label>
              <div style={{ width: '100%' }}>
                <input
                  {...register('shippingFirstName')}
                  type="text"
                  readOnly={sameAsBilling}
                  placeholder="first name"
                  className={`border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none ${
                      sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                  }`}
                  style={{ width: '100%', marginBottom: '16px' }}
                />
                <input
                  {...register('shippingLastName')}
                  type="text"
                  readOnly={sameAsBilling}
                  placeholder="last name"
                  className={`border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none ${
                      sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                  }`}
                  style={{ width: '100%', marginBottom: '16px' }}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                  <input
                    {...register('shippingPhone')}
                    type="tel"
                    readOnly={sameAsBilling}
                    placeholder="phone number"
                    className={`border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none ${
                        sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                    }`}
                  />
                  <input
                    {...register('shippingAdditionalPhone')}
                    type="tel"
                    readOnly={sameAsBilling}
                    placeholder="additional phone number"
                    className={`border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none ${
                        sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                    }`}
                  />
                </div>

                <input
                    {...register('shippingAddress')}
                    type="text"
                    readOnly={sameAsBilling}
                    placeholder="delivery address"
                    className={`w-full border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none ${
                        sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                    }`}
                    style={{ marginBottom: '16px' }}
                />
                
                <input
                    {...register('shippingLandmark')}
                    type="text"
                    readOnly={sameAsBilling}
                    placeholder="landmark"
                    className={`w-full border rounded-[3px] px-4 h-[33px] text-[13.31px] placeholder:text-[#828282] focus:outline-none ${
                        sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                    }`}
                    style={{ marginBottom: '16px' }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <select
                        {...register('shippingState')}
                        disabled={sameAsBilling}
                        className={`border rounded-[3px] px-4 h-[33px] text-[13.31px] focus:outline-none ${
                            sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                        }`}
                    >
                        <option value="" disabled>State</option>
                        {Object.keys(NIGERIAN_STATES).map(state => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                    <select
                        {...register('shippingCity')}
                        disabled={sameAsBilling}
                        className={`border rounded-[3px] px-4 h-[33px] text-[13.31px] focus:outline-none ${
                            sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                        }`}
                    >
                        <option value="" disabled>Local council</option>
                        {watch('shippingState') && NIGERIAN_STATES[watch('shippingState')] ? (
                            NIGERIAN_STATES[watch('shippingState')].map(lga => (
                                <option key={lga} value={lga}>{lga}</option>
                            ))
                        ) : null}
                    </select>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[16px] text-black">Delivery options</h2>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('home')}
                  className={`relative border rounded-[3px] text-left transition-all ${
                    deliveryMethod === 'home'
                      ? 'border-[#7047eb] bg-white'
                      : 'border-[#bdbdbd] bg-[#f9f9f9]'
                  }`}
                  style={{ width: '187px', height: '75px', paddingLeft: '16px', paddingTop: '16px', boxSizing: 'border-box' }}
                >
                  <div className="font-medium text-[14px] text-[#25252d] mb-1">Home delivery</div>
                  <div className="text-[12px] text-[#828282]">Takes 3-5 business days</div>
                  {deliveryMethod === 'home' && (
                    <div className="absolute right-3 top-3 w-5 h-5">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p29f09f80} stroke="#6FCF97" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path d={svgPaths.p128f0cc0} stroke="#6FCF97" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(3.75, 5)" />
                      </svg>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('store')}
                  className={`relative border rounded-[3px] text-left transition-all ${
                    deliveryMethod === 'store'
                      ? 'border-[#7047eb] bg-white'
                      : 'border-[#bdbdbd] bg-[#f9f9f9]'
                  }`}
                  style={{ width: '187px', height: '75px', paddingLeft: '16px', paddingTop: '16px', boxSizing: 'border-box' }}
                >
                  <div className="font-medium text-[14px] text-[#25252d] mb-1">In-store pickup</div>
                  <div className="text-[12px] text-[#828282]">Pick from store location</div>
                  {deliveryMethod === 'store' && (
                    <div className="absolute right-3 top-3 w-5 h-5">
                      <svg className="w-full h-full" fill="none" viewBox="0 0 20 20">
                        <path d={svgPaths.p29f09f80} stroke="#6FCF97" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        <path d={svgPaths.p128f0cc0} stroke="#6FCF97" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" transform="translate(3.75, 5)" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
              {deliveryMethod === 'store' && (
                <a 
                  href="/contact#address" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center border border-[#d3d3d3] rounded-[3px] bg-white cursor-pointer hover:border-[#7047eb] transition-colors"
                  style={{ width: '100%', maxWidth: '459px', height: '44px', marginTop: '32px', paddingLeft: '20px', paddingRight: '20px', boxSizing: 'border-box' }}
                >
                  <span className="text-[#828282] text-[11px] flex-1 tracking-wide">Locate StanchTech</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#828282" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="12" y1="2" x2="12" y2="4" />
                    <line x1="12" y1="20" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="4" y2="12" />
                    <line x1="20" y1="12" x2="22" y2="12" />
                  </svg>
                </a>
              )}
            </div>

          </div>


          {/* Right Column - Order Summary */}
          <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '32px' }}>
              <h2 className="text-[16px] text-[#25252d]">Order Summary({cartItems.length})</h2>
              <div className="flex items-center gap-3">
                <button type="button" className="text-[#016fd0] text-[12px] hover:underline" onClick={() => setIsCartOpen(true)}>
                  edit cart
                </button>
                <span className="text-[#d3d3d3] text-[12px]">|</span>
                <button type="button" className="text-[#016fd0] text-[12px] hover:underline" onClick={() => router.push('/shop')}>
                  continue shopping
                </button>
              </div>
            </div>

            {/* Products List */}
            <div className="max-h-[400px] overflow-y-auto pr-2" style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '32px' }}>
              {cartItems.map((item) => (
                <div key={item.id} className="flex" style={{ gap: '16px' }}>
                  <div className="w-[66px] h-[93px] overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={item.image || "/asset/checkout/705687d37a1bd0160f34e53cdcb38e492d45e74c.png"} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start" style={{ marginBottom: '8px' }}>
                      <p className="text-[12px] text-[#19191d]">
                        {item.name}
                        {(item as any).stock === 0 && <span className="text-red-500 font-bold ml-2 text-[10px] whitespace-nowrap">(Out of stock)</span>}
                      </p>
                      <p className="text-[12px] text-black whitespace-nowrap ml-2">₦ {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <p className="text-[12px] text-black">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setPromoExpanded(!promoExpanded)}
                className="text-[#016fd0] text-[12px] hover:underline"
                style={{ marginBottom: '16px' }}
              >
                + Enter a promo code
              </button>
              {promoExpanded && (
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full border border-[#d3d3d3] rounded-[3px] px-3 h-[33px] text-[12px] focus:outline-none focus:border-[#7047eb]"
                />
              )}
            </div>

            {/* Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div className="flex justify-between text-[12px]">
                <span className="text-black">Subtotal</span>
                <span className="text-black">₦ {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-black">Shipping</span>
                 <span className="text-black font-semibold">₦ 0.00</span>
              </div>
            </div>

              <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px', marginBottom: '48px' }}>
                <div className="flex justify-between text-[12px] font-medium">
                  <span className="text-black">Total</span>
                  <span className="text-black">₦ {cartTotal.toLocaleString()}</span>
                </div>
              </div>

            {/* Payment Options */}
            <div style={{ marginBottom: '32px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h2 className="text-[16px] text-black">Payment options</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="flex items-start gap-3 cursor-pointer" onClick={() => { setPaymentMethod('cod'); setBankExpanded(false); }}>
                   <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    readOnly
                    className="mt-0.5 w-4 h-4 accent-[#7047eb] pointer-events-none"
                  />
                  <div>
                    <div className="text-[14px] text-black mb-1">Cash On Delivery</div>
                    <div className="text-[12px] text-[#828282]">Pay with cash upon delivery.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 cursor-pointer" onClick={() => {
                  if (paymentMethod !== 'bank') {
                    setPaymentMethod('bank');
                    setBankExpanded(true);
                  } else {
                    setBankExpanded(!bankExpanded);
                  }
                }}>
                   <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank'}
                    readOnly
                    className="mt-0.5 w-4 h-4 accent-[#7047eb] pointer-events-none"
                  />
                  <div className="flex-1">
                    <div className="text-[14px] text-black" style={{ marginBottom: '4px' }}>Direct bank transfer</div>
                    <div className="text-[12px] text-[#828282]" style={{ marginBottom: '12px' }}>Make payment directly through bank account.</div>
                    
                    {paymentMethod === 'bank' && bankExpanded && (
                      <div className="mt-4 bg-[#f9f9f9] rounded-[3px] border border-[#e0e0e0] cursor-default pointer-events-auto" style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-[10px] text-[#828282] mb-1">Bank Account</div>
                            <div className="text-[14px] text-black font-medium">9021080395</div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); copyAccountNumber(); }}
                            className="flex items-center justify-center gap-1.5 bg-white border border-[#d3d3d3] rounded-[4px] px-6 py-2.5 text-[10px] text-[#828282] hover:bg-gray-50 transition-colors cursor-pointer"
                            style={{ minWidth: '80px' }}
                          >
                            <Copy className="w-3 h-3" />
                            {copiedAccount ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        
                        <div>
                          <div className="text-[10px] text-[#828282] mb-1">Bank Name</div>
                          <div className="text-[14px] text-black">Zenith Bank</div>
                        </div>
                        
                        <div>
                          <div className="text-[10px] text-[#828282] mb-1">Recipient Name</div>
                          <div className="text-[14px] text-black">STANCHTECH LTD</div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); shareViaWhatsApp(); }}
                          className="w-full bg-[#25D366] text-white rounded-[6px] h-[44px] text-[12px] font-medium hover:bg-[#1fbd5a] transition-colors flex justify-center items-center gap-2 mt-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 13.96 2.56 15.78 3.53 17.31L2.24 21.05C2.12 21.4 2.45 21.73 2.8 21.61L6.61 20.37C8.16 21.4 10.01 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.15 15.34C16.92 15.98 16.03 16.5 15.46 16.59C14.98 16.66 14.33 16.74 12.08 15.8C9.21 14.59 7.35 11.66 7.21 11.47C7.07 11.28 6.05 9.93 6.05 8.52C6.05 7.11 6.77 6.42 7.05 6.13C7.28 5.89 7.66 5.8 8.01 5.8C8.12 5.8 8.22 5.8 8.31 5.85C8.61 6.02 9.08 7.15 9.14 7.29C9.2 7.42 9.27 7.58 9.18 7.74C9.09 7.9 9.01 7.98 8.87 8.14C8.73 8.3 8.6 8.44 8.45 8.62C8.29 8.82 8.12 9.03 8.32 9.38C8.51 9.73 9.18 10.82 10.17 11.69C11.45 12.82 12.47 13.18 12.86 13.34C13.24 13.5 13.68 13.47 13.94 13.19C14.28 12.82 14.68 12.24 15.09 11.66C15.38 11.25 15.75 11.33 16.1 11.46C16.45 11.59 18.25 12.48 18.6 12.65C18.95 12.83 19.18 12.92 19.27 13.07C19.36 13.22 19.36 13.96 19.04 14.86L17.15 15.34Z" />
                          </svg>
                          Share Payment Receipt via WhatsApp
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* OPay — Coming Soon */}
                <div className="flex items-start gap-3 cursor-not-allowed opacity-50 select-none">
                  <input
                    type="radio"
                    name="payment"
                    disabled
                    className="mt-0.5 w-4 h-4 pointer-events-none"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2" style={{ marginBottom: '4px' }}>
                      {/* OPay wordmark */}
                      <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '46px', height: '16px' }}>
                        <text x="0" y="16" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="17" fill="#9ca3af">O</text>
                        <text x="13" y="16" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="17" fill="#9ca3af">Pay</text>
                      </svg>
                      <span className="bg-[#f3f4f6] text-[#9ca3af] text-[9px] font-bold px-1.5 py-0.5 rounded-[3px] tracking-wide border border-[#e5e7eb]">COMING SOON</span>
                    </div>
                    <div className="text-[12px] text-[#b0b0b0]">OPay payments — wallet, bank card & transfer — launching soon.</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Review & Place Order */}
            <div style={{ marginBottom: '24px' }}>
              <h2 className="text-[16px] text-black" style={{ marginBottom: '16px' }}>Review & Place Order</h2>
              <p className="text-[14px] text-[#645a5c]" style={{ marginBottom: '24px' }}>
                Please review the order details and payment details before proceeding to confirm your order
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('agreeToTerms')}
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 border border-[#d3d3d3] rounded-[3px] accent-[#7047eb]"
                  />
                  <span className="text-[12px] text-[#25252d]">
                    I agree to the{' '}
                    <button type="button" className="text-[#7047eb] hover:underline">Terms & conditions</button>
                    ,{' '}
                    <button type="button" className="text-[#7047eb] hover:underline">Privacy policy</button>
                    {' '}&{' '}
                    <button type="button" className="text-[#7047eb] hover:underline">Return policy</button>
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('emailSignup')}
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 border border-[#d3d3d3] rounded-[3px] accent-[#7047eb]"
                  />
                  <span className="text-[12px] text-[#25252d]">Sign me up to the email list</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0 || !isFormValid}
                className="bg-black text-white rounded-[12px] text-[13px] font-semibold hover:bg-black/90 transition-all disabled:bg-[#f2f2f2] disabled:text-[#bdbdbd] disabled:cursor-not-allowed shadow-sm w-full h-[40px] flex justify-center items-center"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Place Order"}
              </button>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
