import React from 'react';
import { Tabs, Pane } from 'components/Tabs';
import CourseBasicInfoContainer from './BasicInfo';
import CourseAdvanced from './Advanced';
import CoursePersonalization from './Personalization';
import Marketing from './Marketing';
import styles from './styles.css';

const CourseEdit = () => (
	<form>
		<section className={styles.component}>
			<div className='container'>
                <div class="course-header">
                    <div className='input-field bigger'>
                        <input id='course-name' type='text' />
                        <label htmlFor='course-name'>Nome do Curso/Programa</label>
                    </div>
                    <div>
                        <div className='input-field bigger'>
                            <label htmlFor='course-name'>Status do Curso</label>
                            <input id='course-name' type='text' value="Publicado" />
                        </div>
                    </div>
                </div>
				<Tabs id="courseEditTab">
                    <Pane title='Informações Básicas' icon='package'>
                        <CourseBasicInfoContainer />
                    </Pane>
                    <Pane title='Configurações Avançadas' icon='gears'>
                        <CourseAdvanced />
                    </Pane>
                    <Pane title="Personalizações" icon='color-pallete'>
                        <CoursePersonalization />
                    </Pane>
                    <Pane title="Marketing" icon='chat-rounded'>
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
