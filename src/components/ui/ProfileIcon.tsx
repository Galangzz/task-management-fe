import React from 'react';
import { useUserStore } from '../../stores/useUserStore.js';

function ProfileIcon({
    onClick,
}: {
    onClick: () => void;
}) {
    const { user } = useUserStore();
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.username || 'user'}`;
    return (
        <div
            className="h-10 w-10 cursor-pointer overflow-hidden rounded-full hover:brightness-90"
            onClick={onClick}
        >
            <img
                src={avatarUrl}
                alt="Avatar User"
                className="h-full w-full object-cover"
            />
        </div>
    );
}

export default ProfileIcon;
