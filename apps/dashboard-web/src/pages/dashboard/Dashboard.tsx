import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Badge,
  Card,
  RingProgress,
  ThemeIcon,
  SimpleGrid,
  Progress,
  ActionIcon,
  Tooltip,
  Divider,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import {
  IconPlus,
  IconRefresh,
  IconChevronRight,
  IconArrowUpRight,
  IconArrowDownRight,
  IconBrowserCheck,
  IconDeviceAnalytics,
  IconSeo,
  IconAccessible,
  IconPuzzle,
  IconWorldUpload,
  IconCloudUpload,
  IconSettings,
  IconChartBar,
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconLayoutGrid,
} from 'tabler-icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  statCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.sm,
    },
  },
  statTitle: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontWeight: 700,
    fontSize: 16,
  },
  statValue: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1,
  },
  statDescription: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
  },
  projectCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.sm,
    },
  },
  quickActionCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.sm,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },
  progressSection: {
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.xs,
  },
  statsRing: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    boxShadow: theme.shadows.xs,
  },
  progressLabel: {
    fontFamily: theme.fontFamily,
    fontWeight: 700,
    lineHeight: 1,
  },
  stat: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: theme.spacing.xs,
    '&:last-of-type': {
      borderBottom: 0,
    },
  },
  statCount: {
    color: theme.colors.blue[6],
    fontWeight: 700,
  },
}));

// Mock data for the dashboard
const mockStats = [
  { title: 'Active Projects', value: '5', change: 12.4, icon: IconBrowserCheck, color: 'blue' },
  { title: 'Completed Projects', value: '12', change: 8.2, icon: IconCheck, color: 'green' },
  { title: 'Issues Detected', value: '28', change: -5.1, icon: IconAlertTriangle, color: 'orange' },
  { title: 'Modernization Score', value: '86%', change: 4.3, icon: IconChartBar, color: 'indigo' },
];

const mockRecentProjects = [
  {
    id: '1',
    name: 'Corporate Website Redesign',
    url: 'https://corporate-legacy.example.com',
    status: 'in-progress',
    progress: 68,
    lastUpdated: '2 hours ago',
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    url: 'https://shop.example.com',
    status: 'analyzing',
    progress: 24,
    lastUpdated: '4 hours ago',
  },
  {
    id: '3',
    name: 'Blog Migration',
    url: 'https://blog.example.org',
    status: 'completed',
    progress: 100,
    lastUpdated: '1 day ago',
  },
  {
    id: '4',
    name: 'Support Portal',
    url: 'https://help.example.net',
    status: 'paused',
    progress: 45,
    lastUpdated: '3 days ago',
  },
];

const quickActions = [
  { title: 'New Project', icon: IconPlus, color: 'blue', link: '/projects/new' },
  { title: 'Site Analysis', icon: IconDeviceAnalytics, color: 'violet', link: '/projects/demo/visualization' },
  { title: 'SEO Check', icon: IconSeo, color: 'green', link: '#' },
  { title: 'Accessibility', icon: IconAccessible, color: 'orange', link: '#' },
];

const issuesByCategory = [
  { category: 'Performance', count: 12 },
  { category: 'Accessibility', count: 8 },
  { category: 'Best Practices', count: 5 },
  { category: 'SEO', count: 3 },
];

