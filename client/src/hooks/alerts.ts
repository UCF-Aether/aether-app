import { useMutation, useQuery, useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";

export interface AlertTriggerHistory {
  triggered_at: Date;
  triggered_by: string;
  val: number;
}

export interface Alert {
  alert_id: number;
  name: string;
  dev_eui: string;
  fkeys: string[];
  layer_name?: string;
  trigger: number;
  created_at: Date;
  times_triggered: number;
  last_triggered_at?: Date;
  history?: AlertTriggerHistory[];
}

export interface CreateAlertProps {
  name: string;
  layer: string;
  deviceId: number;
  value: number;
  description?: string;
}

async function fetchAlerts() {
  const { data, error } = await supabase.from<Alert>("alerts").select("*");

  if (error || !data) throw new Error("Error fetching alerts: " + error);
  return data.map((al) => ({
    ...al,
    created_at: new Date(al.created_at),
    last_triggered_at: al.created_at ? new Date(al.last_triggered_at) : null,
  }));
}

async function fetchAlertInfo(alertId: number) {
  const alert = await supabase.from<Alert>("alerts").select("*").eq("alert_id", alertId).single();

  if (alert.error || !alert.data) throw new Error(`Error fetching alert ${alertId} ${alert.error}`);

  const hist = await supabase
    .from<AlertTriggerHistory>("alert_history")
    .select("triggered_at,triggered_by,val");

  if (hist.error || !hist.data)
    throw new Error(`Error fetching alert history ${alertId} ${hist.error}`);

  alert.data.history = hist.data;
  alert.data.created_at = new Date(alert.data.created_at);
  alert.data.last_triggered_at = alert.data.last_triggered_at
    ? new Date(alert.data.last_triggered_at)
    : null;

  return alert.data;
}

async function createAlert(props: CreateAlertProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { name: alert_name, layer: layer_name, deviceId: did, value: val, description } = props;
  console.log(props);
  const { data, error } = await supabase.rpc(
    "create_alert", 
    { alert_name, layer_name, did, val, description }
  );

  if (error || !data) throw new Error("Error creating alert: " + error);
  return data;
}

export function useAlerts() {
  const { isLoading, isError, data: alerts, error } = useQuery(["alerts"], fetchAlerts);
  return { isLoading, isError, alerts, error };
}

export function useAlertInfo(alertId: number) {
  const {
    isLoading,
    isError,
    data: alerts,
    error,
  } = useQuery(["alerts", alertId], () => fetchAlertInfo(alertId));
  return { isLoading, isError, alerts, error };
}

export function useCreateAlert() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createAlert, {
    onSuccess: () => {
      queryClient.invalidateQueries(["alerts"]);
    },
  });

  return mutation;
}
