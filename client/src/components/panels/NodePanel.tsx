import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { styled } from '@mui/material/styles';
import { BasePanel } from './BasePanel';
import { DevicePanelContent, DevicePanelContentProps } from './DevicePanelContent';

const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
};

// TODO: use theme
const Tab = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: gray;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: bold;
  background-color: transparent;
  /* width: 100%; */
  padding: 12px 10px 0px 0px;
  /* margin: 6px 6px; */
  border: none;
  /* border-radius: 5px; */
  display: flex;
  justify-content: left;

  /* &:hover { */
  /*   background-color: ${blue[400]}; */
  /* } */

  &:focus {
    /* color: #fff; */
    /* border-radius: 3px; */
    /* outline: 2px solid ${blue[200]}; */
    /* outline-offset: 2px; */
  }

  &.${tabUnstyledClasses.selected} {
    /* background-color: ${blue[50]}; */
    color: black;
    /* color: ${blue[600]}; */
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  /* min-width: 320px; */
  /* background-color: ${blue[500]}; */
  /* border-radius: 8px; */
  /* margin-bottom: 16px; */
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  /* align-content: space-between; */
`;

export interface NodePanelProps extends DevicePanelContentProps {}

export function NodePanel(props: NodePanelProps) {
  const { showDevices, onShowDevicesChange } = props;
  const tabs = (
    <TabsList>
      <Tab>Devices</Tab>
    </TabsList>
  );

  return (
    <TabsUnstyled defaultValue={0}>
      <BasePanel top={tabs}>
        <nav>
          <TabPanel value={0}>
            <DevicePanelContent showDevices={showDevices} onShowDevicesChange={onShowDevicesChange}/>
          </TabPanel>
        </nav>
      </BasePanel>
    </TabsUnstyled>
  );
}
