import React, { useEffect, useState } from 'react';
import { deleteTabById } from '../../services/taskTabsService.js';
import { useTabsStore } from '../../stores/useTabStore.js';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast.js';
import { EllipsisVertical } from 'lucide-react';

function MenuTaskContent({
    tabId,
    deletePermission = true,
}: {
    tabId: string;
    deletePermission?: boolean;
}) {
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const { setTabs, tab, optimisticDeleteTab, optimisticAddTab } =
        useTabsStore();
    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setShowMenu(false);
            }
        });
    }, []);

    const handleDeleteTab = async (tabId: string) => {
        try {
            optimisticDeleteTab(tabId);
            navigate('/', { replace: true });
            await deleteTabById(tabId);
            toast.success('Tab berhasil dihapus');
        } catch {
            optimisticAddTab(tab!);
        }
    };

    return (
        <div
            className="relative flex w-fit items-center justify-center"
            ref={menuRef}
        >
            <div
                className="cursor-pointer rounded-full p-2! hover:backdrop-invert-25"
                onClick={() => setShowMenu(!showMenu)}
            >
                <EllipsisVertical size={20} />
            </div>
            <div
                className={`absolute bottom-0 left-0 z-10 w-34 -translate-x-31 translate-y-14 flex-col rounded-lg border border-primary/40 bg-card py-2! shadow-xs ${
                    showMenu ? 'flex' : 'hidden'
                }`}
            >
                <button
                    type="button"
                    className={`w-full p-2! ${!deletePermission ? 'cursor-not-allowed text-primary/40' : 'cursor-pointer hover:backdrop-invert-25'}`}
                    onClick={() => {
                        handleDeleteTab(tabId);
                    }}
                    disabled={!deletePermission}
                >
                    Hapus Tab
                </button>
            </div>
        </div>
    );
}

export default MenuTaskContent;
