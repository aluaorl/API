import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

const AlbumsList = () => {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching data')
        }
        return response.json()
      })
      .then((data) => {
        setAlbums(data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxHeight: '500px',
        overflowY: 'auto',
      }}
    >
      <Box width="70%">
        <List>
          {albums.map((album) => (
            <ListItem
              component={Link}
              to={`/album/${album.id}`}
              key={album.id}
              sx={{
                textDecoration: 'underline',
                color: 'black',
                '&:hover': {
                  color: 'blue',
                },
                padding: '0.1em 0',
              }}
            >
              <ListItemText primary={`📓 ${album.title}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default AlbumsList
