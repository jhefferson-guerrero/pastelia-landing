import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
      <p className="uppercase text-pastelia-brown/60 text-xs md:text-sm tracking-[0.3em] font-bold mb-4">
        Error 404
      </p>
      <h1 className="font-serif text-5xl md:text-6xl font-bold tracking-tight text-pastelia-burgundy mb-6">
        Esta página no existe
      </h1>
      <p className="text-pastelia-brown/70 text-lg md:text-xl font-serif max-w-xl mb-10">
        Puede que el enlace esté mal escrito o que la página ya no esté disponible.
      </p>
      <Link
        to="/"
        className="inline-flex items-center rounded-full bg-pastelia-burgundy text-pastelia-cream font-medium px-8 py-3.5 hover:bg-pastelia-burgundy/90 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver al inicio
      </Link>
    </div>
  );
}
