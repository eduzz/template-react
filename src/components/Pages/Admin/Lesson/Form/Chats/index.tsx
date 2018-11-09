import React, { PureComponent, Fragment } from 'react';
import { IForm } from '..';
import Grid from '@material-ui/core/Grid';
import BaseChat from 'components/Shared/BaseChat';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

interface IProps {
  form: IForm;
  classes?: any;
}

@WithStyles(theme => ({
  title: {
    margin: '8px 0 16px 0',
  },
  container: {
    border: 'solid 1px #d5d5d5',
    borderRadius: 4,
    padding: theme.spacing.unit * 2,
    backgroundColor: '#fff',
  },
}))
export default class Chats extends PureComponent<IProps> {
  render() {
    const { form, classes } = this.props;

    return (
      <Fragment>
        <Typography className={classes.title} variant='subtitle1' color='inherit' noWrap>Chats</Typography>
        <div className={classes.container}>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <BaseChat
                title='Zopim Chat'
                FieldTextProps={{
                  placeholder: 'Exemplo: 2L8cq1ySdutGk1YExujfz1C2axL3UxOZ',
                  value: form.model.chats.zopimchat,
                  onChange: form.updateModel((model, v) => model.chats.zopimchat = v),
                }}
                SwitchProps={{
                  checked: form.model.chats.haszopimchat,
                  onClick: form.updateModel(model => model.chats.haszopimchat = !model.chats.haszopimchat),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <BaseChat
                title='Tawk.to Chat'
                FieldTextProps={{
                  placeholder: 'Exemplo: 74a70a7666272e0cd0306c32',
                  value: form.model.chats.tawktochat,
                  onChange: form.updateModel((model, v) => model.chats.tawktochat = v),
                }}
                SwitchProps={{
                  checked: form.model.chats.hastawktochat,
                  onClick: form.updateModel(model => model.chats.hastawktochat = !model.chats.hastawktochat),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <BaseChat
                title='Live Chat'
                FieldTextProps={{
                  placeholder: 'Exemplo: 4534867',
                  value: form.model.chats.livechat,
                  onChange: form.updateModel((model, v) => model.chats.livechat = v),
                }}
                SwitchProps={{
                  checked: form.model.chats.haslivechat,
                  onClick: form.updateModel(model => model.chats.haslivechat = !model.chats.haslivechat),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <BaseChat
                title='Intercom'
                FieldTextProps={{
                  placeholder: 'Exemplo: W05QLK2qipj',
                  value: form.model.chats.intercom,
                  onChange: form.updateModel((model, v) => model.chats.intercom = v),
                }}
                SwitchProps={{
                  checked: form.model.chats.hasintercom,
                  onClick: form.updateModel(model => model.chats.hasintercom = !model.chats.hasintercom),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <BaseChat
                title='Jivo Chat'
                FieldTextProps={{
                  placeholder: 'Exemplo: 74C20jXxyd',
                  value: form.model.chats.jivochat,
                  onChange: form.updateModel((model, v) => model.chats.jivochat = v),
                }}
                SwitchProps={{
                  checked: form.model.chats.hasjivochat,
                  onClick: form.updateModel(model => model.chats.hasjivochat = !model.chats.hasjivochat),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <BaseChat
                title='Zendesk Chat'
                FieldTextProps={{
                  placeholder: 'Exemplo: abcde.zendesk.com',
                  value: form.model.chats.zendeskchat,
                  onChange: form.updateModel((model, v) => model.chats.zendeskchat = v),
                }}
                SwitchProps={{
                  checked: form.model.chats.haszendeskchat,
                  onClick: form.updateModel(model => model.chats.haszendeskchat = !model.chats.haszendeskchat),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <BaseChat
                title='Chatroll'
                FieldTextProps={{
                  placeholder: 'Exemplo: W05QLK2qipj',
                  value: form.model.chats.chatroll,
                  onChange: form.updateModel((model, v) => model.chats.chatroll = v),
                }}
                SwitchProps={{
                  checked: form.model.chats.haschatroll,
                  onClick: form.updateModel(model => model.chats.haschatroll = !model.chats.haschatroll),
                }}
                options={
                  <div>
                    <FormControlLabel
                      checked={form.model.chats.chatroll_tipo == 0}
                      control={<Radio color='secondary' onClick={form.updateModel(model => model.chats.chatroll_tipo = 0)} />}
                      label='Padrão'
                    />
                    <FormControlLabel
                      checked={form.model.chats.chatroll_tipo == 1}
                      control={<Radio color='secondary' onClick={form.updateModel(model => model.chats.chatroll_tipo = 1)} />}
                      label='Ao vivo'
                    />
                  </div>
                }
              />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}