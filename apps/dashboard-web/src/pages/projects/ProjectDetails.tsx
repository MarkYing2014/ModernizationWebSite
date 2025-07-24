import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Badge,
  Button,
  Progress,
  Grid,
  Paper,
  ThemeIcon,
  Tabs,
  List,
  Tooltip,
  ActionIcon,
  Menu,
  Divider,
  Avatar,
  Anchor,
  Collapse,
  SimpleGrid,
  Breadcrumbs,
  Timeline,
  createStyles,
} from '@mantine/core';
import {
  ArrowBack,
  DotsVertical,
  Edit,
  Trash,
  ExternalLink,
  Refresh,
  Calendar,
  ChartBar,
  AlertTriangle,
  DeviceLaptop,
  DeviceTablet,
  DeviceMobile,
  BrandChrome,
  BrandFirefox,
  BrandSafari,
  BrandEdge,
  Check,
  X,
  Clock,
  Graph,
  Eye,
  Palette,
  ListCheck,
  Bug,
  History,
  Settings,
  PlayerPause,
  PlayerPlay,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  InfoCircle,
  World,
  Server,
  Code,
  Seo,
  Accessible,
  BrandGoogle,
  Rocket,
  FileAnalytics,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  statCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  section: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  timelineItem: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  tabsList: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  tabActive: {
    fontWeight: 600,
  },
  badge: {
    textTransform: 'capitalize',
  },
}));

// Mock data for a single project
const mockProject = {
  id: '1',
  name: 'Corporate Website Redesign',
  url: 'https://corporate-legacy.example.com',
  description: 'Modernization of the corporate website with improved accessibility and mobile responsiveness. The project aims to enhance user experience, improve conversion rates, and ensure compliance with WCAG 2.1 guidelines.',
  status: 'in-progress',
  progress: 68,
  lastUpdated: '2023-08-15T14:30:00Z',
  createdAt: '2023-07-20T09:15:00Z',
  thumbnail: null,
  issues: {
    critical: 3,
    warning: 12,
    info: 8,
  },
  owner: {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: null,
  },
  team: [
    { name: 'Sarah Williams', role: 'Designer', avatar: null },
    { name: 'Michael Brown', role: 'Developer', avatar: null },
    { name: 'Emily Davis', role: 'QA Engineer', avatar: null },
  ],
  stats: {
    pages: 42,
    resources: 156,
    internalLinks: 218,
    externalLinks: 34,
    averageLoadTime: '2.8s',
    mobileScore: 68,
    desktopScore: 82,
    seoScore: 76,
    accessibilityScore: 64,
    bestPracticesScore: 79,
  },
  browserSupport: {
    chrome: true,
    firefox: true,
    safari: true,
    edge: true,
    ie11: false,
  },
  deviceSupport: {
    desktop: true,
    tablet: true,
    mobile: false,
  },
  timeline: [
    {
      id: '1',
      title: 'Project created',
      description: 'Initial project setup and configuration',
      date: '2023-07-20T09:15:00Z',
      user: 'Alex Johnson',
    },
    {
      id: '2',
      title: 'Crawling started',
      description: 'Website crawling initiated to analyze structure',
      date: '2023-07-20T09:20:00Z',
      user: 'System',
    },
    {
      id: '3',
      title: 'Crawling completed',
      description: 'Website structure analysis finished',
      date: '2023-07-20T10:45:00Z',
      user: 'System',
    },
    {
      id: '4',
      title: 'Issues detected',
      description: '23 issues found during analysis',
      date: '2023-07-20T11:00:00Z',
      user: 'System',
    },
    {
      id: '5',
      title: 'Design generation started',
      description: 'AI-driven design alternatives generation initiated',
      date: '2023-07-21T14:30:00Z',
      user: 'Sarah Williams',
    },
    {
      id: '6',
      title: 'Design options ready',
      description: '5 design alternatives generated',
      date: '2023-07-22T09:15:00Z',
      user: 'System',
    },
    {
      id: '7',
      title: 'Design selected',
      description: 'Option 3 selected as the final design',
      date: '2023-07-25T13:45:00Z',
      user: 'Alex Johnson',
    },
    {
      id: '8',
      title: 'Implementation started',
      description: 'Development work initiated',
      date: '2023-07-26T09:00:00Z',
      user: 'Michael Brown',
    },
    {
      id: '9',
      title: 'Progress update',
      description: 'Implementation 68% complete',
      date: '2023-08-15T14:30:00Z',
      user: 'System',
    },
  ],
  nextSteps: [
    'Complete responsive design implementation',
    'Fix critical accessibility issues',
    'Optimize image loading performance',
    'Implement SEO improvements',
    'Conduct user acceptance testing',
  ],
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Helper function to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'green';
    case 'in-progress':
      return 'blue';
    case 'analyzing':
      return 'indigo';
    case 'paused':
      return 'orange';
    case 'planning':
      return 'violet';
    default:
      return 'gray';
  }
};

