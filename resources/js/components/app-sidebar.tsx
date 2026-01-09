import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { MessageSquare, Newspaper, ShieldCheck, HelpCircle, Mail } from 'lucide-react';
import AppLogo from './app-logo';

const platformItems: NavItem[] = [
    {
        title: 'News',
        href: '/news',
        icon: Newspaper,
    },
    {
        title: 'Forum',
        href: '/forum',
        icon: MessageSquare,
    },
];

const communityItems: NavItem[] = [
    {
        title: 'FAQ',
        href: '/faq',
        icon: HelpCircle,
    },
    {
        title: 'Contact',
        href: '/contact',
        icon: Mail,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    
    const adminNavItems: NavItem[] = auth.user?.is_admin
        ? [
              {
                  title: 'Admin Dashboard',
                  href: '/admin/dashboard',
                  icon: ShieldCheck,
              },
              {
                  title: 'Manage News',
                  href: '/admin/news',
                  icon: Newspaper,
              },
          ]
        : [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={platformItems} label="Platform" />
                {adminNavItems.length > 0 && (
                    <NavMain items={adminNavItems} label="Admin" />
                )}
                <NavMain items={communityItems} label="Community" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}


