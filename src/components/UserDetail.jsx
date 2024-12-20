import React, { useEffect, useState } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from '@mui/material'
import { useParams, Link, useNavigate } from 'react-router-dom'

const UserDetail = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )
        if (!userResponse.ok) {
          throw new Error('Error fetching user data')
        }
        const userData = await userResponse.json()
        setUser(userData)

        const albumsResponse = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${id}`
        )
        if (!albumsResponse.ok) {
          throw new Error('Error fetching albums')
        }
        const albumsData = await albumsResponse.json()
        setAlbums(albumsData)
      } catch (error) {
        setError(error.message)
        navigate('/notfound')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  if (loading) return <CircularProgress />

  if (error) {
    return (
      <Box>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    )
  }

  if (!user) return null

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box width="70%">
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2">Username: {user.username}</Typography>
        <Typography variant="body2">
          Email:{' '}
          <Link href={`mailto:${user.email}`} color="grey">
            {user.email}
          </Link>
        </Typography>
        <Typography variant="body2">Phone: {user.phone}</Typography>
        <Typography variant="body2">
          Website:{' '}
          <Link
            href={`http://${user.website}`}
            color="grey"
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.website}
          </Link>
        </Typography>
        <Typography variant="h5" sx={{ padding: '1.5em 0 0 0' }}>
          Albums
        </Typography>
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
                paddingBottom: '0',
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

export default UserDetail
