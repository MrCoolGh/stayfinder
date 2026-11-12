"use client";

import {
    Suspense,
    useEffect,
    useState,
    type FormEvent,
} from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Bell,
    BriefcaseBusiness,
    CircleHelp,
    Eye,
    EyeOff,
    Heart,
    House,
    LockKeyhole,
    LogIn,
    LogOut,
    Mail,
    MapPin,
    Menu,
    MessageCircle,
    MessageSquare,
    Phone,
    Search,
    Settings,
    Star,
    UserCircle,
    X,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Toast, { type ToastType } from "../components/toast";
import ThemeToggle from "../components/theme-toggle";

type Category = "Hotels" | "Hostels" | "Apartments" | "Houses";

type Property = {
    id: number;
    title: string;
    subtitle: string;
    details: string;
    availability: string;
    price: string;
    pricePeriod: string;
    rating: string;
    reviews: number;
    category: Category;
    image: string;
};

const properties: Property[] = [
    {
        id: 1,
        title: "Apartment in Tema",
        subtitle: "Cozy apartment in Tema",
        details: "1 bedroom · 1 bed · 2 baths",
        availability: "Available now",
        price: "GHC150",
        pricePeriod: "per day",
        rating: "4.67",
        reviews: 3,
        category: "Apartments",
        image:
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 2,
        title: "Modern Apartment in Tema",
        subtitle: "Modern 2BR in Tema C9 · Garden · AC",
        details: "2 bedrooms · 2 queen beds · 1 bath",
        availability: "Available now",
        price: "GHC1,526",
        pricePeriod: "per month",
        rating: "4.9",
        reviews: 49,
        category: "Apartments",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 3,
        title: "Peaceful House in East Legon",
        subtitle: "Comfortable home with modern facilities",
        details: "2 bedrooms · 2 beds · 2 baths",
        availability: "Available this week",
        price: "GHC850",
        pricePeriod: "per semester",
        rating: "4.8",
        reviews: 27,
        category: "Houses",
        image:
            "https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 4,
        title: "Student Hostel in Legon",
        subtitle: "Affordable accommodation near UG",
        details: "1 bedroom · 1 bed · Shared facilities",
        availability: "Available this month",
        price: "GHC4,800",
        pricePeriod: "per academic year",
        rating: "4.6",
        reviews: 18,
        category: "Hostels",
        image:
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 5,
        title: "Family House in Accra",
        subtitle: "Spacious home in a quiet neighbourhood",
        details: "3 bedrooms · 3 beds · 2 baths",
        availability: "Available now",
        price: "GHC12,000",
        pricePeriod: "per 1 year",
        rating: "4.7",
        reviews: 31,
        category: "Houses",
        image:
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 6,
        title: "Premium Hotel in Cantonments",
        subtitle: "Fully furnished premium accommodation",
        details: "4 bedrooms · 4 beds · 3 baths",
        availability: "Available soon",
        price: "GHC22,000",
        pricePeriod: "per 2 years",
        rating: "4.9",
        reviews: 14,
        category: "Hotels",
        image:
            "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 7,
        title: "Luxury Hotel in Accra",
        subtitle: "Comfortable rooms with excellent services",
        details: "2 bedrooms · 2 beds · 2 baths",
        availability: "Available now",
        price: "GHC999",
        pricePeriod: "per day",
        rating: "4.85",
        reviews: 22,
        category: "Hotels",
        image:
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
    },
    {
        id: 8,
        title: "Modern Hostel in Madina",
        subtitle: "Affordable rooms close to transport",
        details: "1 bedroom · 1 bed · Shared kitchen",
        availability: "Available now",
        price: "GHC3,500",
        pricePeriod: "per academic year",
        rating: "4.5",
        reviews: 16,
        category: "Hostels",
        image:
            "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85",
    },
];

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
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.09.8 1.19-.24 2.33-.93 3.6-.84 1.53.12 2.68.72 3.43 1.8-3.17 1.9-2.42 6.07.49 7.23-.58 1.52-1.33 3.01-2.61 3.98ZM12.03 7.25C11.88 4.99 13.71 3.13 15.87 3c.3 2.62-2.38 4.56-3.84 4.25Z" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 8h3V4h-3c-3.31 0-5 1.69-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.69.31-1 1-1Z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
            />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.28L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.8h1.73L8.26 4.1H6.4L17.8 19.8Z" />
        </svg>
    );
}

function WhatsAppIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.52 3.48A11.83 11.83 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.92L.1 23.9l6.24-1.64a11.85 11.85 0 0 0 5.74 1.47h.01c6.54 0 11.87-5.33 11.87-11.88 0-3.17-1.23-6.15-3.44-8.37Zm-8.44 18.2h-.01a9.82 9.82 0 0 1-5.01-1.37l-.36-.21-3.7.97.99-3.6-.23-.37a9.85 9.85 0 0 1-1.51-5.22C2.25 6.45 6.66 2.04 12.08 2.04a9.78 9.78 0 0 1 6.97 2.89 9.82 9.82 0 0 1 2.89 6.99c0 5.42-4.41 9.76-9.86 9.76Zm5.39-7.33c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.47-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
    );
}

function LoginModal({
                        onClose,
                        onLoginSuccess,
                    }: {
    onClose: () => void;
    onLoginSuccess: () => void;
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{
        type: ToastType;
        message: string;
    } | null>(null);

    function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isSubmitting) return;

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        if (!email || !password) {
            setToast({
                type: "error",
                message: "Please enter your email and password.",
            });
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setToast({
                type: "error",
                message: "Please enter a valid email address.",
            });
            return;
        }

        if (password.length < 6) {
            setToast({
                type: "error",
                message: "Your password must be at least 6 characters.",
            });
            return;
        }

        setIsSubmitting(true);

        setToast({
            type: "success",
            message: "Login successful. Welcome back to StayFinder!",
        });

        window.setTimeout(onLoginSuccess, 1200);
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-4"
            onClick={onClose}
        >
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

            <div
                className="relative w-full max-w-sm rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:px-6"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close login"
                    className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                >
                    <X size={17} />
                </button>

                <div className="mb-4 flex justify-center">
                    <Link
                        href="/"
                        onClick={onClose}
                        className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white"
                    >
                        <House size={21} className="text-yellow-500" />
                        StayFinder
                    </Link>
                </div>

                <h2 className="text-center text-xl font-bold text-gray-900 dark:text-white">
                    Sign in to your account
                </h2>

                <p className="mt-1.5 text-center text-xs text-gray-500 dark:text-gray-400">
                    Continue exploring properties and managing your StayFinder
                    account.
                </p>

                <form
                    onSubmit={handleLogin}
                    noValidate
                    className="mt-4 space-y-3"
                >
                    <div>
                        <label
                            htmlFor="properties-popup-email"
                            className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300"
                        >
                            Email address
                        </label>

                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                id="properties-popup-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none focus:border-yellow-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="mb-1.5 flex items-center justify-between">
                            <label
                                htmlFor="properties-popup-password"
                                className="text-xs font-semibold text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>

                            <Link
                                href="/forgot-password"
                                onClick={onClose}
                                className="text-[11px] font-semibold text-yellow-600"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="relative">
                            <LockKeyhole
                                size={16}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                id="properties-popup-password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                required
                                className="w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none focus:border-yellow-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((current) => !current)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                            >
                                {showPassword ? (
                                    <EyeOff size={17} />
                                ) : (
                                    <Eye size={17} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full cursor-pointer rounded-xl bg-gray-900 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-900"
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                    <span className="text-[11px] font-medium text-gray-400">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            setToast({
                                type: "error",
                                message: "Google login is not connected yet.",
                            })
                        }
                        aria-label="Sign in with Google"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <GoogleIcon />
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            setToast({
                                type: "error",
                                message: "Apple login is not connected yet.",
                            })
                        }
                        aria-label="Sign in with Apple"
                        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                        <AppleIcon />
                    </button>
                </div>

                <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        onClick={onClose}
                        className="font-semibold text-yellow-600"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}

