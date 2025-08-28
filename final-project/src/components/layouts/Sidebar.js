import React from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiViewBoards, HiInbox, HiUser, HiArrowSmRight } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const DashboardSidebar = () => {
  return (
    <Sidebar aria-label="Dashboard sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item as={NavLink} to="/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/dashboard/list-job-vacancy" icon={HiViewBoards} labelColor="dark">
            Manajemen Lowongan
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/dashboard/profile" icon={HiUser}>
            Profil
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;