import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./PropertyList.css";
import { Box } from "@mui/material";
import {useNavigate } from "react-router-dom";

const PropertyList = () => {
  const navigate = useNavigate();
  const handleViewClick = () => {
    navigate("/User/Application");
  };
  return (
    <div className="pList">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://www.dusquad.com/wp-content/uploads/2023/09/BCA-Course-1.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            BCA
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bachelor of Computer Applications (BCA): is an undergraduate degree
            program in computer applications. It covers various aspects of
            computer science, including programming, software development,
            database management, and networking.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" onClick={handleViewClick}>Apply</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://www.csit.edu.in/blog/wp-content/uploads/2020/08/b-com-course-eligibility-career-fees-benefits-and-more.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Bcom
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bachelor of Commerce (Bcom): is an undergraduate degree program in
            commerce. Bachelor of Commerce program covers a range of subjects
            related to business, finance, economics, accounting, management,
            marketing, and related fields.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" onClick={handleViewClick}>Apply</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="https://nuv.ac.in/wp-content/uploads/brochure/bsc/Banner.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            B.Sc
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bachelor of Computer Science (Bsc): is an undergraduate degree
            program in computer sciences. It is an undergraduate academic degree
            awarded to students who have completed a program of study in the
            sciences or related fields.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="small" onClick={handleViewClick}>Apply</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PropertyList;
