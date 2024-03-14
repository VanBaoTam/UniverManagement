import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import {
  PERMISSIONS,
  SIDEBAR_ADMINS,
  SIDEBAR_INSTRUCTORS,
  SIDEBAR_STUDENTS,
} from "@constants/common";
import React, { useContext } from "react";
import UserContext from "@contexts/user";
const Sidebarr = () => {
  const { user } = useContext(UserContext) ?? {};
  const { role } = user ?? {};

  const renderMenuItem = (categorykitchen) => {
    return (
      <MenuItem
        key={categorykitchen.id}
        component={
          <NavLink
            to={categorykitchen.link}
            style={({ isActive, isPending, isTransitioning }) => {
              return {
                fontWeight: isActive ? "bold" : "",
                background: isActive
                  ? "linear-gradient(45deg, #85FFBD 0%, #d3ff7d 100%)"
                  : "",
                color: isPending ? "red" : "black",
                viewTransitionName: isTransitioning ? "slide" : "",
              };
            }}
          />
        }
      >
        {categorykitchen.name}
      </MenuItem>
    );
  };

  return (
    <div style={{ display: "flex", height: "100%", minHeight: "800px" }}>
      <Sidebar>
        <Menu
          rootStyles={{
            background: "",
          }}
        >
          {role === PERMISSIONS.STUDENT && (
            <div>
              {SIDEBAR_STUDENTS.map((categorykitchen) =>
                renderMenuItem(categorykitchen)
              )}
            </div>
          )}
          {role === PERMISSIONS.ADMIN && (
            <div>
              {SIDEBAR_ADMINS.map((categorykitchen) =>
                renderMenuItem(categorykitchen)
              )}
            </div>
          )}
          {role === PERMISSIONS.TEACHER && (
            <div>
              {SIDEBAR_INSTRUCTORS.map((categorykitchen) =>
                renderMenuItem(categorykitchen)
              )}
            </div>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};
export default Sidebarr;
