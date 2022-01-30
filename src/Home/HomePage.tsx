import axios from 'axios';
import { ethers } from 'ethers';
import produce from 'immer';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { AssetEvent } from './AssetEvent';
import { useInterval } from './useInterval';

const getDateFromOpenSeaISOString = (isoString: string) => {
  let timestamp = isoString;
  if (!timestamp.endsWith('Z')) {
    timestamp = timestamp += 'Z';
  }
  return new Date(timestamp);
};

type InternalEvent = {
  asset: {
    imageURL: string;
    name: string;
    tokenId: string;
    tokenAddress: string;
  };
  seller: string;
  buyer: string;
  price: string;
  timestamp: Date;
  transactionHash: string;
};

const HomePage = () => {
  const [events, setEvents] = useState<InternalEvent[]>([]);
  const thresholdDate = useMemo(() => new Date('2022-01-30T06:00:00.000Z'), []);
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchData = useCallback(() => {
    setFetching(true);
    axios
      .get<{ asset_events: AssetEvent[] }>(
        `https://api.opensea.io/api/v1/events?collection_slug=azuki&event_type=successful&only_opensea=false&offset=0&limit=20&occurred_after=${thresholdDate.toISOString()}`,
        {
          headers: {
            'X-API-KEY': 'api-key',
          },
        },
      )
      .then(({ data: { asset_events: assetEvents } }) => {
        setFetching(false);
        for (const event of assetEvents) {
          const date = getDateFromOpenSeaISOString(event.created_date);
          const transactionHash = event.transaction.transaction_hash;

          if (
            date > thresholdDate &&
            events.findIndex((e) => e.transactionHash === transactionHash) ===
              -1
          ) {
            setEvents((prev) => [
              {
                asset: {
                  imageURL: event.asset.image_url,
                  name: event.asset.name,
                  tokenId: event.asset.token_id,
                  tokenAddress: event.asset.asset_contract.address,
                },
                seller: event.seller.address,
                buyer: event.winner_account.address,
                price: ethers.utils.formatEther(event.total_price),
                timestamp: date,
                transactionHash,
              },
              ...prev,
            ]);
          }
        }
      });
  }, [thresholdDate, events]);

  const firstFetchRef = useRef<boolean>(false);
  useEffect(() => {
    if (firstFetchRef.current) {
      return;
    }
    firstFetchRef.current = true;
    fetchData();
  }, [fetchData]);

  useInterval(() => {
    fetchData();
  }, 10_000);

  const sortedData = useMemo(() => {
    return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [events]);

  return (
    <Container>
      <code>{JSON.stringify({ fetching })}</code>
      <EventList>
        {sortedData.map((event) => {
          return (
            <li key={`${event.asset.tokenId}-${event.seller}-${event.buyer}`}>
              <Image src={event.asset.imageURL} alt={event.asset.name} />
              <small>{`${event.seller} -> ${event.buyer}`}</small>
              <br />
              {event.asset.name} sold for <strong>{event.price}Ξ</strong>
              <br />
              <small>{event.timestamp.toISOString()}</small>
            </li>
          );
        })}
      </EventList>
    </Container>
  );
};

export default HomePage;

const Container = styled.div``;

const EventList = styled.ul`
  margin: 64px 0;
  padding: 0;
  list-style-type: none;

  & > li {
    padding: 20px;
    font-size: 0.95rem;

    small {
      font-size: 0.75rem;
    }
  }
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  float: left;
  margin-right: 12px;
`;
