"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
    ArrowRight,
    Building2,
    Eye,
    EyeOff,
    House,
    LockKeyhole,
    Mail,
    Phone,
    Search,
} from "lucide-react";
import Toast, { type ToastType } from "../components/toast";

function GoogleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="#4285F4"
                d="M21.35 12.27c0-.74-.07-1.45-.2-2.13H12v4.03h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.29Z"
            />
            <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.75Z"
            />
            <path
                fill="#FBBC05"
                d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.63H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.37l3.25-2.53Z"
            />
            <path
                fill="#EA4335"
                d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.23 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.72 5.38l3.25 2.53c.77-2.31 2.93-4.03 5.47-4.03Z"
            />
        </svg>
    );
}

function AppleIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.09.8 1.19-.24 2.33-.93 3.6-.84 1.53.12 2.68.72 3.43 1.8-3.17 1.9-2.42 6.07.49 7.23-.58 1.52-1.33 3.01-2.61 3.98ZM12.03 7.25C11.88 4.99 13.71 3.13 15.87 3c.3 2.62-2.38 4.56-3.84 4.25Z" />
        </svg>
    );
}

export default function SignupPage() {
    const [accountType, setAccountType] = useState("seeker");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{
        type: ToastType;
        message: string;
    } | null>(null);

    function handleSignup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setToast(null);

        const formData = new FormData(event.currentTarget);
        const fullName = String(formData.get("fullName") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();
        const phone = String(formData.get("phone") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const confirmPassword = String(
            formData.get("confirmPassword") ?? "",
        );
        const termsAccepted = formData.get("terms") === "on";

        if (!fullName || !email || !phone || !password || !confirmPassword) {
            setToast({
                type: "error",
                message: "Please complete all required fields.",
            });
            return;
        }

        if (fullName.length < 2) {
            setToast({
                type: "error",
                message: "Please enter your full name.",
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setToast({
                type: "error",
                message: "Please enter a valid email address.",
            });
            return;
        }

        if (phone.replace(/\D/g, "").length < 10) {
            setToast({
                type: "error",
                message: "Please enter a valid phone number.",
            });
            return;
        }

        if (password.length < 8) {
            setToast({
                type: "error",
                message: "Your password must be at least 8 characters.",
            });
            return;
        }

        if (password !== confirmPassword) {
            setToast({
                type: "error",
                message: "Your passwords do not match.",
            });
            return;
        }

        if (!termsAccepted) {
            setToast({
                type: "error",
                message: "Please accept the Terms of Service and Privacy Policy.",
            });
            return;
        }

        setIsSubmitting(true);

        setToast({
            type: "success",
            message: "Your account has been created successfully.",
        });

        window.setTimeout(() => {
            setIsSubmitting(false);
        }, 1200);
    }

    function handleGoogleSignup() {
        setToast({
            type: "error",
            message: "Google sign up is not connected yet.",
        });
    }

    function handleAppleSignup() {
        setToast({
            type: "error",
            message: "Apple sign up is not connected yet.",
        });
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-3">
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="w-full max-w-lg rounded-3xl border border-gray-100 bg-white px-4 py-4 shadow-xl sm:px-6 md:px-7">
                <div className="mb-3 flex justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-bold text-gray-900"
                    >
                        <House size={21} className="text-yellow-500" />
                        StayFinder
                    </Link>
                </div>

                <h1 className="text-center text-xl font-bold tracking-tight text-gray-900">
                    Create your account
                </h1>

                <p className="mt-1 text-center text-xs text-gray-500">
                    Join us and find the right accommodation
                </p>

                <form
                    onSubmit={handleSignup}
                    noValidate
                    className="mt-4 space-y-3"
                >
                    <input
                        type="hidden"
                        name="accountType"
                        value={accountType}
                    />

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                            I want to register as
                        </label>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <button
                                type="button"
                                onClick={() => setAccountType("seeker")}
                                className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 text-left transition ${
                                    accountType === "seeker"
                                        ? "border-black bg-black text-white"
                                        : "border-gray-200 hover:border-gray-400"
                                }`}
                            >
                                <Search
                                    size={18}
                                    className={
                                        accountType === "seeker"
                                            ? "text-yellow-400"
                                            : "text-gray-400"
                                    }
                                />

                                <span>
                                    <span
                                        className={`block text-xs font-semibold ${
                                            accountType === "seeker"
                                                ? "text-white"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        Seeker
                                    </span>

                                    <span
                                        className={`block text-[11px] ${
                                            accountType === "seeker"
                                                ? "text-gray-300"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        Find accommodation
                                    </span>
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setAccountType("advertiser")}
                                className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 text-left transition ${
                                    accountType === "advertiser"
                                        ? "border-black bg-black text-white"
                                        : "border-gray-200 hover:border-gray-400"
                                }`}
                            >
                                <Building2
                                    size={18}
                                    className={
                                        accountType === "advertiser"
                                            ? "text-yellow-400"
                                            : "text-gray-400"
                                    }
                                />

                                <span>
                                    <span
                                        className={`block text-xs font-semibold ${
                                            accountType === "advertiser"
                                                ? "text-white"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        Advertiser
                                    </span>

                                    <span
                                        className={`block text-[11px] ${
                                            accountType === "advertiser"
                                                ? "text-gray-300"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        List properties
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="fullName"
                            className="mb-1.5 block text-xs font-semibold text-gray-700"
                        >
                            Full name
                        </label>

                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            autoComplete="name"
                            className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition hover:border-yellow-400 focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-xs font-semibold text-gray-700"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition hover:border-yellow-400 focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="mb-1.5 block text-xs font-semibold text-gray-700"
                            >
                                Phone number
                            </label>

                            <div className="relative">
                                <Phone
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="024 000 0000"
                                    autoComplete="tel"
                                    className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition hover:border-yellow-400 focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-xs font-semibold text-gray-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    minLength={8}
                                    autoComplete="new-password"
                                    className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition hover:border-yellow-400 focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((current) => !current)
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>

                            <p className="mt-1 text-[11px] text-gray-400">
                                At least 8 characters.
                            </p>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="mb-1.5 block text-xs font-semibold text-gray-700"
                            >
                                Confirm password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={16}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Confirm your password"
                                    minLength={8}
                                    autoComplete="new-password"
                                    className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition hover:border-yellow-400 focus:border-yellow-500 focus:bg-white focus:ring-4 focus:ring-yellow-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            (current) => !current,
                                        )
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
                                    aria-label={
                                        showConfirmPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={16} />
                                    ) : (
                                        <Eye size={16} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="mt-0.5 h-3.5 w-3.5 cursor-pointer accent-yellow-500"
                        />

                        <label
                            htmlFor="terms"
                            className="text-[11px] leading-4 text-gray-500"
                        >
                            I agree to the{" "}
                            <Link
                                href="/terms"
                                className="font-semibold text-yellow-600 hover:text-yellow-700"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="font-semibold text-yellow-600 hover:text-yellow-700"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "Creating account..." : "Create account"}
                        {!isSubmitting && <ArrowRight size={16} />}
                    </button>
                </form>

                <div className="my-3 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200" />
                    <span className="text-[11px] font-medium text-gray-400">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-gray-200" />
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        aria-label="Sign up with Google"
                        title="Sign up with Google"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-gray-50"
                    >
                        <GoogleIcon />
                    </button>

                    <button
                        type="button"
                        onClick={handleAppleSignup}
                        aria-label="Sign up with Apple"
                        title="Sign up with Apple"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-black transition hover:bg-gray-50"
                    >
                        <AppleIcon />
                    </button>
                </div>

                <p className="mt-3 text-center text-xs text-gray-500">
                    Already have an account?{" "}
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