function PropertyCard({
                          property,
                          isFavorite,
                          onToggleFavorite,
                      }: {
    property: Property;
    isFavorite: boolean;
    onToggleFavorite: (propertyId: number) => void;
}) {
    const isAvailableNow = property.availability === "Available now";

    return (
        <article className="rounded-2xl border border-gray-200 bg-white p-3 shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
            <div className="relative overflow-hidden rounded-xl bg-gray-200">
                <Link href={`/properties/${property.id}`}>
                    <div
                        className="h-60 w-full bg-cover bg-center transition duration-500 hover:scale-105"
                        style={{ backgroundImage: `url("${property.image}")` }}
                    />
                </Link>

                <button
                    type="button"
                    onClick={() => onToggleFavorite(property.id)}
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                    className={`absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full shadow-sm transition hover:scale-105 ${
                        isFavorite
                            ? "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
                            : "bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    }`}
                >
                    <Heart
                        size={19}
                        fill={isFavorite ? "currentColor" : "none"}
                    />
                </button>
            </div>

            <Link href={`/properties/${property.id}`} className="block">
                <div className="mt-3 flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                        {property.title}
                    </h2>

                    <div className="flex shrink-0 items-center gap-1 text-sm font-semibold">
                        <Star size={15} fill="currentColor" />
                        <span>
                            {property.rating} ({property.reviews})
                        </span>
                    </div>
                </div>

                <p className="mt-1 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                    {property.subtitle}
                </p>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {property.details}
                </p>

                <span
                    className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isAvailableNow
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                >
                    {property.availability}
                </span>

                <p className="mt-2 text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-bold underline">
                        {property.price}
                    </span>{" "}
                    {property.pricePeriod}
                </p>
            </Link>
        </article>
    );
}

