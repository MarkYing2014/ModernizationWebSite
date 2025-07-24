import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Button,
  Group,
  createStyles,
  Center,
  Stack,
  ThemeIcon,
} from '@mantine/core';
import { IconHome, IconSearch, IconMapPin2Off } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },
  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },
  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
  notFoundIcon: {
    color: theme.colors.blue[6],
    fontSize: 120,
    opacity: 0.8,
  },
  errorCode: {
    fontSize: 120,
    fontWeight: 900,
    lineHeight: 1,
    color: theme.colors.blue[6],
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    
    [theme.fn.smallerThan('sm')]: {
      fontSize: 80,
    },
  },
}));

const NotFound: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Center>
        <Stack align="center" spacing="xs">
          <ThemeIcon size={140} radius={100} variant="light" color="blue">
            <IconMapPin2Off size={80} />
          </ThemeIcon>
          
          <div className={classes.errorCode}>404</div>
          
          <Title className={classes.title} align="center">
            Page not found
          </Title>
          
          <Text color="dimmed" size="lg" align="center" mb={30}>
            The page you are looking for doesn't exist or has been moved to another URL.
            Please check the URL or navigate back to the dashboard.
          </Text>
          
          <Group position="center">
            <Button component={Link} to="/" size="md" leftIcon={<IconHome size={18} />}>
              Back to Dashboard
            </Button>
            
            <Button 
              component={Link} 
              to="/projects" 
              size="md" 
              variant="outline" 
              leftIcon={<IconSearch size={18} />}
            >
              Browse Projects
            </Button>
          </Group>
        </Stack>
      </Center>
    </Container>
  );
};

export default NotFound;
