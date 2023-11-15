import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster } from './ui/toaster';
import { useToast } from './ui/use-toast';
import { FlashProps } from '@/types';

export default function ToastNotifications() {
    const { session_flash } = usePage<FlashProps>().props;
    const { toast } = useToast();
    useEffect(() => {
        if (session_flash && session_flash.message) {
            toast({
                status: session_flash.status,
                title: session_flash.title,
                description: session_flash.message,
                icon: session_flash.icon,
                className: session_flash.className,
            });
        }
    }, [session_flash]);

    return <Toaster />;
}
