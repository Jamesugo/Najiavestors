export interface MockReview {
  id: string;
  userName: string;
  userAvatar?: string;
  userCity: string;
  rating: number;
  content: string;
  createdAt: string;
  helpfulCount: number;
  photos?: string[];
}

export interface BusinessItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  address: string;
  city: string;
  state: string;
  lga: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsapp: string;
  website?: string;
  priceTier: "BUDGET" | "MODERATE" | "EXPENSIVE" | "LUXURY";
  verified: boolean;
  claimed: boolean;
  photos: string[];
  hours: Record<string, string>;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  reviews: MockReview[];
}

export const MOCK_BUSINESSES: BusinessItem[] = [
  // 1. Lagos - Restaurants
  {
    id: "biz-1",
    slug: "terra-kulture-restaurant-victoria-island",
    name: "Terra Kulture Restaurant & Lounge",
    tagline: "Premier Nigerian culinary and cultural center",
    description: "Terra Kulture is an iconic Nigerian restaurant, art gallery, and theater. Savor authentic Nigerian delicacies including Asun, Seafood Okro, Pounded Yam with Egusi, and jollof rice in an artistic African ambiance.",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    address: "Plot 1376 Tiamiyu Savage St, Victoria Island",
    city: "Victoria Island",
    state: "Lagos",
    lga: "Eti-Osa",
    latitude: 6.4281,
    longitude: 3.4219,
    phone: "+2348099007744",
    whatsapp: "+2348099007744",
    website: "https://terrakulture.com",
    priceTier: "EXPENSIVE",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "9:00 AM - 10:00 PM",
      "Tuesday": "9:00 AM - 10:00 PM",
      "Wednesday": "9:00 AM - 10:00 PM",
      "Thursday": "9:00 AM - 10:00 PM",
      "Friday": "9:00 AM - 11:00 PM",
      "Saturday": "9:00 AM - 11:00 PM",
      "Sunday": "10:00 AM - 10:00 PM"
    },
    rating: 4.8,
    reviewCount: 324,
    reviews: [
      {
        id: "rev-1",
        userName: "Chidinma Okoro",
        userCity: "Lekki, Lagos",
        rating: 5,
        content: "The best Seafood Okro in Lagos! The atmosphere is genuinely authentic and the art gallery upstairs makes it a complete cultural experience.",
        createdAt: "2 days ago",
        helpfulCount: 28
      },
      {
        id: "rev-2",
        userName: "Femi Adeleke",
        userCity: "Ikeja, Lagos",
        rating: 4,
        content: "Great food, fast service, but parking on Tiamiyu Savage can be a challenge during weekend evenings.",
        createdAt: "1 week ago",
        helpfulCount: 12
      }
    ]
  },

  // 2. Lagos - Tech / Co-working
  {
    id: "biz-2",
    slug: "hub-one-first-city-yaba",
    name: "Hub One by FCMB & Passion Incubator",
    tagline: "Tech innovation hub and co-working space in Yaba",
    description: "Hub One is a state-of-the-art tech workspace designed for startups, freelancers, and digital nomads. Equipped with redundant fiber broadband, 24/7 power, conference rooms, and event space.",
    categorySlug: "coworking",
    categoryName: "Tech & Co-working",
    address: "10 Hughes Ave, Alagomeji-Yaba",
    city: "Yaba",
    state: "Lagos",
    lga: "Lagos Mainland",
    latitude: 6.5025,
    longitude: 3.3765,
    phone: "+2348149845000",
    whatsapp: "+2348149845000",
    website: "https://hubone.ng",
    priceTier: "MODERATE",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "24 Hours",
      "Tuesday": "24 Hours",
      "Wednesday": "24 Hours",
      "Thursday": "24 Hours",
      "Friday": "24 Hours",
      "Saturday": "8:00 AM - 6:00 PM",
      "Sunday": "Closed"
    },
    rating: 4.7,
    reviewCount: 148,
    reviews: [
      {
        id: "rev-3",
        userName: "Tunde Bakare",
        userCity: "Yaba, Lagos",
        rating: 5,
        content: "Rock solid internet with uninterrupted power. Perfect for remote tech workers building for global teams.",
        createdAt: "3 days ago",
        helpfulCount: 19
      }
    ]
  },

  // 3. Abuja - Restaurants
  {
    id: "biz-3",
    slug: "cilantro-restaurant-and-lounge-maitama",
    name: "Cilantro Restaurant & Lounge",
    tagline: "Fine dining and lush outdoor garden experience in Maitama",
    description: "Abuja's premier Asian fusion and BBQ dining destination set amidst verdant gardens. Renowned for butter chicken, naan bread, sizzling grills, and mocktails in an elegant outdoor setting.",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    address: "IBB Way, Maitama Amusement Park, Maitama",
    city: "Maitama",
    state: "FCT",
    lga: "Municipal Area Council (AMAC)",
    latitude: 9.0833,
    longitude: 7.4989,
    phone: "+2348188886018",
    whatsapp: "+2348188886018",
    priceTier: "EXPENSIVE",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "12:00 PM - 11:00 PM",
      "Tuesday": "12:00 PM - 11:00 PM",
      "Wednesday": "12:00 PM - 11:00 PM",
      "Thursday": "12:00 PM - 11:00 PM",
      "Friday": "12:00 PM - 11:30 PM",
      "Saturday": "12:00 PM - 11:30 PM",
      "Sunday": "12:00 PM - 11:00 PM"
    },
    rating: 4.6,
    reviewCount: 289,
    reviews: [
      {
        id: "rev-4",
        userName: "Aisha Mohammed",
        userCity: "Wuse 2, Abuja",
        rating: 5,
        content: "The garden ambience at night is breathtaking. Exceptional garlic naan and lamb chops.",
        createdAt: "5 days ago",
        helpfulCount: 34
      }
    ]
  },

  // 4. Lagos - Hotels & Stays
  {
    id: "biz-4",
    slug: "the-george-hotel-ikoyi",
    name: "The George Hotel Ikoyi",
    tagline: "Exclusive luxury boutique hotel in upscale Ikoyi",
    description: "An ultra-luxurious boutique hotel catering to discerning business executives and leisure travelers. Features gourmet culinary dining, outdoor pool, private boardrooms, and 24/7 concierge.",
    categorySlug: "hotels",
    categoryName: "Hotels & Stays",
    address: "30 Lugard Ave, Ikoyi",
    city: "Ikoyi",
    state: "Lagos",
    lga: "Eti-Osa",
    latitude: 6.4474,
    longitude: 3.4356,
    phone: "+23414663664",
    whatsapp: "+2348030005522",
    website: "https://thegeorgelagos.com",
    priceTier: "LUXURY",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "24 Hours",
      "Tuesday": "24 Hours",
      "Wednesday": "24 Hours",
      "Thursday": "24 Hours",
      "Friday": "24 Hours",
      "Saturday": "24 Hours",
      "Sunday": "24 Hours"
    },
    rating: 4.9,
    reviewCount: 198,
    reviews: [
      {
        id: "rev-5",
        userName: "Emeka Nwosu",
        userCity: "Victoria Island, Lagos",
        rating: 5,
        content: "Top-notch security, impeccably clean rooms, and world-class breakfast buffet.",
        createdAt: "2 weeks ago",
        helpfulCount: 22
      }
    ]
  },

  // 5. Port Harcourt - Restaurants & Grills
  {
    id: "biz-5",
    slug: "bole-king-port-harcourt-gra",
    name: "Bole King & Seafood Grill",
    tagline: "Authentic Port Harcourt roasted plantain and grilled fish",
    description: "Experience genuine Garden City street delicacies refined. Freshly charcoal-roasted plantain, spicy pepper sauce, roasted fish, utazi leaves, and tiger prawns.",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    address: "42 Tombia St, New GRA Phase 2",
    city: "Port Harcourt",
    state: "Rivers",
    lga: "Port Harcourt",
    latitude: 4.8156,
    longitude: 7.0498,
    phone: "+2348037722119",
    whatsapp: "+2348037722119",
    priceTier: "MODERATE",
    verified: true,
    claimed: false,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "11:00 AM - 9:00 PM",
      "Tuesday": "11:00 AM - 9:00 PM",
      "Wednesday": "11:00 AM - 9:00 PM",
      "Thursday": "11:00 AM - 9:00 PM",
      "Friday": "11:00 AM - 10:00 PM",
      "Saturday": "11:00 AM - 10:00 PM",
      "Sunday": "1:00 PM - 8:00 PM"
    },
    rating: 4.9,
    reviewCount: 412,
    reviews: [
      {
        id: "rev-6",
        userName: "Tari Briggs",
        userCity: "Old GRA, Port Harcourt",
        rating: 5,
        content: "If you come to PH and don't eat here, you haven't arrived! The spicy pepper sauce is unmatched.",
        createdAt: "4 days ago",
        helpfulCount: 51
      }
    ]
  },

  // 6. Abuja - Nightlife & Lounge
  {
    id: "biz-6",
    slug: "jabi-boat-club-lounge-abuja",
    name: "Jabi Boat Club (JBC)",
    tagline: "Waterfront leisure, jet ski club, and lakeside lounge",
    description: "Located on the scenic shores of Jabi Lake. JBC offers boat rides, jet skiing, delicious finger foods, cocktails, and weekend live band performances with panoramic lake views.",
    categorySlug: "nightlife",
    categoryName: "Bars & Nightlife",
    address: "N10 Alex Ekwueme Way, Jabi",
    city: "Jabi",
    state: "FCT",
    lga: "Municipal Area Council (AMAC)",
    latitude: 9.0768,
    longitude: 7.4265,
    phone: "+2348077727772",
    whatsapp: "+2348077727772",
    website: "https://jabiboatclub.com",
    priceTier: "EXPENSIVE",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "10:00 AM - 12:00 AM",
      "Tuesday": "10:00 AM - 12:00 AM",
      "Wednesday": "10:00 AM - 12:00 AM",
      "Thursday": "10:00 AM - 2:00 AM",
      "Friday": "10:00 AM - 3:00 AM",
      "Saturday": "9:00 AM - 3:00 AM",
      "Sunday": "10:00 AM - 12:00 AM"
    },
    rating: 4.5,
    reviewCount: 310,
    reviews: [
      {
        id: "rev-7",
        userName: "Usman Danjuma",
        userCity: "Gwarinpa, Abuja",
        rating: 4,
        content: "Scenic sunset views on the lake. Drinks are great; service can get slightly slow during rush hours on Friday.",
        createdAt: "1 week ago",
        helpfulCount: 16
      }
    ]
  },

  // 7. Lagos - Healthcare & Spa
  {
    id: "biz-7",
    slug: "biologique-recherche-ambassade-spa-ikoyi",
    name: "Tirta Ayu Spa & Wellness Clinic",
    tagline: "Authentic Javanese herbal spa and therapeutic wellness",
    description: "Premium holistic spa providing authentic herbal treatments, aromatherapy, deep tissue massages, and skincare treatments with all-natural organic remedies.",
    categorySlug: "health",
    categoryName: "Healthcare & Spas",
    address: "33 Raymond Njoku St, Ikoyi",
    city: "Ikoyi",
    state: "Lagos",
    lga: "Eti-Osa",
    latitude: 6.4412,
    longitude: 3.4289,
    phone: "+2348039778844",
    whatsapp: "+2348039778844",
    priceTier: "EXPENSIVE",
    verified: true,
    claimed: false,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "9:00 AM - 8:00 PM",
      "Tuesday": "9:00 AM - 8:00 PM",
      "Wednesday": "9:00 AM - 8:00 PM",
      "Thursday": "9:00 AM - 8:00 PM",
      "Friday": "9:00 AM - 8:00 PM",
      "Saturday": "9:00 AM - 8:00 PM",
      "Sunday": "12:00 PM - 7:00 PM"
    },
    rating: 4.8,
    reviewCount: 88,
    reviews: []
  },

  // 8. Ibadan - Restaurants & Heritage
  {
    id: "biz-8",
    slug: "amala-skye-bodija-ibadan",
    name: "Amala Skye (Ose Olorun Food Canteen)",
    tagline: "Legendary hot fluffy Amala, Gbegiri, and Ewedu in Bodija",
    description: "Universally acknowledged as the pilgrimage point for authentic Amala in Nigeria. Piping hot, soft yam flour served with goat meat, roundabout, bokoto, and gbegiri/ewedu mix.",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    address: "Omolayo St, Beside Skye Bank, Bodija",
    city: "Bodija",
    state: "Oyo",
    lga: "Ibadan North",
    latitude: 7.4321,
    longitude: 3.9056,
    phone: "+2348023456781",
    whatsapp: "+2348023456781",
    priceTier: "BUDGET",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "8:00 AM - 6:00 PM",
      "Tuesday": "8:00 AM - 6:00 PM",
      "Wednesday": "8:00 AM - 6:00 PM",
      "Thursday": "8:00 AM - 6:00 PM",
      "Friday": "8:00 AM - 6:00 PM",
      "Saturday": "8:00 AM - 5:00 PM",
      "Sunday": "Closed"
    },
    rating: 4.9,
    reviewCount: 820,
    reviews: [
      {
        id: "rev-8",
        userName: "Kayode Adeleke",
        userCity: "Ring Road, Ibadan",
        rating: 5,
        content: "Words cannot describe the texture of the amala. Get the ogufe (goat meat) and fresh ewedu!",
        createdAt: "Yesterday",
        helpfulCount: 77
      }
    ]
  },

  // 9. Lagos - Shopping & Bespoke Fashion
  {
    id: "biz-9",
    slug: "mai-atafo-inspired-tailoring-lekki",
    name: "Atafo Bespoke & Bridal",
    tagline: "World-class bespoke tailoring and contemporary African couture",
    description: "Founded by celebrated Nigerian designer Mai Atafo. Renowned across Africa for precision suiting, luxury menswear, and show-stopping bridal collections.",
    categorySlug: "shopping",
    categoryName: "Fashion & Markets",
    address: "Plot 12 Admiralty Way, Lekki Phase 1",
    city: "Lekki Phase 1",
    state: "Lagos",
    lga: "Eti-Osa",
    latitude: 6.4489,
    longitude: 3.4732,
    phone: "+2348033339090",
    whatsapp: "+2348033339090",
    website: "https://atafo.com",
    priceTier: "LUXURY",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "9:00 AM - 6:00 PM",
      "Tuesday": "9:00 AM - 6:00 PM",
      "Wednesday": "9:00 AM - 6:00 PM",
      "Thursday": "9:00 AM - 6:00 PM",
      "Friday": "9:00 AM - 6:00 PM",
      "Saturday": "10:00 AM - 5:00 PM",
      "Sunday": "Closed"
    },
    rating: 4.9,
    reviewCount: 165,
    reviews: []
  },

  // 10. Enugu - Hotels & Hospitality
  {
    id: "biz-10",
    slug: "nike-lake-resort-hotel-enugu",
    name: "Nike Lake Resort Hotel",
    tagline: "Serene lakeside retreat nestled in the coal city hills",
    description: "Set against the natural tranquility of Nike Lake. Offers tennis courts, pool, lush greenery, boat rides, and comfortable lodging away from city bustle.",
    categorySlug: "hotels",
    categoryName: "Hotels & Stays",
    address: "Nike Lake Road, Abakpa Nike",
    city: "Enugu",
    state: "Enugu",
    lga: "Enugu East",
    latitude: 6.5122,
    longitude: 7.5344,
    phone: "+2348055551234",
    whatsapp: "+2348055551234",
    priceTier: "MODERATE",
    verified: true,
    claimed: false,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "24 Hours",
      "Tuesday": "24 Hours",
      "Wednesday": "24 Hours",
      "Thursday": "24 Hours",
      "Friday": "24 Hours",
      "Saturday": "24 Hours",
      "Sunday": "24 Hours"
    },
    rating: 4.4,
    reviewCount: 176,
    reviews: []
  },

  // 11. Lagos - Auto Services
  {
    id: "biz-11",
    slug: "autogenius-diagnostics-ikeja",
    name: "AutoGenius Certified Repairs & Diagnostics",
    tagline: "Computerized vehicle diagnostics and expert German/Japanese auto repair",
    description: "State-of-the-art auto care center providing computerized diagnostics, AC servicing, suspension repairs, genuine OEM parts sourcing, and comprehensive pre-purchase inspections.",
    categorySlug: "automotive",
    categoryName: "Auto & Repairs",
    address: "14 Acme Road, Ogba Industrial Estate, Ikeja",
    city: "Ikeja",
    state: "Lagos",
    lga: "Ikeja",
    latitude: 6.6234,
    longitude: 3.3387,
    phone: "+2348123456789",
    whatsapp: "+2348123456789",
    priceTier: "MODERATE",
    verified: true,
    claimed: true,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "8:00 AM - 6:00 PM",
      "Tuesday": "8:00 AM - 6:00 PM",
      "Wednesday": "8:00 AM - 6:00 PM",
      "Thursday": "8:00 AM - 6:00 PM",
      "Friday": "8:00 AM - 6:00 PM",
      "Saturday": "8:30 AM - 4:00 PM",
      "Sunday": "Closed"
    },
    rating: 4.7,
    reviewCount: 92,
    reviews: []
  },

  // 12. Lagos - Home & Solar Solutions
  {
    id: "biz-12",
    slug: "solarnaija-energy-solutions-surulere",
    name: "Krystal Solar & Inverter Engineering",
    tagline: "Tier-1 solar systems, lithium batteries, and smart home automation",
    description: "Reliable clean energy partner for Nigerian homes and commercial offices. Professional load audit, certified installation, warranty-backed lithium battery banks, and 24/7 technical support.",
    categorySlug: "home-services",
    categoryName: "Home & Professional",
    address: "88 Bode Thomas St, Surulere",
    city: "Surulere",
    state: "Lagos",
    lga: "Surulere",
    latitude: 6.4956,
    longitude: 3.3543,
    phone: "+2348028889911",
    whatsapp: "+2348028889911",
    website: "https://krystalsolar.ng",
    priceTier: "EXPENSIVE",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "8:30 AM - 5:30 PM",
      "Tuesday": "8:30 AM - 5:30 PM",
      "Wednesday": "8:30 AM - 5:30 PM",
      "Thursday": "8:30 AM - 5:30 PM",
      "Friday": "8:30 AM - 5:30 PM",
      "Saturday": "9:00 AM - 2:00 PM",
      "Sunday": "Closed"
    },
    rating: 4.9,
    reviewCount: 114,
    reviews: []
  },

  // 13. Kano - Heritage & Textiles
  {
    id: "biz-13",
    slug: "kofar-mata-dye-pits-kano-city",
    name: "Kofar Mata Traditional Dye Pits & Crafts",
    tagline: "500-year-old indigo dyeing tradition and authentic Hausa craftsmanship",
    description: "Dating back to 1498, the historic Kofar Mata dye pits produce world-famous hand-dyed indigo textiles, traditional caps, and handcrafted leather accessories.",
    categorySlug: "shopping",
    categoryName: "Fashion & Markets",
    address: "Kofar Mata Gate, Kano City",
    city: "Kano City",
    state: "Kano",
    lga: "Kano Municipal",
    latitude: 11.9964,
    longitude: 8.5273,
    phone: "+2348061122334",
    whatsapp: "+2348061122334",
    priceTier: "BUDGET",
    verified: true,
    claimed: false,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "8:00 AM - 6:00 PM",
      "Tuesday": "8:00 AM - 6:00 PM",
      "Wednesday": "8:00 AM - 6:00 PM",
      "Thursday": "8:00 AM - 6:00 PM",
      "Friday": "8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM",
      "Saturday": "8:00 AM - 6:00 PM",
      "Sunday": "9:00 AM - 4:00 PM"
    },
    rating: 4.8,
    reviewCount: 204,
    reviews: []
  },

  // 14. Lagos - Continental & Rooftop
  {
    id: "biz-14",
    slug: "shiro-restaurant-bar-victoria-island",
    name: "Shiro Restaurant & Bar",
    tagline: "Pan-Asian cuisine, monument statues, and Atlantic ocean breeze",
    description: "Jaw-dropping Japanese, Korean, Thai and Chinese dining right on Landmark Beach. Soaring ceilings, monumental statues, sushi bar, and oceanfront terrace dining.",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    address: "Landmark Centre, 4 Water Corporation Road, Victoria Island",
    city: "Victoria Island",
    state: "Lagos",
    lga: "Eti-Osa",
    latitude: 6.4255,
    longitude: 3.4411,
    phone: "+2348186298141",
    whatsapp: "+2348186298141",
    priceTier: "LUXURY",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "12:00 PM - 12:00 AM",
      "Tuesday": "12:00 PM - 12:00 AM",
      "Wednesday": "12:00 PM - 12:00 AM",
      "Thursday": "12:00 PM - 1:00 AM",
      "Friday": "12:00 PM - 2:00 AM",
      "Saturday": "12:00 PM - 2:00 AM",
      "Sunday": "12:00 PM - 12:00 AM"
    },
    rating: 4.7,
    reviewCount: 380,
    reviews: []
  },

  // 15. Abuja - Tech & Co-working
  {
    id: "biz-15",
    slug: "ventures-park-maitama-abuja",
    name: "Ventures Park Innovation Hub",
    tagline: "Eco-friendly artsy co-working and startup accelerator",
    description: "Abuja's premier creative tech campus. Built with sustainable upcycled shipping containers surrounded by green lawns. Features incubator programs, reliable high-speed fiber, podcast studios, and event amphitheater.",
    categorySlug: "coworking",
    categoryName: "Tech & Co-working",
    address: "5 Kwaji Close, Maitama",
    city: "Maitama",
    state: "FCT",
    lga: "Municipal Area Council (AMAC)",
    latitude: 9.0888,
    longitude: 7.4877,
    phone: "+2348174583921",
    whatsapp: "+2348174583921",
    website: "https://theventurespark.com",
    priceTier: "MODERATE",
    verified: true,
    claimed: true,
    featured: true,
    photos: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "8:00 AM - 9:00 PM",
      "Tuesday": "8:00 AM - 9:00 PM",
      "Wednesday": "8:00 AM - 9:00 PM",
      "Thursday": "8:00 AM - 9:00 PM",
      "Friday": "8:00 AM - 9:00 PM",
      "Saturday": "9:00 AM - 6:00 PM",
      "Sunday": "Closed"
    },
    rating: 4.8,
    reviewCount: 160,
    reviews: []
  },

  // 16. Calabar - Tourism & Stays
  {
    id: "biz-16",
    slug: "tinapa-lakeside-hotel-calabar",
    name: "Tinapa Lakeside Hotel & Waterpark",
    tagline: "Picturesque eco-tourism resort on the Calabar River",
    description: "Located within the scenic Tinapa Free Zone. Ideal for weekend family getaways, waterpark enjoyment, Calabar Carnival retreats, and executive corporate strategy conferences.",
    categorySlug: "hotels",
    categoryName: "Hotels & Stays",
    address: "Tinapa Free Zone, Adiabo, Calabar",
    city: "Calabar",
    state: "Cross River",
    lga: "Calabar Municipal",
    latitude: 5.0211,
    longitude: 8.3344,
    phone: "+2348076612233",
    whatsapp: "+2348076612233",
    priceTier: "EXPENSIVE",
    verified: true,
    claimed: false,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "24 Hours",
      "Tuesday": "24 Hours",
      "Wednesday": "24 Hours",
      "Thursday": "24 Hours",
      "Friday": "24 Hours",
      "Saturday": "24 Hours",
      "Sunday": "24 Hours"
    },
    rating: 4.3,
    reviewCount: 95,
    reviews: []
  },

  // 17. Lagos - Quick Casual Dining
  {
    id: "biz-17",
    slug: "the-place-restaurant-ikeja-gra",
    name: "The Place Restaurant & Lounge",
    tagline: "Nigeria's go-to spot for delicious jollof, grilled chicken, and nightlife",
    description: "A household favorite serving freshly prepared Nigerian dishes, fried plantain, spicy grilled chicken, and soups, transitioning into a lively sports lounge in the evening.",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    address: "45 Isaac John St, Ikeja GRA",
    city: "Ikeja GRA",
    state: "Lagos",
    lga: "Ikeja",
    latitude: 6.5891,
    longitude: 3.3582,
    phone: "+2348098007722",
    whatsapp: "+2348098007722",
    priceTier: "MODERATE",
    verified: true,
    claimed: true,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "7:00 AM - 11:00 PM",
      "Tuesday": "7:00 AM - 11:00 PM",
      "Wednesday": "7:00 AM - 11:00 PM",
      "Thursday": "7:00 AM - 12:00 AM",
      "Friday": "7:00 AM - 2:00 AM",
      "Saturday": "7:00 AM - 2:00 AM",
      "Sunday": "8:00 AM - 11:00 PM"
    },
    rating: 4.4,
    reviewCount: 520,
    reviews: []
  },

  // 18. Benin City - Heritage & Dining
  {
    id: "biz-18",
    slug: "mama-ehi-buka-gra-benin",
    name: "Mama Ehi Native Kitchen & Buka",
    tagline: "Authentic Edo Black Soup (Omobe) and Pounded Yam",
    description: "Legendary native dining in Benin City. Famous for rich medicinal Black Soup cooked with ground herbs, bush meat, fresh catfish, and hot pounded yam.",
    categorySlug: "restaurants",
    categoryName: "Restaurants & Bukas",
    address: "24 Boundary Road, GRA Benin",
    city: "GRA Benin",
    state: "Edo",
    lga: "Oredo",
    latitude: 6.3144,
    longitude: 5.6178,
    phone: "+2348051239874",
    whatsapp: "+2348051239874",
    priceTier: "BUDGET",
    verified: true,
    claimed: false,
    featured: false,
    photos: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
    ],
    hours: {
      "Monday": "8:30 AM - 7:00 PM",
      "Tuesday": "8:30 AM - 7:00 PM",
      "Wednesday": "8:30 AM - 7:00 PM",
      "Thursday": "8:30 AM - 7:00 PM",
      "Friday": "8:30 AM - 7:00 PM",
      "Saturday": "8:30 AM - 6:00 PM",
      "Sunday": "Closed"
    },
    rating: 4.8,
    reviewCount: 312,
    reviews: []
  }
];