function Footer() {
    return (
        <footer className="mt-8 border-t border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100">
            <div className="mx-auto max-w-7xl px-5 pb-0 pt-12 md:px-6 lg:pt-16">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-xl font-bold"
                        >
                            <House size={25} className="text-yellow-500" />
                            StayFinder
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500 dark:text-gray-400">
                            Find comfortable, affordable, and reliable
                            accommodation for your next stay.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-yellow-400 dark:bg-gray-800 dark:text-gray-300"
                            >
                                <FacebookIcon />
                            </a>

                            <a
                                href="#"
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-yellow-400 dark:bg-gray-800 dark:text-gray-300"
                            >
                                <InstagramIcon />
                            </a>

                            <a
                                href="#"
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-yellow-400 dark:bg-gray-800 dark:text-gray-300"
                            >
                                <TwitterIcon />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                            Explore
                        </h3>

                        <div className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <Link
                                href="/properties"
                                className="block hover:text-yellow-500"
                            >
                                Find properties
                            </Link>
                            <Link
                                href="/properties?category=Hotels"
                                className="block hover:text-yellow-500"
                            >
                                Hotels
                            </Link>
                            <Link
                                href="/properties?category=Hostels"
                                className="block hover:text-yellow-500"
                            >
                                Hostels
                            </Link>
                            <Link
                                href="/properties?category=Apartments"
                                className="block hover:text-yellow-500"
                            >
                                Apartments
                            </Link>
                            <Link
                                href="/properties?category=Houses"
                                className="block hover:text-yellow-500"
                            >
                                Houses
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                            StayFinder
                        </h3>

                        <div className="mt-4 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <Link
                                href="/about"
                                className="block hover:text-yellow-500"
                            >
                                About us
                            </Link>
                            <Link
                                href="/help"
                                className="block hover:text-yellow-500"
                            >
                                Help Center
                            </Link>
                            <Link
                                href="/feedback"
                                className="block hover:text-yellow-500"
                            >
                                Send feedback
                            </Link>
                            <Link
                                href="/signup"
                                className="block hover:text-yellow-500"
                            >
                                Become an advertiser
                            </Link>
                            <Link
                                href="/privacy"
                                className="block hover:text-yellow-500"
                            >
                                Privacy policy
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                            Contact us
                        </h3>

                        <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={18}
                                    className="mt-0.5 text-yellow-500"
                                />
                                <span>Accra, Ghana</span>
                            </div>

                            <a
                                href="mailto:support@stayfinder.com"
                                className="flex items-center gap-3 hover:text-yellow-500"
                            >
                                <Mail
                                    size={18}
                                    className="text-yellow-500"
                                />
                                support@stayfinder.com
                            </a>

                            <a
                                href="tel:+233543877778"
                                className="flex items-center gap-3 hover:text-yellow-500"
                            >
                                <Phone
                                    size={18}
                                    className="text-yellow-500"
                                />
                                +233543877778
                            </a>

                            <a
                                href="https://wa.me/233543877778"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 text-green-600 hover:text-yellow-500"
                            >
                                <WhatsAppIcon />
                                WhatsApp us
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-gray-200 pb-4 pt-6 dark:border-gray-800">
                    <div className="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-base font-medium">
                            © 2026 StayFinder. All rights reserved.
                        </p>

                        <div className="flex gap-6 text-base font-medium">
                            <Link
                                href="/terms"
                                className="hover:text-yellow-500"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/privacy"
                                className="hover:text-yellow-500"
                            >
                                Privacy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function PropertiesContent() {
    const searchParams = useSearchParams();
    const selectedCategory = searchParams.get("category") ?? "All";

    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    useEffect(() => {
        const savedFavorites = window.localStorage.getItem(
            "stayfinder-favorites",
        );

        if (!savedFavorites) return;

        try {
            const parsedFavorites = JSON.parse(savedFavorites);

            if (Array.isArray(parsedFavorites)) {
                setFavoriteIds(
                    parsedFavorites.filter(
                        (id): id is number => typeof id === "number",
                    ),
                );
            }
        } catch {
            window.localStorage.removeItem("stayfinder-favorites");
        }
    }, []);

    function handleLogout() {
        setIsLoggedIn(false);
        setIsMenuOpen(false);
    }

    function toggleFavorite(propertyId: number) {
        if (!isLoggedIn) {
            setIsLoginOpen(true);
            return;
        }

        setFavoriteIds((currentFavorites) => {
            const nextFavorites = currentFavorites.includes(propertyId)
                ? currentFavorites.filter((id) => id !== propertyId)
                : [...currentFavorites, propertyId];

            window.localStorage.setItem(
                "stayfinder-favorites",
                JSON.stringify(nextFavorites),
            );

            return nextFavorites;
        });
    }

    const filteredProperties = properties.filter((property) => {
        const query = searchQuery.trim().toLowerCase();

        const matchesCategory =
            selectedCategory === "All"
                ? true
                : selectedCategory === "Favorites"
                    ? favoriteIds.includes(property.id)
                    : property.category === selectedCategory;

        const matchesSearch =
            !query ||
            property.title.toLowerCase().includes(query) ||
            property.subtitle.toLowerCase().includes(query) ||
            property.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    const pageTitle =
        selectedCategory === "All"
            ? "All properties"
            : selectedCategory === "Favorites"
                ? "Your favourite"
                : selectedCategory;

    return (
        <main className="min-h-screen bg-white pb-28 text-gray-900 dark:bg-gray-950 dark:text-gray-100 md:pb-10">
            <ThemeToggle />

            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-[70]"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className="absolute right-4 top-14 w-[280px] rounded-2xl bg-white p-3 shadow-2xl dark:bg-gray-900 md:top-20"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href="/wishlists"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <Heart size={20} />
                                    <span>Wishlists</span>
                                </Link>

                                <Link
                                    href="/messages"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hidden cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 md:flex"
                                >
                                    <MessageCircle size={20} />
                                    <span>Messages</span>
                                </Link>

                                <Link
                                    href="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hidden cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 md:flex"
                                >
                                    <UserCircle size={20} />
                                    <span>Profile</span>
                                </Link>

                                <Link
                                    href="/notifications"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hidden cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 md:flex"
                                >
                                    <Bell size={20} />
                                    <span>Notifications</span>
                                </Link>

                                <Link
                                    href="/settings"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <Settings size={20} />
                                    <span>Account settings</span>
                                </Link>

                                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

                                <Link
                                    href="/help"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <CircleHelp size={20} />
                                    <span>Help Center</span>
                                </Link>

                                <Link
                                    href="/feedback"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <MessageSquare size={20} />
                                    <span>Feedback</span>
                                </Link>

                                <ThemeToggle variant="menu" />

                                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <LogOut size={20} />
                                    <span>Log out</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/help"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <CircleHelp size={20} />
                                    <span>Help Center</span>
                                </Link>

                                <Link
                                    href="/feedback"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <MessageSquare size={20} />
                                    <span>Feedback</span>
                                </Link>

                                <ThemeToggle variant="menu" />

                                <div className="my-2 border-t border-gray-200 dark:border-gray-700" />

                                <Link
                                    href="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <BriefcaseBusiness size={20} />
                                    <span>Become an Advertiser</span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsLoginOpen(true);
                                    }}
                                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <LogIn size={20} />
                                    <span>Log in or sign up</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {isLoginOpen && (
                <LoginModal
                    onClose={() => setIsLoginOpen(false)}
                    onLoginSuccess={() => {
                        setIsLoggedIn(true);
                        setIsLoginOpen(false);
                    }}
                />
            )}

            <header className="sticky top-0 z-40 bg-white dark:bg-gray-950">
                <div className="hidden h-24 items-center justify-between gap-8 px-6 md:mx-auto md:flex md:max-w-7xl">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold"
                    >
                        <House size={30} className="text-yellow-500" />
                        StayFinder
                    </Link>

                    <div className="absolute left-1/2 top-1/2 flex w-[300px] -translate-x-1/2 -translate-y-1/2 items-center overflow-hidden rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search for a place"
                            className="min-w-0 flex-1 rounded-l-full bg-transparent px-4 py-2 text-sm outline-none"
                        />

                        <button
                            type="button"
                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-yellow-400 text-gray-900"
                        >
                            <Search size={16} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <Link
                                href="/profile"
                                aria-label="Open profile"
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                            >
                                <UserCircle size={21} />
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={() => setIsLoginOpen(true)}
                                aria-label="Open login"
                                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                            >
                                <UserCircle size={21} />
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() =>
                                setIsMenuOpen((current) => !current)
                            }
                            aria-label="Open menu"
                            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
                        >
                            {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-5 py-3 md:hidden">
                    <Link
                        href="/"
                        aria-label="Go back"
                        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center"
                    >
                        <ArrowLeft size={21} />
                    </Link>

                    <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-full border border-gray-200 px-1 dark:border-gray-700">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search for a place"
                            className="min-w-0 flex-1 rounded-l-full bg-transparent px-4 py-2 text-sm outline-none"
                        />

                        <button
                            type="button"
                            aria-label="Search"
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-yellow-400 text-gray-900"
                        >
                            <Search size={15} />
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((current) => !current)}
                        aria-label="Open menu"
                        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center"
                    >
                        {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-5 py-8 md:px-6">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold md:text-3xl">
                        {pageTitle}
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Browse accommodation that matches your needs
                    </p>
                </div>

                {filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProperties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                isFavorite={favoriteIds.includes(property.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-16 text-center dark:border-gray-700">
                        <Heart
                            size={42}
                            className="mx-auto text-gray-400"
                        />

                        <h2 className="mt-4 text-lg font-bold">
                            {selectedCategory === "Favorites"
                                ? "No favourite properties yet"
                                : "No properties found"}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {selectedCategory === "Favorites"
                                ? "Tap the heart icon on a property to save it here."
                                : "Try searching for a different property or location."}
                        </p>

                        <Link
                            href="/"
                            className="mt-5 inline-flex rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                        >
                            Explore properties
                        </Link>
                    </div>
                )}
            </section>

            <Footer />

            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around border-t border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-gray-950 md:hidden">
                <Link
                    href="/"
                    className="flex flex-col items-center gap-1 text-yellow-600"
                >
                    <Search size={23} />
                    <span className="text-xs font-medium">Explore</span>
                </Link>

                {isLoggedIn ? (
                    <>
                        <Link
                            href="/messages"
                            className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400"
                        >
                            <MessageCircle size={23} />
                            <span className="text-xs font-medium">
                                Messages
                            </span>
                        </Link>

                        <Link
                            href="/notifications"
                            className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400"
                        >
                            <Bell size={23} />
                            <span className="text-xs font-medium">
                                Notifications
                            </span>
                        </Link>

                        <Link
                            href="/profile"
                            className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400"
                        >
                            <UserCircle size={23} />
                            <span className="text-xs font-medium">
                                Profile
                            </span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            href="/feedback"
                            className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400"
                        >
                            <MessageSquare size={23} />
                            <span className="text-xs font-medium">
                                Feedback
                            </span>
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsLoginOpen(true)}
                            className="flex cursor-pointer flex-col items-center gap-1 text-gray-500 dark:text-gray-400"
                        >
                            <UserCircle size={23} />
                            <span className="text-xs font-medium">
                                Log in
                            </span>
                        </button>
                    </>
                )}
            </nav>
        </main>
    );
}

export default function PropertiesPage() {
    return (
        <Suspense fallback={null}>
            <PropertiesContent />
        </Suspense>
    );
}