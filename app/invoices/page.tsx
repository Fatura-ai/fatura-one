// app/invoices/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';
import { useSession } from 'next-auth/react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function InvoicesPage() {
  const router = useRouter();
  const { t, lang } = useTranslation();
  const { data: session, status } = useSession();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchInvoices();
    }
  }, [status, router]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/invoices');
      
      if (response.status === 401) {
        router.push('/api/auth/signin');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch invoices');
      }
      
      const data = await response.json();
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.error);
      console.error('Error fetching invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(
      lang === 'en' ? 'en-US' : 
      lang === 'sv' ? 'sv-SE' :
      lang === 'ku' ? 'ckb-IR' : 'ar-EG',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  const getStatusBadge = (status: string) => {
    if (status === 'PAID') {
      return <span className="badge-paid">{t.invoices.paid}</span>;
    }
    return <span className="badge-draft">{t.invoices.draft}</span>;
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">{t.common.loading}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg">
          {error}
        </div>
        <button
          onClick={() => fetchInvoices()}
          className="mt-4 btn-primary"
        >
          {t.common.save} {/* Using save as retry */}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t.invoices.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {invoices.length} {invoices.length === 1 ? 'invoice' : 'invoices'}
          </p>
        </div>
        <button
          onClick={() => router.push('/invoice/new')}
          className="btn-primary mt-3 sm:mt-0"
        >
          {t.nav.newInvoice}
        </button>
      </div>

      {invoices.length === 0 ? (
        <div className="card p-12 empty-state">
          <svg 
            className="empty-state-icon" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <h3 className="empty-state-title">{t.invoices.noInvoices}</h3>
          <p className="empty-state-description">{t.invoices.createFirst}</p>
          <button
            onClick={() => router.push('/invoice/new')}
            className="btn-primary"
          >
            {t.nav.newInvoice}
          </button>
        </div>
      ) : (
        <div className="table-container">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">{t.invoices.invoiceNumber}</th>
                  <th className="table-header">{t.invoices.customer}</th>
                  <th className="table-header">{t.invoices.date}</th>
                  <th className="table-header">{t.invoices.total}</th>
                  <th className="table-header">{t.invoices.status}</th>
                  <th className="table-header">{t.invoices.view}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="table-cell font-medium text-gray-900">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="table-cell text-gray-500">
                      {invoice.customerName}
                    </td>
                    <td className="table-cell text-gray-500">
                      {formatDate(invoice.createdAt)}
                    </td>
                    <td className="table-cell text-gray-900 font-medium">
                      {invoice.total.toFixed(2)}
                    </td>
                    <td className="table-cell">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => router.push(`/invoice/${invoice.id}`)}
                        className="text-primary hover:text-primary-dark font-medium transition-colors"
                      >
                        {t.invoices.view}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}