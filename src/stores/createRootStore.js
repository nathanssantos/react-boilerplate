import { wrapRoot } from 'mobx-easy';

import env from '../services/api';

import RootStore from './containers/RootStore';

export default async function createRootStore() {
  return wrapRoot({ RootStore, env });
}