// Re-generate complementary realistic businesses to complete 50 records across Nigeria
const SAMPLE_CITIES = [
  { city: "Lekki Phase 1", state: "Lagos", lga: "Eti-Osa", lat: 6.4489, lng: 3.4732 },
  { city: "Victoria Island", state: "Lagos", lga: "Eti-Osa", lat: 6.4281, lng: 3.4219 },
  { city: "Ikeja", state: "Lagos", lga: "Ikeja", lat: 6.5956, lng: 3.3421 },
  { city: "Yaba", state: "Lagos", lga: "Lagos Mainland", lat: 6.5025, lng: 3.3765 },
  { city: "Wuse 2", state: "FCT", lga: "Municipal Area Council (AMAC)", lat: 9.0754, lng: 7.4789 },
  { city: "Maitama", state: "FCT", lga: "Municipal Area Council (AMAC)", lat: 9.0888, lng: 7.4877 },
  { city: "Gwarinpa", state: "FCT", lga: "Municipal Area Council (AMAC)", lat: 9.1122, lng: 7.3988 },
  { city: "Old GRA", state: "Rivers", lga: "Port Harcourt", lat: 4.8156, lng: 7.0498 },
  { city: "Trans Amadi", state: "Rivers", lga: "Port Harcourt", lat: 4.8211, lng: 7.0344 },
  { city: "Bodija", state: "Oyo", lga: "Ibadan North", lat: 7.4321, lng: 3.9056 },
  { city: "Independence Layout", state: "Enugu", lga: "Enugu North", lat: 6.4412, lng: 7.5122 },
  { city: "Asaba GRA", state: "Delta", lga: "Oshimili South", lat: 6.1988, lng: 6.7233 },
  { city: "Nasarawa GRA", state: "Kano", lga: "Nasarawa", lat: 12.0022, lng: 8.5411 }
];

