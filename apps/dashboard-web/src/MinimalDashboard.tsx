import { Container, Title, Text, Grid, Card, Group, Button, Badge, Stack } from '@mantine/core';

const MinimalDashboard = () => {
  console.log('MinimalDashboard component is rendering!');
  
  return (
    <Container size="xl" p="md">
      <Title order={1} mb="xl">Dashboard</Title>
      
      <Grid>
        <Grid.Col span={12} md={6} lg={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Text weight={500}>Total Projects</Text>
              <Badge color="blue" variant="light">
                Active
              </Badge>
            </Group>
            <Text size="xl" weight={700} color="blue">
              12
            </Text>
            <Text size="sm" color="dimmed">
              +2 from last month
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6} lg={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Text weight={500}>Issues Found</Text>
              <Badge color="red" variant="light">
                Critical
              </Badge>
            </Group>
            <Text size="xl" weight={700} color="red">
              47
            </Text>
            <Text size="sm" color="dimmed">
              -5 from last week
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6} lg={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Text weight={500}>Pages Crawled</Text>
              <Badge color="green" variant="light">
                Success
              </Badge>
            </Group>
            <Text size="xl" weight={700} color="green">
              1,247
            </Text>
            <Text size="sm" color="dimmed">
              Last crawl: 2 hours ago
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12} md={6} lg={3}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Group position="apart" mb="xs">
              <Text weight={500}>Performance Score</Text>
              <Badge color="yellow" variant="light">
                Good
              </Badge>
            </Group>
            <Text size="xl" weight={700} color="yellow">
              78%
            </Text>
            <Text size="sm" color="dimmed">
              +3% improvement
            </Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={12}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">Quick Actions</Title>
            <Stack spacing="md">
              <Group>
                <Button variant="filled" color="blue">
                  Start New Crawl
                </Button>
                <Button variant="outline" color="blue">
                  View All Projects
                </Button>
                <Button variant="outline" color="green">
                  Generate Report
                </Button>
              </Group>
              <Text size="sm" color="dimmed">
                Welcome to the Website Modernization Dashboard! This is a minimal version to test basic functionality.
              </Text>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default MinimalDashboard;
