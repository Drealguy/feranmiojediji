import Image from "next/image";
import type { Book } from "@/lib/books";

/** Book cover: the image if there is one, otherwise a green placeholder with the title. */
export default function BookCover({ book, sizes, priority }: { book: Book; sizes: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-brand">
      {book.cover ? (
        <Image src={book.cover} alt={`Cover of ${book.title}`} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div aria-hidden className="bg-stage-grid absolute inset-0 flex flex-col justify-between p-6 text-cream">
          <p className="text-xs uppercase tracking-[0.06em] text-cream/60">Feranmi Ojediji</p>
          <p className="text-[1.75rem] font-medium leading-[1.05] tracking-[-0.04em]">{book.title}</p>
        </div>
      )}
    </div>
  );
}
