
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface BorrowBookButtonProps {
  bookId: string;
  bookTitle: string;
  bookImage: string;
  totalCopies: number;
  userName: string;
  userEmail: string;
}

const BorrowBookButton = ({
  bookId,
  bookTitle,
  bookImage,
  totalCopies,
  userName,
  userEmail,
}: BorrowBookButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [borrowDate, setBorrowDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBorrow = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (returnDate <= borrowDate) {
      toast.error("Return date must be after borrow date");
      return;
    }

    const borrowData = {
      bookId,
      bookTitle,
      bookImage,
      userEmail,
      borrowDate,
      returnDate,
    };

    try {
      setIsSubmitting(true);

      const res = await fetch("http://localhost:8000/borrows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

      toast.success("Book borrowed successfully!");
      setIsOpen(false);
      setReturnDate("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={totalCopies <= 0}
        className="w-full rounded-lg bg-[#173f31] px-6 py-3 font-semibold text-white transition hover:bg-[#245c45] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {totalCopies > 0 ? "Borrow Book" : "Not Available"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#173f31]">
                Borrow Book
              </h2>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 hover:text-black"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleBorrow} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Book Name
                </label>
                <input
                  value={bookTitle}
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Your Name
                </label>
                <input
                  value={userName}
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Your Email
                </label>
                <input
                  value={userEmail}
                  readOnly
                  className="w-full rounded-lg border bg-gray-100 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Borrow Date
                </label>
                <input
                  type="date"
                  value={borrowDate}
                  onChange={(e) => setBorrowDate(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Return Date
                </label>
                <input
                  type="date"
                  value={returnDate}
                  min={borrowDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  className="w-full rounded-lg border px-3 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#173f31] px-6 py-3 font-semibold text-white hover:bg-[#245c45] disabled:opacity-60"
              >
                {isSubmitting ? "Borrowing..." : "Confirm Borrow"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BorrowBookButton;
