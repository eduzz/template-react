import 'react';

declare module 'React' {
  interface Attributes {
    ref?: any;
    innerRef?: any;
  }
}