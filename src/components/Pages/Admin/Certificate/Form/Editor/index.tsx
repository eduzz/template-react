import React from 'react';
import Toolbar from './Toolbar';
import Panel from './Panel';
import certificateService from 'services/certificate';
import rxjsOperators from 'rxjs-operators';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

export const EditorContext = React.createContext({});

interface IProps {
  classes?: any;
  default?: any;
}

interface IState {
  title: string;
  selectedItem: number;
  items: any[];
  select: Function;
  dismiss: Function;
  modify: Function;
  current: Function;
  add: Function;
  remove: Function;
  save: Function;
  setPlacement: Function;
  image: string;
  setImage: Function;
  html: string;
}

export default class Editor extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    default: {},
  };

  private defaultItem = {
    text: 'Texto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 36,
    fontFamily: 'Arial',
    color: '#000',
    placement: {
      x: 10,
      y: 20,
      width: 220,
      height: 70,
    },
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      title: '',
      selectedItem: null,
      items: (props.default && props.default.items) || [],
      html: '',
      image: (props.default && props.default.image) || '',
      select: this.select,
      dismiss: this.dismiss,
      modify: this.modify,
      current: this.current,
      add: this.add,
      remove: this.remove,
      save: this.save,
      setPlacement: this.setPlacement,
      setImage: this.setImage,
    };
  }

  select = (selectedItem: number) => {
    this.setState({
      selectedItem,
    });
  }

  dismiss = () => {
    this.setState({
      selectedItem: null,
    });
  }

  modify = (value: any) => {
    const { items, selectedItem } = this.state;

    this.setState({
      items: items.map((item: any) => {
        if (item.id === selectedItem)
          return {
            ...item,
            ...value,
          };

        return item;
      }),
    });
  }

  current = (label: string) => {
    const { items, selectedItem } = this.state;

    if (selectedItem)
      return items.find((item: any) => item.id === selectedItem)[label];

    return '';
  }

  add = (text: string = this.defaultItem.text) => {
    const { items } = this.state;
    const id = items[items.length - 1] ? items[items.length - 1].id + 1 : 1;

    this.setState({
      items: [
        ...items,
        {
          ...this.defaultItem,
          id,
          text,
        },
      ],
    });
  }

  remove = () => {
    const { items, selectedItem } = this.state;

    this.setState({
      items: items.filter((item: any) => item.id !== selectedItem),
      selectedItem: null,
    });
  }

  save = () => {
    const { items, html, image } = this.state;
    const params = {
      title: this.state.title,
      config: JSON.stringify({ items, image }),
      html,
      default: false,
    };

    certificateService.send(params).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe();
  }

  setImage = (image: string) => {
    this.setState({
      image,
    });
  }

  setPlacement = (placement: any) => {
    const { items, selectedItem } = this.state;

    this.setState({
      items: items.map((item: any) => {
        if (item.id === selectedItem)
          return {
            ...item,
            placement,
          };
        return item;
      }),
    });
  }

  handlePanelChange = (html: string) => {
    this.setState({
      html,
    });
  }

  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value,
    } as any);
  }

  render() {
    return (
      <EditorContext.Provider value={this.state}>
        <CardContent>
          <Grid container spacing={8}>
            <Grid item xs={10} lg={5}>
              <TextField
                fullWidth
                placeholder='Digite o título do certificado'
                name='title'
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='secondary'
                onClick={this.save}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
          <Toolbar />
          <Panel
            onChange={this.handlePanelChange}
          />
        </CardContent>
      </EditorContext.Provider>
    );
  }
}