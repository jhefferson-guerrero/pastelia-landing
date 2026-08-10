import { contactInfo } from './contact';

const generateWaLink = (productName) => {
  return `https://wa.me/51906650350?text=${encodeURIComponent('¡Hola! Quisiera hacer un pedido de: ' + productName)}`;
};

export const catalog = {
  tortas: [
    {
      id: "torta-chocolate",
      name: "Torta de Chocolate",
      price: "S/ 60.00",
      description: "Ganache intenso y virutas de chocolate en cada detalle.",
      image: "/images/torta-de-chocolate.webp",
      waLink: generateWaLink("Torta de Chocolate")
    },
    {
      id: "torta-chocoberry",
      name: "Choco Berry",
      price: "S/ 55.00",
      description: "Chocolate, fresas frescas y arándanos en perfecta armonía.",
      image: "/images/choco-berry.webp",
      waLink: generateWaLink("Choco Berry")
    },
    {
      id: "torta-carrotcake",
      name: "Carrot Cake",
      price: "S/ 75.00",
      description: "Tres capas de zanahoria, queso crema y pecanas tostadas.",
      image: "/images/carrot-cake.webp",
      waLink: generateWaLink("Carrot Cake")
    }
  ],
  queques: [
    {
      id: "queque-chocolate",
      name: "Queque de Chocolate",
      price: "S/ 30.00",
      description: "El compañero ideal para el café de la tarde.",
      image: "/images/queque-de-chocolate.webp",
      waLink: generateWaLink("Queque de Chocolate")
    },
    {
      id: "queque-carrot",
      name: "Queque de Carrot",
      price: "S/ 30.00",
      description: "Húmedo, especiado y cubierto con frosting de queso crema.",
      image: "/images/queque-de-carrot.webp",
      waLink: generateWaLink("Queque de Carrot")
    },
    {
      id: "queque-naranja",
      name: "Queque de Naranja",
      price: "S/ 25.00",
      description: "Aromático y fresco, con un delicado toque cítrico.",
      image: "/images/queque-de-naranja.webp",
      waLink: generateWaLink("Queque de Naranja")
    },
    {
      id: "queque-arandanos",
      name: "Queque de Arándanos y Yogurt",
      price: "S/ 35.00",
      description: "Suave y equilibrado, con arándanos en cada bocado.",
      image: "/images/queque-de-arandanos-y-yogurt.webp",
      waLink: generateWaLink("Queque de Arándanos y Yogurt")
    },
    {
      id: "queque-platano",
      name: "Queque de Plátano",
      price: "S/ 25.00",
      description: "Esponjoso y reconfortante, con plátano caramelizado.",
      image: "/images/queque-de-platano.webp",
      waLink: generateWaLink("Queque de Plátano")
    }
  ],
  clasicos: [
    {
      id: "clasico-vanillaroll",
      name: "Vanilla Roll",
      price: "S/ 30.00",
      description: "Bizcocho de vainilla y manjar blanco en un clásico irresistible.",
      image: "/images/vanilla-roll.webp",
      waLink: generateWaLink("Vanilla Roll")
    },
    {
      id: "clasico-caramelkiss",
      name: "Caramel Kiss",
      price: "S/ 55.00",
      description: "Suave, cremoso y bañado en un delicado caramelo artesanal.",
      image: "/images/caramel-kiss.webp",
      waLink: generateWaLink("Caramel Kiss")
    },
    {
      id: "clasico-tresdelicias",
      name: "Tres Delicias",
      price: "S/ 50.00",
      description: "Tres leches de vainilla con una textura ligera y sedosa.",
      image: "/images/tres-delicias.webp",
      waLink: generateWaLink("Tres Delicias")
    }
  ],
  cuchareables: [
    {
      id: "cuchareable-chocodosis",
      name: "Choco Dosis",
      price: "S/ 8.00",
      description: "Capas de bizcocho húmedo, ganache y crema de chocolate para disfrutar a cucharadas.",
      image: "", // Pon aquí el URL de la imagen
      waLink: generateWaLink("Choco Dosis")
    },
    {
      id: "cuchareable-carrotcake",
      name: "Carrot Cake",
      price: "S/ 8.00",
      description: "Todo el sabor de nuestro clásico queque de zanahoria con su infaltable frosting de queso crema.",
      image: "", // Pon aquí el URL de la imagen
      waLink: generateWaLink("Carrot Cake")
    },
    {
      id: "cuchareable-alfajor",
      name: "Alfajor",
      price: "S/ 8.00",
      description: "Capas suaves y crocantes intercaladas con abundante manjar blanco.",
      image: "", // Pon aquí el URL de la imagen
      waLink: generateWaLink("Alfajor")
    },
    {
      id: "cuchareable-cheesecake",
      name: "Cheesecake de Frutos Rojos",
      price: "S/ 8.00",
      description: "Suave crema de queso sobre base crocante, coronado con confitura de frutos rojos.",
      image: "", // Pon aquí el URL de la imagen
      waLink: generateWaLink("Cheesecake de Frutos Rojos")
    },
    {
      id: "cuchareable-tresleches",
      name: "Tres Leches",
      price: "S/ 8.00",
      description: "Esponjoso bizcocho bañado en nuestras tres leches de la casa.",
      image: "", // Pon aquí el URL de la imagen
      waLink: generateWaLink("Tres Leches")
    }
  ]
};
