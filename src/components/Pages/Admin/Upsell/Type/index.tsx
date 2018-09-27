import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

interface IProps {
  classes?: any;
  onChange?: any;
}

interface IState {
  value: any;
}

@WithStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
  },
  select: {
    width: 200,
    marginRight: 16,
  },
  content: {
    marginTop: 8,
  },
}))
export default class Type extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: 'nutror',
    };
  }

  componentDidMount() {
    this.props.onChange && this.props.onChange({ type: this.state.value });
  }

  handleChange = (e: any) => {
    this.setState({
      value: e.target.value,
    });

    this.props.onChange && this.props.onChange({ type: e.target.value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <FormControl fullWidth>
          <label className={classes.title}>
            Escolha um produto MyEduzz
          </label>
          <div className={classes.content}>
            <Select
              className={classes.select}
              value={value}
              onChange={this.handleChange}
            >
              <MenuItem value='nutror'>Nutror</MenuItem>
              <MenuItem value='myeduzz'>MyEduzz</MenuItem>
            </Select>
          </div>
        </FormControl>
      </div>
    );
  }
}