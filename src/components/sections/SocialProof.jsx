import { contactInfo } from '../../data/contact';

export default function SocialProof() {
  // 8 Unique images for the marquee
  const uniqueImages = [
    "https://images.unsplash.com/photo-1600857319983-305bcbc8f509?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509365465994-3e5369870d0c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514845555132-7eb4862f0f49?q=80&w=600&auto=format&fit=crop"
  ];

  // Duplicate the array to create a seamless infinite loop
  const marqueeImages = [...uniqueImages, ...uniqueImages];

  return (
    <section className="pt-24 pb-24 bg-pastelia-cream overflow-hidden flex flex-col items-center border-t border-pastelia-brown/5">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16 px-6">
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-pastelia-burgundy mb-6">
          Síguenos en Instagram
        </h2>
        <a 
          href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-pastelia-brown/80 hover:text-pastelia-burgundy text-lg font-light tracking-wide transition-colors"
        >
          {contactInfo.instagram}
        </a>
      </div>

      {/* Auto-scrolling Horizontal Photo Strip */}
      <div className="w-full relative mb-16 flex overflow-hidden">
        {/* Marquee Container */}
        <div className="flex w-max gap-4 md:gap-6 px-4 md:px-6 animate-marquee hover:animation-play-state-paused">
          {marqueeImages.map((img, idx) => (
            <a
              key={idx}
              href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[26rem] md:h-[26rem] flex-shrink-0 overflow-hidden rounded-[20px] md:rounded-[24px] bg-pastelia-brown/5 block group"
            >
              <img 
                src={img} 
                alt="Instagram Pastelia Gallery" 
                className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-pastelia-burgundy/0 group-hover:bg-pastelia-burgundy/5 transition-colors duration-500"></div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Link CTA */}
      <div className="px-6 flex justify-center">
        <a 
          href={`https://instagram.com/${contactInfo.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-7 py-3.5 rounded-full border border-pastelia-burgundy text-sm md:text-base font-medium tracking-[0.08em] uppercase text-pastelia-burgundy hover:bg-pastelia-burgundy hover:text-white hover:-translate-y-[2px] transition-all duration-300 ease-out flex items-center gap-2"
        >
          Ver Instagram <span className="font-sans text-sm">↗</span>
        </a>
      </div>

    </section>
  );
}
