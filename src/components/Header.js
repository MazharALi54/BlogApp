import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Box, AppBar, Toolbar, Button, Typography, Tabs, Tab} from '@mui/material'
import { authActions } from '../redux/store'
import toast from 'react-hot-toast'

function Header() {
  let isLogin = useSelector(state=>state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();

  //logout
  const handleLogout = ()=>{
    try {
      dispatch(authActions.logout());
      toast.success("Logout successfully");
      navigate('/login');
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <AppBar position='sticky'>
        <Toolbar>
            <Typography variant='h4'>Blog App</Typography>
            {isLogin && (
              <Box  display={'flex'} marginaLeft={"auto"} marginRight={'auto'}>
              <Tabs textColor='inherit' value={value} onChange={(e,val)=>{setValue(val)}}>
                <Tab label = "Blogs" LinkComponent={Link} to="/blogs"/>
                <Tab label = "My Blogs" LinkComponent={Link} to="/my-blogs"/>
                <Tab label = "Create Blog" LinkComponent={Link} to="/create-blog"/>
              </Tabs>
            </Box>
            )}
            <Box display={'flex'} marginLeft={"auto"}>
                {!isLogin && (
                  <>
                    <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to="/login">Login</Button>
                <Button sx={{margin:1, color:'white'}} LinkComponent={Link} to="/register">Register</Button>
                  </>
                )}
                {isLogin && <Button onClick={handleLogout} sx={{margin:1, color:'white'}}>Logout</Button>}
            </Box>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header