import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../universal/Button/Button";

interface SidebarItemProps {
    title: string;
    uuid: string;
    creator: string;
    userUUID: string | null;
    isActive: boolean;
    onDelete: (uuid: string) => void;
    onExport: (uuid: string, name: string, type: "excel" | "zephyr") => void;
    onRename: (name: string, uuid: string) => void;
}

enum Action {
    Rename,
    Delete,
    Export,
    None
}

export const SidebarItem = ({
    title,
    uuid,
    userUUID,
    creator,
    isActive,
    onDelete,
    onExport,
    onRename
}: SidebarItemProps) => {
    const [action, setAction] = useState<Action>(Action.None);
    const [nextName, setNextName] = useState(title);
    const [isHovered, setIsHovered] = useState(false);
    const isAction = action !== Action.None;

    const cancelAction = () => {
        setNextName(title);
        setAction(Action.None);
    }

    const confirmAction = () => {
        if (action === Action.Rename) {
            onRename(nextName, uuid);
        }
        else if (action === Action.Delete) {
            onDelete(uuid);
        }

        setAction(Action.None);
    }

    const confirmExport = (type: "excel" | "zephyr") => {
        onExport(uuid, title, type);
        setAction(Action.None);
    }

    let entryClassName = "card sidebar-item display-flex align-items-center justify-content-space-between";
    if (isActive) {
        entryClassName += " active";
    }

    return (
        <div
            className={entryClassName}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {action === Action.Rename
                ? <input value={nextName} onChange={(e) => setNextName(e.target.value)} />
                : (
                    <Link to={"/" + uuid} className="text-default" >
                        <span className="text-ellipsis width-100">{title}</span>
                    </Link>
                )
            }

            {(isHovered || isActive) &&
                <div className="display-flex align-items-center">

                    {!isAction && <Button icon="download" className="button-small" onClick={() => setAction(Action.Export)} />}
                    {action === Action.Export &&
                        <>
                            <Button icon="table" className="button-small" onClick={() => confirmExport("excel")} />
                            <Button icon="data_object" className="button-small" onClick={() => confirmExport("zephyr")} />
                            <Button icon="close" className="button-small" onClick={cancelAction} />

                        </>
                    }

                    {(userUUID === creator && action !== Action.Export) &&
                        <>
                            {action == Action.Delete && <span>Удалить?</span>}
                            {isAction
                                ? (
                                    <>
                                        <Button className="button-small" icon="check" onClick={confirmAction} />
                                        <Button className="button-small" icon="close" onClick={cancelAction} />
                                    </>
                                )
                                : (
                                    <>
                                        <Button icon="edit_square" className="button-small" onClick={() => setAction(Action.Rename)} />
                                        <Button icon="delete" className="button-small" onClick={() => setAction(Action.Delete)} />
                                    </>
                                )
                            }
                        </>
                    }

                </div>
            }
        </div>
    );
};
