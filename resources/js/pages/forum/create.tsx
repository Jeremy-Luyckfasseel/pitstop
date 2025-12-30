import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Forum',
        href: '/forum',
    },
    {
        title: 'Create Thread',
        href: '/forum/create',
    },
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

            <div className="mx-auto max-w-2xl space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/forum">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Create Thread
                        </h1>
                        <p className="text-muted-foreground">
                            Start a new discussion in the forum
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Thread Details</CardTitle>
                        <CardDescription>
                            Share your thoughts with the community
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    required
                                    placeholder="What's on your mind?"
                                    className="text-lg"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="body">Content *</Label>
                                <Textarea
                                    id="body"
                                    value={data.body}
                                    onChange={(e) =>
                                        setData('body', e.target.value)
                                    }
                                    required
                                    rows={10}
                                    placeholder="Write your thoughts here..."
                                />
                                <p className="text-sm text-muted-foreground">
                                    {data.body.length}/10,000 characters
                                </p>
                                <InputError message={errors.body} />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    Create Thread
                                </Button>
                                <Button variant="outline" type="button" asChild>
                                    <Link href="/forum">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
