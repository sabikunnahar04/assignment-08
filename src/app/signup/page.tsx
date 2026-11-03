
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import React from "react";

const SignUpPage = () => {
    const router = useRouter();
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(
            formData.entries()
        ) as {
            name: string;
            email: string;
            image: string;
            password: string;
        };

        if (
            !/[A-Z]/.test(user.password) ||
            !/[a-z]/.test(user.password) ||
            user.password.length < 6
        ) {
            toast.error(
                "Password must contain uppercase, lowercase and at least 6 characters"
            );
            return;
        }

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image || undefined,
            callbackURL: "/",
        });

        if (data) {
            toast.success("Account created successfully");
            router.push("/");
        }

        if (error) {
            toast.error(error.message || "Registration failed");
            console.log(error);
        }
    };

    const handleGoogleSignUp = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f4f3ed] px-5 py-12">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

                <div className="mb-7 text-center">
                    <h1 className="text-3xl font-bold text-[#173f31]">
                        Create Account
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Join BookNook and explore your next read.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">

                    <input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <input
                        name="image"
                        type="url"
                        placeholder="Photo URL"
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#173f31] py-3 font-semibold text-white hover:bg-[#245943]"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                    onClick={handleGoogleSignUp}
                    className="w-full rounded-lg border py-3 font-semibold hover:bg-gray-50"
                >
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="font-semibold text-[#245943]"
                    >
                        Sign In
                    </Link>
                </p>

            </div>
        </main>
    );
};

export default SignUpPage;
