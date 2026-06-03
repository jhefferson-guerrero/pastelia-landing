import { contactInfo } from './contact';

export const catalog = {
  tortas: [
    {
      id: "torta-chocolate",
      name: "Torta de Chocolate",
      price: "S/ 60.00",
      description: "Ganache intenso y virutas de chocolate en cada detalle.",
      image: "/images/torta-de-chocolate.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "torta-chocoberry",
      name: "Choco Berry",
      price: "S/ 55.00",
      description: "Chocolate, fresas frescas y arándanos en perfecta armonía.",
      image: "/images/choco-berry.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "torta-carrotcake",
      name: "Carrot Cake",
      price: "S/ 75.00",
      description: "Tres capas de zanahoria, queso crema y pecanas tostadas.",
      image: "/images/carrot-cake.jpeg",
      waLink: contactInfo.whatsappUrl
    }
  ],
  queques: [
    {
      id: "queque-chocolate",
      name: "Queque de Chocolate",
      price: "S/ 30.00",
      description: "El compañero ideal para el café de la tarde.",
      image: "/images/queque-de-chocolate.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "queque-carrot",
      name: "Queque de Carrot",
      price: "S/ 30.00",
      description: "Húmedo, especiado y cubierto con frosting de queso crema.",
      image: "/images/queque-de-carrot.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "queque-naranja",
      name: "Queque de Naranja",
      price: "S/ 25.00",
      description: "Aromático y fresco, con un delicado toque cítrico.",
      image: "/images/queque-de-naranja.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "queque-arandanos",
      name: "Queque de Arándanos y Yogurt",
      price: "S/ 35.00",
      description: "Suave y equilibrado, con arándanos en cada bocado.",
      image: "/images/queque-de-arandanos-y-yogurt.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "queque-platano",
      name: "Queque de Plátano",
      price: "S/ 25.00",
      description: "Esponjoso y reconfortante, con plátano caramelizado.",
      image: "/images/queque-de-platano.jpeg",
      waLink: contactInfo.whatsappUrl
    }
  ],
  clasicos: [
    {
      id: "clasico-vanillaroll",
      name: "Vanilla Roll",
      price: "S/ 30.00",
      description: "Bizcocho de vainilla y manjar blanco en un clásico irresistible.",
      image: "/images/vanilla-roll.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "clasico-caramelkiss",
      name: "Caramel Kiss",
      price: "S/ 55.00",
      description: "Suave, cremoso y bañado en un delicado caramelo artesanal.",
      image: "/images/caramel-kiss.jpeg",
      waLink: contactInfo.whatsappUrl
    },
    {
      id: "clasico-tresdelicias",
      name: "Tres Delicias",
      price: "S/ 50.00",
      description: "Tres leches de vainilla con una textura ligera y sedosa.",
      image: "/images/tres-delicias.jpeg",
      waLink: contactInfo.whatsappUrl
    }
  ]
};
