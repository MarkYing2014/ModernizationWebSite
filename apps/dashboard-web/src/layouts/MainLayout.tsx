import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  AppShell, 
  Navbar, 
  Header, 
  MediaQuery, 
  Burger, 
  useMantineTheme, 
  Text, 
  Group, 
  Avatar, 
  ActionIcon, 
  Tooltip, 
  Divider, 
  UnstyledButton, 
  Box
} from '@mantine/core';
import { 
  Home2, 
  LayoutDashboard, 
  BrowserPlus, 
  ListDetails, 
  Graph, 
  Palette, 
  Settings, 
  Logout, 
  Bell, 
  Moon, 
  Sun, 
  ChevronLeft, 
  ChevronRight, 
  User 
} from 'tabler-icons-react';
import { NavLink } from 'react-router-dom';

// Logo component
const Logo = () => (
  <Group spacing="xs" p="md">
    <div style={{ 
      width: 32, 
      height: 32, 
      borderRadius: '50%', 
      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Text fw={700} color="white">M</Text>
    </div>
    <Text fw={700} size="lg" color="blue">ModernizeWeb</Text>
  </Group>
);

// Navigation link component
interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  collapsed?: boolean;
}

const NavItem = ({ icon, label, to, collapsed = false }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      style={({ isActive }) => ({
        backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
        color: isActive ? 'var(--color-white)' : 'var(--color-on-surface)',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--spacing-2) var(--spacing-3)',
        margin: '0 var(--spacing-2) var(--spacing-2) var(--spacing-2)',
        transition: 'background-color var(--transition-fast) var(--transition-timing)'
      })}
    >
      <Group spacing="xs">
        {icon}
        {!collapsed && <span>{label}</span>}
      </Group>
    </NavLink>
  );
};

const MainLayout: React.FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would update the theme throughout the application
    document.body.classList.toggle('dark-theme');
  };

  // Mock user data - would come from auth context in a real app
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80'
  };

  return (
    <AppShell
      styles={{
        main: {
          background: darkMode ? 'var(--color-gray-900)' : 'var(--color-gray-50)',
          padding: 0,
          width: '100%',
          maxWidth: 'none',
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: collapsed ? 60 : 200 }}
          className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}
          style={{
            transition: 'width 0.3s ease',
            backgroundColor: darkMode ? 'var(--color-gray-800)' : 'var(--color-white)',
            border: `1px solid ${darkMode ? 'var(--color-gray-700)' : 'var(--color-gray-200)'}`,
          }}
        >
          {/* Sidebar content */}
          <Navbar.Section>
            {!collapsed && <Logo />}
            {collapsed && (
              <Box p="md" style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar radius="xl" size={40} src={null} color="blue">M</Avatar>
              </Box>
            )}
          </Navbar.Section>

          <Divider my="sm" />

          <Navbar.Section grow>
            <NavItem 
              icon={<Home2 size={20} />} 
              label="Home" 
              to="/dashboard" 
              collapsed={collapsed} 
            />
            <NavItem 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              to="/dashboard" 
              collapsed={collapsed} 
            />
            <NavItem 
              icon={<BrowserPlus size={20} />} 
              label="New Project" 
              to="/projects/new" 
              collapsed={collapsed} 
            />
            <NavItem 
              icon={<ListDetails size={20} />} 
              label="Projects" 
              to="/projects" 
              collapsed={collapsed} 
            />
            <NavItem 
              icon={<Graph size={20} />} 
              label="Visualizations" 
              to="/projects/demo/visualization" 
              collapsed={collapsed} 
            />
            <NavItem 
              icon={<Palette size={20} />} 
              label="Design Options" 
              to="/projects/demo/designs" 
              collapsed={collapsed} 
            />
            <NavItem 
              icon={<Settings size={20} />} 
              label="Settings" 
              to="/settings" 
              collapsed={collapsed} 
            />
          </Navbar.Section>

          <Divider my="sm" />

          <Navbar.Section>
            {/* Collapse/Expand button */}
            <Group position="center" my="md">
              <ActionIcon 
                variant="default" 
                onClick={() => setCollapsed(!collapsed)}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
              </ActionIcon>
            </Group>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header 
          height={60} 
          p="md" 
          className="dashboard-header"
          style={{
            backgroundColor: darkMode ? 'var(--color-gray-800)' : 'var(--color-white)',
            borderBottom: `1px solid ${darkMode ? 'var(--color-gray-700)' : 'var(--color-gray-200)'}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>ModernizationWebSite Dashboard</Text>

            <Group>
              <Tooltip label="Notifications">
                <ActionIcon variant="default" size={36}>
                  <Bell size={18} />
                </ActionIcon>
              </Tooltip>
              
              <Tooltip label={darkMode ? "Light mode" : "Dark mode"}>
                <ActionIcon variant="default" size={36} onClick={toggleDarkMode}>
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </ActionIcon>
              </Tooltip>
              
              <UnstyledButton>
                <Group spacing="xs">
                  <Avatar src={user.avatar} radius="xl" size={36} />
                  <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                    <div>
                      <Text size="sm" weight={500}>{user.name}</Text>
                      <Text size="xs" color="dimmed">{user.email}</Text>
                    </div>
                  </MediaQuery>
                </Group>
              </UnstyledButton>
            </Group>
          </div>
        </Header>
      }
    >
      <div className="dashboard-main" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
        <Outlet />
      </div>
    </AppShell>
  );
};

export default MainLayout;
