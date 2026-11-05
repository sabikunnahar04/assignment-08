import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MyBorrowsList from "../books/MyBorrowsList";


interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}

const MyBorrowsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
if (!session?.user) {
  redirect("/signin");
}
 const jwtToken = await auth.api.getToken({
  headers: await headers(),
});

  const res = await fetch(
    `http://localhost:8000/my-borrows?email=${encodeURIComponent(
      session.user.email
    )}`,
   {
  cache: "no-store",
  headers: {
    Authorization: `Bearer ${jwtToken?.token}`,
  },
}
  );

  if (!res.ok) {
    throw new Error("Failed to fetch borrowed books");
  }

  const borrows: Borrow[] = await res.json();

  return (
    <main className="min-h-screen bg-[#f4f3ed] px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-[#173f31]">
          My Borrowed Books
        </h1>

        <p className="mb-8 text-gray-600">
          Books you have borrowed from BookNook.
        </p>

        <MyBorrowsList 
        borrows={borrows} 
        jwtToken={jwtToken?.token ?? ""}
        />
      </div>
    </main>
  );
};

export default MyBorrowsPage;