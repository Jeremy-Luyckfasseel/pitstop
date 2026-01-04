import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-zinc-950 p-6 md:p-10">
            {/* Racing grid background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" style={{
                    backgroundImage: `
                        linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%),
                        linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%)
                    `,
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Top racing stripe */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

            {/* Diagonal accent lines */}
            <div className="absolute -right-20 top-20 h-80 w-1 rotate-45 bg-gradient-to-b from-red-500/20 to-transparent" />
            <div className="absolute -left-20 bottom-20 h-80 w-1 -rotate-45 bg-gradient-to-t from-red-500/20 to-transparent" />

            <div className="relative z-10 w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="group flex flex-col items-center gap-2 font-medium"
                        >
                            {/* Logo with glow effect */}
                            <div className="relative">
                                <div className="absolute inset-0 rounded-xl bg-red-500 opacity-20 blur-xl transition-opacity group-hover:opacity-30" />
                                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-lg">
                                    <AppLogoIcon className="size-8 fill-current text-white" />
                                </div>
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
                            <p className="text-center text-sm text-zinc-400">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Form container with subtle border */}
                    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm">
                        {children}
                    </div>

                    {/* Footer link */}
                    <div className="text-center text-xs text-zinc-500">
                        <Link href={home()} className="hover:text-zinc-300 transition-colors">
                            ← Back to Pitstop
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
