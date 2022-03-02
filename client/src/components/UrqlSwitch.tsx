import { CombinedError, OperationContext, UseQueryResponse } from "urql";

export interface SwitchComponentProps {
  reexecuteQuery?:(opts?: Partial<OperationContext>) => void
}

export interface  SwitchErrorComponentProps extends SwitchComponentProps {
  error?: CombinedError | string; 
}

export type SwitchErrorComponent = (props: SwitchErrorComponentProps) => JSX.Element;

export interface  SwitchFetchingComponentProps extends SwitchComponentProps {
}

export type SwitchFetchingComponent = (props: SwitchFetchingComponentProps) => JSX.Element;

export interface  SwitchDataComponentProps extends SwitchComponentProps {
  data?: any; 
}

export type SwitchDataComponent = (props: SwitchDataComponentProps) => JSX.Element;

export interface UrqlSwitchProps {
  query: UseQueryResponse;
  fetching?: SwitchFetchingComponent;
  error?: SwitchErrorComponent;
  data: SwitchDataComponent;
}

export function UrqlSwitch(props: UrqlSwitchProps) {
  const [queryResult, reexecuteQuery] = props.query;

  if (queryResult.error) return props.error ? <props.error reexecuteQuery={reexecuteQuery} error={queryResult.error} /> : <></>;

  if (queryResult.fetching) return props.fetching ? <props.fetching reexecuteQuery={reexecuteQuery} /> : <></>;

  return <props.data reexecuteQuery={reexecuteQuery} data={queryResult.data} />
}
