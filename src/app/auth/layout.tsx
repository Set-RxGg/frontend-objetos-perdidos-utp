interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      {children}
    </main>
  );
}
