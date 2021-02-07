import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'seamless-immutable';

const empty = Symbol('empty');
const pending = Symbol('pending');
const err = Symbol('err');

const createElement = (type, props, ...children) => {
    if (props) {
        let {classList, className} = props;

        if (classList) {
            if (Array.isArray(classList)) {
                let [prefix, modifiers] = classList;

                if (modifiers) {
                    modifiers = Object.entries(modifiers)
                        .map(([name, value]) => {
                            if (value || value === 0) {
                                return prefix + '--' + name + (value === true ? '' : '-' + value);
                            }
                        });
                }

                className = [prefix, ...modifiers, className];
            } else {
                className = [classList, className];
            }

            className = className
                .filter(i => i)
                .join(' ');

            if (className) {
                props.className = className;
            }

            delete props.classList;
        }
    }
    return React.createElement(type, props, ...children);
};

const createReducer = (reducer) => {
    let {instance} = createReducer;

    if (instance) {
        return instance;
    }

    let {defaults} = reducer;

    if (defaults) {
        delete reducer.defaults;
        defaults = Immutable(defaults);
    }

    return createReducer.instance = [
        (prevState, action) => {
            let {type, args} = action,
                handler = reducer[type],
                nextState;

            if (handler) {
                nextState = handler(prevState, ...args);
            }

            return nextState === undefined ? prevState : nextState;
        },
        defaults
    ];
};

const error = (...args) => {
    return Object.assign(new Error(...args), {
        [err]: true
    });
};
error[err] = true;

const isError = (value) => {
    return (typeof value === 'object' || typeof value === 'function') && value[err] === true;
};

const isEmpty = (value) => {
    return value === empty;
};

const isPending = (value) => {
    return value === pending;
};

const render = (element, container = '.root') => {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }

    return ReactDOM.render(element, container);
};

const useStore = () => {
    return React.useContext(Context);
};

const Context = React.createContext();

const Store = (props) => {
    let {reducer, actions, ...rest} = props,
        [store, nativeDispatch] = React.useReducer(...createReducer(reducer)),
        dispatch = (type, ...args) => {
            let handler = actions[type];

            if (handler) {
                handler(...args, dispatch);
            } else {
                nativeDispatch({type, args});
            }
        }

    return React.createElement(
        Context.Provider,
        Object.assign({}, rest, {value: {store, dispatch}})
    );
};

const {Fragment, useEffect} = React;

export default {
    Fragment,
    Store,
    createElement,
    empty,
    error,
    isEmpty,
    isError,
    isPending,
    pending,
    render,
    useEffect,
    useStore
}