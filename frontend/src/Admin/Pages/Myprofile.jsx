import { Avatar, Box, Card, Stack, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";

const Myprofile = () => {
  return (
    <div>
      <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
      >
        <Card
          sx={{
            display: "flex",
            height: 300,
            width: 500,
            justifyContent: "center",
            px: 5,
          }}
        >
          <Box>
            <Stack spacing={2} direction="column" sx={{ m: 2 }}>

              <Typography
               variant="h4" sx={{ m: 4 }}
              >
                Myprofile
              </Typography>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>

              <Typography
               variant="h6" sx={{ m: 4 }}
              >
                  Name:Karthika Bose
              </Typography>
              <Typography
               variant="h6" sx={{ m: 4 }}
              >
                Email:karthikabose@gmail.com
              </Typography>
              <Typography
               variant="h6" sx={{ m: 4 }}
              >
                Address:sanfancisco
              </Typography>
             
             
            </Stack>
          </Box>
        </Card>
      </Box>
    </div>
  );
};
export default Myprofile;
