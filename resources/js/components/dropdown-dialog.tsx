import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Icon } from '@/components/icons';
import * as icons from '@tabler/icons-react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { buttonVariants } from './ui/button';

interface Props {
    trigger_text: string;
    title?: string;
    variants?: any;
    description: string;
    cancel_text?: string;
    submit_text?: string;
    processing?: boolean;
    action: () => void;
    icon: keyof typeof icons;
}

export function DropdownDialog({
    trigger_text,
    icon,
    variants = 'default',
    title = 'Are you absolutely sure?',
    description,
    processing,
    cancel_text = 'Cancel',
    submit_text = 'Continue',
    action,
}: Props) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                    <Icon className='mr-2' name={icon} />
                    {trigger_text}
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>{cancel_text}</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={processing}
                        onClick={action}
                        className={buttonVariants({ variant: variants })}>
                        {submit_text}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
