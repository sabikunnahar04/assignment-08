
"use client";

import { useState } from "react";
import { BookPlus } from "lucide-react";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AddBookPage = () => {
    const { data: session, isPending } = authClient.useSession();

    const [category, setCategory] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        image: "",
        description: "",
        totalCopies: "",
    });

   
    if (isPending) {
        return <p className="py-20 text-center">Loading...</p>;
    }

    if (!session?.user) {
        redirect("/signin");
    }

    const user = session.user;

  
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!category) {
            toast.error("Please select a category");
            return;
        }

        const bookData = {
            ...formData,
            category,
            totalCopies: Number(formData.totalCopies),
            addedBy: user.email,
            addedByName: user.name,
            dateAdded: new Date().toISOString(),
        };

        try {
            const res = await fetch("http://localhost:8000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookData),
            });

            if (!res.ok) {
                throw new Error("Failed to add book");
            }

            await res.json();

            toast.success("Book added successfully!");

            setFormData({
                title: "",
                author: "",
                image: "",
                description: "",
                totalCopies: "",
            });

            setCategory("");

        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Failed to add book");
        }
    };

    return (
        <main className="min-h-screen bg-[#f4f3ed] px-4 py-12">
            <div className="mx-auto max-w-3xl">

                <div className="mb-8 text-center">
                    <div className="mb-3 inline-flex rounded-full bg-[#173f31] p-4 text-white">
                        <BookPlus size={30} />
                    </div>

                    <h1 className="text-3xl font-bold text-[#173f31]">
                        Add a New Book
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Share a new book with the BookNook community.
                    </p>
                </div>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl text-[#173f31]">
                            Book Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Book Title
                                </label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter book title"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Author Name
                                </label>
                                <Input
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="Enter author name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Category
                                </label>

                                <Select
                                    value={category}
                                    onValueChange={(value) =>
                                        setCategory(value ?? "")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select book category" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Fiction">Fiction</SelectItem>
                                        <SelectItem value="Science">Science</SelectItem>
                                        <SelectItem value="History">History</SelectItem>
                                        <SelectItem value="Kids">Kids</SelectItem>
                                        <SelectItem value="Others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Book Image URL
                                </label>
                                <Input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="Paste book image URL"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Description
                                </label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Write a short description about the book"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Total Copies
                                </label>
                                <Input
                                    type="number"
                                    name="totalCopies"
                                    value={formData.totalCopies}
                                    onChange={handleChange}
                                    placeholder="Enter total copies"
                                    min="1"
                                    required
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Added By
                                    </label>
                                    <Input value={user.name} readOnly disabled />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        User Email
                                    </label>
                                    <Input value={user.email} readOnly disabled />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#173f31] text-white hover:bg-[#245943]"
                            >
                                <BookPlus size={18} />
                                Add Book
                            </Button>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default AddBookPage;
