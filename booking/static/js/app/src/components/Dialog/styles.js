export const defaultColorSchemeStyles = theme => ({
  iconContainer: {
    position: 'absolute',
    top: theme.spacing.unit * 2.5,
    right: theme.spacing.unit * 2.5,
    zIndex: 1, // Content of the dialog can overlap this button
    cursor: 'pointer',
  },
  closeButton: {
    fill: theme.palette.primaryTonal[500],
  },
});

export const reverseColorSchemeStyles = theme => ({
  root: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    color: 'white',
    fontWeight: 'lighter', // looks to heavy otherwise TODO: not propagating
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1, // Content of the dialog can overlap this button
    [theme.breakpoints.down('xs')]: {
      top: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
    [theme.breakpoints.up('sm')]: {
      top: theme.spacing.unit * 3,
      right: theme.spacing.unit * 3,
    },
  },
});
