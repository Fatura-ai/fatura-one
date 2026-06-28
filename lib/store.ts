export type InvoiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
};

export type Invoice = {
  id: string;
  invoiceNumber: number;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: string;
  paymentStatus: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  items: InvoiceItem[];
  createdAt: string;
};

// Global store
let _invoices: Invoice[] = [];
let _invoiceCounter = 1001;

export const invoices = {
  getAll: () => _invoices,
  add: (invoice: Invoice) => {
    _invoices.push(invoice);
    return invoice;
  },
  findById: (id: string) => _invoices.find((inv) => inv.id === id),
  findByUserId: (userId: string) => _invoices.filter((inv) => inv.userId === userId),
  getNextNumber: () => _invoiceCounter++,
};