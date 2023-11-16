import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import ChatLayout from '@/layouts/chat-layout';
import { cn } from '@/lib/utils';
import { PageProps, UserType } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef } from 'react';

interface ChatType {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at: string;
    updated_at: string;
}

export default function ChatShow({ user, chats }: { user: UserType; chats: ChatType[] }) {
    const { auth } = usePage<PageProps>().props;
    const chatRoomScrollRef = useRef<any>(null);
    const messageFocusRef = useRef<any>(null);
    const { toast } = useToast();
    const { data, setData, processing, reset, post, errors } = useForm({
        message: '',
    });

    const sts = (x: string | number, y: string | number, option: string = 'alignment') => {
        if (option === 'alignment') {
            return x === y ? 'justify-end' : 'justify-start';
        }
        if (option === 'background') {
            return x === y ? 'bg-green-100 dark:bg-green-900' : 'bg-accent';
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('chats.store', [user]), {
            onSuccess: () => {
                reset('message');
                chatRoomScrollRef.current.scrollTo(0, 9999999);
            },
        });
    };

    Echo.private('chats.' + auth.user.id).listen('MessageSent', ({ chat }: { chat: ChatType }) => {
        router.reload({
            preserveScroll: true,
            onSuccess: () => {
                chatRoomScrollRef.current.scrollTo(0, 9999999);
            },
        });
    });

    useEffect(() => {
        chatRoomScrollRef.current.scrollTo(0, 9999999);
        messageFocusRef.current.focus();
        if (errors.message) {
            toast({
                title: 'Errors',
                description: errors.message,
                icon: 'IconCircleXFilled',
                className: 'text-red-500',
            });
        }
    }, [errors, chatRoomScrollRef, messageFocusRef, chats]);

    return (
        <div>
            <Head title={`Chat with ${user.name}`} />
            <div className='flex h-[98vh] flex-col justify-between'>
                <div className='border-b border-r bg-background p-5'>
                    <h2 className='text-xl font-bold'>{user.name}</h2>
                </div>
                <div className='simple-scrollbar flex-1 space-y-2 overflow-y-auto px-5 py-2' ref={chatRoomScrollRef}>
                    {chats.length ? (
                        chats.map((chat: ChatType, i: number) => (
                            <div
                                key={i}
                                className={cn('relative flex', sts(auth.user.id, chat.sender_id, 'alignment'))}>
                                <div
                                    className={cn(
                                        'rounded-lg px-3 py-1 text-sm',
                                        sts(auth.user.id, chat.sender_id, 'background'),
                                    )}>
                                    {chat.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Start chatting with {user.name}...</p>
                    )}
                </div>
                <div className='border-t p-2'>
                    <form onSubmit={submit}>
                        <div className='flex items-center gap-x-2'>
                            <Input
                                ref={messageFocusRef}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                id='message'
                                name='message'
                                autoComplete='off'
                                placeholder='Type a message...'
                                className='focus-visible:ring-0'
                                // autoFocus
                                required
                                disabled={processing}
                            />
                            <Button
                                variant={'outline'}
                                size={'icon'}
                                disabled={data.message === '' ? true : processing}>
                                <Icon name='IconSend' />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

ChatShow.layout = (page: React.ReactNode) => <ChatLayout children={page} />;
