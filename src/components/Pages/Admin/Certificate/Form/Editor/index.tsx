import React, { PureComponent } from 'react';

import { DEFAULT_CERTIFICATE, DEFAULT_ITEM } from './config';
import EditorContext from './context';
import { IEditorContext, IEditorItem } from './interfaces';
import Panel from './Panel';
import Toolbar from './Toolbar';

interface IProps {
  value: {
    image: string;
    items: IEditorItem[];
  };
  onChange: (value: {
    image: string;
    html: string;
    items: IEditorItem[];
  }) => void;
}

interface IState extends IEditorContext { }

export default class Editor extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      selectedItem: null,
      items: props.value ? props.value.items : DEFAULT_CERTIFICATE.items,
      image: props.value ? props.value.image : DEFAULT_CERTIFICATE.image,
      select: this.select,
      dismiss: this.dismiss,
      modify: this.modify,
      getCurrentConfig: this.getCurrentConfig,
      add: this.add,
      remove: this.remove,
      setPlacement: this.setPlacement,
      setImage: this.setImage,
    };
  }

  select = (selectedItem: number) => {
    this.setState({ selectedItem });
  }

  dismiss = () => {
    this.setState({ selectedItem: null });
  }

  modify = (value: IEditorItem) => {
    const { items, selectedItem } = this.state;

    this.setState({
      items: items.map(item => {
        if (item.id === selectedItem) {
          return { ...item, ...value };
        }

        return item;
      }),
    });
  }

  getCurrentConfig: IEditorContext['getCurrentConfig'] = key => {
    const { items, selectedItem } = this.state;

    if (selectedItem) {
      return items.find(item => item.id === selectedItem)[key];
    }

    return '';
  }

  add = (text: string = DEFAULT_ITEM.text) => {
    const { items } = this.state;
    const id = items[items.length - 1] ? items[items.length - 1].id + 1 : 1;

    this.setState({
      items: [...items, { ...DEFAULT_ITEM, id, text }]
    });
  }

  remove = () => {
    const { items, selectedItem } = this.state;

    this.setState({
      items: items.filter(item => item.id !== selectedItem),
      selectedItem: null,
    });
  }

  setImage = (image: string) => {
    this.setState({ image });
  }

  setPlacement = (placement: IEditorItem['placement']) => {
    const { items, selectedItem } = this.state;

    this.setState({
      items: items.map(item => {
        if (item.id === selectedItem)
          return {
            ...item,
            placement,
          };
        return item;
      }),
    });
  }

  onChange = (html: string) => {
    const { items, image } = this.state;
    this.props.onChange({ image, items, html });
  }

  render() {
    return (
      <EditorContext.Provider value={this.state}>
        <Toolbar />
        <Panel onChange={this.onChange} />
      </EditorContext.Provider>
    );
  }
}