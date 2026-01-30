import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Container,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Chip,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = ['Sign In', 'Choose Role', 'Get Started'];

const RoleSelect = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [hoveredRole, setHoveredRole] = useState(null);

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      subtitle: 'Shop & Order',
      description: 'Browse products, place orders, and track deliveries from the comfort of your home.',
      icon: <ShoppingCartIcon sx={{ fontSize: 48 }} />,
      color: 'primary',
      path: '/customer/dashboard',
      features: ['Easy ordering', 'Real-time tracking', 'Secure payments'],
    },
    {
      id: 'seller',
      title: 'Seller',
      subtitle: 'Manage Store',
      description: 'List your products, manage orders, and grow your business with our platform.',
      icon: <StoreIcon sx={{ fontSize: 48 }} />,
      color: 'secondary',
      path: '/seller/dashboard',
      features: ['Product management', 'Order processing', 'Analytics dashboard'],
    },
    {
      id: 'delivery',
      title: 'Delivery Partner',
      subtitle: 'Earn & Deliver',
      description: 'Pick up orders and deliver them to customers while earning competitive rates.',
      icon: <LocalShippingIcon sx={{ fontSize: 48 }} />,
      color: 'success',
      path: '/delivery/dashboard',
      features: ['Flexible hours', 'Real-time navigation', 'Instant payouts'],
    },
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role.id);
    // Simulate a brief delay for better UX
    setTimeout(() => {
      navigate(role.path);
    }, 500);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              mb: 3,
              mx: 'auto',
              boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)',
            }}
          >
            🚚
          </Avatar>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #2563eb 30%, #f59e0b 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Choose Your Role
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4, fontWeight: 400 }}
          >
            Select how you'd like to use DeliverX
          </Typography>

          {/* Progress Indicator */}
          <Paper
            sx={{
              p: 2,
              mb: 4,
              maxWidth: 400,
              mx: 'auto',
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: 500,
                        fontSize: '0.875rem',
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Box>

        {/* Role Cards */}
        <Grid container spacing={4} justifyContent="center">
          {roles.map((role) => (
            <Grid item xs={12} md={4} key={role.id}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: selectedRole === role.id ? `3px solid ${role.color}.main` : '1px solid transparent',
                  backgroundColor: selectedRole === role.id ? `${role.color}.light` : 'white',
                  transform: hoveredRole === role.id ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: hoveredRole === role.id
                    ? `0 20px 40px rgba(0, 0, 0, 0.15)`
                    : `0 4px 20px rgba(0, 0, 0, 0.08)`,
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.15)`,
                  },
                }}
                onClick={() => handleRoleSelect(role)}
                onMouseEnter={() => setHoveredRole(role.id)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                {selectedRole === role.id && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                    }}
                  >
                    <CheckCircleIcon sx={{ color: `${role.color}.main`, fontSize: 32 }} />
                  </Box>
                )}

                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 4,
                    minHeight: 320,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: `${role.color}.main`,
                      width: 80,
                      height: 80,
                      mb: 3,
                      boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15)`,
                      transition: 'transform 0.3s ease',
                      transform: hoveredRole === role.id ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    {role.icon}
                  </Avatar>

                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: selectedRole === role.id ? `${role.color}.dark` : 'text.primary',
                    }}
                  >
                    {role.title}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 2,
                      color: `${role.color}.main`,
                      fontWeight: 600,
                    }}
                  >
                    {role.subtitle}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      lineHeight: 1.6,
                      flexGrow: 1,
                    }}
                  >
                    {role.description}
                  </Typography>

                  {/* Features */}
                  <Box sx={{ width: '100%', mb: 3 }}>
                    {role.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        size="small"
                        variant="outlined"
                        sx={{
                          mr: 1,
                          mb: 1,
                          borderColor: `${role.color}.light`,
                          color: `${role.color}.dark`,
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    variant={selectedRole === role.id ? 'contained' : 'outlined'}
                    color={role.color}
                    fullWidth
                    size="large"
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: 'none',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 25px rgba(0, 0, 0, 0.15)`,
                      },
                    }}
                  >
                    {selectedRole === role.id ? 'Getting Started...' : `Continue as ${role.title}`}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            You can switch roles anytime from your dashboard settings
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default RoleSelect;