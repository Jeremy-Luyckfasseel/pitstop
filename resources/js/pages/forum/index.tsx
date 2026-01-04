import { Head, Link, router, usePage } from '@inertiajs/react';
import { MessageSquare, Pin, Plus, Clock, User, Flame, TrendingUp } from 'lucide-react';

import { type BreadcrumbItem, type SharedData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import { formatDate, getInitials } from '@/lib/format';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
];

interface Author {
    id: number;
    name: string;
    username: string;
    avatar?: string;
}

interface Thread {
    id: number;
    title: string;
    body: string;
    is_pinned: boolean;
    created_at: string;
    author: Author;
    replies_count: number;
}

interface PaginatedThreads {
    data: Thread[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    threads: PaginatedThreads;
    currentSort: string;
}

export default function ForumIndex({ threads, currentSort }: Props) {
    const { auth } = usePage<SharedData>().props;

    const handleSortChange = (value: string) => {
        router.get('/forum', { sort: value }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forum" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/20 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20">
                                <Flame className="h-7 w-7 text-white" />
                            </div>
                            <h1 className="text-4xl font-black tracking-tight text-white">
                                Pit Lane Discussions
                            </h1>
                            <p className="mt-2 max-w-xl text-lg text-zinc-400">
                                Join the conversation with F1 fans worldwide. Debate strategies, share opinions, and connect with the community.
                            </p>
                            {threads.total > 0 && (
                                <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
                                    <span className="flex items-center gap-1.5">
                                        <MessageSquare className="h-4 w-4 text-red-500" />
                                        {threads.total} threads
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <Select value={currentSort} onValueChange={handleSortChange}>
                                <SelectTrigger className="w-[160px] border-zinc-700 bg-zinc-800 text-white">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="border-zinc-700 bg-zinc-800">
                                    <SelectItem value="newest">
                                        <span className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            Newest
                                        </span>
                                    </SelectItem>
                                    <SelectItem value="replies">
                                        <span className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4" />
                                            Most Replies
                                        </span>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {auth.user && (
                                <Button asChild className="bg-red-600 hover:bg-red-500">
                                    <Link href="/forum/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        New Thread
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {threads.data.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 py-20 text-center">
                        <MessageSquare className="mb-4 h-16 w-16 text-zinc-600" />
                        <p className="text-xl font-medium text-zinc-400">
                            No threads yet
                        </p>
                        <p className="mt-2 text-zinc-500">
                            Be the first to start a discussion!
                        </p>
                        {auth.user && (
                            <Button asChild className="mt-6 bg-red-600 hover:bg-red-500">
                                <Link href="/forum/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Thread
                                </Link>
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Thread List */}
                        <div className="space-y-3">
                            {threads.data.map((thread) => (
                                <Link
                                    key={thread.id}
                                    href={`/forum/${thread.id}`}
                                    className="group block"
                                >
                                    <article
                                        className={`rounded-xl border transition-all ${
                                            thread.is_pinned
                                                ? 'border-red-500/30 bg-red-500/5 hover:border-red-500/50'
                                                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
                                        }`}
                                    >
                                        <div className="flex items-start gap-4 p-5">
                                            {/* Avatar */}
                                            <Avatar className="h-12 w-12 shrink-0 border-2 border-zinc-700">
                                                <AvatarImage
                                                    src={
                                                        thread.author.avatar
                                                            ? `/storage/${thread.author.avatar}`
                                                            : undefined
                                                    }
                                                />
                                                <AvatarFallback className="bg-zinc-800 text-white">
                                                    {getInitials(thread.author.name)}
                                                </AvatarFallback>
                                            </Avatar>

                                            {/* Content */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    {thread.is_pinned && (
                                                        <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">
                                                            <Pin className="mr-1 h-3 w-3" />
                                                            Pinned
                                                        </Badge>
                                                    )}
                                                    <h2 className="text-lg font-semibold text-white transition-colors group-hover:text-red-400">
                                                        {thread.title}
                                                    </h2>
                                                </div>
                                                <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
                                                    {thread.body}
                                                </p>
                                                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                                                    <span className="flex items-center gap-1">
                                                        <User className="h-3 w-3" />
                                                        {thread.author.name}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {formatDate(thread.created_at)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Reply count */}
                                            <div className="hidden shrink-0 flex-col items-center rounded-lg bg-zinc-800 px-4 py-2 sm:flex">
                                                <span className="text-xl font-bold text-white">
                                                    {thread.replies_count}
                                                </span>
                                                <span className="text-xs text-zinc-500">
                                                    {thread.replies_count === 1 ? 'reply' : 'replies'}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {threads.last_page > 1 && (
                            <div className="mt-8 flex items-center justify-center gap-2">
                                {Array.from({ length: threads.last_page }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === threads.current_page ? 'default' : 'outline'}
                                        size="sm"
                                        className={page === threads.current_page ? 'bg-red-600 hover:bg-red-500' : 'border-zinc-700 hover:bg-zinc-800'}
                                        asChild
                                    >
                                        <Link href={`/forum?page=${page}&sort=${currentSort}`}>
                                            {page}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}
