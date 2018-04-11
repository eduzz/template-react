import React, { Component } from 'react';
import ModuleList from 'components/ModuleList';
import Icon from 'components/Icon';

const styles = require('./styles.css');

interface IProps {
  courseID: number | string;
}

interface IState {
  isHidden: boolean;
}

class SideMenu extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isHidden: false,
    };
  }

  render() {
    return (
      <aside
        className={`side-nav course-nav ${styles.component} ${
          this.state.isHidden ? 'hidden' : ''
          }`}
      >
        <div
          className='course-block course-data'
          onClick={() =>
            this.setState({
              isHidden: !this.state.isHidden
            })
          }
        >
          <a
            className='toggle-nav'
            onClick={() =>
              this.setState({
                isHidden: !this.state.isHidden
              })
            }
          >
            <div>
              <span />
              <span />
            </div>
          </a>
          <label className='course-category'>Marketing e Vendas</label>
          <h2 className='course-title'>Primeira Venda</h2>
          <div className='course-progress'>
            <label>Progresso: 20%</label>
            <div className='progress-bar'>
              <span style={{ width: '40%' }} />
            </div>
          </div>
        </div>
        <div className='course-block course-actions'>
          <a className='button'>
            <Icon name='home' />
            <span>Inicio</span>
          </a>
          <a className='button'>
            <Icon name='video' />
            <span>Tela do Curso</span>
          </a>
        </div>

        <div className='modules-block'>
          <ModuleList
            courseID={this.props.courseID}
            editable={false}
            type='simple'
          />
        </div>
      </aside>
    );
  }
}

export default SideMenu;