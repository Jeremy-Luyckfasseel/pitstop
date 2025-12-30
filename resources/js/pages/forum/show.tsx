import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Edit,
    MessageSquare,
    Pin,
    PinOff,
    Trash2,
    User,
} from 'lucide-react';
import { useState } from 'react';

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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
    {
        title: 'Thread',
        href: '#',
    },
];

interface Author {
    id: number;
    name: string;
    username: string;
    avatar?: string;
}

interface Reply {
    id: number;
    body: string;
    created_at: string;
    author: Author;
}

interface Thread {
    id: number;
    title: string;
    body: string;
    is_pinned: boolean;
    created_at: string;
    author: Author;
    replies: Reply[];
}

interface Props {
    thread: Thread;
    canEdit: boolean;
    canDelete: boolean;
    canPin: boolean;
}

export default function ThreadShow({
    thread,
    canEdit,
    canDelete,
    canPin,
}: Props) {
    const { auth } = usePage<SharedData>().props;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleDelete = () => {
        router.delete(`/forum/${thread.id}`);
    };

    const handlePin = () => {
        router.post(`/forum/${thread.id}/pin`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={thread.title} />

            <div className="mx-auto max-w-4xl space-y-6">
                {/* Back button and actions */}
                <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/forum">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Forum
                        </Link>
                    </Button>
                    <div className="flex items-center gap-2">
                        {canPin && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePin}
                            >
                                {thread.is_pinned ? (
                                    <>
                                        <PinOff className="mr-2 h-4 w-4" />
                                        Unpin
                                    </>
                                ) : (
                                    <>
                                        <Pin className="mr-2 h-4 w-4" />
                                        Pin
                                    </>
                                )}
                            </Button>
                        )}
                        {canEdit && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/forum/${thread.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                            </Button>
                        )}
                        {canDelete && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </Button>
                        )}
                    </div>
                </div>

                {/* Thread content */}
                <Card>
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="mb-2 flex items-center gap-2">
                                    {thread.is_pinned && (
                                        <Badge
                                            variant="default"
                                            className="flex items-center gap-1"
                                        >
                                            <Pin className="h-3 w-3" />
                                            Pinned
                                        </Badge>
                                    )}
                                </div>
                                <CardTitle className="text-2xl">
                                    {thread.title}
                                </CardTitle>
                                <CardDescription className="mt-2 flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage
                                                src={
                                                    thread.author.avatar
                                                        ? `/storage/${thread.author.avatar}`
                                                        : undefined
                                                }
                                            />
                                            <AvatarFallback className="text-xs">
                                                {getInitials(
                                                    thread.author.name
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <Link
                                            href={`/profile/${thread.author.username}`}
                                            className="hover:underline"
                                        >
                                            {thread.author.name}
                                        </Link>
                                    </div>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(thread.created_at)}
                                    </span>
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-neutral dark:prose-invert max-w-none">
                            <p className="whitespace-pre-wrap">{thread.body}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Replies section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-xl font-semibold">
                            <MessageSquare className="h-5 w-5" />
                            Replies ({thread.replies.length})
                        </h2>
                    </div>

                    {thread.replies.length === 0 ? (
                        <Card>
                            <CardContent className="py-8 text-center text-muted-foreground">
                                No replies yet. Be the first to respond!
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {thread.replies.map((reply, index) => (
                                <Card key={reply.id}>
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={
                                                            reply.author.avatar
                                                                ? `/storage/${reply.author.avatar}`
                                                                : undefined
                                                        }
                                                    />
                                                    <AvatarFallback className="text-xs">
                                                        {getInitials(
                                                            reply.author.name
                                                        )}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <Link
                                                        href={`/profile/${reply.author.username}`}
                                                        className="font-medium hover:underline"
                                                    >
                                                        {reply.author.name}
                                                    </Link>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDate(
                                                            reply.created_at
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="outline">
                                                #{index + 1}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="whitespace-pre-wrap">
                                            {reply.body}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Reply form placeholder - will be implemented in Day 4 afternoon */}
                    {auth.user && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Post a Reply
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Reply functionality coming soon...
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Delete confirmation dialog */}
            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this thread and all its replies.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
