import '@mysten/dapp-kit/dist/index.css';
import './globals.css'
import "@radix-ui/themes/styles.css";

import { Providers } from './providers'
import { Theme } from "@radix-ui/themes";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='p-2 h-screen flex flex-col items-center'>
        <Theme>
          <div className='w-[640px] mx-auto px-4 h-full'>
            <Providers>{children}</Providers>
          </div>
        </Theme>
      </body>
    </html>
  )
}