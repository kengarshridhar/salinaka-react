import { ADMIN_PRODUCTS, ADMIN_USERS } from 'constants/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_PRODUCTS}
        >
          Products
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_USERS}
        >
          Users
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">Orders</h4>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">Stocks</h4>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">Payment History</h4>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
