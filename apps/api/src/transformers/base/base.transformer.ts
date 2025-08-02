/**
 * Base interface for API response transformers
 *
 * @template TInput - The internal/database model type
 * @template TOutput - The API response type
 */
export interface BaseTransformer<TInput, TOutput> {
  /**
   * Transform a single entity from internal to API format
   */
  transform(entity: TInput): TOutput;

  /**
   * Transform multiple entities from internal to API format
   */
  transformMany(entities: TInput[]): TOutput[];
}
