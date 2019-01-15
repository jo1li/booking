import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import ConnectedServiceIcon from './ConnectedServiceIcon';
import Edit from 'react-feather/dist/icons/edit';
import Camera from 'react-feather/dist/icons/camera';

import { getOrientedImageURL } from '../../helpers/imageHelpers';
import styles from './styles';
import UserEditForm from '../UserEditForm';


class ArtistCard extends React.Component {

  renderMedia(props) {
    const { classes, profile, isEditable } = props;
    const { image, stage_name } = profile;
    const noPhoto = <span className={classes.avatarStandIn}>No Photo</span>
    const editableAndNoPhoto = <span className={classes.avatarStandIn}><Button color="primary" className={classes.button} onClick={() => this.renderUserEditForm(props)}><Camera className={classes.iconLeft} size={22} /> Add Your Photo</Button></span>
    return (
      <CardMedia className={classes.avatarSection} image={image ? getOrientedImageURL(image) : ""} title={ image ? stage_name : null}>
        { !image ? isEditable ? editableAndNoPhoto : noPhoto : null }
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
    const url = service_url !== null ? service_url : undefined;
    const metric = service_metric !== null ? service_metric : undefined;

    const base = (
      <ButtonBase disabled={url ? false : true} className={props.classes.serviceButton}>
        <ConnectedServiceIcon className={props.classes.padTopSm} service={name} active={url ? true : false} />
        {metric &&
          (<Typography variant="body1" className={`${props.classes.serviceMetric} ${props.classes.stat}`} noWrap>{metric}</Typography>)
        }
      </ButtonBase>
    )

    if (url) {
      return (
        <Grid key={name} item align="center">
          <a href={url} target="_blank" className={props.classes.serviceLink}>
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
    } = this.props;

    const {
      stage_name,
      bio_short,
      genres,
      website,
      facebook,
      facebook_followers,
      instagram,
      instagram_followers,
      spotify,
      spotify_followers,
    } = profile;

    return (
      <Card elevation={6} className={classes.card}>
        {isInReview && (
          this.renderMedia(this.props)
        )}

        <div className={classes.infoSection}>
          <CardContent className={classes.content}>
            {isEditable && (
              <Grid container wrap="nowrap" spacing={8} justify="space-between">
                <Grid item>
                  <Typography variant="h6" className={classes.stageName} component="h2" align="left">
                    {stage_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase className={classes.editIcon} onClick={() => this.renderUserEditForm(this.props)}>
                    <Edit size={22} />
                  </ButtonBase>
                </Grid>
              </Grid>
            )}
            {!isEditable && (
              <Typography variant="h6" className={classes.stageName} component="h2" align="left" style={{fontWeight: 400}}>
                {stage_name}
              </Typography>
            )}
            <Typography gutterBottom={true} color="primary" variant="caption" style={{textTransform: 'uppercase', marginTop: '4px'}} noWrap align="left">
              {genres.map(g => g.name).join(', ')}
            </Typography>
            <Typography className={classes.tagline} variant="body1" align="left">
              {bio_short}
            </Typography>
          </CardContent>
          <div className={classes.socialGrid}>
            <div className={classes.socialGridItem}>{this.renderSocialService("facebook",facebook,facebook_followers,this.props)}</div>
            <div className={classes.socialGridItem}>{this.renderSocialService("instagram",instagram,instagram_followers,this.props)}</div>
            <div className={classes.socialGridItem}>{this.renderSocialService("spotify",spotify,spotify_followers,this.props)}</div>
          </div>
        </div>

        <div className={classes.metaSection}>
          <Divider/>
          <div className={classes.meta}>
            <Grid container spacing={8} className={classes.metaList}>
              <Grid item>
                <Typography component="p" variant="overline" noWrap align="left">
                  {this.renderLocation(this.props)}
                </Typography>
              </Grid>
              <Grid item className={classes.websiteMeta}>
                <Typography component="p" variant="overline" align="right">
                  { website ? <a href={website} target="_blank">Website</a> : null }
                </Typography>
              </Grid>
            </Grid>
          </div>
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
