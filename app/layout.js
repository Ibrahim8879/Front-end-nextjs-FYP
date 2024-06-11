import { Inter } from 'next/font/google'
import './globals.css'
import ReturnToHomeButton from '@/components/returntohome'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Analytics App',
  description: 'Do all type of analytics with this app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReturnToHomeButton />
        {children}
      </body>
    </html>
);}
