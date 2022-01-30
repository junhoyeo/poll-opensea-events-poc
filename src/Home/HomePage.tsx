import { ethers } from 'ethers';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { OpenSeaAbi } from '@/sdk/web3/generated';

import OpenSeaABI from './OpenSea.abi.json';

const provider = new ethers.providers.JsonRpcProvider(
  'https://mainnet.infura.io/v3/2faa3c9e533c4a8ab3bbb98671a5d1db',
);

const HomePage = () => {
  useEffect(() => {
    const contract = new ethers.Contract(
      '0x7be8076f4ea4a4ad08075c2508e481d6c946d12b',
      OpenSeaABI,
      provider,
    ) as OpenSeaAbi;

    contract.on(
      'OrdersMatched',
      (buyHash, sellHash, seller, buyer, price, metadata) => {
        console.log({
          buyHash,
          sellHash,
          seller,
          buyer,
          price: ethers.utils.formatEther(price),
          metadata,
        });
      },
    );
  }, []);

  return <Container />;
};

export default HomePage;

const Container = styled.div``;
