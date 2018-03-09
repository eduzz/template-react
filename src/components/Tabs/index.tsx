import React, { Component } from 'react';
import { v4 } from 'uuid';
import Icon from 'components/Icon';

const styles = require('./styles.css');

interface IProps {
  children: any;
  id: any;
}

export class Tabs extends Component<IProps> {
  private id: string;

  constructor(props: any) {
    super(props);

    this.id = v4();
  }

  render() {
    const panes = this.props.children.length
      ? [...this.props.children]
      : [{ ...this.props.children }];
    this.id = this.props.id || this.id;

    return (
      <div>
        <ul className={styles.component} id={this.id}>
          {panes.map((pane, key) => (
            <li key={key} className='tab'>
              <a
                className='tab-button waves-effect waves-light'
                href={`#${this.id}-${key}`}
                onClick={e => e.preventDefault()}
              >
                <Icon name={pane.props.icon} />
                {pane.props.title}
              </a>
            </li>
          ))}
        </ul>
        {panes.map((pane, key) => (
          <div key={key} id={`${this.id}-${key}`}>
            {pane}
          </div>
        ))}
      </div>
    );
  }
}

export class Pane extends Component<any> {
  render() {
    return (
      <div className='row'>
        <div className='col s12'>{this.props.children}</div>
      </div>
    );
  }
}
