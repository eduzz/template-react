import React from 'react';
import Toolbar from './Toolbar';
import Panel from './Panel';

export const EditorContext = React.createContext({});

interface IProps {
  classes?: any;
}

export default class Editor extends React.PureComponent<IProps> {
  private defaultItem = {
    text: 'Texto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 12,
    color: '#000',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedItem: null,
      items: [],
      select: this.select,
      dismiss: this.dismiss,
      modify: this.modify,
      current: this.current,
      add: this.add,
      remove: this.remove,
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
    const { items, selectedItem } = this.state as any;

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
    const { items, selectedItem } = this.state as any;

    if (selectedItem)
      return items.find((item: any) => item.id === selectedItem)[label];

    return '';
  }

  add = () => {
    const { items } = this.state as any;

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
    const { items, selectedItem } = this.state as any;

    this.setState({
      items: items.filter((item: any) => item.id !== selectedItem),
      selectedItem: null,
    });
  }

  render() {
    return (
      <EditorContext.Provider value={this.state}>
        <Toolbar />
        <Panel />
      </EditorContext.Provider>
    );
  }
}