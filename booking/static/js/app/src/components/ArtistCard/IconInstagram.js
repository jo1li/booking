import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  disabledFill: {
    fill: theme.palette.grey[300],
  }
})

const IconInstagram = (props) => {
  const { classes } = props;
  const disabledFillColor = "#eee";
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <path d="M8.304 0c2.255 0 2.538.01 3.423.05.884.04 1.487.18 2.016.386a4.07 4.07 0 0 1 1.47.958c.423.414.75.916.958 1.47.205.529.346 1.132.386 2.016.04.886.05 1.168.05 3.424 0 2.255-.01 2.537-.05 3.423-.04.884-.18 1.488-.386 2.016a4.246 4.246 0 0 1-2.428 2.428c-.528.205-1.132.346-2.016.386-.885.04-1.168.05-3.423.05s-2.538-.01-3.424-.05c-.884-.04-1.487-.18-2.015-.386a4.07 4.07 0 0 1-1.471-.958 4.07 4.07 0 0 1-.958-1.47C.231 13.215.09 12.61.05 11.727.01 10.842 0 10.56 0 8.304 0 6.048.01 5.766.05 4.88c.04-.884.18-1.487.386-2.016a4.07 4.07 0 0 1 .958-1.47 4.07 4.07 0 0 1 1.47-.958C3.393.23 3.996.09 4.88.05 5.766.01 6.048 0 8.304 0zm0 1.496c-2.218 0-2.48.009-3.356.049-.81.036-1.25.172-1.542.285-.36.134-.687.346-.954.622a2.573 2.573 0 0 0-.622.954c-.113.293-.249.733-.286 1.542-.04.876-.048 1.138-.048 3.356 0 2.217.009 2.48.048 3.355.037.81.173 1.25.286 1.542.133.36.346.687.622.955.267.276.594.488.954.62.293.115.733.25 1.542.287.876.04 1.138.048 3.356.048 2.217 0 2.48-.008 3.355-.048.81-.037 1.25-.172 1.542-.286a2.75 2.75 0 0 0 1.576-1.576c.113-.293.249-.732.286-1.542.04-.876.048-1.138.048-3.355 0-2.218-.008-2.48-.048-3.356-.037-.81-.173-1.249-.286-1.542a2.573 2.573 0 0 0-.621-.954 2.573 2.573 0 0 0-.955-.622c-.293-.113-.732-.248-1.542-.285-.876-.04-1.138-.049-3.355-.049zm0 2.544a4.264 4.264 0 1 1 0 8.528 4.264 4.264 0 0 1 0-8.528zm0 7.031a2.768 2.768 0 1 0 0-5.535 2.768 2.768 0 0 0 0 5.535zm4.432-6.203a.996.996 0 1 1 0-1.993.996.996 0 0 1 0 1.993z" id="path-1"/>
        <linearGradient x1="11.215%" y1="11.881%" x2="87.697%" y2="87.383%" id="linearGradient-3">
          <stop stopColor="#8822C0" offset="0%"/>
          <stop stopColor="#DC1254" offset="100%"/>
        </linearGradient>
        <radialGradient cx="18.891%" cy="86.689%" fx="18.891%" fy="86.689%" r="101.197%" id="radialGradient-4">
          <stop stopColor="#FCAB48" offset="0%"/>
          <stop stopColor="#FCA745" stopOpacity="0" offset="100%"/>
        </radialGradient>
        <path id="path-5" d="M0 0h17v17H0z"/>
      </defs>
      <g id="Artist-Onboarding" fill="none" fillRule="evenodd">
        <g id="Onboarding-/-Artist-/-Profile-Copy-3" transform="translate(-136 -399)">
          <g id="Group-2" transform="translate(32 267)">
            <g id="Group" transform="translate(35 131)">
              <g id="Group-8" transform="translate(69 1)">
                <g id="Group-4">
                  <g id="instagram-active">
                    <g id="Group-5">
                      <mask id="mask-2" fill="#fff">
                        <use xlinkHref="#path-1"/>
                      </mask>
                      <use id="insta" fill={disabledFillColor} fillRule="nonzero" xlinkHref="#path-1"/>
                      <g id="Rectangle-25" mask="url(#mask-2)">
                        {props.active && (
                          <Fragment>
                            <use fill="url(#linearGradient-3)" xlinkHref="#path-5"/>
                            <use fill="url(#radialGradient-4)" xlinkHref="#path-5"/>
                          </Fragment>
                        )}
                        {!props.active && (
                          <use className={classes.disabledFill} xlinkHref="#path-5"/>
                        )}
                      </g>
                    </g>
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

export default withStyles(styles)(IconInstagram);