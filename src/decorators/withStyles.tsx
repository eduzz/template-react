import withStyles, { StyleRules, StyleRulesCallback, WithStylesOptions } from '@material-ui/core/styles/withStyles';

export function WithStyles(
  styles: StyleRules<any> | StyleRulesCallback<any>,
  options?: WithStylesOptions
) {
  return function <T>(target: T): T {
    return withStyles(styles, options)(target as any) as any;
  };
}