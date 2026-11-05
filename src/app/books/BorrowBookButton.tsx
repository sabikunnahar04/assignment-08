
"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface BorrowBookButtonProps {
  bookId: string;
  bookTitle: string;
  bookImage: string;
  totalCopies: number;
  alreadyBorrowed: boolean;
  userName: string;
  userEmail: string;
  jwtToken: string;
}

const BorrowBookButton = ({
  bookId,
  bookTitle,
  bookImage,
  totalCopies,
  alreadyBorrowed,
  userName,
  userEmail,
  jwtToken,
}: BorrowBookButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  
  const [availableCopies, setAvailableCopies] = useState(totalCopies);


  const [hasBorrowed, setHasBorrowed] = useState(alreadyBorrowed);

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

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
        method: "POST",
        headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${jwtToken}`,
},
        body: JSON.stringify(borrowData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to borrow book");
      }

     
      setAvailableCopies((prev) => Math.max(0, prev - 1));
      setHasBorrowed(true);

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
      <p className="font-medium text-gray-600">
        Available Copies: {availableCopies}
      </p>

      <button
        onClick={() => setIsOpen(true)}
        disabled={availableCopies <= 0 || hasBorrowed}
        className="w-full rounded-lg bg-[#173f31] px-6 py-3 font-semibold text-white transition hover:bg-[#245c45] disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {hasBorrowed
          ? "Already Borrowed"
          : availableCopies <= 0
            ? "Not Available"
            : "Borrow Book"}
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
