// Único lugar donde vive el número de WhatsApp (sin "+", como lo exige wa.me)
const WHATSAPP_NUMBER = "51906650350";

// Enlace de WhatsApp con un mensaje ya escrito
export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const contactInfo = {
  whatsapp1: "+51 906 650 350",
  instagram: "@pastelia___bakery",
  tiktok: "@pastelia__bakery",
  whatsappUrl: whatsappLink("Hola! Quisiera hacer un pedido"),
  // Enlace al chat sin mensaje (el del footer)
  whatsappChatUrl: `https://wa.me/${WHATSAPP_NUMBER}`
};
