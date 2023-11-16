import { Icon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import ChatLayout from '@/layouts/chat-layout';
import { cn } from '@/lib/utils';
import { PageProps, UserType } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

interface TypingIndicatorType {
    typing: boolean;
    setTyping: (typing: boolean) => void;
}

interface ChatType {
    id: number;
    sender_id: number;
    receiver_id: number;
    message: string;
    created_at: string;
    updated_at: string;
}

function ChatDropdownMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'>
                <Icon name='IconDotsVertical' className='h-[1.15rem] w-[1.15rem]' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='mt-2 w-[200px] space-y-1'>
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={'#'}>
                            <Icon name='IconUserSquare' className='mr-2' />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href={'#'}>
                            <Icon name='IconSettings' className='mr-2' />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href={route('chats.index')}>
                            <Icon name='IconLogout2' className='mr-2' />
                            Close Chat
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ChatTopNavigation({ user, typing, setTyping }: { user: UserType } & TypingIndicatorType) {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-bold'>{user.name}</h2>
                <ChatDropdownMenu />
            </div>
            {typing && <p className='animate-pulse text-xs font-semibold text-green-500'>typing...</p>}
        </div>
    );
}

function ChatBottomForm({
    user,
    scrollRef,
    focusRef,
    onTyping,
}: {
    user: UserType;
    scrollRef: any;
    focusRef: any;
    onTyping: any;
}) {
    const { data, setData, processing, reset, post } = useForm({
        message: '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('chats.store', [user]), {
            onSuccess: () => {
                reset('message');
                scrollRef?.current?.scrollTo(0, 9999999);
            },
        });
    };
    return (
        <form onSubmit={submit}>
            <div className='flex items-center gap-x-2'>
                <Input
                    onKeyUp={onTyping}
                    ref={focusRef}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    id='message'
                    name='message'
                    autoComplete='off'
                    placeholder='Type a message...'
                    className='focus-visible:ring-0'
                    required
                    disabled={processing}
                />
                <Button variant={'outline'} size={'icon'} disabled={data.message === '' ? true : processing}>
                    <Icon name='IconSend' />
                </Button>
            </div>
        </form>
    );
}

export default function ChatShow({ user, chats }: { user: UserType; chats: ChatType[] }) {
    const { auth, errors } = usePage<PageProps>().props;
    const [typing, setTyping] = useState(false);
    const chatRoomScrollRef = useRef<HTMLDivElement>(null);
    const messageFocusRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const sts = (x: string | number, y: string | number, option: string = 'alignment') => {
        if (option === 'alignment') {
            return x === y ? 'justify-end' : 'justify-start';
        }
        if (option === 'background') {
            return x === y ? 'bg-green-100 dark:bg-green-900' : 'bg-accent';
        }
    };

    const onTyping = () => {
        setTimeout(() => {
            Echo.private(`chats.${user.uuid}`).whisper('typing', { name: user.name });
        }, 500);
    };

    Echo.private('chats.' + auth.user.uuid)
        .listenForWhisper('typing', (e: any) => {
            setTyping(true);
            setTimeout(() => setTyping(false), 5000);
        })
        .listen('MessageSent', ({ chat }: { chat: ChatType }) => {
            router.reload({
                preserveScroll: true,
                onSuccess: () => {
                    chatRoomScrollRef?.current?.scrollTo(0, 9999999);
                    setTyping(false);
                },
            });
        });

    useEffect(() => {
        chatRoomScrollRef?.current?.scrollTo(0, 9999999);
        messageFocusRef?.current?.focus();
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
                    <ChatTopNavigation user={user} typing={typing} setTyping={setTyping} />
                </div>
                <div className='simple-scrollbar flex-1 space-y-2 overflow-y-auto px-5 py-2' ref={chatRoomScrollRef}>
                    {chats.length ? (
                        chats.map((chat: ChatType, i: number) => (
                            <div
                                key={i}
                                className={cn('relative flex', sts(auth.user.id, chat.sender_id, 'alignment'))}>
                                <div
                                    className={cn(
                                        'max-w-md rounded-lg px-3 py-1 text-sm',
                                        sts(auth.user.id, chat.sender_id, 'background'),
                                    )}>
                                    {chat.message}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='flex h-full items-center justify-center'>
                            <h4 className='animate-pulse text-xl font-bold text-foreground'>
                                Start chat with {user.name}.
                            </h4>
                        </div>
                    )}
                </div>
                <div className='border-t p-2'>
                    <ChatBottomForm
                        user={user}
                        scrollRef={chatRoomScrollRef}
                        focusRef={messageFocusRef}
                        onTyping={onTyping}
                    />
                </div>
            </div>
        </div>
    );
}

ChatShow.layout = (page: React.ReactNode) => <ChatLayout children={page} />;
