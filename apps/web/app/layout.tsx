import '@mysten/dapp-kit/dist/index.css';
import './globals.css'

import { Providers } from './providers'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='p-2 h-screen flex flex-col items-center'>
        <div className='w-[640px] mx-auto px-4 h-full'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}