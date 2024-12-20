import React, { useEffect, useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%">
      <Box width="70%">
        <List>
          {users.map((user) => (
            <ListItem
              component={Link}
              to={`/user/${user.id}`}
              key={user.id}
              sx={{
                textDecoration: 'underline',
                color: 'black',
                '&:hover': {
                  color: 'blue',
                },
                p: '0.1em 2em',
              }}
            >
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

export default UsersList
