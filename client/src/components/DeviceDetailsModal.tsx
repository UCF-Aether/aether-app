import { Box, Skeleton, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'urql';
import { DetailsModal } from './DetailsModal';
import { DeviceInfoDocument } from '../generated/graphql';
import ErrorIcon from "@mui/icons-material/Error";
import { DeviceInfoPanel } from './panels/DeviceInfoPanel';
import { SwitchErrorComponentProps, UrqlSwitch } from './UrqlSwitch';
import { ResponsiveLine } from '@nivo/line';

let testLineData: Array<any> = [];

const MyResponsiveLine = (props: { data: any}) => (
  <ResponsiveLine
    data={props.data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
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
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle'
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'count',
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
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

export function DeviceDetailsModal() {
  const params = useParams();
  const navigate = useNavigate();
  const deviceId = Number(params.deviceId ?? '-1');

  const [result, reexecuteQuery] = useQuery({
    query: DeviceInfoDocument,
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
        <Box sx={{ height: 300 }}>
          <MyResponsiveLine data={testLineData} />
        </Box>
      </>
    );
  };

  return (
    <DetailsModal title='Device' subTitle={device?.name} open onClose={handleClose}>
      <UrqlSwitch
        query={[result, reexecuteQuery]}
        error={ErrorContent}
        fetching={FetchingContent}
        data={DataContent}
      />
    </DetailsModal>
  );
}

/* @ts-ignore */ 
testLineData = [
  {
    "id": "japan",
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
  {
    "id": "france",
    "color": "hsl(173, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 124
      },
      {
        "x": "helicopter",
        "y": 146
      },
      {
        "x": "boat",
        "y": 119
      },
      {
        "x": "train",
        "y": 140
      },
      {
        "x": "subway",
        "y": 292
      },
      {
        "x": "bus",
        "y": 77
      },
      {
        "x": "car",
        "y": 46
      },
      {
        "x": "moto",
        "y": 245
      },
      {
        "x": "bicycle",
        "y": 282
      },
      {
        "x": "horse",
        "y": 261
      },
      {
        "x": "skateboard",
        "y": 167
      },
      {
        "x": "others",
        "y": 147
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(159, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 202
      },
      {
        "x": "helicopter",
        "y": 293
      },
      {
        "x": "boat",
        "y": 96
      },
      {
        "x": "train",
        "y": 59
      },
      {
        "x": "subway",
        "y": 117
      },
      {
        "x": "bus",
        "y": 290
      },
      {
        "x": "car",
        "y": 294
      },
      {
        "x": "moto",
        "y": 179
      },
      {
        "x": "bicycle",
        "y": 122
      },
      {
        "x": "horse",
        "y": 16
      },
      {
        "x": "skateboard",
        "y": 298
      },
      {
        "x": "others",
        "y": 107
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(171, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 126
      },
      {
        "x": "helicopter",
        "y": 3
      },
      {
        "x": "boat",
        "y": 88
      },
      {
        "x": "train",
        "y": 30
      },
      {
        "x": "subway",
        "y": 74
      },
      {
        "x": "bus",
        "y": 159
      },
      {
        "x": "car",
        "y": 14
      },
      {
        "x": "moto",
        "y": 98
      },
      {
        "x": "bicycle",
        "y": 292
      },
      {
        "x": "horse",
        "y": 252
      },
      {
        "x": "skateboard",
        "y": 180
      },
      {
        "x": "others",
        "y": 76
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(87, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 180
      },
      {
        "x": "helicopter",
        "y": 7
      },
      {
        "x": "boat",
        "y": 199
      },
      {
        "x": "train",
        "y": 127
      },
      {
        "x": "subway",
        "y": 290
      },
      {
        "x": "bus",
        "y": 26
      },
      {
        "x": "car",
        "y": 114
      },
      {
        "x": "moto",
        "y": 58
      },
      {
        "x": "bicycle",
        "y": 292
      },
      {
        "x": "horse",
        "y": 23
      },
      {
        "x": "skateboard",
        "y": 169
      },
      {
        "x": "others",
        "y": 93
      }
    ]
  }
]
