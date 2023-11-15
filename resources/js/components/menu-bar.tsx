import { cn } from '@/lib/utils';
import { InertiaLinkProps, Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export function Menubar({ className, children, ...props }: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={cn(className)} {...props}>
            {children}
        </div>
    );
}

export function MenubarHeader({ className, children, ...props }: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={cn(
                'mb-5 inline-flex h-9 w-full items-center justify-start gap-x-1 rounded-lg bg-muted p-1 text-muted-foreground lg:w-auto',
                className,
            )}
            {...props}>
            {children}
        </div>
    );
}

export function MenubarLink({ className, active, ...props }: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            preserveScroll
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-8 py-1 text-sm font-medium ring-offset-background transition-all hover:bg-background hover:text-foreground hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                className,
                active && 'bg-background text-foreground shadow',
            )}
            {...props}
        />
    );
}

export function MenubarContent({ className, children, ...props }: PropsWithChildren<{ className?: string }>) {
    return (
        <div className={cn(className)} {...props}>
            {children}
        </div>
    );
}
