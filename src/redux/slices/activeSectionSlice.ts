import { createSlice } from '@reduxjs/toolkit';
// Auxiliary Functions
import { searchParam } from '../../auxiliary-functions/js/сonvert';
// Types
import type { PayloadAction } from '@reduxjs/toolkit';

// Function to get data from file .env
const getData = (key: string, parse: boolean = false) => {
  const data = process.env?.[`REACT_APP__${key.toUpperCase()}`];
  return parse ? JSON.parse(data || '{}') : data;
};

const language = document.documentElement.lang;
const animateTime: number = Number(getData('ANIMATE_PAGE_FLIP'));
const parameter: string = getData('PARAMETER_SEARCH').replace(/[^a-z]/gi, '');
const path: string = searchParam(
  new URL(document.location.href).search,
  parameter,
  getData('PATH_ACTIVE')
);
const paths: string[] = getData('PATHS', true);

interface CounterState {
  lang: string;
  animate: number;
  parameter: string;
  paths: string[];
  path: string;
  data: any;
}

const initialState: CounterState = {
  lang: language,
  animate: animateTime,
  parameter: parameter,
  path: path,
  paths: paths,
  data: getData(searchParam(path, parameter, path), true),
};

export const activeSectionSlice = createSlice({
  name: 'activeSection',
  initialState,
  reducers: {
    activeData: (state, action: PayloadAction<string>) => {
      const section = searchParam(action.payload, parameter, path);
      state.path = section;
      state.data = getData(section, true);
    },
  },
});

export const { activeData } = activeSectionSlice.actions;
export default activeSectionSlice.reducer;
