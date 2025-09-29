import { useState } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { MainRoutes } from "../routes/mainRoutes";
import { MOCK_SIDEBAR_ITEMS } from "../assets/mocks";
import { observer } from "mobx-react-lite";

export const Main = observer(() => {
  const [sidebarItems, setSidebarItems] = useState(MOCK_SIDEBAR_ITEMS.slice());
  const [activeSidebarItemId, setActiveSidebarItemId] = useState(null);

  const handleActivateSidebarItem = (sidebarItemId) => {
    setActiveSidebarItemId(sidebarItemId);
  };

  const [lastSidebarItemId, setLatSidebarItemId] = useState(10);

  const handleDeleteSidebarItem = (sidebarItemId) => {
    setSidebarItems(
      sidebarItems.filter((item) => {
        return item.id !== sidebarItemId;
      })
    );
  };

  const handleAddSidebarItem = () => {
    setSidebarItems([
      ...sidebarItems,
      { id: lastSidebarItemId + 1, title: "New Group" },
    ]);
    setLatSidebarItemId(lastSidebarItemId + 1);
    setActiveSidebarItemId(lastSidebarItemId + 1);
  };

  return (
    <div>
      <Sidebar
        sidebarItems={sidebarItems}
        activeSidebarItemId={activeSidebarItemId}
        handleActivateSidebarItem={handleActivateSidebarItem}
        handleDeleteSidebarItem={handleDeleteSidebarItem}
        handleAddSidebarItem={handleAddSidebarItem}
      />

      <div className="work-zone">
        <MainRoutes />
      </div>
    </div>
  );
});
