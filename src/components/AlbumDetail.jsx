import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Typography, ListItem, Box, CircularProgress } from '@mui/material'

const AlbumDetail = () => {
  const { id } = useParams()
  const [album, setAlbum] = useState(null)
  const [photos, setPhotos] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumResponse = await fetch(
          `https://jsonplaceholder.typicode.com/albums/${id}`
        )
        if (!albumResponse.ok) {
          navigate('/notfound')
          return
        }
        const albumData = await albumResponse.json()
        setAlbum(albumData)

        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${albumData.userId}`
        )
        if (!userResponse.ok) {
          navigate('/notfound')
          return
        }
        const userData = await userResponse.json()
        setUser(userData)

        const photosResponse = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
        )
        const photosData = await photosResponse.json()
        setPhotos(photosData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  if (loading)
    return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />

  if (!album || !user) return null

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box textAlign="left" width="50%" marginBottom="1.5em">
        <Typography variant="h5">{album.title}</Typography>
        <Typography variant="body2">
          Created by: <Link to={`/user/${album.userId}`}>{user.name}</Link>
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.5em',
          width: '50%',
          maxHeight: '500px',
          overflowY: 'auto',
        }}
      >
        {photos.map((photo) => (
          <ListItem
            key={photo.id}
            style={{ padding: 0, display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ width: '100%', height: 'auto' }}
            />
          </ListItem>
        ))}
      </Box>
    </Box>
  )
}

export default AlbumDetail
