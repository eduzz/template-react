import { IStyledProps, WithStyles } from 'decorators/withStyles';
import React, { PureComponent } from 'react';
import { BRANCH_NAME, BUILD_DATE, BUILD_NUMBER } from 'settings';

@WithStyles({
  container: {
    position: 'fixed',
    top: '-5px',
    left: 'calc(50% - 50px)',
    zIndex: 9999,
    background: '#00822b80',
    padding: '8px 30px 3px',
    borderRadius: '5px',
    color: 'white',
    textShadow: '0 0 1px #00000094',
    fontWeight: 'bold',
    fontSize: '12px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    boxShadow: '0px 1px 3px #00000059'
  }
})
export default class Environment extends PureComponent<IStyledProps> {
  render() {
    if (!BRANCH_NAME) return null;

    return (
      <div className={this.props.classes.container}>
        {BRANCH_NAME} (v3.{BUILD_NUMBER} - {BUILD_DATE})
      </div>
    );
  }
}