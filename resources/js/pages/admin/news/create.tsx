import { Form, Head, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'News Management',
        href: '/admin/news',
    },
    {
        title: 'Create News',
        href: '/admin/news/create',
    },
];

export default function AdminNewsCreate() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.post('/admin/news', formData, {
            forceFormData: true,
            onSuccess: () => {
                // Redirect handled by controller
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create News" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <a href="/admin/news">
                            <ArrowLeft className="h-4 w-4" />
                        </a>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Create News Article
                        </h1>
                        <p className="text-muted-foreground">
                            Add a new news article to your site
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>News Article Details</CardTitle>
                        <CardDescription>
                            Fill in the information below to create a new news
                            article
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    required
                                    placeholder="Enter article title"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Image *</Label>
                                {imagePreview && (
                                    <div className="mb-2">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-48 w-full rounded-lg object-cover"
                                        />
                                    </div>
                                )}
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                    required
                                    onChange={handleImageChange}
                                />
                                <p className="text-sm text-muted-foreground">
                                    JPEG, PNG, GIF or WebP. Max 5MB.
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="content">Content *</Label>
                                <Textarea
                                    id="content"
                                    name="content"
                                    required
                                    rows={10}
                                    placeholder="Write your article content here..."
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="published_at">
                                    Publish Date *
                                </Label>
                                <Input
                                    id="published_at"
                                    name="published_at"
                                    type="datetime-local"
                                    required
                                    defaultValue={
                                        new Date().toISOString().slice(0, 16)
                                    }
                                />
                                <p className="text-sm text-muted-foreground">
                                    Set a future date to schedule publication
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit">Create Article</Button>
                                <Button variant="outline" type="button" asChild>
                                    <a href="/admin/news">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
