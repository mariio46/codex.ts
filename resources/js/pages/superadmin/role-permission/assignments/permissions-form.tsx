import AuthLayout from '@/layouts/auth-layout';
import RolePermissionLayout from '../role-permission-layout';
import AssignmentLayout from './assignment-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormEventHandler } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IconCheck, IconSelector } from '@tabler/icons-react';
import InputError from '@/components/input-error';
import SelectMultiples from '@/components/select-multiples';
import { cn } from '@/lib/utils';

export default function PermissionsForm({ role, permission, roles, permissions, page_settings }: any) {
    const { data, setData, post, errors, processing, reset } = useForm({
        role: role ? role.id : '',
        permissions: permission ? permission.value : [],
        _method: page_settings.method,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(page_settings.url, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    return (
        <Card className='max-w-xl'>
            <CardHeader>
                <CardTitle>{page_settings.title}</CardTitle>
                <CardDescription>{page_settings.description}</CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
                <form onSubmit={submit} method='post' className='w-full space-y-4'>
                    <div>
                        <Label htmlFor='user' className='mb-2.5 block'>
                            User
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='outline' role='combobox' className='w-full justify-between'>
                                    {data.role
                                        ? roles.find((role: any) => role.id === data.role)?.label
                                        : 'Select role'}
                                    <IconSelector className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align='end' className='w-full p-0'>
                                <Command>
                                    <CommandInput placeholder='Search user...' name='role' id='role' className='h-9' />
                                    <CommandEmpty>No role found...</CommandEmpty>
                                    <CommandGroup className='simple-scrollbar h-52 overflow-y-auto'>
                                        {roles.map((role: any, i: number) => (
                                            <CommandItem
                                                value={role.value}
                                                key={i}
                                                onSelect={() => {
                                                    setData('role', role.id);
                                                }}>
                                                {role.label}
                                                <IconCheck
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        role.id === data.role ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.role} className='mt-0' />
                    </div>
                    <div>
                        <Label htmlFor='roles' className='mb-2.5 block'>
                            Roles
                        </Label>
                        <SelectMultiples
                            data={permissions}
                            selectedItem={data.permissions}
                            onChange={(e: any) => setData('permissions', e)}
                            label='Permissions'
                        />
                        <InputError message={errors.permissions} className='mt-0' />
                    </div>
                    <Button
                        type='submit'
                        disabled={data.role === undefined ? true : data.permissions === undefined ? true : processing}>
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

PermissionsForm.layout = (page: React.ReactNode) => (
    <AuthLayout title='Assign Role Permissions'>
        <RolePermissionLayout>
            <AssignmentLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
