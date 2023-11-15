import { InertiaLinkProps, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function NavLink({ className, active = false, ...props }: InertiaLinkProps & { active?: boolean }) {
    return (
        <li style={{ zIndex: 2, position: 'relative' }}>
            <Link
                className={cn(
                    'relative block rounded-full px-3 py-2 text-[0.9rem] font-medium tracking-tight transition hover:bg-accent hover:text-foreground',
                    className,
                    active ? 'bg-accent font-semibold text-foreground' : 'text-muted-foreground',
                )}
                {...props}
            />
        </li>
    );
}
