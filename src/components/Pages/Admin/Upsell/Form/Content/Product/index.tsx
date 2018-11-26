import React, { PureComponent, SyntheticEvent } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { WithStyles } from 'decorators/withStyles';
import { UpsellFormContext, IUpsellFormContext } from '../../Context';

interface IProps {
  classes?: any;
}

@WithStyles(theme => ({
  changeLink: {
    color: theme.palette.secondary.light,
    textDecoration: 'none',
  },
}))
export default class Product extends PureComponent<IProps> {
  static contextType: typeof UpsellFormContext = UpsellFormContext;
  context: IUpsellFormContext;

  handleCleanType = (e: SyntheticEvent) => {
    e.preventDefault();

    this.context.updateModel(model => model.type = null)();
  }

  render() {
    const { classes } = this.props;

    return (
      <CardContent>
        <Typography variant='subtitle1'>
          <strong>Tipo Selecionado:</strong> Infoproduto <a className={classes.changeLink} href='' onClick={this.handleCleanType}>(Trocar)</a>
        </Typography>
      </CardContent>
    );
  }
}