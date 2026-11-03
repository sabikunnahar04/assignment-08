
"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
    const router = useRouter();
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(
            formData.entries()
        ) as {
            email: string;
            password: string;
        };

        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/",
        });

        if (data) {
            toast.success("SignIn successfully");
            router.push("/");
        }

        if (error) {
            toast.error(error.message || "Invalid email or password");
            console.log(error);
        }
    };

    const handleGoogleSignIn = async () => {
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
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Sign in to continue your BookNook journey.
                    </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">

                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full rounded-lg border px-4 py-3"
                    />

                    <p className="text-right text-sm text-[#245943] cursor-pointer">
                        Forgot Password?
                    </p>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#173f31] py-3 font-semibold text-white hover:bg-[#245943]"
                    >
                        Sign In
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-sm text-gray-400">OR</span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full rounded-lg border py-3 font-semibold hover:bg-gray-50"
                >
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Dont have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-semibold text-[#245943]"
                    >
                        Sign Up
                    </Link>
                </p>

            </div>
        </main>
    );
};

export default SignInPage;
