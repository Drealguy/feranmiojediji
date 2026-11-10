import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookCover from "@/components/BookCover";
import { books, buyLink, isFree } from "@/lib/books";

function getBook(slug: string) {
  return books.find((b) => b.slug === slug);
}

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps<"/books/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return {};
  return {
    title: `${book.title} | Books | Feranmi Ojediji`,
    description: book.description,
    openGraph: book.cover ? { images: [{ url: book.cover }] } : undefined,
  };
}

export default async function BookPage({ params }: PageProps<"/books/[slug]">) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const free = isFree(book);
  const details = [
    { label: "Format", value: book.format },
    { label: "Pages", value: book.pages ? String(book.pages) : undefined },
    { label: "Price", value: book.price },
  ].filter((d): d is { label: string; value: string } => Boolean(d.value));

  return (
    <article>
      <div className="px-4 pt-10 sm:px-8 sm:pt-14 lg:px-12">
        <Link
          href="/books"
          className="focus-ring group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transition-none">
            ←
          </span>
          All books
        </Link>
      </div>

      <div className="grid gap-10 px-4 pt-10 pb-16 sm:px-8 sm:pb-24 md:grid-cols-[minmax(0,26rem)_1fr] md:items-start md:gap-16 lg:px-12">
        {/* Cover stays in view while you read on large screens. */}
        <div data-reveal className="mx-auto w-full max-w-[22rem] md:sticky md:top-28 md:max-w-none">
          <BookCover book={book} sizes="(min-width: 768px) 26rem, 90vw" priority />
        </div>

        <div>
          <p className="text-sm text-ink-soft">Book</p>
          <h1 data-split-lines className="mt-4 text-[2.5rem] font-medium leading-[1.02] tracking-[-0.045em] sm:text-[3.5rem]">
            {book.title}
          </h1>
          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">{book.description}</p>

          {/* Price and buy */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-line py-6">
            <p className="text-[2.25rem] font-medium leading-none tracking-[-0.04em]">{book.price}</p>
            <a
              href={buyLink(book)}
              target="_blank"
              rel="noreferrer"
              className="focus-ring group inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 text-[0.9375rem] font-medium text-cream transition-colors hover:bg-brand/90"
            >
              {free ? "Download free" : "Buy the book"}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none">
                →
              </span>
            </a>
            {!book.href && !free && (
              <p className="w-full text-sm text-ink-soft">You&apos;ll pay and get the book through WhatsApp.</p>
            )}
          </div>

          {details.length > 0 && (
            <dl className="grid grid-cols-3 border-b border-line">
              {details.map((d, i) => (
                <div key={d.label} className={`py-5 ${i > 0 ? "border-l border-line pl-5" : ""}`}>
                  <dt className="text-xs uppercase tracking-[0.06em] text-ink-soft">{d.label}</dt>
                  <dd className="mt-2 text-[0.9375rem] font-medium">{d.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <section className="mt-12">
            <h2 className="text-[1.5rem] font-medium tracking-[-0.03em]">About this book</h2>
            <div className="mt-4 max-w-[60ch] space-y-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              {book.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {book.inside?.length ? (
            <section className="mt-12">
              <h2 className="text-[1.5rem] font-medium tracking-[-0.03em]">What&apos;s inside</h2>
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {book.inside.map((item, i) => (
                  <li key={item + i} className="flex items-baseline gap-5 py-4 text-[1.0625rem]">
                    <span className="w-6 shrink-0 text-sm text-ink-soft tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
