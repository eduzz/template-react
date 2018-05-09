/// <reference types="react" />

declare namespace React {
  interface ComponentClass<P = {}> {
    variant?: string;
  }

  class Component<P, S> {
    innerRef?: Function;
  }
}