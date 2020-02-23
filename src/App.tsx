import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      
    },
    input:{
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
  }),
);
export default function App(props:any) {
  const classes = useStyles();

  const [limit, setLimit] = React.useState(0);
  const [bars, setBars] = React.useState([]);
  const [buttons, setButtons] = React.useState([]);
  const [selected, setSelected] = React.useState(0);
  async function fetchData() {
    try{
      const res = await fetch("https://pb-api.herokuapp.com/bars")
      const json = await res.json();
      setButtons(json.buttons);
      setLimit(json.limit);
      const barData = json.bars.map((option:any)=>{
        const childData = {
          progress : option,
          elevation : 1
        }
        return childData;
      })
      barData[0].elevation = 4;
      setBars(barData);
      
    }catch(err){
      console.log(err);
    }
  }

  React.useEffect(() => {
      fetchData();
  }, []);
  const handleRadio = (event:any) => {
    const items: any = bars.map((option:any,index:any)=>{
      if(index == event.target.value){
        return {
          progress : option.progress,
          elevation : 4
        }
      }else{
        return {
          progress : option.progress,
          elevation : 1
        }
      }
    });
    setBars(items);
    setSelected(event.target.value);
  }
  const handleClick = (event:any,val:number) =>{
    const barData:any = [...bars]
    barData[selected].progress =  barData[selected].progress + val;
    setBars(barData);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" className={`${classes.title} header-title`}>
                Progress Bar Demo
              </Typography>
              <Typography variant="caption">Limit : {limit}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                {buttons.map((option:any)=>(
                  <Button  color="inherit" onClick={(e:any) => handleClick(e,option)}>{option}</Button>
                ))}

            </Grid>
          </Grid>
          

        </Toolbar>
      </AppBar>
      <Container>
        
        <Grid container spacing={4} alignItems="center" justify="center">
          {bars.length == 0 ? 
            <Grid item className="loading">
              <CircularProgress size={100}/>
              <Typography variant="h6">Fetching Data...</Typography>
            </Grid>
          :
            bars.map((option:any, index:any)=>(
              <Grid item sm={6} xs={12}>
              <label>
              <input type="radio"  
              name="progressBar" 
              className={classes.input}
              value={index}
              onChange={handleRadio}
              />
                <Paper elevation={option.elevation}>
                  <Box p={4} m={2}  >
                    <LinearProgress variant="determinate" value={option.progress} color={option.progress > limit ? "secondary" : "primary"}/>
                    <Typography variant="subtitle1">
                      {option.progress}%
                    </Typography>
                  </Box>
                </Paper>
              </label>
            </Grid>
            ))
          }
          </Grid>
      </Container>
    </div>
  );
} 
