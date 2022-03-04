import { Box, Skeleton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { DetailsModal } from './DetailsModal';
import { DeviceDetailsDocument } from '../generated/graphql';
import ErrorIcon from "@mui/icons-material/Error";
import { DeviceInfoPanel } from './panels/DeviceInfoPanel';
import { SwitchErrorComponentProps, UrqlSwitch } from './UrqlSwitch';
import { ResponsiveLine, Serie } from '@nivo/line';
import { Panel } from './panels/Panel';

let testLineData: Array<any> = [];

interface ReadingsLineGraphProps {
  data: Serie[];
  title: string;
  yAxisLengend: string;
}

const ReadingsLineGraph = (props: ReadingsLineGraphProps) => (
  <Panel title={props.title} contentSx={{ height: 400}}>
    <ResponsiveLine
      data={props.data}
      margin={{ top: 50, right: 40, bottom: 60, left: 60 }}
      xScale={{ type: 'time', format: 'native' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%m/%d',
        tickValues: 'every 1 day',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'time',
        legendOffset: 45,
        legendPosition: 'middle'
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: props.yAxisLengend,
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  </Panel>
);

export function DeviceDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();
  const deviceId = Number(params.deviceId ?? '-1');

  const [result, reexecuteQuery] = useQuery({
    query: DeviceDetailsDocument,
    variables: { deviceId }
  });

  const handleClose = () => {
    navigate('/');
  }


  const { data } = result;
  console.log(data);

  // TODO: handle no device found
  const device = data?.device;
  const meta = device?.deviceMeta;

  const ErrorContent = (props?: SwitchErrorComponentProps) => (
    <>
      <ErrorIcon color='error' />
      <Typography>{props?.error ?? ''}</Typography>
    </>
  );

  const FetchingContent = () => (
    <>
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 2 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
      <Skeleton animation='wave' variant='rectangular' width='100%' height='30%' sx={{ my: 4 }} />
    </>
  );

  const DataContent = () => {
    if (!device) return <ErrorContent error='Device not found' />

    const aqi = data?.aqi?.nodes.map(n => ({
      x: new Date(n?.takenAt),
      y: n?.val,
    })) || [];

    const pm2p5 = data?.pm2_5?.nodes.map(n => ({
      x: new Date(n?.takenAt),
      y: n?.val,
    })) || [];

    const voc = data?.voc?.nodes.map(n => ({
      x: new Date(n?.takenAt),
      y: n?.val,
    })) || [];

    return (
      <>
        <DeviceInfoPanel info={{
          devEui: device?.devEui,
          createdAt: meta?.createdAt,
          updatedAt: meta?.updatedAt,
          activationMethod: device?.activationMethod,
          lat: meta?.loc?.locGeog.latitude,
          lng: meta?.loc?.locGeog.longitude,
          locUpdatedAt: meta?.locUpdatedAt,
          lastUplink: meta?.lastUplinkAt,
          lastDownlink: meta?.lastDownlinkAt,
        }} />
        <ReadingsLineGraph title='AQI Over Time' yAxisLengend='AQI' data={[{ id: 'AQI', data: aqi }]}/>
        <ReadingsLineGraph 
          title='Gases Over Time' 
          yAxisLengend='ppb' 
          data={[
            { id: 'PM2.5', data: pm2p5 },
            { id: 'VOC', data: voc },
          ]}
        />
      </>
    );
  };

  return (
    <DetailsModal title='Device' subTitle={device?.name} open onClose={handleClose}>
      <UrqlSwitch
        fade={750}
        query={[result, reexecuteQuery]}
        error={ErrorContent}
        fetching={FetchingContent}
        loaded={DataContent}
      />
    </DetailsModal>
  );
}

/* @ts-ignore */ 
testLineData = [
  {
    "id": "AQI",
    "color": "hsl(174, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 297
      },
      {
        "x": "helicopter",
        "y": 75
      },
      {
        "x": "boat",
        "y": 208
      },
      {
        "x": "train",
        "y": 176
      },
      {
        "x": "subway",
        "y": 291
      },
      {
        "x": "bus",
        "y": 85
      },
      {
        "x": "car",
        "y": 256
      },
      {
        "x": "moto",
        "y": 157
      },
      {
        "x": "bicycle",
        "y": 282
      },
      {
        "x": "horse",
        "y": 173
      },
      {
        "x": "skateboard",
        "y": 253
      },
      {
        "x": "others",
        "y": 107
      }
    ]
  },
]
