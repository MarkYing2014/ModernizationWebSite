import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Paper,
  Progress,
  Badge,
  Grid,
  Accordion,
  ScrollArea,
  Code,
  Stack,
  Divider,
  RingProgress,
  ThemeIcon,
  SimpleGrid,
  Card,
  Timeline,
  Tooltip,
  ActionIcon,
  Breadcrumbs,
  Anchor,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import {
  ArrowBack,
  PlayerPause,
  PlayerPlay,
  X,
  Refresh,
  Download,
  WorldUpload,
  FileAnalytics,
  DeviceLaptop,
  DeviceMobile,
  BrandChrome,
  BrandFirefox,
  BrandSafari,
  BrandEdge,
  Check,
  AlertTriangle,
  InfoCircle,
  Terminal,
  Clock,
  FileText,
  Photo,
  BrandCss3,
  BrandJavascript,
  ExternalLink,
  ChevronRight,
  Eye,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  progressSection: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
  },
  logEntry: {
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.sm,
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  infoLog: {
    borderLeft: `3px solid ${theme.colors.blue[6]}`,
  },
  warningLog: {
    borderLeft: `3px solid ${theme.colors.orange[6]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.orange[9], 0.1) : theme.fn.rgba(theme.colors.orange[0], 0.5),
  },
  errorLog: {
    borderLeft: `3px solid ${theme.colors.red[6]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[9], 0.1) : theme.fn.rgba(theme.colors.red[0], 0.5),
  },
  successLog: {
    borderLeft: `3px solid ${theme.colors.green[6]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.green[9], 0.1) : theme.fn.rgba(theme.colors.green[0], 0.5),
  },
  statCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.xs,
    height: '100%',
  },
  timelineItem: {
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  resourceTypeIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: '50%',
  },
}));

// Mock data for crawl progress
const mockCrawlData = {
  projectId: 'demo',
  projectName: 'Corporate Website Redesign',
  url: 'https://corporate-legacy.example.com',
  status: 'in-progress', // 'pending', 'in-progress', 'paused', 'completed', 'failed'
  progress: 68,
  startTime: '2023-08-15T10:30:00Z',
  estimatedTimeRemaining: '00:45:32',
  crawledPages: 42,
  totalPages: 62,
  crawledResources: 156,
  totalResources: 230,
  crawlSpeed: '3.2 pages/sec',
  resourceTypes: {
    html: 42,
    css: 8,
    js: 24,
    images: 112,
    other: 12,
  },
  resourceSizes: {
    total: '24.6 MB',
    average: '162 KB',
    largest: '2.4 MB',
    smallest: '0.5 KB',
  },
  issues: {
    critical: 3,
    warning: 12,
    info: 8,
  },
};

// Mock log entries
const mockLogs = [
  { id: 1, type: 'info', timestamp: '10:30:00', message: 'Crawl started for https://corporate-legacy.example.com' },
  { id: 2, type: 'info', timestamp: '10:30:05', message: 'Fetching robots.txt' },
  { id: 3, type: 'info', timestamp: '10:30:06', message: 'robots.txt processed successfully' },
  { id: 4, type: 'info', timestamp: '10:30:10', message: 'Crawling homepage' },
  { id: 5, type: 'success', timestamp: '10:30:12', message: 'Homepage processed successfully (200 OK)' },
  { id: 6, type: 'info', timestamp: '10:30:15', message: 'Discovered 15 links on homepage' },
  { id: 7, type: 'info', timestamp: '10:30:20', message: 'Crawling /about' },
  { id: 8, type: 'success', timestamp: '10:30:22', message: '/about processed successfully (200 OK)' },
  { id: 9, type: 'info', timestamp: '10:30:30', message: 'Crawling /products' },
  { id: 10, type: 'warning', timestamp: '10:30:32', message: 'Slow response time (2.5s) for /products' },
  { id: 11, type: 'success', timestamp: '10:30:35', message: '/products processed successfully (200 OK)' },
  { id: 12, type: 'info', timestamp: '10:30:40', message: 'Crawling /contact' },
  { id: 13, type: 'error', timestamp: '10:30:42', message: 'Failed to process /contact (404 Not Found)' },
  { id: 14, type: 'info', timestamp: '10:30:50', message: 'Crawling /blog' },
  { id: 15, type: 'success', timestamp: '10:30:52', message: '/blog processed successfully (200 OK)' },
  { id: 16, type: 'info', timestamp: '10:31:00', message: 'Crawling /blog/post-1' },
  { id: 17, type: 'success', timestamp: '10:31:02', message: '/blog/post-1 processed successfully (200 OK)' },
  { id: 18, type: 'info', timestamp: '10:31:10', message: 'Crawling /blog/post-2' },
  { id: 19, type: 'warning', timestamp: '10:31:12', message: 'Missing meta description on /blog/post-2' },
  { id: 20, type: 'success', timestamp: '10:31:15', message: '/blog/post-2 processed successfully (200 OK)' },
];

// Mock timeline events
const mockTimelineEvents = [
  {
    id: 1,
    title: 'Crawl started',
    description: 'Initiating crawl for corporate-legacy.example.com',
    time: '10:30:00',
    icon: <Clock size={16} />,
  },
  {
    id: 2,
    title: 'Homepage processed',
    description: 'Successfully crawled homepage and discovered 15 links',
    time: '10:30:12',
    icon: <Check size={16} />,
  },
  {
    id: 3,
    title: 'About page processed',
    description: 'Successfully crawled /about and discovered 8 links',
    time: '10:30:22',
    icon: <Check size={16} />,
  },
  {
    id: 4,
    title: 'Products page processed',
    description: 'Successfully crawled /products with slow response time (2.5s)',
    time: '10:30:35',
    icon: <AlertTriangle size={16} color="orange" />,
  },
  {
    id: 5,
    title: 'Error encountered',
    description: 'Failed to process /contact (404 Not Found)',
    time: '10:30:42',
    icon: <X size={16} color="red" />,
  },
  {
    id: 6,
    title: 'Blog section processed',
    description: 'Successfully crawled /blog and 2 blog posts',
    time: '10:31:15',
    icon: <Check size={16} />,
  },
];

// Mock recently discovered resources
const mockRecentResources = [
  {
    id: 1,
    url: '/blog/post-2',
    type: 'html',
    status: 'ok',
    size: '24 KB',
    time: '10:31:15',
  },
  {
    id: 2,
    url: '/assets/css/blog.css',
    type: 'css',
    status: 'ok',
    size: '8 KB',
    time: '10:31:14',
  },
  {
    id: 3,
    url: '/assets/js/main.js',
    type: 'js',
    status: 'warning',
    size: '156 KB',
    time: '10:31:10',
  },
  {
    id: 4,
    url: '/assets/images/blog-header.jpg',
    type: 'image',
    status: 'ok',
    size: '1.2 MB',
    time: '10:31:08',
  },
  {
    id: 5,
    url: '/assets/fonts/open-sans.woff2',
    type: 'other',
    status: 'ok',
    size: '78 KB',
    time: '10:31:05',
  },
];

const CrawlProgress: React.FC = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState(mockLogs);
  const [crawlData, setCrawlData] = useState(mockCrawlData);
  const [autoScroll, setAutoScroll] = useState(true);

  // In a real app, this would fetch the project data and set up WebSocket for real-time updates
  useEffect(() => {
    // Simulate log updates
    const interval = setInterval(() => {
      if (!isPaused) {
        const newLog = {
          id: logs.length + 1,
          type: ['info', 'success', 'warning', 'info'][Math.floor(Math.random() * 4)],
          timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
          message: `Processing resource ${Math.floor(Math.random() * 100)}/200...`,
        };
        setLogs((prevLogs) => [...prevLogs, newLog]);

        // Update progress
        setCrawlData((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 0.5, 100),
          crawledPages: Math.min(prev.crawledPages + 1, prev.totalPages),
          crawledResources: Math.min(prev.crawledResources + 3, prev.totalResources),
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, logs]);

  // Format timestamp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge color="green">Completed</Badge>;
      case 'in-progress':
        return <Badge color="blue">In Progress</Badge>;
      case 'paused':
        return <Badge color="orange">Paused</Badge>;
      case 'pending':
        return <Badge color="gray">Pending</Badge>;
      case 'failed':
        return <Badge color="red">Failed</Badge>;
      default:
        return <Badge color="gray">Unknown</Badge>;
    }
  };

  // Get resource type icon
  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'html':
        return <FileText size={14} />;
      case 'css':
        return <BrandCss3 size={14} />;
      case 'js':
        return <BrandJavascript size={14} />;
      case 'image':
        return <Photo size={14} />;
      default:
        return <FileAnalytics size={14} />;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok':
        return 'green';
      case 'warning':
        return 'orange';
      case 'error':
        return 'red';
      default:
        return 'gray';
    }
  };

  // Toggle pause/resume
  const togglePause = () => {
    setIsPaused(!isPaused);
    // In a real app, this would send a command to the backend to pause/resume the crawl
  };

  // Cancel crawl
  const cancelCrawl = () => {
    if (window.confirm('Are you sure you want to cancel this crawl? Progress will be lost.')) {
      // In a real app, this would send a command to the backend to cancel the crawl
      alert('Crawl cancelled');
    }
  };

  // Restart crawl
  const restartCrawl = () => {
    if (window.confirm('Are you sure you want to restart this crawl? Current progress will be lost.')) {
      // In a real app, this would send a command to the backend to restart the crawl
      setLogs(mockLogs.slice(0, 5));
      setCrawlData({
        ...crawlData,
        progress: 5,
        crawledPages: 3,
        crawledResources: 12,
        status: 'in-progress',
      });
      setIsPaused(false);
    }
  };

  return (
    <Container size="xl" px="xs">
      {/* Breadcrumbs */}
      <Breadcrumbs mb="md" separator="→">
        <Anchor component={Link} to="/projects" size="sm">
          Projects
        </Anchor>
        <Anchor component={Link} to={`/projects/${projectId}`} size="sm">
          {crawlData.projectName}
        </Anchor>
        <Text size="sm">Crawl Progress</Text>
      </Breadcrumbs>

      {/* Header */}
      <Paper withBorder className={classes.header}>
        <Grid>
          <Grid.Col span={12} md={8}>
            <Group>
              <Button
                component={Link}
                to={`/projects/${projectId}`}
                variant="subtle"
                leftIcon={<ArrowBack size={16} />}
                compact
              >
                Back to Project
              </Button>
              <div>
                <Group>
                  <Title order={2}>Crawl Progress</Title>
                  {getStatusBadge(isPaused ? 'paused' : crawlData.status)}
                </Group>
                <Text color="dimmed" size="sm">
                  <ExternalLink size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                  {crawlData.url}
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Group position="right" spacing="xs">
              <Button
                variant="outline"
                color={isPaused ? 'green' : 'orange'}
                leftIcon={isPaused ? <PlayerPlay size={16} /> : <PlayerPause size={16} />}
                onClick={togglePause}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button
                variant="outline"
                color="blue"
                leftIcon={<Refresh size={16} />}
                onClick={restartCrawl}
              >
                Restart
              </Button>
              <Button
                variant="outline"
                color="red"
                leftIcon={<X size={16} />}
                onClick={cancelCrawl}
              >
                Cancel
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Progress Overview */}
      <Paper withBorder p="md" mb="md">
        <Group position="apart" mb="xs">
          <Text size="sm" weight={500}>
            Crawl Progress
          </Text>
          <Group spacing={5}>
            <Text size="sm" weight={600}>
              {crawlData.progress.toFixed(1)}%
            </Text>
            <Text size="xs" color="dimmed">
              ({crawlData.crawledPages} of {crawlData.totalPages} pages)
            </Text>
          </Group>
        </Group>
        <Progress
          value={crawlData.progress}
          color={isPaused ? 'orange' : 'blue'}
          size="xl"
          radius="sm"
          striped={!isPaused}
          animate={!isPaused}
        />
        <Group position="apart" mt="xs">
          <Text size="xs" color="dimmed">
            <Clock size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />
            Started at {formatDate(crawlData.startTime)}
          </Text>
          <Text size="xs" color="dimmed">
            Est. time remaining: {crawlData.estimatedTimeRemaining}
          </Text>
        </Group>
      </Paper>

      <Grid gutter="md">
        {/* Left column: Stats and Timeline */}
        <Grid.Col span={12} md={4}>
          <Stack spacing="md">
            {/* Crawl Statistics */}
            <Paper withBorder p="md" className={classes.statCard}>
              <Title order={3} mb="md">
                Crawl Statistics
              </Title>
              <SimpleGrid cols={2} spacing="xs">
                <div>
                  <Text size="xs" color="dimmed">
                    Pages Crawled
                  </Text>
                  <Text weight={700} size="lg">
                    {crawlData.crawledPages}/{crawlData.totalPages}
                  </Text>
                </div>
                <div>
                  <Text size="xs" color="dimmed">
                    Resources Found
                  </Text>
                  <Text weight={700} size="lg">
                    {crawlData.crawledResources}/{crawlData.totalResources}
                  </Text>
                </div>
                <div>
                  <Text size="xs" color="dimmed">
                    Crawl Speed
                  </Text>
                  <Text weight={700} size="lg">
                    {crawlData.crawlSpeed}
                  </Text>
                </div>
                <div>
                  <Text size="xs" color="dimmed">
                    Total Size
                  </Text>
                  <Text weight={700} size="lg">
                    {crawlData.resourceSizes.total}
                  </Text>
                </div>
              </SimpleGrid>

              <Divider my="md" />

              <Text weight={500} mb="xs">
                Issues Detected
              </Text>
              <Group grow>
                <Card p="xs" withBorder>
                  <Text align="center" size="xs" color="dimmed">
                    Critical
                  </Text>
                  <Text align="center" weight={700} size="xl" color="red">
                    {crawlData.issues.critical}
                  </Text>
                </Card>
                <Card p="xs" withBorder>
                  <Text align="center" size="xs" color="dimmed">
                    Warning
                  </Text>
                  <Text align="center" weight={700} size="xl" color="orange">
                    {crawlData.issues.warning}
                  </Text>
                </Card>
                <Card p="xs" withBorder>
                  <Text align="center" size="xs" color="dimmed">
                    Info
                  </Text>
                  <Text align="center" weight={700} size="xl" color="blue">
                    {crawlData.issues.info}
                  </Text>
                </Card>
              </Group>
            </Paper>

            {/* Resource Types */}
            <Paper withBorder p="md" className={classes.statCard}>
              <Group position="apart" mb="md">
                <Title order={3}>Resource Types</Title>
                <RingProgress
                  size={80}
                  thickness={8}
                  sections={[
                    { value: (crawlData.resourceTypes.html / crawlData.totalResources) * 100, color: theme.colors.blue[6] },
                    { value: (crawlData.resourceTypes.css / crawlData.totalResources) * 100, color: theme.colors.grape[6] },
                    { value: (crawlData.resourceTypes.js / crawlData.totalResources) * 100, color: theme.colors.yellow[6] },
                    { value: (crawlData.resourceTypes.images / crawlData.totalResources) * 100, color: theme.colors.green[6] },
                    { value: (crawlData.resourceTypes.other / crawlData.totalResources) * 100, color: theme.colors.gray[6] },
                  ]}
                />
              </Group>

              <Group mb="xs">
                <div className={classes.resourceTypeIcon} style={{ backgroundColor: theme.colors.blue[6] }}>
                  <FileText size={14} color="white" />
                </div>
                <Group position="apart" sx={{ flex: 1 }}>
                  <Text size="sm">HTML</Text>
                  <Text size="sm" weight={500}>
                    {crawlData.resourceTypes.html}
                  </Text>
                </Group>
              </Group>

              <Group mb="xs">
                <div className={classes.resourceTypeIcon} style={{ backgroundColor: theme.colors.grape[6] }}>
                  <BrandCss3 size={14} color="white" />
                </div>
                <Group position="apart" sx={{ flex: 1 }}>
                  <Text size="sm">CSS</Text>
                  <Text size="sm" weight={500}>
                    {crawlData.resourceTypes.css}
                  </Text>
                </Group>
              </Group>

              <Group mb="xs">
                <div className={classes.resourceTypeIcon} style={{ backgroundColor: theme.colors.yellow[6] }}>
                  <BrandJavascript size={14} color="white" />
                </div>
                <Group position="apart" sx={{ flex: 1 }}>
                  <Text size="sm">JavaScript</Text>
                  <Text size="sm" weight={500}>
                    {crawlData.resourceTypes.js}
                  </Text>
                </Group>
              </Group>

              <Group mb="xs">
                <div className={classes.resourceTypeIcon} style={{ backgroundColor: theme.colors.green[6] }}>
                  <Photo size={14} color="white" />
                </div>
                <Group position="apart" sx={{ flex: 1 }}>
                  <Text size="sm">Images</Text>
                  <Text size="sm" weight={500}>
                    {crawlData.resourceTypes.images}
                  </Text>
                </Group>
              </Group>

              <Group mb="xs">
                <div className={classes.resourceTypeIcon} style={{ backgroundColor: theme.colors.gray[6] }}>
                  <FileAnalytics size={14} color="white" />
                </div>
                <Group position="apart" sx={{ flex: 1 }}>
                  <Text size="sm">Other</Text>
                  <Text size="sm" weight={500}>
                    {crawlData.resourceTypes.other}
                  </Text>
                </Group>
              </Group>
            </Paper>

            {/* Browser Compatibility */}
            <Paper withBorder p="md" className={classes.statCard}>
              <Title order={3} mb="md">
                Browser Support
              </Title>
              <Group position="center" spacing="lg">
                <Tooltip label="Chrome: Compatible">
                  <ThemeIcon color="green" variant="light" size="xl" radius="xl">
                    <BrandChrome size={20} />
                  </ThemeIcon>
                </Tooltip>
                <Tooltip label="Firefox: Compatible">
                  <ThemeIcon color="green" variant="light" size="xl" radius="xl">
                    <BrandFirefox size={20} />
                  </ThemeIcon>
                </Tooltip>
                <Tooltip label="Safari: Compatible">
                  <ThemeIcon color="green" variant="light" size="xl" radius="xl">
                    <BrandSafari size={20} />
                  </ThemeIcon>
                </Tooltip>
                <Tooltip label="Edge: Compatible">
                  <ThemeIcon color="green" variant="light" size="xl" radius="xl">
                    <BrandEdge size={20} />
                  </ThemeIcon>
                </Tooltip>
              </Group>

              <Divider my="md" />

              <Title order={3} mb="md">
                Device Support
              </Title>
              <Group position="center" spacing="lg">
                <Tooltip label="Desktop: Compatible">
                  <ThemeIcon color="green" variant="light" size="xl" radius="xl">
                    <DeviceLaptop size={20} />
                  </ThemeIcon>
                </Tooltip>
                <Tooltip label="Mobile: Issues Detected">
                  <ThemeIcon color="orange" variant="light" size="xl" radius="xl">
                    <DeviceMobile size={20} />
                  </ThemeIcon>
                </Tooltip>
              </Group>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right column: Logs and Timeline */}
        <Grid.Col span={12} md={8}>
          <Stack spacing="md">
            {/* Crawl Log */}
            <Paper withBorder p="md" className={classes.statCard}>
              <Group position="apart" mb="md">
                <Title order={3}>Crawl Log</Title>
                <Group>
                  <Button
                    variant="subtle"
                    leftIcon={<Download size={16} />}
                    compact
                    onClick={() => alert('Download log functionality would be implemented here')}
                  >
                    Download Log
                  </Button>
                  <Tooltip label={autoScroll ? 'Disable auto-scroll' : 'Enable auto-scroll'}>
                    <ActionIcon
                      variant="light"
                      color={autoScroll ? 'blue' : 'gray'}
                      onClick={() => setAutoScroll(!autoScroll)}
                    >
                      <Terminal size={16} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>

              <ScrollArea style={{ height: 300 }} scrollbarSize={8}>
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className={`${classes.logEntry} ${
                      log.type === 'info'
                        ? classes.infoLog
                        : log.type === 'warning'
                        ? classes.warningLog
                        : log.type === 'error'
                        ? classes.errorLog
                        : classes.successLog
                    }`}
                  >
                    <Group spacing="xs">
                      <Text size="xs" color="dimmed">
                        [{log.timestamp}]
                      </Text>
                      {log.type === 'info' && <InfoCircle size={14} color={theme.colors.blue[6]} />}
                      {log.type === 'warning' && <AlertTriangle size={14} color={theme.colors.orange[6]} />}
                      {log.type === 'error' && <X size={14} color={theme.colors.red[6]} />}
                      {log.type === 'success' && <Check size={14} color={theme.colors.green[6]} />}
                      <Text size="sm">{log.message}</Text>
                    </Group>
                  </div>
                ))}
              </ScrollArea>
            </Paper>

            {/* Timeline */}
            <Paper withBorder p="md" className={classes.statCard}>
              <Title order={3} mb="md">
                Crawl Timeline
              </Title>
              <Timeline active={mockTimelineEvents.length - 1} bulletSize={24} lineWidth={2}>
                {mockTimelineEvents.map((event) => (
                  <Timeline.Item
                    key={event.id}
                    title={event.title}
                    bullet={event.icon}
                    className={classes.timelineItem}
                  >
                    <Text color="dimmed" size="sm">
                      {event.description}
                    </Text>
                    <Text size="xs" mt={4}>
                      {event.time}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Paper>

            {/* Recently Discovered Resources */}
            <Paper withBorder p="md" className={classes.statCard}>
              <Group position="apart" mb="md">
                <Title order={3}>Recently Discovered Resources</Title>
                <Button
                  component={Link}
                  to={`/projects/${projectId}/visualization`}
                  variant="subtle"
                  rightIcon={<Eye size={16} />}
                  size="sm"
                >
                  View Site Structure
                </Button>
              </Group>

              <Accordion>
                {mockRecentResources.map((resource) => (
                  <Accordion.Item key={resource.id} value={resource.url}>
                    <Accordion.Control>
                      <Group>
                        <ThemeIcon color={getStatusColor(resource.status)} variant="light" size="sm">
                          {getResourceTypeIcon(resource.type)}
                        </ThemeIcon>
                        <Text size="sm">{resource.url}</Text>
                        <Badge size="sm" color={getStatusColor(resource.status)}>
                          {resource.status}
                        </Badge>
                      </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <SimpleGrid cols={3}>
                        <div>
                          <Text size="xs" color="dimmed">
                            Type
                          </Text>
                          <Text size="sm" transform="capitalize">
                            {resource.type}
                          </Text>
                        </div>
                        <div>
                          <Text size="xs" color="dimmed">
                            Size
                          </Text>
                          <Text size="sm">{resource.size}</Text>
                        </div>
                        <div>
                          <Text size="xs" color="dimmed">
                            Discovered At
                          </Text>
                          <Text size="sm">{resource.time}</Text>
                        </div>
                      </SimpleGrid>
                      <Button
                        component={Link}
                        to={`/projects/${projectId}/visualization`}
                        variant="subtle"
                        rightIcon={<ChevronRight size={16} />}
                        size="xs"
                        mt="sm"
                        fullWidth
                      >
                        View in Site Structure
                      </Button>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CrawlProgress;
