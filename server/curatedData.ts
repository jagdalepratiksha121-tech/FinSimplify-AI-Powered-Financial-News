import { Article } from '../src/types.js';

export const CURATED_FINANCIAL_NEWS: Article[] = [
  {
    id: 'art-001',
    category: 'Economy',
    title: 'Federal Reserve Holds Benchmark Rate Steady at 5.25%-5.50% Amid Persistent Inflation Signals',
    description: 'The Federal Open Market Committee concluded its policy meeting by voting unanimously to maintain the federal funds target range, citing resilient consumer spending and sticky core services inflation.',
    content: 'Federal Reserve policymakers left borrowing costs at a two-decade high following their two-day policy session in Washington. Chair Jerome Powell underscored that while headline price pressures have moderated from their 2022 peaks, core inflation components—specifically shelter, insurance, and medical services—remain elevated above the 2.0% annual target. Powell noted that the central bank is awaiting further data corroborating sustainable disinflation before easing monetary policy restrictions. Yields on two-year Treasury notes swung five basis points following the statement, while equity futures showed muted reaction.',
    url: 'https://www.federalreserve.gov/monetarypolicy.htm',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 42 * 60 * 1000).toISOString(),
    source: { name: 'Federal Reserve / Reuters' },
    simplified: {
      simplified_headline: 'US interest rates stay unchanged as inflation remains a concern.',
      tldr: 'The Federal Reserve decided to keep borrowing costs where they are, waiting for proof that price increases are permanently slowing down.',
      what_happened: 'The Federal Reserve kept interest rates steady between 5.25% and 5.50%. Fed leaders agreed they need to see everyday prices cool down more before lowering borrowing costs.',
      why_it_matters: 'Interest rates influence how much everyday people and companies pay to borrow money for mortgages, car loans, student debt, and business expansion.',
      key_points: [
        'Interest rates remain at their highest levels in twenty years.',
        'High prices for housing, insurance, and medical care continue to resist rapid declines.',
        'The Fed is waiting for several consecutive months of lower inflation data before making cuts.',
        'No rate hikes are currently forecasted, but rate cuts will take longer than anticipated.'
      ],
      financial_terms: [
        {
          term: 'Federal Funds Rate',
          simple_explanation: 'The interest rate commercial banks charge each other to borrow money overnight, which sets the baseline for loan rates nationwide.'
        },
        {
          term: 'Core Inflation',
          simple_explanation: 'A measure of price increases that excludes volatile items like gas and groceries to reveal the true underlying trend in living costs.'
        },
        {
          term: 'Basis Point',
          simple_explanation: 'A standard financial unit of measurement equal to 1/100th of one percent (0.01%). 100 basis points equals 1.0%.'
        }
      ]
    }
  },
  {
    id: 'art-002',
    category: 'Markets',
    title: 'S&P 500 Touches Fresh All-Time High Driven by Semiconductor Rally and Robust Big Tech Earnings',
    description: 'Wall Street benchmark indices gained as chipmakers led a technology rebound, offsetting concerns over prolonged high interest rates and commercial real estate exposure.',
    content: 'The S&P 500 index crossed another record milestone on heavy trading volume, powered by a 4.2% surge in leading semiconductor manufacturers. Investor appetite for generative artificial intelligence infrastructure continues to outpace macroeconomic headwinds. Corporate balance sheets among top capitalized firms revealed accelerating capital expenditure commitments toward next-generation data centers and tensor processing units, while traditional cyclical sectors such as manufacturing and regional banking traded sideways.',
    url: 'https://www.bloomberg.com/markets',
    urlToImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    source: { name: 'Bloomberg Markets' },
    simplified: {
      simplified_headline: 'Stock market reaches a record high as computer chip companies report strong growth.',
      tldr: 'Major US stocks hit new record levels thanks to huge corporate demand for computer hardware that runs modern AI applications.',
      what_happened: 'The S&P 500 stock index reached a brand new peak. Investors eagerly bought shares of semiconductor and hardware firms that build parts for artificial intelligence servers.',
      why_it_matters: 'When the S&P 500 rises, the value of retirement savings, pension funds, 401(k) accounts, and index funds held by everyday workers increases.',
      key_points: [
        'The S&P 500 reached an all-time record high during morning trading.',
        'Computer chip producers gained over 4% in a single day.',
        'Companies are committing tens of billions of dollars to build AI server facilities.',
        'Other sectors like small retail and regional banks did not participate in the surge.'
      ],
      financial_terms: [
        {
          term: 'S&P 500',
          simple_explanation: 'An index tracking the performance of 500 of the largest publicly traded companies in the United States.'
        },
        {
          term: 'Capital Expenditure (CapEx)',
          simple_explanation: 'Money spent by a corporation on buying or upgrading physical assets, like buildings, machinery, and computer servers.'
        },
        {
          term: 'Cyclical Sectors',
          simple_explanation: 'Industries whose profits rise and fall directly with the overall strength of the economy (e.g., travel, luxury goods, construction).'
        }
      ]
    }
  },
  {
    id: 'art-003',
    category: 'Technology',
    title: 'Cloud Hyperscalers Announce Combined $180 Billion AI Infrastructure Capex for Current Fiscal Year',
    description: 'Tech giants ramp up investments in custom silicon, high-bandwidth memory, and liquid-cooled data facilities to support growing enterprise AI deployment demands.',
    content: 'Leading enterprise cloud providers have collectively signaled unprecedented capital expenditure forecasts totaling approximately $180 billion over the next twelve months. Quarterly filings indicated high operational margins in cloud enterprise divisions despite substantial depreciation schedules for hardware assets. Analysts noted that monetization velocity will be scrutinized in upcoming investor calls, as institutional stakeholders demand tangible return on invested capital metrics.',
    url: 'https://www.wsj.com/tech',
    urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    source: { name: 'The Wall Street Journal' },
    simplified: {
      simplified_headline: 'Tech giants plan to spend $180 billion building massive artificial intelligence data hubs.',
      tldr: 'World-leading tech companies are investing an eye-popping $180 billion this year to construct data centers capable of running advanced AI.',
      what_happened: 'Major cloud and technology corporations revealed huge budgets dedicated to specialized computer chips, high-speed memory, and cooling systems needed for AI apps.',
      why_it_matters: 'This massive spending drives business to hardware suppliers, electric utilities, and construction firms, but investors will expect these investments to produce actual profits soon.',
      key_points: [
        'Total planned hardware spending across top tech firms reached $180 billion.',
        'Primary investments target specialized processing chips and energy-efficient data centers.',
        'Cloud software divisions generated solid profits to fund these capital investments.',
        'Wall Street investors are watching closely to see when customer revenue covers these expenses.'
      ],
      financial_terms: [
        {
          term: 'Hyperscaler',
          simple_explanation: 'A massive technology corporation that operates giant worldwide data networks (like Amazon AWS, Microsoft Azure, Google Cloud).'
        },
        {
          term: 'Depreciation',
          simple_explanation: 'An accounting method of spreading the cost of an expensive physical asset over the years it is actually used.'
        },
        {
          term: 'Return on Invested Capital (ROIC)',
          simple_explanation: 'A percentage that measures how efficiently a company turns invested money into new profits.'
        }
      ]
    }
  },
  {
    id: 'art-004',
    category: 'Banking',
    title: 'Global Regulators Finalize Basel III Endgame Capital Rules with Eased Lending Buffer Requirements',
    description: 'Banking authorities unveil refined framework that reduces proposed capital hike from 19% to 9%, averting fears of immediate consumer credit contraction.',
    content: 'The Federal Reserve, FDIC, and OCC presented a calibrated version of the Basel III Endgame bank capital package. Following extensive lobbying from commercial lenders, the mandated tier-1 risk-weighted asset buffer increase was trimmed from an initial 19% down to approximately 9%. The adjustment aims to balance systemic financial stability with the availability of residential mortgage origination and small business lending facilities across Tier 1 holding companies.',
    url: 'https://www.ft.com/banking',
    urlToImage: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
    source: { name: 'Financial Times' },
    simplified: {
      simplified_headline: 'Regulators soften new safety rules for big banks, preventing a squeeze on consumer loans.',
      tldr: 'Government supervisors lowered the amount of extra cash banks must keep locked in vaults, easing fears that mortgages and small business loans would dry up.',
      what_happened: 'Financial regulators reduced a planned requirement for big banks to hold extra safety reserves from 19% down to 9% after lenders warned the original rule would stifle loans.',
      why_it_matters: 'If banks are forced to hold too much rainy-day cash, they issue fewer home loans and charge higher interest rates to everyday borrowers.',
      key_points: [
        'Proposed emergency cash reserves were cut from a 19% requirement to roughly 9%.',
        'Banks argued the earlier rule would have made home mortgages and car loans harder to obtain.',
        'Regulators agreed to the compromise to safeguard the economy while maintaining bank safety.',
        'The new guidelines apply specifically to the largest financial institutions.'
      ],
      financial_terms: [
        {
          term: 'Basel III',
          simple_explanation: 'An international set of banking safety standards created after the 2008 financial crisis to prevent bank collapses.'
        },
        {
          term: 'Tier 1 Capital',
          simple_explanation: 'The purest, safest core money a bank possesses (like cash and shareholder equity) to absorb unexpected losses.'
        },
        {
          term: 'Credit Contraction',
          simple_explanation: 'A situation where banks become hesitant to lend money, making loans scarce and difficult for borrowers to obtain.'
        }
      ]
    }
  },
  {
    id: 'art-005',
    category: 'Global Markets',
    title: 'European Central Bank Delivers Quarter-Point Rate Cut as Eurozone Inflation Cools to 2.2%',
    description: 'Frankfurt policymakers trim the deposit facility rate to 3.50%, highlighting divergent monetary paths between Europe and North America.',
    content: 'The European Central Bank reduced its key deposit rate by 25 basis points to 3.50% at its meeting in Frankfurt. ECB President Christine Lagarde confirmed that wage growth within the 20-nation currency bloc is decelerating and headline inflation has steadily trended toward the 2% target. However, Lagarde stressed that the Governing Council is not pre-committing to a specific rate path, adopting a meeting-by-meeting stance influenced by incoming economic surveys and export demand.',
    url: 'https://www.ecb.europa.eu',
    urlToImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 320 * 60 * 1000).toISOString(),
    source: { name: 'CNBC International' },
    simplified: {
      simplified_headline: 'European Central Bank cuts interest rates by 0.25% as European inflation eases.',
      tldr: 'Europe lowered its key interest rate to 3.50% because everyday price increases across European nations have slowed down significantly.',
      what_happened: 'The central bank governing Europe cut its primary interest rate by a quarter percentage point, marking a major step toward cheaper borrowing across the continent.',
      why_it_matters: 'Lower interest rates in Europe make home mortgages cheaper for European families and help revive sluggish business activity across Germany, France, and Italy.',
      key_points: [
        'The main European interest rate dropped from 3.75% to 3.50%.',
        'Inflation in Europe has fallen back close to normal levels at 2.2%.',
        'Employee wage growth in European companies has stopped accelerating rapidly.',
        'Officials will evaluate future rate cuts one month at a time depending on economic data.'
      ],
      financial_terms: [
        {
          term: 'Deposit Facility Rate',
          simple_explanation: 'The interest rate commercial banks receive when they deposit their spare overnight money with the central bank.'
        },
        {
          term: 'Eurozone',
          simple_explanation: 'The economic region comprising 20 European Union countries that have adopted the Euro as their common currency.'
        },
        {
          term: 'Monetary Policy',
          simple_explanation: 'Actions taken by a nation central bank to manage the supply of money and the cost of borrowing.'
        }
      ]
    }
  },
  {
    id: 'art-006',
    category: 'Startups',
    title: 'Global Venture Capital Deal Count Stabilizes as AI and Defense Tech Attract Record Valuations',
    description: 'Venture funding exhibits bifurcated dynamics: generative AI startups secure top-tier rounds while traditional SaaS and consumer tech experience disciplined valuation multiples.',
    content: 'Global venture capital activity showed signs of stabilization in the latest quarter, recording $68 billion deployed across early- and growth-stage rounds. While total deal volume remains below the peak era of 2021, median seed and Series A valuations for AI software, defense technology, and renewable grid solutions climbed 22% year-over-year. In contrast, late-stage consumer software startups continued facing recapitalizations, down-rounds, and structured liquidation preferences.',
    url: 'https://techcrunch.com/startups',
    urlToImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 410 * 60 * 1000).toISOString(),
    source: { name: 'TechCrunch / PitchBook' },
    simplified: {
      simplified_headline: 'Startup investments stabilize with AI and defense startups winning big funding.',
      tldr: 'Investors poured $68 billion into new startups last quarter, favoring AI and defense technology while cutting back on generic software apps.',
      what_happened: 'Venture capital investors funded promising young companies again after a long slowdown. Artificial intelligence and national security tech companies commanded premium price tags.',
      why_it_matters: 'Startup investment trends show where tomorrow top technologies, job opportunities, and innovative products are being developed.',
      key_points: [
        'Startups worldwide secured $68 billion in new funding this past quarter.',
        'Early-stage AI and defense startups saw their valuations jump by 22%.',
        'Older software startups that grew without profits are taking painful valuation cuts.',
        'Venture firms are demanding real business revenue rather than just user numbers.'
      ],
      financial_terms: [
        {
          term: 'Venture Capital (VC)',
          simple_explanation: 'Private investment money provided to young, high-risk startup companies with strong growth potential.'
        },
        {
          term: 'Valuation',
          simple_explanation: 'The estimated monetary worth of a company agreed upon by founders and investors.'
        },
        {
          term: 'Down-Round',
          simple_explanation: 'When a private startup sells shares at a lower valuation than it did in its previous funding round.'
        }
      ]
    }
  },
  {
    id: 'art-007',
    category: 'Cryptocurrency',
    title: 'Spot Bitcoin ETFs Record $1.2 Billion Weekly Inflows as Institutional Custody Assets Expand',
    description: 'Regulated exchange-traded products see surging demand from wealth management advisers and pension allocators, boosting liquidity across digital asset spot markets.',
    content: 'Regulated spot Bitcoin exchange-traded funds registered their largest weekly net inflow in four months, absorbing over $1.2 billion in net investor subscriptions. Institutional disclosures reveal expanded participation by registered investment advisors (RIAs), hedge fund arbitrageurs, and state retirement boards. Analysts highlighted that standardized custody frameworks under major financial institutions have mitigated counterparty risk concerns that previously deterred conservative asset managers.',
    url: 'https://www.coindesk.com',
    urlToImage: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 480 * 60 * 1000).toISOString(),
    source: { name: 'CoinDesk / CoinMarketCap' },
    simplified: {
      simplified_headline: 'Regulated Bitcoin investment funds attract $1.2 billion in new institutional money.',
      tldr: 'Wall Street investment firms and pension funds invested over $1.2 billion into regulated Bitcoin ETFs in a single week.',
      what_happened: 'Mainstream financial advisors and retirement funds bought heavy amounts of Bitcoin through traditional stock exchanges via spot ETFs.',
      why_it_matters: 'This allows everyday investors and retirement savers to own cryptocurrency through regular brokerage accounts without having to set up separate crypto wallets.',
      key_points: [
        'Over $1.2 billion in net new cash entered regulated spot Bitcoin funds in one week.',
        'Major retirement funds and wealth managers are now permitted to invest directly.',
        'Traditional Wall Street banks now custody the underlying cryptocurrency safely.',
        'Increased demand helped stabilize digital asset prices and trading volume.'
      ],
      financial_terms: [
        {
          term: 'Exchange-Traded Fund (ETF)',
          simple_explanation: 'An investment fund that bundles assets together and trades on regular stock exchanges just like an individual stock.'
        },
        {
          term: 'Spot Market',
          simple_explanation: 'A market where financial assets are bought and sold for immediate delivery, rather than for a future date.'
        },
        {
          term: 'Institutional Custody',
          simple_explanation: 'Secure safekeeping of financial assets by an authorized, insured financial institution like a trusted bank.'
        }
      ]
    }
  },
  {
    id: 'art-008',
    category: 'Business',
    title: 'Berkshire Hathaway Cash Reserves Touch Record $325 Billion as Warren Buffett Trims Key Equity Stakes',
    description: 'Omaha conglomerate signals cautious market stance by accumulating short-term Treasury bills while scaling back holdings in consumer tech and banking.',
    content: 'Warren Buffett Berkshire Hathaway reported a record cash hoard of $325.2 billion in its latest quarterly shareholder report. The conglomerate reduced its equity positions in several longtime holdings, including consumer hardware and commercial lenders, reinvesting proceeds into high-yielding short-dated Treasury bills earning over 4.5% risk-free. Analysts interpret the accumulation of liquidity as an intentional posture to deploy capital opportunistically when market valuations recede.',
    url: 'https://www.cnbc.com/berkshire-hathaway',
    urlToImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    publishedAt: new Date(Date.now() - 560 * 60 * 1000).toISOString(),
    source: { name: 'CNBC / Wall Street Journal' },
    simplified: {
      simplified_headline: 'Warren Buffett company builds a record $325 billion cash pile, waiting for cheaper stock deals.',
      tldr: 'Berkshire Hathaway sold portions of its stock holdings and now holds an unprecedented $325 billion in cash and government bonds.',
      what_happened: 'Legendary investor Warren Buffett chose to sell shares of major companies and park the money in safe US Treasury bills earning over 4.5% interest.',
      why_it_matters: 'When the world most famous long-term investor sits on record cash, it suggests stock prices might be considered expensive and he is waiting for bargains.',
      key_points: [
        'Berkshire Hathaway cash reserves reached a record $325.2 billion.',
        'The company trimmed holdings in top tech and bank stocks.',
        'The money is safely earning over 4.5% interest in US Treasury bills without taking stock market risk.',
        'Buffett is waiting for market prices to drop before making big new corporate acquisitions.'
      ],
      financial_terms: [
        {
          term: 'Conglomerate',
          simple_explanation: 'A massive corporation that owns and operates multiple entirely separate businesses in different industries.'
        },
        {
          term: 'Treasury Bills (T-Bills)',
          simple_explanation: 'Short-term debt securities issued by the US government that pay interest and are considered among the safest investments in the world.'
        },
        {
          term: 'Equity Stake',
          simple_explanation: 'The percentage of ownership that an investor or company holds in another business through shares of stock.'
        }
      ]
    }
  }
];