const Dashboard: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  // Status badge helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge color="green">Completed</Badge>;
      case 'in-progress':
        return <Badge color="blue">In Progress</Badge>;
      case 'analyzing':
        return <Badge color="indigo">Analyzing</Badge>;
      case 'paused':
        return <Badge color="orange">Paused</Badge>;
      default:
        return <Badge color="gray">Unknown</Badge>;
    }
  };

  return (
    <Container size="xl" px="xs">
      <Group position="apart" mb="md">
        <div>
          <Title order={2}>Dashboard</Title>
          <Text color="dimmed" size="sm">
            Welcome back! Here's an overview of your website modernization projects
          </Text>
        </div>
        <Button leftIcon={<IconRefresh size={16} />} variant="outline">
          Refresh Data
        </Button>
      </Group>

      {/* Key Statistics */}
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }, { maxWidth: 'md', cols: 2 }]} mb="md">
        {mockStats.map((stat) => (
          <Paper key={stat.title} p="md" radius="md" className={classes.statCard}>
            <Group position="apart">
              <div>
                <Text className={classes.statTitle}>{stat.title}</Text>
                <Text className={classes.statValue} mt={6}>
                  {stat.value}
                </Text>
              </div>
              <ThemeIcon color={stat.color} variant="light" size={48} radius="md">
                <stat.icon size={28} />
              </ThemeIcon>
            </Group>

            <Group position="apart" mt="xs">
              <Text className={classes.statDescription}>Compared to last month</Text>
              <Group spacing={5}>
                {stat.change > 0 ? (
                  <IconArrowUpRight size={16} color={theme.colors.green[6]} />
                ) : (
                  <IconArrowDownRight size={16} color={theme.colors.red[6]} />
                )}
                <Text
                  size="sm"
                  color={stat.change > 0 ? 'green' : 'red'}
                  weight={500}
                >
                  {Math.abs(stat.change)}%
                </Text>
              </Group>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>

      <Grid gutter="md">
        {/* Recent Projects */}
        <Grid.Col span={8}>
          <Paper p="md" radius="md" className={classes.card} withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>Recent Projects</Title>
              <Button
                component={Link}
                to="/projects"
                variant="subtle"
                rightIcon={<IconChevronRight size={16} />}
                size="sm"
              >
                View All
              </Button>
            </Group>

            {mockRecentProjects.map((project) => (
              <Paper key={project.id} className={classes.projectCard} withBorder>
                <div style={{ flex: 1 }}>
                  <Group position="apart">
                    <Text weight={500}>{project.name}</Text>
                    {getStatusBadge(project.status)}
                  </Group>
                  <Text size="xs" color="dimmed" mt={4}>
                    {project.url}
                  </Text>
                  <Group position="apart" mt="xs">
                    <Text size="xs" color="dimmed">
                      <IconClock size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      Updated {project.lastUpdated}
                    </Text>
                    <Text size="xs" weight={500}>
                      {project.progress}% Complete
                    </Text>
                  </Group>
                  <Progress
                    value={project.progress}
                    color={
                      project.status === 'completed'
                        ? 'green'
                        : project.status === 'paused'
                        ? 'orange'
                        : 'blue'
                    }
                    size="sm"
                    mt={6}
                  />
                </div>
                <Tooltip label="View Project">
                  <ActionIcon component={Link} to={`/projects/${project.id}`} variant="light" size="lg">
                    <IconChevronRight size={18} />
                  </ActionIcon>
                </Tooltip>
              </Paper>
            ))}

            <Button
              component={Link}
              to="/projects/new"
              leftIcon={<IconPlus size={16} />}
              fullWidth
              variant="light"
              mt="md"
            >
              Add New Project
            </Button>
          </Paper>
        </Grid.Col>

        {/* Quick Actions and Stats */}
        <Grid.Col span={4}>
          <Paper p="md" radius="md" className={classes.card} withBorder mb="md">
            <Title order={3} mb="md">
              Quick Actions
            </Title>
            <SimpleGrid cols={2}>
              {quickActions.map((action) => (
                <Paper
                  key={action.title}
                  component={Link}
                  to={action.link}
                  className={classes.quickActionCard}
                  withBorder
                >
                  <ThemeIcon size="xl" radius="md" color={action.color} mb="sm">
                    <action.icon size={20} />
                  </ThemeIcon>
                  <Text size="sm" align="center" weight={500}>
                    {action.title}
                  </Text>
                </Paper>
              ))}
            </SimpleGrid>
          </Paper>

          <Paper p="md" radius="md" className={classes.card} withBorder mb="md">
            <Title order={3} mb="md">
              Issues by Category
            </Title>
            {issuesByCategory.map((item) => (
              <div key={item.category} className={classes.stat}>
                <Group position="apart">
                  <Text size="sm">{item.category}</Text>
                  <Text className={classes.statCount}>{item.count}</Text>
                </Group>
              </div>
            ))}
            <Button
              component={Link}
              to="/projects/demo/issues"
              variant="subtle"
              rightIcon={<IconChevronRight size={16} />}
              fullWidth
              mt="sm"
            >
              View All Issues
            </Button>
          </Paper>

          <Paper p="md" radius="md" className={classes.statsRing} withBorder>
            <div>
              <Text size="xs" color="dimmed">
                Overall Modernization Progress
              </Text>
              <Text weight={700} size="xl" mt="sm">
                68%
              </Text>
              <Group mt="md">
                <div>
                  <Text size="xs" color="dimmed">
                    Performance
                  </Text>
                  <Text weight={700} size="sm">
                    82%
                  </Text>
                </div>
                <div>
                  <Text size="xs" color="dimmed">
                    Accessibility
                  </Text>
                  <Text weight={700} size="sm">
                    74%
                  </Text>
                </div>
              </Group>
            </div>
            <RingProgress
              size={120}
              roundCaps
              thickness={8}
              sections={[
                { value: 68, color: theme.colors.blue[6] },
                { value: 32, color: theme.colors.gray[3] },
              ]}
              label={
                <div style={{ textAlign: 'center' }}>
                  <IconLayoutGrid size={20} color={theme.colors.blue[6]} />
                </div>
              }
            />
          </Paper>
        </Grid.Col>
      </Grid>

      <Grid gutter="md" mt="md">
        <Grid.Col span={12}>
          <Paper p="md" radius="md" className={classes.card} withBorder>
            <Group position="apart" mb="md">
              <Title order={3}>Deployment Status</Title>
              <Badge color="green">All Systems Operational</Badge>
            </Group>
            <Divider mb="md" />
            <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
              <div className={classes.progressSection}>
                <Group position="apart" mb="xs">
                  <Text size="sm" weight={500}>
                    Staging Environment
                  </Text>
                  <Text size="xs" color="dimmed">
                    Last updated: 15 min ago
                  </Text>
                </Group>
                <Group position="apart" mb={5}>
                  <Text size="sm" color="dimmed">
                    <IconCloudUpload size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    5 deployments today
                  </Text>
                  <Badge size="sm" color="green">
                    Active
                  </Badge>
                </Group>
              </div>

              <div className={classes.progressSection}>
                <Group position="apart" mb="xs">
                  <Text size="sm" weight={500}>
                    Production Environment
                  </Text>
                  <Text size="xs" color="dimmed">
                    Last updated: 2 hours ago
                  </Text>
                </Group>
                <Group position="apart" mb={5}>
                  <Text size="sm" color="dimmed">
                    <IconWorldUpload size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    2 deployments today
                  </Text>
                  <Badge size="sm" color="green">
                    Active
                  </Badge>
                </Group>
              </div>

              <div className={classes.progressSection}>
                <Group position="apart" mb="xs">
                  <Text size="sm" weight={500}>
                    Integration Status
                  </Text>
                  <Text size="xs" color="dimmed">
                    Last updated: 30 min ago
                  </Text>
                </Group>
                <Group position="apart" mb={5}>
                  <Text size="sm" color="dimmed">
                    <IconPuzzle size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                    All integrations connected
                  </Text>
                  <Badge size="sm" color="green">
                    Healthy
                  </Badge>
                </Group>
              </div>
            </SimpleGrid>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Dashboard;
