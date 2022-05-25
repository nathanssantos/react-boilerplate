/* eslint-disable @typescript-eslint/no-explicit-any */
type StoreActionResponse = {
  status: number;
  data?: any;
  message?: string;
};

type FetchStatus = 'idle' | 'fetching' | 'error' | 'success';

type User = {
  id: number;
  name: string;
  email: string;
};
