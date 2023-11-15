import { cn } from '@/lib/utils';
import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function SideNavLink({
    className,
    active,
    ...props
}: InertiaLinkProps & {
    className?: string;
    active?: boolean;
}) {
    return (
        <Link
            className={cn(
                '-mx-4 flex items-center gap-x-3 px-4 py-2 text-sm hover:bg-accent lg:rounded-lg [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.3]',
                className,
                active ? 'bg-accent font-medium text-foreground [&>svg]:stroke-[1.5]' : 'text-foreground/70',
            )}
            {...props}
        />
    );
}
