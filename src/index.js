import Core from 'core';
import AppList from 'component/app-list';

import reducer from 'reducer';
import actions from 'actions';

import './index.scss';

Core.render(
    <Core.Store
        reducer={reducer}
        actions={actions}>
        <AppList/>
    </Core.Store>
);