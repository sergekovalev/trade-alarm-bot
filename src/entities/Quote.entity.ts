import { Schema, model } from "mongoose";

const Quote = {
  id: { type: String },
  name: { type: String },
  symbol: { type: String },
  slug: { type: String },
  num_market_pairs: { type: String },
  date_added: { type: Date },
  tags: { type: [String] },
  max_supply: { type: String },
  circulating_supply: { type: String },
  total_supply: { type: String },
  platform: { type: Object },
  cmc_rank: { type: String },
  self_reported_circulating_supply: { type: String },
  self_reported_market_cap: { type: String },
  last_updated: { type: String },
  quote: { type: Object },
}

const QuoteSchema = new Schema(Quote);

export const QuoteEntity = model('Quote', QuoteSchema);
