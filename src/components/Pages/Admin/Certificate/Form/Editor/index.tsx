import React from 'react';
import Toolbar from './Toolbar';
import Panel from './Panel';
import certificateService from 'services/certificate';
import rxjsOperators from 'rxjs-operators';

export const EditorContext = React.createContext({});

interface IProps {
  classes?: any;
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
  private defaultItem = {
    text: 'Texto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 12,
    fontFamily: 'Arial',
    color: '#000',
    placement: {
      x: 10,
      y: 20,
      width: 120,
      height: 15,
    },
  };

  constructor(props: IProps) {
    super(props);

    const items = ['[ALUNO]', '[PROFESSOR]', '[DATA]', '[CURSO]', '[DURACAO]'].map((placeholder: any, index: number) => {
      return {
        ...this.defaultItem,
        text: placeholder,
        placement: {
          ...this.defaultItem.placement,
          y: this.defaultItem.placement.y * (index + 1),
        }
      };
    });

    this.state = {
      selectedItem: null,
      items,
      html: '',
      backgroundImage: '',
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

  add = () => {
    const { items } = this.state;

    this.setState({
      items: [
        ...items,
        {
          ...this.defaultItem,
          id: items.length + 1,
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
    const { items, html } = this.state;
    const params = {
      title: 'Test',
      image: 'test',
      config: items,
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