import React from "react";

const StocksDetails = async ({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) => {
  const { symbol } = await params;
  return <div>{symbol}</div>;
};

export default StocksDetails;
