import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-white py-24 px-4">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-500">
            Location saisonnière
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Vivez des séjours<br />d&apos;exception
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Amaryllis Corp vous propose une sélection de biens immobiliers soigneusement
            choisis pour des vacances inoubliables.
          </p>
          <Link
            href="/properties"
            className="inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-amber-400 transition-colors"
          >
            Voir nos biens →
          </Link>
        </div>
      </section>

      {/* Atouts */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            { icon: "🏡", title: "Biens sélectionnés", desc: "Chaque propriété est vérifiée et entretenue par nos soins." },
            { icon: "📅", title: "Réservation simple", desc: "Choisissez vos dates, remplissez le formulaire, c'est tout." },
            { icon: "💬", title: "Accompagnement", desc: "Notre équipe est disponible pour vous guider à chaque étape." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="space-y-3">
              <div className="text-4xl">{icon}</div>
              <h3 className="font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 px-4 bg-amber-50">
        <div className="mx-auto max-w-xl text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Une question ?</h2>
          <p className="text-gray-500 text-sm">
            Contactez-nous par email :{" "}
            <a href="mailto:contact@amaryllis-corp.fr" className="text-amber-600 font-medium hover:underline">
              contact@amaryllis-corp.fr
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
