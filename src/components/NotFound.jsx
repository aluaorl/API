import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'

const NotFound = () => {
  return (
    <Box textAlign="center" marginTop="2em">
      <Typography variant="h2">404 - Not Found</Typography>
      <Typography variant="body1" marginTop="1em" marginBottom="6em">
        Go to page&nbsp;
        <Link to="/albums" style={{ textDecoration: 'none', color: 'blue' }}>
          Albums
        </Link>
      </Typography>
    </Box>
  )
}

export default NotFound
