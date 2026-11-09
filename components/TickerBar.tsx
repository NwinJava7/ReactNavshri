export function TickerBar() {
  return (
    <section className="overflow-hidden border-b border-stone-100 bg-[#3B1414] py-3">
      <div className="navshri-marquee text-sm tracking-wide text-[#E8C96A] md:text-base">
        {Array.from({ length: 2 }).map((_, index) => (
          <p key={index} className="flex shrink-0 items-center px-8">
            <span>Navshri Farms &quot;From Farm to Family&quot;</span>
            <span className="mx-4 opacity-70">—</span>
            <span>नवश्री फ़ार्म्स &quot;खेत से परिवार तक का सफ़र&quot;</span>
            <span className="mx-4 opacity-70">—</span>
            <span>
              For Bulk Order Contact :{" "}
              <a href="mailto:navshrifarms@gmail.com" className="underline underline-offset-4">
                navshrifarms@gmail.com
              </a>
            </span>
            <span className="mx-8 opacity-70">•</span>
          </p>
        ))}
      </div>
    </section>
  );
}
