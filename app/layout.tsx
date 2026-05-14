import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amaryllis Corp — Location saisonnière",
  description: "Découvrez nos biens d'exception pour vos séjours en location saisonnière.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-white text-gray-900 antialiased">
        <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur z-10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-amber-600 tracking-tight">
              Amaryllis Corp
            </a>
            <nav className="flex gap-6 text-sm font-medium text-gray-600">
              <a href="/properties" className="hover:text-amber-600 transition-colors">Nos biens</a>
              <a href="#contact" className="hover:text-amber-600 transition-colors">Contact</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-20 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Amaryllis Corp · Tous droits réservés
        </footer>
      </body>
    </html>
  );
}
