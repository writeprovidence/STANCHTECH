'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Copy, Loader2, Check, ArrowLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCart } from "@/context/cart-context";
import { useUser } from "@clerk/nextjs";
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
  const { cartItems, cartCount, cartTotal, clearCart, setIsCartOpen } = useCart();
  const { isLoaded, isSignedIn, user } = useUser();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfileAddress, setHasProfileAddress] = useState(false);

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

  const watchBillingState = watch('billingState');
  const watchShippingState = watch('shippingState');

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'opay' | 'cod'>('bank');
  const [bankExpanded, setBankExpanded] = useState(false);
  const [opayExpanded, setOpayExpanded] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'store'>('home');
  const [promoExpanded, setPromoExpanded] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    
    setIsAuth(isSignedIn);

    const savedUserAddressStr = localStorage.getItem("stanchtech_user_address");
    const savedShippingAddressStr = localStorage.getItem("stanchtech_shipping_address");
    const savedProfileStr = localStorage.getItem("stanchtech_checkout_profile");
    
    let baseData = {};
    if (savedProfileStr) {
      try {
        baseData = JSON.parse(savedProfileStr);
      } catch (e) {}
    }

    const initialData: any = {
      ...baseData,
      email: user?.primaryEmailAddress?.emailAddress || (baseData as any).email || "",
      agreeToTerms: (baseData as any).agreeToTerms || false,
    };

    if (savedUserAddressStr) {
      setHasProfileAddress(true);
      try {
        const addr = JSON.parse(savedUserAddressStr);
        initialData.billingFirstName = addr.firstName;
        initialData.billingLastName = addr.lastName;
        initialData.billingPhone = addr.phone;
        initialData.billingAdditionalPhone = addr.additionalPhone;
        initialData.billingAddress = addr.deliveryAddress;
        initialData.billingLandmark = addr.landmark;
        initialData.billingState = addr.state;
        initialData.billingCity = addr.areaCouncil;
      } catch (e) {}
    } else {
      setHasProfileAddress(false);
    }

    if (savedShippingAddressStr) {
      try {
        const shipAddr = JSON.parse(savedShippingAddressStr);
        initialData.shippingFirstName = shipAddr.firstName;
        initialData.shippingLastName = shipAddr.lastName;
        initialData.shippingPhone = shipAddr.phone;
        initialData.shippingAdditionalPhone = shipAddr.additionalPhone;
        initialData.shippingAddress = shipAddr.deliveryAddress;
        initialData.shippingLandmark = shipAddr.landmark;
        initialData.shippingState = shipAddr.state;
        initialData.shippingCity = shipAddr.areaCouncil;
      } catch (e) {}
    }

    reset(initialData);
  }, [isLoaded, isSignedIn, user, reset]);

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
    navigator.clipboard.writeText('1046944476');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const shareViaWhatsApp = () => {
    window.open('https://wa.me/2348037340959', '_blank');
  };

  const onSubmit: SubmitHandler<CheckoutFormData> = async (data) => {
    if (cartItems.length === 0) return;

    // Required field validation (additional phone is optional)
    if (!data.email) { alert("Email is required."); return; }
    if (!data.billingFirstName) { alert("First name is required."); return; }
    if (!data.billingLastName) { alert("Last name is required."); return; }
    if (!data.billingPhone) { alert("Phone number is required."); return; }
    if (!data.billingAddress) { alert("Delivery address is required."); return; }
    if (!data.billingState) { alert("State is required."); return; }
    if (!data.billingCity) { alert("Area Council is required."); return; }
    if (!data.agreeToTerms) { alert("Please agree to the terms and conditions"); return; }

    if (!isAuth) {
      localStorage.setItem("stanchtech_checkout_profile", JSON.stringify(data));
      router.push("/login?next=/checkout");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Sync billing address back to profile (one address limit)
    const profileAddress = {
      firstName: data.billingFirstName,
      lastName: data.billingLastName,
      phone: data.billingPhone,
      additionalPhone: data.billingAdditionalPhone,
      deliveryAddress: data.billingAddress,
      landmark: data.billingLandmark,
      state: data.billingState,
      areaCouncil: data.billingCity,
      id: Date.now().toString()
    };
    localStorage.setItem("stanchtech_user_address", JSON.stringify(profileAddress));

    // Sync shipping address back to profile
    const shippingData = sameAsBilling ? {
      firstName: data.billingFirstName,
      lastName: data.billingLastName,
      phone: data.billingPhone,
      additionalPhone: data.billingAdditionalPhone,
      deliveryAddress: data.billingAddress,
      landmark: data.billingLandmark,
      state: data.billingState,
      areaCouncil: data.billingCity,
    } : {
      firstName: data.shippingFirstName,
      lastName: data.shippingLastName,
      phone: data.shippingPhone,
      additionalPhone: data.shippingAdditionalPhone,
      deliveryAddress: data.shippingAddress,
      landmark: data.shippingLandmark,
      state: data.shippingState,
      areaCouncil: data.shippingCity,
    };

    localStorage.setItem("stanchtech_shipping_address", JSON.stringify({
      ...shippingData,
      id: Date.now().toString()
    }));

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
    router.push("/profile?tab=orders");
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
    <div className="flex justify-center w-full min-h-screen bg-white" style={{ fontFamily: "var(--font-body)", paddingLeft: '20px', paddingRight: '20px' }}>
      <style jsx global>{`
        nav { display: none !important; }
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[1100px] mx-auto" style={{ paddingTop: '80px', paddingBottom: '100px', paddingLeft: '24px', paddingRight: '24px' }}>
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(auto,459px)_380px] lg:gap-[160px] gap-12">
          {/* Left Column */}
          <div className="flex flex-col w-full relative">
            <div className="hidden lg:block absolute right-[-80px] top-[-80px] bottom-[-100px] border-r border-[#F2F2F2]"></div>
            <h1 className="text-[24px] font-semibold text-black" style={{ marginBottom: '56px', fontFamily: "var(--font-heading)" }}>CHECKOUT</h1>
            
            {!isAuth && (
              <>
                <div className="bg-[#fff5ea] border border-[#ffe4c7] rounded-[5px] flex items-center justify-start mb-[48px] w-full lg:w-[459px] h-[32px] box-border" style={{ paddingLeft: '32px' }}>
                  <p className="text-[17px] text-[#25252d]">
                    Already have an account?{' '}
                    <button type="button" className="text-[#7047eb] hover:underline" onClick={() => router.push('/login?next=/checkout')}>
                      Log in
                    </button>{' '}
                    for faster checkout
                  </p>
                </div>

                <p className="text-center text-[#484243] text-[18px]" style={{ marginBottom: '40px', marginTop: '24px' }}>OR</p>
              </>
            )}

            {/* Customer Email */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[18px] text-black" style={{ fontFamily: "var(--font-heading)" }}>Customer email address</h2>

              </div>
              <div style={{ width: '100%' }}>
                <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', letterSpacing: '0.05em' }}>Email Address <span style={{ color: 'red' }}>*</span></label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder=""
                  style={{ width: '100%' }}
                  className="border rounded-[5px] px-4 h-[52px] text-[18px] text-[#25252d] focus:outline-none border-[#d3d3d3] focus:border-[#7047eb] bg-white"
                />
              </div>
            </div>

            {/* Customer Address */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[18px] text-black" style={{ fontFamily: "var(--font-heading)" }}>Customer address</h2>

              </div>
              <div style={{ width: '100%' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>First Name <span style={{ color: 'red' }}>*</span></label>
                    <input
                      {...register('billingFirstName')}
                      type="text"
                      readOnly={hasProfileAddress}
                      onClick={() => hasProfileAddress && router.push('/profile')}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                        hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Last Name <span style={{ color: 'red' }}>*</span></label>
                    <input
                      {...register('billingLastName')}
                      type="text"
                      readOnly={hasProfileAddress}
                      onClick={() => hasProfileAddress && router.push('/profile')}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                        hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                    <input
                      {...register('billingPhone')}
                      type="tel"
                      readOnly={hasProfileAddress}
                      onClick={() => hasProfileAddress && router.push('/profile')}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                        hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Additional Phone</label>
                    <input
                      {...register('billingAdditionalPhone')}
                      type="tel"
                      readOnly={hasProfileAddress}
                      onClick={() => hasProfileAddress && router.push('/profile')}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                        hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Address</label>
                  <input
                      {...register('billingAddress')}
                      type="text"
                      readOnly={hasProfileAddress}
                      onClick={() => hasProfileAddress && router.push('/profile')}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                        hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Landmark</label>
                  <input
                      {...register('billingLandmark')}
                      type="text"
                      readOnly={hasProfileAddress}
                      onClick={() => hasProfileAddress && router.push('/profile')}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                        hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ position: 'relative' }}>
                      <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>State <span style={{ color: 'red' }}>*</span></label>
                      <select
                          {...register('billingState', { required: true })}
                          disabled={hasProfileAddress}
                          onClick={() => hasProfileAddress && router.push('/profile')}
                          className={`border rounded-[5px] px-4 h-[52px] text-[18px] focus:outline-none w-full ${
                            hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white cursor-pointer'
                          }`}
                      >
                        <option value="">Select State</option>
                        {Object.keys(NIGERIAN_STATES).map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ position: 'relative' }}>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Area Council <span style={{ color: 'red' }}>*</span></label>
                    <select
                        {...register('billingCity', { required: true })}
                        disabled={hasProfileAddress || (!watchBillingState && !hasProfileAddress)}
                        onClick={() => hasProfileAddress && router.push('/profile')}
                        className={`border rounded-[5px] px-4 h-[52px] text-[18px] focus:outline-none w-full ${
                          hasProfileAddress ? 'bg-gray-50 border-[#eee] cursor-pointer' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white cursor-pointer'
                        }`}
                    >
                      <option value="">Select Area Council</option>
                      {watchBillingState && NIGERIAN_STATES[watchBillingState]?.map(lga => (
                        <option key={lga} value={lga}>{lga}</option>
                      ))}
                    </select>
                </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[18px] text-black" style={{ fontFamily: "var(--font-heading)" }}>Shipping address</h2>

              </div>
              <label className="flex items-center cursor-pointer" style={{ gap: '12px', marginBottom: '16px' }}>
                <input
                  type="checkbox"
                  checked={sameAsBilling}
                  onChange={(e) => handleSameAsBillingChange(e.target.checked)}
                  className="w-[16px] h-[15px] border border-[#d3d3d3] rounded-[5px] accent-[#7047eb]"
                />
                <span className="text-[17px] text-[#25252d]">Same as customer address</span>
              </label>
              <div style={{ width: '100%' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>First Name <span style={{ color: 'red' }}>*</span></label>
                    <input
                      {...register('shippingFirstName')}
                      type="text"
                      readOnly={sameAsBilling}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                          sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Last Name <span style={{ color: 'red' }}>*</span></label>
                    <input
                      {...register('shippingLastName')}
                      type="text"
                      readOnly={sameAsBilling}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                          sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom: '16px' }}>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Phone Number <span style={{ color: 'red' }}>*</span></label>
                    <input
                      {...register('shippingPhone')}
                      type="tel"
                      readOnly={sameAsBilling}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                          sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Additional Phone</label>
                    <input
                      {...register('shippingAdditionalPhone')}
                      type="tel"
                      readOnly={sameAsBilling}
                      placeholder=""
                      className={`border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none w-full ${
                          sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Address</label>
                  <input
                      {...register('shippingAddress')}
                      type="text"
                      readOnly={sameAsBilling}
                      placeholder=""
                      className={`w-full border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none ${
                          sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Landmark</label>
                  <input
                      {...register('shippingLandmark')}
                      type="text"
                      readOnly={sameAsBilling}
                      placeholder=""
                      className={`w-full border rounded-[5px] px-4 h-[52px] text-[18px] placeholder:text-[#d3d3d3] focus:outline-none ${
                          sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white'
                      }`}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>State <span style={{ color: 'red' }}>*</span></label>
                      <select
                          {...register('shippingState')}
                          disabled={sameAsBilling}
                          className={`border rounded-[5px] px-4 h-[52px] text-[18px] focus:outline-none w-full ${
                              sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white cursor-pointer'
                          }`}
                      >
                        <option value="">Select State</option>
                        {Object.keys(NIGERIAN_STATES).map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '16px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '4px', textTransform: 'none', letterSpacing: '0.05em' }}>Local Council <span style={{ color: 'red' }}>*</span></label>
                      <select
                          {...register('shippingCity')}
                          disabled={sameAsBilling || (!watchShippingState && !sameAsBilling)}
                          className={`border rounded-[5px] px-4 h-[52px] text-[18px] focus:outline-none w-full ${
                              sameAsBilling ? 'pointer-events-none bg-white opacity-60' : 'border-[#d3d3d3] focus:border-[#7047eb] bg-white cursor-pointer'
                          }`}
                      >
                        <option value="">Select Area Council</option>
                        {watchShippingState && NIGERIAN_STATES[watchShippingState]?.map(lga => (
                          <option key={lga} value={lga}>{lga}</option>
                        ))}
                      </select>
                    </div>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div style={{ marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
                <h2 className="text-[18px] text-black" style={{ fontFamily: "var(--font-heading)" }}>Delivery options</h2>
              </div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('home')}
                  className={`relative border rounded-[5px] text-left transition-all ${
                    deliveryMethod === 'home'
                      ? 'border-[#7047eb] bg-white'
                      : 'border-[#bdbdbd] bg-[#f9f9f9]'
                  }`}
                  style={{ width: '220px', height: '75px', paddingLeft: '16px', paddingTop: '16px', boxSizing: 'border-box' }}
                >
                  <div className="font-medium text-[16px] text-[#25252d] mb-1">Home delivery</div>
                  <div className="text-[14px] text-[#828282]">Takes 3-5 business days</div>
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
                  className={`relative border rounded-[5px] text-left transition-all ${
                    deliveryMethod === 'store'
                      ? 'border-[#7047eb] bg-white'
                      : 'border-[#bdbdbd] bg-[#f9f9f9]'
                  }`}
                  style={{ width: '220px', height: '75px', paddingLeft: '16px', paddingTop: '16px', boxSizing: 'border-box' }}
                >
                  <div className="font-medium text-[16px] text-[#25252d] mb-1">In-store pickup</div>
                  <div className="text-[14px] text-[#828282]">Pick from store location</div>
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
                  className="flex items-center border border-[#d3d3d3] rounded-[5px] bg-white cursor-pointer hover:border-[#7047eb] transition-colors"
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
              <h2 className="text-[18px] text-[#25252d]" style={{ fontFamily: "var(--font-heading)" }}>Order Summary({cartCount})</h2>
              <div className="flex items-center gap-3">
                <button type="button" className="text-[#016fd0] text-[17px] hover:underline" onClick={() => setIsCartOpen(true)}>
                  edit cart
                </button>
                <span className="text-[#d3d3d3] text-[17px]">|</span>
                <button type="button" className="text-[#016fd0] text-[17px] hover:underline" onClick={() => router.push('/shop')}>
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
                      <p className="text-[17px] text-[#19191d]" style={{ fontFamily: "var(--font-body)" }}>
                        {item.name}
                        {(item as any).stock === 0 && <span className="text-red-500 font-bold ml-2 text-[14px] whitespace-nowrap">(Out of stock)</span>}
                      </p>
                      <p className="text-[17px] text-black whitespace-nowrap ml-2" style={{ fontFamily: "var(--font-body)" }}>₦ {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <p className="text-[17px] text-black">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px', marginBottom: '24px' }}>
              <button
                type="button"
                onClick={() => setPromoExpanded(!promoExpanded)}
                className="text-[#016fd0] text-[17px] hover:underline"
                style={{ marginBottom: '16px' }}
              >
                + Enter a promo code
              </button>
              {promoExpanded && (
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full border border-[#d3d3d3] rounded-[5px] px-3 h-[33px] text-[17px] focus:outline-none focus:border-[#7047eb]"
                />
              )}
            </div>

            {/* Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <div className="flex justify-between text-[17px]">
                <span className="text-black">Subtotal</span>
                <span className="text-black" style={{ fontFamily: "var(--font-body)" }}>₦ {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[17px]">
                <span className="text-black">Shipping</span>
                 <span className="text-black font-semibold" style={{ fontFamily: "var(--font-body)" }}>₦ 0.00</span>
              </div>
            </div>

              <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '24px', marginBottom: '48px' }}>
                <div className="flex justify-between text-[17px] font-medium">
                  <span className="text-black">Total</span>
                  <span className="text-black" style={{ fontFamily: "var(--font-body)" }}>₦ {cartTotal.toLocaleString()}</span>
                </div>
              </div>

            {/* Payment Options */}
            <div style={{ marginTop: '120px', marginBottom: '48px' }}>
              <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
                <h2 className="text-[18px] text-black" style={{ fontFamily: "var(--font-heading)" }}>Payment options</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>


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
                    <div className="text-[18px] text-black" style={{ marginBottom: '4px' }}>Direct bank transfer</div>
                    <div className="text-[17px] text-[#828282]" style={{ marginBottom: '12px' }}>Make payment directly through bank account.</div>
                    
                    {paymentMethod === 'bank' && bankExpanded && (
                      <div className="mt-4 bg-[#f9f9f9] rounded-[5px] border border-[#e0e0e0] cursor-default pointer-events-auto" style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-[14px] text-[#828282] mb-1">Bank Account</div>
                            <div className="text-[18px] text-black font-medium">1046944476</div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); copyAccountNumber(); }}
                            className="flex items-center justify-center gap-1.5 bg-white border border-[#d3d3d3] rounded-[4px] px-6 py-2.5 text-[14px] text-[#828282] hover:bg-gray-50 transition-colors cursor-pointer"
                            style={{ minWidth: '80px' }}
                          >
                            <Copy className="w-3 h-3" />
                            {copiedAccount ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        
                        <div>
                          <div className="text-[14px] text-[#828282] mb-1">Bank Name</div>
                          <div className="text-[18px] text-black">FCMB</div>
                        </div>
                        
                        <div>
                          <div className="text-[14px] text-[#828282] mb-1">Recipient Name</div>
                          <div className="text-[18px] text-black">STANCH TECH LTD</div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); shareViaWhatsApp(); }}
                          className="w-full bg-[#25D366] text-white rounded-[6px] h-[44px] text-[10px] font-bold uppercase tracking-widest hover:bg-[#1fbd5a] transition-all flex justify-center items-center gap-2 mt-2"
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
                        <text x="0" y="16" fontFamily="var(--font-heading)" fontWeight="900" fontSize="17" fill="#9ca3af">O</text>
                        <text x="13" y="16" fontFamily="var(--font-heading)" fontWeight="900" fontSize="17" fill="#9ca3af">Pay</text>
                      </svg>
                      <span className="bg-[#f3f4f6] text-[#9ca3af] text-[9px] font-bold px-1.5 py-0.5 rounded-[5px] tracking-wide border border-[#e5e7eb]">COMING SOON</span>
                    </div>
                    <div className="text-[17px] text-[#b0b0b0]">OPay payments — wallet, bank card & transfer — launching soon.</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Review & Place Order */}
            <div style={{ marginTop: '60px', marginBottom: '150px' }}>
              <h2 className="text-[18px] text-black" style={{ marginBottom: '16px', fontFamily: "var(--font-heading)" }}>Review & Place Order</h2>
              <p className="text-[18px] text-[#645a5c]" style={{ marginBottom: '24px' }}>
                Please review the order details and payment details before proceeding to confirm your order
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    {...register('agreeToTerms')}
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 border border-[#d3d3d3] rounded-[5px] accent-[#7047eb]"
                  />
                  <span className="text-[17px] text-[#25252d]">
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
                    className="mt-0.5 w-4 h-4 border border-[#d3d3d3] rounded-[5px] accent-[#7047eb]"
                  />
                  <span className="text-[17px] text-[#25252d]">Sign me up to the email list</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || cartItems.length === 0 || !isFormValid}
                className="w-full h-14 bg-black text-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    PLACE ORDER <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>



          </div>
        </div>
      </form>
    </div>
  );
}
