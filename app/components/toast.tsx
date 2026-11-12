"use client";

import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type ToastType = "error" | "success";

type ToastProps = {
    type: ToastType;
    message: string;
    onClose: () => void;
};

export default function Toast({ type, message, onClose }: ToastProps) {
    const [visible, setVisible] = useState(false);

    const closeToast = useCallback(() => {
        setVisible(false);

        window.setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    useEffect(() => {
        const animationFrame = window.requestAnimationFrame(() => {
            setVisible(true);
        });

        const timeout = window.setTimeout(() => {
            closeToast();
        }, 4000);

        return () => {
            window.cancelAnimationFrame(animationFrame);
            window.clearTimeout(timeout);
        };
    }, [closeToast]);

    const isError = type === "error";

    return (
        <div
            role="alert"
            className={`fixed right-4 top-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border p-4 shadow-xl transition-all duration-300 ease-out ${
                visible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
            } ${
                isError
                    ? "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
                    : "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-100"
            }`}
        >
            {isError ? (
                <AlertCircle className="mt-0.5 shrink-0 text-red-600" size={21} />
            ) : (
                <CheckCircle2
                    className="mt-0.5 shrink-0 text-green-600"
                    size={21}
                />
            )}

            <p className="flex-1 text-sm font-medium">{message}</p>

            <button
                type="button"
                onClick={closeToast}
                className="shrink-0 cursor-pointer opacity-60 transition hover:opacity-100"
                aria-label="Close notification"
            >
                <X size={18} />
            </button>
        </div>
    );
}