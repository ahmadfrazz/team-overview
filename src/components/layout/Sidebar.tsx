// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar navigation links
 *
 * Use NavLink to reflect active state.
 */
export default function Sidebar() {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded-md text-sm ${
      isActive ? 'bg-primary/10 font-medium' : 'hover:bg-muted/50'
    }`;

  return (
    <nav className="p-4">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase mb-2">Main</div>
        <NavLink to="/" className={navItemClass}>
          Team Overview
        </NavLink>
        <NavLink to="/analytics" className={navItemClass}>
          Analytics
        </NavLink>
        <NavLink to="/sessions" className={navItemClass}>
          Sessions
        </NavLink>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase mb-2">Manage</div>
        <NavLink to="/teams" className={navItemClass}>
          Teams
        </NavLink>
      </div>
    </nav>
  );
}
