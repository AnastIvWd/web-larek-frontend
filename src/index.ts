import './scss/styles.scss';

import { Api } from './components/base/api';
import { EventEmitter, IEvents } from './components/base/events';
import { API_URL, EventNamesEnum } from './utils/constants';
import { AppData } from './components/appdata';

const api = new Api(API_URL);
const eventEmitter: IEvents = new EventEmitter();
const appData = new AppData(eventEmitter);

