import FieldText from '@react-form-fields/material-ui/components/Text';
import React from 'react';

interface IProps {
  model: { title?: string; description?: string; };
  onChange: (value: IProps['model']) => void;
}

interface IState {
  isSelectorOpen: boolean;
}

export default class Info extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isSelectorOpen: false,
    };
  }

  handleChange(model: IProps['model']) {
    this.props.onChange({ ...this.props.model, ...model });
  }

  handleChangeTitle = (title: string) => this.handleChange({ title });
  handleChangeDescription = (description: any) => this.handleChange({ description });

  render() {
    const { model } = this.props;

    return (
      <div >
        <FieldText
          label='Titulo'
          value={model.title}
          validation='required|max:30'
          helperText={`${(model.title || '').length}/30 caracteres`}
          onChange={this.handleChangeTitle}
        />

        <FieldText
          label='Descrição'
          value={model.description}
          validation='required|max:300'
          helperText={`${(model.description || '').length}/300 caracteres`}
          multiline
          onChange={this.handleChangeDescription}
        />

      </div>
    );
  }
}