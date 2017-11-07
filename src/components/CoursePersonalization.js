import React from 'react';
import reactCSS from 'reactcss'
import { ChromePicker } from 'react-color';
import Icon from './Icon';

class ButtonExample extends React.Component {
  state = {
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div className="input-color" style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div  style={ styles.cover } onClick={ this.handleClose }/>
          <ChromePicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

const CoursePersonalization = ({ data }) => (
	<section className="page-content">
	    <div className="container">
			<div className="row form-section">
				<div className="s12 m4 col">
					<div className="form-block">
						  
			                <h3 className="form-block-title">Miniatura do Card</h3>
			                  <p className="date-description">Essa foto será utilizada nas listagens do curso</p>
			                  <label className="input-label">Tamanho sugerido: 170x220</label>
			                  <a className="input-img card-img">
								<Icon name='paper' />
								<span>Alterar Logo</span>
							  </a>
			           
					</div>
				</div>
				<div className="s12 m4 col">
					<div className="form-block">
						
	                  <h3 className="form-block-title">Logo do Cabeçalho</h3>
	                  <p className="date-description">Esse logo aparecerá no header do curso:</p>
	                  <label className="input-label">Tamanho sugerido: 220x60</label>
					  <a className="input-img header-logo horizontal">
						<Icon name='paper' />
						<span>Alterar Logo</span>
					  </a>
			         
					</div>
				</div>

				<div className="s12 m4 col">
					<div className="form-block">
			                <h3 className="form-block-title">Cor Primária</h3>
			                <p className="date-description">Essa cor será utilizada em grande parte do elementos visuais do curso</p>
			                <ButtonExample/>
					</div>

					<div className="form-block">
			              <h3 className="form-block-title">Cor Destaque</h3>
		                  <p className="date-description">Essa cor será utilizada em botões e links, elementos que chamam atenção do usuário</p>
		                  <ButtonExample/>
					</div>
				</div>
			</div>

			<div className="row form-section">
				<div className="s12 m12 col">
					<h3 class="form-section-title">Personalizações de Login</h3>
				</div>
				<div className="s12 m4 col">
					<div className="form-block">
						 
			                <h3 className="form-block-title">Logo do Formulário</h3>
			                  <p className="date-description">Essa imagem será utilizada no formulario de login para acessar o curso</p>
			                  <label className="input-label">Tamanho sugerido: 170x220</label>
			                  <a className="input-img card-img">
								<Icon name='paper' />
								<span>Alterar Logo</span>
							  </a>
			
					</div>
				</div>
				
				<div className="s12 m4 col">
					<div className="form-block">
			                <h3 className="form-block-title">Cor do Plano de Fundo</h3>
			                  <p className="date-description">Essa cor será utilizada na tela de login. Caso utilize uma imagem, a imagem irá sobrepor a cor</p>
			                  <ButtonExample/>
			                  
					</div>
				</div>

				<div className="s12 m4 col">
					<div className="form-block">
						
			                <h3 className="form-block-title">Imagem de Fundo</h3>
			                  <p className="date-description">Essa imagem será utilizada como fundo da tela de login.</p>
			                  <label className="input-label">Tamanho sugerido: 1920x1080</label>
							  <a className="input-img header-logo ">
								<Icon name='paper' />
								<span>Alterar Logo</span>
							  </a>
			          
					</div>
				</div>

			</div>
	    </div>
	</section>
);

export default CoursePersonalization;
