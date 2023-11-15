import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { Icon } from '../icons';
import { cn } from '@/lib/utils';

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider duration={8000}>
            {toasts.map(function ({
                id,
                icon = 'IconCheck',
                className = 'text-green-500',
                status,
                title,
                description,
                action,
                ...props
            }) {
                return (
                    <Toast key={id} {...props}>
                        <div className='flex gap-x-3'>
                            {icon && <Icon name={icon} className={cn('stroke-2', className)} />}
                            <div className='flex flex-col'>
                                <ToastTitle>{title}</ToastTitle>
                                <ToastDescription>{description}</ToastDescription>
                            </div>
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
