import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Title,
  Text,
  Group,
  Button,
  Paper,
  Badge,
  Grid,
  Tabs,
  TextInput,
  Select,
  Checkbox,
  ThemeIcon,
  Accordion,
  Card,
  Progress,
  SimpleGrid,
  Divider,
  ActionIcon,
  Tooltip,
  ScrollArea,
  Table,
  Pagination,
  Breadcrumbs,
  Anchor,
  createStyles,
  useMantineTheme,
} from '@mantine/core';
import {
  AlertTriangle,
  Check,
  X,
  InfoCircle,
  Search,
  Filter,
  ArrowsSort,
  SortAscending,
  SortDescending,
  ChevronRight,
  ArrowBack,
  ExternalLink,
  FileCode,
  DeviceMobile,
  DeviceLaptop,
  BrandChrome,
  BrandFirefox,
  BrandSafari,
  BrandEdge,
  Eye,
  Code,
  Accessible,
  Seo,
  Rocket,
  BrandHtml5,
  BrandCss3,
  BrandJavascript,
  Photo,
  FileDescription,
  Link as LinkIcon,
  Refresh,
  Download,
} from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  issueCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows.sm,
    },
  },
  filterBar: {
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  tabsList: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  tabActive: {
    fontWeight: 600,
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  codeBlock: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    fontFamily: 'monospace',
    fontSize: theme.fontSizes.sm,
    padding: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    overflowX: 'auto',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  categoryBadge: {
    textTransform: 'capitalize',
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  selectedRow: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.blue[0],
  },
}));

// Helper function to get severity icon
const getSeverityIcon = (severity: string, size = 16) => {
  switch (severity) {
    case 'critical':
      return <X size={size} />;
    case 'warning':
      return <AlertTriangle size={size} />;
    case 'info':
      return <InfoCircle size={size} />;
    default:
      return <AlertTriangle size={size} />;
  }
};

// Helper function to get severity color
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return 'red';
    case 'warning':
      return 'orange';
    case 'info':
      return 'blue';
    default:
      return 'gray';
  }
};

// Helper function to get category icon
const getCategoryIcon = (category: string, size = 16) => {
  switch (category) {
    case 'performance':
      return <Rocket size={size} />;
    case 'accessibility':
      return <Accessible size={size} />;
    case 'seo':
      return <Seo size={size} />;
    case 'best-practices':
      return <Check size={size} />;
    case 'html':
      return <BrandHtml5 size={size} />;
    case 'css':
      return <BrandCss3 size={size} />;
    case 'javascript':
      return <BrandJavascript size={size} />;
    case 'images':
      return <Photo size={size} />;
    case 'content':
      return <FileDescription size={size} />;
    case 'links':
      return <LinkIcon size={size} />;
    default:
      return <InfoCircle size={size} />;
  }
};

