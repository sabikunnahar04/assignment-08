
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

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

  const res = await fetch(
    `http://localhost:8000/my-borrows?email=${encodeURIComponent(session.user.email)}`,
    {
      cache: "no-store",
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

        {borrows.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-semibold text-[#173f31]">
              No borrowed books yet!
            </h2>
            <p className="mt-2 text-gray-500">
              Browse books and borrow your first book.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full text-left">
              <thead className="bg-[#173f31] text-white">
                <tr>
                  <th className="p-4">Book</th>
                  <th className="p-4">Borrow Date</th>
                  <th className="p-4">Return Date</th>
                </tr>
              </thead>

              <tbody>
                {borrows.map((borrow) => (
                  <tr key={borrow._id} className="border-b">
                    <td className="flex items-center gap-3 p-4">
                      <Image
                        src={borrow.bookImage}
                        alt={borrow.bookTitle}
                        width={55}
                        height={70}
                        className="h-16 w-12 rounded object-cover"
                        unoptimized
                      />

                      <span className="font-semibold text-[#173f31]">
                        {borrow.bookTitle}
                      </span>
                    </td>

                    <td className="p-4 text-gray-600">
                      {borrow.borrowDate}
                    </td>

                    <td className="p-4 text-gray-600">
                      {borrow.returnDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyBorrowsPage;
