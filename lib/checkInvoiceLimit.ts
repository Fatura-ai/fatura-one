// lib/checkInvoiceLimit.ts
import { prisma } from './prisma';

export async function checkInvoiceLimit(userId: string): Promise<{
  allowed: boolean;
  message: string;
  totalInvoices: number;
  maxFreeInvoices: number;
}> {
  const MAX_FREE_INVOICES = 10;

  // Get user with their invoice count
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      totalInvoicesCreated: true,
      subscriptionStatus: true,
      phoneVerified: true,
      emailVerified: true,
    },
  });

  if (!user) {
    return {
      allowed: false,
      message: 'User not found',
      totalInvoices: 0,
      maxFreeInvoices: MAX_FREE_INVOICES,
    };
  }

  // Check if user has active subscription
  if (user.subscriptionStatus === 'active') {
    return {
      allowed: true,
      message: 'Pro user - unlimited invoices',
      totalInvoices: user.totalInvoicesCreated,
      maxFreeInvoices: MAX_FREE_INVOICES,
    };
  }

  // Check if phone is verified (required for free tier)
  if (!user.phoneVerified) {
    return {
      allowed: false,
      message: 'Phone verification required to create invoices',
      totalInvoices: user.totalInvoicesCreated,
      maxFreeInvoices: MAX_FREE_INVOICES,
    };
  }

  // Check if user has exceeded free limit
  if (user.totalInvoicesCreated >= MAX_FREE_INVOICES) {
    return {
      allowed: false,
      message: `Free limit reached (${MAX_FREE_INVOICES} invoices). Upgrade to Pro for unlimited invoices.`,
      totalInvoices: user.totalInvoicesCreated,
      maxFreeInvoices: MAX_FREE_INVOICES,
    };
  }

  return {
    allowed: true,
    message: `Free tier - ${MAX_FREE_INVOICES - user.totalInvoicesCreated} invoices remaining`,
    totalInvoices: user.totalInvoicesCreated,
    maxFreeInvoices: MAX_FREE_INVOICES,
  };
}