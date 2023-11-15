import { Icon } from '@/components/icons';
import Pagination from '@/components/pagination';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import { Link, usePage } from '@inertiajs/react';
import RolePermissionLayout from '../role-permission-layout';
import AssignmentLayout from './assignment-layout';
import { PermissionOption } from './partials/permissions-option';

interface RoleItemType {
    id: number;
    name: string;
    permissions: string | null;
}

export default function Permissions() {
    const { data: roles, meta, links } = usePage<any>().props.roles;
    return (
        <Card>
            <CardHeader>
                <div className='flex w-full flex-wrap items-center justify-between gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                        <CardTitle>Role has permissions table</CardTitle>
                        <CardDescription>list for all role who have a permissions.</CardDescription>
                    </div>
                    <Link
                        href={route('assignments.permissions.create')}
                        className={buttonVariants({ variant: 'outline' })}>
                        <Icon name='IconPaperclip' className='mr-1 h-4 w-4' />
                        Assign Permissions
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[10px]'>#</TableHead>
                            <TableHead className='w-[130px]'>Name</TableHead>
                            <TableHead>Permissions</TableHead>
                            <TableHead className='w-[50px] text-right' />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roles.map((role: RoleItemType, i: number) => (
                            <TableRow key={role.id}>
                                <TableCell className='font-medium'>{meta.from + i}</TableCell>
                                <TableCell>{role.name}</TableCell>
                                <TableCell
                                    className={
                                        role.name === 'Super Admin' ? 'animate-pulse font-medium text-green-500' : ''
                                    }>
                                    {role.name === 'Super Admin' ? 'Has all permissions' : role.permissions}
                                </TableCell>
                                <TableCell>
                                    <div className='flex justify-end'>
                                        <PermissionOption role={role} />
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

Permissions.layout = (page: React.ReactNode) => (
    <AuthLayout title='Role Permissions Assignment'>
        <RolePermissionLayout>
            <AssignmentLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
