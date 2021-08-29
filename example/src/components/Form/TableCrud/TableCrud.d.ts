import { ITableState } from '.';

declare type ICrudState = Partial<{
  mutationId: string;
  loadingRefetch: boolean;
}> &
  ITableState;
