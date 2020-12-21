import {
    makeStyles
  } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    card: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: '20px',
    },
    content: {
      flex: '1 0 auto',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    cover: {
      width: 151,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
}));