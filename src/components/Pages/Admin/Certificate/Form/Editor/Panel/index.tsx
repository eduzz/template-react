import React from 'react';
import { WithStyles } from 'decorators/withStyles';
import Textbox from './Textbox';
import { ITextBox } from './Textbox';
import { EditorContext } from '../';

interface IProps {
  classes?: any;
  onChange?: any;
  context?: any;
}

interface IState {
  selectedItem: number | null;
  items: Array<ITextBox>;
}

@WithStyles(theme => ({
  root: {
    position: 'relative',
    marginBottom: 16,
  },
  panel: {
    backgroundColor: '#cecece',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}))
class Panel extends React.Component<IProps, IState> {
  private panelEl: any;
  private containerEl: any;

  constructor(props: IProps) {
    super(props);

    this.panelEl = React.createRef();
    this.containerEl = React.createRef();
  }

  componentDidMount = () => {
    this.handleChange();
  }

  componentDidUpdate() {
    this.handleChange();
  }

  handleDismiss = (e: any) => {
    this.setState({
      selectedItem: null,
    });
  }

  handleChange = () => {
    this.props.onChange(`
      <html>
        <head>
            <meta charset='utf-8'>
            <!-- Custom font: <link href='https://fonts.googleapis.com/css?family=Great+Vibes' rel='stylesheet'> -->
            <style>
                @page {
                    size: A4 landscape;
                    margin:0;
                }

                html, body {
                    margin: 0;
                    padding: 0;
                    width: 3508px;
                    height: 2479px;
                    overflow: hidden;
                }

                body {
                    zoom: 0.48;
                }
            </style>
        </head>
        <body>
            ${this.panelEl.current.outerHTML}
        </body>
      </html>
    `);
  }

  handlePlacementChange = (placement: any) => {
    this.props.context.setPlacement(placement);

    this.handleChange();
  }

  render() {
    const { classes, context } = this.props;
    const panelStyle = {
      width: 3508,
      height: 2480,
    };
    let scale = 1;
    let containerStyle;

    if (this.containerEl.current) {
      scale = this.containerEl.current.offsetWidth / this.panelEl.current.offsetWidth;
      containerStyle = {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      };
    }

    return (
      <div className={classes.root} style={containerStyle} ref={this.containerEl}>
        <div className={classes.panel} onClick={context.dismiss} ref={this.panelEl} style={panelStyle}>
          <img
            alt=''
            src={context.image}
            className={classes.backgroundImage}
          />

          {context.items.map((item: any) => {
            const { id, text, placement, ...style } = item;

            return (
              <Textbox
                key={id}
                id={id}
                text={text}
                style={style}
                scale={scale}
                placement={placement}
                onChange={this.handlePlacementChange}
                selected={context.selectedItem === id}
                onMouseDown={context.select}
              />
            );
          })}
        </div>
      </div >
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <EditorContext.Consumer>
    {context => <Panel {...props} context={context} {...ref} />}
  </EditorContext.Consumer>
));