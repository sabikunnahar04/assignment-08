"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface Book {
  _id: string;
  title: string;
  author: string;
  image: string;
  description: string;
  category: string;
  totalCopies: number;
}

interface MyBooksListProps {
  books: Book[];
  userEmail: string;
}

const MyBooksList = ({ books, userEmail }: MyBooksListProps) => {
  const [bookList, setBookList] = useState(books);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: "",
    description: "",
    category: "",
    totalCopies: "",
  });


  const handleEdit = (book: Book) => {
    setEditingBook(book);

    setFormData({
      title: book.title,
      author: book.author,
      image: book.image,
      description: book.description,
      category: book.category,
      totalCopies: String(book.totalCopies),
    });
  };

 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingBook) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/books/${editingBook._id}?email=${encodeURIComponent(userEmail)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            totalCopies: Number(formData.totalCopies),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update book");
        return;
      }

      setBookList((prev) =>
        prev.map((book) =>
          book._id === editingBook._id
            ? {
                ...book,
                ...formData,
                totalCopies: Number(formData.totalCopies),
              }
            : book
        )
      );

      toast.success("Book updated successfully!");
      setEditingBook(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

 
  const handleDelete = async () => {
    if (!deletingBook) return;

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/books/${deletingBook._id}?email=${encodeURIComponent(userEmail)}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete book");
        return;
      }

      setBookList((prev) =>
        prev.filter((book) => book._id !== deletingBook._id)
      );

      toast.success("Book deleted successfully!");
      setDeletingBook(null);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {bookList.length === 0 ? (
        <p className="rounded-xl bg-white p-10 text-center">
          You havent added any books yet!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bookList.map((book) => (
            <div
              key={book._id}
              className="rounded-xl bg-white p-5 shadow"
            >
              <Image
                src={book.image}
                alt={book.title}
                width={300}
                height={350}
                className="h-64 w-full rounded-lg object-contain"
                unoptimized
              />

              <h2 className="mt-4 text-xl font-bold text-[#173f31]">
                {book.title}
              </h2>

              <p className="mt-1 text-gray-600">
                By {book.author}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Category: {book.category}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Available Copies: {book.totalCopies}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => handleEdit(book)}
                  className="flex-1 rounded-lg bg-[#173f31] px-4 py-2 font-semibold text-white hover:bg-[#245943]"
                >
                  Edit
                </button>

                <button
                  onClick={() => setDeletingBook(book)}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {editingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-5 text-2xl font-bold text-[#173f31]">
              Edit Book
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Book Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Author
                </label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  required
                  className="w-full rounded-lg border p-2"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Total Copies
                </label>
                <input
                  type="number"
                  name="totalCopies"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full rounded-lg border p-2"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingBook(null)}
                  disabled={loading}
                  className="flex-1 rounded-lg border px-4 py-2 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[#173f31] px-4 py-2 font-semibold text-white disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

     
      {deletingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-[#173f31]">
              Delete Book?
            </h2>

            <p className="my-4 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#173f31]">
                {deletingBook.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeletingBook(null)}
                disabled={loading}
                className="flex-1 rounded-lg border px-4 py-2 font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyBooksList;