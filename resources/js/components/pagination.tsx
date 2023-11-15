import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export default function Pagination({
    meta,
    links,
}: {
    meta: {
        from: number | null;
        to: number | null;
        total: number | null;
    };
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
}) {
    return (
        <div className='flex w-full items-center justify-between'>
            <div>
                <span className='text-sm text-muted-foreground'>
                    Showing <strong>{meta.from}</strong> to <strong>{meta.to}</strong> of <strong>{meta.total}</strong>{' '}
                    results
                </span>
            </div>
            <div className='flex items-center gap-x-1'>
                {links.prev !== null ? (
                    <Button className='rounded-full px-6 text-xs' variant='outline' size='sm' asChild>
                        <Link preserveScroll preserveState href={links.prev}>
                            Prev
                        </Link>
                    </Button>
                ) : (
                    <Button
                        className='select-none rounded-full px-6 text-xs hover:bg-transparent hover:text-muted-foreground/50'
                        variant='outline'
                        size='sm'
                        asChild
                        disabled>
                        <span className='text-muted-foreground/50 '>Prev</span>
                    </Button>
                )}
                {links.next !== null ? (
                    <Button className='rounded-full px-6 text-xs' variant='outline' size='sm' asChild>
                        <Link preserveScroll preserveState href={links.next}>
                            Next
                        </Link>
                    </Button>
                ) : (
                    <Button
                        className='select-none rounded-full px-6 text-xs hover:bg-transparent hover:text-muted-foreground/50'
                        variant='outline'
                        size='sm'
                        asChild
                        disabled>
                        <span className='text-muted-foreground/50 '>Next</span>
                    </Button>
                )}
            </div>
        </div>
    );
}
