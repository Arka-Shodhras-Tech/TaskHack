// import React from "react";
// import './materials.css'
// export const Materials = () =>{
//     return(
//         <>
//         <div className="materials-container1">
//             <h1>Materials and Sources</h1>
//             <div className="materials-container2">
//             <h2>Materials📄</h2>
//             <table className="table-align">
//                 <thead>
//                     <th>S.No</th>
//                     <th>Materials📄</th>
//                 </thead>
//                 <tbody>
//                 <tr >
//                 <td> 1</td>
//                 <td>pdf</td>
//                 </tr>
//                 </tbody>
//             </table>
//             </div>
//             </div>
//             <div className="materials-container1">
//             <h1></h1>
//             <div className="materials-container2">
//             <h2>Sources🔗</h2>
//             <table className="table-align">
//                 <thead>
//                     <th>S.No</th>
//                     <th>Sources🔗</th>
//                 </thead>
//                 <tbody>
//                 <tr >
//                 <td> 1</td>
//                 <td>Link</td>
//                 </tr>
//                 </tbody>
//             </table>
//             </div>
//             </div>
//         </>
//     )
// }


// import React from 'react';
// export const Materials=()=> {
//   return (
//     <>

//     </>
//   );
// }




// import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
// import theme from './theme';

// const cardData = [
//   {
//     title: 'Name',
//     description: 'This is the description for card 1.',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     title: 'Name',
//     description: 'This is the description for card 2.',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     title: 'Name',
//     description: 'This is the description for card 3.',
//     image: 'https://via.placeholder.com/150',
//   },
// ];

// export const Materials = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
//         <Grid container spacing={theme.spacing(2)}>
//           {cardData.map((card, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={card.image}
//                   alt={card.title}
                  

//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {card.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {card.description}
//                   </Typography>
                  

//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// };

// import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import { Card, CardContent, CardMedia, Typography, Grid, Container, IconButton } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import theme from './theme';

// const cardData = [
//   {
//     title: 'Name',
//     description: 'This is the description for card 1.',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     title: 'Name',
//     description: 'This is the description for card 2.',
//     image: 'https://via.placeholder.com/150',
//   },
//   {
//     title: 'Name',
//     description: 'This is the description for card 3.',
//     image: 'https://via.placeholder.com/150',
//   },
// ];

// export const Materials = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Container>
//         <Grid container spacing={theme.spacing(2)}>
//           {cardData.map((card, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={card.image}
//                   alt={card.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {card.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {card.description}
//                   </Typography>
//                   <IconButton aria-label="like">
//                     <FavoriteIcon color="secondary" />
//                   </IconButton>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// };




import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Card, CardContent, CardMedia, Typography, Grid, Container, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import theme from './theme';

const cardData = [
  {
    title: 'Name',
    description: 'This is the description for card 1.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Name',
    description: 'This is the description for card 2.',
    image: 'https://via.placeholder.com/150',
  },
  {
    title: 'Name',
    description: 'This is the description for card 3.',
    image: 'https://via.placeholder.com/150',
  },
];

export const Materials = () => {
  const [liked, setLiked] = useState(cardData.map(() => false));

  const handleLikeClick = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={theme.spacing(2)}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                  <IconButton
                    aria-label="like"
                    onClick={() => handleLikeClick(index)}
                  >
                    {liked[index] ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};






























// import React from 'react';
// import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';

// export const Materials = () =>{
//   return(
//     <>
//       <CCard style={{ width: '18rem' }}>
//   <CCardImage orientation="top" src={process.env.PUBLIC_URL + '/hackathon (1).jpg'} />
//   <CCardBody>
//     <CCardTitle>Card title</CCardTitle>
//     <CCardText>
//       Some quick example text to build on the card title and make up the bulk of the card's content.
//     </CCardText>
//     <CButton color="primary" href="#">Go somewhere</CButton>
//   </CCardBody>
// </CCard>
//     </>
//   )
// }