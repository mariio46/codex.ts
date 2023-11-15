import Pagination from '@/components/pagination';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import { usePage } from '@inertiajs/react';
import RolePermissionLayout from '../role-permission-layout';
import { PermissionTableOption } from './partials/permission-table-option';
import PermissionLayout from './permission-layout';

export default function PermissionTable() {
    const { data: permissions, meta, links } = usePage<any>().props.permissions;
    return (
        <Card>
            <CardHeader>
                <CardTitle>Permission Table</CardTitle>
                <CardDescription>The list of all permission.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[10px]'>#</TableHead>
                            <TableHead>Permission Name</TableHead>
                            <TableHead>Guard Name</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead>Updated</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {permissions.map((permission: any, i: number) => (
                            <TableRow key={permission.id}>
                                <TableCell className='font-medium'>{meta.from + i}</TableCell>
                                <TableCell>{permission.name}</TableCell>
                                <TableCell>{permission.guard_name}</TableCell>
                                <TableCell>{permission.created}</TableCell>
                                <TableCell>{permission.updated}</TableCell>
                                <TableCell>
                                    <div className='flex justify-end'>
                                        <PermissionTableOption permission={permission} />
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

PermissionTable.layout = (page: React.ReactNode) => (
    <AuthLayout title='Permissions'>
        <RolePermissionLayout>
            <PermissionLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
