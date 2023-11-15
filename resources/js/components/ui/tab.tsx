import { cn } from '@/lib/utils';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export function Tab({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return (
        <nav
            className={cn(
                'relative after:absolute after:bottom-[0.5px] after:left-0 after:right-0 after:top-auto after:h-px after:bg-border',
                className,
            )}>
            {children}
        </nav>
    );
}

export function TabHeader({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return (
        <div className='hide-scrollbar relative z-20 mx-auto block max-w-screen-2xl overflow-x-auto px-4 sm:px-6 lg:px-8'>
            <ul className={cn('flex items-center gap-x-8', className)}>{children}</ul>
        </div>
    );
}

export function TabLink({
    className,
    active,
    ...props
}: InertiaLinkProps & {
    active?: boolean;
}) {
    return (
        <li>
            <Link
                className={cn(
                    'group relative z-10 block whitespace-nowrap border-b-[2.5px] py-3.5 text-sm text-foreground/70',
                    className,
                    active ? 'border-foreground text-foreground' : 'border-transparent text-foreground/70',
                )}
                {...props}
            />
        </li>
    );
}

export function TabSpan({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return (
        <span className={cn('-mx-3 rounded px-3 py-2 transition duration-200 group-hover:bg-accent', className)}>
            {children}
        </span>
    );
}

export function TabContent({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={cn('p-4', className)}>{children}</div>;
}
