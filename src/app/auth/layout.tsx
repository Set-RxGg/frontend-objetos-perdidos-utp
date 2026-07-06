interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className="bg-background-secondary flex min-h-screen items-center justify-center">
      {children}
    </main>
  );
}
