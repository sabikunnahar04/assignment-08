import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MyBooksList from "../books/MyBooksList";


interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  category: string;
  totalCopies: number;
}

const MyBooksPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const res = await fetch(
    `http://localhost:8000/my-books?email=${encodeURIComponent(
      session.user.email
    )}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch my books");
  }

  const books: Book[] = await res.json();

  return (
    <main className="min-h-screen bg-[#f4f3ed] px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-[#173f31]">
          My Books
        </h1>

        <p className="mb-8 text-gray-600">
          Manage the books you have added.
        </p>

        <MyBooksList
          books={books}
          userEmail={session.user.email}
        />
      </div>
    </main>
  );
};

export default MyBooksPage;