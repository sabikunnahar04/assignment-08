
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { UserRound, Mail, BookOpen, ArrowLeft } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries()) as {
            name: string;
        };

        if (!user.name.trim()) {
            toast.error("Please enter your name");
            return;
        }

        const { error } = await authClient.updateUser({
            name: user.name,
        });

        if (error) {
            toast.error(error.message || "Name update failed");
            return;
        }

        toast.success("Profile updated successfully!");
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <p className="text-muted-foreground">Loading profile...</p>
            </div>
        );
    }

    if (!session?.user) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <p className="mb-4">Please sign in to view your profile.</p>
                        <Link href="/signin">
                            <Button>
                                Sign In
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <main className="min-h-[80vh] bg-muted/30 px-4 py-12">
            <div className="mx-auto max-w-2xl">
                <Link
                    href="/"
                    className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                <Card className="overflow-hidden border-none shadow-lg">
                    <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-500" />

                    <CardHeader className="-mt-14 items-center text-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-emerald-100 text-emerald-700 shadow-md">
                            {session.user.image ? (
                                <Image
                                    src={session.user.image}
                                    alt={session.user.name}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <UserRound size={42} />
                            )}
                        </div>

                        <CardTitle className="mt-3 text-2xl">
                            {session.user.name}
                        </CardTitle>

                        <CardDescription>
                            Welcome to your BookNook profile
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="px-6 pb-8 sm:px-10">
                        <div className="mb-6 flex items-center justify-center gap-2 text-sm font-medium text-emerald-700">
                            <BookOpen size={18} />
                            My Account
                        </div>

                        <form onSubmit={onSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={session.user.name}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <Input
                                        id="email"
                                        value={session.user.email}
                                        readOnly
                                        className="bg-muted pl-10"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Your email address cannot be changed here.
                                </p>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700"
                            >
                                Update Profile
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default ProfilePage;
