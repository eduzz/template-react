import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  onChange?: any;
  classes?: any;
}

@WithStyles(theme => ({
  root: {
    margin: '0 8px 0 8px',
  },
}))
export default class Placeholders extends React.PureComponent<IProps> {
  handleChange = (e: any) => {
    this.props.onChange(e.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.root}>
        <Select
          value=''
          onChange={this.handleChange}
          displayEmpty
        >
          <MenuItem value='' disabled>Máscaras</MenuItem>
          <MenuItem value='[ALUNO]'>ALUNO</MenuItem>
          <MenuItem value='[AUTOR]'>AUTOR</MenuItem>
          <MenuItem value='[DATA]'>DATA</MenuItem>
          <MenuItem value='[CURSO]'>CURSO</MenuItem>
          <MenuItem value='[DURACAO]'>DURACAO</MenuItem>
        </Select>
      </FormControl>
    );
  }
}