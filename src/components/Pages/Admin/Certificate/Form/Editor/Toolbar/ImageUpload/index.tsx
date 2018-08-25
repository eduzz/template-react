import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from 'mdi-react/ImageIcon';
import { WithStyles } from 'decorators/withStyles';
// import certificateService from 'services/certificate';
// import rxjsOperators from 'rxjs-operators';

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

  handleChange = (event: any) => {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onload = (event: any) => {
      this.props.onChange(event.target.result);
    };
    reader.readAsDataURL(file);

    // certificateService.uploadBackgroundImage({ file }).pipe(
    //   rxjsOperators.logError(),
    //   rxjsOperators.bindComponent(this),
    // ).subscribe(image => {
    //   console.log(image);
    // });
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