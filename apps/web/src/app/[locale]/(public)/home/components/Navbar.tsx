import Link from "next/link";
import { useTranslations } from "next-intl";
import ThemeToggle from "@/src/components/ThemeToggle";

export default function Navbar() {

    const t = useTranslations('Public');

    return (
        <header className="navbar bg-base-100 shadow-md px-6">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost normal-case text-xl">
                    {t('Header.home')}
                </Link>
            </div>
            <Link href="/admin/trades" className="btn btn-primary">
                Go to Trades
            </Link>
            <div className="ml-4">
                <ThemeToggle />
            </div>
        </header>
    );
}