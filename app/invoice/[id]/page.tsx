// app/invoice/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { QRCodeSVG } from 'qrcode.react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  currency: string;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  status: string;
  total: number;
  createdAt: string;
  items: InvoiceItem[];
}

export default function InvoiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, lang } = useTranslation();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [sending, setSending] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/invoice/${params.id}`);
        
        if (!response.ok) {
          // Fallback to session storage
          const stored = sessionStorage.getItem('invoiceData');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.id === params.id) {
              setInvoice(parsed);
              setLoading(false);
              return;
            }
          }
          throw new Error('Invoice not found');
        }
        
        const data = await response.json();
        setInvoice(data);
      } catch (err) {
        setError(t.common.error);
        console.error('Error fetching invoice:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchInvoice();
    }
  }, [params.id, t.common.error]);

  const handleSendWhatsApp = async () => {
    if (!invoice) return;
    
    const phone = prompt(t.detail.phone);
    if (!phone || !phone.trim()) return;

    setSending(true);
    try {
      const response = await fetch('/api/invoice/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          invoiceId: invoice.id, 
          phone: phone.trim() 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t.common.error);
      }

      alert(t.common.success);
    } catch (err) {
      alert(err instanceof Error ? err.message : t.common.error);
      console.error('Error sending WhatsApp:', err);
    } finally {
      setSending(false);
    }
  };

  const handleMarkPaid = async () => {
    if (!invoice) return;
    
    if (!confirm(t.detail.markPaid)) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/invoice/${invoice.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PAID' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t.common.error);
      }

      setInvoice({ ...invoice, status: 'PAID' });
      alert(t.common.success);
    } catch (err) {
      alert(err instanceof Error ? err.message : t.common.error);
      console.error('Error updating invoice:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    alert(t.detail.downloadPDF + ' - ' + t.common.comingSoon);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      lang === 'en' ? 'en-US' : 
      lang === 'sv' ? 'sv-SE' :
      lang === 'ku' ? 'ckb-IR' : 'ar-EG',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  const formatCurrency = (amount: number) => {
    return amount.toFixed(2) + ' ' + (invoice?.currency || '');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg">
          {error || t.common.error}
        </div>
        <button
          onClick={() => router.push('/invoices')}
          className="mt-4 text-primary hover:text-primary-dark font-medium"
        >
          ← {t.detail.backToInvoices}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.push('/invoices')}
        className="mb-6 text-primary hover:text-primary-dark font-medium transition-colors"
      >
        ← {t.detail.backToInvoices}
      </button>

      {/* Invoice Card */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/80">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {t.detail.title}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={invoice.status === 'PAID' ? 'badge-paid' : 'badge-draft'}>
                {invoice.status === 'PAID' ? t.detail.paid : t.detail.draft}
              </span>
              {invoice.status === 'DRAFT' && (
                <button
                  onClick={handleMarkPaid}
                  disabled={updating}
                  className="btn-success text-sm px-4 py-2"
                >
                  {updating ? t.common.loading : t.detail.markPaid}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Invoice Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="detail-label">{t.detail.invoiceNumber}</p>
              <p className="detail-value">{invoice.invoiceNumber}</p>
            </div>
            <div>
              <p className="detail-label">{t.detail.date}</p>
              <p className="detail-value">{formatDate(invoice.createdAt)}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div>
            <p className="detail-label">{t.detail.customer}</p>
            <div className="mt-1 space-y-1">
              <p className="text-gray-900 font-medium">{invoice.customerName}</p>
              <p className="text-sm text-gray-600">
                {t.detail.phone}: {invoice.customerPhone}
              </p>
              <p className="text-sm text-gray-600">
                {t.detail.email}: {invoice.customerEmail}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <p className="detail-label mb-2">{t.detail.items}</p>
            <div className="table-container">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="table-header">{t.detail.description}</th>
                    <th className="table-header text-right">{t.detail.qty}</th>
                    <th className="table-header text-right">{t.detail.price}</th>
                    <th className="table-header text-right">{t.detail.subtotal}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="table-cell text-gray-900">
                        {item.description}
                      </td>
                      <td className="table-cell text-gray-600 text-right">
                        {item.quantity}
                      </td>
                      <td className="table-cell text-gray-600 text-right">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="table-cell text-gray-900 font-medium text-right">
                        {formatCurrency(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right font-semibold text-gray-900">
                      {t.detail.total}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-primary text-lg">
                      {formatCurrency(invoice.total)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <p className="detail-label">{t.detail.bankDetails}</p>
            <div className="mt-1 space-y-1 bg-gray-50/80 p-4 rounded-lg">
              <p className="text-gray-900">
                <span className="text-gray-500">{t.detail.bankName}:</span> {invoice.bankName}
              </p>
              <p className="text-gray-900">
                <span className="text-gray-500">{t.detail.accountNumber}:</span> {invoice.bankAccount}
              </p>
              <p className="text-gray-900">
                <span className="text-gray-500">{t.detail.accountName}:</span> {invoice.bankAccountName}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleSendWhatsApp}
              disabled={sending}
              className="btn-success"
            >
              {sending ? t.common.loading : t.detail.sendWhatsApp}
            </button>
            
            <button
              onClick={() => setShowQR(!showQR)}
              className="btn-secondary"
            >
              {showQR ? t.common.close : t.detail.showQR}
            </button>
            
            <button
              onClick={handleDownloadPDF}
              className="btn-primary"
            >
              {t.detail.downloadPDF}
            </button>
          </div>

          {/* QR Code */}
          {showQR && (
            <div className="qr-container slide-up">
              <p className="detail-label mb-3">{t.detail.showQR}</p>
              <QRCodeSVG
                value={JSON.stringify({
                  bankName: invoice.bankName,
                  accountNumber: invoice.bankAccount,
                  accountName: invoice.bankAccountName,
                  amount: invoice.total,
                  currency: invoice.currency,
                  invoiceNumber: invoice.invoiceNumber,
                })}
                size={200}
                level="H"
                includeMargin={true}
              />
              <p className="mt-3 text-sm text-gray-500 text-center">
                {lang === 'en' && '📱 Scan to pay with your banking app'}
                {lang === 'sv' && '📱 Skanna för att betala med din bankapp'}
                {lang === 'ku' && '📱 پەرەسەندن بۆ پارەدان بە ئەپلیکەیشنی بانکەکەت'}
                {lang === 'ar' && '📱 امسح للدفع عبر تطبيق البنك الخاص بك'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}