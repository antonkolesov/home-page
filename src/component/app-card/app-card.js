import Core from 'core';
import './app-card.scss';

const AppCard = (props) => {
    let {color, name, url, ...rest} = props;

    return (
        <a {...rest}
            classList="app-card"
            href={url}>
            {name}
        </a>
    );
};

export default AppCard;