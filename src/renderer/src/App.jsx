import Versions from './components/Versions';
import { useSDK } from '@metamask/sdk-react';
import { useAccountStore } from './stores/account-store';

function App() {
  const account = useAccountStore(state => state.account);
  const connectAccount = useAccountStore(state => state.connectAccount);
  const { sdk, connected, provider, chainId, ready } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk.connect();
      connectAccount({ account: accounts[0], connected, chainId });
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Versions></Versions>
      <h1>Hello World</h1>
      <div className="App">
        <>
          {connected ? (
            <>
              <div>
                <>
                  {chainId && `Connected chain: ${chainId}`}
                  <p></p>
                  {account && `Connected account: ${account}`}
                </>
              </div>
            </>
          ) : (
            <button style={{ padding: 10, margin: 10 }} onClick={connect}>
              Connect
            </button>
          )}
        </>
      </div>
    </div>
  );
}

export default App;
