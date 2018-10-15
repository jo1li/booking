import React from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  disabledFill: {
    fill: theme.palette.grey[300],
  },
  activeFill: {
    fill: "#3B5998",
  }
})

const IconFacebook = (props) => {
  const { classes } = props;
  const fill = props.active ? classes.activeFill : classes.disabledFill;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <g id="fb-audience" fill="none" fillRule="evenodd">
        <g id="fb-audience-icon" transform="translate(-67 -398)" className={fill} fillRule="nonzero">
          <g id="content" transform="translate(32 267)">
            <g id="shape" transform="translate(35 131)">
              <g id="f-letter">
                <path d="M9 0c2.444 0 2.75.01 3.71.054.959.044 1.613.196 2.185.418.6.226 1.145.58 1.594 1.039.458.45.813.993 1.038 1.594.223.572.375 1.226.419 2.184C17.99 6.25 18 6.556 18 9s-.01 2.75-.054 3.71c-.044.959-.196 1.613-.419 2.185a4.602 4.602 0 0 1-2.632 2.632c-.572.223-1.226.375-2.184.419-.96.044-1.267.054-3.71.054-2.445 0-2.752-.01-3.712-.054-.957-.044-1.612-.196-2.184-.419A4.412 4.412 0 0 1 1.51 16.49a4.412 4.412 0 0 1-1.038-1.594C.25 14.323.098 13.67.054 12.711.01 11.75 0 11.444 0 9s.01-2.75.054-3.71C.098 4.33.25 3.676.472 3.104c.226-.6.58-1.145 1.039-1.594.45-.458.993-.813 1.594-1.038C3.677.25 4.33.098 5.289.054 6.25.01 6.556 0 9 0zm.895 14.538V9.275h1.769l.264-2.051H9.895v-1.31c0-.593.165-.998 1.017-.998H12V3.08C11.812 3.056 11.166 3 10.415 3c-1.568 0-2.641.956-2.641 2.711v1.513H6v2.051h1.774v5.263h2.12z" id="facebook-f-letter"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default withStyles(styles)(IconFacebook)
