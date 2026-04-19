import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Copy } from 'lucide-react';
import svgPaths from "../../imports/svg-nv1rjglbt2";
import imgPart31 from "figma:asset/705687d37a1bd0160f34e53cdcb38e492d45e74c.png";

interface CheckoutFormData {
  email: string;
  billingFirstName: string;
  billingLastName: string;
  billingAddress1: string;
  billingAddress2: string;
  billingCity: string;
  billingCountry: string;
  billingState: string;
  billingZip: string;
  billingPhone: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingCountry: string;
  shippingState: string;
  shippingZip: string;
  shippingPhone: string;
  agreeToTerms: boolean;
  emailSignup: boolean;
}

export function CheckoutPage() {
  const { register, handleSubmit, setValue, watch } = useForm<CheckoutFormData>({
    defaultValues: {
      email: '',
      agreeToTerms: false,
      emailSignup: false,
    }
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [deliveryMethod, setDeliveryMethod] = useState<'home' | 'store'>('home');
  const [promoExpanded, setPromoExpanded] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [editingBilling, setEditingBilling] = useState(true);
  const [editingShipping, setEditingShipping] = useState(true);
  const [editingDelivery, setEditingDelivery] = useState(true);

  const billingFields = watch([
    'billingFirstName',
    'billingLastName',
    'billingAddress1',
    'billingAddress2',
    'billingCity',
    'billingCountry',
    'billingState',
    'billingZip',
    'billingPhone'
  ]);

  const shippingFields = watch([
    'shippingFirstName',
    'shippingLastName',
    'shippingAddress1',
    'shippingCity',
    'shippingState',
    'shippingZip'
  ]);

  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) {
      setValue('shippingFirstName', billingFields[0]);
      setValue('shippingLastName', billingFields[1]);
      setValue('shippingAddress1', billingFields[2]);
      setValue('shippingAddress2', billingFields[3]);
      setValue('shippingCity', billingFields[4]);
      setValue('shippingCountry', billingFields[5]);
      setValue('shippingState', billingFields[6]);
      setValue('shippingZip', billingFields[7]);
      setValue('shippingPhone', billingFields[8]);
    }
  };

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('9021080395');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      'Payment Receipt for Order\n\nBank: Zenith Bank\nAccount: 9021080395\nRecipient: STANCHTECH LTD\nAmount: ₦250,000'
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Order submitted:', {
      ...data,
      paymentMethod,
      deliveryMethod,
    });
    alert('Order placed successfully! Check console for details.');
  };

  return (
    <div className="bg-white min-h-screen w-full px-8 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left Column */}
          <div>
            {/* Header */}
            <h1 className="text-[16px] text-black mb-3">Checkout</h1>
            
            {/* Login Banner */}
            <div className="bg-[#fff5ea] border border-[#ffe4c7] rounded-[3px] px-5 py-2 mb-6">
              <p className="text-[10px] text-[#25252d]">
                Already have an account?{' '}
                <button type="button" className="text-[#7047eb] hover:underline">
                  Log in
                </button>{' '}
                for faster checkout
              </p>
            </div>

            {/* Customer Information */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] text-black">Customer information</h2>
                <button type="button" className="text-[#016fd0] text-[12px] hover:underline">
                  edit
                </button>
              </div>
              <input
                {...register('email')}
                type="email"
                placeholder="email for order confirmation"
                className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] text-[#25252d] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
              />
            </div>

            <p className="text-center text-[#484243] text-[14px] mb-8">OR</p>

            {/* Billing Address */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] text-black">Billing address</h2>
                <button 
                  type="button" 
                  className="text-[#016fd0] text-[12px] hover:underline" 
                  onClick={() => setEditingBilling(!editingBilling)}
                >
                  {editingBilling ? 'done' : 'edit details'}
                </button>
              </div>
              
              {editingBilling ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      {...register('billingFirstName')}
                      type="text"
                      placeholder="first name"
                      className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                    />
                    <input
                      {...register('billingLastName')}
                      type="text"
                      placeholder="last name"
                      className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                    />
                  </div>

                  <input
                    {...register('billingAddress1')}
                    type="text"
                    placeholder="address line - 1"
                    className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] mb-4 focus:outline-none focus:border-[#7047eb]"
                  />
                  
                  <input
                    {...register('billingAddress2')}
                    type="text"
                    placeholder="address line - 2"
                    className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] mb-4 focus:outline-none focus:border-[#7047eb]"
                  />
                  
                  <input
                    {...register('billingCity')}
                    type="text"
                    placeholder="city"
                    className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] mb-4 focus:outline-none focus:border-[#7047eb]"
                  />

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <select
                        {...register('billingCountry')}
                        className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] text-[#828282] appearance-none focus:outline-none focus:border-[#7047eb]"
                      >
                        <option value="">country</option>
                        <option value="US">United States</option>
                        <option value="NG">Nigeria</option>
                        <option value="UK">United Kingdom</option>
                        <option value="CA">Canada</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="16" height="17" fill="none" viewBox="0 0 9.66667 5.91667">
                          <path d={svgPaths.pa87ec00} stroke="#BDBDBD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        {...register('billingState')}
                        className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] text-[#828282] appearance-none focus:outline-none focus:border-[#7047eb]"
                      >
                        <option value="">state</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="16" height="17" fill="none" viewBox="0 0 9.66667 5.91667">
                          <path d={svgPaths.pa87ec00} stroke="#BDBDBD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      {...register('billingZip')}
                      type="text"
                      placeholder="zip"
                      className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                    />
                    <input
                      {...register('billingPhone')}
                      type="tel"
                      placeholder="phone"
                      className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                    />
                  </div>
                </>
              ) : (
                <div className="bg-[#f9f9f9] border border-[#e0e0e0] rounded-[3px] p-4">
                  <p className="text-[13px] text-[#25252d]">
                    {billingFields[0] && billingFields[1] ? (
                      <>{billingFields[0]} {billingFields[1]}</>
                    ) : (
                      <span className="text-[#828282]">No billing address provided</span>
                    )}
                  </p>
                  {billingFields[2] && (
                    <p className="text-[13px] text-[#25252d] mt-1">{billingFields[2]}</p>
                  )}
                  {billingFields[4] && (
                    <p className="text-[13px] text-[#25252d] mt-1">
                      {billingFields[4]}{billingFields[6] && `, ${billingFields[6]}`} {billingFields[7]}
                    </p>
                  )}
                  {billingFields[8] && (
                    <p className="text-[13px] text-[#25252d] mt-1">{billingFields[8]}</p>
                  )}
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] text-black">Shipping address</h2>
                <button 
                  type="button" 
                  className="text-[#016fd0] text-[12px] hover:underline" 
                  onClick={() => setEditingShipping(!editingShipping)}
                >
                  {editingShipping ? 'done' : 'edit details'}
                </button>
              </div>

              {editingShipping ? (
                <>
                  <label className="flex items-center gap-3 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={(e) => handleSameAsBillingChange(e.target.checked)}
                      className="w-[16px] h-[15px] border border-[#d3d3d3] rounded-[3px] accent-[#7047eb]"
                    />
                    <span className="text-[12px] text-[#25252d]">Same as billing address</span>
                  </label>

                  {!sameAsBilling && (
                    <>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                          {...register('shippingFirstName')}
                          type="text"
                          placeholder="first name"
                          className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                        />
                        <input
                          {...register('shippingLastName')}
                          type="text"
                          placeholder="last name"
                          className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                        />
                      </div>

                      <input
                        {...register('shippingAddress1')}
                        type="text"
                        placeholder="address line - 1"
                        className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] mb-4 focus:outline-none focus:border-[#7047eb]"
                      />
                      
                      <input
                        {...register('shippingAddress2')}
                        type="text"
                        placeholder="address line - 2"
                        className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] mb-4 focus:outline-none focus:border-[#7047eb]"
                      />
                      
                      <input
                        {...register('shippingCity')}
                        type="text"
                        placeholder="city"
                        className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] mb-4 focus:outline-none focus:border-[#7047eb]"
                      />

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="relative">
                          <select
                            {...register('shippingCountry')}
                            className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] text-[#828282] appearance-none focus:outline-none focus:border-[#7047eb]"
                          >
                            <option value="">country</option>
                            <option value="US">United States</option>
                            <option value="NG">Nigeria</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="16" height="17" fill="none" viewBox="0 0 9.66667 5.91667">
                              <path d={svgPaths.pa87ec00} stroke="#BDBDBD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </svg>
                          </div>
                        </div>
                        <div className="relative">
                          <select
                            {...register('shippingState')}
                            className="w-full border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] text-[#828282] appearance-none focus:outline-none focus:border-[#7047eb]"
                          >
                            <option value="">state</option>
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg width="16" height="17" fill="none" viewBox="0 0 9.66667 5.91667">
                              <path d={svgPaths.pa87ec00} stroke="#BDBDBD" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          {...register('shippingZip')}
                          type="text"
                          placeholder="zip"
                          className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                        />
                        <input
                          {...register('shippingPhone')}
                          type="tel"
                          placeholder="phone"
                          className="border border-[#d3d3d3] rounded-[3px] px-4 py-2 text-[13.31px] placeholder:text-[#828282] focus:outline-none focus:border-[#7047eb]"
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="bg-[#f9f9f9] border border-[#e0e0e0] rounded-[3px] p-4">
                  {sameAsBilling ? (
                    <p className="text-[13px] text-[#25252d]">Same as billing address</p>
                  ) : (
                    <>
                      <p className="text-[13px] text-[#25252d]">
                        {shippingFields[0] && shippingFields[1] ? (
                          <>{shippingFields[0]} {shippingFields[1]}</>
                        ) : (
                          <span className="text-[#828282]">No shipping address provided</span>
                        )}
                      </p>
                      {shippingFields[2] && (
                        <p className="text-[13px] text-[#25252d] mt-1">{shippingFields[2]}</p>
                      )}
                      {shippingFields[3] && (
                        <p className="text-[13px] text-[#25252d] mt-1">
                          {shippingFields[3]}{shippingFields[4] && `, ${shippingFields[4]}`} {shippingFields[5]}
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Delivery Options */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] text-black">Delivery options</h2>
                <button type="button" className="text-[#016fd0] text-[12px] hover:underline" onClick={() => setEditingDelivery(!editingDelivery)}>
                  edit choice
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('home')}
                  className={`relative border rounded-[3px] p-4 text-left transition-all ${
                    deliveryMethod === 'home'
                      ? 'border-[#7047eb] bg-white'
                      : 'border-[#bdbdbd] bg-[#f9f9f9]'
                  }`}
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
                  className={`relative border rounded-[3px] p-4 text-left transition-all ${
                    deliveryMethod === 'store'
                      ? 'border-[#7047eb] bg-white'
                      : 'border-[#bdbdbd] bg-[#f9f9f9]'
                  }`}
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
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[16px] text-[#25252d]">Order Summary(1)</h2>
              <button type="button" className="text-[#016fd0] text-[12px] hover:underline">
                edit cart
              </button>
            </div>

            {/* Product */}
            <div className="flex gap-4 mb-6">
              <div className="w-[66px] h-[93px] relative overflow-hidden">
                <img 
                  src={imgPart31} 
                  alt="Fuel Injector SS-90" 
                  className="absolute h-[127%] left-[-48%] max-w-none top-[-7.5%] w-[177.5%]"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[8px] text-[#19191d]">Fuel Injector SS-90</p>
                  <p className="text-[12px] text-black whitespace-nowrap ml-2">
                    <span className="inline-block">N</span>
                    <span className="inline-block border-b-2 border-black">_</span>
                    <span>250,000</span>
                  </p>
                </div>
                <p className="text-[10px] text-black">Qty: 1</p>
              </div>
            </div>

            <div className="border-t border-[#e0e0e0] pt-4 mb-4">
              <button
                type="button"
                onClick={() => setPromoExpanded(!promoExpanded)}
                className="text-[#016fd0] text-[12px] hover:underline mb-2"
              >
                + Enter a promo code
              </button>
              {promoExpanded && (
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full border border-[#d3d3d3] rounded-[3px] px-3 py-2 text-[12px] mb-2"
                />
              )}
            </div>

            {/* Summary */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-[12px]">
                <span className="text-black">Subtotal</span>
                <span className="text-black">
                  <span className="inline-block">N</span>
                  <span className="inline-block border-b-2 border-black">_</span>
                  <span>250,000</span>
                </span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-black">Shipping</span>
                <span className="text-black">
                  <span className="inline-block">N</span>
                  <span className="inline-block border-b-2 border-black">_</span>
                  <span>0.00</span>
                </span>
              </div>
            </div>

            <div className="border-t border-[#e0e0e0] pt-4 mb-8">
              <div className="flex justify-between text-[12px] font-medium">
                <span className="text-black">Total</span>
                <span className="text-black">
                  <span className="inline-block">N</span>
                  <span className="inline-block border-b-2 border-black">_</span>
                  <span>250,000</span>
                </span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] text-black">Payment options</h2>
                <button type="button" className="text-[#016fd0] text-[12px] hover:underline">
                  edit choice
                </button>
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 w-4 h-4 accent-[#7047eb]"
                  />
                  <div>
                    <div className="text-[16px] text-black mb-1">Cash On Delivery</div>
                    <div className="text-[12px] text-[#828282]">Pay with cash upon delivery.</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="mt-0.5 w-4 h-4 accent-[#7047eb]"
                  />
                  <div className="flex-1">
                    <div className="text-[16px] text-black mb-1">Direct bank transfer</div>
                    <div className="text-[12px] text-[#828282] mb-3">Make payment directly through bank account.</div>
                    
                    {paymentMethod === 'bank' && (
                      <div className="mt-3 space-y-3 bg-[#f9f9f9] p-4 rounded-[3px] border border-[#e0e0e0]">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-[10px] text-[#828282] mb-1">Bank Account</div>
                            <div className="text-[14px] text-black font-medium">9021080395</div>
                          </div>
                          <button
                            type="button"
                            onClick={copyAccountNumber}
                            className="flex items-center gap-1 bg-white border border-[#d3d3d3] rounded-[3px] px-2 py-1 text-[10px] text-[#828282] hover:bg-gray-50 transition-colors"
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
                          onClick={shareViaWhatsApp}
                          className="w-full bg-[#25D366] text-white rounded-[6px] py-2.5 text-[12px] font-medium hover:bg-[#1fbd5a] transition-colors"
                        >
                          Share Payment Receipt via WhatsApp
                        </button>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Review & Place Order */}
            <div className="mb-6">
              <h2 className="text-[16px] text-black mb-3">Review & Place Order</h2>
              <p className="text-[14px] text-[#645a5c] mb-4">
                Please review the order details and payment details before proceeding to confirm your order
              </p>

              <div className="space-y-3 mb-6">
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
                className="w-full bg-black text-white rounded-[12px] py-3 text-[10px] font-medium hover:bg-gray-800 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}