import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { WithStyles } from 'decorators/withStyles';
import { EditorContext } from '../';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  root: {},
}))
export default class Toolbar extends React.PureComponent<IProps> {
  private defaultValues = {
    fontSize: 12,
  };

  handleChange(e: any) {
    const { modify } = this as any;

    modify(e.target.name, e.target.value);
  }

  render() {
    const { classes } = this.props;

    return (
      <EditorContext.Consumer>
        {(value: any) =>
          <form className={classes.root}>
            <FormControl className={classes.formControl}>
              <Select
                value={value.current('fontSize') || this.defaultValues.fontSize}
                onChange={this.handleChange.bind(value)}
                displayEmpty
                name='fontSize'
                className={classes.selectEmpty}
              >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={32}>32</MenuItem>
              </Select>
              <FormHelperText>Tamanho da Font</FormHelperText>
            </FormControl>
          </form>
        }
      </EditorContext.Consumer>
    );
  }
}