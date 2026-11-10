import type { Metadata } from "next";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { books } from "@/lib/books";

export const metadata: Metadata = {
  title: "Books | Feranmi Ojediji",
  description: "Books and guides by Feranmi Ojediji on building software, design and getting things shipped.",
};

export default function BooksPage() {
  return (
    <>
      <section aria-labelledby="books-heading" className="px-4 pt-20 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-20 lg:px-12">
        <p className="text-sm text-ink-soft">Learn</p>
        <h1
          id="books-heading"
          data-split-lines
          className="mx-auto mt-5 max-w-[14ch] text-[2.75rem] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[4.5rem]"
        >
          My books.
        </h1>
        <p data-reveal className="mx-auto mt-6 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">
          What I&apos;ve learned building software and products, written down so you can learn it faster.
        </p>
      </section>

      <section aria-label="All books">
        <div className="flex h-14 items-center justify-between gap-4 border-y border-line px-4 sm:px-7">
          <h2 className="text-sm text-ink-soft">All books</h2>
          <p className="text-sm text-ink-soft">
            {books.length} {books.length === 1 ? "title" : "titles"}
          </p>
        </div>

        <ul data-reveal-stagger className="grid sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => (
            <li key={b.slug} className="border-b border-line sm:border-r">
              <Link href={`/books/${b.slug}`} className="focus-ring group flex h-full flex-col p-4 sm:p-5">
                <div className="transition-transform duration-500 group-hover:-translate-y-1 motion-reduce:transition-none">
                  <BookCover book={b} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-medium tracking-[-0.02em]">{b.title}</h3>
                  <span className="rounded-md bg-brand px-2 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-cream">
                    {b.price}
                  </span>
                </div>
                {b.format && <p className="mt-2 text-sm text-ink-soft">{b.format}</p>}
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{b.description}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium">
                  About this book
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
                    →
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="h-16 sm:h-24" />
    </>
  );
}
