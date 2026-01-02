import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Edit,
    Heart,
    MessageSquare,
    Pin,
    PinOff,
    Send,
    Trash2,
    X,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { formatDateTime, getInitials } from '@/lib/format';

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
    canEdit: boolean;
    canDelete: boolean;
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
    isFavorited: boolean;
}

export default function ThreadShow({
    thread,
    canEdit,
    canDelete,
    canPin,
    isFavorited,
}: Props) {
    const { auth } = usePage<SharedData>().props;
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteReplyId, setDeleteReplyId] = useState<number | null>(null);
    const [editingReplyId, setEditingReplyId] = useState<number | null>(null);

    // Reply form
    const replyForm = useForm({
        body: '',
    });

    // Edit reply form
    const editForm = useForm({
        body: '',
    });

    const handleDeleteThread = () => {
        router.delete(`/forum/${thread.id}`);
    };

    const handlePin = () => {
        router.post(`/forum/${thread.id}/pin`);
    };

    const handleFavorite = () => {
        router.post(`/forum/${thread.id}/favorite`);
    };

    const submitReply: FormEventHandler = (e) => {
        e.preventDefault();
        replyForm.post(`/forum/${thread.id}/replies`, {
            onSuccess: () => replyForm.reset(),
        });
    };

    const startEditReply = (reply: Reply) => {
        setEditingReplyId(reply.id);
        editForm.setData('body', reply.body);
    };

    const cancelEditReply = () => {
        setEditingReplyId(null);
        editForm.reset();
    };

    const submitEditReply: FormEventHandler = (e) => {
        e.preventDefault();
        if (editingReplyId) {
            editForm.put(`/replies/${editingReplyId}`, {
                onSuccess: () => {
                    setEditingReplyId(null);
                    editForm.reset();
                },
            });
        }
    };

    const handleDeleteReply = () => {
        if (deleteReplyId) {
            router.delete(`/replies/${deleteReplyId}`, {
                onSuccess: () => setDeleteReplyId(null),
            });
        }
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
                        <Button
                            variant={isFavorited ? 'default' : 'outline'}
                            size="sm"
                            onClick={handleFavorite}
                        >
                            <Heart
                                className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`}
                            />
                            {isFavorited ? 'Favorited' : 'Favorite'}
                        </Button>
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
                                        {formatDateTime(thread.created_at)}
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
                                                        {formatDateTime(
                                                            reply.created_at
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline">
                                                    #{index + 1}
                                                </Badge>
                                                {reply.canEdit && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            startEditReply(
                                                                reply
                                                            )
                                                        }
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {reply.canDelete && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            setDeleteReplyId(
                                                                reply.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {editingReplyId === reply.id ? (
                                            <form
                                                onSubmit={submitEditReply}
                                                className="space-y-4"
                                            >
                                                <Textarea
                                                    value={editForm.data.body}
                                                    onChange={(e) =>
                                                        editForm.setData(
                                                            'body',
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={4}
                                                />
                                                <InputError
                                                    message={
                                                        editForm.errors.body
                                                    }
                                                />
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="submit"
                                                        size="sm"
                                                        disabled={
                                                            editForm.processing
                                                        }
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={cancelEditReply}
                                                    >
                                                        <X className="mr-1 h-4 w-4" />
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </form>
                                        ) : (
                                            <p className="whitespace-pre-wrap">
                                                {reply.body}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Reply form */}
                    {auth.user ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">
                                    Post a Reply
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    onSubmit={submitReply}
                                    className="space-y-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="reply-body">
                                            Your Reply
                                        </Label>
                                        <Textarea
                                            id="reply-body"
                                            value={replyForm.data.body}
                                            onChange={(e) =>
                                                replyForm.setData(
                                                    'body',
                                                    e.target.value
                                                )
                                            }
                                            rows={4}
                                            placeholder="Write your reply here..."
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            {replyForm.data.body.length}/5,000
                                            characters
                                        </p>
                                        <InputError
                                            message={replyForm.errors.body}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={replyForm.processing}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        Post Reply
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="py-6 text-center">
                                <p className="text-muted-foreground">
                                    Please{' '}
                                    <Link
                                        href="/login"
                                        className="text-primary underline"
                                    >
                                        log in
                                    </Link>{' '}
                                    to post a reply.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {/* Delete thread confirmation dialog */}
            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Delete this thread?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this thread and all its replies.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteThread}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete reply confirmation dialog */}
            <AlertDialog
                open={deleteReplyId !== null}
                onOpenChange={() => setDeleteReplyId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete this reply?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this reply.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteReply}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
