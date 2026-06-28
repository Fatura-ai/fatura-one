// lib/translations.ts
export type Language = 'en' | 'sv' | 'ku' | 'ar';

export interface Translations {
  nav: {
    invoices: string;
    newInvoice: string;
    pricing: string;
    about: string;
    logout: string;
    login: string;
  };
  invoices: {
    title: string;
    noInvoices: string;
    createFirst: string;
    invoiceNumber: string;
    customer: string;
    date: string;
    total: string;
    status: string;
    view: string;
    draft: string;
    paid: string;
  };
  newInvoice: {
    title: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    currency: string;
    bankName: string;
    bankAccount: string;
    bankAccountName: string;
    items: string;
    itemDescription: string;
    quantity: string;
    price: string;
    addItem: string;
    removeItem: string;
    createInvoice: string;
    total: string;
    required: string;
    invalidEmail: string;
    itemRequired: string;
  };
  detail: {
    title: string;
    invoiceNumber: string;
    date: string;
    customer: string;
    phone: string;
    email: string;
    items: string;
    description: string;
    qty: string;
    price: string;
    subtotal: string;
    total: string;
    status: string;
    bankDetails: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    sendWhatsApp: string;
    showQR: string;
    markPaid: string;
    downloadPDF: string;
    draft: string;
    paid: string;
    backToInvoices: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    monthly: string;
    annually: string;
    free: string;
    pro: string;
    freeFeatures: string[];
    proFeatures: string[];
    freePrice: string;
    proPrice: string;
    getStarted: string;
    contact: string;
  };
  about: {
    title: string;
    subtitle: string;
    mission: string;
    missionText: string;
    features: string;
    featuresList: string[];
    contact: string;
    contactText: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    save: string;
    cancel: string;
    close: string;
    send: string;
    copy: string;
    comingSoon: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      invoices: "Invoices",
      newInvoice: "New Invoice",
      pricing: "Pricing",
      about: "About",
      logout: "Logout",
      login: "Login"
    },
    invoices: {
      title: "My Invoices",
      noInvoices: "No invoices yet",
      createFirst: "Create your first invoice",
      invoiceNumber: "Invoice #",
      customer: "Customer",
      date: "Date",
      total: "Total",
      status: "Status",
      view: "View",
      draft: "Draft",
      paid: "Paid"
    },
    newInvoice: {
      title: "Create New Invoice",
      customerName: "Customer Name",
      customerPhone: "Customer Phone",
      customerEmail: "Customer Email",
      currency: "Currency",
      bankName: "Bank Name",
      bankAccount: "Bank Account Number",
      bankAccountName: "Account Name",
      items: "Invoice Items",
      itemDescription: "Description",
      quantity: "Quantity",
      price: "Price",
      addItem: "Add Item",
      removeItem: "Remove",
      createInvoice: "Create Invoice",
      total: "Total",
      required: "This field is required",
      invalidEmail: "Please enter a valid email",
      itemRequired: "Add at least one item"
    },
    detail: {
      title: "Invoice Details",
      invoiceNumber: "Invoice Number",
      date: "Date",
      customer: "Customer",
      phone: "Phone",
      email: "Email",
      items: "Items",
      description: "Description",
      qty: "Qty",
      price: "Price",
      subtotal: "Subtotal",
      total: "Total",
      status: "Status",
      bankDetails: "Bank Details",
      bankName: "Bank Name",
      accountNumber: "Account Number",
      accountName: "Account Name",
      sendWhatsApp: "Send via WhatsApp",
      showQR: "Show QR Code",
      markPaid: "Mark as Paid",
      downloadPDF: "Download PDF",
      draft: "Draft",
      paid: "Paid",
      backToInvoices: "Back to Invoices"
    },
    pricing: {
      title: "Pricing Plans",
      subtitle: "Choose the plan that fits your business needs",
      monthly: "Monthly",
      annually: "Annually",
      free: "Free",
      pro: "Pro",
      freeFeatures: [
        "Up to 10 invoices/month",
        "Basic invoice templates",
        "WhatsApp integration",
        "QR code payment",
        "Email support"
      ],
      proFeatures: [
        "Unlimited invoices",
        "All invoice templates",
        "WhatsApp integration",
        "QR code payment",
        "PDF download",
        "Mark as paid",
        "Stripe payment integration",
        "Priority support"
      ],
      freePrice: "$0",
      proPrice: "$29",
      getStarted: "Get Started",
      contact: "Contact Sales"
    },
    about: {
      title: "About Fatura",
      subtitle: "Simple invoicing for everyone",
      mission: "Our Mission",
      missionText: "Fatura makes invoicing simple, fast, and accessible for businesses of all sizes. We believe that managing invoices should be effortless, so you can focus on growing your business.",
      features: "Key Features",
      featuresList: [
        "Multi-language support (English, Swedish, Kurdish, Arabic)",
        "WhatsApp integration for easy invoice sharing",
        "QR code payments",
        "Digital invoice management",
        "Secure and reliable"
      ],
      contact: "Contact Us",
      contactText: "Have questions or need help? Reach out to our team."
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      success: "Success!",
      save: "Save",
      cancel: "Cancel",
      close: "Close",
      send: "Send",
      copy: "Copy",
      comingSoon: "Coming Soon"
    }
  },
  sv: {
    nav: {
      invoices: "Fakturor",
      newInvoice: "Ny Faktura",
      pricing: "Priser",
      about: "Om",
      logout: "Logga ut",
      login: "Logga in"
    },
    invoices: {
      title: "Mina Fakturor",
      noInvoices: "Inga fakturor ännu",
      createFirst: "Skapa din första faktura",
      invoiceNumber: "Faktura #",
      customer: "Kund",
      date: "Datum",
      total: "Totalt",
      status: "Status",
      view: "Visa",
      draft: "Utkast",
      paid: "Betald"
    },
    newInvoice: {
      title: "Skapa Ny Faktura",
      customerName: "Kundnamn",
      customerPhone: "Kundtelefon",
      customerEmail: "Kundemail",
      currency: "Valuta",
      bankName: "Banknamn",
      bankAccount: "Bankkontonummer",
      bankAccountName: "Kontonamn",
      items: "Fakturaposter",
      itemDescription: "Beskrivning",
      quantity: "Antal",
      price: "Pris",
      addItem: "Lägg till Post",
      removeItem: "Ta bort",
      createInvoice: "Skapa Faktura",
      total: "Totalt",
      required: "Detta fält är obligatoriskt",
      invalidEmail: "Ange en giltig e-postadress",
      itemRequired: "Lägg till minst en post"
    },
    detail: {
      title: "Fakturadetaljer",
      invoiceNumber: "Fakturanummer",
      date: "Datum",
      customer: "Kund",
      phone: "Telefon",
      email: "E-post",
      items: "Poster",
      description: "Beskrivning",
      qty: "Antal",
      price: "Pris",
      subtotal: "Delsumma",
      total: "Totalt",
      status: "Status",
      bankDetails: "Bankuppgifter",
      bankName: "Banknamn",
      accountNumber: "Kontonummer",
      accountName: "Kontonamn",
      sendWhatsApp: "Skicka via WhatsApp",
      showQR: "Visa QR-kod",
      markPaid: "Markera som Betald",
      downloadPDF: "Ladda ner PDF",
      draft: "Utkast",
      paid: "Betald",
      backToInvoices: "Tillbaka till Fakturor"
    },
    pricing: {
      title: "Prisplaner",
      subtitle: "Välj den plan som passar dina affärsbehov",
      monthly: "Månadsvis",
      annually: "Årligen",
      free: "Gratis",
      pro: "Pro",
      freeFeatures: [
        "Upp till 10 fakturor/månad",
        "Grundläggande fakturmallar",
        "WhatsApp-integration",
        "QR-kod betalning",
        "E-postsupport"
      ],
      proFeatures: [
        "Obegränsade fakturor",
        "Alla fakturmallar",
        "WhatsApp-integration",
        "QR-kod betalning",
        "PDF-nedladdning",
        "Markera som betald",
        "Stripe-betalningsintegration",
        "Prioriterad support"
      ],
      freePrice: "0 kr",
      proPrice: "299 kr",
      getStarted: "Kom igång",
      contact: "Kontakta oss"
    },
    about: {
      title: "Om Fatura",
      subtitle: "Enkel fakturering för alla",
      mission: "Vårt Uppdrag",
      missionText: "Fatura gör fakturering enkel, snabb och tillgänglig för företag i alla storlekar. Vi tror att hantering av fakturor borde vara problemfri, så att du kan fokusera på att växa ditt företag.",
      features: "Huvudfunktioner",
      featuresList: [
        "Flerspråksstöd (engelska, svenska, kurdiska, arabiska)",
        "WhatsApp-integration för enkel fakturdelning",
        "QR-kod betalningar",
        "Digital fakturahantering",
        "Säkert och pålitligt"
      ],
      contact: "Kontakta Oss",
      contactText: "Har du frågor eller behöver hjälp? Kontakta vårt team."
    },
    common: {
      loading: "Laddar...",
      error: "Ett fel uppstod",
      success: "Lyckades!",
      save: "Spara",
      cancel: "Avbryt",
      close: "Stäng",
      send: "Skicka",
      copy: "Kopiera",
      comingSoon: "Kommer Snart"
    }
  },
  ku: {
    nav: {
      invoices: "فاکتورەکان",
      newInvoice: "فاکتوری نوێ",
      pricing: "نرخ",
      about: "دەربارە",
      logout: "چوونەدەرەوە",
      login: "چوونەژوورەوە"
    },
    invoices: {
      title: "فاکتورەکانی من",
      noInvoices: "هیچ فاکتورێک نییە",
      createFirst: "فاکتوری یەکەمی خۆت دروست بکە",
      invoiceNumber: "فاکتور #",
      customer: "کڕیار",
      date: "بەروار",
      total: "کۆی گشتی",
      status: "ڕەوش",
      view: "بینین",
      draft: "خەمڵاندن",
      paid: "پارەدراو"
    },
    newInvoice: {
      title: "دروستکردنی فاکتوری نوێ",
      customerName: "ناوی کڕیار",
      customerPhone: "ژمارەی تەلەفۆنی کڕیار",
      customerEmail: "ئیمەیڵی کڕیار",
      currency: "دراو",
      bankName: "ناوی بانک",
      bankAccount: "ژمارەی هەژماری بانک",
      bankAccountName: "ناوی هەژمار",
      items: "بەندەکانی فاکتور",
      itemDescription: "ڕوونکردنەوە",
      quantity: "ژمارە",
      price: "نرخ",
      addItem: "زیادکردنی بەند",
      removeItem: "لابردن",
      createInvoice: "دروستکردنی فاکتور",
      total: "کۆی گشتی",
      required: "پێویستە ئەم بەشە پڕ بکرێتەوە",
      invalidEmail: "تکایە ئیمەیڵێکی دروست بنووسە",
      itemRequired: "لانی کەم یەک بەند زیاد بکە"
    },
    detail: {
      title: "وردەکانی فاکتور",
      invoiceNumber: "ژمارەی فاکتور",
      date: "بەروار",
      customer: "کڕیار",
      phone: "تەلەفۆن",
      email: "ئیمەیڵ",
      items: "بەندەکان",
      description: "ڕوونکردنەوە",
      qty: "ژمارە",
      price: "نرخ",
      subtotal: "کۆی بەشی",
      total: "کۆی گشتی",
      status: "ڕەوش",
      bankDetails: "وردەکانی بانک",
      bankName: "ناوی بانک",
      accountNumber: "ژمارەی هەژمار",
      accountName: "ناوی هەژمار",
      sendWhatsApp: "ناردن لە ڕێگەی واتساپ",
      showQR: "پیشاندانی کۆدی QR",
      markPaid: "نیشانە بکە وەک پارەدراو",
      downloadPDF: "داگرتنی PDF",
      draft: "خەمڵاندن",
      paid: "پارەدراو",
      backToInvoices: "گەڕانەوە بۆ فاکتورەکان"
    },
    pricing: {
      title: "پلانەکانی نرخ",
      subtitle: "پلانەکە هەڵبژێرە کە گونجاوە بۆ پێویستییەکانی کارەکەت",
      monthly: "مانگانە",
      annually: "ساڵانە",
      free: "خۆڕایی",
      pro: "پیشەکی",
      freeFeatures: [
        "تا 10 فاکتور لە مانگێکدا",
        "ڕووکاری بنەڕەتی فاکتور",
        "یەکخستن لەگەڵ واتساپ",
        "پارەدان لە ڕێگەی کۆدی QR",
        "پشتیوانی بە ئیمەیڵ"
      ],
      proFeatures: [
        "فاکتوری بێ سنوور",
        "هەموو ڕووکارەکانی فاکتور",
        "یەکخستن لەگەڵ واتساپ",
        "پارەدان لە ڕێگەی کۆدی QR",
        "داگرتنی PDF",
        "نیشانەکە وەک پارەدراو",
        "یەکخستن لەگەڵ پارەدانی Stripe",
        "پشتیوانی پێشکەوتوو"
      ],
      freePrice: "$0",
      proPrice: "$29",
      getStarted: "دەستپێبکە",
      contact: "پەیوەندی بە فرۆشتن"
    },
    about: {
      title: "دەربارەی فاتورا",
      subtitle: "فاکتورسازی سادە بۆ هەمووان",
      mission: "ئەرکەکەمان",
      missionText: "فاتورا فاکتورسازی دەکات بە سادە، خێرا و بەردەست بۆ بازرگانییەکانی هەموو قەبارەیەک. باوەڕمان وایە کە بەڕێوەبردنی فاکتورەکان دەبێت بە بێ کێشە بێت، بۆ ئەوەی تۆ بتوانی سەرنج بدەیت لەسەر گەشەکردنی بازرگانییەکەت.",
      features: "تایبەتمەندییە سەرەکییەکان",
      featuresList: [
        "پشتیوانی فرەزمان (ئینگلیزی، سویدی، کوردی، عەرەبی)",
        "یەکخستن لەگەڵ واتساپ بۆ هاوبەشکردنی فاکتور",
        "پارەدان لە ڕێگەی کۆدی QR",
        "بەڕێوەبردنی فاکتوری دیجیتاڵی",
        "پارێزراو و متمانەپێکراو"
      ],
      contact: "پەیوەندی بکە",
      contactText: "پرسیارێکت هەیە یان پێویستت بە یارمەتییە؟ پەیوەندی بە تیمەکەمان بکە."
    },
    common: {
      loading: "باردەکرێت...",
      error: "هەڵەیەک ڕوویدا",
      success: "سەرکەوتوو بوو!",
      save: "پاشەکەوت بکە",
      cancel: "پەشیمان ببەوە",
      close: "داخستن",
      send: "بنێرە",
      copy: "کۆپی بکە",
      comingSoon: "زۆر نزیکە"
    }
  },
  ar: {
    nav: {
      invoices: "الفواتير",
      newInvoice: "فاتورة جديدة",
      pricing: "الأسعار",
      about: "حول",
      logout: "تسجيل خروج",
      login: "تسجيل دخول"
    },
    invoices: {
      title: "فواتيري",
      noInvoices: "لا توجد فواتير بعد",
      createFirst: "أنشئ فاتورتك الأولى",
      invoiceNumber: "فاتورة #",
      customer: "العميل",
      date: "التاريخ",
      total: "المجموع",
      status: "الحالة",
      view: "عرض",
      draft: "مسودة",
      paid: "مدفوعة"
    },
    newInvoice: {
      title: "إنشاء فاتورة جديدة",
      customerName: "اسم العميل",
      customerPhone: "هاتف العميل",
      customerEmail: "بريد العميل الإلكتروني",
      currency: "العملة",
      bankName: "اسم البنك",
      bankAccount: "رقم الحساب البنكي",
      bankAccountName: "اسم الحساب",
      items: "بنود الفاتورة",
      itemDescription: "الوصف",
      quantity: "الكمية",
      price: "السعر",
      addItem: "إضافة بند",
      removeItem: "إزالة",
      createInvoice: "إنشاء فاتورة",
      total: "المجموع",
      required: "هذا الحقل مطلوب",
      invalidEmail: "يرجى إدخال بريد إلكتروني صالح",
      itemRequired: "أضف بنداً واحداً على الأقل"
    },
    detail: {
      title: "تفاصيل الفاتورة",
      invoiceNumber: "رقم الفاتورة",
      date: "التاريخ",
      customer: "العميل",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      items: "البنود",
      description: "الوصف",
      qty: "الكمية",
      price: "السعر",
      subtotal: "المجموع الفرعي",
      total: "المجموع",
      status: "الحالة",
      bankDetails: "تفاصيل البنك",
      bankName: "اسم البنك",
      accountNumber: "رقم الحساب",
      accountName: "اسم الحساب",
      sendWhatsApp: "إرسال عبر واتساب",
      showQR: "عرض رمز QR",
      markPaid: "تحديد كمدفوعة",
      downloadPDF: "تحميل PDF",
      draft: "مسودة",
      paid: "مدفوعة",
      backToInvoices: "العودة إلى الفواتير"
    },
    pricing: {
      title: "خطط الأسعار",
      subtitle: "اختر الخطة التي تناسب احتياجات عملك",
      monthly: "شهرياً",
      annually: "سنوياً",
      free: "مجاني",
      pro: "احترافي",
      freeFeatures: [
        "حتى 10 فواتير/شهر",
        "قوالب فواتير أساسية",
        "تكامل واتساب",
        "دفع عبر رمز QR",
        "دعم عبر البريد الإلكتروني"
      ],
      proFeatures: [
        "فواتير غير محدودة",
        "جميع قوالب الفواتير",
        "تكامل واتساب",
        "دفع عبر رمز QR",
        "تحميل PDF",
        "تحديد كمدفوعة",
        "تكامل دفع Stripe",
        "دعم ذو أولوية"
      ],
      freePrice: "$0",
      proPrice: "$29",
      getStarted: "ابدأ الآن",
      contact: "اتصل بالمبيعات"
    },
    about: {
      title: "حول فاتورة",
      subtitle: "إصدار فواتير بسيط للجميع",
      mission: "مهمتنا",
      missionText: "فاتورة تجعل إصدار الفواتير بسيطاً وسريعاً ومتاحاً للشركات من جميع الأحجام. نؤمن بأن إدارة الفواتير يجب أن تكون خالية من المتاعب، حتى تتمكن من التركيز على تنمية عملك.",
      features: "الميزات الرئيسية",
      featuresList: [
        "دعم متعدد اللغات (الإنجليزية، السويدية، الكردية، العربية)",
        "تكامل واتساب لمشاركة الفواتير بسهولة",
        "دفع عبر رمز QR",
        "إدارة الفواتير الرقمية",
        "آمن وموثوق"
      ],
      contact: "اتصل بنا",
      contactText: "لديك أسئلة أو تحتاج مساعدة؟ تواصل مع فريقنا."
    },
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "تم بنجاح!",
      save: "حفظ",
      cancel: "إلغاء",
      close: "إغلاق",
      send: "إرسال",
      copy: "نسخ",
      comingSoon: "قريباً"
    }
  }
};

export function getTranslation(lang: Language = 'en'): Translations {
  return translations[lang] || translations.en;
}

export function getLanguageFromLocalStorage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem('language') as Language;
  return stored && ['en', 'sv', 'ku', 'ar'].includes(stored) ? stored : 'en';
}