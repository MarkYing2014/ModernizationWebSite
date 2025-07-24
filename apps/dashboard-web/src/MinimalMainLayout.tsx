import { AppShell, Navbar, Header, Text, Group, UnstyledButton, Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const MinimalMainLayout = () => {
  console.log('MinimalMainLayout component is rendering!');
  
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} p="xs">
          <Navbar.Section grow>
            <Box p="md">
              <Text size="lg" weight={500} mb="md">
                Navigation
              </Text>
              <UnstyledButton
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.colors.dark[0],
                  '&:hover': {
                    backgroundColor: theme.colors.dark[6],
                  },
                })}
              >
                <Text size="sm">Dashboard</Text>
              </UnstyledButton>
              <UnstyledButton
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.colors.dark[0],
                  '&:hover': {
                    backgroundColor: theme.colors.dark[6],
                  },
                })}
              >
                <Text size="sm">Projects</Text>
              </UnstyledButton>
              <UnstyledButton
                sx={(theme) => ({
                  display: 'block',
                  width: '100%',
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color: theme.colors.dark[0],
                  '&:hover': {
                    backgroundColor: theme.colors.dark[6],
                  },
                })}
              >
                <Text size="sm">Settings</Text>
              </UnstyledButton>
            </Box>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="md">
          <Group position="apart">
            <Text size="xl" weight={700}>
              Website Modernization Dashboard
            </Text>
            <Text size="sm" color="dimmed">
              Minimal Layout
            </Text>
          </Group>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default MinimalMainLayout;
