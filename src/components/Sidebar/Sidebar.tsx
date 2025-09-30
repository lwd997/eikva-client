import { useEffect, useState, useSyncExternalStore } from "react";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import Button from "../universal/Button/Button";
import type { TestCaseGroup } from "../../models/TestCase";
import { http } from "../../http";
import { appStore } from "../../Storage";
import "./Sidebar.css";

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
        <div className="sidebar">
            <div className="sidebar-main">
                <div className="logo">
                    <div className="logo-image" />
                    <div className="logo-brand">aIQa (Эйква)</div>
                </div>
                <div className="sidebar-groups">
                    <Button onClick={createGroup}>Create Group</Button>
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
            </div>
            <Button data-bs-toggle="modal" data-bs-target="#signInModal"> </Button>

        </div>
    );
};
