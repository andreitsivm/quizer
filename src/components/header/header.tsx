import { Routes } from '@quizer/config/app';
import Link from 'next/link';
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

const Header = () => {
  return (
    <AppBar position="static" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box component={Link} href={Routes.home} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <QuizIcon sx={{ mr: 1, fontSize: 30 }} />
          <Typography variant="h6" component="div" fontWeight="bold">
            English Quiz Generator
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            href={Routes.home}
            sx={{ fontWeight: 500 }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            href={Routes.singleChoiceQuiz}
            variant="outlined"
            sx={{ 
              fontWeight: 500,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Create Quiz
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
