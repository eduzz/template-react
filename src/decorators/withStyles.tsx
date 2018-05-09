import { withStyles } from 'material-ui';
import { StyleRules, StyleRulesCallback } from 'material-ui/styles';
import { WithStylesOptions } from 'material-ui/styles/withStyles';

export function WithStyles(
  styles: StyleRules<any> | StyleRulesCallback<any>,
  options?: WithStylesOptions
) {
  return function <T>(target: T): T {
    return withStyles(styles, options)(target as any) as any;
  };
}