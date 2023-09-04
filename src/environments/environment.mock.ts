interface ApiUrls {
  apiUrlTimesheet: string;
  apiUrlUser: string;
  apiUrlStatus: string;
}

interface AppEnv {
  production: boolean;
  apiUrls: ApiUrls;
}


export const environment: AppEnv = {
  production: false,
  apiUrls: {
    apiUrlTimesheet: 'http://localhost:3000/timesheet',
    apiUrlUser: 'http://localhost:3000/user',
    apiUrlStatus: 'http://localhost:3000/status'
  }
};
