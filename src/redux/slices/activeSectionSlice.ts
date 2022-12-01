import { createSlice } from '@reduxjs/toolkit';
// Auxiliary Functions
import { searchParam } from '../../auxiliary-functions/js/сonvert';
// Types
import type { PayloadAction } from '@reduxjs/toolkit';

// Function to get data from file .env
const getData = (key: string, parse: boolean = false) => {
  const data =
    process.env?.[`REACT_APP__${key.toUpperCase().replace(/\s/g, '_')}`];
  return parse ? JSON.parse(data || '{}') : data;
};

const checkLanguage = document.documentElement.lang === 'ru';
const language = checkLanguage ? 'ru' : 'en';
const animateTime: number = Number(getData('ANIMATE_PAGE_FLIP'));
const parameter: string = getData('PARAMETER_SEARCH').replace(/[^a-z]/gi, '');
const path: string = searchParam(
  new URL(document.location.href).search,
  parameter,
  getData('PATH_ACTIVE')
);
const paths: string[] = getData('PATHS', true);
const sections: { [key: string]: KeyObj<Lang, string> } = getData(
  'SECTION',
  true
);

interface IInitialState {
  lang: { bool: boolean; code: Lang };
  animate: number;
  parameter: string;
  paths: string[];
  path: string;
  sections: { [key: string]: KeyObj<Lang, string> };
  data: any;
}

const initialState: IInitialState = {
  lang: { bool: checkLanguage, code: language },
  animate: animateTime,
  parameter: parameter,
  path: path,
  paths: paths,
  sections: sections,
  data: getData(searchParam(path, parameter, path), true),
};

export const activeSectionSlice = createSlice({
  name: 'activeSection',
  initialState,
  reducers: {
    activeData: (state, action: PayloadAction<string>) => {
      const getPath = searchParam(action.payload, parameter, path);
      state.path = getPath;
      state.data = getData(getPath, true);
    },
    activeLanguage: (state, action: PayloadAction<Lang>) => {
      document.documentElement.lang = action.payload;
      state.lang = { bool: action.payload === 'ru', code: action.payload };
    },
  },
});

export const { activeData, activeLanguage } = activeSectionSlice.actions;
export default activeSectionSlice.reducer;
