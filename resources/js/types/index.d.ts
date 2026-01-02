import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    birthday?: string;
    bio?: string;
    is_admin: boolean;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

// Forum-related types
export interface Author {
    id: number;
    name: string;
    username: string;
    avatar?: string | null;
}

export interface Thread {
    id: number;
    title: string;
    body: string;
    is_pinned: boolean;
    created_at: string;
    updated_at: string;
    author: Author;
    replies?: Reply[];
    replies_count?: number;
}

export interface Reply {
    id: number;
    body: string;
    created_at: string;
    updated_at: string;
    author: Author;
    canEdit?: boolean;
    canDelete?: boolean;
}

// News-related types
export interface NewsItem {
    id: number;
    title: string;
    content: string;
    image_path?: string | null;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    author: Author;
}

// Pagination types
export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
