import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Divider,
  Typography,
  Box,
} from '@mui/material'
import UsersList from './components/UsersList'
import UserDetail from './components/UserDetail'
import AlbumsList from './components/AlbumsList'
import AlbumDetail from './components/AlbumDetail'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Router>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box display="flex" gap="1em">
            <NavLink
              to="/albums"
              style={({ isActive }) => ({ textDecoration: 'none' })}
            >
              {({ isActive }) => (
                <Button
                  sx={{
                    textTransform: 'none',
                    border: 'none',
                    color: isActive ? 'black' : 'gray',
                  }}
                >
                  Albums
                </Button>
              )}
            </NavLink>
            <NavLink
              to="/"
              style={({ isActive }) => ({ textDecoration: 'none' })}
            >
              {({ isActive }) => (
                <Button
                  sx={{
                    textTransform: 'none',
                    border: 'none',
                    color: isActive ? 'black' : 'gray',
                  }}
                >
                  Users
                </Button>
              )}
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/albums" element={<AlbumsList />} />
        <Route path="/album/:id" element={<AlbumDetail />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '70%',
          margin: '1em auto',
        }}
      >
        <Divider sx={{ width: '100%', marginBottom: '1em' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            color: 'grey',
          }}
        >
          <Typography variant="body2">Created by: Alina Orlovich</Typography>
          <Typography variant="body2">BSU 2024</Typography>
        </Box>
      </Box>
    </Router>
  )
}

export default App
