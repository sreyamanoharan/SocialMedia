import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from "@mui/icons-material/Comment";
import Navbar from './Navbar';
import Axios from '../axios';



      
const Feed = () => {

  const [data,setData]=useState([])

  useEffect(()=>{
  Axios.get('/get-posts').then((res)=>{
    console.log(res.data.result);
    setData(res.data.result)
    
  })
  },[])

      
    
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
  <Navbar/>
      {data?.map((dat)=>(
    
    <Card sx={{ maxWidth: 450 ,marginTop:'25px'}}>
    <CardHeader
      title={dat.user_name}
     
    />
    <CardMedia
      component="img"
      height="194"
      image={dat?.images[0]}
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {dat.caption}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon />
        <p>{dat.likes}</p>
      </IconButton>
      <IconButton aria-label="comments">
      <CommentIcon />
      <p>{dat.comments}</p>
      </IconButton>
    </CardActions>
   
  </Card>
      ))}

    </div>
  )
}

export default Feed




// import * as React from 'react';




//   return (

//   );
// }
