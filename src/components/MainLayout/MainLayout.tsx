import { useState } from "react";
import { MOCK_SIDEBAR_ITEMS } from "../../assets/mocks";
import { Sidebar } from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";


const MainLayout = observer(() => {
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
    <>
      <Sidebar
        sidebarItems={sidebarItems}
        activeSidebarItemId={activeSidebarItemId}
        handleActivateSidebarItem={handleActivateSidebarItem}
        handleDeleteSidebarItem={handleDeleteSidebarItem}
        handleAddSidebarItem={handleAddSidebarItem}
      />

      <div className="work-zone"></div>
      <Outlet />
    </>
  );
});

export default MainLayout;
