import Core from 'core';
import Icon from 'component/icon';
import './loading-overlay.scss';

const LoadingOverlay = (props) => {

    return (
        <div {...props}
            classList="loading-overlay">
            <Icon
                classList="loading-overlay__icon"
                name="loading"
                size="large"/>
        </div>
    );
}; 

export default LoadingOverlay;