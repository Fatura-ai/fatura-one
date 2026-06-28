import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { jwtVerify } from "jose"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("authjs.session-token")?.value

  if (!token) {
    redirect('/auth/signin')
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
    const { payload } = await jwtVerify(token, secret)
    const email = payload.email as string

    return (
      <div style={{ maxWidth: 800, margin: '50px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Welcome to Fatura, {email}</h1>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" style={{
              padding: '8px 16px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Sign Out
            </button>
          </form>
        </div>

        <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
            <h3>📄 Create Invoice</h3>
            <p>Create a new invoice</p>
            <Link href="/invoices/create" style={{ color: '#0070f3' }}>Get Started →</Link>
          </div>
          <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
            <h3>📱 Generate QR Code</h3>
            <p>Create QR codes for invoices</p>
            <Link href="/qr/create" style={{ color: '#0070f3' }}>Get Started →</Link>
          </div>
          <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
            <h3>📄 Create ODF</h3>
            <p>Generate ODF documents</p>
            <Link href="/odf/create" style={{ color: '#0070f3' }}>Get Started →</Link>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    redirect('/auth/signin')
  }
}