import React, {useEffect, useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { useStyles } from './style';

import {Grid,
       Card,
       CardActionArea, 
       CardContent, 
       CardMedia, 
       Typography, 
       Modal, 
       Backdrop,
       Fade} from '@material-ui/core/';

import Menu from '../../components/AppBar/index';
import api from '../../services/api';

export default function Trending() {
  const classes = useStyles();
  const api_key = process.env.REACT_APP_API;

  const [open, setOpen] = React.useState(false);

  const [dadosFilmes, setDadosFilmes]  = useState([{
    id: '',
    title: '',
    release_date: '',
    vote_average: '',
    poster_path: '',
    overview: '',
    vote_count: '',
  }]);

  const [viewFilmes, setViewFilmes]  = useState({
    id: '',
    title: '',
    vote_average: '',
    poster_path: '',
    overview: '',
    vote_count: '',
  });
  
  const getTrending = async () => {
    try {
    
      const data = await api.get(`/trending/movie/week?api_key=${api_key}`);
      console.log(data.data.results);

      setDadosFilmes(data.data.results);
    
    } catch (error) { }
  };

  // const getMovie = async (date) => {
  //   try {
    
  //     const data = await api.get(`/movie/${date}?api_key=${api_key}`);
  //     console.log("Dados Filme: " + data.data.results);

  //     setViewFilmes(data);

  //     console.log(viewFilmes);
    
  //   } catch (error) { }
  // };

  useEffect(() => {
    getTrending();
  }, []);

  const formatDate = (date) => {

    const mesAux = `${date.substring(5,7)}`;
    let mes = null;

    if(mesAux === "01"){
      mes = "Janeiro";
    }
    if(mesAux === "02"){
      mes = "Fevereiro";
    }
    if(mesAux === "03"){
      mes = "Março";
    }
    if(mesAux === "04") {
      mes = "Abril";
    }
    if(mesAux === "05"){
      mes = "Maio";
    }
    if(mesAux === "06"){
      mes = "Junho";
    }
    if(mesAux === "07"){
      mes = "Julho";
    }
    if(mesAux === "08"){
      mes = "Agosto";
    }
    if(mesAux === "09"){
      mes = "Setembro";
    }
    if(mesAux === "10"){
      mes = "Outubro";
    }
    if(mesAux === "11"){
      mes = "Novembro";
    }
    if(mesAux === "12"){
      mes = "Dezembro";
    }

    const formattedDate = `${date.substring(8, 10)} de ${mes} de ${date.substring(0, 4)}`;
    
    return formattedDate;
  };

  const formatImage = (date) => {
    const formattedImage = `https://image.tmdb.org/t/p/w1280${date}`;
    return formattedImage;
  };

  const handleColorNota = (status) => {
    let formattedColor = '#fff';
    if (status > 6) {
      formattedColor = '#90cea1';
    } 
    return formattedColor;
  };

  const handleOpenModal = (id, title, overview, 
    vote_average, vote_count, poster_path) => {
     
    
      viewFilmes.id = id;
      viewFilmes.title = title;
      viewFilmes.vote_average = vote_average;
      viewFilmes.poster_path = poster_path;
      viewFilmes.overview = overview;
      viewFilmes.vote_count = vote_count;
    
    setOpen(true);

    console.log(viewFilmes);

  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid item>
      </Grid>
        <Menu/>
        <Grid container spacing={3} style={{margin: '5px'}}>
          {(dadosFilmes).map(dados => {
            return(
              <Grid item xs={3} style={{marginTop: '20px'}}>
                <Card className={classes.root} key={dados.id}
                  style={{backgroundColor: handleColorNota(dados.vote_average)}}>
                  <CardActionArea onClick={() => handleOpenModal(dados.id, dados.title,
                    dados.overview, dados.vote_average, dados.vote_count, dados.poster_path)}>
                    <CardMedia
                      className={classes.media}
                      image={formatImage(dados.poster_path)}
                      title={dados.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {dados.title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        Nota: {dados.vote_average}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {formatDate(dados.release_date)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );}
          )}
          <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                viewFilmes={viewFilmes}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography component="h5" variant="h5">
                          {viewFilmes.title}
                        </Typography>
                        <Typography component="h6" variant="h6">
                          Sinopse: {viewFilmes.overview}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Nota: {viewFilmes.vote_average}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          Total de Votos: {viewFilmes.vote_count}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <img className={classes.imagemModal} src={formatImage(viewFilmes.poster_path)} alt={viewFilmes.title}/>
                      </Grid>
                    </Grid>
                  </div>
                </Fade>
              </Modal>

        </Grid>
    </div>
  );
}