import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function SortButton () {
    const sortCategory = [
        {"id": 1, "sort": "Rank"},
        {"id": 2, "sort": "Country"},
        {"id": 3, "sort": "Market Value"},
        {"id": 4, "sort": "Profits"},
        {"id": 5, "sort": "Assets"}
    ]
    return (
        <div className = {` ml-auto mt-auto shrink-0 `}>
            <Menu as="div" className="relative inline-block">
                <div>
                    <Menu.Button
                        className="inline-flex w-full justify-center rounded-md outline-1 border border-slate-200
                            bg-neutral-700 hover:bg-neutral-500 px-4 py-2 text-sm font-medium text-white
                             focus:outline-1 focus-visible:ring-2 focus-visible:ring-white/75 ease-out duration-100">
                        Sort By
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-neutral-50 shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                        {sortCategory.map((item) => (
                            <div key={item.id} className="px-1 py-1 ">
                            <Menu.Item>
                                    <button
                                        className={'text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm'}
                                    >
                                        {item.sort}
                                    </button>


                            </Menu.Item>
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}