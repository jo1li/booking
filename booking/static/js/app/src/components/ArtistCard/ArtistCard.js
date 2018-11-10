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

import styles from './styles';
import UserEditForm from '../UserEditForm';


class ArtistCard extends React.Component {

  renderMedia(props) {
    const { classes, profile } = props;
    const { image, stage_name } = profile;

    return (
      <CardMedia className={classes.avatarSection} image={image} title={stage_name}>
        { !image ? <span className={classes.avatarStandIn}>No Photo</span> : null}
        { this.renderOnTour(props) }
      </CardMedia>
    );
  }

  renderOnTour(props) {
    const { on_tour, classes } = props;
    if(!on_tour) return null;

    return (
      <div style={{position: 'relative', height: '100%'}}>
        <Typography variant="caption" align="left" className={classes.tourlabel}>
          On Tour
        </Typography>
      </div>
    );
  }

  renderSocialService(name, service_url, service_metric, props) {
    const url = service_url != "" ? service_url : undefined;
    const metric = service_metric != "" ? service_metric : undefined;
    const activeClass = url ? props.classes.serviceConnected : '';
    const serviceClasses = `${props.classes.service} ${activeClass}`;

    const base = (
      <ButtonBase disabled={url ? false : true} className={props.classes.serviceButton}>
        <Paper elevation={0} className={serviceClasses}>
          <ConnectedServiceIcon className={props.classes.padTopSm} service={name} active={url ? true : false} />
          {metric
            ? (<Typography variant="body1" className={`${props.classes.serviceMetric} ${props.classes.stat}`} noWrap>{metric}</Typography>)
            : (<Typography variant="body1" className={`${props.classes.serviceMetric} ${props.classes.disabledColor}`}>—</Typography>)
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

  renderLocation(props) {
    const { profile: { hometown, state} } = props;

    if(!hometown && !state) return null;
    if(!hometown ^ !state) return hometown || state;
    return `${hometown}, ${state}`;
  }

  renderUserEditForm(props) {
    props.openDialog(<UserEditForm {...props.profile} />);
  }

  render() {
    const {
      classes,
      isEditable,
      isInReview,
      profile,
      openDialog,
    } = this.props;

    const {
      stage_name,
      bio_short,
      genres,
      website,
      hometown,
      state,
      facebook,
      facebook_followers,
      instagram,
      instagram_followers,
      spotify,
      spotify_followers,
    } = profile;

    return (
      <Card elevation={8} className={classes.card}>
        {isInReview && (
          this.renderMedia(this.props)
        )}

        <div className={classes.infoSection}>
          <CardContent className={classes.content}>
            {isEditable && (
              <Grid container wrap="nowrap" spacing={8} justify="space-between">
                <Grid item>
                  <Typography variant="title" className={classes.stageName} component="h2" align="left">
                    {stage_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase className={classes.editIcon}>
                    <Edit size={22} onClick={() => this.renderUserEditForm(this.props)}/>
                  </ButtonBase>
                </Grid>
              </Grid>
            )}
            {!isEditable && (
              <Typography variant="title" component="h2" align="left" style={{fontWeight: 400}}>
                {stage_name}
              </Typography>
            )}
            <Typography gutterBottom={true} variant="caption" style={{textTransform: 'uppercase', marginTop: '4px'}} noWrap align="left">
              {genres.map(g => g.name).join(', ')}
            </Typography>
            <Typography className={classes.tagline} variant="body1" align="left">
              {bio_short}
            </Typography>
          </CardContent>
          <Grid container className={classes.audience} spacing={16}>
            <Grid item xs={12}>
              <Grid container className={classes.socialServices} spacing={16}>
                {this.renderSocialService("facebook",facebook,facebook_followers,this.props)}
                {this.renderSocialService("instagram",instagram,instagram_followers,this.props)}
                {this.renderSocialService("spotify",spotify,spotify_followers,this.props)}
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className={classes.metaSection}>
          <Divider/>
          <CardContent className={`${classes.meta}`}>
            <Grid container spacing={8} className={classes.metaList}>
              <Grid item>
                <Typography component="p" variant="caption" noWrap align="left">
                  {this.renderLocation(this.props)}
                </Typography>
              </Grid>
              <Grid item className={classes.websiteMeta}>
                <Typography component="p" variant="caption" align="right">
                  { website ? <a href={website} target="_blank">Website</a> : null }
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </div>

        {!isInReview && (
          this.renderMedia(this.props)
        )}
        {(isInReview && (
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

export default withStyles(styles)(ArtistCard);
