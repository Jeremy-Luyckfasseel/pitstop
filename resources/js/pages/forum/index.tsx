import { Head, Link, router, usePage } from '@inertiajs/react';
import { MessageSquare, Pin, Plus, Clock, User } from 'lucide-react';

import { type BreadcrumbItem, type SharedData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Forum
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Join discussions with the F1 community
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Select
                            value={currentSort}
                            onValueChange={handleSortChange}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="replies">
                                    Most Replies
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {auth.user && (
                            <Button asChild>
                                <Link href="/forum/create">
                                    <Plus className="mr-2 h-4 w-4" />
                                    New Thread
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {threads.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <MessageSquare className="mb-4 h-12 w-12 text-muted-foreground" />
                            <p className="text-lg text-muted-foreground">
                                No threads yet. Start the first discussion!
                            </p>
                            {auth.user && (
                                <Button asChild className="mt-4">
                                    <Link href="/forum/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Create Thread
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="space-y-4">
                            {threads.data.map((thread) => (
                                <Card
                                    key={thread.id}
                                    className={`transition-shadow hover:shadow-md ${
                                        thread.is_pinned
                                            ? 'border-primary/50 bg-primary/5'
                                            : ''
                                    }`}
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage
                                                        src={
                                                            thread.author.avatar
                                                                ? `/storage/${thread.author.avatar}`
                                                                : undefined
                                                        }
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(
                                                            thread.author.name
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-lg">
                                                        <Link
                                                            href={`/forum/${thread.id}`}
                                                            className="hover:underline"
                                                        >
                                                            {thread.title}
                                                        </Link>
                                                    </CardTitle>
                                                    <CardDescription className="flex items-center gap-2">
                                                        <span className="flex items-center gap-1">
                                                            <User className="h-3 w-3" />
                                                            {thread.author.name}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {formatDate(
                                                                thread.created_at
                                                            )}
                                                        </span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {thread.is_pinned && (
                                                    <Badge
                                                        variant="default"
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Pin className="h-3 w-3" />
                                                        Pinned
                                                    </Badge>
                                                )}
                                                <Badge variant="secondary">
                                                    <MessageSquare className="mr-1 h-3 w-3" />
                                                    {thread.replies_count}{' '}
                                                    {thread.replies_count === 1
                                                        ? 'reply'
                                                        : 'replies'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="line-clamp-2 text-sm text-muted-foreground">
                                            {thread.body}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {threads.last_page > 1 && (
                            <div className="flex items-center justify-center gap-2">
                                {Array.from(
                                    { length: threads.last_page },
                                    (_, i) => i + 1
                                ).map((page) => (
                                    <Button
                                        key={page}
                                        variant={
                                            page === threads.current_page
                                                ? 'default'
                                                : 'outline'
                                        }
                                        size="sm"
                                        asChild
                                    >
                                        <Link
                                            href={`/forum?page=${page}&sort=${currentSort}`}
                                        >
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
