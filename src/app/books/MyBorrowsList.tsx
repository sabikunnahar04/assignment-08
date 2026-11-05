"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}
interface MyBorrowsListProps {
  borrows: Borrow[];
  jwtToken: string;
}

const MyBorrowsList = ({ borrows , jwtToken}: MyBorrowsListProps) => {
  const [borrowList, setBorrowList] = useState(borrows);
  const [loadingId, setLoadingId] = useState("");

  const handleReturn = async (id: string) => {
    setLoadingId(id);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/borrows/${id}`,
        {
          method: "DELETE",
          headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to return book");
        return;
      }

      setBorrowList((previous) =>
        previous.filter((borrow) => borrow._id !== id)
      );

      toast.success("Book returned successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoadingId("");
    }
  };

  if (borrowList.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        <h2 className="text-xl font-semibold text-[#173f31]">
          No borrowed books yet!
        </h2>
        <p className="mt-2 text-gray-500">
          Browse books and borrow your first book.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="w-full text-left">
        <thead className="bg-[#173f31] text-white">
          <tr>
            <th className="p-4">Book</th>
            <th className="p-4">Borrow Date</th>
            <th className="p-4">Return Date</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {borrowList.map((borrow) => (
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

              <td className="p-4">
                <button
                  onClick={() => handleReturn(borrow._id)}
                  disabled={loadingId === borrow._id}
                  className="rounded-lg bg-[#173f31] px-4 py-2 text-sm font-semibold text-white hover:bg-[#245c45] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingId === borrow._id
                    ? "Returning..."
                    : "Return Book"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBorrowsList;