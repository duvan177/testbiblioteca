import { DATA } from './apiTest'
export const initDataBase = async () => {
    const keys = Object.keys(DATA);
      keys.map(item => !localStorage.getItem(item) && localStorage.setItem(item, JSON.stringify(DATA[item])));
}
