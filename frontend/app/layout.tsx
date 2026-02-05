import { AuthProvider } from '@/providers/auth-provider';
import Navbar from '@/components/navbar';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-16">
              {children}
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}