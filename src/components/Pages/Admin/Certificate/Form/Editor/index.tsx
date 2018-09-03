import React from 'react';
import Toolbar from './Toolbar';
import Panel from './Panel';
import certificateService from 'services/certificate';
import rxjsOperators from 'rxjs-operators';

export const EditorContext = React.createContext({});

interface IProps {
  classes?: any;
  default?: any;
}

interface IState {
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
  backgroundImage: string;
  setBackgroundImage: Function;
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
      selectedItem: null,
      items: (props.default && props.default.items) || [],
      html: '',
      backgroundImage: (props.default && props.default.backgroundImage) || '',
      select: this.select,
      dismiss: this.dismiss,
      modify: this.modify,
      current: this.current,
      add: this.add,
      remove: this.remove,
      save: this.save,
      setPlacement: this.setPlacement,
      setBackgroundImage: this.setBackgroundImage,
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
    const { items, html, backgroundImage } = this.state;
    const params = {
      title: 'Test',
      image: 'test',
      config: JSON.stringify({ items, backgroundImage }),
      html,
    };

    certificateService.send(params).pipe(
      rxjsOperators.logError(),
      rxjsOperators.bindComponent(this),
    ).subscribe();
  }

  setBackgroundImage = (backgroundImage: string) => {
    this.setState({
      backgroundImage,
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

  render() {
    return (
      <EditorContext.Provider value={this.state}>
        <Toolbar />
        <Panel
          onChange={this.handlePanelChange}
        />
      </EditorContext.Provider>
    );
  }
}