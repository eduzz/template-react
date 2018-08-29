import { withStyles } from '@material-ui/core';
import { StyleRules, StyleRulesCallback } from '@material-ui/core/styles';
import { WithStylesOptions } from '@material-ui/core/styles/withStyles';
import React from 'react';

export function WithStyles(
  styles: StyleRules<any> | StyleRulesCallback<any>,
  options?: WithStylesOptions
) {
  return function <T>(component: T): T {
    const StyledComponent = withStyles(styles, options)(component as any);
    const WrappedComponent = React.forwardRef((props: any, ref: any) =>
      <StyledComponent {...props} innerRef={ref} />
    ) as any;

    // add static methods
    Object.getOwnPropertyNames(component).forEach(prop => {
      if (typeof component[prop] === 'function' && prop !== 'getDerivedStateFromProps') {
        WrappedComponent[prop] = component[prop];
      }
    });

    return WrappedComponent;
  };
}