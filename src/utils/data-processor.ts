import agricultureData from '../data/Agro_Dataset.json';

export interface AgricultureEntry {
  Country: string;
  'Year': string;
  'Crop Name': string;
  'Crop Production (UOM:t(Tonnes))': string;
  'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string;
  'Area Under Cultivation (UOM:Ha(Hectares))': string;
}

// Helper function to safely parse numbers
const safeParseFloat = (value: string | undefined): number => {
  if (value === undefined || value === '') return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const processMaxMinProductionByYear = () => {
  const yearMap: Record<string, { maxCrop: string; minCrop: string; maxProduction: number; minProduction: number }> = {};

  // Type assertion to ensure correct typing
  const data = agricultureData as AgricultureEntry[];

  data.forEach((entry) => {
    const year = entry['Year'].replace('Financial Year (Apr - Mar), ', '');
    const production = safeParseFloat(entry['Crop Production (UOM:t(Tonnes))']);

    if (!yearMap[year]) {
      yearMap[year] = { 
        maxCrop: entry['Crop Name'], 
        minCrop: entry['Crop Name'],
        maxProduction: production,
        minProduction: production
      };
    } else {
      if (production > yearMap[year].maxProduction) {
        yearMap[year].maxCrop = entry['Crop Name'];
        yearMap[year].maxProduction = production;
      }
      
      if (production < yearMap[year].minProduction || yearMap[year].minProduction === 0) {
        yearMap[year].minCrop = entry['Crop Name'];
        yearMap[year].minProduction = production;
      }
    }
  });

  return Object.entries(yearMap).map(([year, { maxCrop, minCrop }]) => ({
    year,
    maxCrop,
    minCrop
  }));
};

export const processCropAverages = () => {
  // Type assertion to ensure correct typing
  const data = agricultureData as AgricultureEntry[];

  const cropSummary: Record<string, { 
    totalProduction: number, 
    totalYield: number, 
    totalArea: number, 
    count: number 
  }> = {};

  data.forEach((entry) => {
    const cropName = entry['Crop Name'];
    const production = safeParseFloat(entry['Crop Production (UOM:t(Tonnes))']);
    const yield_ = safeParseFloat(entry['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']);
    const area = safeParseFloat(entry['Area Under Cultivation (UOM:Ha(Hectares))']);

    if (!cropSummary[cropName]) {
      cropSummary[cropName] = { 
        totalProduction: production, 
        totalYield: yield_, 
        totalArea: area, 
        count: 1 
      };
    } else {
      cropSummary[cropName].totalProduction += production;
      cropSummary[cropName].totalYield += yield_;
      cropSummary[cropName].totalArea += area;
      cropSummary[cropName].count += 1;
    }
  });

  return Object.entries(cropSummary).map(([cropName, summary]) => ({
    cropName,
    avgYield: Number((summary.totalYield / summary.count).toFixed(3)),
    avgArea: Number((summary.totalArea / summary.count).toFixed(3))
  }));
};