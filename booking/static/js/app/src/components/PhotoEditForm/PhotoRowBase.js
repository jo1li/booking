import React, { Component, Fragment } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import _ from 'lodash'

import FabButton from '../form/FabButton';
import Button from '@material-ui/core/Button';
import { Delete } from '../icons';
import { Code, CheckCircle, CircularProgress } from '../icons';
import {
  updateUserBio,
} from '../../request/requests';



export default PhotoRowBase;
