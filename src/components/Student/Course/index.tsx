import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageGrid from 'components/PageGrid';

class Course extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      layouts: {
        lg: [{
          type: 'CourseBanner',
          i: '0',
          w: 12,
          h: 40,
          maxH: 40,
          minH: 40,
          x: 0,
          y: 0,
        }, {
          type: 'ModuleList',
          props: {
            courseID: 3231,
          },
          i: '1',
          w: 8,
          h: 27,
          x: 1,
          y: 40,
        }, {
          type: 'UpsellCard',
          i: '2',
          w: 2,
          h: 36,
          x: 9,
          y: 40,
        }]
      }
    };
  }

  render() {
    return (
      <section className='student-course-content'>
        <PageGrid
          layouts={JSON.parse(localStorage.getItem('courseLayouts')) || this.state.layouts}
          onChangeLayout={(layouts: any) => localStorage.setItem('courseLayouts', JSON.stringify(layouts))}
          isDraggable={this.props.pageGrid.enabled}
          isResizable={this.props.pageGrid.enabled}
        />
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  pageGrid: state.pageGrid,
});

export default connect(mapStateToProps)(Course);
