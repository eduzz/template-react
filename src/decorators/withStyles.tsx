import { Theme } from '@material-ui/core';
import withStyles, { Styles, WithStylesOptions } from '@material-ui/core/styles/withStyles';

export function WithStyles(styles: Styles<Theme, any, any>, options?: WithStylesOptions<Theme>) {
  return function<T>(target: T): T {
    return withStyles(styles, options)(target as any) as any;
  };
}

export type AppStyle<Classkeys extends string = string> = Styles<Theme, any, Classkeys>;

export interface IStyledProps<T = any> {
  classes?: any;
}
