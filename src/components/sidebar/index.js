import React from "react";
import menus from "../../helper/data/menu";
import NavLink from "./navLink";

const Index = () => {
  return (
    <div className="sidebar_wrapper">
      <div className="content">
        <ul className="menu_lists">
          {menus.map((data, index) => (
            <li key={index + 1} className={`${data.className}`}>
              <NavLink to={`${data.path}`}>
                  <strong>{data.icon}</strong> <span>{data.link}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
