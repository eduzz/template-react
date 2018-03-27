import React from 'react';
import components from 'components';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface IProps {
  layouts: any;
}

interface IState {
  layouts: any;
}

class PageGrid extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      layouts: this.props.layouts,
    };
  }

  handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    console.log(currentLayout, allLayouts);
  }

  handleBreakpointChange = (newBreakpoint: any) => {
    console.log(newBreakpoint);
  }

  render() {
    return (
      <ResponsiveReactGridLayout
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        layouts={this.state.layouts}
        onLayoutChange={this.handleLayoutChange}
        onBreakpointChange={this.handleBreakpointChange}
        rowHeight={1}
        containerPadding={[0, 0]}
      >
        {this.props.layouts && this.props.layouts.lg.map((component: any, index: number) => {
          const Component = components[component.type];

          return (
            <div key={index}>
              {Component &&
                <Component {...component.props} />
              }
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
    );
  }
}

export default PageGrid;