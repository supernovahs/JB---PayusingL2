import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Chain } from "@hop-protocol/sdk";
import { EtherInput } from "../components";
import { Button } from "antd";

function Home({ yourLocalBalance, readContracts, targetNetwork, userSigner, address, price }) {
  const { Hop } = require("@hop-protocol/sdk");
  console.log("targetNetwork", targetNetwork);
  const [amount, setAmount] = useState("0");

  const bridgetx = async () => {
    const hop = new Hop("mainnet");
    const bridge = hop.connect(userSigner).bridge("ETH");
    if (targetNetwork.name === "polygon") {
      const tx = await bridge.send((amount * 10 ** 18).toFixed(0).toString(), Chain.Polygon, Chain.Ethereum, {
        recipient: address,
      });
      console.log("Polygon to Ethereum swap ETH ", tx.hash);
    } else if (targetNetwork.name === "optimism") {
      const tx = await bridge.send((amount * 10 ** 18).toFixed(0).toString(), Chain.Optimism, Chain.Ethereum, {
        recipient: address,
      });
      console.log("Optimism to Ethereum swap ETH ", tx.hash);
    } else if (targetNetwork.name === "arbitrum") {
      const tx = await bridge.send((amount * 10 ** 18).toFixed(0).toString(), Chain.Arbitrum, Chain.Ethereum, {
        recipient: address,
      });
      console.log("Arbitrum to Ethereum swap ETH ", tx.hash);
    } else if (targetNetwork.name === "xdai") {
      const tx = await bridge.send((amount * 10 ** 18).toFixed(0).toString(), Chain.Gnosis, Chain.Ethereum, {
        recipient: address,
      });
      console.log("Gnosis to Ethereum swap ETH ", tx.hash);
    }
  };
  return (
    <div>
      <EtherInput value={amount} onChange={setAmount} price={price} mode="USD" />
      <Button
        onClick={async () => {
          bridgetx();
        }}
      >
        Bridge
      </Button>
    </div>
  );
}

export default Home;
