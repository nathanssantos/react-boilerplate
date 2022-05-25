/* eslint-disable @typescript-eslint/no-explicit-any */
type FetchStatus = 'idle' | 'fetching' | 'error' | 'success';

type StoreActionResponse = {
  status: number;
  data?: any;
  message?: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};
