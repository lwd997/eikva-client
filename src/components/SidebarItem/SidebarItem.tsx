import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../universal/Button/Button";

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
    const pathname = useLocation().pathname;

    const cancelRename = () => {
        setNextName(title);
        setIsRenaming(false);
    }

    const confirmRename = () => {
        setIsRenaming(false);
        onRename(nextName, uuid);
    }

    /*const onClick:MouseEventHandler<HTMLAnchorElement> = (e) => {
        if (e.currentTarget.tagName !== 'A') {
            e.preventDefault();
        }
    }*/

    let entryClassName = "card sidebar-item text-default display-flex align-items-center justify-content-space-between";
    if (pathname.replace("/", "") === uuid) {
        entryClassName += " active";
    }

    return (
        <Link to={"/" + uuid} className={entryClassName}>
            {isRenaming
                ? <input value={nextName} onChange={(e) => setNextName(e.target.value)} />
                : <div className="text-ellipsis width-100" >{title}</div>}

            <div className="display-flex">
                {userUUID === creator &&
                    <>
                        {isRenaming
                            ? (
                                <>
                                    <Button className="button-small" onClick={confirmRename}>Y</Button>
                                    <Button className="button-small" onClick={cancelRename}>N</Button>
                                </>
                            )
                            : (
                                <>
                                    <Button className="button-small" onClick={() => setIsRenaming(true)}>R</Button>
                                    <Button className="button-small">S</Button>
                                    <Button className="button-small" onClick={() => onDelete(uuid)}>D</Button>
                                </>
                            )
                        }
                    </>
                }

            </div>
        </Link>
    );
};
