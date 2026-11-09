import type { ReactNode } from "react";
import IndianFlag from "@/components/IndianFlag";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/icons";

const founder = {
  title: "Founder",
  name: "Navin Singh",
  designation: "Founder",
  phone: "+91 77391 79544",
  photo: "/team/navin-singh.png",
};

const cofounder = {
  title: "Co-Founder",
  name: "Shruti Mehta",
  designation: "Co-Founder",
  phone: "+91 63627 02577",
  photo: "/team/shruti-mehta.png",
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-stone-100 bg-[#f7f3ec]">
      <div className="mx-auto grid max-w-[1400px] md:grid-cols-3">
        <PersonColumn person={founder} />
        <PersonColumn person={cofounder} bordered />
        <section className="flex flex-col items-center px-6 py-12 text-center md:border-l md:border-stone-200/80">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Connect with us
          </p>
          <img
            src="/logo.png"
            alt="NAVSHRI — From Farm to Family"
            width={220}
            height={72}
            className="mt-5 h-16 w-auto rounded-md object-cover"
          />
          <address className="mt-5 max-w-xs text-sm not-italic leading-7 text-stone-600">
            Navshri Farms
            <br />
            Rohtas, Bihar (821303)
            <br />
            <span className="mt-1 inline-flex items-center gap-2">
              <IndianFlag width={22} height={15} className="rounded-[2px] shadow-sm" />
              India
            </span>
          </address>
          <div className="mt-3 space-y-1 text-sm text-stone-700">
            <a href="tel:+917739179544" className="block hover:text-forest">
              +91 77391 79544
            </a>
            <a href="tel:+916362702577" className="block hover:text-forest">
              +91 63627 02577
            </a>
          </div>
          <a
            href="mailto:navshrifarms@gmail.com"
            className="mt-3 text-sm font-medium text-forest hover:underline"
          >
            navshrifarms@gmail.com
          </a>
          <div className="mt-6 flex items-center gap-3">
            <SocialLink href="#" label="Facebook">
              <FacebookIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label="Instagram">
              <InstagramIcon className="h-4 w-4" />
            </SocialLink>
            <SocialLink href="#" label="LinkedIn">
              <LinkedInIcon className="h-4 w-4" />
            </SocialLink>
          </div>
        </section>
      </div>
      <div className="border-t border-stone-200/70 py-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Navshri. From farm to family.
      </div>
    </footer>
  );
}

function PersonColumn({
  person,
  bordered = false,
}: {
  person: {
    title: string;
    name: string;
    designation: string;
    phone: string;
    photo?: string;
    initials?: string;
  };
  bordered?: boolean;
}) {
  return (
    <section
      className={`flex flex-col items-center px-6 py-12 text-center ${
        bordered ? "md:border-l md:border-stone-200/80" : ""
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{person.title}</p>
      <div className="relative mt-5 h-36 w-36 overflow-hidden rounded-2xl bg-[#3B1414] shadow-sm">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-2xl font-semibold tracking-[0.2em] text-[#E8C96A]">
            {person.initials}
          </span>
        )}
      </div>
      <p className="mt-5 font-serif text-2xl text-forest">{person.name}</p>
      <p className="mt-1 text-sm text-stone-500">{person.designation}</p>
      <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="mt-3 text-sm text-stone-700">
        {person.phone}
      </a>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-forest hover:border-forest hover:bg-white"
    >
      {children}
    </a>
  );
}
