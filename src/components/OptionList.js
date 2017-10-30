import React from 'react';
import Option from './Option';

const OptionList = () => (
    <div className="block side-menu">
        <nav>
            <ul>
                <Option
                    data={{
                        title: 'Biblioteca',
                        icon: 'package',
                    }}
                />
                <Option
                    data={{
                        title: 'Minha Vitrine',
                        icon: 'package',
                    }}
                >
                    <Option
                        data={{
                            title: 'Pacotes/Tracks',
                            icon: 'package',
                        }}
                    />
                    <Option
                        data={{
                            title: 'Cursos',
                            icon: 'package',
                        }}
                    />
                </Option>
            </ul>
        </nav>
    </div>
);

export default OptionList;
