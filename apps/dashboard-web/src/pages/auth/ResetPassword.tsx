import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {
  PasswordInput,
  Button,
  Group,
  Text,
  Anchor,
  Stack,
  Alert,
  Paper,
  Center,
  Title,
  Progress,
  Popover,
  PasswordInputProps,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconCheck, IconX } from 'tabler-icons-react';

// Password strength indicator
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />} <span style={{ marginLeft: 10 }}>{label}</span>
    </Text>
  );
}

// Password strength checker
function PasswordStrength(props: PasswordInputProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const { value } = props;
  
  const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
  ];

  const getStrength = () => {
    let multiplier = value.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(value)) {
        multiplier += 1;
      }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
  };

  const strength = getStrength();
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));
  
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            {...props}
            description="Strong password should include letters in lower and uppercase, at least 1 number, and at least 1 special character"
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <div style={{ marginBottom: 10 }}>
          <Group spacing={5} grow mb={10}>
            {bars}
          </Group>
          <PasswordRequirement label="Minimum 8 characters" meets={value.length > 7} />
          {checks}
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  
  // Get token from URL
  const token = searchParams.get('token');
  
  useEffect(() => {
    // In a real app, we would validate the token with the backend
    // For demo purposes, we'll just check if a token exists
    if (!token) {
      setTokenValid(false);
      setError('Invalid or expired password reset link. Please request a new one.');
    }
  }, [token]);

  const form = useForm<ResetPasswordFormValues>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value.length >= 8 ? null : 'Password should be at least 8 characters'),
      confirmPassword: (value, values) => 
        value === values.password ? null : 'Passwords do not match',
    },
  });

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock password reset
      // In a real app, this would:
      // 1. Send the new password and token to an API endpoint
      // 2. Handle the response and errors
      
      // For demo, just show success message
      setSuccess(true);
      form.reset();
    } catch (err) {
      setError('An error occurred while resetting your password. Please try again.');
      console.error('Password reset error:', err);
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
          Password Reset Successful
        </Title>
        <Text align="center" mt="md">
          Your password has been successfully reset. You can now log in with your new password.
        </Text>
        <Group position="center" mt="xl">
          <Button component={Link} to="/auth/login" variant="filled">
            Go to Login
          </Button>
        </Group>
      </Paper>
    );
  }

  if (!tokenValid) {
    return (
      <Paper radius="md" p="xl" withBorder>
        <Alert icon={<IconAlertCircle size={24} />} title="Invalid Reset Link" color="red" variant="filled">
          {error}
        </Alert>
        <Group position="center" mt="xl">
          <Button component={Link} to="/auth/forgot-password" variant="filled">
            Request New Reset Link
          </Button>
        </Group>
      </Paper>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="md">
        <Title order={3} align="center">
          Reset Password
        </Title>
        
        <Text color="dimmed" size="sm" align="center">
          Enter your new password below
        </Text>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="filled">
            {error}
          </Alert>
        )}

        <PasswordStrength
          required
          label="New Password"
          placeholder="Enter your new password"
          {...form.getInputProps('password')}
          disabled={loading}
        />

        <PasswordInput
          required
          label="Confirm Password"
          placeholder="Confirm your new password"
          {...form.getInputProps('confirmPassword')}
          disabled={loading}
        />

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Reset Password
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

export default ResetPassword;
