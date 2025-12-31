import { Head, Link } from '@inertiajs/react';
import { Calendar, Edit, Heart, MessageSquare, Newspaper, User } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
        {
            title: 'Profile',
            href: '#',
        },
        {
            title: profileUser.username,
            href: `/profile/${profileUser.username}`,
        },
    ];

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
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatShortDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${profileUser.name} (@${profileUser.username})`} />

            <div className="mx-auto max-w-4xl space-y-6">
                {/* Profile Header */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                            <Avatar className="h-24 w-24">
                                <AvatarImage
                                    src={
                                        profileUser.avatar
                                            ? `/storage/${profileUser.avatar}`
                                            : undefined
                                    }
                                />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(profileUser.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
                                    <h1 className="text-2xl font-bold">
                                        {profileUser.name}
                                    </h1>
                                    {profileUser.is_admin && (
                                        <Badge variant="default">Admin</Badge>
                                    )}
                                </div>
                                <p className="text-muted-foreground">
                                    @{profileUser.username}
                                </p>
                                {profileUser.bio && (
                                    <p className="mt-3 max-w-lg">
                                        {profileUser.bio}
                                    </p>
                                )}
                                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Member since{' '}
                                        {formatDate(profileUser.created_at)}
                                    </span>
                                    {profileUser.birthday && (
                                        <span className="flex items-center gap-1">
                                            🎂 {formatDate(profileUser.birthday)}
                                        </span>
                                    )}
                                </div>
                                {isOwner && (
                                    <div className="mt-4">
                                        <Button variant="outline" asChild>
                                            <Link href="/settings/profile">
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Profile
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Threads */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5" />
                                Recent Threads
                            </CardTitle>
                            <CardDescription>
                                Forum threads started by {profileUser.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentThreads.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No threads yet.
                                </p>
                            ) : (
                                <ul className="space-y-3">
                                    {recentThreads.map((thread) => (
                                        <li key={thread.id}>
                                            <Link
                                                href={`/forum/${thread.id}`}
                                                className="group block"
                                            >
                                                <p className="font-medium group-hover:underline">
                                                    {thread.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatShortDate(
                                                        thread.created_at
                                                    )}{' '}
                                                    · {thread.replies_count}{' '}
                                                    {thread.replies_count === 1
                                                        ? 'reply'
                                                        : 'replies'}
                                                </p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Replies */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Recent Replies
                            </CardTitle>
                            <CardDescription>
                                Recent forum replies by {profileUser.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentReplies.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No replies yet.
                                </p>
                            ) : (
                                <ul className="space-y-3">
                                    {recentReplies.map((reply) => (
                                        <li key={reply.id}>
                                            <Link
                                                href={`/forum/${reply.thread.id}`}
                                                className="group block"
                                            >
                                                <p className="line-clamp-2 text-sm group-hover:underline">
                                                    {reply.body}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    in "{reply.thread.title}" ·{' '}
                                                    {formatShortDate(
                                                        reply.created_at
                                                    )}
                                                </p>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recent News (Admin only) */}
                {recentNews.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Newspaper className="h-5 w-5" />
                                Recent News Articles
                            </CardTitle>
                            <CardDescription>
                                News published by {profileUser.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {recentNews.map((news) => (
                                    <li key={news.id}>
                                        <Link
                                            href={`/news/${news.id}`}
                                            className="group block"
                                        >
                                            <p className="font-medium group-hover:underline">
                                                {news.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatShortDate(
                                                    news.created_at
                                                )}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {/* Favorite Threads */}
                {favoriteThreads.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                Favorite Threads
                            </CardTitle>
                            <CardDescription>
                                Threads bookmarked by {profileUser.name}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {favoriteThreads.map((thread) => (
                                    <li key={thread.id}>
                                        <Link
                                            href={`/forum/${thread.id}`}
                                            className="group block"
                                        >
                                            <p className="font-medium group-hover:underline">
                                                {thread.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                by {thread.author.name} · {thread.replies_count}{' '}
                                                {thread.replies_count === 1 ? 'reply' : 'replies'}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
