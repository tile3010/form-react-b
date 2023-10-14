import { createStore, combineReducers } from "redux";
import { QuanLySinhVienReducer } from './QuanLySinhVienReducer';

const rootReducer = combineReducers({
    QuanLySinhVienReducer: QuanLySinhVienReducer,
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);