import { Box, Fade } from "@mui/material";
import { CombinedError, OperationContext, UseQueryResponse } from "urql";

export interface SwitchComponentProps {
  reexecuteQuery?: (opts?: Partial<OperationContext>) => void
}

export interface SwitchErrorComponentProps extends SwitchComponentProps {
  error?: CombinedError | string;
}

export type SwitchErrorComponent = (props: SwitchErrorComponentProps) => JSX.Element;

export interface SwitchFetchingComponentProps extends SwitchComponentProps {
}

export type SwitchFetchingComponent = (props: SwitchFetchingComponentProps) => JSX.Element;

export interface SwitchLoadedComponentProps<T> extends SwitchComponentProps {
  data?: T;
}

export type SwitchLoadedComponent<T> = (props: SwitchLoadedComponentProps<T>) => JSX.Element;

export interface UrqlSwitchProps<D> {
  fade?: number;
  query: UseQueryResponse;
  fetching?: SwitchFetchingComponent;
  error?: SwitchErrorComponent;
  loaded: SwitchLoadedComponent<D>;
}

export function UrqlSwitch<D>(props: UrqlSwitchProps<D>) {
  const [queryResult, reexecuteQuery] = props.query;

  if (queryResult.error) return props.error ? (
    <props.error reexecuteQuery={reexecuteQuery} error={queryResult.error} />
  ) : <></>;

  if (queryResult.fetching) return props.fetching ? (
    <props.fetching reexecuteQuery={reexecuteQuery} />
  ) : <></>;

  return (
    <Fade in timeout={props.fade ?? 0}>
      <Box>
        <props.loaded reexecuteQuery={reexecuteQuery} data={queryResult.data} />
      </Box>
    </Fade>
  );
}
