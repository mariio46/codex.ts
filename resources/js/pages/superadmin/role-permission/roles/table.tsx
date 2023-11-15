import Pagination from '@/components/pagination';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AuthLayout from '@/layouts/auth-layout';
import { Link, usePage } from '@inertiajs/react';
import RolePermissionLayout from '../role-permission-layout';
import { RoleTableOption } from './partials/role-table-option';
import RoleLayout from './role-layout';

export default function RoleTable() {
    const { data: roles, meta, links } = usePage<any>().props.roles;
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Role Table</CardTitle>
                    <CardDescription>The list of all role.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[10px]'>#</TableHead>
                                <TableHead>Role Name</TableHead>
                                <TableHead>Guard Name</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Updated</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map((role: any, i: number) => (
                                <TableRow key={role.id}>
                                    <TableCell className='font-medium'>{meta.from + i}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>{role.guard_name}</TableCell>
                                    <TableCell>{role.created}</TableCell>
                                    <TableCell>{role.updated}</TableCell>
                                    <TableCell>
                                        <div className='flex justify-end'>
                                            <RoleTableOption role={role} />
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
        </>
    );
}

RoleTable.layout = (page: React.ReactNode) => (
    <AuthLayout title='Roles Table'>
        <RolePermissionLayout>
            <RoleLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
