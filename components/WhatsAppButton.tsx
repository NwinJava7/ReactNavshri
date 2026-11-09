export default function WhatsAppButton() {
  const phoneNumber = "917739179544";

  const message =
    "Hi NAVSHRI Farms, I want to know more about your products.";

  const whatsappUrl =
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="shrink-0"
      aria-label="Connect with NAVSHRI Farms on WhatsApp"
    >
      <img
        src="/whatsapp-connect.png"
        alt="Click here to connect on WhatsApp"
        width={400}
        height={150}
        className="h-9 w-auto cursor-pointer sm:h-10"
      />
    </a>
  );
}
