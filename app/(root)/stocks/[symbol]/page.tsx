import TradingViewWidget from "@/components/TradingViewWidget";
import {
  BASELINE_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/contants";

const StocksDetails = async ({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) => {
  const { symbol } = await params;
  const script = "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className="flex flex-row justify-between w-full min-h-screen gap-4">
      <div className="flex flex-col gap-7 w-full lg:w-[60vw]">
        <TradingViewWidget
          title=""
          scriptUrl={`${script}symbol-info.js`}
          config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
          className="custom-chart"
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${script}advanced-chart.js`}
          config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
          className="custom-chart"
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${script}advanced-chart.js`}
          config={BASELINE_WIDGET_CONFIG(symbol)}
          className="custom-chart"
        />
      </div>
      <div className="flex flex-col gap-4 w-full lg:w-[40vw]">
        <TradingViewWidget
          title=""
          scriptUrl={`${script}technical-analysis.js`}
          config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
          className="custom-chart"
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${script}symbol-profile.js`}
          config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
          className="custom-chart"
        />

        <TradingViewWidget
          title=""
          scriptUrl={`${script}financials.js`}
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
          className="custom-chart"
        />
      </div>
    </div>
  );
};

export default StocksDetails;
