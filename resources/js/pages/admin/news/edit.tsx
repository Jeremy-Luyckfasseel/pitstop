import { Form, Head, router } from '@inertiajs/react';
import { useState } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/back-button';
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
        title: 'Edit News',
        href: '#',
    },
];

interface NewsItem {
    id: number;
    title: string;
    content: string;
    image_path: string;
    published_at: string;
}

export default function AdminNewsEdit({
    newsItem,
}: {
    newsItem: NewsItem;
}) {
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
        formData.append('_method', 'PUT');

        router.post(`/admin/news/${newsItem.id}`, formData, {
            forceFormData: true,
            onSuccess: () => {
                // Redirect handled by controller
            },
        });
    };

    // Format datetime for input
    const formatDatetimeLocal = (date: string) => {
        return new Date(date).toISOString().slice(0, 16);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${newsItem.title}`} />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <BackButton fallbackUrl="/admin/news">Back</BackButton>
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit News Article
                    </h1>
                    <p className="text-muted-foreground">
                        Update your news article
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>News Article Details</CardTitle>
                        <CardDescription>
                            Update the information below to modify the news
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
                                    defaultValue={newsItem.title}
                                    placeholder="Enter article title"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">
                                    Image (leave empty to keep current)
                                </Label>
                                {(imagePreview || newsItem.image_path) && (
                                    <div className="mb-2">
                                        <img
                                            src={
                                                imagePreview ||
                                                `/storage/${newsItem.image_path}`
                                            }
                                            alt={newsItem.title}
                                            className="h-48 w-full rounded-lg object-cover"
                                        />
                                    </div>
                                )}
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
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
                                    defaultValue={newsItem.content}
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
                                    defaultValue={formatDatetimeLocal(
                                        newsItem.published_at
                                    )}
                                />
                                <p className="text-sm text-muted-foreground">
                                    Set a future date to schedule publication
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit">Update Article</Button>
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
