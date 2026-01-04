import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, Heart, MessageSquare, Newspaper, User, Trophy, Flag } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

interface ProfileUser {
    id: number;
    name: string;
    username: string;
    bio: string | null;
    birthday: string | null;
    avatar: string | null;
    is_admin: boolean;
    created_at: string;
}

interface Thread {
    id: number;
    title: string;
    created_at: string;
    replies_count: number;
}

interface Reply {
    id: number;
    body: string;
    created_at: string;
    thread: {
        id: number;
        title: string;
    };
}

interface NewsItem {
    id: number;
    title: string;
    created_at: string;
}

interface FavoriteThread {
    id: number;
    title: string;
    replies_count: number;
    author: {
        name: string;
        username: string;
    };
}

interface Props {
    profileUser: ProfileUser;
    recentThreads: Thread[];
    recentReplies: Reply[];
    recentNews: NewsItem[];
    favoriteThreads: FavoriteThread[];
    isOwner: boolean;
}

export default function ProfileShow({
    profileUser,
    recentThreads,
    recentReplies,
    recentNews,
    favoriteThreads,
    isOwner,
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Profile', href: '#' },
        { title: profileUser.username, href: `/profile/${profileUser.username}` },
    ];

    const getInitials = (name: string) => {
        return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatShortDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${profileUser.name} (@${profileUser.username})`} />

            <div className="p-6">
                <div className="mx-auto max-w-4xl space-y-6">
                    {/* Profile Header Hero */}
                    <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/30">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
                        <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
                        <div className="relative p-8">
                            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                                <Avatar className="h-28 w-28 border-4 border-zinc-700 shadow-xl">
                                    <AvatarImage src={profileUser.avatar ? `/storage/${profileUser.avatar}` : undefined} />
                                    <AvatarFallback className="bg-zinc-800 text-3xl text-white">
                                        {getInitials(profileUser.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                                        <h1 className="text-3xl font-black text-white">{profileUser.name}</h1>
                                        {profileUser.is_admin && (
                                            <Badge className="bg-red-500/20 text-red-400">
                                                <Trophy className="mr-1 h-3 w-3" />
                                                Admin
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-lg text-zinc-400">@{profileUser.username}</p>
                                    {profileUser.bio && (
                                        <p className="mt-3 max-w-lg text-zinc-300">{profileUser.bio}</p>
                                    )}
                                    <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-zinc-500 sm:justify-start">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            Member since {formatDate(profileUser.created_at)}
                                        </span>
                                        {profileUser.birthday && (
                                            <span className="flex items-center gap-1">
                                                🎂 {formatDate(profileUser.birthday)}
                                            </span>
                                        )}
                                    </div>
                                    {isOwner && (
                                        <div className="mt-4">
                                            <Button asChild className="bg-red-600 hover:bg-red-500">
                                                <Link href="/settings/profile">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Profile
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Recent Threads */}
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
                            <div className="border-b border-zinc-800 p-4">
                                <h2 className="flex items-center gap-2 font-bold text-white">
                                    <MessageSquare className="h-5 w-5 text-red-500" />
                                    Recent Threads
                                </h2>
                                <p className="text-sm text-zinc-500">Forum threads started by {profileUser.name}</p>
                            </div>
                            <div className="p-4">
                                {recentThreads.length === 0 ? (
                                    <p className="text-sm text-zinc-500">No threads yet.</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {recentThreads.map((thread) => (
                                            <li key={thread.id}>
                                                <Link href={`/forum/${thread.id}`} className="group block rounded-lg bg-zinc-800/50 p-3 transition-colors hover:bg-zinc-800">
                                                    <p className="font-medium text-white group-hover:text-red-400">{thread.title}</p>
                                                    <p className="text-xs text-zinc-500">
                                                        {formatShortDate(thread.created_at)} · {thread.replies_count} {thread.replies_count === 1 ? 'reply' : 'replies'}
                                                    </p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Recent Replies */}
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
                            <div className="border-b border-zinc-800 p-4">
                                <h2 className="flex items-center gap-2 font-bold text-white">
                                    <User className="h-5 w-5 text-amber-500" />
                                    Recent Replies
                                </h2>
                                <p className="text-sm text-zinc-500">Recent forum replies by {profileUser.name}</p>
                            </div>
                            <div className="p-4">
                                {recentReplies.length === 0 ? (
                                    <p className="text-sm text-zinc-500">No replies yet.</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {recentReplies.map((reply) => (
                                            <li key={reply.id}>
                                                <Link href={`/forum/${reply.thread.id}`} className="group block rounded-lg bg-zinc-800/50 p-3 transition-colors hover:bg-zinc-800">
                                                    <p className="line-clamp-2 text-sm text-zinc-300 group-hover:text-white">{reply.body}</p>
                                                    <p className="text-xs text-zinc-500">in "{reply.thread.title}" · {formatShortDate(reply.created_at)}</p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent News (Admin only) */}
                    {recentNews.length > 0 && (
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
                            <div className="border-b border-zinc-800 p-4">
                                <h2 className="flex items-center gap-2 font-bold text-white">
                                    <Newspaper className="h-5 w-5 text-green-500" />
                                    Recent News Articles
                                </h2>
                                <p className="text-sm text-zinc-500">News published by {profileUser.name}</p>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {recentNews.map((news) => (
                                        <li key={news.id}>
                                            <Link href={`/news/${news.id}`} className="group block rounded-lg bg-zinc-800/50 p-3 transition-colors hover:bg-zinc-800">
                                                <p className="font-medium text-white group-hover:text-green-400">{news.title}</p>
                                                <p className="text-xs text-zinc-500">{formatShortDate(news.created_at)}</p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Favorite Threads */}
                    {favoriteThreads.length > 0 && (
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
                            <div className="border-b border-zinc-800 p-4">
                                <h2 className="flex items-center gap-2 font-bold text-white">
                                    <Heart className="h-5 w-5 text-red-500" />
                                    Favorite Threads
                                </h2>
                                <p className="text-sm text-zinc-500">Threads bookmarked by {profileUser.name}</p>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {favoriteThreads.map((thread) => (
                                        <li key={thread.id}>
                                            <Link href={`/forum/${thread.id}`} className="group block rounded-lg bg-zinc-800/50 p-3 transition-colors hover:bg-zinc-800">
                                                <p className="font-medium text-white group-hover:text-red-400">{thread.title}</p>
                                                <p className="text-xs text-zinc-500">
                                                    by {thread.author.name} · {thread.replies_count} {thread.replies_count === 1 ? 'reply' : 'replies'}
                                                </p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
