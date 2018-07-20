import React from 'react';
import Select from './Select';
import states from '../../utils/states';

const SelectState = (props) =>
    <Select
        {...props}
        items={states}
    />

export default SelectState
