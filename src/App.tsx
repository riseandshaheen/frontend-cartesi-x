// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy
// of the license at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

import { FC } from "react";
import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import { useState } from "react";

import { GraphQLProvider } from "./GraphQL";
import { Notices } from "./Notices";
import { Input } from "./Input";
import { Inspect } from "./Inspect";
import { Network } from "./Network";
import { Vouchers } from "./Vouchers";
import { Reports } from "./Reports";
import configFile from "./config.json";
import "./App.css";

const config: any = configFile;

const injected: any = injectedModule();
init({
    wallets: [injected],
    chains: Object.entries(config).map(([k, v]: [string, any], i) => ({id: k, token: v.token, label: v.label, rpcUrl: v.rpcUrl})),
    appMetadata: {
        name: "Cartesi Rollups Test DApp",
        icon: "<svg><svg/>",
        description: "Demo app for Cartesi Rollups",
        recommendedInjectedWallets: [
            { name: "MetaMask", url: "https://metamask.io" },
        ],
    },
});

const App: FC = () => {
    const [dappAddress, setDappAddress] = useState<string>("0x70ac08179605AF2D9e75782b8DEcDD3c22aA4D0C");

    return (
        <div className="main-container">
            <Network />
            <GraphQLProvider>
                <div>
                    Dapp Address: <input 
                        className="address-textbox"
                        type="text"
                        value={dappAddress}
                        onChange={(e) => setDappAddress(e.target.value)}
                    />
                    <br /><br />
                </div>
                <div className="inspect-ui">
                <h2>Inspect</h2>
                <Inspect />
                </div>
                <div className="input-ui">
                <h2>Input</h2>
                <Input dappAddress={dappAddress} />
                </div>
                <div className="reports-ui">
                    <h2>Reports</h2>
                    <Reports />
                </div>
                <div className="notices-ui">
                    <h2>Notices</h2>
                    <Notices />
                </div>
                <div className="vouchers-ui">
                    <h2>Vouchers</h2>
                    <Vouchers dappAddress={dappAddress} />
                </div>
            </GraphQLProvider>
        </div>
    );
};

export default App;
