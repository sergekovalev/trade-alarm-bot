import IFormatter from "./IFormatter";

class GetTickersFormatter implements IFormatter{
  format(data: any): string {
    return data.join('\n');
  }
}

export default GetTickersFormatter;