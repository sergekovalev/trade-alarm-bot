declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_TOKEN: string;
      POLYGON_TOKEN: string
      NODE_ENV: 'development' | 'production';
    }  
  }
}

export {};