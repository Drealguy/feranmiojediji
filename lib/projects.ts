export interface CaseStudySection {
  /** e.g. "The problem", "The solution", "My role". */
  title: string;
  paragraphs: string[];
}

export interface Feature {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  /** Short label shown as a badge next to the title, e.g. "Website", "Software". */
  category: string;
  /** "Live" shows a green dot; the others show a neutral one. */
  status: "Live" | "Selected work" | "In development";
  /** Cover image in /public, used on project cards. */
  image?: string;
  /** CSS object-position for the cover, to frame the best part of the image. */
  imagePosition?: string;
  /** Live site. Shown as "Visit website" on the case study. */
  href?: string;

  // Case study (/projects/[slug]). Every field is optional: sections without content are left out.
  /** Headline after the name, e.g. "Paste HTML and get a shareable URL in seconds." */
  summary?: string;
  year?: string;
  client?: string;
  role?: string;
  /** Slideshow images in /public. Falls back to `image`. Advances on its own when there's more than one. */
  gallery?: string[];
  /** Opening paragraph under the slideshow. */
  intro?: string;
  sections?: CaseStudySection[];
  features?: Feature[];
}

export const projects: Project[] = [
  {
    slug: "athenisec",
    title: "Athenisec",
    description: "A conversion focused website for a cybersecurity compliance company serving regulated businesses.",
    category: "Website",
    status: "Live",
    image: "/projects/athenisec/1.jpg",
    href: "https://athenisec.com",

    summary: "Clarifying a complex cybersecurity offer for regulated, high growth companies.",
    client: "Athenisec",
    role: "Website design & development",
    gallery: [
      "/projects/athenisec/1.jpg",
      "/projects/athenisec/2.jpg",
      "/projects/athenisec/3.jpg",
      "/projects/athenisec/4.jpg",
      "/projects/athenisec/5.jpg",
    ],
    intro:
      "Athenisec provides cybersecurity compliance services for SaaS, fintech, health tech, government and enterprise teams. I shaped its expertise into a clear website that helps decision makers understand the offer and move toward a consultation.",
    sections: [
      {
        title: "The problem",
        paragraphs: [
          "Cybersecurity compliance is technical, high stakes and difficult to explain quickly. Athenisec needed a web presence that could communicate its range of services and supported frameworks without overwhelming the business leaders evaluating them.",
        ],
      },
      {
        title: "The solution",
        paragraphs: [
          "I designed and developed a structured marketing website around the questions prospective clients need answered: who Athenisec serves, which frameworks it supports, how its services work and why teams can trust it with ongoing compliance. Clear pathways connect that information to consultation focused calls to action.",
        ],
      },
      {
        title: "My role",
        paragraphs: [
          "I translated the business offer into the website experience, working across information structure, interface design and frontend development. The result brings strategy, design and implementation together in one coherent system.",
        ],
      },
    ],
    features: [
      {
        title: "Service led information architecture",
        body: "Compliance operations, compliance engineering, managed cybersecurity and risk assessments are organised so visitors can quickly find the support relevant to them.",
      },
      {
        title: "Industry and framework pathways",
        body: "Dedicated pathways make it easier for prospects to explore Athenisec by industry or by frameworks such as SOC 2, HIPAA, ISO 27001, PCI DSS, GDPR and CMMC 2.0.",
      },
      {
        title: "Consultation focused journey",
        body: "Clear calls to action guide qualified visitors from understanding the offer to starting a conversation with the Athenisec team.",
      },
    ],
  },
  {
    slug: "vindicate-fx-academy",
    title: "Vindicate FX Academy",
    description: "A complete e learning platform for selling trading education, delivering courses and managing the student experience.",
    category: "E learning platform",
    status: "Live",
    href: "https://vindicatefxacademy.com",
    image: "/projects/vindicate-fx-academy/1.jpg",
    gallery: [
      "/projects/vindicate-fx-academy/1.jpg",
      "/projects/vindicate-fx-academy/2.jpg",
      "/projects/vindicate-fx-academy/3.jpg",
      "/projects/vindicate-fx-academy/4.jpg",
      "/projects/vindicate-fx-academy/5.jpg",
      "/projects/vindicate-fx-academy/6.jpg",
      "/projects/vindicate-fx-academy/7.jpg",
    ],
    summary: "Bringing course sales, learning, community and academy operations into one connected product.",
    client: "Vindicate FX Academy",
    role: "Product design & full stack development",
    intro:
      "Vindicate FX Academy is a complete education product built for trading educator Clement Bolarinwa. I designed and developed the public marketing experience, student learning portal, administration system and the backend services that connect enrollment, payments, courses and student progress.",
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "The academy needed one dependable system for attracting prospective students, accepting payments, delivering protected course content and managing learners after enrollment. Relying on disconnected tools would make the experience harder for students and create more operational work for the academy.",
        ],
      },
      {
        title: "The solution",
        paragraphs: [
          "I built a connected platform with three focused experiences: a marketing site for course discovery and sales, a student portal for learning and support, and an admin console for managing users, access, courses, lessons and academy content.",
          "The product connects secure authentication, Stripe payments, course enrollment, video and file delivery, learning progress, certificates, resources, community access, coaching and student support through a shared backend and PostgreSQL database.",
        ],
      },
      {
        title: "My role",
        paragraphs: [
          "I worked across product strategy, user experience, interface design, frontend development and backend architecture. I designed how the public site, student dashboard and admin tools work together, then built the systems required to operate the academy as a complete digital product.",
        ],
      },
    ],
    features: [
      {
        title: "Course delivery and progress",
        body: "Students can access structured courses, modules, video lessons, written content and downloadable resources while the platform records their progress and completion.",
      },
      {
        title: "Enrollment and payments",
        body: "Stripe checkout connects purchases to student access, supports different enrollment plans and gives administrators control over manual access and enrollment status.",
      },
      {
        title: "Student dashboard",
        body: "One focused portal brings together learning, certificates, resources, community links, coaching, account settings, notifications and support.",
      },
      {
        title: "Academy administration",
        body: "The admin console supports student management, access control, course creation, module and lesson management, content updates and platform operations.",
      },
      {
        title: "Secure content infrastructure",
        body: "Protected video playback, controlled file access, server stored sessions, email verification and role based permissions help keep paid learning content and student accounts secure.",
      },
    ],
  },
  {
    // Details taken from the live site (showya.shop). TODO: confirm role and add the story sections.
    slug: "showya",
    title: "Showya",
    description: "Digital menus, branded websites and simple ordering for food businesses.",
    category: "Software",
    status: "Live",
    href: "https://showya.shop",
    image: "/projects/showya/1.jpg",
    gallery: [
      "/projects/showya/1.jpg",
      "/projects/showya/2.jpg",
      "/projects/showya/3.jpg",
      "/projects/showya/4.jpg",
      "/projects/showya/5.jpg",
    ],
    summary: "Helping food businesses show up online with digital menus and simpler ordering.",
    client: "Showya",
    role: "Product design & development",
    intro:
      "Showya gives restaurants, food vendors, caterers, canteens and private chefs a better way to show up online: a digital menu, a branded website and an easier way for customers to order, including through WhatsApp. Each business gets a done-for-you setup for a one-time fee, with no monthly charges.",
    features: [
      {
        title: "Digital menus",
        body: "Easy-to-browse menus that display a business's meals, products and prices.",
      },
      {
        title: "Branded websites",
        body: "A professional online home that customers can visit and trust.",
      },
      {
        title: "Easier ordering",
        body: "Customers choose what they want and send complete orders without the back-and-forth.",
      },
      {
        title: "Done-for-you setup",
        body: "Everything is designed and set up for the business, with 12 months of hosting included.",
      },
    ],
  },
  {
    slug: "btf-initiative",
    title: "BTF Initiative",
    description: "A story driven website for an initiative supporting Nigerian small business owners as they rebuild after setbacks.",
    category: "Nonprofit website",
    status: "Live",
    image: "/projects/btf-initiative/1.jpg",
    href: "https://btfinitiative.vercel.app/",
    gallery: [
      "/projects/btf-initiative/1.jpg",
      "/projects/btf-initiative/2.jpg",
      "/projects/btf-initiative/3.jpg",
      "/projects/btf-initiative/4.jpg",
      "/projects/btf-initiative/5.jpg",
    ],
    summary: "A compassionate digital platform built around resilience, practical support and second chances.",
    client: "Beyond The Fall Initiative",
    role: "Website design & development",
    intro:
      "Beyond The Fall Initiative was created to help small business owners in Nigeria recover from financial and business setbacks. I translated that mission into a distinctive digital experience that balances emotional storytelling with clear paths to learn, seek support and get involved.",
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "The initiative needed a website that could discuss difficult personal and business setbacks with dignity. It also needed to build trust, communicate its purpose clearly and make the next step feel approachable for people asking for help.",
        ],
      },
      {
        title: "The solution",
        paragraphs: [
          "I created a warm, editorial website around the idea that a fall should not be the end of someone's story. The experience introduces the mission, founder and values, presents stories of resilience and guides small business owners through a focused support journey.",
        ],
      },
      {
        title: "My role",
        paragraphs: [
          "I worked across the visual direction, design system, responsive interface and frontend development. I built the homepage, story and impact experiences, supporting pages, reusable components, motion system and the guided support application interface.",
        ],
      },
    ],
    features: [
      {
        title: "Mission led storytelling",
        body: "Editorial layouts, photography and structured story sections communicate the initiative's purpose through people, setbacks and the possibility of recovery.",
      },
      {
        title: "Guided support journey",
        body: "A step by step application interface makes it easier for business owners to explain their situation and the kind of support they may need.",
      },
      {
        title: "Distinctive design system",
        body: "Custom typography, warm brand colours, textured surfaces and reusable interface components give the initiative a recognisable and consistent identity.",
      },
      {
        title: "Responsive motion experience",
        body: "Thoughtful page reveals, smooth scrolling and carefully tested layouts create an expressive experience while respecting reduced motion preferences.",
      },
    ],
  },
  {
    slug: "lex-habitae",
    title: "Lex Habitae",
    description: "A complete digital presence for an Abuja law firm providing corporate, regulatory and commercial advisory services.",
    category: "Business website",
    status: "Live",
    href: "https://lexhabitae.vercel.app/",
    image: "/projects/lex-habitae/1.jpg",
    gallery: [
      "/projects/lex-habitae/1.jpg",
      "/projects/lex-habitae/2.jpg",
      "/projects/lex-habitae/3.jpg",
      "/projects/lex-habitae/4.jpg",
      "/projects/lex-habitae/5.jpg",
    ],
    summary: "Turning a specialist legal practice into a clear, credible and useful digital experience.",
    client: "Lex Habitae Solicitors",
    role: "Website design & development",
    intro:
      "Lex Habitae Solicitors needed more than a brochure website. I designed and built a complete digital experience that communicates the firm's expertise, helps prospective clients explore its services and provides a structured path to booking a consultation.",
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "Legal services depend on trust, clarity and professional credibility. The website needed to explain complex corporate and regulatory services in a way that business clients could understand while presenting the firm with the confidence expected of an established legal practice.",
        ],
      },
      {
        title: "The solution",
        paragraphs: [
          "I created a responsive website around the firm's core practice areas: corporate and regulatory advisory, due diligence and compliance, and commercial advisory. The experience combines strong editorial layouts, clear service pathways, team information, legal insights and a guided consultation process.",
        ],
      },
      {
        title: "My role",
        paragraphs: [
          "I worked across the information architecture, interface design and frontend development. I also built the reusable design system, responsive interactions, consultation flow, search focused page structure and the light and dark theme experience.",
        ],
      },
    ],
    features: [
      {
        title: "Practice area experience",
        body: "Dedicated service content helps visitors understand the firm's corporate, compliance and commercial advisory capabilities.",
      },
      {
        title: "Consultation booking flow",
        body: "A guided form collects the prospective client's details, matter information and payment confirmation before the firm follows up with a booking link.",
      },
      {
        title: "Legal insights and SEO",
        body: "Structured article pages, page metadata, search engine files and legal service data create a stronger foundation for discoverability and authority.",
      },
      {
        title: "Responsive theme system",
        body: "The reusable interface supports light and dark modes, accessible motion preferences and layouts designed to work across screen sizes.",
      },
    ],
  },
  {
    slug: "billam",
    title: "Billam",
    description: "An invoicing SaaS product designed to help businesses create and manage invoices with less friction.",
    category: "Software",
    status: "Live",
    href: "https://billam-gules.vercel.app/",
    image: "/projects/billam/1.jpg",
    gallery: [
      "/projects/billam/1.jpg",
      "/projects/billam/2.jpg",
      "/projects/billam/3.jpg",
      "/projects/billam/4.jpg",
      "/projects/billam/5.jpg",
    ],
    summary: "Making everyday invoicing simpler for small businesses and independent professionals.",
    client: "Independent product",
    role: "Product strategy, design & development",
    intro:
      "Billam is an invoicing software product I worked on across product thinking, interface design and development. It reflects my interest in turning repetitive business processes into focused, usable software.",
  },
  {
    slug: "etandtours",
    title: "ETandTOURS",
    description: "A responsive travel agency platform for discovering destinations, exploring services, searching flights and starting bookings.",
    category: "Travel website",
    status: "Live",
    href: "https://etandtours.vercel.app/",
    image: "/projects/etandtours/1.jpg",
    gallery: [
      "/projects/etandtours/1.jpg",
      "/projects/etandtours/2.jpg",
      "/projects/etandtours/3.jpg",
      "/projects/etandtours/4.jpg",
      "/projects/etandtours/5.jpg",
      "/projects/etandtours/6.jpg",
    ],
    summary: "Turning a boutique travel agency into a clear and convenient digital booking experience.",
    client: "Elyon Travels & Tours",
    role: "Website design & development",
    intro:
      "ETandTOURS is a travel agency website built for Elyon Travels & Tours in Lekki, Lagos. I created a complete digital experience that helps travellers explore services and destinations, search for flights and move from interest to a direct booking conversation on WhatsApp.",
    sections: [
      {
        title: "The challenge",
        paragraphs: [
          "The agency needed a professional online presence that could present a wide range of travel services without making the experience feel complicated. It also needed a practical route from browsing to enquiry while important details such as package pricing and custom trip requirements could vary between travellers.",
        ],
      },
      {
        title: "The solution",
        paragraphs: [
          "I designed and developed a responsive travel platform organised around services, destinations and clear booking actions. Visitors can explore road trips, international vacations, flights, hotels, car rentals, visa assistance and custom tours, then continue with a relevant enquiry through WhatsApp.",
          "The platform also includes destination pages, a guided contact experience, flight search, legal pages, dark mode and a reusable design system that keeps the visual experience consistent throughout the website.",
        ],
      },
      {
        title: "My role",
        paragraphs: [
          "I worked across brand translation, information architecture, interface design and frontend development. I created the responsive component system, organised the agency's content, developed the booking journeys and built the technical foundation for search visibility and future growth.",
        ],
      },
    ],
    features: [
      {
        title: "Travel service discovery",
        body: "A structured service experience presents road trips, vacation packages, flights, hotels, car rentals, visa assistance and group or solo tours clearly.",
      },
      {
        title: "Destination inspiration",
        body: "Dedicated destination cards help travellers explore regional road trips and international vacation ideas before starting an enquiry.",
      },
      {
        title: "Flight search experience",
        body: "Travellers can search by route, date and passenger details, review available options and continue the booking conversation with the agency.",
      },
      {
        title: "WhatsApp booking journeys",
        body: "Service, destination, contact and flight enquiries open WhatsApp with useful trip information already prepared for the agency.",
      },
      {
        title: "Responsive design system",
        body: "Reusable components, consistent spacing, accessible colour choices and light and dark themes keep the experience polished across mobile and desktop screens.",
      },
      {
        title: "Search and trust foundation",
        body: "Page metadata, structured business information, frequently asked questions, privacy content and terms create a stronger foundation for search visibility and customer confidence.",
      },
    ],
  },
  {
    slug: "proplink",
    title: "Proplink",
    description: "An independent digital product concept shaped through strategy and interface design.",
    category: "Product concept",
    status: "Selected work",
    summary: "Exploring how a focused concept can become a useful digital experience.",
    client: "Independent product",
    role: "Product strategy & design",
    intro:
      "Proplink represents the kind of early stage product idea I enjoy shaping: clarifying the direction, organising the experience and turning the concept into something people can understand and use.",
  },
];
