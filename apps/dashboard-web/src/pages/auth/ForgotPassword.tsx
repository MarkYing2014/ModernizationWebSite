import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextInput,
  Button,
  Group,
  Text,
  Anchor,
  Stack,
  Alert,
  Paper,
  Center,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconCheck } from 'tabler-icons-react';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Please enter a valid email address'),
    },
  });

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock password reset request
      // In a real app, this would:
      // 1. Call an API endpoint to initiate password reset
      // 2. Send a reset link to the user's email
      
      // For demo, just show success message
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError('An error occurred while processing your request. Please try again.');
      console.error('Password reset request error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Paper radius="md" p="xl" withBorder>
        <Center>
          <IconCheck size={48} color="green" />
        </Center>
        <Title order={3} align="center" mt="md">
          Reset Link Sent
        </Title>
        <Text align="center" mt="md">
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
        </Text>
        <Text size="sm" align="center" mt="xl">
          Didn't receive the email?{' '}
          <Anchor component="button" onClick={() => setSuccess(false)}>
            Try again
          </Anchor>
        </Text>
        <Group position="center" mt="md">
          <Button component={Link} to="/auth/login" variant="subtle">
            Back to login
          </Button>
        </Group>
      </Paper>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="md">
        <Title order={3} align="center">
          Forgot Password
        </Title>
        
        <Text color="dimmed" size="sm" align="center">
          Enter your email address and we'll send you a link to reset your password
        </Text>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="filled">
            {error}
          </Alert>
        )}

        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          disabled={loading}
        />

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Send Reset Link
        </Button>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          Remember your password?{' '}
          <Anchor component={Link} to="/auth/login" size="sm">
            Back to login
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
};

export default ForgotPassword;
