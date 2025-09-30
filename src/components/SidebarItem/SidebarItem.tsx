import { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarItem.css";

interface SidebarItemProps {
    title: string;
    uuid: string;
    creator: string;
    userUUID: string | null;
    onDelete: (uuid: string) => void;
    onRename: (name: string, uuid: string) => void;
}

export const SidebarItem = ({
    title,
    uuid,
    userUUID,
    creator,
    onDelete,
    onRename
}: SidebarItemProps) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [nextName, setNextName] = useState(title);

    const cancelRename = () => {
        setNextName(title);
        setIsRenaming(false);
    }

    const confirmRename = () => {
        setIsRenaming(false);
        onRename(nextName, uuid);
    }

    return (
        <Link to={"/" + uuid} className="sidebar-item">
            {isRenaming
                ? <input value={nextName} onChange={(e) => setNextName(e.target.value)} />
                : <div>{title}</div>}

            <div
                style={{
                    display: 'flex',
                    gap: '5px'
                }}
            >
                {userUUID === creator &&
                    <>
                        {isRenaming
                            ?
                            <>
                                <button onClick={confirmRename} >Y</button>
                                <button onClick={cancelRename}>N</button>
                            </>
                            :
                            <>
                                <button onClick={() => setIsRenaming(true)}>R</button>
                                <button>S</button>
                                <button onClick={() => onDelete(uuid)}>D</button>
                            </>
                        }
                    </>
                }

            </div>
        </Link>
    );
};
