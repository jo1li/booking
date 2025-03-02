import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import CancelIcon from '@material-ui/icons/Cancel';
import classNames from 'classnames';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
import DropdownIndicator from './DropdownIndicator';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: 'flex',
    padding: theme.spacing.unit,
    paddingLeft: 0,
    paddingRight: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    ...theme.typography.body1,
  },
  option: {
    ...theme.typography.body1,
  },
  chip: {
    ...theme.typography.overline,
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    color: theme.palette.primaryTonal[500],
    backgroundColor: theme.palette.primaryTonal[50],
    height: theme.spacing.unit * 4.5,
    borderRadius: 18,
    letterSpacing: 1,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.primaryTonal[50],
      0.08,
    ),
  },
  chipDeleteIcon: {
    color: theme.palette.primaryTonal[200],
    height: 16,
    width: 16,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  chipLabel: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: 0,
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
    ...theme.typography.body1,
    color: theme.palette.grey[500],
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
});


const noop = () => {};

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      className={props.selectProps.classes.option}
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  const { selectProps: { classes }} = props;
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(classes.chip, {
        [classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      classes={{label: classes.chipLabel}}
      deleteIcon={<CancelIcon className={classes.chipDeleteIcon} {...props.removeProps} />}
    />
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const DropdownIndicatorButton = () => <ButtonBase><DropdownIndicator /></ButtonBase>;

const components = {
  Control,
  Menu,
  MultiValue,
  // NoOptionsMessage,
  Option,
  Placeholder,
  // SingleValue,
  ValueContainer,
  DropdownIndicator: DropdownIndicatorButton,
};

class MultiSelect extends React.Component {
  render(props) {
    // `touched` isn't getting set here, so use `visited` to determine
    // whether to show error.
    const { input, label, helpText, meta: { visited, error }, errorClassName, children, ...rest } = this.props;

    return (
      <FormControl error={Boolean(visited && error)} fullWidth>
        <Select
          isClearable={false}
          components={components}
          {...input}
          // onChange={event => input.onChange(event.target.value)}
          onBlur={noop} // https://github.com/erikras/redux-form/issues/2768
          textFieldProps={{
            label,
            InputLabelProps: this.props.InputLabelProps,
          }}
          {...rest}
        >
          {children}
        </Select>
        {
          Boolean(visited && error) &&
          <FormHelperText error={true} className={errorClassName || ''}>{error}</FormHelperText>
        }
        {
          !Boolean(visited && error) && helpText !== undefined &&
          <FormHelperText>{helpText}</FormHelperText>
        }
      </FormControl>
    )
  }

}

export default withStyles(styles, { withTheme: true })(MultiSelect);
