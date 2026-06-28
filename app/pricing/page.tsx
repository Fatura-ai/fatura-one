// app/pricing/page.tsx
'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/useTranslation';

export default function PricingPage() {
  const { t, lang } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t.pricing.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200 p-1 rounded-xl inline-flex gap-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 min-w-[120px] ${
                billingCycle === 'monthly'
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setBillingCycle('annually')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 min-w-[120px] ${
                billingCycle === 'annually'
                  ? 'bg-white text-indigo-600 shadow-md'
                  : 'bg-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {t.pricing.annually}
              <span className="ml-1.5 text-xs text-green-600 font-semibold">
                {lang === 'en' && 'Save 20%'}
                {lang === 'sv' && 'Spara 20%'}
                {lang === 'ku' && 'ڕزگارکردنی 20%'}
                {lang === 'ar' && 'وفر 20%'}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-8 border-2 border-gray-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t.pricing.free}
              </h2>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">
                  $0
                </span>
                <span className="text-gray-500 ml-2">
                  / {billingCycle === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {t.pricing.freeFeatures.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-4 bg-gray-200 text-gray-500 rounded-xl font-medium cursor-not-allowed">
              {t.common.save}
            </button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 p-8 border-2 border-indigo-600 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
              {lang === 'en' && '🌟 Most Popular'}
              {lang === 'sv' && '🌟 Mest Populära'}
              {lang === 'ku' && '🌟 زۆرترین بەکارهێنەر'}
              {lang === 'ar' && '🌟 الأكثر شيوعاً'}
            </div>

            <div className="text-center pt-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t.pricing.pro}
              </h2>
              <div className="mb-6">
                <span className="text-5xl font-bold text-indigo-600">
                  $29
                </span>
                <span className="text-gray-500 ml-2">
                  / {billingCycle === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {t.pricing.proFeatures.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 hover:shadow-lg transition-all duration-200">
              {t.pricing.getStarted}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">{t.about.contactText}</p>
          <a href="mailto:support@fatura.one" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {t.pricing.contact}
          </a>
        </div>
      </div>
    </div>
  );
}