import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Title, 
  Text, 
  Box, 
  Group, 
  useMantineTheme, 
  Center,
  createStyles
} from '@mantine/core';

// Create styles for the auth layout
const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'linear-gradient(250deg, rgba(130, 201, 255, 0.05) 0%, rgba(139, 92, 246, 0.1) 100%)',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    maxWidth: 480,
    width: '100%',
    padding: theme.spacing.xl,
  },
  paper: {
    padding: theme.spacing.xl * 1.5,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    boxShadow: theme.shadows.lg,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontFamily: `${theme.fontFamily}`,
    fontWeight: 700,
  },
  footer: {
    marginTop: theme.spacing.xl * 1.5,
    textAlign: 'center',
    color: theme.colors.gray[6],
  },
}));

const AuthLayout: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <Paper className={classes.paper} radius="md" withBorder>
          <Center mb="xl">
            <div className={classes.logo}>
              <Text fw={700} size="xl" color="white">M</Text>
            </div>
          </Center>
          
          <Title order={2} className={classes.title} align="center" mb="md">
            ModernizationWebSite
          </Title>
          
          <Text color="dimmed" size="sm" align="center" mb="xl">
            Transform legacy websites into modern, accessible experiences
          </Text>

          {/* Render the specific auth page content (Login, Signup, etc.) */}
          <Box>
            <Outlet />
          </Box>

          <Text size="xs" className={classes.footer}>
            &copy; {new Date().getFullYear()} ModernizationWebSite. All rights reserved.
          </Text>
        </Paper>
      </Container>
    </div>
  );
};

export default AuthLayout;
