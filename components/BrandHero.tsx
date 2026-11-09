import { useEffect, useRef, useState } from "react";

const scenes = [
  { src: "/farm.jpg", title: "Rooted in Nature", subtitle: "Where every journey begins" },
  { src: "/harvest.jpg", title: "Carefully Harvested", subtitle: "Nurtured with care" },
  { src: "/products.jpg", title: "Pure Farm Goodness", subtitle: "Nature's goodness, thoughtfully brought to you" },
];

export function BrandHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [scene, setScene] = useState(0);
  const [logo, setLogo] = useState(false);

  useEffect(() => {
    if (hasVideo) return;
    const id = window.setInterval(() => {
      setScene((current) => {
        const next = current + 1;
        if (next >= scenes.length) {
          setLogo(true);
          window.setTimeout(() => {
            setLogo(false);
            setScene(0);
          }, 4000);
          return current;
        }
        return next;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, [hasVideo]);

  return (
    <section className="relative w-full overflow-hidden bg-[#102c1b]">
      <div className="relative aspect-[16/7] min-h-[280px] w-full max-h-[520px]">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/farm.jpg"
            onError={() => setHasVideo(false)}
          >
            <source src="/videos/navshri-farms.mp4" type="video/mp4" />
          </video>
        ) : (
          <>
            {scenes.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  !logo && scene === index ? "opacity-100 scale-105" : "opacity-0"
                }`}
              />
            ))}
            <img
              src="/family.jpg"
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                logo ? "opacity-40" : "opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-10 text-center md:pb-14">
              {logo ? (
                <>
                  <img src="/navshri-logo.png" alt="NAVSHRI Farms" className="h-16 w-auto md:h-20" />
                  <p className="mt-3 font-serif text-xl tracking-[0.2em] text-[#f4dfaa] md:text-2xl">
                    From Farm to Family
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-serif text-3xl text-white md:text-5xl">{scenes[scene].title}</h2>
                  <p className="mt-2 text-sm tracking-wide text-[#f4e6c3] md:text-lg">
                    {scenes[scene].subtitle}
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
