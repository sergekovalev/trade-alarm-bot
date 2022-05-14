import { Schema, model } from "mongoose";

const Ticker = {
  name: { type: String },
  symbol: { type: String },
}

const TickerSchema = new Schema(Ticker);

export const TickerEntity = model('Ticker', TickerSchema);
