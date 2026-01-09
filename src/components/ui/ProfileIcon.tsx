import React from 'react';
import { useUserStore } from '../../stores/useUserStore.js';

function ProfileIcon() {
    const { user } = useUserStore();
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || 'user'}`;
    return (
        <div>
            <div className="h-10 w-10 overflow-hidden rounded-full cursor-pointer hover:brightness-90">
                <img
                    src={avatarUrl}
                    alt="Avatar User"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}

export default ProfileIcon;
