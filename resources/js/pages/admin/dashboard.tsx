import { Head, Link } from '@inertiajs/react';
import { Newspaper, Users, MessageSquare, HelpCircle } from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

export default function AdminDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your site content and settings
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>News Management</CardTitle>
                                <Newspaper className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <CardDescription>
                                Create, edit, and manage news articles
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/admin/news">Manage News</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>FAQ Management</CardTitle>
                                <HelpCircle className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <CardDescription>
                                Manage frequently asked questions
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button asChild className="w-full">
                                <Link href="/admin/faqs">Manage FAQs</Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/admin/faq-categories">Manage Categories</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="opacity-50">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>User Management</CardTitle>
                                <Users className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <CardDescription>
                                Manage users and permissions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button disabled className="w-full">
                                Coming Soon
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="opacity-50">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Forum Management</CardTitle>
                                <MessageSquare className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <CardDescription>
                                Manage forum threads and replies
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button disabled className="w-full">
                                Coming Soon
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Common administrative tasks
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/admin/news/create">
                                Create News Article
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/admin/faqs/create">Create FAQ</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/admin/faq-categories/create">
                                Create FAQ Category
                            </Link>
                        </Button>
                        <Button variant="outline" disabled>
                            Manage Users
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

