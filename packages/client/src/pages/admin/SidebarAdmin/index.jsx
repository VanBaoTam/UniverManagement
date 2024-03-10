import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import { SIDEBARADMINS } from "../../../constants/common";
const SidebarAdmin = () => {
  return (
    <>
      <div style={{ display: "flex", height: "100%", minHeight: "800px" }}>
        <Sidebar>
          <Menu
            rootStyles={{
              background: "",
            }}
          >
            {SIDEBARADMINS.map((categorykitchen) => (
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
                {categorykitchen.name}{" "}
              </MenuItem>
            ))}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};
export default SidebarAdmin;
