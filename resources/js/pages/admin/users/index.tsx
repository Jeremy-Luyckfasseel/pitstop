import { Head, Link, router } from '@inertiajs/react';
import { Plus, Shield, ShieldOff, Users, UserPlus } from 'lucide-react';
import { useState } from 'react';

import { type BreadcrumbItem } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin Dashboard', href: '/admin/dashboard' },
    { title: 'Users', href: '/admin/users' },
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
        total: number;
    };
}

export default function UsersIndex({ users }: Props) {
    const [actionUser, setActionUser] = useState<User | null>(null);
    const [actionType, setActionType] = useState<'promote' | 'demote' | null>(null);

    const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
    const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const handleAction = () => {
        if (!actionUser || !actionType) return;
        router.post(`/admin/users/${actionUser.id}/${actionType}`, {}, {
            onSuccess: () => { setActionUser(null); setActionType(null); },
        });
    };

    const openDialog = (user: User, type: 'promote' | 'demote') => {
        setActionUser(user);
        setActionType(type);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="p-6">
                {/* Hero Header */}
                <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-green-950/30 p-8">
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/20">
                                <Users className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white">User Management</h1>
                                <p className="text-zinc-400">{users.total} user{users.total !== 1 ? 's' : ''} registered</p>
                            </div>
                        </div>
                        <Button asChild className="bg-green-600 hover:bg-green-500">
                            <Link href="/admin/users/create">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create User
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* User List */}
                <div className="space-y-3">
                    {users.data.map((user) => (
                        <div key={user.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-colors hover:bg-zinc-900">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border-2 border-zinc-700">
                                    <AvatarImage src={user.avatar ? `/storage/${user.avatar}` : undefined} />
                                    <AvatarFallback className="bg-zinc-800 text-white">{getInitials(user.name)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/profile/${user.username}`} className="font-bold text-white hover:text-green-400">
                                            {user.name}
                                        </Link>
                                        {user.is_admin ? (
                                            <Badge className="bg-red-500/20 text-red-400">Admin</Badge>
                                        ) : (
                                            <Badge className="bg-zinc-700 text-zinc-300">User</Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-500">@{user.username} • {user.email}</p>
                                    <p className="text-xs text-zinc-600">Joined {formatDate(user.created_at)}</p>
                                </div>
                            </div>
                            <div>
                                {user.is_admin ? (
                                    <Button variant="outline" size="sm" onClick={() => openDialog(user, 'demote')} className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10">
                                        <ShieldOff className="mr-2 h-4 w-4" />
                                        Demote
                                    </Button>
                                ) : (
                                    <Button variant="outline" size="sm" onClick={() => openDialog(user, 'promote')} className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                                        <Shield className="mr-2 h-4 w-4" />
                                        Promote
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {users.last_page > 1 && (
                    <div className="mt-6 flex justify-center gap-1">
                        {users.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                asChild={!!link.url}
                                className={link.active ? 'bg-green-600' : 'border-zinc-700'}
                            >
                                {link.url ? (
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={actionUser !== null} onOpenChange={() => { setActionUser(null); setActionType(null); }}>
                <AlertDialogContent className="border-zinc-800 bg-zinc-900">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">
                            {actionType === 'promote' ? 'Promote to Admin?' : 'Demote to Regular User?'}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            {actionType === 'promote'
                                ? `${actionUser?.name} will have full admin privileges including managing users, news, and FAQs.`
                                : `${actionUser?.name} will lose all admin privileges and become a regular user.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-zinc-700 hover:bg-zinc-800">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAction} className={actionType === 'promote' ? 'bg-green-600 hover:bg-green-500' : 'bg-amber-600 hover:bg-amber-500'}>
                            {actionType === 'promote' ? 'Promote' : 'Demote'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
