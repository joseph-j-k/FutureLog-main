import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box,TextField,Card,Stack,Button, Typography } from "@mui/material";
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

 
const Agency = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
return(
    <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1000px', height: 700 }}>
       
        <Stack direction={'column'} spacing={4}>
        <Typography variant="h3" sx={{ m: 4 }}>
            Agency Registration
        </Typography>
        <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(event) => setName(event.target.value)} />
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event) => setEmail(event.target.value)} />
        <TextField

          id="outlined-password-input"
          label="Password"
          type="Text"
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}

          />
           <TextField
          id="outlined-multiline-flexible"
          label="Address"
          multiline
          maxRows={4}
        />
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Upload file
  <VisuallyHiddenInput type="file" />
</Button>
<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
  Upload proof
  <VisuallyHiddenInput type="file" />
</Button>
<Button variant="contained" type="submit">Save</Button>

            </Stack>
        </Card>
        {
            name
        }
        {
            email
        }
        
           {
            password
           }
        
    </Box>
)
}
export default Agency