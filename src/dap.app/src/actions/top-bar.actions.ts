import { action } from 'typesafe-actions';

export const IS_ONLINE = '[TOP-BAR] Is Online';
export const IS_OFFLINE = '[TOP-BAR] Is Offline';

export const isOnlineAction = () => action(IS_ONLINE);
export const isOfflineAction = () => action(IS_OFFLINE);
