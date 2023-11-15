import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function Profile({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={cn('flex items-center font-normal', className)}>{children}</div>;
}

export function ProfileHeader({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={cn('mr-3 shrink-0', className)}>{children}</div>;
}

export function ProfileAvatar({ className, children }: PropsWithChildren<{ className?: string }>) {
    return <Avatar className={cn(className)}>{children}</Avatar>;
}

export function ProfileImage({ className, src }: { className?: string; src: string }) {
    return <AvatarImage className={cn(className)} src={src} />;
}

export function ProfileFallback({ className }: PropsWithChildren<{ className?: string }>) {
    return <AvatarFallback className={cn(className)} />;
}

export function ProfileContent({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <div className={cn(className)}>{children}</div>;
}

export function ProfileName({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <h4 className={cn('block font-medium', className)}>{children}</h4>;
}

export function ProfileAdditional({
    className,
    children,
}: PropsWithChildren<{
    className?: string;
}>) {
    return <p className={cn('text-xs text-muted-foreground', className)}>{children}</p>;
}
