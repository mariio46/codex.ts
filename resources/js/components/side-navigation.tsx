import { cn } from '@/lib/utils';
import { IconCheck } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

export function SideNavigations({
    children,
    className,
}: PropsWithChildren<{
    className?: string;
}>) {
    return (
        <div className={cn('mx-auto px-4 py-4 sm:px-6 md:px-4 lg:max-w-6xl lg:px-8 lg:py-8 xl:max-w-7xl', className)}>
            {children}
        </div>
    );
}

export function SideNavigation({
    children,
    className,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={cn('flex flex-col gap-x-16 gap-y-6 lg:flex-row', className)}>{children}</div>;
}

export function SideNavigationMenu({
    children,
    className,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={cn('-mt-2 w-full shrink-0 lg:w-1/5', className)}>{children}</div>;
}

export function SideNavigationContent({
    children,
    className,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={cn('w-full', className)}>{children}</div>;
}
