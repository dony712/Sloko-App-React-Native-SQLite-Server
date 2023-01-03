import {ADD_ITEM, REMOVE_ITEM} from './../screens/ActionTypes';

export const addItemToSelectedItem = data => ({
  type: ADD_ITEM,
  payload: data,
});

export const removeItemFromSelectedItem = index => ({
  type: REMOVE_ITEM,
  payload: index,
});