// Mock data for issues
const mockIssues = [
  {
    id: '1',
    title: 'Missing viewport meta tag',
    description: 'The site is not mobile-friendly due to missing viewport configuration',
    severity: 'critical',
    category: 'accessibility',
    url: '/index.html',
    line: 5,
    column: 1,
    impact: 'Mobile users will have difficulty viewing the site',
    howToFix: 'Add a viewport meta tag in the head section of your HTML',
    codeSnippet: '<head>\n  <!-- Add this line -->\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['mobile'],
    timestamp: '2023-08-15T10:30:00Z',
  },
  {
    id: '2',
    title: 'Contrast issues on main navigation',
    description: 'Text color doesn\'t have sufficient contrast with background',
    severity: 'critical',
    category: 'accessibility',
    url: '/css/main.css',
    line: 42,
    column: 3,
    impact: 'Users with visual impairments may not be able to read navigation text',
    howToFix: 'Increase the contrast ratio to at least 4.5:1 for normal text',
    codeSnippet: '.nav-link {\n  color: #777; /* Change to #555 or darker */\n  background-color: #f8f8f8;\n}',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['desktop', 'mobile'],
    timestamp: '2023-08-15T10:32:00Z',
  },
  {
    id: '3',
    title: 'Render-blocking JavaScript',
    description: 'Scripts are blocking the initial render of the page',
    severity: 'critical',
    category: 'performance',
    url: '/index.html',
    line: 12,
    column: 3,
    impact: 'Increased page load time and poor user experience',
    howToFix: 'Add async or defer attributes to non-critical scripts or move them to the bottom of the page',
    codeSnippet: '<!-- Change this -->\n<script src="heavy-script.js"></script>\n\n<!-- To this -->\n<script src="heavy-script.js" defer></script>',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['desktop', 'mobile'],
    timestamp: '2023-08-15T10:35:00Z',
  },
  {
    id: '4',
    title: 'Missing alt attributes on images',
    description: 'Several images are missing alt attributes for accessibility',
    severity: 'warning',
    category: 'accessibility',
    url: '/about.html',
    line: 28,
    column: 5,
    impact: 'Screen readers cannot describe images to visually impaired users',
    howToFix: 'Add descriptive alt attributes to all images',
    codeSnippet: '<!-- Change this -->\n<img src="team-photo.jpg">\n\n<!-- To this -->\n<img src="team-photo.jpg" alt="Our team at the annual retreat">',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['desktop', 'mobile'],
    timestamp: '2023-08-15T10:40:00Z',
  },
  {
    id: '5',
    title: 'Unminified CSS',
    description: 'CSS files are not minified',
    severity: 'warning',
    category: 'performance',
    url: '/css/styles.css',
    line: 1,
    column: 1,
    impact: 'Increased page load time due to larger file size',
    howToFix: 'Use a CSS minifier to reduce file size',
    codeSnippet: '/* Current size: 45KB */\n/* Minified size would be approximately 32KB */\n.header {\n  background-color: #ffffff;\n  padding: 20px;\n}',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['desktop', 'mobile'],
    timestamp: '2023-08-15T10:45:00Z',
  },
  {
    id: '6',
    title: 'Missing meta description',
    description: 'The page is missing a meta description',
    severity: 'warning',
    category: 'seo',
    url: '/services.html',
    line: 8,
    column: 1,
    impact: 'Reduced visibility in search engine results',
    howToFix: 'Add a descriptive meta description tag',
    codeSnippet: '<head>\n  <!-- Add this line -->\n  <meta name="description" content="Our professional services include web design, development, and digital marketing solutions for businesses of all sizes.">\n</head>',
    affectedBrowsers: [],
    affectedDevices: [],
    timestamp: '2023-08-15T10:50:00Z',
  },
  {
    id: '7',
    title: 'Console errors detected',
    description: 'JavaScript errors are appearing in the browser console',
    severity: 'warning',
    category: 'javascript',
    url: '/js/main.js',
    line: 156,
    column: 23,
    impact: 'Potential functionality issues and poor user experience',
    howToFix: 'Fix the JavaScript errors or add proper error handling',
    codeSnippet: '// Error: Cannot read property \'value\' of undefined\nconst value = document.getElementById(\'non-existent\').value;\n\n// Fix:\nconst element = document.getElementById(\'non-existent\');\nconst value = element ? element.value : null;',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['desktop', 'mobile'],
    timestamp: '2023-08-15T10:55:00Z',
  },
  {
    id: '8',
    title: 'Large image files',
    description: 'Several image files exceed recommended size limits',
    severity: 'warning',
    category: 'performance',
    url: '/images/hero.jpg',
    line: null,
    column: null,
    impact: 'Slow page loading, especially on mobile devices',
    howToFix: 'Compress images and consider using WebP format with proper fallbacks',
    codeSnippet: '<!-- Current: -->\n<img src="hero.jpg"> <!-- 2.4MB -->\n\n<!-- Better: -->\n<picture>\n  <source srcset="hero.webp" type="image/webp">\n  <source srcset="hero-optimized.jpg" type="image/jpeg">\n  <img src="hero-optimized.jpg" alt="Hero image"> <!-- 450KB -->\n</picture>',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['mobile'],
    timestamp: '2023-08-15T11:00:00Z',
  },
  {
    id: '9',
    title: 'Missing heading structure',
    description: 'Page lacks proper heading hierarchy',
    severity: 'info',
    category: 'accessibility',
    url: '/contact.html',
    line: 15,
    column: 1,
    impact: 'Screen readers cannot properly navigate the page structure',
    howToFix: 'Implement proper heading hierarchy (h1, h2, h3, etc.)',
    codeSnippet: '<!-- Change this -->\n<div class="title">Contact Us</div>\n<div class="subtitle">Our Locations</div>\n\n<!-- To this -->\n<h1>Contact Us</h1>\n<h2>Our Locations</h2>',
    affectedBrowsers: [],
    affectedDevices: [],
    timestamp: '2023-08-15T11:05:00Z',
  },
  {
    id: '10',
    title: 'Missing ARIA labels',
    description: 'Interactive elements missing ARIA labels',
    severity: 'info',
    category: 'accessibility',
    url: '/index.html',
    line: 87,
    column: 3,
    impact: 'Screen readers cannot properly identify interactive elements',
    howToFix: 'Add appropriate ARIA labels to interactive elements',
    codeSnippet: '<!-- Change this -->\n<button class="close-button">×</button>\n\n<!-- To this -->\n<button class="close-button" aria-label="Close">×</button>',
    affectedBrowsers: [],
    affectedDevices: [],
    timestamp: '2023-08-15T11:10:00Z',
  },
  {
    id: '11',
    title: 'Missing favicon',
    description: 'The site is missing a favicon',
    severity: 'info',
    category: 'best-practices',
    url: '/index.html',
    line: 9,
    column: 1,
    impact: 'Poor branding in browser tabs and bookmarks',
    howToFix: 'Add a favicon link in the head section',
    codeSnippet: '<head>\n  <!-- Add this line -->\n  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n</head>',
    affectedBrowsers: ['chrome', 'firefox', 'safari', 'edge'],
    affectedDevices: ['desktop', 'mobile'],
    timestamp: '2023-08-15T11:15:00Z',
  },
  {
    id: '12',
    title: 'Deprecated HTML tags',
    description: 'Page contains deprecated HTML tags',
    severity: 'info',
    category: 'html',
    url: '/about.html',
    line: 42,
    column: 3,
    impact: 'Potential rendering issues in modern browsers',
    howToFix: 'Replace deprecated tags with modern HTML5 equivalents',
    codeSnippet: '<!-- Change this -->\n<center>Centered content</center>\n\n<!-- To this -->\n<div style="text-align: center;">Centered content</div>',
    affectedBrowsers: [],
    affectedDevices: [],
    timestamp: '2023-08-15T11:20:00Z',
  },
];

