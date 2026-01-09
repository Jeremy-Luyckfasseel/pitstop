import { Head, Link } from '@inertiajs/react';
import {
    HelpCircle,
    MessageSquare,
    Newspaper,
    TrendingUp,
    Users,
    ShieldCheck,
    Plus,
    ArrowRight,
    Activity,
} from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

interface Stats {
    totalUsers: number;
    totalNews: number;
    totalFaqs: number;
    totalThreads: number;
}

interface RecentUser {
    id: number;
    name: string;
    username: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentUsers: RecentUser[];
}

export default function AdminDashboard({ stats, recentUsers }: Props) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const statCards = [
        {
            label: 'Total Users',
            value: stats.totalUsers,
            icon: Users,
            color: 'red',
            description: 'Registered accounts',
        },
        {
            label: 'News Articles',
            value: stats.totalNews,
            icon: Newspaper,
            color: 'amber',
            description: 'Published articles',
        },
        {
            label: 'FAQ Questions',
            value: stats.totalFaqs,
            icon: HelpCircle,
            color: 'green',
            description: 'Help topics',
        },
        {
            label: 'Forum Threads',
            value: stats.totalThreads,
            icon: MessageSquare,
            color: 'blue',
            description: 'Community discussions',
        },
    ];

    const colorClasses = {
        red: { bg: 'bg-red-500/10', icon: 'text-red-400', border: 'border-red-500/20' },
        amber: { bg: 'bg-amber-500/10', icon: 'text-amber-400', border: 'border-amber-500/20' },
        green: { bg: 'bg-green-500/10', icon: 'text-green-400', border: 'border-green-500/20' },
        blue: { bg: 'bg-blue-500/10', icon: 'text-blue-400', border: 'border-blue-500/20' },
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/30 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
                    <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
                    <div className="relative flex items-start justify-between">
                        <div>
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20">
                                <ShieldCheck className="h-7 w-7 text-white" />
                            </div>
                            <h1 className="text-4xl font-black tracking-tight text-white">
                                Command Center
                            </h1>
                            <p className="mt-2 max-w-xl text-lg text-zinc-400">
                                Manage your pit crew, news updates, and community discussions from here.
                            </p>
                        </div>
                        <div className="hidden items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-sm text-green-400 md:flex">
                            <Activity className="h-4 w-4 animate-pulse" />
                            Systems Online
                        </div>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat) => {
                        const colors = colorClasses[stat.color as keyof typeof colorClasses];
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className={`rounded-xl border ${colors.border} bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg}`}>
                                        <Icon className={`h-5 w-5 ${colors.icon}`} />
                                    </div>
                                    <span className="text-3xl font-black text-white">{stat.value}</span>
                                </div>
                                <div className="mt-4">
                                    <p className="font-medium text-white">{stat.label}</p>
                                    <p className="text-sm text-zinc-500">{stat.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Management Grid */}
                <div className="mb-8">
                    <h2 className="mb-4 text-lg font-bold text-white">Quick Management</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* User Management */}
                        <Link href="/admin/users" className="group">
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-red-500/50 hover:bg-zinc-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                                    <Users className="h-6 w-6 text-red-400" />
                                </div>
                                <h3 className="font-semibold text-white group-hover:text-red-400">User Management</h3>
                                <p className="mt-1 text-sm text-zinc-500">Manage users & permissions</p>
                                <div className="mt-4 flex items-center text-sm text-red-400">
                                    Manage <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>

                        {/* News Management */}
                        <Link href="/admin/news" className="group">
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-amber-500/50 hover:bg-zinc-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                                    <Newspaper className="h-6 w-6 text-amber-400" />
                                </div>
                                <h3 className="font-semibold text-white group-hover:text-amber-400">News Management</h3>
                                <p className="mt-1 text-sm text-zinc-500">Create and edit articles</p>
                                <div className="mt-4 flex items-center text-sm text-amber-400">
                                    Manage <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>

                        {/* FAQ Management */}
                        <Link href="/admin/faqs" className="group">
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-green-500/50 hover:bg-zinc-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10">
                                    <HelpCircle className="h-6 w-6 text-green-400" />
                                </div>
                                <h3 className="font-semibold text-white group-hover:text-green-400">FAQ Management</h3>
                                <p className="mt-1 text-sm text-zinc-500">Manage questions & answers</p>
                                <div className="mt-4 flex items-center text-sm text-green-400">
                                    Manage <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>

                        {/* Forum */}
                        <Link href="/forum" className="group">
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-blue-500/50 hover:bg-zinc-900">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                                    <MessageSquare className="h-6 w-6 text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-white group-hover:text-blue-400">Forum</h3>
                                <p className="mt-1 text-sm text-zinc-500">View & moderate discussions</p>
                                <div className="mt-4 flex items-center text-sm text-blue-400">
                                    Go to Forum <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Registrations */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
                        <div className="border-b border-zinc-800 px-6 py-4">
                            <h2 className="text-lg font-bold text-white">Recent Registrations</h2>
                            <p className="text-sm text-zinc-500">Newest members in your community</p>
                        </div>
                        <div className="p-4">
                            <div className="space-y-3">
                                {recentUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between rounded-lg bg-zinc-800/50 p-3 transition-colors hover:bg-zinc-800"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-zinc-700">
                                                <AvatarFallback className="bg-zinc-700 text-white">
                                                    {getInitials(user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Link
                                                    href={`/profile/${user.username}`}
                                                    className="font-medium text-white hover:text-red-400"
                                                >
                                                    {user.name}
                                                </Link>
                                                <div className="flex items-center gap-2 text-sm text-zinc-500">
                                                    <span>@{user.username}</span>
                                                    {user.is_admin && (
                                                        <Badge className="bg-red-500/20 text-red-400 text-xs">
                                                            Admin
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-sm text-zinc-500">
                                            {formatDate(user.created_at)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
                        <div className="border-b border-zinc-800 px-6 py-4">
                            <h2 className="text-lg font-bold text-white">Quick Actions</h2>
                            <p className="text-sm text-zinc-500">Common administrative tasks</p>
                        </div>
                        <div className="p-6">
                            <div className="grid gap-3 sm:grid-cols-2">
                                <Button asChild className="justify-start bg-red-600 hover:bg-red-500">
                                    <Link href="/admin/news/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Article
                                    </Link>
                                </Button>
                                <Button asChild className="justify-start bg-amber-600 hover:bg-amber-500">
                                    <Link href="/admin/faqs/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        New FAQ
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="justify-start border-zinc-700 hover:bg-zinc-800">
                                    <Link href="/admin/faq-categories/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Category
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="justify-start border-zinc-700 hover:bg-zinc-800">
                                    <Link href="/admin/users/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        New User
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
