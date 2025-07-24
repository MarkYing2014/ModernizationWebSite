import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  PasswordInputProps,
  Progress,
  Popover,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle, IconBrandGoogle, IconBrandGithub, IconCheck, IconX } from 'tabler-icons-react';

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

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validate: {
      fullName: (value) => (value.trim().length >= 2 ? null : 'Name must be at least 2 characters'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 8 ? null : 'Password should be at least 8 characters'),
      confirmPassword: (value, values) => 
        value === values.password ? null : 'Passwords do not match',
      termsAccepted: (value) => (value ? null : 'You must accept terms and conditions'),
    },
  });

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock signup success
      // In a real app, we would:
      // 1. Send registration data to backend
      // 2. Handle verification process if needed
      // 3. Store tokens and user data
      
      // For demo, just show success and redirect
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify({ 
        name: values.fullName, 
        email: values.email 
      }));
      
      // Redirect to dashboard after successful signup
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('An error occurred during signup. Please try again.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="md">
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Registration Error" color="red" variant="filled">
            {error}
          </Alert>
        )}

        <TextInput
          required
          label="Full Name"
          placeholder="John Doe"
          {...form.getInputProps('fullName')}
          disabled={loading}
        />

        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          disabled={loading}
        />

        <PasswordStrength
          required
          label="Password"
          placeholder="Create a strong password"
          {...form.getInputProps('password')}
          disabled={loading}
        />

        <PasswordInput
          required
          label="Confirm Password"
          placeholder="Confirm your password"
          {...form.getInputProps('confirmPassword')}
          disabled={loading}
        />

        <Checkbox
          mt="md"
          label="I agree to the terms and conditions"
          {...form.getInputProps('termsAccepted', { type: 'checkbox' })}
          disabled={loading}
        />

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          Create account
        </Button>

        <Divider label="Or continue with" labelPosition="center" my="lg" />

        <Group grow mb="md" mt="md">
          <Button
            variant="outline"
            leftIcon={<IconBrandGoogle size={16} />}
            onClick={() => setError('Social signup is not implemented in this demo')}
          >
            Google
          </Button>
          <Button
            variant="outline"
            leftIcon={<IconBrandGithub size={16} />}
            onClick={() => setError('Social signup is not implemented in this demo')}
          >
            GitHub
          </Button>
        </Group>

        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor component={Link} to="/auth/login" size="sm">
            Sign in
          </Anchor>
        </Text>
      </Stack>
    </form>
  );
};

export default Signup;
