export interface Book {
  slug: string;
  title: string;
  /** One line, shown on the card and under the title. */
  description: string;
  /** Cover image in /public, portrait (3:4). Leave out to show a plain placeholder cover. */
  cover?: string;
  /** e.g. "Free", "₦5,000". */
  price: string;
  /** e.g. "Ebook · PDF". */
  format?: string;
  pages?: number;
  /** "About this book" paragraphs on the book's page. */
  about: string[];
  /** "What's inside" list on the book's page. */
  inside?: string[];
  /** Payment or download link (Paystack, Selar, Gumroad, Google Drive…). Without it, the button opens WhatsApp to buy. */
  href?: string;
}

export const WHATSAPP_NUMBER = "2349167802170";

/** Where the buy button goes: the payment link if there is one, otherwise a WhatsApp message. */
export function buyLink(book: Book) {
  if (book.href) return book.href;
  const text = `Hi Feranmi, I'd like to get your book "${book.title}" (${book.price}).`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const isFree = (book: Book) => book.price.trim().toLowerCase() === "free";

// TODO: replace these placeholders with your real books.
export const books: Book[] = [
  {
    slug: "book-one",
    title: "Book title",
    description: "One line on what the reader learns from this book.",
    price: "Free",
    format: "Ebook · PDF",
    pages: 40,
    about: [
      "A short paragraph on who this book is for and the problem it helps them solve.",
      "A second paragraph on what makes it different, and what the reader can do after finishing it.",
    ],
    inside: ["Chapter or topic one", "Chapter or topic two", "Chapter or topic three"],
  },
  {
    slug: "book-two",
    title: "Book title",
    description: "One line on what the reader learns from this book.",
    price: "₦0,000",
    format: "Ebook · PDF",
    pages: 80,
    about: [
      "A short paragraph on who this book is for and the problem it helps them solve.",
      "A second paragraph on what makes it different, and what the reader can do after finishing it.",
    ],
    inside: ["Chapter or topic one", "Chapter or topic two", "Chapter or topic three"],
  },
];
