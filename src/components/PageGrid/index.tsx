import React, { Fragment } from 'react';
import Grid from 'material-ui/Grid';
import components from 'components';

interface IProps {
  layout: any;
}

class PageGrid extends React.Component<IProps> {
  render() {
    return (
      <Grid container>
        {this.props.layout.map((component: any, index: number) => {
          const Component = components[component.type];

          return (
            <Fragment key={index}>
              <Grid item {...component.size} style={component.style}>
                {Component &&
                  <Component {...component.props} />
                }
              </Grid>
              {component.children && component.children.length &&
                <Grid item xs={6}>
                  <PageGrid layout={component.children} />
                </Grid>
              }
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

export default PageGrid;