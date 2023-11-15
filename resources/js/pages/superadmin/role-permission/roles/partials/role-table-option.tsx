import { DropdownDialog } from '@/components/dropdown-dialog';
import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useForm } from '@inertiajs/react';

export function RoleTableOption({ role, setOpenDialog }: any) {
    const { delete: destroy, processing } = useForm();
    function deleteRole(role: any) {
        destroy(route('roles.delete', [role]), {
            preserveScroll: true,
            onFinish: () => setOpenDialog(false),
        });
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'icon'} className='h-5'>
                    <Icon name='IconDots' className='stroke-[1.2]' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-56'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={route('roles.edit', [role])}>
                        <Icon name={'IconPencil'} className='mr-2' />
                        Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownDialog
                    title='Are you absolutely sure?'
                    trigger_text='Delete'
                    description=' This action cannot be undone. This will permanently delete the role and remove the data from our
                    servers.'
                    processing={processing}
                    variants={'destructive'}
                    cancel_text='Cancel'
                    submit_text='Delete'
                    action={() => deleteRole(role)}
                    icon='IconTrash'
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
