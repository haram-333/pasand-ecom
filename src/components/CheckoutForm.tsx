"use client";

import { useState } from "react";
import { Lock, Shield } from "lucide-react";

interface CheckoutFormProps {
  onSubmit: (formData: CheckoutFormData) => void;
  isProcessing: boolean;
}

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardName: string;
  saveInfo: boolean;
  terms: boolean;
}

export default function CheckoutForm({ onSubmit, isProcessing }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
         address: "",
     city: "",
     zipCode: "",
    country: "Pakistan",
         paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardName: "",
    saveInfo: false,
    terms: false
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Input masking functions
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  const formatCVC = (value: string) => {
    // Remove all non-digits and limit to 4 characters
    return value.replace(/\D/g, '').slice(0, 4);
  };

  // Detect card type based on card number
  const getCardType = (cardNumber: string) => {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.startsWith('4')) return 'visa';
    if (digits.startsWith('5')) return 'mastercard';
    if (digits.startsWith('34') || digits.startsWith('37')) return 'amex';
    if (digits.startsWith('6')) return 'discover';
    return 'unknown';
  };

  // Get card type for current input
  const currentCardType = getCardType(formData.cardNumber);

  // Handle Enter key to move to next field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        const inputs = Array.from(form.querySelectorAll('input, select, textarea')) as HTMLElement[];
        const currentIndex = inputs.indexOf(e.currentTarget);
        const nextInput = inputs[currentIndex + 1];
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // Validate expiry date
  const isExpiryValid = () => {
    if (!formData.cardExpiry || formData.cardExpiry.length < 5) return true; // Don't show error while typing
    
    const [month, year] = formData.cardExpiry.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // January is 0
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth < 1 || expMonth > 12) return false;
    
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    // Apply input masking based on field type
    if (type === 'text') {
      switch (name) {
        case 'cardNumber':
          processedValue = formatCardNumber(value);
          break;
        case 'cardExpiry':
          processedValue = formatExpiryDate(value);
          break;
        case 'cardCVC':
          processedValue = formatCVC(value);
          break;
                 case 'phone':
           // Format Pakistani phone number: +92 300 1234567
           const phoneDigits = value.replace(/\D/g, '');
           if (phoneDigits.startsWith('92')) {
             // Remove 92 prefix for formatting
             const localDigits = phoneDigits.slice(2);
             if (localDigits.length <= 3) {
               processedValue = `+92 ${localDigits}`;
             } else if (localDigits.length <= 6) {
               processedValue = `+92 ${localDigits.slice(0, 3)} ${localDigits.slice(3)}`;
             } else {
               processedValue = `+92 ${localDigits.slice(0, 3)} ${localDigits.slice(3, 6)}${localDigits.slice(6, 10)}`;
             }
           } else {
             // If no country code, assume it's a local number
             if (phoneDigits.length <= 3) {
               processedValue = phoneDigits;
             } else if (phoneDigits.length <= 6) {
               processedValue = `${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3)}`;
             } else {
               processedValue = `${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3, 6)}${phoneDigits.slice(6, 10)}`;
             }
           }
           break;
                 case 'zipCode':
           // Format Pakistani postal code: 12345 (5 digits)
           const zipDigits = value.replace(/\D/g, '');
           processedValue = zipDigits.slice(0, 5); // Pakistani postal codes are 5 digits
           break;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
         if (!formData.city.trim()) newErrors.city = "City is required";
     if (!formData.zipCode.trim()) newErrors.zipCode = "Postal code is required";
    
         if (formData.paymentMethod === "card") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
      if (!formData.cardCVC.trim()) newErrors.cardCVC = "CVC is required";
      if (!formData.cardName.trim()) newErrors.cardName = "Cardholder name is required";
    }

    if (!formData.terms) newErrors.terms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping & Payment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                                 placeholder="+92 300 1234567"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                             {formData.phone.length > 0 && formData.phone.length < 15 && (
                 <p className="text-blue-500 text-xs mt-1">Continue typing to format automatically (Pakistani format)</p>
               )}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                                   placeholder="House #123, Street #5, Gulberg"
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                                     placeholder="Karachi"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              

              <div>
                                 <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                   Postal Code *
                 </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  maxLength={5}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="44000"
                />
                  {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                     {formData.zipCode.length > 0 && formData.zipCode.length < 5 && (
                     <p className="text-blue-500 text-xs mt-1">Continue typing to format automatically (5 digits)</p>
                   )}
                </div>
            </div>

                         <div>
               <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                 Country
               </label>
               <select
                 id="country"
                 name="country"
                 value={formData.country}
                 onChange={handleInputChange}
                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
               >
                 <option value="Pakistan">Pakistan</option>
               </select>
             </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-4">
                         <div className="flex items-center space-x-4">
               <label className="flex items-center">
                 <input
                   type="radio"
                   name="paymentMethod"
                   value="card"
                   checked={formData.paymentMethod === "card"}
                   onChange={handleInputChange}
                   className="mr-2"
                 />
                 <span className="text-sm font-medium text-gray-700">Card</span>
               </label>
             </div>

                         {formData.paymentMethod === "card" && (
              <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.cardName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                </div>

                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-3 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {/* Card Type Indicator */}
                    {formData.cardNumber.length > 0 && currentCardType !== 'unknown' && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <img 
                          src={`/images/payments/${currentCardType}.svg`} 
                          alt={currentCardType}
                          className="h-6 w-auto"
                          onError={(e) => {
                            // Hide image if it fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  {formData.cardNumber.length === 19 && currentCardType !== 'unknown' && (
                    <p className="text-green-500 text-sm mt-1">✓ Valid {currentCardType} card number</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      name="cardExpiry"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.cardExpiry || (formData.cardExpiry.length === 5 && !isExpiryValid()) ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                    {formData.cardExpiry.length === 5 && !isExpiryValid() && (
                      <p className="text-red-500 text-sm mt-1">Please enter a valid future expiry date</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cardCVC" className="block text-sm font-medium text-gray-700 mb-1">
                      CVC *
                    </label>
                    <input
                      type="text"
                      id="cardCVC"
                      name="cardCVC"
                      value={formData.cardCVC}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.cardCVC ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123"
                      maxLength={5}
                    />
                    {errors.cardCVC && <p className="text-red-500 text-sm mt-1">{errors.cardCVC}</p>}
                  </div>
                </div>

                {/* Card Input Hints */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Card number will be automatically formatted with spaces</p>
                  <p>• Expiry date will be formatted as MM/YY</p>
                  <p>• CVC is the 3-4 digit security code on the back of your card</p>
                </div>

                {/* Payment Icons */}
                <div className="flex items-center gap-3 space-x-2">
                  <img src="/images/payments/visa.svg" alt="Visa" className="h-8" />
                  <img src="/images/payments/mastercard.svg" alt="Mastercard" className="h-8" />
                  <img src="/images/payments/apple-pay.svg" alt="Apple Pay" className="h-8" />
                  <img src="/images/payments/google-pay.svg" alt="Google Pay" className="h-8" />
                  <img src="/images/payments/union-pay.svg" alt="Union Pay" className="h-8" />
                </div>
              </div>
            )}

            
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Save this information for next time</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-black underline hover:no-underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-black underline hover:no-underline">
                Privacy Policy
              </a>
              *
            </span>
          </label>
          {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
        </div>

        {/* Security Notice */}
        <div className="bg-gray-50 rounded-lg p-4 flex items-start space-x-3">
          <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-900 mb-1">Secure Checkout</p>
            <p>Your payment information is encrypted and secure. We never store your credit card details.</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
            isProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-800 hover:scale-105 active:scale-95'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Complete Order</span>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}
