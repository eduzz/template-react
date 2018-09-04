import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from 'mdi-react/ImageIcon';
import { WithStyles } from 'decorators/withStyles';

interface IProps {
  classes?: any;
  onChange?: any;
}

@WithStyles(theme => ({
  input: {
    position: 'absolute',
    visibility: 'hidden',
  },
  icon: {
    position: 'absolute',
  },
}))
export default class ImageUpload extends React.PureComponent<IProps> {
  private inputEl: any;

  constructor(props: IProps) {
    super(props);

    this.inputEl = React.createRef();
  }

  handleClick = () => {
    this.inputEl.current.click();
  }

  handleChange = async (event: any) => {
    const reader = new FileReader();
    const formData = new FormData();
    const file = event.target.files[0];

    formData.append('file', file);

    reader.onload = (event: any) => {
      this.props.onChange(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <IconButton onClick={this.handleClick}>
          <ImageIcon className={classes.icon} />
        </IconButton>
        <input
          type='file'
          className={classes.input}
          ref={this.inputEl}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}