import { thunk } from 'easy-peasy';

export const onGetUserIpInfo = thunk(async actions => {
    const ipInfo = await (await fetch('https://ip.tornado.cash/')).json();
    actions.setUserIpInfo(ipInfo);
});
