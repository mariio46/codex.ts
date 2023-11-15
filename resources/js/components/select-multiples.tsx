import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { IconSelector, IconX } from '@tabler/icons-react';
import { Icon } from './icons';

export default function SelectMultiples({
    data,
    selectedItem,
    onChange,
    label,
}: {
    data: any;
    selectedItem: any;
    onChange: any;
    label: string;
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <Listbox
            as='div'
            className='relative rounded-xl'
            value={selectedItem}
            onChange={onChange}
            multiple
            // open={isOpen}
        >
            <Listbox.Button className={buttonVariants({ variant: 'outline', className: 'w-full justify-between' })}>
                {label} Selected : {selectedItem?.length}
                <div onClick={() => setIsOpen(!isOpen)}>
                    <IconSelector className='h-4 w-4 text-muted-foreground' />
                </div>
            </Listbox.Button>
            {selectedItem?.length ? (
                <small className='mt-0 flex flex-wrap items-center gap-2 text-xs text-blue-600'>
                    {selectedItem.map((item: any, i: number) => (
                        <div
                            key={i}
                            className='group mt-2 flex select-none overflow-hidden rounded border bg-background'>
                            <span className='px-2 py-1 font-medium text-foreground'>{item}</span>
                            <button
                                value={item}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onChange(selectedItem.filter((item: any) => item != e.currentTarget.value));
                                }}
                                className='px-2 py-1 font-bold text-muted-foreground hover:bg-accent focus:outline-none group-hover:bg-accent group-hover:text-foreground'>
                                <IconX className='h-3 w-3' />
                            </button>
                        </div>
                    ))}
                </small>
            ) : null}
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Listbox.Options className='simple-scrollbar absolute bottom-[75px] right-0 mb-1 h-52 w-[200px] overflow-y-auto rounded border bg-background py-1 shadow-sm'>
                    {data.map((item: any, i: number) => (
                        <Listbox.Option key={i} value={item.value}>
                            {({ selected, active }) => (
                                <div
                                    className={cn(
                                        'flex cursor-pointer items-center justify-between px-4 py-1.5',
                                        active && 'bg-accent',
                                    )}>
                                    <span className={cn(selected && '', 'select-none text-sm')}>{item.label}</span>
                                    {(selected || selectedItem?.find((i: any) => i.value == item.value)) && (
                                        <Icon
                                            name='IconCheck'
                                            className={cn(
                                                (selected || selectedItem?.find((i: any) => i.value == item.value)) &&
                                                    '',
                                                'h-4 w-4 stroke-[2] text-green-400',
                                            )}
                                        />
                                    )}
                                </div>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Transition>
        </Listbox>
    );
}
