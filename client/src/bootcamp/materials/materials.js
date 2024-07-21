import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardContent, CardMedia, Container, Grid, IconButton, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Actions } from '../../actions/actions';
import { OpenFile } from '../../actions/openfile';
import { MaterialModel } from './materialmodel';
import './materials.css';
import theme from './theme';

export const Materials = () => {
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [show, setShow] = useState(false)
  const [type, setType] = useState()
  const [load, setLoad] = useState(false)
  const user = useSelector((state) => state.user?.auth)

  const fecthData = async () => {
    await Actions.AllMaterials().then((res) => { setData(res?.data); setLoad(true) }).catch((e) => console.log(e))
  }

  const fetchImageURL = async (link) => {
    try {
      const imageUrl = await OpenFile(link);
      setImage(state => ({ ...state, [link]: imageUrl?.url }))
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };

  const openFile = async (link) => {
    try {
      setShow(true)
      const file = await OpenFile(link);
      setImage(file?.url)
      setType(file?.type)
    } catch (error) {

    }
  }

  useEffect(() => {
    fecthData()
  }, [])

  return (
    <>
      <MaterialModel open={show} close={() => { setShow(false); setImage('') }} fileType={type} fileUrl={image} imageContent={image} />
      <ThemeProvider theme={theme}>
        <Container>
          {load ? <Grid container spacing={2}>
            {data?.map((card, index) => (
              card?.Show && <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Typography textAlign={"center"} variant="h5"><strong>{card?.Theme}</strong></Typography>
                </Grid>
                {card?.Links?.map((link, linkIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={linkIndex}>
                    <Card>
                      <CardMedia
                        component="img"
                        style={{ height: '30vh' }}
                        image={image ? image[link?.Photoname] : fetchImageURL(link?.Photoname)}
                        alt={link.Photoname}
                        width="50"
                        height="100%"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {link.Name}
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                          <IconButton
                            aria-label="like"
                            onClick={() => { Actions.Likes(card?.Theme, user, linkIndex).then((res) => res?.data && fecthData()).catch((e) => console.log(e)) }}
                          >
                            {link?.Likes?.includes(user) ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon />
                            )}{link?.Likes?.length || 0}
                          </IconButton>
                          <IconButton onClick={() => { openFile(link?.Pdfname); Actions?.Views(card?.Theme, linkIndex).then((res) => res?.data && fecthData()).catch((e) => console.log(e)) }}>
                            <VisibilityIcon id='viewicon' />{link?.Views || 0}
                          </IconButton>
                          <IconButton onClick={() => { openFile(link?.Pdfname); Actions?.Views(card?.Theme, linkIndex).then((res) => res?.data && fecthData()).catch((e) => console.log(e)) }}>
                            <DownloadIcon id='download' />
                          </IconButton>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid> : <p>loading.....</p>}
        </Container>
      </ThemeProvider>
    </>
  );
};