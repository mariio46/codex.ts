import { useRef, FormEventHandler, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import SettingLayout from '../setting-layout';
import { Icon } from '@/components/icons';

export default function UpdatePassword() {
    const [visible, setVisible] = useState('password');
    const passwordInput = useRef<HTMLInputElement>();
    const currentPasswordInput = useRef<HTMLInputElement>();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('settings.security'), {
            preserveScroll: true,
            onSuccess: () => {
                reset(), visible === 'text' && setVisible('password');
            },
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card className='max-w-2xl'>
            <CardHeader>
                <div className='flex w-full flex-wrap items-center justify-between gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                        <CardTitle>Update Password</CardTitle>
                        <CardDescription>
                            Ensure your account is using a long, random password to stay secure.
                        </CardDescription>
                    </div>
                    <Icon
                        name={visible === 'password' ? 'IconEyeClosed' : 'IconEye'}
                        className='cursor-pointer select-none'
                        onClick={() => {
                            visible === 'password' ? setVisible('text') : setVisible('password');
                        }}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={updatePassword} className='space-y-4'>
                    <div>
                        <Label htmlFor='current_password'>Current Password</Label>

                        <Input
                            id='current_password'
                            // ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type={visible}
                            className='mt-1 block w-full'
                            autoComplete='current-password'
                        />

                        <InputError message={errors.current_password} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='password'>New Password</Label>

                        <Input
                            id='password'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={visible}
                            className='mt-1 block w-full'
                            autoComplete='new-password'
                        />

                        <InputError message={errors.password} className='mt-2' />
                    </div>

                    <div>
                        <Label htmlFor='password_confirmation'>Confirm Password</Label>

                        <Input
                            id='password_confirmation'
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type={visible}
                            className='mt-1 block w-full'
                            autoComplete='new-password'
                        />

                        <InputError message={errors.password_confirmation} className='mt-2' />
                    </div>
                    <Button
                        disabled={
                            data.password === ''
                                ? true
                                : data.current_password === ''
                                ? true
                                : data.password_confirmation === ''
                                ? true
                                : processing
                        }>
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

UpdatePassword.layout = (page: React.ReactNode) => (
    <AuthLayout title='Security'>
        <SettingLayout children={page} />
    </AuthLayout>
);
