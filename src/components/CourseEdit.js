import React from 'react';
import CourseBanner from './CourseBanner';
import Icon from './Icon';
import CourseCategorySelect from './CourseCategorySelect';
import CourseTabs from './CourseTabs';
import CourseModuleList from './CourseModuleList';

const CourseEdit = () => (
	<form>
		<section className='page-content page-course'>
			<div className='container'>
				<div className='input-field bigger'>
					<input id='course-name' type='text' />
					<label htmlFor='course-name'>Nome do Curso/Programa</label>
				</div>

				<CourseTabs />

				<CourseBanner />

				<div className='row'>
					<div className='col xl7'>
						<h3 className='form-section-title'>Detalhes do Curso</h3>
						
						<CourseCategorySelect />

						<div className='input-field'>
							<textarea id='textarea1' className='materialize-textarea'></textarea>
							<label htmlFor='textarea1'>Descrição do Curso</label>
						</div>
					</div>
					<div className='col xl5'>
						<div className='form-block'>
							<h3 className='form-section-title'>Autores</h3>
							<a className='button affirmative waves-effect waves-light'>
								<span>Adicionar Autor</span>
							</a>
						</div>
					</div>
				</div>

				<h3 className='form-section-title'>Módulos e Aulas</h3>
				<a className='button affirmative waves-effect waves-light'>
					<span>Adicionar Módulo</span>
				</a>

				<CourseModuleList />
			</div>
		</section>
	</form>
);

export default CourseEdit;