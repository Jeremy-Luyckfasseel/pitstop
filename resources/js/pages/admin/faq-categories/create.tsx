import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin/dashboard',
    },
    {
        title: 'FAQ Categories',
        href: '/admin/faq-categories',
    },
    {
        title: 'Create',
        href: '/admin/faq-categories/create',
    },
];

export default function AdminFaqCategoriesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        order: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/faq-categories');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create FAQ Category" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <BackButton fallbackUrl="/admin/faq-categories">Back</BackButton>
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create FAQ Category
                    </h1>
                    <p className="text-muted-foreground">
                        Add a new category to organize your FAQs
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                        <CardDescription>
                            Enter the information for the new FAQ category
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    placeholder="e.g., General Questions"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    min="0"
                                    value={data.order}
                                    onChange={(e) =>
                                        setData('order', parseInt(e.target.value) || 0)
                                    }
                                    placeholder="0"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Lower numbers appear first
                                </p>
                                <InputError message={errors.order} />
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    Create Category
                                </Button>
                                <Button variant="outline" type="button" asChild>
                                    <a href="/admin/faq-categories">Cancel</a>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
