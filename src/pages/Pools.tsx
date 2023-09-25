import React from 'react';

import { useApollo } from '../apollo/client';

export default function Pools() {
  const client = useApollo('poolInformation');
  return <div>Pools</div>;
}
