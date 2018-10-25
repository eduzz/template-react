import AppRouter, { RouterContext } from 'components/Router';
import { WithStyles } from 'decorators/withStyles';
import { IAuthor } from 'interfaces/models/author';
import React, { Fragment, PureComponent } from 'react';

interface IState {
}

interface IProps {
  classes?: any;
  author: IAuthor;
  router?: AppRouter;
}

@WithStyles({
})
class AuthorItem extends PureComponent<IProps, IState> {
  render() {
    return (
      <Fragment>Teste</Fragment>
    );
  }
}

export default React.forwardRef((props: IProps, ref: any) => (
  <RouterContext.Consumer>
    {router => <AuthorItem {...props} {...ref} router={router} />}
  </RouterContext.Consumer>
));