import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Toast from 'components/Shared/Toast';
import { WithStyles } from 'decorators/withStyles';
import React from 'react';
import rxjsOperators from 'rxjs-operators';
import certificateService from 'services/certificate';

import Panel from './Panel';
import Toolbar from './Toolbar';

const defaultCertificate = require('assets/default_certificate.json');

export const EditorContext = React.createContext({});

interface IProps {
  classes?: any;
  config?: any;
  default?: boolean;
  id?: number;
  title?: string;
}

interface IState {
  id: number;
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
  default: boolean;
}

@WithStyles(theme => ({
  defaultSwitch: {
    marginLeft: 8,
  },
}))
export default class Editor extends React.PureComponent<IProps, IState> {
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
      id: props.id || null,
      title: props.title || '',
      default: props.default || false,
      selectedItem: null,
      items: props.config ? props.config.items : defaultCertificate.items,
      html: '',
      image: props.config ? props.config.image : defaultCertificate.image,
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
    const { id, items, html, image } = this.state;
    const params = {
      id,
      title: this.state.title,
      default: this.state.default,
      config: JSON.stringify({ items, image }),
      html,
    };

    certificateService.send(params).pipe(
      rxjsOperators.loader(),
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe(() => {
      Toast.show('Certificado salvo com sucesso');
    }, err => {
      Toast.error(err);
    });
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

  triggerDefault = () => {
    this.setState({
      default: !this.state.default,
    });
  }

  render() {
    const { classes } = this.props;

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
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.default}
                    onClick={this.triggerDefault}
                    name='default'
                    color='secondary'
                    className={classes.defaultSwitch}
                  />
                }
                label='Padrão'
              />
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