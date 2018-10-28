import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import ConnectedServiceIcon from './ConnectedServiceIcon';
import Edit from 'react-feather/dist/icons/edit';


class ArtistCard extends React.Component {

  renderMedia(props) {
    return (
      <CardMedia className={props.classes.media} image={props.image} title={props.artist}>
        {(props.onTour && (
          <div style={{position: 'relative', height: '100%'}}>
            <Typography variant="caption" align="left" className={props.classes.tourlabel}>
              On Tour
            </Typography>
          </div>
        ))}
      </CardMedia>
    )
  }
  renderSocialService(name, service_url, service_metric, props) {
    const url = service_url != "" ? service_url : undefined;
    const metric = service_metric != "" ? service_metric : undefined;
    const activeClass = url ? props.classes.serviceConnected : '';
    const serviceClasses = `${props.classes.service} ${activeClass}`;

    const base = (
      <ButtonBase disabled={url ? false : true} className={props.classes.serviceButton}>
        <Paper elevation="0" className={serviceClasses}>
          <ConnectedServiceIcon className={props.classes.padTopSm} service={name} active={url ? true : false} />
          {metric 
            ? (<Typography variant="body1" className={props.classes.stat} noWrap>{metric}</Typography>)
            : (<Typography variant="body1" className={props.classes.disabledColor}>—</Typography>)
          }
        </Paper>
      </ButtonBase>  
    )

    if (url) {
      return (
        <Grid key={name} item align="center">
          <a href={url} className={props.classes.serviceLink}>
            {base}
          </a>
        </Grid>
      )
    } else {
      return (
        <Grid key={name} item align="center">
          {base}
        </Grid>
      )
    }
  }
  render() {
    const { 
      classes, 
      editable, 
      inReview, 
      artist,
      tagline,
      genres,
      website,
      hometown,
      state,
      facebook,
      facebookMetric,
      instagram,
      instagramMetric,
      spotify,
      spotifyMetric,
    } = this.props;
    return (
      <Card elevation="8" className={classes.card}>
        {inReview && (
          this.renderMedia(this.props)
        )}
        <CardContent className={classes.content}>
          {editable && (
            <Grid container wrap="nowrap" spacing={8} justify="space-between">
              <Grid item>
                <Typography variant="title" component="h2" align="left">
                  {artist}
                </Typography>
              </Grid>
              <Grid item>
                <ButtonBase className={classes.editIcon}>
                  <Edit size={22} />
                </ButtonBase>
              </Grid>
            </Grid>
          )}
          {!editable && (
            <Typography variant="title" component="h2" align="left" style={{fontWeight: 400}}>
              {artist}
            </Typography>
          )}
          <Typography gutterBottom variant="caption" style={{textTransform: 'uppercase', marginTop: '4px'}} noWrap color="grey" align="left">
            {genres.join(', ')}
          </Typography>
          <Typography variant="body1" align="left" style={{paddingTop: '8px'}}>
            {tagline}
          </Typography>
        </CardContent>
        <Grid container className={classes.audience} spacing={16} gutterBottom>
          <Grid item xs={12}>
            <Grid container className={classes.demo} justify="center" spacing={16}>
              {this.renderSocialService("facebook",facebook,facebookMetric,this.props)}
              {this.renderSocialService("instagram",instagram,instagramMetric,this.props)}
              {this.renderSocialService("spotify",spotify,spotifyMetric,this.props)}
            </Grid>
          </Grid>
        </Grid>
        <Divider/>
        <CardContent className={`${classes.meta}`}>
          <Grid container spacing={8} justify='space-between'>
            <Grid item>
              <Typography component="p" variant="caption" noWrap align="left">
                {hometown}, {state}
              </Typography>
            </Grid>
            <Grid item className={classes.websiteMeta}>
              <Typography component="p" variant="caption" align="right">
                <a href={website} target="_blank">Website</a>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {!inReview && (
          this.renderMedia(this.props)
        )}
        {(inReview && (
          <React.Fragment>
            <Divider/>
            <Grid container spacing={0}>
              <Grid className={classes.reviewAction} item xs={6} spacing={0}>
                <a href='#'>
                  <ButtonBase className={classes.actions} style={{borderRight: '1px solid rgba(0,0,0,0.1)'}}>
                    <Typography className={classes.actionLabels} variant="button" align="center">
                      Book
                    </Typography>
                  </ButtonBase>
                </a>
              </Grid>
              <Grid className={classes.reviewAction} item xs={6} spacing={0}>
                <a href='#'>
                  <ButtonBase className={classes.actions}>
                    <Typography className={classes.actionLabels} variant="button" align="center">
                      Pass
                    </Typography>
                  </ButtonBase>
                </a>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
      </Card>
    );
  }
}
  
const styles = theme => ({
    card: {
      width: '235px',
      margin: '20px',
      '& > hr': {
        opacity: '0.5',
      },
    },
    editIcon: {
      padding: theme.spacing.unit / 2,
      borderRadius: '4px',
      marginRight: `-${theme.spacing.unit}px`,
      marginTop: `-${theme.spacing.unit/2}px`,
      color: theme.palette.grey[400],
      '&:hover': {
        color: theme.palette.grey[600],
      },
      '&:active': {
        color: theme.palette.primary.main,
      },
    },
    padTopSm: {
      paddingTop: theme.spacing.unit / 2
    },
    media: {
      marginTop: '0px',
      height: 110,
      backgroundColor: theme.palette.grey[200],
    },
    gridRoot: {
      flexGrow: 1,
    },
    audience: {
      marginBottom: theme.spacing.unit / 2,
    },
    disabledColor: {
      color: theme.palette.grey[200],
      marginTop: 4,
    },
    service: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit / 2,
      width: 48,
    },
    serviceConnected: {
      // borderRadius: theme.shape.borderRadius,
      borderRadius: '4px',
      '&:hover': {
        cursor: 'pointer',
      } 
    },
    serviceButton: {
      // borderRadius: theme.shape.borderRadius,
      borderRadius: '4px',
      color: theme.palette.grey[400],
    },
    serviceLink: {
      color: theme.palette.text.primary,
      textDecoration: 'none',
    },
    stat: {
      paddingTop: theme.spacing.unit / 2,
      fontWeight: '500'
    },
    actions: {
      padding: theme.spacing.unit * 2,
      width: '100%',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        backgroundColor: theme.palette.grey[100]
      },
    },
    actionLabels: {
      color: theme.palette.primary.main,
    },
    reviewAction: {
      '& > a': {
        textDecoration: 'none'
      }
    },
    actionContainer: {
      backgroundColor: 'rgba(0,0,0,0.1)'
    },
    tourlabel: {
      position: 'absolute',
      bottom: '6px',
      left: theme.spacing.unit * 1.5,
      textTransform: 'uppercase',
      padding: '2px 4px',
      background: theme.palette.secondary.main,
      color: 'black',
      borderRadius: '2px'
    },
    meta: {
      paddingTop: '8px',
      paddingBottom: '8px',
      marginBottom: '0px',
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2
      },
      [theme.breakpoints.up('xs')]: {
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit * 1.5,
      }
    },
    websiteMeta: {
      '& a': {
        textDecoration: 'none',
        color: theme.palette.text.secondary,
      },
      '& a:hover': {
        color: theme.palette.primary.main, 
      }
    },
    content: {
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing.unit * 1.5,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
        paddingBottom: '0px'
      },
      [theme.breakpoints.up('xs')]: {
        paddingTop: theme.spacing.unit * 1.5,
        paddingBottom: theme.spacing.unit
      }
    }
  });


export default withStyles(styles)(ArtistCard);