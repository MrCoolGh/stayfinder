"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    BadgeCheck,
    Camera,
    ChevronRight,
    Eye,
    EyeOff,
    Shield,
    UserRound,
    X,
} from "lucide-react";
import Toast, { type ToastType } from "../components/toast";

const settingsItems = [
    { label: "Personal information", icon: UserRound },
    { label: "Login & security", icon: Shield },
    { label: "Identity verification", icon: BadgeCheck },
];

type ModalType =
    | "name"
    | "email"
    | "phone"
    | "address"
    | "birthday"
    | "gender"
    | "password"
    | null;

type ToastState = {
    type: ToastType;
    message: string;
} | null;

export default function SettingsPage() {
    const [activeSetting, setActiveSetting] =
        useState("Personal information");
    const [showMobileDetails, setShowMobileDetails] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    const [legalName, setLegalName] = useState("Patrick Dwame­na");
    const [draftLegalName, setDraftLegalName] = useState("Patrick Dwame­na");

    const [email, setEmail] = useState("p***@gmail.com");
    const [draftEmail, setDraftEmail] = useState("p***@gmail.com");

    const [phone, setPhone] = useState("+233 ** *** 7778");
    const [draftPhone, setDraftPhone] = useState("+233 ** *** 7778");

    const [streetAddress, setStreetAddress] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [toast, setToast] = useState<ToastState>(null);

    function handleProfilePictureChange(
        event: ChangeEvent<HTMLInputElement>,
    ) {
        const file = event.target.files?.[0];

        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    }

    function openModal(type: ModalType) {
        setToast(null);
        setModalType(type);
    }

    function closeModal() {
        setModalType(null);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
    }

    function openMobileSetting(setting: string) {
        setActiveSetting(setting);
        setShowMobileDetails(true);
    }

    function openEditModal(title: string) {
        if (title === "Legal name") {
            setDraftLegalName(legalName);
            openModal("name");
        } else if (title === "Email address") {
            setDraftEmail(email);
            openModal("email");
        } else if (title === "Phone number") {
            setDraftPhone(phone);
            openModal("phone");
        } else if (title === "Residential address") {
            openModal("address");
        } else if (title === "Birthday") {
            openModal("birthday");
        } else if (title === "Gender") {
            openModal("gender");
        }
    }

    function showError(message: string) {
        setToast({ type: "error", message });
    }

    function showSuccess(message: string) {
        closeModal();
        setToast({ type: "success", message });
    }

    function saveModal(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setToast(null);

        if (modalType === "name") {
            const value = draftLegalName.trim();

            if (!value) {
                showError("Please enter your legal name.");
                return;
            }

            setLegalName(value);
            showSuccess("Your legal name was updated successfully.");
            return;
        }

        if (modalType === "email") {
            const value = draftEmail.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(value)) {
                showError("Please enter a valid email address.");
                return;
            }

            setEmail(value);
            showSuccess("Your email address was updated successfully.");
            return;
        }

        if (modalType === "phone") {
            const value = draftPhone.trim();

            if (value.length < 7) {
                showError("Please enter a valid phone number.");
                return;
            }

            setPhone(value);
            showSuccess("Your phone number was updated successfully.");
            return;
        }

        if (modalType === "address") {
            if (!streetAddress.trim() || !city.trim()) {
                showError("Please enter your street address and city.");
                return;
            }

            showSuccess("Your residential address was updated successfully.");
            return;
        }

        if (modalType === "birthday") {
            if (!birthday) {
                showError("Please select your birthday.");
                return;
            }

            showSuccess("Your birthday was updated successfully.");
            return;
        }

        if (modalType === "gender") {
            if (!gender) {
                showError("Please select your gender.");
                return;
            }

            showSuccess("Your gender was updated successfully.");
            return;
        }

        if (modalType === "password") {
            if (!currentPassword || !newPassword || !confirmPassword) {
                showError("Please complete all password fields.");
                return;
            }

            if (newPassword.length < 6) {
                showError("Your new password must be at least 6 characters.");
                return;
            }

            if (newPassword !== confirmPassword) {
                showError("The new passwords do not match.");
                return;
            }

            showSuccess("Your password was updated successfully.");
        }
    }

    function getAddressValue() {
        return streetAddress || city
            ? [streetAddress, city].filter(Boolean).join(", ")
            : "Not provided";
    }

    function getBirthdayValue() {
        return birthday
            ? new Date(`${birthday}T00:00:00`).toLocaleDateString()
            : "Not provided";
    }

    function renderModalContent() {
        if (modalType === "password") {
            return (
                <>
                    <h2 className="text-xl font-bold">Change password</h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Choose a strong password that you do not use elsewhere.
                    </p>

                    <div className="mt-5 space-y-4">
                        <PasswordInput
                            value={currentPassword}
                            onChange={setCurrentPassword}
                            visible={showCurrentPassword}
                            onToggle={() =>
                                setShowCurrentPassword((value) => !value)
                            }
                            placeholder="Current password"
                            ariaLabel={
                                showCurrentPassword
                                    ? "Hide current password"
                                    : "Show current password"
                            }
                        />

                        <PasswordInput
                            value={newPassword}
                            onChange={setNewPassword}
                            visible={showNewPassword}
                            onToggle={() =>
                                setShowNewPassword((value) => !value)
                            }
                            placeholder="New password"
                            ariaLabel={
                                showNewPassword
                                    ? "Hide new password"
                                    : "Show new password"
                            }
                        />

                        <PasswordInput
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            visible={showConfirmPassword}
                            onToggle={() =>
                                setShowConfirmPassword((value) => !value)
                            }
                            placeholder="Confirm new password"
                            ariaLabel={
                                showConfirmPassword
                                    ? "Hide password confirmation"
                                    : "Show password confirmation"
                            }
                        />
                    </div>
                </>
            );
        }

        if (modalType === "name") {
            return (
                <>
                    <h2 className="text-xl font-bold">Edit legal name</h2>

                    <input
                        value={draftLegalName}
                        onChange={(event) =>
                            setDraftLegalName(event.target.value)
                        }
                        autoFocus
                        placeholder="Legal name"
                        className="mt-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                </>
            );
        }

        if (modalType === "email") {
            return (
                <>
                    <h2 className="text-xl font-bold">
                        Edit email address
                    </h2>

                    <input
                        type="email"
                        value={draftEmail}
                        onChange={(event) =>
                            setDraftEmail(event.target.value)
                        }
                        autoFocus
                        placeholder="Email address"
                        className="mt-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                </>
            );
        }

        if (modalType === "phone") {
            return (
                <>
                    <h2 className="text-xl font-bold">
                        Edit phone number
                    </h2>

                    <input
                        type="tel"
                        value={draftPhone}
                        onChange={(event) =>
                            setDraftPhone(event.target.value)
                        }
                        autoFocus
                        placeholder="Phone number"
                        className="mt-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                </>
            );
        }

        if (modalType === "address") {
            return (
                <>
                    <h2 className="text-xl font-bold">
                        Edit residential address
                    </h2>

                    <div className="mt-5 space-y-3">
                        <select className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white">
                            <option>Ghana</option>
                            <option>Nigeria</option>
                            <option>United Kingdom</option>
                            <option>United States</option>
                        </select>

                        <input
                            value={streetAddress}
                            onChange={(event) =>
                                setStreetAddress(event.target.value)
                            }
                            placeholder="Street address"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />

                        <input
                            value={apartment}
                            onChange={(event) =>
                                setApartment(event.target.value)
                            }
                            placeholder="Apt, floor, bldg (if applicable)"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />

                        <input
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            placeholder="City / town / village"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />

                        <input
                            value={province}
                            onChange={(event) =>
                                setProvince(event.target.value)
                            }
                            placeholder="Province / state / territory"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />

                        <input
                            value={postalCode}
                            onChange={(event) =>
                                setPostalCode(event.target.value)
                            }
                            placeholder="Postal code"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />
                    </div>
                </>
            );
        }

        if (modalType === "birthday") {
            return (
                <>
                    <h2 className="text-xl font-bold">Edit birthday</h2>

                    <input
                        type="date"
                        value={birthday}
                        onChange={(event) =>
                            setBirthday(event.target.value)
                        }
                        className="mt-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    />
                </>
            );
        }

        if (modalType === "gender") {
            return (
                <>
                    <h2 className="text-xl font-bold">Edit gender</h2>

                    <select
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                        className="mt-5 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                    >
                        <option value="">Select your gender</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">
                            Prefer not to say
                        </option>
                    </select>
                </>
            );
        }

        return null;
    }

    return (
        <main className="min-h-screen bg-white px-4 text-gray-900 dark:bg-gray-950 dark:text-gray-100 sm:px-6 lg:px-12">
            {toast && (
                <Toast
                    type={toast.type}
                    message={toast.message}
                    onClose={() => setToast(null)}
                />
            )}

            {modalType && (
                <div
                    className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4"
                    onClick={closeModal}
                >
                    <div
                        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-2xl dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close dialog"
                                className="cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={saveModal}>
                            {renderModalContent()}

                            <div className="mt-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="cursor-pointer rounded-xl border border-gray-900 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:border-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-end px-4 md:px-7">
                    {showMobileDetails ? (
                        <button
                            type="button"
                            onClick={() => setShowMobileDetails(false)}
                            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                        >
                            <ArrowLeft size={22} />
                        </button>
                    ) : (
                        <Link
                            href="/properties"
                            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                        >
                            <ArrowLeft size={22} />
                        </Link>
                    )}

                    <Link
                        href="/properties"
                        className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gray-100 px-5 py-2 text-sm font-semibold dark:bg-gray-700 dark:text-white"
                    >
                        Done
                    </Link>
                </div>
            </header>

            <div className="mx-auto flex max-w-7xl">
                <aside className="hidden w-[390px] shrink-0 border-r border-gray-200 py-6 pl-5 pr-10 dark:border-gray-800 md:block">
                    <h1 className="mb-6 text-2xl font-bold">
                        Account settings
                    </h1>

                    <nav className="space-y-3">
                        {settingsItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSetting === item.label;

                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() =>
                                        setActiveSetting(item.label)
                                    }
                                    className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3.5 text-left text-base transition ${
                                        isActive
                                            ? "bg-gray-100 font-semibold dark:bg-gray-700 dark:text-white"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    <Icon size={23} strokeWidth={1.7} />
                                    <span className="flex-1">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                <section className="w-full min-w-0 px-1 py-6 md:px-12 md:py-6 lg:px-20">
                    <div className="mx-auto w-full max-w-[760px]">
                        {!showMobileDetails && (
                            <div className="md:hidden">
                                <h1 className="mb-10 text-2xl font-bold">
                                    Account settings
                                </h1>

                                <div className="space-y-3">
                                    {settingsItems.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <button
                                                key={item.label}
                                                type="button"
                                                onClick={() =>
                                                    openMobileSetting(
                                                        item.label,
                                                    )
                                                }
                                                className="flex min-h-[62px] w-full cursor-pointer items-center gap-4 rounded-2xl border border-gray-200 px-4 py-4 text-left hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-900"
                                            >
                                                <Icon size={22} />
                                                <span className="flex-1 text-sm font-semibold">
                                                    {item.label}
                                                </span>
                                                <ChevronRight
                                                    size={21}
                                                    className="text-gray-400"
                                                />
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        <div
                            className={
                                showMobileDetails
                                    ? "block"
                                    : "hidden md:block"
                            }
                        >
                            <h2 className="mb-2 text-2xl font-bold">
                                {activeSetting}
                            </h2>

                            {activeSetting === "Personal information" ? (
                                <div>
                                    <label
                                        htmlFor="profile-picture"
                                        className="flex min-h-[70px] cursor-pointer items-center justify-between border-b border-gray-200 py-3 dark:border-gray-800"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Camera size={22} />
                                            <span className="font-semibold">
                                                Profile picture
                                            </span>
                                        </div>

                                        <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                            {profilePicture ? (
                                                <img
                                                    src={profilePicture}
                                                    alt="Profile"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <UserRound
                                                    size={23}
                                                    className="mx-auto mt-2 text-gray-500"
                                                />
                                            )}
                                        </div>

                                        <input
                                            id="profile-picture"
                                            type="file"
                                            accept="image/*"
                                            onChange={
                                                handleProfilePictureChange
                                            }
                                            className="hidden"
                                        />
                                    </label>

                                    <PersonalInformationRow
                                        title="Legal name"
                                        value={legalName}
                                        action="Edit"
                                        onAction={() =>
                                            openEditModal("Legal name")
                                        }
                                    />

                                    <PersonalInformationRow
                                        title="Email address"
                                        value={email}
                                        action="Edit"
                                        onAction={() =>
                                            openEditModal("Email address")
                                        }
                                    />

                                    <PersonalInformationRow
                                        title="Phone number"
                                        value={phone}
                                        action="Edit"
                                        onAction={() =>
                                            openEditModal("Phone number")
                                        }
                                    />

                                    <PersonalInformationRow
                                        title="Residential address"
                                        value={getAddressValue()}
                                        action={
                                            streetAddress ? "Edit" : "Add"
                                        }
                                        onAction={() =>
                                            openEditModal(
                                                "Residential address",
                                            )
                                        }
                                    />

                                    <PersonalInformationRow
                                        title="Birthday"
                                        value={getBirthdayValue()}
                                        action={birthday ? "Edit" : "Add"}
                                        onAction={() =>
                                            openEditModal("Birthday")
                                        }
                                    />

                                    <PersonalInformationRow
                                        title="Gender"
                                        value={gender || "Not provided"}
                                        action={gender ? "Edit" : "Add"}
                                        onAction={() =>
                                            openEditModal("Gender")
                                        }
                                    />
                                </div>
                            ) : activeSetting === "Login & security" ? (
                                <div>
                                    <SecurityRow
                                        title="Password"
                                        value="Change your account password"
                                        action="Change"
                                        onAction={() => openModal("password")}
                                    />
                                </div>
                            ) : (
                                <div className="border-t border-gray-200 py-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                    Identity verification settings will appear
                                    here.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function PasswordInput({
                           value,
                           onChange,
                           visible,
                           onToggle,
                           placeholder,
                           ariaLabel,
                       }: {
    value: string;
    onChange: (value: string) => void;
    visible: boolean;
    onToggle: () => void;
    placeholder: string;
    ariaLabel: string;
}) {
    return (
        <div className="relative">
            <input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-900 outline-none focus:border-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            />

            <button
                type="button"
                onClick={onToggle}
                aria-label={ariaLabel}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            >
                {visible ? <EyeOff size={19} /> : <Eye size={19} />}
            </button>
        </div>
    );
}

function SecurityRow({
                         title,
                         value,
                         action,
                         onAction,
                     }: {
    title: string;
    value: string;
    action: string;
    onAction: () => void;
}) {
    return (
        <div className="flex min-h-[80px] justify-between gap-5 border-b border-gray-200 py-4 dark:border-gray-800">
            <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {value}
                </p>
            </div>

            <button
                type="button"
                onClick={onAction}
                className="cursor-pointer self-start text-sm font-medium underline underline-offset-2 hover:text-yellow-600 dark:hover:text-yellow-400"
            >
                {action}
            </button>
        </div>
    );
}

function PersonalInformationRow({
                                    title,
                                    value,
                                    action,
                                    onAction,
                                }: {
    title: string;
    value: string;
    action: string;
    onAction: () => void;
}) {
    return (
        <div className="flex min-h-[68px] items-start justify-between gap-5 border-b border-gray-200 py-3 dark:border-gray-800">
            <div className="min-w-0">
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">
                    {value}
                </p>
            </div>

            <button
                type="button"
                onClick={onAction}
                className="shrink-0 cursor-pointer text-sm font-medium underline underline-offset-2 hover:text-yellow-600 dark:hover:text-yellow-400"
            >
                {action}
            </button>
        </div>
    );
}