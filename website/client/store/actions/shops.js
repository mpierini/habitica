import axios from 'axios';
import { loadAsyncResource } from 'client/libs/asyncResource';
import buyOp from 'common/script/ops/buy';
import sellOp from 'common/script/ops/sell';

export function fetch (store, forceLoad = false) { // eslint-disable-line no-shadow
  return loadAsyncResource({
    store,
    path: 'shops.market',
    url: '/api/v3/shops/market',
    deserialize (response) {
      return response.data.data;
    },
    forceLoad,
  });
}

export function buyItem (store, params) {
  const user = store.state.user.data;
  buyOp(user, {params});
  axios
    .post(`/api/v3/user/buy/${params.key}`);
  // TODO
  // .then((res) => console.log('equip', res))
  // .catch((err) => console.error('equip', err));
}

export function sellItems (store, params) {
  const user = store.state.user.data;
  sellOp(user, {params});
  axios
    .post(`/api/v3/user/sell/${params.type}/${params.key}/${params.amount}`);
  // TODO
  // .then((res) => console.log('equip', res))
  // .catch((err) => console.error('equip', err));
}
