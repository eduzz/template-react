import React from 'react';
import Toolbar from './Toolbar';
import Panel from './Panel';

export const EditorContext = React.createContext({});

interface IProps {
  classes?: any;
}

export default class Editor extends React.PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedItem: null,
      items: [
        {
          id: 1,
          text: 'Texto',
        },
        {
          id: 2,
          text: 'Texto',
        },
      ],
      select: (selectedItem: number) => {
        this.setState({
          selectedItem,
        });
      },
      dismiss: () => {
        this.setState({
          selectedItem: null,
        });
      },
      modify: (stateLabel: string, value: number | string) => {
        const { items, selectedItem } = this.state as any;

        this.setState({
          items: items.map((item: any) => {
            if (item.id === selectedItem)
              return {
                ...item,
                [stateLabel]: value,
              };

            return item;
          }),
        });
      },
      current: (stateLabel: string) => {
        const { items, selectedItem } = this.state as any;

        if (selectedItem)
          return items.find((item: any) => item.id === selectedItem)[stateLabel];
      }
    };
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