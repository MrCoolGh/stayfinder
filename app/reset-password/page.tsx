"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Eye,
    EyeOff,
    House,
    LockKeyhole,
} from "lucide-react";
import Toast, { type ToastType } from "../components/toast";

export default function ResetPasswordPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [toast, setToast] = useState<{
        type: ToastType;
        message: string;
    } | null>(null);

    function handleResetPassword(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setToast(null);

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (password !== confirmPassword) {
            setToast({
                type: "error",
                message: "Your passwords do not match.",
            });
            return;
        }

        if (typeof password !== "string" || password.length < 8) {
            setToast({
                type: "error",
                message: "Your password must contain at least 8 characters.",
            });
            return;
        }

        setToast({
            type: "success",
            message: "Your password has been updated successfully.",
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
                <div className="mb-8 flex justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-bold text-gray-900"
                    >
                        <House size={23} className="text-yellow-500" />
                        StayFinder
                    </Link>
                </div>

                <p className="text-center text-sm font-semibold text-yellow-600">
                    NEW PASSWORD
                </p>

                <h1 className="mt-2 text-center text-2xl font-bold text-gray-900">
                    Create a new password
                </h1>

                <p className="mt-2 text-center text-sm leading-6 text-gray-500">
                    Choose a strong password that you have not used before.
                </p>

                <form
                    onSubmit={handleResetPassword}
                    className="mt-7 space-y-5"
                >
                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            New password
                        </label>

                        <div className="relative">
                            <LockKeyhole
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                required
                                minLength={8}
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <p className="mt-1 text-xs text-gray-400">
                            Password must contain at least 8 characters.
                        </p>
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Confirm new password
                        </label>

                        <div className="relative">
                            <LockKeyhole
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your new password"
                                required
                                minLength={8}
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm text-gray-900 outline-none transition focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                                aria-label={
                                    showConfirmPassword ? "Hide password" : "Show password"
                                }
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        Update password
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