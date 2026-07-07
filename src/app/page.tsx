import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0f0e1a] via-[#1a1730] to-[#0f0e1a]">
      <header className="flex items-center justify-between px-6 py-4 sm:px-12">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
            U
          </div>
          <span className="hidden text-lg font-semibold text-white sm:inline">
            Objetos Perdidos UTP
          </span>
        </div>
        <div className="flex gap-3">
          <Link
            href="/auth/login"
            className="rounded-lg border border-white/15 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/register"
            className="bg-primary-600 shadow-primary-600/25 hover:bg-primary-700 rounded-lg px-5 py-2 text-sm font-medium text-white shadow-lg transition"
          >
            Registrarse
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl">
          <div className="border-primary-500/30 bg-primary-500/10 text-primary-300 mb-4 inline-block rounded-full border px-4 py-1 text-sm">
            Universidad Tecnológica de Panamá
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Sistema de{' '}
            <span className="text-primary-400">Objetos Perdidos</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-400">
            Plataforma oficial para reportar y recuperar objetos perdidos dentro
            del campus de la UTP. Encuentra lo que perdiste o ayuda a otros a
            recuperar lo suyo.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/auth/register"
              className="bg-primary-600 shadow-primary-600/30 hover:bg-primary-700 rounded-lg px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Comenzar ahora
            </Link>
            <Link
              href="/auth/login"
              className="rounded-lg border border-white/15 px-8 py-3 text-base font-semibold text-gray-300 transition hover:border-white/30 hover:text-white"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FeatureCard
            title="Reportar"
            description="Reporta objetos perdidos o encontrados dentro del campus de forma rápida y sencilla."
          />
          <FeatureCard
            title="Buscar"
            description="Explora la lista de objetos reportados y encuentra lo que perdiste."
          />
          <FeatureCard
            title="Recuperar"
            description="Coordina la entrega de objetos en los puntos designados dentro de la universidad."
          />
        </div>
      </main>

      <footer className="border-t border-white/5 px-6 py-4 text-center text-sm text-gray-600">
        Universidad Tecnológica de Panamá &mdash; Sistema de Objetos Perdidos
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-6 text-left backdrop-blur-sm transition hover:border-white/10 hover:bg-white/[0.06]">
      <div className="bg-primary-500 mb-3 h-1 w-10 rounded-full" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">
        {description}
      </p>
    </div>
  );
}
