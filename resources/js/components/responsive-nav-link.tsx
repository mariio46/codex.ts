import { InertiaLinkProps, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import * as icons from '@tabler/icons-react';
import { Icon } from './icons';

interface Props {
    active?: boolean;
    icon: keyof typeof icons;
}

export default function ResponsiveNavLink({ icon, active, ...props }: InertiaLinkProps & Props) {
    return (
        <li className='-mx-2'>
            <Link
                className={cn(
                    'flex w-full items-center gap-x-3.5 rounded-lg px-2 py-2 text-[0.920rem]/[1.35rem] normal-case',
                    active
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                )}
                {...props}>
                <Icon name={icon} />
                {props.children}
            </Link>
        </li>
    );
}
