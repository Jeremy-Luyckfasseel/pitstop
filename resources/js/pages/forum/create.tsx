import { Head, Link, useForm } from '@inertiajs/react';
import { Flame, Send } from 'lucide-react';
import { FormEventHandler } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/back-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Forum', href: '/forum' },
    { title: 'Create Thread', href: '/forum/create' },
];

export default function ThreadCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        body: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/forum');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Thread" />

            <div className="p-6">
                <div className="mx-auto max-w-2xl">
                    {/* Header */}
                    <div className="mb-6">
                        <BackButton fallbackUrl="/forum">Back to Forum</BackButton>
                    </div>

                    {/* Hero Header */}
                    <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/30 p-8">
                        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20">
                                <Flame className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white">Start a Discussion</h1>
                                <p className="text-zinc-400">Share your thoughts with the community</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50">
                        <div className="border-b border-zinc-800 px-6 py-4">
                            <h2 className="font-bold text-white">Thread Details</h2>
                            <p className="text-sm text-zinc-500">What's on your mind?</p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="title" className="text-zinc-300">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        placeholder="What's on your mind?"
                                        className="border-zinc-700 bg-zinc-800 text-lg text-white placeholder:text-zinc-500"
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="body" className="text-zinc-300">Content *</Label>
                                    <Textarea
                                        id="body"
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        required
                                        rows={10}
                                        placeholder="Write your thoughts here..."
                                        className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500"
                                    />
                                    <p className="text-sm text-zinc-500">{data.body.length}/10,000 characters</p>
                                    <InputError message={errors.body} />
                                </div>

                                <div className="flex gap-4">
                                    <Button type="submit" disabled={processing} className="bg-red-600 hover:bg-red-500">
                                        <Send className="mr-2 h-4 w-4" />
                                        Create Thread
                                    </Button>
                                    <Button variant="outline" type="button" asChild className="border-zinc-700 hover:bg-zinc-800">
                                        <Link href="/forum">Cancel</Link>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
