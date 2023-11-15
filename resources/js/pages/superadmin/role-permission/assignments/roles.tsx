import { Icon } from '@/components/icons';
import Pagination from '@/components/pagination';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import { Link, usePage } from '@inertiajs/react';
import RolePermissionLayout from '../role-permission-layout';
import AssignmentLayout from './assignment-layout';
import { RoleOption } from './partials/roles-option';

interface UserItemType {
    id: number;
    name: string;
    roles: string;
}

export default function Roles() {
    const { data: users, meta, links } = usePage<any>().props.users;
    return (
        <Card>
            <CardHeader>
                <div className='flex w-full flex-wrap items-center justify-between gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                        <CardTitle>User has role table</CardTitle>
                        <CardDescription>list for all users who have a role.</CardDescription>
                    </div>
                    <Link href={route('assignments.roles.create')} className={buttonVariants({ variant: 'outline' })}>
                        <Icon name='IconPaperclip' className='mr-1 h-4 w-4' />
                        Assign Roles
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[10px]'>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user: UserItemType, i: number) => (
                            <TableRow key={user.id}>
                                <TableCell className='font-medium'>{meta.from + i}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell
                                    className={
                                        user.roles === 'Super Admin' ? 'animate-pulse font-medium text-green-500' : ''
                                    }>
                                    {user.roles}
                                </TableCell>
                                <TableCell>
                                    <div className='flex justify-end'>
                                        <RoleOption user={user} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className='justify-end'>
                <Pagination {...{ meta, links }} />
            </CardFooter>
        </Card>
    );
}

Roles.layout = (page: React.ReactNode) => (
    <AuthLayout title='User Roles Assignment'>
        <RolePermissionLayout>
            <AssignmentLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
