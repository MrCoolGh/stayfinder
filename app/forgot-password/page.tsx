"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    House,
    Mail,
} from "lucide-react";
import Toast, { type ToastType } from "../components/toast";

export default function ForgotPasswordPage() {
    const [toast, setToast] = useState<{
        type: ToastType;
        message: string;
    } | null>(null);

    function handleForgotPassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setToast(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");

        if (!email) {
            setToast({
                type: "error",
                message: "Please enter your email address.",
            });
            return;
        }

        setToast({
            type: "success",
            message: "Password reset instructions will be sent to your email.",
        });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-5">
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white px-5 py-7 shadow-xl sm:px-8">
                <div className="mb-6 flex justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold text-gray-900"
                    >
                        <House size={23} className="text-yellow-500" />
                        StayFinder
                    </Link>
                </div>

                <p className="text-center text-sm font-semibold text-yellow-600">
                    RESET PASSWORD
                </p>

                <h1 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Forgot your password?
                </h1>

                <p className="mt-2 text-center text-sm leading-6 text-gray-500">
                    Enter the email address connected to your account and we will send
                    you instructions to reset your password.
                </p>

                <form
                    onSubmit={handleForgotPassword}
                    className="mt-7 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Email address
                        </label>

                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                autoComplete="email"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        Send reset instructions
                        <ArrowRight size={17} />
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Remember your password?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-yellow-600 hover:text-yellow-700"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}