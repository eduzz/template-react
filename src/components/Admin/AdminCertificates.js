import React from 'react';
import Icon from '../Icon';
import RangeSlider from '../RangeSlider';
export default class AdminCertificates extends React.Component {
	render(){
		return(
			<div className="container">
				<section className="form-section">
					<div className="row">
						<div className="col m12 l12">
							<div className="form-block">
								<div className="switch">
									<label>
										<input type="checkbox" id="check-hascertificate"/>
										<span className="lever"></span>
									</label>
									
									<label htmlFor="check-hascertificate">
										<h3 className="form-block-title">Habilitar Certificado</h3>
										<p className="check-description">Com essa opção você habilita o uso de Certificado neste Curso</p>
									</label>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="form-section">
					<div className="row">
						<div className="col m6 l6">
							<div className="form-block">
								<h3 className="form-block-title">Progresso Mínimo para Liberação</h3>
								<RangeSlider />
							</div>
						</div>
						<div className="col m6 l6">
							<div className="form-block">
								<h3 className="form-block-title">Nome do Professor</h3>
								<p className="input-description">Aparecerá no Certificado</p>
								<div className="input-field">
									<input id="TeacherName" type="text" className="validate" />
								</div>
							</div>
						</div>	
					</div>
				</section>	
				<section className="form-section">
					<div className="row">
						<div className="s12 m12 col">
							<h3 className="form-section-title">Imagens do Certificado</h3>
						</div>
						<div className="s12 m4 col">
							<div className="form-block">
				                <h3 className="form-block-title">FRENTE</h3>
			                	<p className="input-description">Imagem que ficará na parte da frente do Certificado</p>
			                  	<label className="input-label">Tamanho sugerido: 800x600</label>
			                  	<a className="input-img login-logo"> <Icon name='paper' /> <span>FRENTE (Alterar)</span> </a>
							</div>
						</div>
						<div className="s12 m4 col">
							<div className="form-block">
				                <h3 className="form-block-title">VERSO</h3>
			                	<p className="input-description">Imagem que ficará na parte de trás do Certificado</p>
			                  	<label className="input-label">Tamanho sugerido: 800x600</label>
			                  	<a className="input-img login-logo"> <Icon name='paper' /> <span>VERSO (Alterar)</span> </a>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}
}