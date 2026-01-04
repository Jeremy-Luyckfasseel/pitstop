import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { Flag, MessageSquare, Newspaper, Users, Zap, ChevronRight, Timer } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <GuestLayout>
            <Head title="Welcome to Pitstop">
                <meta name="description" content="Pitstop - The ultimate F1 fan forum. Discuss races, drivers, teams, and everything Formula 1." />
            </Head>

            {/* Hero Section with Racing Grid Background */}
            <div className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
                {/* Racing grid pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full" style={{
                        backgroundImage: `
                            linear-gradient(90deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%),
                            linear-gradient(0deg, transparent 49%, rgba(255,255,255,0.1) 50%, transparent 51%)
                        `,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                {/* Animated racing stripe */}
                <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

                {/* Diagonal speed lines */}
                <div className="absolute -right-20 top-20 h-96 w-2 rotate-45 bg-gradient-to-b from-red-500/30 to-transparent" />
                <div className="absolute -right-10 top-32 h-64 w-1 rotate-45 bg-gradient-to-b from-amber-500/30 to-transparent" />
                <div className="absolute -left-20 bottom-20 h-96 w-2 -rotate-45 bg-gradient-to-t from-red-500/30 to-transparent" />

                {/* Content */}
                <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
                    {/* Racing flag icon with glow effect */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-red-500 opacity-20 blur-3xl" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600 to-red-700 shadow-2xl shadow-red-500/30">
                            <Flag className="h-12 w-12 text-white" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Main heading with racing-style typography */}
                    <h1 className="mb-2 text-7xl font-black uppercase tracking-tighter text-white md:text-8xl">
                        <span className="bg-gradient-to-r from-red-500 via-red-400 to-amber-500 bg-clip-text text-transparent">
                            Pitstop
                        </span>
                    </h1>
                    <p className="mb-4 text-lg font-medium uppercase tracking-[0.3em] text-zinc-400">
                        Where F1 Fans Unite
                    </p>

                    {/* Racing-style stats bar */}
                    <div className="mb-8 flex items-center gap-8 rounded-full border border-zinc-700 bg-zinc-800/50 px-8 py-3 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-zinc-300">
                            <Timer className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-mono">24/7 LIVE</span>
                        </div>
                        <div className="h-4 w-px bg-zinc-600" />
                        <div className="flex items-center gap-2 text-zinc-300">
                            <Users className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-mono">GLOBAL COMMUNITY</span>
                        </div>
                        <div className="h-4 w-px bg-zinc-600" />
                        <div className="flex items-center gap-2 text-zinc-300">
                            <Zap className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-mono">INSTANT UPDATES</span>
                        </div>
                    </div>

                    <p className="mx-auto mb-10 max-w-xl text-lg text-zinc-400">
                        The ultimate destination for Formula 1 enthusiasts. Join heated debates, get breaking news, and connect with fans worldwide.
                    </p>

                    {/* CTA buttons with racing style */}
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link href="/register">
                            <Button size="lg" className="group relative overflow-hidden bg-red-600 px-8 text-base font-bold uppercase tracking-wide hover:bg-red-500">
                                <span className="relative z-10 flex items-center gap-2">
                                    Join the Grid
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button size="lg" variant="outline" className="border-zinc-600 bg-transparent px-8 text-base font-bold uppercase tracking-wide text-white hover:bg-zinc-800 hover:text-white">
                                Sign In
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Features Section with Card Grid */}
            <div className="bg-zinc-950 py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-red-500">Features</h2>
                        <p className="mt-2 text-4xl font-black text-white">Everything You Need</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {/* Forum Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-500/10 blur-2xl transition-all group-hover:bg-red-500/20" />
                            <div className="relative">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600">
                                    <MessageSquare className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">Race Discussions</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Dive into post-race analysis, strategy debates, and hot takes with passionate fans from around the world.
                                </p>
                            </div>
                        </div>

                        {/* News Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl transition-all group-hover:bg-amber-500/20" />
                            <div className="relative">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                                    <Newspaper className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">Breaking News</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Stay ahead with real-time updates on transfers, technical developments, and everything happening in the paddock.
                                </p>
                            </div>
                        </div>

                        {/* Community Card */}
                        <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
                            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-green-500/10 blur-2xl transition-all group-hover:bg-green-500/20" />
                            <div className="relative">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600">
                                    <Users className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">Global Fanbase</h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    Connect with F1 enthusiasts worldwide. Share your passion, make friends, and celebrate the sport together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section with Racing Theme */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-amber-500 py-20">
                {/* Checkered pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="h-full w-full" style={{
                        backgroundImage: `
                            linear-gradient(45deg, #000 25%, transparent 25%),
                            linear-gradient(-45deg, #000 25%, transparent 25%),
                            linear-gradient(45deg, transparent 75%, #000 75%),
                            linear-gradient(-45deg, transparent 75%, #000 75%)
                        `,
                        backgroundSize: '40px 40px',
                        backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
                    }} />
                </div>

                <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                        Ready for Lights Out?
                    </h2>
                    <p className="mb-8 text-xl text-white/90">
                        Join thousands of F1 fans already on Pitstop. It's free to sign up.
                    </p>
                    <Link href="/register">
                        <Button size="lg" variant="secondary" className="bg-white px-10 text-base font-bold uppercase tracking-wide text-red-600 hover:bg-zinc-100">
                            Start Your Engine
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-800 bg-zinc-950 py-8">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} Pitstop. The ultimate destination for F1 fans.
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
