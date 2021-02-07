import Core from 'core';
import './icon.scss';

const Icon = (props) => {
    let {name, size, ...rest} = props;

    return (
        <div {...rest}
            classList={['icon', {name, size}]}/>
    );
};

export default Icon;