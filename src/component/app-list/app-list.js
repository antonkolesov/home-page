import Core from 'core';
import LoadingOverlay from 'component/loading-overlay';
import AppCard from 'component/app-card';
import './app-list.scss';

const AppList = (props) => {
    let {store, dispatch} = Core.useStore(),
        {apps} = store,
        children;

    Core.useEffect(() => {
        if (Core.isEmpty(apps)) {
            dispatch('readApps');
        }
    });

    if (Core.isEmpty(apps)) {
        return null;
    } else if (Core.isPending(apps)) {
        children = (
            <LoadingOverlay
                classList="app-list__loading-overlay"/>
        );
    } else if (Core.isError(apps)) {
        children = 'Не удалось загрузить список приложений!';
    } else {
        children = apps.map(i => (
            <AppCard {...i}
                key={i.name}
                classList="app-list__app-card"/>
        ));
    }

    return (
        <div {...props}
            classList="app-list">
            {children}
        </div>
    );
};

export default AppList;