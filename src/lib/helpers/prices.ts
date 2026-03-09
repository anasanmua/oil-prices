/**
 * Normalizes olive oil product names to standard format
 * @param product - The product name to normalize
 * @returns Normalized product name
 */
export const normalizeOliveOilProductName = (product: string): string => {
  if (isAoveNovember(product)) return "AOVE - Noviembre 25/26";
  if (isAoveDecember(product)) return "AOVE - Diciembre 25/26";
  if (isVirgen(product)) return "Aceite de oliva virgen";
  if (isLampante(product)) return "Aceite de oliva lampante";
  return product; // Return original if no match
};

/**
 * Checks if product is AOVE November variety
 */
export const isAoveNovember = (product: string): boolean =>
  product.includes("AOVE") && (product.includes("noviembre") || product.includes("Noviembre"));

/**
 * Checks if product is AOVE December variety
 */
export const isAoveDecember = (product: string): boolean =>
  product.includes("AOVE") && (product.includes("diciembre") || product.includes("Diciembre"));

/**
 * Checks if product is Virgin olive oil
 */
export const isVirgen = (product: string): boolean =>
  product === "Aceite de oliva virgen" || product === "Virgen";

/**
 * Checks if product is Lampante olive oil
 */
export const isLampante = (product: string): boolean =>
  product === "Aceite de oliva lampante" || product === "Lampante";

/**
 * Gets the appropriate chart label for a product
 */
export const getChartLabel = (product: string): string => {
  if (isAoveNovember(product)) return "AOVE - Noviembre 25/26";
  if (isAoveDecember(product)) return "AOVE - Diciembre 25/26";
  if (isVirgen(product)) return "Aceite de oliva virgen";
  if (isLampante(product)) return "Aceite de oliva lampante";
  return product;
};

/**
 * Product type enum for better type safety
 */
export enum OliveOilProductType {
  AOVE_NOVEMBER = "AOVE_NOVEMBER",
  AOVE_DECEMBER = "AOVE_DECEMBER",
  VIRGEN = "VIRGEN",
  LAMPANTE = "LAMPANTE",
  OTHER = "OTHER"
}

/**
 * Gets the product type for classification
 */
export const getProductType = (product: string): OliveOilProductType => {
  if (isAoveNovember(product)) return OliveOilProductType.AOVE_NOVEMBER;
  if (isAoveDecember(product)) return OliveOilProductType.AOVE_DECEMBER;
  if (isVirgen(product)) return OliveOilProductType.VIRGEN;
  if (isLampante(product)) return OliveOilProductType.LAMPANTE;
  return OliveOilProductType.OTHER;
};