const BIZ_TEMPLATES = [
  { name: "Apex Dental Clinic & Implant Centre", categorySlug: "health", categoryName: "Healthcare & Spas", priceTier: "EXPENSIVE" as const, tagline: "Painless dentistry, teeth whitening, and orthodontics", rating: 4.8 },
  { name: "Suya Central & Midnight Lounge", categorySlug: "restaurants", categoryName: "Restaurants & Bukas", priceTier: "BUDGET" as const, tagline: "Spicy tender beef and chicken suya grilled over open coals", rating: 4.7 },
  { name: "Nectar Wellness Spa & Cryotherapy", categorySlug: "health", categoryName: "Healthcare & Spas", priceTier: "EXPENSIVE" as const, tagline: "Deep muscle recovery, facials, and hot stone therapy", rating: 4.9 },
  { name: "Urban Stitch Tailors & Fabrics", categorySlug: "shopping", categoryName: "Fashion & Markets", priceTier: "MODERATE" as const, tagline: "Fast bespoke senator wears, agbada, and ankara creations", rating: 4.6 },
  { name: "Redline Motors & Diagnostics", categorySlug: "automotive", categoryName: "Auto & Repairs", priceTier: "MODERATE" as const, tagline: "Complete vehicle overhaul, panel beating, and oven baking", rating: 4.5 },
  { name: "Prime Legal Chambers & Notary Public", categorySlug: "home-services", categoryName: "Home & Professional", priceTier: "EXPENSIVE" as const, tagline: "Corporate business law, trademarking, and real estate diligence", rating: 4.9 },
  { name: "EcoVolt Solar Energy Engineers", categorySlug: "home-services", categoryName: "Home & Professional", priceTier: "EXPENSIVE" as const, tagline: "Turnkey residential and commercial solar installations", rating: 4.8 },
  { name: "The Velvet Lounge & Cigar Bar", categorySlug: "nightlife", categoryName: "Bars & Nightlife", priceTier: "LUXURY" as const, tagline: "VIP bottle service, rare whiskeys, and curated Afro-jazz", rating: 4.6 },
  { name: "Silicon Hub Co-work & Tech Lab", categorySlug: "coworking", categoryName: "Tech & Co-working", priceTier: "MODERATE" as const, tagline: "Fiber optic internet, ergonomic desks, and meeting rooms", rating: 4.7 },
  { name: "Eko Pearl Luxury Suites", categorySlug: "hotels", categoryName: "Hotels & Stays", priceTier: "LUXURY" as const, tagline: "Waterfront serviced apartments with panoramic skyline views", rating: 4.9 },
  { name: "Golden Crust Artisan Bakery", categorySlug: "restaurants", categoryName: "Restaurants & Bukas", priceTier: "BUDGET" as const, tagline: "Fresh oven-baked brioche, agege bread, and meat pies", rating: 4.7 },
  { name: "Glamour Lash & Nail Studio", categorySlug: "health", categoryName: "Healthcare & Spas", priceTier: "MODERATE" as const, tagline: "Luxury manicure, pedicure, lash extensions, and makeup", rating: 4.8 },
  { name: "Swift Logistics & Cold Chain", categorySlug: "home-services", categoryName: "Home & Professional", priceTier: "MODERATE" as const, tagline: "Same-day nationwide delivery and temperature-controlled dispatch", rating: 4.5 },
  { name: "Naija Harvest Farmers Market", categorySlug: "shopping", categoryName: "Fashion & Markets", priceTier: "BUDGET" as const, tagline: "Farm-fresh organic vegetables, tubers, and fresh meats", rating: 4.6 },
  { name: "Cloud9 Rooftop Bistro & Terrace", categorySlug: "restaurants", categoryName: "Restaurants & Bukas", priceTier: "EXPENSIVE" as const, tagline: "Sunset views, gourmet cocktails, and charcoal-grilled steaks", rating: 4.7 },
  { name: "Heritage Boutique Hotel & Gallery", categorySlug: "hotels", categoryName: "Hotels & Stays", priceTier: "EXPENSIVE" as const, tagline: "Historic architecture with modern five-star comfort", rating: 4.8 }
];

