import React from 'react';
import { Tabs, Pane } from './Tabs';
import CourseBasicInfoContainer from '../containers/CourseBasicInfoContainer';
import CourseAdvanced from './CourseAdvanced';
import CoursePersonalization from './CoursePersonalization';
import Marketing from '../components/Marketing';

const CourseEdit = () => (
	<form>
		<section className='page-content page-course'>
			<div className='container'>
				<Tabs>
                    <Pane title='Informações Básicas' icon='paper'>
                        <CourseBasicInfoContainer />
                    </Pane>
                    <Pane title='Configurações Avançadas' icon='paper'>
                        <CourseAdvanced />
                    </Pane>
                    <Pane title="Personalizações" icon='paper'>
                        <CoursePersonalization />
                    </Pane>
                    <Pane title="Marketing" icon='paper'>
                        <Marketing />
                    </Pane>
                    <Pane title="Avaliações" icon='paper'>
                        <h1> Avaliações </h1>
                    </Pane>
				</Tabs>
			</div>
		</section>
	</form>
);

export default CourseEdit;