// Mock data for issue statistics
const mockIssueStats = {
  total: 23,
  bySeverity: {
    critical: 3,
    warning: 12,
    info: 8,
  },
  byCategory: {
    performance: 7,
    accessibility: 6,
    seo: 4,
    'best-practices': 3,
    html: 2,
    css: 1,
    javascript: 0,
  },
  byPage: [
    { url: '/index.html', count: 8 },
    { url: '/about.html', count: 5 },
    { url: '/services.html', count: 4 },
    { url: '/contact.html', count: 3 },
    { url: '/blog/index.html', count: 2 },
    { url: '/css/main.css', count: 1 },
  ],
};

const SiteIssues: React.FC = () => {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('severity');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Filter and sort issues
  const filteredIssues = mockIssues
    .filter((issue) => {
      const matchesSearch = searchQuery
        ? issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          issue.url.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesSeverity = severityFilter ? issue.severity === severityFilter : true;
      const matchesCategory = categoryFilter ? issue.category === categoryFilter : true;
      const matchesTab = activeTab === 'all' ? true : issue.severity === activeTab;

      return matchesSearch && matchesSeverity && matchesCategory && matchesTab;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'url':
          comparison = a.url.localeCompare(b.url);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'timestamp':
          comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
          break;
        case 'severity':
        default:
          // Custom severity order: critical, warning, info
          const severityOrder = { critical: 0, warning: 1, info: 2 };
          comparison = severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Paginate issues
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const paginatedIssues = filteredIssues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSeverityFilter(null);
    setCategoryFilter(null);
    setSortBy('severity');
    setSortDirection('desc');
    setCurrentPage(1);
  };

  // Format date
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

  // Get selected issue
  const getSelectedIssue = () => {
    return mockIssues.find((issue) => issue.id === selectedIssue);
  };

  return (
    <Container size="xl" px="xs">
      {/* Breadcrumbs */}
      <Breadcrumbs mb="md" separator="→">
        <Anchor component={Link} to="/projects" size="sm">
          Projects
        </Anchor>
        <Anchor component={Link} to={`/projects/${projectId}`} size="sm">
          Corporate Website Redesign
        </Anchor>
        <Text size="sm">Site Issues</Text>
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
                <Title order={2}>Site Issues</Title>
                <Text color="dimmed" size="sm">
                  <ExternalLink size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                  https://corporate-legacy.example.com
                </Text>
              </div>
            </Group>
          </Grid.Col>
          <Grid.Col span={12} md={4}>
            <Group position="right" spacing="xs">
              <Button
                variant="outline"
                leftIcon={<Refresh size={16} />}
                onClick={() => alert('This would refresh the issue scan in a real app')}
              >
                Rescan
              </Button>
              <Button
                variant="outline"
                leftIcon={<Download size={16} />}
                onClick={() => alert('This would download the issues report in a real app')}
              >
                Export
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Issue Statistics */}
      <SimpleGrid
        cols={3}
        spacing="md"
        breakpoints={[
          { maxWidth: 'md', cols: 3 },
          { maxWidth: 'sm', cols: 1 },
        ]}
        mb="md"
      >
        <Paper withBorder p="md" className={classes.statCard}>
          <Title order={4} mb="xs">
            Issues by Severity
          </Title>
          <Group position="apart" mb="xs">
            <Group>
              <ThemeIcon color="red" size="md" variant="light">
                <X size={16} />
              </ThemeIcon>
              <Text>Critical</Text>
            </Group>
            <Text weight={700}>{mockIssueStats.bySeverity.critical}</Text>
          </Group>
          <Progress
            value={(mockIssueStats.bySeverity.critical / mockIssueStats.total) * 100}
            color="red"
            size="sm"
            mb="md"
          />

          <Group position="apart" mb="xs">
            <Group>
              <ThemeIcon color="orange" size="md" variant="light">
                <AlertTriangle size={16} />
              </ThemeIcon>
              <Text>Warning</Text>
            </Group>
            <Text weight={700}>{mockIssueStats.bySeverity.warning}</Text>
          </Group>
          <Progress
            value={(mockIssueStats.bySeverity.warning / mockIssueStats.total) * 100}
            color="orange"
            size="sm"
            mb="md"
          />

          <Group position="apart" mb="xs">
            <Group>
              <ThemeIcon color="blue" size="md" variant="light">
                <InfoCircle size={16} />
              </ThemeIcon>
              <Text>Info</Text>
            </Group>
            <Text weight={700}>{mockIssueStats.bySeverity.info}</Text>
          </Group>
          <Progress
            value={(mockIssueStats.bySeverity.info / mockIssueStats.total) * 100}
            color="blue"
            size="sm"
          />
        </Paper>

        <Paper withBorder p="md" className={classes.statCard}>
          <Title order={4} mb="xs">
            Issues by Category
          </Title>
          <ScrollArea style={{ height: 180 }}>
            {Object.entries(mockIssueStats.byCategory).map(([category, count]) => (
              <Group key={category} position="apart" mb="xs">
                <Group>
                  <ThemeIcon color="blue" size="md" variant="light">
                    {getCategoryIcon(category)}
                  </ThemeIcon>
                  <Text transform="capitalize">{category.replace('-', ' ')}</Text>
                </Group>
                <Text weight={700}>{count}</Text>
              </Group>
            ))}
          </ScrollArea>
        </Paper>

        <Paper withBorder p="md" className={classes.statCard}>
          <Title order={4} mb="xs">
            Most Affected Pages
          </Title>
          <ScrollArea style={{ height: 180 }}>
            {mockIssueStats.byPage.map((page) => (
              <Group key={page.url} position="apart" mb="xs">
                <Text size="sm" lineClamp={1} style={{ maxWidth: '70%' }}>
                  {page.url}
                </Text>
                <Badge>{page.count}</Badge>
              </Group>
            ))}
          </ScrollArea>
        </Paper>
      </SimpleGrid>

      {/* Tabs for issue categories */}
      <Tabs value={activeTab} onTabChange={setActiveTab} mb="md">
        <Tabs.List className={classes.tabsList}>
          <Tabs.Tab
            value="all"
            icon={<FileCode size={14} />}
            rightSection={
              <Badge size="xs" variant="filled" sx={{ width: 16, height: 16, padding: 0 }}>
                {mockIssueStats.total}
              </Badge>
            }
          >
            All Issues
          </Tabs.Tab>
          <Tabs.Tab
            value="critical"
            icon={<X size={14} />}
            rightSection={
              <Badge size="xs" variant="filled" color="red" sx={{ width: 16, height: 16, padding: 0 }}>
                {mockIssueStats.bySeverity.critical}
              </Badge>
            }
          >
            Critical
          </Tabs.Tab>
          <Tabs.Tab
            value="warning"
            icon={<AlertTriangle size={14} />}
            rightSection={
              <Badge size="xs" variant="filled" color="orange" sx={{ width: 16, height: 16, padding: 0 }}>
                {mockIssueStats.bySeverity.warning}
              </Badge>
            }
          >
            Warnings
          </Tabs.Tab>
          <Tabs.Tab
            value="info"
            icon={<InfoCircle size={14} />}
            rightSection={
              <Badge size="xs" variant="filled" color="blue" sx={{ width: 16, height: 16, padding: 0 }}>
                {mockIssueStats.bySeverity.info}
              </Badge>
            }
          >
            Info
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* Filter and sort controls */}
      <Paper className={classes.filterBar} withBorder p="md">
        <Grid align="center">
          <Grid.Col xs={12} sm={5} md={4}>
            <TextInput
              placeholder="Search issues..."
              icon={<Search size={16} />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              size="sm"
            />
          </Grid.Col>
          <Grid.Col xs={6} sm={3} md={2}>
            <Select
              placeholder="Filter by severity"
              icon={<Filter size={16} />}
              clearable
              value={severityFilter}
              onChange={setSeverityFilter}
              data={[
                { value: 'critical', label: 'Critical' },
                { value: 'warning', label: 'Warning' },
                { value: 'info', label: 'Info' },
              ]}
              size="sm"
            />
          </Grid.Col>
          <Grid.Col xs={6} sm={4} md={3}>
            <Select
              placeholder="Filter by category"
              icon={<Filter size={16} />}
              clearable
              value={categoryFilter}
              onChange={setCategoryFilter}
              data={[
                { value: 'performance', label: 'Performance' },
                { value: 'accessibility', label: 'Accessibility' },
                { value: 'seo', label: 'SEO' },
                { value: 'best-practices', label: 'Best Practices' },
                { value: 'html', label: 'HTML' },
                { value: 'css', label: 'CSS' },
                { value: 'javascript', label: 'JavaScript' },
                { value: 'images', label: 'Images' },
              ]}
              size="sm"
            />
          </Grid.Col>
          <Grid.Col xs={6} sm={6} md={2}>
            <Group spacing="xs" noWrap>
              <Select
                placeholder="Sort by"
                icon={<ArrowsSort size={16} />}
                value={sortBy}
                onChange={(value) => setSortBy(value || 'severity')}
                data={[
                  { value: 'severity', label: 'Severity' },
                  { value: 'title', label: 'Title' },
                  { value: 'category', label: 'Category' },
                  { value: 'url', label: 'URL' },
                  { value: 'timestamp', label: 'Date Found' },
                ]}
                size="sm"
                style={{ flex: 1 }}
              />
              <ActionIcon
                variant="light"
                onClick={toggleSortDirection}
                title={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
                size={30}
              >
                {sortDirection === 'asc' ? (
                  <SortAscending size={16} />
                ) : (
                  <SortDescending size={16} />
                )}
              </ActionIcon>
            </Group>
          </Grid.Col>
          <Grid.Col xs={6} sm={6} md={1}>
            <Group position="right" noWrap>
              <Button
                variant="subtle"
                leftIcon={<Refresh size={16} />}
                onClick={resetFilters}
                size="sm"
                compact
              >
                Reset
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Results count and pagination info */}
      <Group position="apart" mb="md">
        <Text size="sm" color="dimmed">
          Showing {paginatedIssues.length} of {filteredIssues.length} issues
        </Text>
        {totalPages > 1 && (
          <Pagination
            total={totalPages}
            page={currentPage}
            onChange={setCurrentPage}
            size="sm"
          />
        )}
      </Group>

      {/* Issues list and detail view */}
      <Grid gutter="md">
        {/* Issues list */}
        <Grid.Col span={12} md={selectedIssue ? 6 : 12}>
          <Paper withBorder p="md">
            <ScrollArea style={{ height: selectedIssue ? 600 : 'auto' }}>
              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th>Severity</th>
                    <th>Issue</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedIssues.map((issue) => (
                    <tr
                      key={issue.id}
                      className={cx(classes.tableRow, { [classes.selectedRow]: issue.id === selectedIssue })}
                      onClick={() => setSelectedIssue(issue.id)}
                    >
                      <td>
                        <Group spacing="xs">
                          <ThemeIcon
                            color={getSeverityColor(issue.severity)}
                            size="md"
                            variant="light"
                            radius="xl"
                          >
                            {getSeverityIcon(issue.severity)}
                          </ThemeIcon>
                          <Text transform="capitalize">{issue.severity}</Text>
                        </Group>
                      </td>
                      <td>
                        <Text weight={500}>{issue.title}</Text>
                        <Text size="xs" color="dimmed" lineClamp={1}>
                          {issue.description}
                        </Text>
                      </td>
                      <td>
                        <Badge
                          color={
                            issue.category === 'accessibility'
                              ? 'grape'
                              : issue.category === 'performance'
                              ? 'blue'
                              : issue.category === 'seo'
                              ? 'green'
                              : 'gray'
                          }
                          variant="light"
                          className={classes.categoryBadge}
                        >
                          {issue.category}
                        </Badge>
                      </td>
                      <td>
                        <Text size="sm" lineClamp={1}>
                          {issue.url}
                        </Text>
                        {issue.line && (
                          <Text size="xs" color="dimmed">
                            Line {issue.line}, Col {issue.column}
                          </Text>
                        )}
                      </td>
                      <td>
                        <Tooltip label="View Details">
                          <ActionIcon onClick={() => setSelectedIssue(issue.id)}>
                            <ChevronRight size={16} />
                          </ActionIcon>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {paginatedIssues.length === 0 && (
                <Paper p="xl" withBorder mt="md">
                  <Text align="center" size="lg" weight={500} mb="sm">
                    No issues found
                  </Text>
                  <Text align="center" color="dimmed">
                    {searchQuery || severityFilter || categoryFilter
                      ? 'Try adjusting your search or filters to find what you're looking for.'
                      : 'No issues have been detected for this project.'}
                  </Text>
                  {(searchQuery || severityFilter || categoryFilter) && (
                    <Button
                      variant="outline"
                      leftIcon={<Refresh size={16} />}
                      onClick={resetFilters}
                      mt="md"
                      mx="auto"
                      display="block"
                    >
                      Reset Filters
                    </Button>
                  )}
                </Paper>
              )}
            </ScrollArea>
          </Paper>

          {/* Pagination */}
          {totalPages > 1 && (
            <Group position="center" mt="md">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                withEdges
              />
            </Group>
          )}
        </Grid.Col>

        {/* Issue detail */}
        {selectedIssue && (
          <Grid.Col span={12} md={6}>
            <Paper withBorder p="md" style={{ height: '100%' }}>
              {(() => {
                const issue = getSelectedIssue();
                if (!issue) return <Text>Select an issue to view details</Text>;

                return (
                  <ScrollArea style={{ height: 600 }}>
                    <Group position="apart" mb="md">
                      <Title order={3}>{issue.title}</Title>
                      <Badge
                        size="lg"
                        color={getSeverityColor(issue.severity)}
                        variant="filled"
                        leftSection={
                          <ThemeIcon color={getSeverityColor(issue.severity)} variant="filled" size="sm" radius="xl">
                            {getSeverityIcon(issue.severity, 12)}
                          </ThemeIcon>
                        }
                      >
                        {issue.severity.toUpperCase()}
                      </Badge>
                    </Group>

                    <Text mb="md">{issue.description}</Text>

                    <Divider label="Issue Details" labelPosition="center" my="md" />

                    <SimpleGrid cols={2} mb="md">
                      <div>
                        <Text size="sm" weight={700}>
                          Category
                        </Text>
                        <Group>
                          <ThemeIcon color="blue" variant="light" size="sm">
                            {getCategoryIcon(issue.category)}
                          </ThemeIcon>
                          <Text transform="capitalize">{issue.category.replace('-', ' ')}</Text>
                        </Group>
                      </div>
                      <div>
                        <Text size="sm" weight={700}>
                          Detected On
                        </Text>
                        <Text>{formatDate(issue.timestamp)}</Text>
                      </div>
                    </SimpleGrid>

                    <Text size="sm" weight={700} mb="xs">
                      Location
                    </Text>
                    <Paper withBorder p="xs" mb="md">
                      <Group>
                        <Text size="sm" weight={500}>
                          {issue.url}
                        </Text>
                        {issue.line && (
                          <Badge size="sm">
                            Line {issue.line}, Col {issue.column}
                          </Badge>
                        )}
                      </Group>
                    </Paper>

                    <Text size="sm" weight={700} mb="xs">
                      Impact
                    </Text>
                    <Text size="sm" mb="md">
                      {issue.impact}
                    </Text>

                    <Divider label="How to Fix" labelPosition="center" my="md" />

                    <Text size="sm" mb="md">
                      {issue.howToFix}
                    </Text>

                    <Text size="sm" weight={700} mb="xs">
                      Code Example
                    </Text>
                    <Paper withBorder className={classes.codeBlock} mb="md">
                      <Code block>{issue.codeSnippet}</Code>
                    </Paper>

                    {(issue.affectedBrowsers.length > 0 || issue.affectedDevices.length > 0) && (
                      <>
                        <Divider label="Affected Platforms" labelPosition="center" my="md" />

                        {issue.affectedBrowsers.length > 0 && (
                          <>
                            <Text size="sm" weight={700} mb="xs">
                              Browsers
                            </Text>
                            <Group mb="md">
                              {issue.affectedBrowsers.includes('chrome') && (
                                <Tooltip label="Chrome">
                                  <ThemeIcon color="red" variant="light" size="lg" radius="xl">
                                    <BrandChrome size={20} />
                                  </ThemeIcon>
                                </Tooltip>
                              )}
                              {issue.affectedBrowsers.includes('firefox') && (
                                <Tooltip label="Firefox">
                                  <ThemeIcon color="orange" variant="light" size="lg" radius="xl">
                                    <BrandFirefox size={20} />
                                  </ThemeIcon>
                                </Tooltip>
                              )}
                              {issue.affectedBrowsers.includes('safari') && (
                                <Tooltip label="Safari">
                                  <ThemeIcon color="blue" variant="light" size="lg" radius="xl">
                                    <BrandSafari size={20} />
                                  </ThemeIcon>
                                </Tooltip>
                              )}
                              {issue.affectedBrowsers.includes('edge') && (
                                <Tooltip label="Edge">
                                  <ThemeIcon color="cyan" variant="light" size="lg" radius="xl">
                                    <BrandEdge size={20} />
                                  </ThemeIcon>
                                </Tooltip>
                              )}
                            </Group>
                          </>
                        )}

                        {issue.affectedDevices.length > 0 && (
                          <>
                            <Text size="sm" weight={700} mb="xs">
                              Devices
                            </Text>
                            <Group mb="md">
                              {issue.affectedDevices.includes('desktop') && (
                                <Tooltip label="Desktop">
                                  <ThemeIcon color="blue" variant="light" size="lg" radius="xl">
                                    <DeviceLaptop size={20} />
                                  </ThemeIcon>
                                </Tooltip>
                              )}
                              {issue.affectedDevices.includes('mobile') && (
                                <Tooltip label="Mobile">
                                  <ThemeIcon color="grape" variant="light" size="lg" radius="xl">
                                    <DeviceMobile size={20} />
                                  </ThemeIcon>
                                </Tooltip>
                              )}
                            </Group>
                          </>
                        )}
                      </>
                    )}

                    <Group position="right" mt="xl">
                      <Button
                        variant="outline"
                        leftIcon={<Eye size={16} />}
                        onClick={() => alert(`This would open ${issue.url} in the site preview`)}
                      >
                        View in Site
                      </Button>
                      <Button
                        variant="filled"
                        leftIcon={<Check size={16} />}
                        onClick={() => alert('This would mark the issue as resolved in a real app')}
                      >
                        Mark as Resolved
                      </Button>
                    </Group>
                  </ScrollArea>
                );
              })()}
            </Paper>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
};

export default SiteIssues;
