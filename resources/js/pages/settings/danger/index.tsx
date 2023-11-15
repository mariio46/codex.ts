import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import SettingLayout from '@/pages/settings/setting-layout';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function DeleteAccount() {
    const [openDialog, setOpenDialog] = useState(false);

    return (
        <Card className='max-w-2xl'>
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setOpenDialog(true)} variant={'destructive'}>
                    Delete Account
                </Button>
                <DeleteAccountDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
            </CardContent>
        </Card>
    );
}

function DeleteAccountDialog({
    openDialog,
    setOpenDialog,
}: {
    openDialog: boolean;
    setOpenDialog: (openDialog: boolean) => void;
}) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('settings.danger'), {
            preserveScroll: true,
            onSuccess: () => setOpenDialog(false),
            onFinish: () => reset(),
        });
    };
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                    <DialogDescription>
                        Once your account is deleted, all of its resources and data will be permanently deleted. Please
                        enter your password to confirm you would like to permanently delete your account.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={deleteUser}>
                    <div>
                        <Label htmlFor='password' className='sr-only'>
                            Password
                        </Label>

                        <Input
                            id='password'
                            type='password'
                            name='password'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className='mt-1 block'
                            autoFocus
                            placeholder='Password'
                        />
                        <InputError message={errors.password} className='mt-2' />
                    </div>
                    <DialogFooter className='mt-5'>
                        <Button onClick={() => setOpenDialog(false)} type='button' variant={'outline'}>
                            Cancel
                        </Button>
                        <Button
                            className='ms-3'
                            variant={'destructive'}
                            type='submit'
                            disabled={data.password === '' ? true : processing}>
                            Delete
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

DeleteAccount.layout = (page: React.ReactNode) => (
    <AuthLayout title='Danger Area'>
        <SettingLayout children={page} />
    </AuthLayout>
);
