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
    User,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import { type BreadcrumbItem, type SharedData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/back-button';
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

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Forum', href: '/forum' },
        { title: thread.title.slice(0, 30) + (thread.title.length > 30 ? '...' : ''), href: '#' },
    ];

    const replyForm = useForm({ body: '' });
    const editForm = useForm({ body: '' });

    const handleDeleteThread = () => router.delete(`/forum/${thread.id}`);
    const handlePin = () => router.post(`/forum/${thread.id}/pin`);
    const handleFavorite = () => router.post(`/forum/${thread.id}/favorite`);

    const submitReply: FormEventHandler = (e) => {
        e.preventDefault();
        replyForm.post(`/forum/${thread.id}/replies`, { onSuccess: () => replyForm.reset() });
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
                onSuccess: () => { setEditingReplyId(null); editForm.reset(); },
            });
        }
    };

    const handleDeleteReply = () => {
        if (deleteReplyId) {
            router.delete(`/replies/${deleteReplyId}`, { onSuccess: () => setDeleteReplyId(null) });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={thread.title} />

            <div className="p-6">
                <div className="mx-auto max-w-4xl">
                    {/* Header with back and actions */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <BackButton fallbackUrl="/forum">Back to Forum</BackButton>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                variant={isFavorited ? 'default' : 'outline'}
                                size="sm"
                                onClick={handleFavorite}
                                className={isFavorited ? 'bg-red-600 hover:bg-red-500' : 'border-zinc-700 hover:bg-zinc-800'}
                            >
                                <Heart className={`mr-2 h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                                {isFavorited ? 'Favorited' : 'Favorite'}
                            </Button>
                            {canPin && (
                                <Button variant="outline" size="sm" onClick={handlePin} className="border-zinc-700 hover:bg-zinc-800">
                                    {thread.is_pinned ? <><PinOff className="mr-2 h-4 w-4" />Unpin</> : <><Pin className="mr-2 h-4 w-4" />Pin</>}
                                </Button>
                            )}
                            {canEdit && (
                                <Button variant="outline" size="sm" asChild className="border-zinc-700 hover:bg-zinc-800">
                                    <Link href={`/forum/${thread.id}/edit`}><Edit className="mr-2 h-4 w-4" />Edit</Link>
                                </Button>
                            )}
                            {canDelete && (
                                <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(true)} className="border-red-500/30 text-red-400 hover:bg-red-500/10">
                                    <Trash2 className="mr-2 h-4 w-4" />Delete
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Thread Content */}
                    <article className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/50">
                        <div className="border-b border-zinc-800 p-6">
                            <div className="mb-4 flex flex-wrap items-center gap-2">
                                {thread.is_pinned && (
                                    <Badge className="bg-red-500/20 text-red-400">
                                        <Pin className="mr-1 h-3 w-3" />Pinned
                                    </Badge>
                                )}
                            </div>
                            <h1 className="mb-4 text-3xl font-bold text-white">{thread.title}</h1>
                            <div className="flex flex-wrap items-center gap-4">
                                <Link href={`/profile/${thread.author.username}`} className="group flex items-center gap-3">
                                    <Avatar className="h-10 w-10 border-2 border-zinc-700 transition-colors group-hover:border-red-500">
                                        <AvatarImage src={thread.author.avatar ? `/storage/${thread.author.avatar}` : undefined} />
                                        <AvatarFallback className="bg-zinc-800 text-white">{getInitials(thread.author.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-white transition-colors group-hover:text-red-400">{thread.author.name}</p>
                                        <p className="text-sm text-zinc-500">@{thread.author.username}</p>
                                    </div>
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-zinc-500">
                                    <Calendar className="h-4 w-4" />
                                    {formatDateTime(thread.created_at)}
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="whitespace-pre-wrap text-lg leading-relaxed text-zinc-300">{thread.body}</div>
                        </div>
                    </article>

                    {/* Replies Section */}
                    <div className="mb-6">
                        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                            <MessageSquare className="h-5 w-5 text-red-500" />
                            Replies ({thread.replies.length})
                        </h2>

                        {thread.replies.length === 0 ? (
                            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-12 text-center">
                                <MessageSquare className="mx-auto mb-3 h-10 w-10 text-zinc-600" />
                                <p className="text-zinc-400">No replies yet. Be the first to respond!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {thread.replies.map((reply, index) => (
                                    <div key={reply.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50">
                                        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8 border border-zinc-700">
                                                    <AvatarImage src={reply.author.avatar ? `/storage/${reply.author.avatar}` : undefined} />
                                                    <AvatarFallback className="bg-zinc-800 text-xs text-white">{getInitials(reply.author.name)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <Link href={`/profile/${reply.author.username}`} className="font-medium text-white hover:text-red-400">{reply.author.name}</Link>
                                                    <p className="text-xs text-zinc-500">{formatDateTime(reply.created_at)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="border-zinc-700 text-zinc-500">#{index + 1}</Badge>
                                                {reply.canEdit && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white" onClick={() => startEditReply(reply)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {reply.canDelete && (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-red-400" onClick={() => setDeleteReplyId(reply.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            {editingReplyId === reply.id ? (
                                                <form onSubmit={submitEditReply} className="space-y-4">
                                                    <Textarea value={editForm.data.body} onChange={(e) => editForm.setData('body', e.target.value)} rows={4} className="border-zinc-700 bg-zinc-800 text-white" />
                                                    <InputError message={editForm.errors.body} />
                                                    <div className="flex gap-2">
                                                        <Button type="submit" size="sm" disabled={editForm.processing} className="bg-red-600 hover:bg-red-500">Save</Button>
                                                        <Button type="button" variant="outline" size="sm" onClick={cancelEditReply} className="border-zinc-700"><X className="mr-1 h-4 w-4" />Cancel</Button>
                                                    </div>
                                                </form>
                                            ) : (
                                                <p className="whitespace-pre-wrap text-zinc-300">{reply.body}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Reply Form */}
                    {auth.user ? (
                        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                            <h3 className="mb-4 text-lg font-bold text-white">Post a Reply</h3>
                            <form onSubmit={submitReply} className="space-y-4">
                                <div>
                                    <Label htmlFor="reply-body" className="text-zinc-300">Your Reply</Label>
                                    <Textarea id="reply-body" value={replyForm.data.body} onChange={(e) => replyForm.setData('body', e.target.value)} rows={4} placeholder="Share your thoughts..." className="mt-2 border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500" />
                                    <p className="mt-1 text-xs text-zinc-500">{replyForm.data.body.length}/5,000</p>
                                    <InputError message={replyForm.errors.body} />
                                </div>
                                <Button type="submit" disabled={replyForm.processing} className="bg-red-600 hover:bg-red-500">
                                    <Send className="mr-2 h-4 w-4" />Post Reply
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-8 text-center">
                            <p className="text-zinc-400">
                                Please <Link href="/login" className="text-red-400 hover:underline">log in</Link> to post a reply.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete dialogs */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="border-zinc-800 bg-zinc-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete this thread?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">This action cannot be undone. This will permanently delete this thread and all its replies.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-zinc-700 hover:bg-zinc-800">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteThread} className="bg-red-600 hover:bg-red-500">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog open={deleteReplyId !== null} onOpenChange={() => setDeleteReplyId(null)}>
                <AlertDialogContent className="border-zinc-800 bg-zinc-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete this reply?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-zinc-700 hover:bg-zinc-800">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteReply} className="bg-red-600 hover:bg-red-500">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
