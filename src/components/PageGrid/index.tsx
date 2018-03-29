import React from 'react';
import components from 'components';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface IProps {
  layouts: any;
  onChangeLayout?: any;
  isDraggable?: boolean;
  isResizable?: boolean;
}

interface IState {
  layouts: any;
  breakpoint: string;
}

class PageGrid extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      layouts: this.props.layouts,
      breakpoint: 'lg',
    };
  }

  handleLayoutChange = (currentLayout: any, allLayouts: any) => {
    if (this.props.onChangeLayout) {
      const layouts = this.state.layouts[this.state.breakpoint].map((layout: any, i: number) => {
        const newLayout = allLayouts[this.state.breakpoint][i];

        return {
          ...layout,
          h: newLayout.h,
          w: newLayout.w,
          x: newLayout.x,
          y: newLayout.y,
        };
      });

      this.props.onChangeLayout({
        [this.state.breakpoint]: layouts,
      });
    }
  }

  handleBreakpointChange = (newBreakpoint: any) => {
    this.setState({
      breakpoint: newBreakpoint,
    });
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
        measureBeforeMount={true}
        isDraggable={this.props.isDraggable}
        isResizable={this.props.isResizable}
      >
        {this.props.layouts &&
          this.props.layouts[this.state.breakpoint] &&
          this.props.layouts[this.state.breakpoint].map((component: any, index: number) => {
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