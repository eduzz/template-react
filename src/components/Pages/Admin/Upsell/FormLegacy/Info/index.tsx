import FieldText from '@react-form-fields/material-ui/components/Text';
import React from 'react';
import FieldSelect from '@react-form-fields/material-ui/components/Select';
import Grid from '@material-ui/core/Grid';

interface IProps {
  model: { title?: string; description?: string; label_text?: string };
  onChange: (value: IProps['model']) => void;
}

interface IState {
  isSelectorOpen: boolean;
}

export default class Info extends React.PureComponent<IProps, IState> {
  private labelOptions: any = [
    {
      label: 'Compre agora',
      value: 'Compre agora',
    },
    {
      label: 'Adquira já',
      value: 'Adquira já',
    },
    {
      label: 'Saiba mais',
      value: 'Saiba mais',
    },
    {
      label: 'Comprar',
      value: 'Comprar',
    },
    {
      label: 'Inscreva-se',
      value: 'Inscreva-se',
    },
    {
      label: 'Matricule-se Já',
      value: 'Matricule-se Já',
    },
    {
      label: 'Faça aqui sua matricula',
      value: 'Faça aqui sua matricula',
    },
  ];

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
  handleChangeLabelText = (label_text: any) => this.handleChange({ label_text });

  render() {
    const { model } = this.props;

    return (
      <div>
        <FieldText
          label='Titulo'
          value={(model.title || '').toString()}
          validation='required|max:50'
          helperText={`${(model.title || '').length}/50 caracteres`}
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

        <Grid container>
          <Grid item xs={4}>
            <FieldSelect
              value={(model.label_text || '').toString()}
              validation='required'
              onChange={this.handleChangeLabelText}
              options={this.labelOptions}
              label='Texto do botão de ação da oferta'
            />
          </Grid>
        </Grid>

      </div>
    );
  }
}