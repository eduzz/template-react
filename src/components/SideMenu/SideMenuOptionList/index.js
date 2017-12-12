import React from 'react';
import SideMenuOption from './SideMenuOption';
import styles from './styles.css';

const SideMenuOptionList = () => (
    <div className={styles.component}>
        <nav>
            <ul>
                <SideMenuOption
                    data={{
                        title: 'Área de Ensino',
                        icon: 'library',
                        to : '/student/courses'
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Minha Vitrine',
                        icon: 'showcase',
                        to : '/'
                    }}
                >
                    <SideMenuOption
                        data={{
                            title: 'Pacotes/Assinaturas',
                            icon: 'package',
                            to : '/producer/packages'
                        }}
                    />
                    <SideMenuOption
                        data={{
                            title: 'Cursos',
                            icon: 'play-rounded',
                            to : '/producer/courses'
                        }}
                    />
               
                </SideMenuOption>
                <SideMenuOption
                    data={{
                        title: 'Comentários',
                        icon: 'chat-rounded',
                        to : '/producer/comments'
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Alunos',
                        icon: 'students',
                        to : '/producer/students'
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Comunicação',
                        icon: 'mailbox',
                        to : '/'
                    }}
                >
                    <SideMenuOption
                        data={{
                            title: 'Convites',
                            icon: 'airplane',
                            to : '/producer/invites'
                        }}
                    />
                    <SideMenuOption
                        data={{
                            title: 'Novidades',
                            icon: 'letter',
                            to : '/producer/news'
                        }}
                    />
                </SideMenuOption>
            </ul>
        </nav>
    </div>
);

export default SideMenuOptionList;