// Helper function to get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <Check size={16} />;
    case 'in-progress':
      return <Clock size={16} />;
    case 'analyzing':
      return <FileAnalytics size={16} />;
    case 'paused':
      return <PlayerPause size={16} />;
    case 'planning':
      return <InfoCircle size={16} />;
    default:
      return null;
  }
};

const ProjectDetails: React.FC = () => {
  const { classes } = useStyles();
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string | null>('overview');
  const [showTeam, setShowTeam] = useState(false);
  
  // In a real app, we would fetch the project data based on projectId
  // For now, we'll just use the mock data
  const project = mockProject;

  // Calculate the score color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'green';
    if (score >= 70) return 'blue';
    if (score >= 50) return 'yellow';
    return 'red';
  };

  // Toggle project status (in a real app, this would call an API)
  const toggleProjectStatus = () => {
    alert(`Project status would be changed from ${project.status} to ${project.status === 'paused' ? 'in-progress' : 'paused'}`);
  };

  return (
    <Container size="xl" px="xs">
      {/* Breadcrumbs */}
      <Breadcrumbs mb="md" separator="→">
        <Anchor component={Link} to="/projects" size="sm">
          Projects
        </Anchor>
        <Text size="sm">{project.name}</Text>
      </Breadcrumbs>

      {/* Project Header */}
      <Paper withBorder className={classes.header}>
        <Grid>
          <Grid.Col span={12} md={8}>
            <Group>
              <Button
                variant="subtle"
                leftIcon={<ArrowBack size={16} />}
                onClick={() => navigate('/projects')}
                compact
              >
                Back
              </Button>
              <div>
                <Group>
                  <Title order={2}>{project.name}</Title>
                  <Badge
                    color={getStatusColor(project.status)}
                    variant="light"
                    leftSection={getStatusIcon(project.status)}
                    className={classes.badge}
                    size="lg"
                  >
                    {project.status.replace('-', ' ')}
                  </Badge>
                </Group>
                <Text color="dimmed" size="sm">
                  <ExternalLink size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                  {project.url}
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Group position="right" spacing="xs">
              <Button
                variant="outline"
                leftIcon={project.status === 'paused' ? <PlayerPlay size={16} /> : <PlayerPause size={16} />}
                onClick={toggleProjectStatus}
              >
                {project.status === 'paused' ? 'Resume' : 'Pause'}
              </Button>
              <Button
                component={Link}
                to={`/projects/${projectId}/crawl`}
                leftIcon={<Refresh size={16} />}
                variant="outline"
              >
                Recrawl
              </Button>
              <Menu position="bottom-end" shadow="md">
                <Menu.Target>
                  <ActionIcon size="lg" variant="light">
                    <DotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<Edit size={14} />}>Edit Project</Menu.Item>
                  <Menu.Item icon={<Settings size={14} />}>Project Settings</Menu.Item>
                  <Menu.Item icon={<ExternalLink size={14} />}>Open Website</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item color="red" icon={<Trash size={14} />}>
                    Delete Project
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Progress Bar */}
      <Paper withBorder p="md" mb="md">
        <Group position="apart" mb="xs">
          <Text size="sm" weight={500}>
            Overall Progress
          </Text>
          <Text size="sm" weight={600}>
            {project.progress}%
          </Text>
        </Group>
        <Progress
          value={project.progress}
          color={getStatusColor(project.status)}
          size="xl"
          radius="sm"
        />
        <Group position="apart" mt="xs">
          <Text size="xs" color="dimmed">
            <Calendar size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />
            Started on {formatDate(project.createdAt)}
          </Text>
          <Text size="xs" color="dimmed">
            <Refresh size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />
            Last updated {formatDate(project.lastUpdated)}
          </Text>
        </Group>
      </Paper>

      {/* Quick Action Cards */}
      <SimpleGrid cols={4} spacing="md" breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'xs', cols: 1 }
      ]}>
        <Card component={Link} to={`/projects/${projectId}/visualization`} p="md" radius="md" withBorder style={{ textDecoration: 'none', color: 'inherit' }}>
          <Group position="apart">
            <ThemeIcon size="xl" radius="md" color="blue">
              <Graph size={24} />
            </ThemeIcon>
            <Badge>View</Badge>
          </Group>
          <Text weight={500} size="lg" mt="md">
            Site Structure
          </Text>
          <Text size="sm" color="dimmed" mt={5}>
            Interactive visualization of site pages and resources
          </Text>
        </Card>

        <Card component={Link} to={`/projects/${projectId}/issues`} p="md" radius="md" withBorder style={{ textDecoration: 'none', color: 'inherit' }}>
          <Group position="apart">
            <ThemeIcon size="xl" radius="md" color="orange">
              <Bug size={24} />
            </ThemeIcon>
            <Badge color="orange">{project.issues.critical + project.issues.warning}</Badge>
          </Group>
          <Text weight={500} size="lg" mt="md">
            Issues
          </Text>
          <Text size="sm" color="dimmed" mt={5}>
            Problems detected during site analysis
          </Text>
        </Card>

        <Card component={Link} to={`/projects/${projectId}/designs`} p="md" radius="md" withBorder style={{ textDecoration: 'none', color: 'inherit' }}>
          <Group position="apart">
            <ThemeIcon size="xl" radius="md" color="violet">
              <Palette size={24} />
            </ThemeIcon>
            <Badge>5</Badge>
          </Group>
          <Text weight={500} size="lg" mt="md">
            Design Options
          </Text>
          <Text size="sm" color="dimmed" mt={5}>
            AI-generated design alternatives
          </Text>
        </Card>

        <Card component={Link} to={`/projects/${projectId}/crawl`} p="md" radius="md" withBorder style={{ textDecoration: 'none', color: 'inherit' }}>
          <Group position="apart">
            <ThemeIcon size="xl" radius="md" color="green">
              <Rocket size={24} />
            </ThemeIcon>
            <Badge color="green">Deploy</Badge>
          </Group>
          <Text weight={500} size="lg" mt="md">
            Deployment
          </Text>
          <Text size="sm" color="dimmed" mt={5}>
            Deploy modernized version of the site
          </Text>
        </Card>
      </SimpleGrid>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onTabChange={setActiveTab} mt="xl">
        <Tabs.List className={classes.tabsList}>
          <Tabs.Tab value="overview" icon={<Eye size={14} />}>
            Overview
          </Tabs.Tab>
          <Tabs.Tab value="stats" icon={<ChartBar size={14} />}>
            Statistics
          </Tabs.Tab>
          <Tabs.Tab 
            value="issues" 
            icon={<AlertTriangle size={14} />}
            rightSection={
              <Badge size="xs" variant="filled" color="red" sx={{ width: 16, height: 16, padding: 0 }}>
                {project.issues.critical}
              </Badge>
            }
          >
            Issues
          </Tabs.Tab>
          <Tabs.Tab value="timeline" icon={<History size={14} />}>
            Timeline
          </Tabs.Tab>
        </Tabs.List>

        {/* Overview Tab */}
        <Tabs.Panel value="overview" pt="md">
          <Grid>
            <Grid.Col md={8}>
              <Paper withBorder p="md" className={classes.section}>
                <Title order={3} mb="md">Project Description</Title>
                <Text>{project.description}</Text>

                <Title order={3} mt="xl" mb="md">Next Steps</Title>
                <List spacing="xs">
                  {project.nextSteps.map((step, index) => (
                    <List.Item key={index} icon={
                      <ThemeIcon color="blue" size={24} radius="xl">
                        <ListCheck size={16} />
                      </ThemeIcon>
                    }>
                      {step}
                    </List.Item>
                  ))}
                </List>

                <Title order={3} mt="xl" mb="md">Browser & Device Support</Title>
                <SimpleGrid cols={2} spacing="md">
                  <div>
                    <Text weight={500} mb="xs">Browsers</Text>
                    <Group spacing="md">
                      <Tooltip label={project.browserSupport.chrome ? 'Supported' : 'Not Supported'}>
                        <ThemeIcon 
                          color={project.browserSupport.chrome ? 'green' : 'gray'} 
                          variant={project.browserSupport.chrome ? 'filled' : 'light'}
                          size="lg"
                          radius="xl"
                        >
                          <BrandChrome size={20} />
                        </ThemeIcon>
                      </Tooltip>
                      <Tooltip label={project.browserSupport.firefox ? 'Supported' : 'Not Supported'}>
                        <ThemeIcon 
                          color={project.browserSupport.firefox ? 'green' : 'gray'} 
                          variant={project.browserSupport.firefox ? 'filled' : 'light'}
                          size="lg"
                          radius="xl"
                        >
                          <BrandFirefox size={20} />
                        </ThemeIcon>
                      </Tooltip>
                      <Tooltip label={project.browserSupport.safari ? 'Supported' : 'Not Supported'}>
                        <ThemeIcon 
                          color={project.browserSupport.safari ? 'green' : 'gray'} 
                          variant={project.browserSupport.safari ? 'filled' : 'light'}
                          size="lg"
                          radius="xl"
                        >
                          <BrandSafari size={20} />
                        </ThemeIcon>
                      </Tooltip>
                      <Tooltip label={project.browserSupport.edge ? 'Supported' : 'Not Supported'}>
                        <ThemeIcon 
                          color={project.browserSupport.edge ? 'green' : 'gray'} 
                          variant={project.browserSupport.edge ? 'filled' : 'light'}
                          size="lg"
                          radius="xl"
                        >
                          <BrandEdge size={20} />
                        </ThemeIcon>
                      </Tooltip>
                    </Group>
                  </div>
                  <div>
                    <Text weight={500} mb="xs">Devices</Text>
                    <Group spacing="md">
                      <Tooltip label={project.deviceSupport.desktop ? 'Supported' : 'Not Supported'}>
                        <ThemeIcon 
                          color={project.deviceSupport.desktop ? 'green' : 'gray'} 
                          variant={project.deviceSupport.desktop ? 'filled' : 'light'}
                          size="lg"
                          radius="xl"
                        >
                          <DeviceLaptop size={20} />
                        </ThemeIcon>
                      </Tooltip>
                      <Tooltip label={project.deviceSupport.tablet ? 'Supported' : 'Not Supported'}>
                        <ThemeIcon 
                          color={project.deviceSupport.tablet ? 'green' : 'gray'} 
                          variant={project.deviceSupport.tablet ? 'filled' : 'light'}
                          size="lg"
                          radius="xl"
                        >
                          <DeviceTablet size={20} />
                        </ThemeIcon>
                      </Tooltip>
                      <Tooltip label={project.deviceSupport.mobile ? 'Supported' : 'Not Supported'}>
                        <ThemeIcon 
                          color={project.deviceSupport.mobile ? 'green' : 'gray'} 
                          variant={project.deviceSupport.mobile ? 'filled' : 'light'}
                          size="lg"
                          radius="xl"
                        >
                          <DeviceMobile size={20} />
                        </ThemeIcon>
                      </Tooltip>
                    </Group>
                  </div>
                </SimpleGrid>
              </Paper>
            </Grid.Col>

            <Grid.Col md={4}>
              <Paper withBorder p="md" className={classes.section}>
                <Group position="apart" mb="md">
                  <Title order={3}>Team</Title>
                  <Button 
                    variant="subtle" 
                    compact 
                    rightIcon={showTeam ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    onClick={() => setShowTeam(!showTeam)}
                  >
                    {showTeam ? 'Hide' : 'Show'}
                  </Button>
                </Group>

                <Group mb="md">
                  <Avatar size="md" radius="xl" src={project.owner.avatar}>
                    {project.owner.name.charAt(0)}
                  </Avatar>
                  <div>
                    <Text size="sm" weight={500}>
                      {project.owner.name}
                    </Text>
                    <Text size="xs" color="dimmed">
                      Project Owner
                    </Text>
                  </div>
                </Group>

                <Collapse in={showTeam}>
                  <Divider my="sm" />
                  {project.team.map((member, index) => (
                    <Group key={index} mb="sm">
                      <Avatar size="md" radius="xl" src={member.avatar}>
                        {member.name.charAt(0)}
                      </Avatar>
                      <div>
                        <Text size="sm" weight={500}>
                          {member.name}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {member.role}
                        </Text>
                      </div>
                    </Group>
                  ))}
                </Collapse>
              </Paper>

              <Paper withBorder p="md" mt="md" className={classes.section}>
                <Title order={3} mb="md">Issues Summary</Title>
                <Group grow mb="md">
                  <Card p="xs" withBorder>
                    <Text align="center" size="xs" color="dimmed">Critical</Text>
                    <Text align="center" weight={700} size="xl" color="red">
                      {project.issues.critical}
                    </Text>
                  </Card>
                  <Card p="xs" withBorder>
                    <Text align="center" size="xs" color="dimmed">Warning</Text>
                    <Text align="center" weight={700} size="xl" color="orange">
                      {project.issues.warning}
                    </Text>
                  </Card>
                  <Card p="xs" withBorder>
                    <Text align="center" size="xs" color="dimmed">Info</Text>
                    <Text align="center" weight={700} size="xl" color="blue">
                      {project.issues.info}
                    </Text>
                  </Card>
                </Group>
                <Button 
                  component={Link} 
                  to={`/projects/${projectId}/issues`} 
                  variant="light" 
                  fullWidth
                  rightIcon={<ChevronRight size={16} />}
                >
                  View All Issues
                </Button>
              </Paper>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* Statistics Tab */}
        <Tabs.Panel value="stats" pt="md">
          <SimpleGrid cols={4} spacing="md" breakpoints={[
            { maxWidth: 'md', cols: 2 },
            { maxWidth: 'xs', cols: 1 }
          ]}>
            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  Pages
                </Text>
                <ThemeIcon color="blue" variant="light" size="sm" radius="sm">
                  <World size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.pages}
              </Text>
              <Text size="xs" color="dimmed" mt={5}>
                Total pages crawled
              </Text>
            </Paper>

            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  Resources
                </Text>
                <ThemeIcon color="grape" variant="light" size="sm" radius="sm">
                  <Server size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.resources}
              </Text>
              <Text size="xs" color="dimmed" mt={5}>
                Total resources (CSS, JS, images)
              </Text>
            </Paper>

            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  Internal Links
                </Text>
                <ThemeIcon color="green" variant="light" size="sm" radius="sm">
                  <Link size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.internalLinks}
              </Text>
              <Text size="xs" color="dimmed" mt={5}>
                Links within the site
              </Text>
            </Paper>

            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  External Links
                </Text>
                <ThemeIcon color="orange" variant="light" size="sm" radius="sm">
                  <ExternalLink size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.externalLinks}
              </Text>
              <Text size="xs" color="dimmed" mt={5}>
                Links to external sites
              </Text>
            </Paper>

            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  Load Time
                </Text>
                <ThemeIcon color="red" variant="light" size="sm" radius="sm">
                  <Clock size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.averageLoadTime}
              </Text>
              <Text size="xs" color="dimmed" mt={5}>
                Average page load time
              </Text>
            </Paper>

            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  Mobile Score
                </Text>
                <ThemeIcon color={getScoreColor(project.stats.mobileScore)} variant="light" size="sm" radius="sm">
                  <DeviceMobile size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.mobileScore}/100
              </Text>
              <Progress value={project.stats.mobileScore} color={getScoreColor(project.stats.mobileScore)} size="xs" mt={5} />
            </Paper>

            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  Desktop Score
                </Text>
                <ThemeIcon color={getScoreColor(project.stats.desktopScore)} variant="light" size="sm" radius="sm">
                  <DeviceLaptop size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.desktopScore}/100
              </Text>
              <Progress value={project.stats.desktopScore} color={getScoreColor(project.stats.desktopScore)} size="xs" mt={5} />
            </Paper>

            <Paper withBorder p="md">
              <Group position="apart">
                <Text size="xs" color="dimmed" weight={500}>
                  SEO Score
                </Text>
                <ThemeIcon color={getScoreColor(project.stats.seoScore)} variant="light" size="sm" radius="sm">
                  <BrandGoogle size={14} />
                </ThemeIcon>
              </Group>
              <Text size="xl" weight={700} mt="md">
                {project.stats.seoScore}/100
              </Text>
              <Progress value={project.stats.seoScore} color={getScoreColor(project.stats.seoScore)} size="xs" mt={5} />
            </Paper>
          </SimpleGrid>

          <Grid mt="md">
            <Grid.Col md={6}>
              <Paper withBorder p="md">
                <Title order={3} mb="md">Performance Metrics</Title>
                <SimpleGrid cols={2}>
                  <div>
                    <Text weight={500} size="sm">Accessibility Score</Text>
                    <Group spacing="xs" align="center">
                      <Text size="xl" weight={700}>{project.stats.accessibilityScore}</Text>
                      <Text size="xs" color="dimmed">/100</Text>
                      <ThemeIcon color={getScoreColor(project.stats.accessibilityScore)} variant="light" size="sm" radius="sm" ml="auto">
                        <Accessible size={14} />
                      </ThemeIcon>
                    </Group>
                    <Progress value={project.stats.accessibilityScore} color={getScoreColor(project.stats.accessibilityScore)} size="xs" mt={5} />
                  </div>
                  <div>
                    <Text weight={500} size="sm">Best Practices Score</Text>
                    <Group spacing="xs" align="center">
                      <Text size="xl" weight={700}>{project.stats.bestPracticesScore}</Text>
                      <Text size="xs" color="dimmed">/100</Text>
                      <ThemeIcon color={getScoreColor(project.stats.bestPracticesScore)} variant="light" size="sm" radius="sm" ml="auto">
                        <Code size={14} />
                      </ThemeIcon>
                    </Group>
                    <Progress value={project.stats.bestPracticesScore} color={getScoreColor(project.stats.bestPracticesScore)} size="xs" mt={5} />
                  </div>
                </SimpleGrid>
              </Paper>
            </Grid.Col>

            <Grid.Col md={6}>
              <Paper withBorder p="md">
                <Title order={3} mb="md">SEO Analysis</Title>
                <SimpleGrid cols={2}>
                  <div>
                    <Text weight={500} size="sm">Meta Tags</Text>
                    <Group spacing="xs" align="center">
                      <Text size="xl" weight={700}>82</Text>
                      <Text size="xs" color="dimmed">/100</Text>
                      <ThemeIcon color="blue" variant="light" size="sm" radius="sm" ml="auto">
                        <Seo size={14} />
                      </ThemeIcon>
                    </Group>
                    <Progress value={82} color="blue" size="xs" mt={5} />
                  </div>
                  <div>
                    <Text weight={500} size="sm">Content Quality</Text>
                    <Group spacing="xs" align="center">
                      <Text size="xl" weight={700}>68</Text>
                      <Text size="xs" color="dimmed">/100</Text>
                      <ThemeIcon color="yellow" variant="light" size="sm" radius="sm" ml="auto">
                        <FileAnalytics size={14} />
                      </ThemeIcon>
                    </Group>
                    <Progress value={68} color="yellow" size="xs" mt={5} />
                  </div>
                </SimpleGrid>
              </Paper>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>

        {/* Issues Tab */}
        <Tabs.Panel value="issues" pt="md">
          <Paper withBorder p="md" mb="md">
            <Group position="apart">
              <Title order={3}>Critical Issues</Title>
              <Badge color="red" size="lg">{project.issues.critical}</Badge>
            </Group>
            <Text color="dimmed" size="sm" mb="md">
              These issues require immediate attention
            </Text>
            <List spacing="md" icon={
              <ThemeIcon color="red" size={24} radius="xl">
                <X size={16} />
              </ThemeIcon>
            }>
              <List.Item>
                <Text weight={500}>Missing viewport meta tag</Text>
                <Text size="sm" color="dimmed">
                  The site is not mobile-friendly due to missing viewport configuration
                </Text>
              </List.Item>
              <List.Item>
                <Text weight={500}>Contrast issues on main navigation</Text>
                <Text size="sm" color="dimmed">
                  Text color doesn't have sufficient contrast with background
                </Text>
              </List.Item>
              <List.Item>
                <Text weight={500}>Render-blocking JavaScript</Text>
                <Text size="sm" color="dimmed">
                  Scripts are blocking the initial render of the page
                </Text>
              </List.Item>
            </List>

            <Button 
              component={Link} 
              to={`/projects/${projectId}/issues`} 
              variant="light" 
              mt="md"
              rightIcon={<ChevronRight size={16} />}
            >
              View All Issues
            </Button>
          </Paper>
        </Tabs.Panel>

        {/* Timeline Tab */}
        <Tabs.Panel value="timeline" pt="md">
          <Paper withBorder p="md">
            <Title order={3} mb="md">Project Timeline</Title>
            <Timeline active={project.timeline.length - 1} bulletSize={24} lineWidth={2}>
              {project.timeline.map((event, index) => (
                <Timeline.Item 
                  key={event.id} 
                  title={event.title}
                  className={classes.timelineItem}
                >
                  <Text color="dimmed" size="sm">{event.description}</Text>
                  <Text size="xs" mt={4}>
                    {formatDate(event.date)} by {event.user}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Paper>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ProjectDetails;
