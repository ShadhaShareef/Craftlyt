window.CraftlytPricingInsights = {
  hero: {
    title: 'Price with confidence.',
    description: 'Category benchmarks and trend signals from active Craftlyt listings — so your labor and materials stay fairly valued.',
  },
  categories: [
    { id: 'crochet', name: 'Crochet', avg: 94, min: 42, max: 220, trend: 'up', trendLabel: '+8% vs last quarter' },
    { id: 'resin', name: 'Resin Art', avg: 68, min: 28, max: 185, trend: 'steady', trendLabel: 'Stable demand' },
    { id: 'jewelry', name: 'Jewelry', avg: 72, min: 35, max: 340, trend: 'up', trendLabel: '+12% vs last quarter' },
    { id: 'clay', name: 'Clay Crafts', avg: 58, min: 24, max: 210, trend: 'down', trendLabel: '−3% vs last quarter' },
  ],
  insights: [
    {
      id: 'profit',
      title: 'Most profitable category',
      value: 'Jewelry',
      detail: 'Highest average margin when material costs stay under 35% of list price.',
    },
    {
      id: 'range',
      title: 'Best-performing price range',
      value: '$55 – $95',
      detail: 'Listings in this band convert 2.1× more often than budget-tier pieces.',
    },
    {
      id: 'custom',
      title: 'Custom order insights',
      value: '+24% avg. order value',
      detail: 'Custom requests close 18% faster when first reply includes a price range.',
    },
  ],
  chartBars: [
    { label: 'Under $50', value: 22 },
    { label: '$50–$100', value: 48 },
    { label: '$100–$150', value: 35 },
    { label: '$150+', value: 18 },
  ],
};
