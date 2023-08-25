import { IJSON, SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";

import { getGraphDimensions } from "../../helpers/getUniSubgraph";

const v3Endpoint = {
  [CHAIN.BASE]:
    "https://api.studio.thegraph.com/query/50685/exchange-v3-base/version/latest",
};

const VOLUME_USD = "volumeUSD";

const v3Graph = getGraphDimensions({
  graphUrls: v3Endpoint,
  totalVolume: {
    factory: "factories",
  },
  dailyVolume: {
    factory: "beagleDayData",
    field: VOLUME_USD,
  },
  totalFees:{
    factory: "factories",
  },
  dailyFees: {
    factory: "beagleDayData",
    field: "feesUSD"
  },
});

const v3StartTimes = {
  [CHAIN.BASE]: 1692861679,
} as IJSON<number>;

const adapter: SimpleAdapter = {
  adapter: {
    [CHAIN.BASE]: {
      fetch: v3Graph(CHAIN.BASE),
      start: async () => v3StartTimes[CHAIN.BASE]
    },
  },
};

export default adapter;