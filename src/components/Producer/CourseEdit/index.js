import React from 'react';
import { Tabs, Pane } from 'components/Tabs';
import CourseBasicInfoContainer from './BasicInfo';
import CourseAdvanced from './Advanced';
import CoursePersonalization from './Personalization';
import Marketing from './Marketing';

const CourseEdit = () => (
	<form>
		<section className='page-content page-course'>
			<div className='container'>
				<Tabs id="courseEditTab">
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
                    <Pane title="Certificados" icon='paper'>
                        <h1> Certificados </h1>
                    </Pane>
				</Tabs>
			</div>
		</section>
	</form>
);

export default CourseEdit;
