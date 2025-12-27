import GuestLayout from '@/layouts/guest-layout';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { Flag, MessageSquare, Trophy, Users } from 'lucide-react';

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

            {/* Hero Section */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="mb-8 inline-flex items-center justify-center">
                        <Flag className="h-16 w-16 text-red-600" strokeWidth={1.5} />
                    </div>
                    <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome to Pitstop
                    </h1>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
                        Your home for Formula 1 discussions. Connect with fans, share your passion, 
                        and stay up to date with the latest F1 news.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/register">
                            <Button size="lg" className="text-base">
                                Join the Community
                            </Button>
                        </Link>
                        <Link href="/forum">
                            <Button size="lg" variant="outline" className="text-base">
                                Explore Forum
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="border-t border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                                <MessageSquare className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                Active Forum
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Join discussions about races, drivers, teams, and technical analysis with passionate F1 fans.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                                <Trophy className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                Latest News
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Stay informed with breaking F1 news, race updates, and exclusive content.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                                <Users className="h-8 w-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                                Vibrant Community
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Connect with fellow F1 enthusiasts from around the world. Share insights and make friends.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-gradient-to-r from-red-600 to-red-700 px-8 py-12 text-center shadow-xl">
                        <h2 className="mb-4 text-3xl font-bold text-white">
                            Ready to Join the Conversation?
                        </h2>
                        <p className="mb-6 text-xl text-red-100">
                            Create your account today and become part of the Pitstop community.
                        </p>
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="text-base">
                                Sign Up Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
