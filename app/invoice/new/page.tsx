// app/invoice/new/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { useSession } from 'next-auth/react';
import PhoneVerification from '@/components/PhoneVerification';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface UserData {
  phoneVerified: boolean;
  subscriptionStatus: string;
  totalInvoicesCreated: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    currency: 'IQD',
    bankName: '',
    bankAccount: '',
    bankAccountName: '',
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, price: 0 },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check user status on load
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchUserData();
    }
  }, [status, session]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/status');
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        
        // Check if phone verification is needed
        if (!data.phoneVerified && data.subscriptionStatus !== 'active') {
          setShowVerification(true);
        }
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setCheckingLimit(false);
    }
  };

  const handlePhoneVerified = () => {
    setShowVerification(false);
    // Refresh user data
    fetchUserData();
  };

  // Add new item
  const addItem = () => {
    const newId = String(items.length + 1);
    setItems([...items, { id: newId, description: '', quantity: 1, price: 0 }]);
  };

  // Remove item
  const removeItem = (id: string) => {
    if (items.length <= 1) {
      setErrors({ items: t.newInvoice.itemRequired });
      return;
    }
    setItems(items.filter(item => item.id !== id));
    setErrors({});
  };

  // Update item
  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Update form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = t.newInvoice.required;
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = t.newInvoice.required;
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = t.newInvoice.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = t.newInvoice.invalidEmail;
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = t.newInvoice.required;
    }

    if (!formData.bankAccount.trim()) {
      newErrors.bankAccount = t.newInvoice.required;
    }

    if (!formData.bankAccountName.trim()) {
      newErrors.bankAccountName = t.newInvoice.required;
    }

    const hasEmptyItem = items.some(item => !item.description.trim() || item.quantity <= 0 || item.price <= 0);
    if (hasEmptyItem) {
      newErrors.items = t.newInvoice.itemRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const invoiceData = {
        ...formData,
        items: items.map(item => ({
          description: item.description,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        total: calculateTotal(),
      };

      const response = await fetch('/api/invoice/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if limit was reached
        if (data.limitReached) {
          setError(data.error);
          // Show upgrade prompt
          return;
        }
        throw new Error(data.error || t.common.error);
      }
      
      // Store in session storage for detail page fallback
      sessionStorage.setItem('invoiceData', JSON.stringify(data));
      
      // Redirect to invoice detail
      router.push(`/invoice/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.error);
      console.error('Error creating invoice:', err);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state
  if (status === 'loading' || checkingLimit) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    router.push('/api/auth/signin');
    return null;
  }

  // Show phone verification if needed
  if (showVerification && userData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PhoneVerification 
          userId={session?.user?.id || ''} 
          onVerified={handlePhoneVerified} 
        />
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            {lang === 'en' && 'Phone verification is required for the free plan.'}
            {lang === 'sv' && 'Telefonverifiering krävs för gratisplanen.'}
            {lang === 'ku' && 'پشتڕاستکردنەوەی تەلەفۆن پێویستە بۆ پلانی خۆڕایی.'}
            {lang === 'ar' && 'التحقق من الهاتف مطلوب للخطة المجانية.'}
          </p>
          <button
            onClick={() => router.push('/pricing')}
            className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {lang === 'en' && 'Upgrade to Pro →'}
            {lang === 'sv' && 'Uppgradera till Pro →'}
            {lang === 'ku' && '← گەڕانەوە بۆ دەستپێک'}
            {lang === 'ar' && 'الترقية إلى Pro →'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {t.newInvoice.title}
      </h1>

      {/* Show remaining invoice count for free users */}
      {userData && userData.subscriptionStatus !== 'active' && (
        <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
          {lang === 'en' && `Free plan: ${10 - userData.totalInvoicesCreated} invoices remaining`}
          {lang === 'sv' && `Gratisplan: ${10 - userData.totalInvoicesCreated} fakturor kvar`}
          {lang === 'ku' && `پلانی خۆرایی: ${10 - userData.totalInvoicesCreated} فاکتور ماوە`}
          {lang === 'ar' && `الخطة المجانية: ${10 - userData.totalInvoicesCreated} فواتير متبقية`}
          <button
            onClick={() => router.push('/pricing')}
            className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            {lang === 'en' && 'Upgrade →'}
            {lang === 'sv' && 'Uppgradera →'}
            {lang === 'ku' && '← گەڕانەوە بۆ دەستپێک'}
            {lang === 'ar' && 'الترقية →'}
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
          {error.includes('limit') && (
            <button
              onClick={() => router.push('/pricing')}
              className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              {lang === 'en' && 'Upgrade to Pro →'}
              {lang === 'sv' && 'Uppgradera till Pro →'}
              {lang === 'ku' && '← گەڕانەوە بۆ دەستپێک'}
              {lang === 'ar' && 'الترقية إلى Pro →'}
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Customer Information */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t.detail.customer}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">
                {t.newInvoice.customerName} *
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className={`input-field ${errors.customerName ? 'input-field-error' : ''}`}
              />
              {errors.customerName && (
                <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
              )}
            </div>

            <div>
              <label className="input-label">
                {t.newInvoice.customerPhone} *
              </label>
              <input
                type="tel"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                className={`input-field ${errors.customerPhone ? 'input-field-error' : ''}`}
              />
              {errors.customerPhone && (
                <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="input-label">
                {t.newInvoice.customerEmail} *
              </label>
              <input
                type="email"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleInputChange}
                className={`input-field ${errors.customerEmail ? 'input-field-error' : ''}`}
              />
              {errors.customerEmail && (
                <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="input-label">
                {t.newInvoice.currency}
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="IQD">IQD</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t.detail.bankDetails}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="input-label">
                {t.newInvoice.bankName} *
              </label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className={`input-field ${errors.bankName ? 'input-field-error' : ''}`}
              />
              {errors.bankName && (
                <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
              )}
            </div>

            <div>
              <label className="input-label">
                {t.newInvoice.bankAccount} *
              </label>
              <input
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleInputChange}
                className={`input-field ${errors.bankAccount ? 'input-field-error' : ''}`}
              />
              {errors.bankAccount && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccount}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="input-label">
                {t.newInvoice.bankAccountName} *
              </label>
              <input
                type="text"
                name="bankAccountName"
                value={formData.bankAccountName}
                onChange={handleInputChange}
                className={`input-field ${errors.bankAccountName ? 'input-field-error' : ''}`}
              />
              {errors.bankAccountName && (
                <p className="mt-1 text-sm text-red-600">{errors.bankAccountName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t.newInvoice.items}
            </h2>
            <button
              type="button"
              onClick={addItem}
              className="btn-primary text-sm px-4 py-2"
            >
              {t.newInvoice.addItem}
            </button>
          </div>

          {errors.items && (
            <p className="mb-4 text-sm text-red-600">{errors.items}</p>
          )}

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-3 items-start">
                <div className="col-span-5">
                  <input
                    type="text"
                    placeholder={t.newInvoice.itemDescription}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    placeholder={t.newInvoice.quantity}
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    min="1"
                    className="input-field"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    placeholder={t.newInvoice.price}
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="input-field"
                  />
                </div>
                <div className="col-span-2">
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="btn-danger w-full text-sm px-3 py-2"
                  >
                    {t.newInvoice.removeItem}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-end">
              <p className="text-lg font-semibold text-gray-900">
                {t.newInvoice.total}: {calculateTotal().toFixed(2)} {formData.currency}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? t.common.loading : t.newInvoice.createInvoice}
          </button>
        </div>
      </form>
    </div>
  );
}