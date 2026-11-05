
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BorrowBookButton from "../BorrowBookButton";

interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  category: string;
  description: string;
  totalCopies: number;
}

const BookDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

 
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const res = await fetch(`http://localhost:8000/books/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch book details");
  }

  const book: Book = await res.json();

  const borrowRes = await fetch(
  `http://localhost:8000/my-borrows?email=${encodeURIComponent(session.user.email)}`,
  { cache: "no-store" }
);

const borrows = await borrowRes.json();

const alreadyBorrowed = borrows.some(
  (borrow: { bookId: string }) => borrow.bookId === book._id
);

  if (!book) {
    return <p className="py-20 text-center">Book not found!</p>;
  }

  return (
    <main className="min-h-screen bg-[#f4f3ed] px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-[#173f31]"
        >
          <ArrowLeft size={18} />
          Back to All Books
        </Link>

        <div className="grid overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">
          <div className="flex items-center justify-center bg-gray-100 p-8">
            <Image
              src={book.image}
              alt={book.title}
              width={400}
              height={550}
              className="max-h-[500px] w-full rounded-lg object-contain"
              unoptimized
            />
          </div>

          <div className="flex flex-col justify-center space-y-5 p-8 md:p-10">
            <span className="w-fit rounded-full bg-[#e8eee9] px-4 py-1.5 text-sm font-semibold text-[#245c45]">
              {book.category}
            </span>

            <h1 className="text-3xl font-bold text-[#173f31]">
              {book.title}
            </h1>

            <p className="text-gray-500">
              By{" "}
              <span className="font-semibold text-gray-700">
                {book.author}
              </span>
            </p>

            <div>
              <h2 className="mb-2 flex items-center gap-2 font-bold text-[#173f31]">
                <BookOpen size={20} />
                About This Book
              </h2>
              <p className="leading-7 text-gray-600">
                {book.description}
              </p>
            </div>

            <p className="font-medium text-gray-600">
              Available Copies: {book.totalCopies}
            </p>

            <BorrowBookButton
              bookId={book._id}
              bookTitle={book.title}
              bookImage={book.image}
              alreadyBorrowed={alreadyBorrowed}
              totalCopies={book.totalCopies}
              userName={session.user.name}
              userEmail={session.user.email}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;
