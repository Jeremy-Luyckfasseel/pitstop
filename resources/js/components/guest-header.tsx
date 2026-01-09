import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { cn, isSameUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Home, Newspaper, HelpCircle, MessageSquare, Mail, Menu, LogIn, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';

const mainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/',
        icon: Home,
    },
    {
        title: 'News',
        href: '/news',
        icon: Newspaper,
    },
    {
        title: 'FAQ',
        href: '/faq',
        icon: HelpCircle,
    },
    {
        title: 'Forum',
        href: '/forum',
        icon: MessageSquare,
    },
    {
        title: 'Contact',
        href: '/contact',
        icon: Mail,
    },
];

const activeItemStyles =
    'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

export function GuestHeader() {
    const page = usePage();
    
    return (
        <div className="border-b border-sidebar-border/80">
            <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-2 h-[34px] w-[34px]"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                        >
                            <SheetTitle className="sr-only">
                                Navigation Menu
                            </SheetTitle>
                            <SheetHeader className="flex justify-start text-left">
                                <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                            </SheetHeader>
                            <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                <div className="flex h-full flex-col justify-between text-sm">
                                    <div className="flex flex-col space-y-4">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="flex items-center space-x-2 font-medium"
                                            >
                                                {item.icon && (
                                                    <Icon
                                                        iconNode={item.icon}
                                                        className="h-5 w-5"
                                                    />
                                                )}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-2 border-t pt-4">
                                        <Link href="/login">
                                            <Button variant="outline" className="w-full">
                                                <LogIn className="mr-2 h-4 w-4" />
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button className="w-full">
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Register
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link
                    href="/"
                    prefetch
                    className="flex items-center space-x-2"
                >
                    <AppLogo />
                </Link>

                {/* Desktop Navigation */}
                <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                    <NavigationMenu className="flex h-full items-stretch">
                        <NavigationMenuList className="flex h-full items-stretch space-x-2">
                            {mainNavItems.map((item, index) => (
                                <NavigationMenuItem
                                    key={index}
                                    className="relative flex h-full items-center"
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            isSameUrl(
                                                page.url,
                                                item.href,
                                            ) && activeItemStyles,
                                            'h-9 cursor-pointer px-3',
                                        )}
                                    >
                                        {item.icon && (
                                            <Icon
                                                iconNode={item.icon}
                                                className="mr-2 h-4 w-4"
                                            />
                                        )}
                                        {item.title}
                                    </Link>
                                    {isSameUrl(page.url, item.href) && (
                                        <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Auth Buttons */}
                <div className="ml-auto hidden items-center space-x-2 lg:flex">
                    <Link href="/login">
                        <Button variant="ghost">
                            <LogIn className="mr-2 h-4 w-4" />
                            Login
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Register
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
