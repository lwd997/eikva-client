import { useEffect, useState, useSyncExternalStore } from "react";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import Button from "../universal/Button/Button";
import type { TestCaseGroup } from "../../models/TestCase";
import { http } from "../../http";
import { appStore } from "../../Storage";

export const Sidebar = () => {
    const [groupList, setGroupList] = useState<TestCaseGroup[]>([]);
    const store = useSyncExternalStore(appStore.subscribe, appStore.getSnapshot);

    const getGroups = async () => {
        const response = await http.request<{ groups: TestCaseGroup[] }>("/groups/get");
        if (response.status === 200) {
            setGroupList(response.body.groups);
        }
    }

    const createGroup = async () => {
        const response = await http.request<TestCaseGroup>("/groups/add", {
            method: "POST",
            body: { name: "Новая группа" }
        });

        if (response.status === 200) {
            setGroupList([...groupList, response.body]);
        }
    }

    const deleteGroup = async (uuid: string) => {
        const response = await http.request("/groups/delete", {
            method: "POST",
            body: { uuid }
        });

        if (response.status === 200) {
            setGroupList((g) => g.filter((el) => el.uuid !== uuid));
        }
    }

    const renameGroup = async (name: string, uuid: string) => {
        const response = await http.request<TestCaseGroup>("/groups/rename", {
            method: "POST",
            body: { name, uuid }
        });

        if (response.status === 200) {
            setGroupList((g) => g.map((el) => el.uuid !== uuid ? el : response.body));
        }
    }

    useEffect(() => {
        getGroups();
    }, []);

    return (
        <div className="sidebar flex-wooden display-flex flex-direction-column overflow-y-hidden">
            <div className="case-group-list flex-rubber display-flex flex-direction-column overflow-y-auto">
                {groupList.map((g) => (
                    <SidebarItem
                        key={g.uuid}
                        userUUID={store.userUUID}
                        uuid={g.uuid}
                        title={g.name}
                        creator={g.creator_uuid}
                        onDelete={deleteGroup}
                        onRename={renameGroup}
                    />
                ))}
            </div>

            <div className="display-flex">
                <Button onClick={createGroup}>Создать новую группу</Button>
            </div>
        </div>
    );
};
