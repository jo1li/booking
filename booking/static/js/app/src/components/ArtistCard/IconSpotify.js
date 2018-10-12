import React from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  disabledFill: {
    fill: theme.palette.grey[300],
  },
  activeFill: {
    fill: "#24CF5F",
  }
})

const IconSpotify = (props) => {
  const { classes } = props;
  const fill = props.active ? classes.activeFill : classes.disabledFill;
  return (
    <svg style={{marginTop: '-1px'}} width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <g id="spot-audience" fill="none" fillRule="evenodd">
        <g id="spot-audience-icon" transform="translate(-204 -398)" className={fill}>
          <g transform="translate(32 267)">
            <g transform="translate(35 131)">
              <g transform="translate(133)">
                <g transform="translate(4)">
                  <g id="spotifyShape">
                    <path d="M9 18A9 9 0 1 1 9 0a9 9 0 0 1 0 18zm.03-1.495a7.475 7.475 0 1 0 0-14.95 7.475 7.475 0 0 0 0 14.95zm3.629-4.85c.198.113.314.228.314.512a.487.487 0 0 1-.493.482.79.79 0 0 1-.389-.114c-1.148-.675-2.548-.88-4.153-.94-1.045-.04-1.707.061-2.505.223-.13.027-.293.076-.39.076a.488.488 0 0 1-.502-.484c0-.324.192-.485.43-.529.98-.217 1.954-.34 2.967-.34 1.734 0 3.391.34 4.72 1.115zm.919-2.26c.232.13.368.262.368.59 0 .32-.272.556-.578.556a.939.939 0 0 1-.456-.132c-1.347-.779-2.99-1.014-4.873-1.085-1.225-.045-2.002.071-2.938.258-.153.031-.344.087-.459.087a.568.568 0 0 1-.588-.558c0-.373.225-.559.506-.61a16.198 16.198 0 0 1 3.48-.393c2.033 0 3.977.394 5.538 1.287zm1.074-2.662c.27.156.43.314.43.709a.67.67 0 0 1-.674.666c-.175 0-.367-.06-.53-.158-1.569-.934-3.48-1.217-5.672-1.301-1.426-.055-2.33.085-3.42.308-.177.038-.4.106-.534.106a.67.67 0 0 1-.684-.67c0-.448.262-.671.588-.732 1.336-.3 2.668-.472 4.05-.472 2.368 0 4.63.472 6.446 1.544z" id="shapeMask"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default withStyles(styles)(IconSpotify)
