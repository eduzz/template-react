import React, { Fragment } from 'react';
import Grid from 'material-ui/Grid';
import components from 'components';

interface IProps {
  components: any;
}

class PageGrid extends React.Component<IProps> {
  render() {
    return (
      <Grid container>
        {this.props.components.map((component: any, index: number) => {
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
                  <PageGrid components={component.children} />
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