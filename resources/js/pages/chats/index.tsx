import ChatLayout from '@/layouts/chat-layout';

export default function Chat() {
    return (
        <div className='p-6'>
            <div className='flex h-[90vh] items-center justify-center'>
                <h1 className='animate-pulse text-xl font-bold text-foreground'>Start Chat Now ....</h1>
            </div>
        </div>
    );
}

Chat.layout = (page: React.ReactNode) => <ChatLayout children={page} title='Chats' />;
