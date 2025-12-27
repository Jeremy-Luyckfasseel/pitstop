import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { GuestHeader } from '@/components/guest-header';
import type { PropsWithChildren } from 'react';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <AppShell>
            <GuestHeader />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
