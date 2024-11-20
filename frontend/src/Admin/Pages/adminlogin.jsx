import React, { useState } from "react";
// import { styled } from '@mui/material/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,TextField,Card,Stack,Button } from "@mui/material";
import axios from "axios";
// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
//   });

 
const Admin = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const handleSubmit = (event) => {
      event.preventDefault()
      const postData = {
        name:name,
        email:email,
        password:password,
      }
      axios.post('http://localhost:5000/Admin',postData)
      .then((response) => {
        console.log('post request successful',response.data)
      })
      .catch((error)=>{
        console.error('error',error)
      });
    }
return(
    <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1000px', height: 700 }}component={'form'} onSubmit={handleSubmit}>
        <Stack direction={'column'} spacing={4}>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
        <TextField

          id="outlined-password-input"
          label="Password"
          type="Text"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}

          />
            <Button variant="contained" type="submit">Save</Button>
          
          </Stack>
          </Card>
        
        
          </Box>
          )
        }
        export default Admin