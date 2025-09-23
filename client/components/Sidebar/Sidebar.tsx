import { useState } from "react";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import Button from "../universal/Button/Button";
import "./Sidebar.css";
export const Sidebar = ({
  sidebarItems,
  activeSidebarItemId,
  handleActivateSidebarItem,
  handleDeleteSidebarItem,
  handleAddSidebarItem,
}) => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <div className="sidebar">
      <div className="sidebar-main">
        <div className="logo">
          <div className="logo-image" />
          <div className="logo-brand">aIQa (Эйква)</div>
        </div>
        <div className="sidebar-groups">
          <Button onClick={handleAddSidebarItem}>Create Group</Button>
          {isAuth &&
            sidebarItems.map((sidebarItem, index) => {
              return (
                <SidebarItem
                  key={index}
                  title={sidebarItem.title}
                  isActive={sidebarItem.id === activeSidebarItemId}
                  handleActivateSidebarItem={() => {
                    handleActivateSidebarItem(sidebarItem.id);
                  }}
                  handleDeleteSidebarItem={() => {
                    handleDeleteSidebarItem(sidebarItem.id);
                  }}
                />
              );
            })}
        </div>
      </div>
      <Button data-bs-toggle="modal" data-bs-target="#signInModal">
        {isAuth ? "Sign out" : "Sign in"}
      </Button>
      <div className="modal fade" id="signInModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="signInModalLabel">
                Sign In
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label for="exampleInput1" className="form-label">
                  Login
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInput1"
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
            </div>
            <div className="modal-footer">
              <Button data-bs-dismiss="modal">Close</Button>
              <Button
                onClick={() => {
                  setIsAuth(true);
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
