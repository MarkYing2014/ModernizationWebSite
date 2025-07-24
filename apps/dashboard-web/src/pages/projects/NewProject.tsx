import React, { useState } from 'react';
import {
  TextInput,
  Button,
  Group,
  Text,
  Paper,
  Title,
  Stack,
  Stepper,
  Alert,
  Badge,
  Container,
  Divider,
  Box,
  Card,
  Progress,
  List,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { 
  IconAlertCircle, 
  IconCheck, 
  IconX, 
  IconWorld, 
  IconRobot, 
  IconShieldCheck, 
  IconLock,
  IconAlertTriangle,
  IconInfoCircle,
  IconArrowRight,
} from 'tabler-icons-react';

interface UrlValidationFormValues {
  url: string;
}

// Validation step interface
interface ValidationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'pending' | 'loading' | 'success' | 'error';
  message?: string;
}

const NewProject: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [validationComplete, setValidationComplete] = useState(false);
  const [validationSuccess, setValidationSuccess] = useState(false);
  
  // Initialize validation steps
  const [validationSteps, setValidationSteps] = useState<ValidationStep[]>([
    {
      id: 'format',
      title: 'URL Format',
      description: 'Validates the URL format and structure',
      icon: <IconWorld size={18} />,
      status: 'pending',
    },
    {
      id: 'reachability',
      title: 'Reachability',
      description: 'Checks if the website is accessible',
      icon: <IconCheck size={18} />,
      status: 'pending',
    },
    {
      id: 'security',
      title: 'Security Check',
      description: 'Verifies SSL/TLS and security headers',
      icon: <IconShieldCheck size={18} />,
      status: 'pending',
    },
    {
      id: 'robots',
      title: 'Robots.txt',
      description: 'Checks if crawling is allowed',
      icon: <IconRobot size={18} />,
      status: 'pending',
    },
  ]);

  const form = useForm<UrlValidationFormValues>({
    initialValues: {
      url: '',
    },
    validate: {
      url: (value) => {
        if (!value) return 'URL is required';
        
        try {
          const url = new URL(value);
          return url.protocol === 'http:' || url.protocol === 'https:' 
            ? null 
            : 'URL must start with http:// or https://';
        } catch (e) {
          return 'Please enter a valid URL (e.g., https://example.com)';
        }
      },
    },
  });

  // Helper to update a specific validation step
  const updateValidationStep = (id: string, update: Partial<ValidationStep>) => {
    setValidationSteps(steps => 
      steps.map(step => step.id === id ? { ...step, ...update } : step)
    );
  };

  // Reset validation state
  const resetValidation = () => {
    setActiveStep(0);
    setValidationComplete(false);
    setValidationSuccess(false);
    setValidationSteps(steps => 
      steps.map(step => ({ ...step, status: 'pending', message: undefined }))
    );
  };

  // Simulate URL validation process
  const validateUrl = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      resetValidation();

      // Step 1: URL Format Validation
      setActiveStep(0);
      updateValidationStep('format', { status: 'loading' });
      await new Promise(resolve => setTimeout(resolve, 800));
      
      try {
        new URL(url);
        updateValidationStep('format', { 
          status: 'success', 
          message: 'URL format is valid' 
        });
      } catch (e) {
        updateValidationStep('format', { 
          status: 'error', 
          message: 'Invalid URL format' 
        });
        throw new Error('URL validation failed: Invalid format');
      }

      // Step 2: Reachability Check
      setActiveStep(1);
      updateValidationStep('reachability', { status: 'loading' });
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Simulate reachability check (in a real app, this would be a backend call)
      if (url.includes('unreachable') || url.includes('down')) {
        updateValidationStep('reachability', { 
          status: 'error', 
          message: 'Website is not reachable' 
        });
        throw new Error('URL validation failed: Website not reachable');
      } else {
        updateValidationStep('reachability', { 
          status: 'success', 
          message: 'Website is reachable' 
        });
      }

      // Step 3: Security Check
      setActiveStep(2);
      updateValidationStep('security', { status: 'loading' });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate security check
      if (url.startsWith('http://')) {
        updateValidationStep('security', { 
          status: 'error', 
          message: 'Website does not use HTTPS' 
        });
        throw new Error('URL validation failed: HTTPS required');
      } else {
        updateValidationStep('security', { 
          status: 'success', 
          message: 'Security checks passed' 
        });
      }

      // Step 4: Robots.txt Check
      setActiveStep(3);
      updateValidationStep('robots', { status: 'loading' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate robots.txt check
      if (url.includes('no-robots') || url.includes('no-crawl')) {
        updateValidationStep('robots', { 
          status: 'error', 
          message: 'Crawling disallowed by robots.txt' 
        });
        throw new Error('URL validation failed: Crawling disallowed');
      } else {
        updateValidationStep('robots', { 
          status: 'success', 
          message: 'Crawling allowed by robots.txt' 
        });
      }

      // All checks passed
      setValidationComplete(true);
      setValidationSuccess(true);
      
    } catch (err) {
      setValidationComplete(true);
      setValidationSuccess(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during validation');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: UrlValidationFormValues) => {
    await validateUrl(values.url);
  };

  const handleCreateProject = () => {
    // In a real app, this would create the project and redirect to the project page
    // For demo, we'll just show an alert
    alert(`Project created for URL: ${form.values.url}`);
  };

  return (
    <Container size="lg">
      <Paper radius="md" p="xl" withBorder>
        <Title order={2} align="center" mb="md">
          Add New Website Project
        </Title>
        
        <Text color="dimmed" size="sm" align="center" mb="xl">
          Enter the URL of the website you want to modernize
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="md">
            <TextInput
              required
              label="Website URL"
              placeholder="https://example.com"
              icon={<IconWorld size={16} />}
              {...form.getInputProps('url')}
              disabled={loading || validationSuccess}
              description="Enter the root URL of the website you want to analyze and modernize"
              size="lg"
            />

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} title="Validation Error" color="red" variant="filled">
                {error}
              </Alert>
            )}

            {!validationComplete && (
              <Button 
                type="submit" 
                fullWidth 
                mt="md" 
                loading={loading}
                leftIcon={<IconCheck size={18} />}
                size="lg"
              >
                Validate URL
              </Button>
            )}
          </Stack>
        </form>

        {(loading || validationComplete) && (
          <>
            <Divider label="Validation Process" labelPosition="center" my="lg" />
            
            <Stepper active={activeStep} orientation="vertical" size="sm">
              {validationSteps.map((step, index) => (
                <Stepper.Step
                  key={step.id}
                  label={step.title}
                  description={step.description}
                  loading={step.status === 'loading'}
                  completed={step.status === 'success'}
                  color={step.status === 'error' ? 'red' : 'blue'}
                  icon={step.status === 'success' ? <IconCheck size={18} /> : 
                         step.status === 'error' ? <IconX size={18} /> : 
                         step.icon}
                >
                  <Box ml={10} mt={5}>
                    {step.status === 'loading' && (
                      <Progress value={100} animate size="sm" radius="xl" />
                    )}
                    {step.message && (
                      <Text size="sm" color={step.status === 'error' ? 'red' : 'dimmed'} mt={5}>
                        {step.message}
                      </Text>
                    )}
                  </Box>
                </Stepper.Step>
              ))}
            </Stepper>
          </>
        )}

        {validationSuccess && (
          <Card shadow="sm" p="lg" mt="xl" radius="md" withBorder>
            <Card.Section bg="green.7" p="md">
              <Group position="apart">
                <Text color="white" weight={700}>Validation Successful</Text>
                <Badge color="green" variant="filled">Ready to Create</Badge>
              </Group>
            </Card.Section>
            
            <Text mt="md" size="sm">
              All validation checks have passed. You can now create a project for this website.
            </Text>
            
            <List spacing="xs" size="sm" mt="md" center icon={
              <ThemeIcon color="teal" size={20} radius="xl">
                <IconCheck size={12} />
              </ThemeIcon>
            }>
              <List.Item>URL format is valid</List.Item>
              <List.Item>Website is reachable</List.Item>
              <List.Item>Security checks passed</List.Item>
              <List.Item>Crawling is allowed by robots.txt</List.Item>
            </List>
            
            <Group position="apart" mt="xl">
              <Button variant="outline" onClick={resetValidation}>
                Try Another URL
              </Button>
              <Button onClick={handleCreateProject} rightIcon={<IconArrowRight size={16} />}>
                Create Project
              </Button>
            </Group>
          </Card>
        )}

        {validationComplete && !validationSuccess && (
          <Card shadow="sm" p="lg" mt="xl" radius="md" withBorder>
            <Card.Section bg="red.7" p="md">
              <Group position="apart">
                <Text color="white" weight={700}>Validation Failed</Text>
                <Badge color="red" variant="filled">Action Required</Badge>
              </Group>
            </Card.Section>
            
            <Text mt="md" size="sm">
              Some validation checks have failed. Please address the issues below:
            </Text>
            
            <List spacing="xs" size="sm" mt="md" center>
              {validationSteps.map(step => (
                step.status === 'error' && (
                  <List.Item key={step.id} icon={
                    <ThemeIcon color="red" size={20} radius="xl">
                      <IconX size={12} />
                    </ThemeIcon>
                  }>
                    <Group spacing={5}>
                      <Text>{step.title}:</Text>
                      <Text color="red">{step.message}</Text>
                    </Group>
                  </List.Item>
                )
              ))}
            </List>
            
            <Group position="center" mt="xl">
              <Button variant="outline" onClick={resetValidation}>
                Try Again
              </Button>
            </Group>
          </Card>
        )}

        <Box mt="xl">
          <Divider my="md" />
          <Group spacing="xs">
            <IconInfoCircle size={16} color="gray" />
            <Text size="xs" color="dimmed">
              URL validation ensures the website can be properly crawled and analyzed. All data is processed securely.
            </Text>
          </Group>
        </Box>
      </Paper>

      <Paper radius="md" p="xl" withBorder mt="xl">
        <Title order={3} mb="md">
          URL Validation Requirements
        </Title>
        
        <List spacing="md">
          <List.Item 
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconWorld size={16} />
              </ThemeIcon>
            }
          >
            <Text weight={500}>Valid URL Format</Text>
            <Text size="sm" color="dimmed">
              Must start with http:// or https:// and be a properly formatted URL
            </Text>
          </List.Item>
          
          <List.Item 
            icon={
              <ThemeIcon color="green" size={24} radius="xl">
                <IconCheck size={16} />
              </ThemeIcon>
            }
          >
            <Text weight={500}>Website Reachability</Text>
            <Text size="sm" color="dimmed">
              The website must be accessible and respond to requests
            </Text>
          </List.Item>
          
          <List.Item 
            icon={
              <ThemeIcon color="indigo" size={24} radius="xl">
                <IconLock size={16} />
              </ThemeIcon>
            }
          >
            <Text weight={500}>Security Requirements</Text>
            <Text size="sm" color="dimmed">
              HTTPS is required for secure communication
            </Text>
          </List.Item>
          
          <List.Item 
            icon={
              <ThemeIcon color="orange" size={24} radius="xl">
                <IconRobot size={16} />
              </ThemeIcon>
            }
          >
            <Text weight={500}>Robots.txt Compliance</Text>
            <Text size="sm" color="dimmed">
              The website must allow crawling in its robots.txt file
            </Text>
          </List.Item>
        </List>
        
        <Alert icon={<IconAlertTriangle size={16} />} title="Need help?" color="yellow" variant="light" mt="xl">
          <Text size="sm">
            If you're having trouble with URL validation, make sure your website is publicly accessible and uses HTTPS.
            For testing, try using <Tooltip label="Will pass validation"><Text span color="blue">https://example.com</Text></Tooltip> or <Tooltip label="Will fail validation"><Text span color="red">http://no-https-example.com</Text></Tooltip>
          </Text>
        </Alert>
      </Paper>
    </Container>
  );
};

export default NewProject;
