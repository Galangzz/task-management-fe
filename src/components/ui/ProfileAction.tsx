import React from 'react';
import { useUserStore } from '../../stores/useUserStore.js';
import { useTaskStore } from '../../stores/useTaskStore.js';
import { useTabsStore } from '../../stores/useTabStore.js';

const actionList = ['Settings', 'Logout'];
function ProfileAction({
    show,
}: {
    show: boolean;
}) {
    const { handleLogout } = useUserStore();
    const { resetTaskStore } = useTaskStore();
    const { resetTabStore } = useTabsStore();
    return (
        <div
            className={`${show ? 'flex flex-col' : 'hidden'} absolute right-0 -bottom-1 w-fit translate-y-full z-20 flex-col gap-2 rounded-sm bg-secondary  py-4! text-sm font-bold text-balance inset-shadow-sm inset-shadow-white/10`}
        >
            {actionList.map((action, index) => (
                <div
                    key={index}
                    className="flex w-full items-center gap-2 px-8! py-1! hover:cursor-pointer hover:backdrop-invert-25"
                    onClick={() => {
                        if (action === 'Logout') {
                            handleLogout().then(() => {
                                resetTaskStore();
                                resetTabStore();
                            });
                        } else {
                            alert(action);
                        }
                    }}
                >
                    <p>{action}</p>
                </div>
            ))}
        </div>
    );
}

export default ProfileAction;
