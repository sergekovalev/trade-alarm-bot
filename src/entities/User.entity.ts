import { Schema, model } from "mongoose";
import { Currency } from "../types/currency.enum";

type ActionType = 'eq' | 'gt' | 'gte' | 'lt' | 'lte';

class Action {
  public ticker: Currency;
  public price: number;
  public on: ActionType

  constructor(ticker: Currency, price: number, on: ActionType ){
    this.ticker = ticker;
    this.price = price;
    this.on = on;
  }
};

const User = {
  chatId: { type: String },
  name: { type: String, default: 'Jimmy' },
  currency: { type: String, default: "usd" },
  wallet: { type: Map },
  actions: { type: [Map] }
}

const UserSchema = new Schema(User);

export const UserEntity = model('User', UserSchema);