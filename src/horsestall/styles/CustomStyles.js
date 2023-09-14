//import { makeStyles } from "@mui/styles";
import { makeStyles } from '@mui/styles';
// import bg from '../../img/myHorsesBg.jpg';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',

    zIndex: '1',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // width: 'calc(100vw - 16px)',
    width: '100%',
    height: '100%',

    // padding:'0 8px',
    // backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0 0',
    backgroundSize: 'cover',
    color: '#fff',
    '@media all and (min-width:1120px)': {
      minHeight: 'auto',
      flexDirection: 'row',
      // justifyContent:'space-evenly',
      // backgroundImage:'none',
    },
  },
  pcStyle: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent:'space-around',
    width: '50%',
  },
  flexcenter: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
  },
  imgstyle: {
    '@media all and (min-width:1120px)': {
      width: '80%',
    },
    '@media all and (max-width:340px)': {
      maxWidth: 310,
    },
  },
  itemContainer: {
    maxWidth: 1024,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media all and (min-width:1120px)': {
      maxWidth: 1100,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    '@media all and (max-width:520px)': {
      alignItems: 'unset',
    },
    zIndex: '2',
  },
  tabs: {
    display: 'block',
    minHeight: 'auto!important',
    textTransform: 'uppercase',

    '& .MuiTabs-flexContainer': {
      paddingTop: 4,
    },
    '& .MuiTab-root': {
      // minWidth:82,
      width: 82,
      minHeight: 32,
      padding: '0 1rem',
      marginLeft: -1,
      color: '#5B5B5B',
      backgroundColor: '#191d2c',
      border: '1px solid #7d7f89',

      '&:first-child': {
        marginLeft: 0,
      },
      '&:last-child': {
        borderRadius: '0 2px 0 0',
      },
    },
    '& .MuiTab-root.Mui-selected': {
      marginTop: -4,
      color: '#fff',
      fontWeight: 800,
      backgroundColor: '#283151',
      border: '2px solid #7d7f89',
      borderRadius: '2px 2px 0 0',
    },
    '& .MuiTabs-indicator': {
      display: 'none',
    },
    '@media all and (min-width:1120px)': {
      position: 'absolute',
      marginLeft: '-90px',
      // width:100,
      '& .MuiTab-root': {
        marginLeft: 0,
        minHeight: 48,
        border: '0 none',
      },
      '& .MuiTab-root.Mui-selected': {
        border: '0 solid #7d7f89',
        borderRight: '2px solid #7d7f89',
      },
    },
  },
  contents: {
    position: 'none',
    zIndex: 'Box',
    maxHeight: '55vh',
    backgroundColor: '#0f0f1a',
    border: '1px solid #57585f',
    padding: 10,
    zIndex: '2',
    '@media all and (min-width:1120px)': {
      maxHeight: '100%',
    },
  },

  buttonStyle: {
    display: 'flex!important',
    width: 'calc(100% - 24px)',
    backgroundColor: '#263542!important',
    color: '#44EAC5!important',
    borderRadius: '6px!important',

    margin: '10px 12px!important',
    '@media all and (min-width:1120px)': {
      // width:'calc(100% - 74px)!important',
      margin: '10px 10 10px auto !important',
    },
    '@media all and (min-width:1634px)': {
      // width:'calc(100% - 82px)!important',
      margin: '10px 10 10px auto !important',
    },
  },
  modalStyle: {
    backgroundColor: '#232B36',
    color: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 280,
    boxShadow: 24,
    borderRadius: 12,
    padding: 24,
  },
  activeBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 16,
    '& > button': {
      textTransform: 'uppercase',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  btnCancel: {
    color: '#FE4C6A!important',
  },
  btnComfirm: {
    color: '#44EAC5!important',
  },
  modalTitle: {
    fontSize: '1.125rem!important',
    marginBottom: '16px!important',
  },
  modalInput: {
    '& .MuiInputBase-root': {
      backgroundColor: 'rgb(145 158 171 / 8%)',
      color: '#fff',
      borderRadius: 6,
      '& fieldset': {
        border: '0 none',
      },
    },
  },
}));
