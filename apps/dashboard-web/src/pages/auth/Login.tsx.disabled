import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Text,
  Anchor,
  Stack,
  Divider,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconBrandGoogle, IconBrandGithub } from 'tabler-icons-react';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the redirect path from location state or default to dashboard
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password should be at least 6 characters'),
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication logic
      if (values.email === 'demo@example.com' && values.password === 'password123') {
        // In a real app, we would:
        // 1. Store the token in localStorage/cookies
        // 2. Update auth context
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('user', JSON.stringify({ name: 'Demo User', email: values.email }));
        
        // Redirect to the page user was trying to access, or dashboard
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Try demo@example.com / password123');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="md">
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Authentication Error" color="red" variant="filled">
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

        <PasswordInput
          required
          label="Password"
          placeholder="Your password"
          {...form.getInputProps('password')}
          disabled={loading}
        />

        <Group position="apart" mt="sm">
          <Checkbox
            label="Remember me"
            {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            disabled={loading}
          />
          <Anchor component={Link} to="/auth/forgot-password" size="sm">
            Forgot password?
          </Anchor>
        </Group>

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Sign in
        </Button>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <Group grow mb="md" mt="md">
          <Button
            variant="outline"
            leftIcon={<IconBrandGoogle size={16} />}
            onClick={() => setError('Social login is not implemented in this demo')}
          >
            Google
          </Button>
          <Button
            variant="outline"
            leftIcon={<IconBrandGithub size={16} />}
            onClick={() => setError('Social login is not implemented in this demo')}
          >
            GitHub
          </Button>
        </Group>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don't have an account?{' '}
          <Anchor component={Link} to="/auth/signup" size="sm">
            Create account
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
};

export default Login;
