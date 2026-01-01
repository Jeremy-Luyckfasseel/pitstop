import { Head, Link, router } from '@inertiajs/react';
import { Shield, ShieldOff, Users } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Users',
        href: '/admin/users',
    },
];

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string | null;
    is_admin: boolean;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    users: {
        data: User[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
}

export default function UsersIndex({ users }: Props) {
    const [actionUser, setActionUser] = useState<User | null>(null);
    const [actionType, setActionType] = useState<'promote' | 'demote' | null>(
        null
    );

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

    const handleAction = () => {
        if (!actionUser || !actionType) return;

        router.post(`/admin/users/${actionUser.id}/${actionType}`, {}, {
            onSuccess: () => {
                setActionUser(null);
                setActionType(null);
            },
        });
    };

    const openDialog = (user: User, type: 'promote' | 'demote') => {
        setActionUser(user);
        setActionType(type);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            User Management
                        </h1>
                        <p className="text-muted-foreground">
                            Manage user accounts and permissions
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button asChild>
                            <Link href="/admin/users/create">
                                Create User
                            </Link>
                        </Button>
                        <Users className="h-10 w-10 text-muted-foreground" />
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Users</CardTitle>
                        <CardDescription>
                            A list of all registered users and their roles
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={
                                                            user.avatar
                                                                ? `/storage/${user.avatar}`
                                                                : undefined
                                                        }
                                                    />
                                                    <AvatarFallback className="text-xs">
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
                                                    <p className="text-sm text-muted-foreground">
                                                        @{user.username}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {user.is_admin ? (
                                                <Badge variant="default">
                                                    Admin
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    User
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {formatDate(user.created_at)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {user.is_admin ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDialog(
                                                            user,
                                                            'demote'
                                                        )
                                                    }
                                                >
                                                    <ShieldOff className="mr-1 h-4 w-4" />
                                                    Demote
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        openDialog(
                                                            user,
                                                            'promote'
                                                        )
                                                    }
                                                >
                                                    <Shield className="mr-1 h-4 w-4" />
                                                    Promote
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="mt-4 flex justify-center gap-1">
                                {users.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url}
                                        asChild={!!link.url}
                                    >
                                        {link.url ? (
                                            <Link
                                                href={link.url}
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        ) : (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: link.label,
                                                }}
                                            />
                                        )}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog
                open={actionUser !== null}
                onOpenChange={() => {
                    setActionUser(null);
                    setActionType(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            {actionType === 'promote'
                                ? 'Promote to Admin?'
                                : 'Demote to Regular User?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {actionType === 'promote'
                                ? `${actionUser?.name} will have full admin privileges including managing users, news, and FAQs.`
                                : `${actionUser?.name} will lose all admin privileges and become a regular user.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAction}>
                            {actionType === 'promote' ? 'Promote' : 'Demote'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
