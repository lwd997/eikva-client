import { SidebarItem } from "../SidebarItem/SidebarItem";
import "./Sidebar.css";
export const Sidebar = () => {
  return (
    <div className="sidebar">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => {
        return <SidebarItem key={index} />;
      })}
    </div>
  );
};
