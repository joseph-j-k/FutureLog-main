
// import { styled } from '@mui/material/styles';
import * as React from 'react';


import { Box,Card,Stack,Button, Typography, formControlClasses, TextField } from "@mui/material";
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

 
const Requests = () => {

return(
    <Box sx={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }} component={"form"} >
    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '1000px', height: 700 }}>
    
        <Stack direction={'column'} spacing={4}>
        <Typography variant="h3" sx={{ m: 4 }}>
            Request
        </Typography>
        <TextField id="standard-basic"  type="date" variant="standard" />
<Button variant="contained" type="submit">Save</Button>

            </Stack>
        </Card>
  
        
    </Box>
)
}
export default Requests