// Generate remainder up to 50
let index = MOCK_BUSINESSES.length + 1;
for (const tmpl of BIZ_TEMPLATES) {
  if (MOCK_BUSINESSES.length >= 50) break;
  for (const loc of SAMPLE_CITIES) {
    if (MOCK_BUSINESSES.length >= 50) break;
    const bizId = `biz-${index}`;
    const slugName = `${tmpl.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${loc.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    
    MOCK_BUSINESSES.push({
      id: bizId,
      slug: slugName,
      name: `${tmpl.name} - ${loc.city}`,
      tagline: tmpl.tagline,
      description: `Premier provider of ${tmpl.categoryName.toLowerCase()} in ${loc.city}, ${loc.state}. Trusted by local residents and corporate clientele with verified standards and customer service.`,
      categorySlug: tmpl.categorySlug,
      categoryName: tmpl.categoryName,
      address: `${10 + (index % 50)} Commercial Avenue, ${loc.city}`,
      city: loc.city,
      state: loc.state,
      lga: loc.lga,
      latitude: loc.lat + (Math.random() * 0.02 - 0.01),
      longitude: loc.lng + (Math.random() * 0.02 - 0.01),
      phone: `+23480${Math.floor(10000000 + Math.random() * 89999999)}`,
      whatsapp: `+23480${Math.floor(10000000 + Math.random() * 89999999)}`,
      website: `https://${slugName}.ng`,
      priceTier: tmpl.priceTier,
      verified: index % 3 === 0,
      claimed: index % 2 === 0,
      featured: index % 7 === 0,
      photos: [
        `https://images.unsplash.com/photo-${1500000000000 + (index * 1234567) % 50000000}?auto=format&fit=crop&w=800&q=80`
      ],
      hours: {
        "Monday": "8:00 AM - 6:00 PM",
        "Tuesday": "8:00 AM - 6:00 PM",
        "Wednesday": "8:00 AM - 6:00 PM",
        "Thursday": "8:00 AM - 6:00 PM",
        "Friday": "8:00 AM - 6:00 PM",
        "Saturday": "9:00 AM - 4:00 PM",
        "Sunday": "Closed"
      },
      rating: +(tmpl.rating - (Math.random() * 0.4)).toFixed(1),
      reviewCount: Math.floor(15 + Math.random() * 250),
      reviews: []
    });
    index++;
  }
}

