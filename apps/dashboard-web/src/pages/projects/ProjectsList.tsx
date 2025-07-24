import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Menu,
  Grid,
  TextInput,
  Select,
} from '@mantine/core';
import { Plus, Search, Dots, Eye, Edit, Trash } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'completed' | 'draft';
  lastCrawled: string;
  issuesCount: number;
  pagesCount: number;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Website',
    url: 'https://example-store.com',
    status: 'active',
    lastCrawled: '2024-01-15',
    issuesCount: 23,
    pagesCount: 156,
  },
  {
    id: '2',
    name: 'Corporate Blog',
    url: 'https://company-blog.com',
    status: 'completed',
    lastCrawled: '2024-01-10',
    issuesCount: 5,
    pagesCount: 89,
  },
  {
    id: '3',
    name: 'Portfolio Site',
    url: 'https://my-portfolio.com',
    status: 'draft',
    lastCrawled: 'Never',
    issuesCount: 0,
    pagesCount: 0,
  },
];

const ProjectsList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'blue';
      case 'completed': return 'green';
      case 'draft': return 'gray';
      default: return 'gray';
    }
  };

  return (
    <Container size="xl" py="xl">
      <Stack spacing="xl">
        {/* Header */}
        <Group position="apart">
          <div>
            <Title order={2}>Projects</Title>
            <Text color="dimmed">Manage your website modernization projects</Text>
          </div>
          <Button
            leftIcon={<Plus size={16} />}
            onClick={() => navigate('/projects/new')}
          >
            New Project
          </Button>
        </Group>

        {/* Filters */}
        <Group>
          <TextInput
            placeholder="Search projects..."
            icon={<Search size={16} />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            style={{ flex: 1, maxWidth: 300 }}
          />
          <Select
            placeholder="Filter by status"
            data={[
              { value: 'active', label: 'Active' },
              { value: 'completed', label: 'Completed' },
              { value: 'draft', label: 'Draft' },
            ]}
            value={statusFilter}
            onChange={setStatusFilter}
            clearable
          />
        </Group>

        {/* Projects Grid */}
        <Grid>
          {filteredProjects.map((project) => (
            <Grid.Col key={project.id} span={12} md={6} lg={4}>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack spacing="sm">
                  <Group position="apart">
                    <Title order={4}>{project.name}</Title>
                    <Menu shadow="md" width={200}>
                      <Menu.Target>
                        <ActionIcon variant="subtle">
                          <Dots size={16} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item
                          icon={<Eye size={14} />}
                          onClick={() => navigate(`/projects/${project.id}`)}
                        >
                          View Details
                        </Menu.Item>
                        <Menu.Item icon={<Edit size={14} />}>
                          Edit Project
                        </Menu.Item>
                        <Menu.Divider />
                        <Menu.Item icon={<Trash size={14} />} color="red">
                          Delete Project
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>

                  <Text size="sm" color="dimmed" truncate>
                    {project.url}
                  </Text>

                  <Badge color={getStatusColor(project.status)} variant="light">
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </Badge>

                  <Stack spacing={4}>
                    <Group position="apart">
                      <Text size="xs" color="dimmed">Last Crawled:</Text>
                      <Text size="xs">{project.lastCrawled}</Text>
                    </Group>
                    <Group position="apart">
                      <Text size="xs" color="dimmed">Pages:</Text>
                      <Text size="xs">{project.pagesCount}</Text>
                    </Group>
                    <Group position="apart">
                      <Text size="xs" color="dimmed">Issues:</Text>
                      <Text size="xs" color={project.issuesCount > 0 ? 'red' : 'green'}>
                        {project.issuesCount}
                      </Text>
                    </Group>
                  </Stack>

                  <Button
                    variant="light"
                    fullWidth
                    mt="md"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View Project
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {filteredProjects.length === 0 && (
          <Card padding="xl">
            <Stack align="center" spacing="md">
              <Text size="lg" color="dimmed">No projects found</Text>
              <Text size="sm" color="dimmed" align="center">
                {searchTerm || statusFilter
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first project'
                }
              </Text>
              {!searchTerm && !statusFilter && (
                <Button
                  leftIcon={<Plus size={16} />}
                  onClick={() => navigate('/projects/new')}
                >
                  Create First Project
                </Button>
              )}
            </Stack>
          </Card>
        )}
      </Stack>
    </Container>
  );
};

export default ProjectsList;
