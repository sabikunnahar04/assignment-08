
import Link from "next/link";
import { BookOpen } from "lucide-react";
import Image from "next/image";

interface Book {
    _id: string;
    title: string;
    author: string;
    image: string;
    category: string;
}

const NewArrivals = async () => {
    let books: Book[] = [];

    try {
        const res = await fetch("http://localhost:8000/books", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch books");
        }

        books = await res.json();
    } catch (error) {
        console.error("Books fetch error:", error);
    }

    return (
        <section className="bg-[#f4f3ed] px-5 py-16">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="mb-10 text-center">
                    <p className="mb-2 font-semibold text-[#b58b50]">
                        DISCOVER YOUR NEXT READ
                    </p>

                    <h2 className="text-3xl font-bold text-[#173f31] md:text-4xl">
                        New Arrivals
                    </h2>

                    <p className="mt-3 text-gray-600">
                        Explore the latest books added to our collection.
                    </p>
                </div>

                
                {books.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="h-64 overflow-hidden bg-gray-100">
                                    

                                    <Image
                                        src={book.image}
                                        alt={book.title}
                                        width={400}
                                        height={500}
                                        className="h-64 w-full object-cover"
                                        unoptimized
                                    />
                                </div>

                                <div className="space-y-3 p-5">
                                    <span className="inline-block rounded-full bg-[#e8eee9] px-3 py-1 text-xs font-semibold text-[#245c45]">
                                        {book.category}
                                    </span>

                                    <h3 className="text-xl font-bold text-[#173f31]">
                                        {book.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        By {book.author}
                                    </p>

                                    <Link
                                        href={`/books/${book._id}`}
                                        className="inline-block rounded-lg bg-[#173f31] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#245943]"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-xl bg-white py-12 text-center">
                        <BookOpen className="mx-auto mb-3 text-[#245c45]" size={40} />
                        <p className="text-gray-600">
                            No books available yet.
                        </p>
                    </div>
                )}

                
                <div className="mt-10 text-center">
                    <Link
                        href="/books"
                        className="inline-block rounded-lg border-2 border-[#173f31] px-7 py-3 font-semibold text-[#173f31] transition hover:bg-[#173f31] hover:text-white"
                    >
                        See All Books
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default NewArrivals;
