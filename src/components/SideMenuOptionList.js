import React from 'react';
import SideMenuOption from './SideMenuOption';

const SideMenuOptionList = () => (
    <div className="block side-menu">
        <nav>
            <ul>
                <SideMenuOption
                    data={{
                        title: 'Biblioteca',
                        icon: 'paper',
                    }}
                />
                <SideMenuOption
                    data={{
                        title: 'Minha Vitrine',
                        icon: 'paper',
                    }}
                >
                    <SideMenuOption
                        data={{
                            title: 'Pacotes/Tracks',
                            icon: 'paper',
                        }}
                    />
                    <SideMenuOption
                        data={{
                            title: 'Cursos',
                            icon: 'paper',
                        }}
                    />
                </SideMenuOption>
            </ul>
        </nav>
    </div>
);

export default SideMenuOptionList;
