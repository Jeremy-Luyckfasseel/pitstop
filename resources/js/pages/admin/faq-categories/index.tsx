import { Head, Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { type BreadcrumbItem } from '@/types';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
];

interface FaqCategory {
    id: number;
    name: string;
    order: number;
    faqs_count: number;
}

export default function AdminFaqCategoriesIndex({
    categories,
}: {
    categories: FaqCategory[];
}) {
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        router.delete(`/admin/faq-categories/${id}`, {
            onSuccess: () => setDeleteId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="FAQ Categories" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            FAQ Categories
                        </h1>
                        <p className="text-muted-foreground">
                            Manage FAQ categories to organize your questions
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/admin/faq-categories/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Category
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                        <CardDescription>
                            A list of all FAQ categories ordered by display
                            order
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {categories.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <p className="text-muted-foreground">
                                    No categories yet. Create your first one!
                                </p>
                                <Button asChild className="mt-4">
                                    <Link href="/admin/faq-categories/create">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Category
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>FAQs</TableHead>
                                        <TableHead className="w-[100px]">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>
                                                <Badge variant="outline">
                                                    {category.order}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {category.name}
                                            </TableCell>
                                            <TableCell>
                                                {category.faqs_count} questions
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={`/admin/faq-categories/${category.id}/edit`}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            setDeleteId(
                                                                category.id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>

            <AlertDialog
                open={deleteId !== null}
                onOpenChange={() => setDeleteId(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this category and all its FAQs.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => deleteId && handleDelete(deleteId)}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
