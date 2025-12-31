import { Head, Link } from '@inertiajs/react';
import {
    HelpCircle,
    MessageSquare,
    Newspaper,
    TrendingUp,
    Users,
} from 'lucide-react';

import { type BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

interface Stats {
    totalUsers: number;
    totalNews: number;
    totalThreads: number;
    totalReplies: number;
}

interface RecentUser {
    id: number;
    name: string;
    username: string;
    email: string;
    is_admin: boolean;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentUsers: RecentUser[];
}

export default function AdminDashboard({ stats, recentUsers }: Props) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

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

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalUsers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Registered accounts
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                News Articles
                            </CardTitle>
                            <Newspaper className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalNews}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Published articles
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Forum Threads
                            </CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalThreads}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Discussion topics
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Forum Replies
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.totalReplies}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Community engagement
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Management Cards */}
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
                            <Button
                                asChild
                                variant="outline"
                                className="w-full"
                            >
                                <Link href="/admin/faq-categories">
                                    Manage Categories
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
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
                            <Button asChild className="w-full">
                                <Link href="/admin/users">Manage Users</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Forum</CardTitle>
                                <MessageSquare className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <CardDescription>
                                View and moderate forum discussions
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <Link href="/forum">Go to Forum</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Registrations */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Registrations</CardTitle>
                        <CardDescription>
                            Newest members who joined the community
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback>
                                                {getInitials(user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <Link
                                                href={`/profile/${user.username}`}
                                                className="font-medium hover:underline"
                                            >
                                                {user.name}
                                            </Link>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>@{user.username}</span>
                                                {user.is_admin && (
                                                    <Badge
                                                        variant="default"
                                                        className="text-xs"
                                                    >
                                                        Admin
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {formatDate(user.created_at)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
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
                        <Button variant="outline" asChild>
                            <Link href="/admin/users">Manage Users</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
