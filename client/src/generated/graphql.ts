import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A JavaScript object encoded in the JSON format as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

export type AlertDef = Node & {
  __typename?: 'AlertDef';
  alertDefId: Scalars['Int'];
  alertMethod?: Maybe<UserAlertMethod>;
  alertTo?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
  sensorChanId?: Maybe<Scalars['Int']>;
  triggerVal?: Maybe<Scalars['Float']>;
  userId?: Maybe<Scalars['UUID']>;
};

/**
 * A condition to be used against `AlertDef` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AlertDefCondition = {
  /** Checks for equality with the object’s `alertDefId` field. */
  alertDefId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `alertMethod` field. */
  alertMethod?: InputMaybe<UserAlertMethod>;
  /** Checks for equality with the object’s `alertTo` field. */
  alertTo?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `sensorChanId` field. */
  sensorChanId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `triggerVal` field. */
  triggerVal?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** An input for mutations affecting `AlertDef` */
export type AlertDefInput = {
  alertMethod?: InputMaybe<UserAlertMethod>;
  alertTo?: InputMaybe<Scalars['String']>;
  sensorChanId?: InputMaybe<Scalars['Int']>;
  triggerVal?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** Represents an update to a `AlertDef`. Fields that are set will be updated. */
export type AlertDefPatch = {
  alertMethod?: InputMaybe<UserAlertMethod>;
  alertTo?: InputMaybe<Scalars['String']>;
  sensorChanId?: InputMaybe<Scalars['Int']>;
  triggerVal?: InputMaybe<Scalars['Float']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `AlertDef` values. */
export type AlertDefsConnection = {
  __typename?: 'AlertDefsConnection';
  /** A list of edges which contains the `AlertDef` and cursor to aid in pagination. */
  edges: Array<AlertDefsEdge>;
  /** A list of `AlertDef` objects. */
  nodes: Array<Maybe<AlertDef>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AlertDef` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `AlertDef` edge in the connection. */
export type AlertDefsEdge = {
  __typename?: 'AlertDefsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AlertDef` at the end of the edge. */
  node?: Maybe<AlertDef>;
};

/** Methods to use when ordering `AlertDef`. */
export enum AlertDefsOrderBy {
  AlertDefIdAsc = 'ALERT_DEF_ID_ASC',
  AlertDefIdDesc = 'ALERT_DEF_ID_DESC',
  AlertMethodAsc = 'ALERT_METHOD_ASC',
  AlertMethodDesc = 'ALERT_METHOD_DESC',
  AlertToAsc = 'ALERT_TO_ASC',
  AlertToDesc = 'ALERT_TO_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SensorChanIdAsc = 'SENSOR_CHAN_ID_ASC',
  SensorChanIdDesc = 'SENSOR_CHAN_ID_DESC',
  TriggerValAsc = 'TRIGGER_VAL_ASC',
  TriggerValDesc = 'TRIGGER_VAL_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** All input for the create `AlertDef` mutation. */
export type CreateAlertDefInput = {
  /** The `AlertDef` to be created by this mutation. */
  alertDef: AlertDefInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `AlertDef` mutation. */
export type CreateAlertDefPayload = {
  __typename?: 'CreateAlertDefPayload';
  /** The `AlertDef` that was created by this mutation. */
  alertDef?: Maybe<AlertDef>;
  /** An edge for our `AlertDef`. May be used by Relay 1. */
  alertDefEdge?: Maybe<AlertDefsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
};


/** The output of our create `AlertDef` mutation. */
export type CreateAlertDefPayloadAlertDefEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};

/** All input for the create `Device` mutation. */
export type CreateDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Device` to be created by this mutation. */
  device: DeviceInput;
};

/** All input for the create `DeviceMeta` mutation. */
export type CreateDeviceMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `DeviceMeta` to be created by this mutation. */
  deviceMeta: DeviceMetaInput;
};

/** The output of our create `DeviceMeta` mutation. */
export type CreateDeviceMetaPayload = {
  __typename?: 'CreateDeviceMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `DeviceMeta`. */
  deviceByDeviceId?: Maybe<Device>;
  /** The `DeviceMeta` that was created by this mutation. */
  deviceMeta?: Maybe<DeviceMeta>;
  /** An edge for our `DeviceMeta`. May be used by Relay 1. */
  deviceMetaEdge?: Maybe<DeviceMetasEdge>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `DeviceMeta` mutation. */
export type CreateDeviceMetaPayloadDeviceMetaEdgeArgs = {
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};

/** The output of our create `Device` mutation. */
export type CreateDevicePayload = {
  __typename?: 'CreateDevicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Device` that was created by this mutation. */
  device?: Maybe<Device>;
  /** An edge for our `Device`. May be used by Relay 1. */
  deviceEdge?: Maybe<DevicesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Device` mutation. */
export type CreateDevicePayloadDeviceEdgeArgs = {
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};

/** All input for the create `Devmsg` mutation. */
export type CreateDevmsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Devmsg` to be created by this mutation. */
  devmsg: DevmsgInput;
};

/** The output of our create `Devmsg` mutation. */
export type CreateDevmsgPayload = {
  __typename?: 'CreateDevmsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Devmsg` that was created by this mutation. */
  devmsg?: Maybe<Devmsg>;
  /** An edge for our `Devmsg`. May be used by Relay 1. */
  devmsgEdge?: Maybe<DevmsgsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Devmsg` mutation. */
export type CreateDevmsgPayloadDevmsgEdgeArgs = {
  orderBy?: InputMaybe<Array<DevmsgsOrderBy>>;
};

/** All input for the create `Gateway` mutation. */
export type CreateGatewayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Gateway` to be created by this mutation. */
  gateway: GatewayInput;
};

/** All input for the create `GatewayMeta` mutation. */
export type CreateGatewayMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `GatewayMeta` to be created by this mutation. */
  gatewayMeta: GatewayMetaInput;
};

/** The output of our create `GatewayMeta` mutation. */
export type CreateGatewayMetaPayload = {
  __typename?: 'CreateGatewayMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Gateway` that is related to this `GatewayMeta`. */
  gatewayByGatewayId?: Maybe<Gateway>;
  /** The `GatewayMeta` that was created by this mutation. */
  gatewayMeta?: Maybe<GatewayMeta>;
  /** An edge for our `GatewayMeta`. May be used by Relay 1. */
  gatewayMetaEdge?: Maybe<GatewayMetasEdge>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `GatewayMeta` mutation. */
export type CreateGatewayMetaPayloadGatewayMetaEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};

/** The output of our create `Gateway` mutation. */
export type CreateGatewayPayload = {
  __typename?: 'CreateGatewayPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Gateway` that was created by this mutation. */
  gateway?: Maybe<Gateway>;
  /** An edge for our `Gateway`. May be used by Relay 1. */
  gatewayEdge?: Maybe<GatewaysEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Gateway` mutation. */
export type CreateGatewayPayloadGatewayEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};

/** All input for the create `Location` mutation. */
export type CreateLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Location` to be created by this mutation. */
  location: LocationInput;
};

/** The output of our create `Location` mutation. */
export type CreateLocationPayload = {
  __typename?: 'CreateLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Location` that was created by this mutation. */
  location?: Maybe<Location>;
  /** An edge for our `Location`. May be used by Relay 1. */
  locationEdge?: Maybe<LocationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Location` mutation. */
export type CreateLocationPayloadLocationEdgeArgs = {
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};

/** All input for the create `PhySensor` mutation. */
export type CreatePhySensorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `PhySensor` to be created by this mutation. */
  phySensor: PhySensorInput;
};

/** The output of our create `PhySensor` mutation. */
export type CreatePhySensorPayload = {
  __typename?: 'CreatePhySensorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `PhySensor`. */
  deviceByDeviceId?: Maybe<Device>;
  /** The `PhySensor` that was created by this mutation. */
  phySensor?: Maybe<PhySensor>;
  /** An edge for our `PhySensor`. May be used by Relay 1. */
  phySensorEdge?: Maybe<PhySensorsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `PhySensor` mutation. */
export type CreatePhySensorPayloadPhySensorEdgeArgs = {
  orderBy?: InputMaybe<Array<PhySensorsOrderBy>>;
};

/** All input for the create `Reading` mutation. */
export type CreateReadingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Reading` to be created by this mutation. */
  reading: ReadingInput;
};

/** The output of our create `Reading` mutation. */
export type CreateReadingPayload = {
  __typename?: 'CreateReadingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `Reading`. */
  deviceByDeviceId?: Maybe<Device>;
  /** Reads a single `Location` that is related to this `Reading`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reading` that was created by this mutation. */
  reading?: Maybe<Reading>;
  /** An edge for our `Reading`. May be used by Relay 1. */
  readingEdge?: Maybe<ReadingsEdge>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
};


/** The output of our create `Reading` mutation. */
export type CreateReadingPayloadReadingEdgeArgs = {
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/** All input for the create `SensorChan` mutation. */
export type CreateSensorChanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `SensorChan` to be created by this mutation. */
  sensorChan: SensorChanInput;
};

/** The output of our create `SensorChan` mutation. */
export type CreateSensorChanPayload = {
  __typename?: 'CreateSensorChanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SensorChan` that was created by this mutation. */
  sensorChan?: Maybe<SensorChan>;
  /** An edge for our `SensorChan`. May be used by Relay 1. */
  sensorChanEdge?: Maybe<SensorChansEdge>;
};


/** The output of our create `SensorChan` mutation. */
export type CreateSensorChanPayloadSensorChanEdgeArgs = {
  orderBy?: InputMaybe<Array<SensorChansOrderBy>>;
};

/** All input for the `deleteAlertDefByAlertDefId` mutation. */
export type DeleteAlertDefByAlertDefIdInput = {
  alertDefId: Scalars['Int'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** All input for the `deleteAlertDef` mutation. */
export type DeleteAlertDefInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AlertDef` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `AlertDef` mutation. */
export type DeleteAlertDefPayload = {
  __typename?: 'DeleteAlertDefPayload';
  /** The `AlertDef` that was deleted by this mutation. */
  alertDef?: Maybe<AlertDef>;
  /** An edge for our `AlertDef`. May be used by Relay 1. */
  alertDefEdge?: Maybe<AlertDefsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedAlertDefId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
};


/** The output of our delete `AlertDef` mutation. */
export type DeleteAlertDefPayloadAlertDefEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};

/** All input for the `deleteDeviceByAwsDeviceId` mutation. */
export type DeleteDeviceByAwsDeviceIdInput = {
  awsDeviceId: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** All input for the `deleteDeviceByDeviceId` mutation. */
export type DeleteDeviceByDeviceIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
};

/** All input for the `deleteDevice` mutation. */
export type DeleteDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Device` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteDeviceMetaByDeviceId` mutation. */
export type DeleteDeviceMetaByDeviceIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
};

/** All input for the `deleteDeviceMeta` mutation. */
export type DeleteDeviceMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `DeviceMeta` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `DeviceMeta` mutation. */
export type DeleteDeviceMetaPayload = {
  __typename?: 'DeleteDeviceMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedDeviceMetaId?: Maybe<Scalars['ID']>;
  /** Reads a single `Device` that is related to this `DeviceMeta`. */
  deviceByDeviceId?: Maybe<Device>;
  /** The `DeviceMeta` that was deleted by this mutation. */
  deviceMeta?: Maybe<DeviceMeta>;
  /** An edge for our `DeviceMeta`. May be used by Relay 1. */
  deviceMetaEdge?: Maybe<DeviceMetasEdge>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `DeviceMeta` mutation. */
export type DeleteDeviceMetaPayloadDeviceMetaEdgeArgs = {
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};

/** The output of our delete `Device` mutation. */
export type DeleteDevicePayload = {
  __typename?: 'DeleteDevicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedDeviceId?: Maybe<Scalars['ID']>;
  /** The `Device` that was deleted by this mutation. */
  device?: Maybe<Device>;
  /** An edge for our `Device`. May be used by Relay 1. */
  deviceEdge?: Maybe<DevicesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Device` mutation. */
export type DeleteDevicePayloadDeviceEdgeArgs = {
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};

/** All input for the `deleteDevmsgById` mutation. */
export type DeleteDevmsgByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteDevmsg` mutation. */
export type DeleteDevmsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Devmsg` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Devmsg` mutation. */
export type DeleteDevmsgPayload = {
  __typename?: 'DeleteDevmsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedDevmsgId?: Maybe<Scalars['ID']>;
  /** The `Devmsg` that was deleted by this mutation. */
  devmsg?: Maybe<Devmsg>;
  /** An edge for our `Devmsg`. May be used by Relay 1. */
  devmsgEdge?: Maybe<DevmsgsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Devmsg` mutation. */
export type DeleteDevmsgPayloadDevmsgEdgeArgs = {
  orderBy?: InputMaybe<Array<DevmsgsOrderBy>>;
};

/** All input for the `deleteGatewayByAwsGatewayId` mutation. */
export type DeleteGatewayByAwsGatewayIdInput = {
  awsGatewayId: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** All input for the `deleteGatewayByGatewayId` mutation. */
export type DeleteGatewayByGatewayIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
};

/** All input for the `deleteGateway` mutation. */
export type DeleteGatewayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Gateway` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGatewayMetaByGatewayId` mutation. */
export type DeleteGatewayMetaByGatewayIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
};

/** All input for the `deleteGatewayMeta` mutation. */
export type DeleteGatewayMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GatewayMeta` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `GatewayMeta` mutation. */
export type DeleteGatewayMetaPayload = {
  __typename?: 'DeleteGatewayMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedGatewayMetaId?: Maybe<Scalars['ID']>;
  /** Reads a single `Gateway` that is related to this `GatewayMeta`. */
  gatewayByGatewayId?: Maybe<Gateway>;
  /** The `GatewayMeta` that was deleted by this mutation. */
  gatewayMeta?: Maybe<GatewayMeta>;
  /** An edge for our `GatewayMeta`. May be used by Relay 1. */
  gatewayMetaEdge?: Maybe<GatewayMetasEdge>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `GatewayMeta` mutation. */
export type DeleteGatewayMetaPayloadGatewayMetaEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};

/** The output of our delete `Gateway` mutation. */
export type DeleteGatewayPayload = {
  __typename?: 'DeleteGatewayPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedGatewayId?: Maybe<Scalars['ID']>;
  /** The `Gateway` that was deleted by this mutation. */
  gateway?: Maybe<Gateway>;
  /** An edge for our `Gateway`. May be used by Relay 1. */
  gatewayEdge?: Maybe<GatewaysEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Gateway` mutation. */
export type DeleteGatewayPayloadGatewayEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};

/** All input for the `deleteLocationByLocId` mutation. */
export type DeleteLocationByLocIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  locId: Scalars['Int'];
};

/** All input for the `deleteLocation` mutation. */
export type DeleteLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Location` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Location` mutation. */
export type DeleteLocationPayload = {
  __typename?: 'DeleteLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedLocationId?: Maybe<Scalars['ID']>;
  /** The `Location` that was deleted by this mutation. */
  location?: Maybe<Location>;
  /** An edge for our `Location`. May be used by Relay 1. */
  locationEdge?: Maybe<LocationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Location` mutation. */
export type DeleteLocationPayloadLocationEdgeArgs = {
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};

/** All input for the `deletePhySensorByPhySensorId` mutation. */
export type DeletePhySensorByPhySensorIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  phySensorId: Scalars['Int'];
};

/** All input for the `deletePhySensor` mutation. */
export type DeletePhySensorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PhySensor` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `PhySensor` mutation. */
export type DeletePhySensorPayload = {
  __typename?: 'DeletePhySensorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedPhySensorId?: Maybe<Scalars['ID']>;
  /** Reads a single `Device` that is related to this `PhySensor`. */
  deviceByDeviceId?: Maybe<Device>;
  /** The `PhySensor` that was deleted by this mutation. */
  phySensor?: Maybe<PhySensor>;
  /** An edge for our `PhySensor`. May be used by Relay 1. */
  phySensorEdge?: Maybe<PhySensorsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `PhySensor` mutation. */
export type DeletePhySensorPayloadPhySensorEdgeArgs = {
  orderBy?: InputMaybe<Array<PhySensorsOrderBy>>;
};

/** All input for the `deleteReadingByReadingId` mutation. */
export type DeleteReadingByReadingIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  readingId: Scalars['Int'];
};

/** All input for the `deleteReading` mutation. */
export type DeleteReadingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Reading` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Reading` mutation. */
export type DeleteReadingPayload = {
  __typename?: 'DeleteReadingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedReadingId?: Maybe<Scalars['ID']>;
  /** Reads a single `Device` that is related to this `Reading`. */
  deviceByDeviceId?: Maybe<Device>;
  /** Reads a single `Location` that is related to this `Reading`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reading` that was deleted by this mutation. */
  reading?: Maybe<Reading>;
  /** An edge for our `Reading`. May be used by Relay 1. */
  readingEdge?: Maybe<ReadingsEdge>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
};


/** The output of our delete `Reading` mutation. */
export type DeleteReadingPayloadReadingEdgeArgs = {
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/** All input for the `deleteSensorChanByName` mutation. */
export type DeleteSensorChanByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

/** All input for the `deleteSensorChanBySensorChanId` mutation. */
export type DeleteSensorChanBySensorChanIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  sensorChanId: Scalars['Int'];
};

/** All input for the `deleteSensorChan` mutation. */
export type DeleteSensorChanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SensorChan` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `SensorChan` mutation. */
export type DeleteSensorChanPayload = {
  __typename?: 'DeleteSensorChanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedSensorChanId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SensorChan` that was deleted by this mutation. */
  sensorChan?: Maybe<SensorChan>;
  /** An edge for our `SensorChan`. May be used by Relay 1. */
  sensorChanEdge?: Maybe<SensorChansEdge>;
};


/** The output of our delete `SensorChan` mutation. */
export type DeleteSensorChanPayloadSensorChanEdgeArgs = {
  orderBy?: InputMaybe<Array<SensorChansOrderBy>>;
};

export type Device = Node & {
  __typename?: 'Device';
  awsDeviceId: Scalars['String'];
  deviceId: Scalars['Int'];
  /** Reads a single `DeviceMeta` that is related to this `Device`. */
  deviceMetaByDeviceId?: Maybe<DeviceMeta>;
  /**
   * Reads and enables pagination through a set of `DeviceMeta`.
   * @deprecated Please use deviceMetaByDeviceId instead
   */
  deviceMetasByDeviceId: DeviceMetasConnection;
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `PhySensor`. */
  phySensorsByDeviceId: PhySensorsConnection;
  /** Reads and enables pagination through a set of `Reading`. */
  readingsByDeviceId: ReadingsConnection;
  userId: Scalars['UUID'];
};


export type DeviceDeviceMetasByDeviceIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceMetaCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};


export type DevicePhySensorsByDeviceIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PhySensorCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhySensorsOrderBy>>;
};


export type DeviceReadingsByDeviceIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/** A condition to be used against `Device` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DeviceCondition = {
  /** Checks for equality with the object’s `awsDeviceId` field. */
  awsDeviceId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `deviceId` field. */
  deviceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Device` */
export type DeviceInput = {
  awsDeviceId: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['UUID'];
};

export enum DeviceLocMethod {
  GwApprox = 'GW_APPROX',
  Manual = 'MANUAL'
}

export type DeviceMeta = Node & {
  __typename?: 'DeviceMeta';
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Device` that is related to this `DeviceMeta`. */
  deviceByDeviceId?: Maybe<Device>;
  deviceId: Scalars['Int'];
  lastDownlinkAt?: Maybe<Scalars['Datetime']>;
  lastUplinkAt?: Maybe<Scalars['Datetime']>;
  locAccuracy?: Maybe<Scalars['Float']>;
  locId?: Maybe<Scalars['Int']>;
  locMethod?: Maybe<DeviceLocMethod>;
  locUpdatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  locationByLocId?: Maybe<Location>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/**
 * A condition to be used against `DeviceMeta` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type DeviceMetaCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `deviceId` field. */
  deviceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `lastDownlinkAt` field. */
  lastDownlinkAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `lastUplinkAt` field. */
  lastUplinkAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `locAccuracy` field. */
  locAccuracy?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `locId` field. */
  locId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `locMethod` field. */
  locMethod?: InputMaybe<DeviceLocMethod>;
  /** Checks for equality with the object’s `locUpdatedAt` field. */
  locUpdatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** An input for mutations affecting `DeviceMeta` */
export type DeviceMetaInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  deviceId: Scalars['Int'];
  lastDownlinkAt?: InputMaybe<Scalars['Datetime']>;
  lastUplinkAt?: InputMaybe<Scalars['Datetime']>;
  locAccuracy?: InputMaybe<Scalars['Float']>;
  locId?: InputMaybe<Scalars['Int']>;
  locMethod?: InputMaybe<DeviceLocMethod>;
  locUpdatedAt?: InputMaybe<Scalars['Datetime']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `DeviceMeta`. Fields that are set will be updated. */
export type DeviceMetaPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  deviceId?: InputMaybe<Scalars['Int']>;
  lastDownlinkAt?: InputMaybe<Scalars['Datetime']>;
  lastUplinkAt?: InputMaybe<Scalars['Datetime']>;
  locAccuracy?: InputMaybe<Scalars['Float']>;
  locId?: InputMaybe<Scalars['Int']>;
  locMethod?: InputMaybe<DeviceLocMethod>;
  locUpdatedAt?: InputMaybe<Scalars['Datetime']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `DeviceMeta` values. */
export type DeviceMetasConnection = {
  __typename?: 'DeviceMetasConnection';
  /** A list of edges which contains the `DeviceMeta` and cursor to aid in pagination. */
  edges: Array<DeviceMetasEdge>;
  /** A list of `DeviceMeta` objects. */
  nodes: Array<Maybe<DeviceMeta>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `DeviceMeta` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `DeviceMeta` edge in the connection. */
export type DeviceMetasEdge = {
  __typename?: 'DeviceMetasEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `DeviceMeta` at the end of the edge. */
  node?: Maybe<DeviceMeta>;
};

/** Methods to use when ordering `DeviceMeta`. */
export enum DeviceMetasOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DeviceIdAsc = 'DEVICE_ID_ASC',
  DeviceIdDesc = 'DEVICE_ID_DESC',
  LastDownlinkAtAsc = 'LAST_DOWNLINK_AT_ASC',
  LastDownlinkAtDesc = 'LAST_DOWNLINK_AT_DESC',
  LastUplinkAtAsc = 'LAST_UPLINK_AT_ASC',
  LastUplinkAtDesc = 'LAST_UPLINK_AT_DESC',
  LocAccuracyAsc = 'LOC_ACCURACY_ASC',
  LocAccuracyDesc = 'LOC_ACCURACY_DESC',
  LocIdAsc = 'LOC_ID_ASC',
  LocIdDesc = 'LOC_ID_DESC',
  LocMethodAsc = 'LOC_METHOD_ASC',
  LocMethodDesc = 'LOC_METHOD_DESC',
  LocUpdatedAtAsc = 'LOC_UPDATED_AT_ASC',
  LocUpdatedAtDesc = 'LOC_UPDATED_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Device`. Fields that are set will be updated. */
export type DevicePatch = {
  awsDeviceId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `Device` values. */
export type DevicesConnection = {
  __typename?: 'DevicesConnection';
  /** A list of edges which contains the `Device` and cursor to aid in pagination. */
  edges: Array<DevicesEdge>;
  /** A list of `Device` objects. */
  nodes: Array<Maybe<Device>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Device` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Device` edge in the connection. */
export type DevicesEdge = {
  __typename?: 'DevicesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Device` at the end of the edge. */
  node?: Maybe<Device>;
};

/** Methods to use when ordering `Device`. */
export enum DevicesOrderBy {
  AwsDeviceIdAsc = 'AWS_DEVICE_ID_ASC',
  AwsDeviceIdDesc = 'AWS_DEVICE_ID_DESC',
  DeviceIdAsc = 'DEVICE_ID_ASC',
  DeviceIdDesc = 'DEVICE_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type Devmsg = Node & {
  __typename?: 'Devmsg';
  deveui?: Maybe<Scalars['String']>;
  gweui?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  payload?: Maybe<Scalars['String']>;
  rcvd?: Maybe<Scalars['Datetime']>;
  time?: Maybe<Scalars['Datetime']>;
};

/** A condition to be used against `Devmsg` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DevmsgCondition = {
  /** Checks for equality with the object’s `deveui` field. */
  deveui?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `gweui` field. */
  gweui?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `payload` field. */
  payload?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `rcvd` field. */
  rcvd?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['Datetime']>;
};

/** An input for mutations affecting `Devmsg` */
export type DevmsgInput = {
  deveui?: InputMaybe<Scalars['String']>;
  gweui?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  payload?: InputMaybe<Scalars['String']>;
  rcvd?: InputMaybe<Scalars['Datetime']>;
  time?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Devmsg`. Fields that are set will be updated. */
export type DevmsgPatch = {
  deveui?: InputMaybe<Scalars['String']>;
  gweui?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  payload?: InputMaybe<Scalars['String']>;
  rcvd?: InputMaybe<Scalars['Datetime']>;
  time?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Devmsg` values. */
export type DevmsgsConnection = {
  __typename?: 'DevmsgsConnection';
  /** A list of edges which contains the `Devmsg` and cursor to aid in pagination. */
  edges: Array<DevmsgsEdge>;
  /** A list of `Devmsg` objects. */
  nodes: Array<Maybe<Devmsg>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Devmsg` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Devmsg` edge in the connection. */
export type DevmsgsEdge = {
  __typename?: 'DevmsgsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Devmsg` at the end of the edge. */
  node?: Maybe<Devmsg>;
};

/** Methods to use when ordering `Devmsg`. */
export enum DevmsgsOrderBy {
  DeveuiAsc = 'DEVEUI_ASC',
  DeveuiDesc = 'DEVEUI_DESC',
  GweuiAsc = 'GWEUI_ASC',
  GweuiDesc = 'GWEUI_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PayloadAsc = 'PAYLOAD_ASC',
  PayloadDesc = 'PAYLOAD_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RcvdAsc = 'RCVD_ASC',
  RcvdDesc = 'RCVD_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export type Gateway = Node & {
  __typename?: 'Gateway';
  awsGatewayId: Scalars['String'];
  gatewayId: Scalars['Int'];
  /** Reads a single `GatewayMeta` that is related to this `Gateway`. */
  gatewayMetaByGatewayId?: Maybe<GatewayMeta>;
  /**
   * Reads and enables pagination through a set of `GatewayMeta`.
   * @deprecated Please use gatewayMetaByGatewayId instead
   */
  gatewayMetasByGatewayId: GatewayMetasConnection;
  name: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['UUID'];
};


export type GatewayGatewayMetasByGatewayIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayMetaCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};

/** A condition to be used against `Gateway` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GatewayCondition = {
  /** Checks for equality with the object’s `awsGatewayId` field. */
  awsGatewayId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `gatewayId` field. */
  gatewayId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Gateway` */
export type GatewayInput = {
  awsGatewayId: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['UUID'];
};

export enum GatewayLocMethod {
  Gps = 'GPS',
  Manual = 'MANUAL'
}

export type GatewayMeta = Node & {
  __typename?: 'GatewayMeta';
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Gateway` that is related to this `GatewayMeta`. */
  gatewayByGatewayId?: Maybe<Gateway>;
  gatewayId: Scalars['Int'];
  lastDownlinkAt?: Maybe<Scalars['Datetime']>;
  lastUplinkAt?: Maybe<Scalars['Datetime']>;
  locAccuracy?: Maybe<Scalars['Float']>;
  locId?: Maybe<Scalars['Int']>;
  locMethod?: Maybe<GatewayLocMethod>;
  locUpdatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  locationByLocId?: Maybe<Location>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/**
 * A condition to be used against `GatewayMeta` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type GatewayMetaCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `gatewayId` field. */
  gatewayId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `lastDownlinkAt` field. */
  lastDownlinkAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `lastUplinkAt` field. */
  lastUplinkAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `locAccuracy` field. */
  locAccuracy?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `locId` field. */
  locId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `locMethod` field. */
  locMethod?: InputMaybe<GatewayLocMethod>;
  /** Checks for equality with the object’s `locUpdatedAt` field. */
  locUpdatedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** An input for mutations affecting `GatewayMeta` */
export type GatewayMetaInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  gatewayId: Scalars['Int'];
  lastDownlinkAt?: InputMaybe<Scalars['Datetime']>;
  lastUplinkAt?: InputMaybe<Scalars['Datetime']>;
  locAccuracy?: InputMaybe<Scalars['Float']>;
  locId?: InputMaybe<Scalars['Int']>;
  locMethod?: InputMaybe<GatewayLocMethod>;
  locUpdatedAt?: InputMaybe<Scalars['Datetime']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `GatewayMeta`. Fields that are set will be updated. */
export type GatewayMetaPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  gatewayId?: InputMaybe<Scalars['Int']>;
  lastDownlinkAt?: InputMaybe<Scalars['Datetime']>;
  lastUplinkAt?: InputMaybe<Scalars['Datetime']>;
  locAccuracy?: InputMaybe<Scalars['Float']>;
  locId?: InputMaybe<Scalars['Int']>;
  locMethod?: InputMaybe<GatewayLocMethod>;
  locUpdatedAt?: InputMaybe<Scalars['Datetime']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `GatewayMeta` values. */
export type GatewayMetasConnection = {
  __typename?: 'GatewayMetasConnection';
  /** A list of edges which contains the `GatewayMeta` and cursor to aid in pagination. */
  edges: Array<GatewayMetasEdge>;
  /** A list of `GatewayMeta` objects. */
  nodes: Array<Maybe<GatewayMeta>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GatewayMeta` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `GatewayMeta` edge in the connection. */
export type GatewayMetasEdge = {
  __typename?: 'GatewayMetasEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GatewayMeta` at the end of the edge. */
  node?: Maybe<GatewayMeta>;
};

/** Methods to use when ordering `GatewayMeta`. */
export enum GatewayMetasOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  GatewayIdAsc = 'GATEWAY_ID_ASC',
  GatewayIdDesc = 'GATEWAY_ID_DESC',
  LastDownlinkAtAsc = 'LAST_DOWNLINK_AT_ASC',
  LastDownlinkAtDesc = 'LAST_DOWNLINK_AT_DESC',
  LastUplinkAtAsc = 'LAST_UPLINK_AT_ASC',
  LastUplinkAtDesc = 'LAST_UPLINK_AT_DESC',
  LocAccuracyAsc = 'LOC_ACCURACY_ASC',
  LocAccuracyDesc = 'LOC_ACCURACY_DESC',
  LocIdAsc = 'LOC_ID_ASC',
  LocIdDesc = 'LOC_ID_DESC',
  LocMethodAsc = 'LOC_METHOD_ASC',
  LocMethodDesc = 'LOC_METHOD_DESC',
  LocUpdatedAtAsc = 'LOC_UPDATED_AT_ASC',
  LocUpdatedAtDesc = 'LOC_UPDATED_AT_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** Represents an update to a `Gateway`. Fields that are set will be updated. */
export type GatewayPatch = {
  awsGatewayId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `Gateway` values. */
export type GatewaysConnection = {
  __typename?: 'GatewaysConnection';
  /** A list of edges which contains the `Gateway` and cursor to aid in pagination. */
  edges: Array<GatewaysEdge>;
  /** A list of `Gateway` objects. */
  nodes: Array<Maybe<Gateway>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Gateway` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Gateway` edge in the connection. */
export type GatewaysEdge = {
  __typename?: 'GatewaysEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Gateway` at the end of the edge. */
  node?: Maybe<Gateway>;
};

/** Methods to use when ordering `Gateway`. */
export enum GatewaysOrderBy {
  AwsGatewayIdAsc = 'AWS_GATEWAY_ID_ASC',
  AwsGatewayIdDesc = 'AWS_GATEWAY_ID_DESC',
  GatewayIdAsc = 'GATEWAY_ID_ASC',
  GatewayIdDesc = 'GATEWAY_ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type Location = Node & {
  __typename?: 'Location';
  /** Reads and enables pagination through a set of `DeviceMeta`. */
  deviceMetasByLocId: DeviceMetasConnection;
  /** Reads and enables pagination through a set of `GatewayMeta`. */
  gatewayMetasByLocId: GatewayMetasConnection;
  locGeog: Scalars['String'];
  locId: Scalars['Int'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Reading`. */
  readingsByLocId: ReadingsConnection;
};


export type LocationDeviceMetasByLocIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceMetaCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};


export type LocationGatewayMetasByLocIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayMetaCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};


export type LocationReadingsByLocIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/**
 * A condition to be used against `Location` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LocationCondition = {
  /** Checks for equality with the object’s `locGeog` field. */
  locGeog?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `locId` field. */
  locId?: InputMaybe<Scalars['Int']>;
};

/** An input for mutations affecting `Location` */
export type LocationInput = {
  locGeog: Scalars['String'];
};

/** Represents an update to a `Location`. Fields that are set will be updated. */
export type LocationPatch = {
  locGeog?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `Location` values. */
export type LocationsConnection = {
  __typename?: 'LocationsConnection';
  /** A list of edges which contains the `Location` and cursor to aid in pagination. */
  edges: Array<LocationsEdge>;
  /** A list of `Location` objects. */
  nodes: Array<Maybe<Location>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Location` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Location` edge in the connection. */
export type LocationsEdge = {
  __typename?: 'LocationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Location` at the end of the edge. */
  node?: Maybe<Location>;
};

/** Methods to use when ordering `Location`. */
export enum LocationsOrderBy {
  LocGeogAsc = 'LOC_GEOG_ASC',
  LocGeogDesc = 'LOC_GEOG_DESC',
  LocIdAsc = 'LOC_ID_ASC',
  LocIdDesc = 'LOC_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `AlertDef`. */
  createAlertDef?: Maybe<CreateAlertDefPayload>;
  /** Creates a single `Device`. */
  createDevice?: Maybe<CreateDevicePayload>;
  /** Creates a single `DeviceMeta`. */
  createDeviceMeta?: Maybe<CreateDeviceMetaPayload>;
  /** Creates a single `Devmsg`. */
  createDevmsg?: Maybe<CreateDevmsgPayload>;
  /** Creates a single `Gateway`. */
  createGateway?: Maybe<CreateGatewayPayload>;
  /** Creates a single `GatewayMeta`. */
  createGatewayMeta?: Maybe<CreateGatewayMetaPayload>;
  /** Creates a single `Location`. */
  createLocation?: Maybe<CreateLocationPayload>;
  /** Creates a single `PhySensor`. */
  createPhySensor?: Maybe<CreatePhySensorPayload>;
  /** Creates a single `Reading`. */
  createReading?: Maybe<CreateReadingPayload>;
  /** Creates a single `SensorChan`. */
  createSensorChan?: Maybe<CreateSensorChanPayload>;
  /** Deletes a single `AlertDef` using its globally unique id. */
  deleteAlertDef?: Maybe<DeleteAlertDefPayload>;
  /** Deletes a single `AlertDef` using a unique key. */
  deleteAlertDefByAlertDefId?: Maybe<DeleteAlertDefPayload>;
  /** Deletes a single `Device` using its globally unique id. */
  deleteDevice?: Maybe<DeleteDevicePayload>;
  /** Deletes a single `Device` using a unique key. */
  deleteDeviceByAwsDeviceId?: Maybe<DeleteDevicePayload>;
  /** Deletes a single `Device` using a unique key. */
  deleteDeviceByDeviceId?: Maybe<DeleteDevicePayload>;
  /** Deletes a single `DeviceMeta` using its globally unique id. */
  deleteDeviceMeta?: Maybe<DeleteDeviceMetaPayload>;
  /** Deletes a single `DeviceMeta` using a unique key. */
  deleteDeviceMetaByDeviceId?: Maybe<DeleteDeviceMetaPayload>;
  /** Deletes a single `Devmsg` using its globally unique id. */
  deleteDevmsg?: Maybe<DeleteDevmsgPayload>;
  /** Deletes a single `Devmsg` using a unique key. */
  deleteDevmsgById?: Maybe<DeleteDevmsgPayload>;
  /** Deletes a single `Gateway` using its globally unique id. */
  deleteGateway?: Maybe<DeleteGatewayPayload>;
  /** Deletes a single `Gateway` using a unique key. */
  deleteGatewayByAwsGatewayId?: Maybe<DeleteGatewayPayload>;
  /** Deletes a single `Gateway` using a unique key. */
  deleteGatewayByGatewayId?: Maybe<DeleteGatewayPayload>;
  /** Deletes a single `GatewayMeta` using its globally unique id. */
  deleteGatewayMeta?: Maybe<DeleteGatewayMetaPayload>;
  /** Deletes a single `GatewayMeta` using a unique key. */
  deleteGatewayMetaByGatewayId?: Maybe<DeleteGatewayMetaPayload>;
  /** Deletes a single `Location` using its globally unique id. */
  deleteLocation?: Maybe<DeleteLocationPayload>;
  /** Deletes a single `Location` using a unique key. */
  deleteLocationByLocId?: Maybe<DeleteLocationPayload>;
  /** Deletes a single `PhySensor` using its globally unique id. */
  deletePhySensor?: Maybe<DeletePhySensorPayload>;
  /** Deletes a single `PhySensor` using a unique key. */
  deletePhySensorByPhySensorId?: Maybe<DeletePhySensorPayload>;
  /** Deletes a single `Reading` using its globally unique id. */
  deleteReading?: Maybe<DeleteReadingPayload>;
  /** Deletes a single `Reading` using a unique key. */
  deleteReadingByReadingId?: Maybe<DeleteReadingPayload>;
  /** Deletes a single `SensorChan` using its globally unique id. */
  deleteSensorChan?: Maybe<DeleteSensorChanPayload>;
  /** Deletes a single `SensorChan` using a unique key. */
  deleteSensorChanByName?: Maybe<DeleteSensorChanPayload>;
  /** Deletes a single `SensorChan` using a unique key. */
  deleteSensorChanBySensorChanId?: Maybe<DeleteSensorChanPayload>;
  /** Updates a single `AlertDef` using its globally unique id and a patch. */
  updateAlertDef?: Maybe<UpdateAlertDefPayload>;
  /** Updates a single `AlertDef` using a unique key and a patch. */
  updateAlertDefByAlertDefId?: Maybe<UpdateAlertDefPayload>;
  /** Updates a single `Device` using its globally unique id and a patch. */
  updateDevice?: Maybe<UpdateDevicePayload>;
  /** Updates a single `Device` using a unique key and a patch. */
  updateDeviceByAwsDeviceId?: Maybe<UpdateDevicePayload>;
  /** Updates a single `Device` using a unique key and a patch. */
  updateDeviceByDeviceId?: Maybe<UpdateDevicePayload>;
  /** Updates a single `DeviceMeta` using its globally unique id and a patch. */
  updateDeviceMeta?: Maybe<UpdateDeviceMetaPayload>;
  /** Updates a single `DeviceMeta` using a unique key and a patch. */
  updateDeviceMetaByDeviceId?: Maybe<UpdateDeviceMetaPayload>;
  /** Updates a single `Devmsg` using its globally unique id and a patch. */
  updateDevmsg?: Maybe<UpdateDevmsgPayload>;
  /** Updates a single `Devmsg` using a unique key and a patch. */
  updateDevmsgById?: Maybe<UpdateDevmsgPayload>;
  /** Updates a single `Gateway` using its globally unique id and a patch. */
  updateGateway?: Maybe<UpdateGatewayPayload>;
  /** Updates a single `Gateway` using a unique key and a patch. */
  updateGatewayByAwsGatewayId?: Maybe<UpdateGatewayPayload>;
  /** Updates a single `Gateway` using a unique key and a patch. */
  updateGatewayByGatewayId?: Maybe<UpdateGatewayPayload>;
  /** Updates a single `GatewayMeta` using its globally unique id and a patch. */
  updateGatewayMeta?: Maybe<UpdateGatewayMetaPayload>;
  /** Updates a single `GatewayMeta` using a unique key and a patch. */
  updateGatewayMetaByGatewayId?: Maybe<UpdateGatewayMetaPayload>;
  /** Updates a single `Location` using its globally unique id and a patch. */
  updateLocation?: Maybe<UpdateLocationPayload>;
  /** Updates a single `Location` using a unique key and a patch. */
  updateLocationByLocId?: Maybe<UpdateLocationPayload>;
  /** Updates a single `PhySensor` using its globally unique id and a patch. */
  updatePhySensor?: Maybe<UpdatePhySensorPayload>;
  /** Updates a single `PhySensor` using a unique key and a patch. */
  updatePhySensorByPhySensorId?: Maybe<UpdatePhySensorPayload>;
  /** Updates a single `Reading` using its globally unique id and a patch. */
  updateReading?: Maybe<UpdateReadingPayload>;
  /** Updates a single `Reading` using a unique key and a patch. */
  updateReadingByReadingId?: Maybe<UpdateReadingPayload>;
  /** Updates a single `SensorChan` using its globally unique id and a patch. */
  updateSensorChan?: Maybe<UpdateSensorChanPayload>;
  /** Updates a single `SensorChan` using a unique key and a patch. */
  updateSensorChanByName?: Maybe<UpdateSensorChanPayload>;
  /** Updates a single `SensorChan` using a unique key and a patch. */
  updateSensorChanBySensorChanId?: Maybe<UpdateSensorChanPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAlertDefArgs = {
  input: CreateAlertDefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDeviceArgs = {
  input: CreateDeviceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDeviceMetaArgs = {
  input: CreateDeviceMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateDevmsgArgs = {
  input: CreateDevmsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGatewayArgs = {
  input: CreateGatewayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGatewayMetaArgs = {
  input: CreateGatewayMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLocationArgs = {
  input: CreateLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePhySensorArgs = {
  input: CreatePhySensorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateReadingArgs = {
  input: CreateReadingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSensorChanArgs = {
  input: CreateSensorChanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAlertDefArgs = {
  input: DeleteAlertDefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAlertDefByAlertDefIdArgs = {
  input: DeleteAlertDefByAlertDefIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceArgs = {
  input: DeleteDeviceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceByAwsDeviceIdArgs = {
  input: DeleteDeviceByAwsDeviceIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceByDeviceIdArgs = {
  input: DeleteDeviceByDeviceIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceMetaArgs = {
  input: DeleteDeviceMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceMetaByDeviceIdArgs = {
  input: DeleteDeviceMetaByDeviceIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDevmsgArgs = {
  input: DeleteDevmsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDevmsgByIdArgs = {
  input: DeleteDevmsgByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGatewayArgs = {
  input: DeleteGatewayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGatewayByAwsGatewayIdArgs = {
  input: DeleteGatewayByAwsGatewayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGatewayByGatewayIdArgs = {
  input: DeleteGatewayByGatewayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGatewayMetaArgs = {
  input: DeleteGatewayMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGatewayMetaByGatewayIdArgs = {
  input: DeleteGatewayMetaByGatewayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLocationArgs = {
  input: DeleteLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLocationByLocIdArgs = {
  input: DeleteLocationByLocIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePhySensorArgs = {
  input: DeletePhySensorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePhySensorByPhySensorIdArgs = {
  input: DeletePhySensorByPhySensorIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReadingArgs = {
  input: DeleteReadingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReadingByReadingIdArgs = {
  input: DeleteReadingByReadingIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSensorChanArgs = {
  input: DeleteSensorChanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSensorChanByNameArgs = {
  input: DeleteSensorChanByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSensorChanBySensorChanIdArgs = {
  input: DeleteSensorChanBySensorChanIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAlertDefArgs = {
  input: UpdateAlertDefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAlertDefByAlertDefIdArgs = {
  input: UpdateAlertDefByAlertDefIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceArgs = {
  input: UpdateDeviceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceByAwsDeviceIdArgs = {
  input: UpdateDeviceByAwsDeviceIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceByDeviceIdArgs = {
  input: UpdateDeviceByDeviceIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceMetaArgs = {
  input: UpdateDeviceMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceMetaByDeviceIdArgs = {
  input: UpdateDeviceMetaByDeviceIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDevmsgArgs = {
  input: UpdateDevmsgInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDevmsgByIdArgs = {
  input: UpdateDevmsgByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGatewayArgs = {
  input: UpdateGatewayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGatewayByAwsGatewayIdArgs = {
  input: UpdateGatewayByAwsGatewayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGatewayByGatewayIdArgs = {
  input: UpdateGatewayByGatewayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGatewayMetaArgs = {
  input: UpdateGatewayMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGatewayMetaByGatewayIdArgs = {
  input: UpdateGatewayMetaByGatewayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLocationByLocIdArgs = {
  input: UpdateLocationByLocIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePhySensorArgs = {
  input: UpdatePhySensorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePhySensorByPhySensorIdArgs = {
  input: UpdatePhySensorByPhySensorIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReadingArgs = {
  input: UpdateReadingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReadingByReadingIdArgs = {
  input: UpdateReadingByReadingIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSensorChanArgs = {
  input: UpdateSensorChanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSensorChanByNameArgs = {
  input: UpdateSensorChanByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSensorChanBySensorChanIdArgs = {
  input: UpdateSensorChanBySensorChanIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

export type PhySensor = Node & {
  __typename?: 'PhySensor';
  config?: Maybe<Scalars['JSON']>;
  /** Reads a single `Device` that is related to this `PhySensor`. */
  deviceByDeviceId?: Maybe<Device>;
  deviceId?: Maybe<Scalars['Int']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  phySensorId: Scalars['Int'];
  sensorKey?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['JSON']>;
};

/**
 * A condition to be used against `PhySensor` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PhySensorCondition = {
  /** Checks for equality with the object’s `config` field. */
  config?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `deviceId` field. */
  deviceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `phySensorId` field. */
  phySensorId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sensorKey` field. */
  sensorKey?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `state` field. */
  state?: InputMaybe<Scalars['JSON']>;
};

/** An input for mutations affecting `PhySensor` */
export type PhySensorInput = {
  config?: InputMaybe<Scalars['JSON']>;
  deviceId?: InputMaybe<Scalars['Int']>;
  sensorKey?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['JSON']>;
};

/** Represents an update to a `PhySensor`. Fields that are set will be updated. */
export type PhySensorPatch = {
  config?: InputMaybe<Scalars['JSON']>;
  deviceId?: InputMaybe<Scalars['Int']>;
  sensorKey?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['JSON']>;
};

/** A connection to a list of `PhySensor` values. */
export type PhySensorsConnection = {
  __typename?: 'PhySensorsConnection';
  /** A list of edges which contains the `PhySensor` and cursor to aid in pagination. */
  edges: Array<PhySensorsEdge>;
  /** A list of `PhySensor` objects. */
  nodes: Array<Maybe<PhySensor>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PhySensor` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PhySensor` edge in the connection. */
export type PhySensorsEdge = {
  __typename?: 'PhySensorsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PhySensor` at the end of the edge. */
  node?: Maybe<PhySensor>;
};

/** Methods to use when ordering `PhySensor`. */
export enum PhySensorsOrderBy {
  ConfigAsc = 'CONFIG_ASC',
  ConfigDesc = 'CONFIG_DESC',
  DeviceIdAsc = 'DEVICE_ID_ASC',
  DeviceIdDesc = 'DEVICE_ID_DESC',
  Natural = 'NATURAL',
  PhySensorIdAsc = 'PHY_SENSOR_ID_ASC',
  PhySensorIdDesc = 'PHY_SENSOR_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SensorKeyAsc = 'SENSOR_KEY_ASC',
  SensorKeyDesc = 'SENSOR_KEY_DESC',
  StateAsc = 'STATE_ASC',
  StateDesc = 'STATE_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads a single `AlertDef` using its globally unique `ID`. */
  alertDef?: Maybe<AlertDef>;
  alertDefByAlertDefId?: Maybe<AlertDef>;
  /** Reads and enables pagination through a set of `AlertDef`. */
  alertDefs?: Maybe<AlertDefsConnection>;
  /** Reads a single `Device` using its globally unique `ID`. */
  device?: Maybe<Device>;
  deviceByAwsDeviceId?: Maybe<Device>;
  deviceByDeviceId?: Maybe<Device>;
  /** Reads a single `DeviceMeta` using its globally unique `ID`. */
  deviceMeta?: Maybe<DeviceMeta>;
  deviceMetaByDeviceId?: Maybe<DeviceMeta>;
  /** Reads and enables pagination through a set of `DeviceMeta`. */
  deviceMetas?: Maybe<DeviceMetasConnection>;
  /** Reads and enables pagination through a set of `Device`. */
  devices?: Maybe<DevicesConnection>;
  /** Reads a single `Devmsg` using its globally unique `ID`. */
  devmsg?: Maybe<Devmsg>;
  devmsgById?: Maybe<Devmsg>;
  /** Reads and enables pagination through a set of `Devmsg`. */
  devmsgs?: Maybe<DevmsgsConnection>;
  /** Reads a single `Gateway` using its globally unique `ID`. */
  gateway?: Maybe<Gateway>;
  gatewayByAwsGatewayId?: Maybe<Gateway>;
  gatewayByGatewayId?: Maybe<Gateway>;
  /** Reads a single `GatewayMeta` using its globally unique `ID`. */
  gatewayMeta?: Maybe<GatewayMeta>;
  gatewayMetaByGatewayId?: Maybe<GatewayMeta>;
  /** Reads and enables pagination through a set of `GatewayMeta`. */
  gatewayMetas?: Maybe<GatewayMetasConnection>;
  /** Reads and enables pagination through a set of `Gateway`. */
  gateways?: Maybe<GatewaysConnection>;
  /** Reads a single `Location` using its globally unique `ID`. */
  location?: Maybe<Location>;
  locationByLocId?: Maybe<Location>;
  /** Reads and enables pagination through a set of `Location`. */
  locations?: Maybe<LocationsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Reads a single `PhySensor` using its globally unique `ID`. */
  phySensor?: Maybe<PhySensor>;
  phySensorByPhySensorId?: Maybe<PhySensor>;
  /** Reads and enables pagination through a set of `PhySensor`. */
  phySensors?: Maybe<PhySensorsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a single `Reading` using its globally unique `ID`. */
  reading?: Maybe<Reading>;
  /** Reads and enables pagination through a set of `ReadingByChan`. */
  readingByChans?: Maybe<ReadingByChansConnection>;
  readingByReadingId?: Maybe<Reading>;
  /** Reads and enables pagination through a set of `ReadingWLoc`. */
  readingWithin?: Maybe<ReadingWLocsConnection>;
  /** Reads and enables pagination through a set of `Reading`. */
  readings?: Maybe<ReadingsConnection>;
  /** Reads a single `SensorChan` using its globally unique `ID`. */
  sensorChan?: Maybe<SensorChan>;
  sensorChanByName?: Maybe<SensorChan>;
  sensorChanBySensorChanId?: Maybe<SensorChan>;
  /** Reads and enables pagination through a set of `SensorChan`. */
  sensorChans?: Maybe<SensorChansConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertDefArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertDefByAlertDefIdArgs = {
  alertDefId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertDefsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertDefCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceByAwsDeviceIdArgs = {
  awsDeviceId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceByDeviceIdArgs = {
  deviceId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceMetaArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceMetaByDeviceIdArgs = {
  deviceId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceMetasArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceMetaCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDevicesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDevmsgArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDevmsgByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDevmsgsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DevmsgCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DevmsgsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayByAwsGatewayIdArgs = {
  awsGatewayId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayByGatewayIdArgs = {
  gatewayId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayMetaArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayMetaByGatewayIdArgs = {
  gatewayId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayMetasArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayMetaCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewaysArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationByLocIdArgs = {
  locId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<LocationCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPhySensorArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPhySensorByPhySensorIdArgs = {
  phySensorId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPhySensorsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PhySensorCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PhySensorsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingByChansArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingByChanCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingByChansOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingByReadingIdArgs = {
  readingId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingWithinArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  centerLat?: InputMaybe<Scalars['Float']>;
  centerLon?: InputMaybe<Scalars['Float']>;
  endAt?: InputMaybe<Scalars['Datetime']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  radius?: InputMaybe<Scalars['Float']>;
  startAt?: InputMaybe<Scalars['Datetime']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChanArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChanByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChanBySensorChanIdArgs = {
  sensorChanId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChansArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<SensorChanCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SensorChansOrderBy>>;
};

export type Reading = Node & {
  __typename?: 'Reading';
  /** Reads a single `Device` that is related to this `Reading`. */
  deviceByDeviceId?: Maybe<Device>;
  deviceId?: Maybe<Scalars['Int']>;
  locId?: Maybe<Scalars['Int']>;
  /** Reads a single `Location` that is related to this `Reading`. */
  locationByLocId?: Maybe<Location>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  readingId: Scalars['Int'];
  receivedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
  sensorChanId?: Maybe<Scalars['Int']>;
  takenAt: Scalars['Datetime'];
  val: Scalars['Float'];
};

export type ReadingByChan = {
  __typename?: 'ReadingByChan';
  chanName?: Maybe<Scalars['String']>;
  chanUnits?: Maybe<Scalars['String']>;
  deviceId?: Maybe<Scalars['Int']>;
  locId?: Maybe<Scalars['Int']>;
  readingId?: Maybe<Scalars['Int']>;
  receivedAt?: Maybe<Scalars['Datetime']>;
  takenAt?: Maybe<Scalars['Datetime']>;
  val?: Maybe<Scalars['Float']>;
};

/**
 * A condition to be used against `ReadingByChan` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ReadingByChanCondition = {
  /** Checks for equality with the object’s `chanName` field. */
  chanName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `chanUnits` field. */
  chanUnits?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `deviceId` field. */
  deviceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `locId` field. */
  locId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `readingId` field. */
  readingId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `receivedAt` field. */
  receivedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `takenAt` field. */
  takenAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `val` field. */
  val?: InputMaybe<Scalars['Float']>;
};

/** A connection to a list of `ReadingByChan` values. */
export type ReadingByChansConnection = {
  __typename?: 'ReadingByChansConnection';
  /** A list of edges which contains the `ReadingByChan` and cursor to aid in pagination. */
  edges: Array<ReadingByChansEdge>;
  /** A list of `ReadingByChan` objects. */
  nodes: Array<Maybe<ReadingByChan>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ReadingByChan` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ReadingByChan` edge in the connection. */
export type ReadingByChansEdge = {
  __typename?: 'ReadingByChansEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ReadingByChan` at the end of the edge. */
  node?: Maybe<ReadingByChan>;
};

/** Methods to use when ordering `ReadingByChan`. */
export enum ReadingByChansOrderBy {
  ChanNameAsc = 'CHAN_NAME_ASC',
  ChanNameDesc = 'CHAN_NAME_DESC',
  ChanUnitsAsc = 'CHAN_UNITS_ASC',
  ChanUnitsDesc = 'CHAN_UNITS_DESC',
  DeviceIdAsc = 'DEVICE_ID_ASC',
  DeviceIdDesc = 'DEVICE_ID_DESC',
  LocIdAsc = 'LOC_ID_ASC',
  LocIdDesc = 'LOC_ID_DESC',
  Natural = 'NATURAL',
  ReadingIdAsc = 'READING_ID_ASC',
  ReadingIdDesc = 'READING_ID_DESC',
  ReceivedAtAsc = 'RECEIVED_AT_ASC',
  ReceivedAtDesc = 'RECEIVED_AT_DESC',
  TakenAtAsc = 'TAKEN_AT_ASC',
  TakenAtDesc = 'TAKEN_AT_DESC',
  ValAsc = 'VAL_ASC',
  ValDesc = 'VAL_DESC'
}

/** A condition to be used against `Reading` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ReadingCondition = {
  /** Checks for equality with the object’s `deviceId` field. */
  deviceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `locId` field. */
  locId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `readingId` field. */
  readingId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `receivedAt` field. */
  receivedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `sensorChanId` field. */
  sensorChanId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `takenAt` field. */
  takenAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `val` field. */
  val?: InputMaybe<Scalars['Float']>;
};

/** An input for mutations affecting `Reading` */
export type ReadingInput = {
  deviceId?: InputMaybe<Scalars['Int']>;
  locId?: InputMaybe<Scalars['Int']>;
  receivedAt?: InputMaybe<Scalars['Datetime']>;
  sensorChanId?: InputMaybe<Scalars['Int']>;
  takenAt: Scalars['Datetime'];
  val: Scalars['Float'];
};

/** Represents an update to a `Reading`. Fields that are set will be updated. */
export type ReadingPatch = {
  deviceId?: InputMaybe<Scalars['Int']>;
  locId?: InputMaybe<Scalars['Int']>;
  receivedAt?: InputMaybe<Scalars['Datetime']>;
  sensorChanId?: InputMaybe<Scalars['Int']>;
  takenAt?: InputMaybe<Scalars['Datetime']>;
  val?: InputMaybe<Scalars['Float']>;
};

export type ReadingWLoc = {
  __typename?: 'ReadingWLoc';
  chan?: Maybe<Scalars['String']>;
  deviceId?: Maybe<Scalars['Int']>;
  geog?: Maybe<Scalars['String']>;
  readingId?: Maybe<Scalars['Int']>;
  receivedAt?: Maybe<Scalars['Datetime']>;
  takenAt?: Maybe<Scalars['Datetime']>;
  units?: Maybe<Scalars['String']>;
  val?: Maybe<Scalars['Float']>;
};

/** A connection to a list of `ReadingWLoc` values. */
export type ReadingWLocsConnection = {
  __typename?: 'ReadingWLocsConnection';
  /** A list of edges which contains the `ReadingWLoc` and cursor to aid in pagination. */
  edges: Array<ReadingWLocsEdge>;
  /** A list of `ReadingWLoc` objects. */
  nodes: Array<Maybe<ReadingWLoc>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ReadingWLoc` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ReadingWLoc` edge in the connection. */
export type ReadingWLocsEdge = {
  __typename?: 'ReadingWLocsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ReadingWLoc` at the end of the edge. */
  node?: Maybe<ReadingWLoc>;
};

/** A connection to a list of `Reading` values. */
export type ReadingsConnection = {
  __typename?: 'ReadingsConnection';
  /** A list of edges which contains the `Reading` and cursor to aid in pagination. */
  edges: Array<ReadingsEdge>;
  /** A list of `Reading` objects. */
  nodes: Array<Maybe<Reading>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Reading` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Reading` edge in the connection. */
export type ReadingsEdge = {
  __typename?: 'ReadingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Reading` at the end of the edge. */
  node?: Maybe<Reading>;
};

/** Methods to use when ordering `Reading`. */
export enum ReadingsOrderBy {
  DeviceIdAsc = 'DEVICE_ID_ASC',
  DeviceIdDesc = 'DEVICE_ID_DESC',
  LocIdAsc = 'LOC_ID_ASC',
  LocIdDesc = 'LOC_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ReadingIdAsc = 'READING_ID_ASC',
  ReadingIdDesc = 'READING_ID_DESC',
  ReceivedAtAsc = 'RECEIVED_AT_ASC',
  ReceivedAtDesc = 'RECEIVED_AT_DESC',
  SensorChanIdAsc = 'SENSOR_CHAN_ID_ASC',
  SensorChanIdDesc = 'SENSOR_CHAN_ID_DESC',
  TakenAtAsc = 'TAKEN_AT_ASC',
  TakenAtDesc = 'TAKEN_AT_DESC',
  ValAsc = 'VAL_ASC',
  ValDesc = 'VAL_DESC'
}

export type SensorChan = Node & {
  __typename?: 'SensorChan';
  /** Reads and enables pagination through a set of `AlertDef`. */
  alertDefsBySensorChanId: AlertDefsConnection;
  name?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Reading`. */
  readingsBySensorChanId: ReadingsConnection;
  sensorChanId: Scalars['Int'];
  units?: Maybe<Scalars['String']>;
};


export type SensorChanAlertDefsBySensorChanIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertDefCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};


export type SensorChanReadingsBySensorChanIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/**
 * A condition to be used against `SensorChan` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SensorChanCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `sensorChanId` field. */
  sensorChanId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `units` field. */
  units?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `SensorChan` */
export type SensorChanInput = {
  name?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `SensorChan`. Fields that are set will be updated. */
export type SensorChanPatch = {
  name?: InputMaybe<Scalars['String']>;
  units?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `SensorChan` values. */
export type SensorChansConnection = {
  __typename?: 'SensorChansConnection';
  /** A list of edges which contains the `SensorChan` and cursor to aid in pagination. */
  edges: Array<SensorChansEdge>;
  /** A list of `SensorChan` objects. */
  nodes: Array<Maybe<SensorChan>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SensorChan` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SensorChan` edge in the connection. */
export type SensorChansEdge = {
  __typename?: 'SensorChansEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SensorChan` at the end of the edge. */
  node?: Maybe<SensorChan>;
};

/** Methods to use when ordering `SensorChan`. */
export enum SensorChansOrderBy {
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SensorChanIdAsc = 'SENSOR_CHAN_ID_ASC',
  SensorChanIdDesc = 'SENSOR_CHAN_ID_DESC',
  UnitsAsc = 'UNITS_ASC',
  UnitsDesc = 'UNITS_DESC'
}

/** All input for the `updateAlertDefByAlertDefId` mutation. */
export type UpdateAlertDefByAlertDefIdInput = {
  alertDefId: Scalars['Int'];
  /** An object where the defined keys will be set on the `AlertDef` being updated. */
  alertDefPatch: AlertDefPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** All input for the `updateAlertDef` mutation. */
export type UpdateAlertDefInput = {
  /** An object where the defined keys will be set on the `AlertDef` being updated. */
  alertDefPatch: AlertDefPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AlertDef` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `AlertDef` mutation. */
export type UpdateAlertDefPayload = {
  __typename?: 'UpdateAlertDefPayload';
  /** The `AlertDef` that was updated by this mutation. */
  alertDef?: Maybe<AlertDef>;
  /** An edge for our `AlertDef`. May be used by Relay 1. */
  alertDefEdge?: Maybe<AlertDefsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
};


/** The output of our update `AlertDef` mutation. */
export type UpdateAlertDefPayloadAlertDefEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};

/** All input for the `updateDeviceByAwsDeviceId` mutation. */
export type UpdateDeviceByAwsDeviceIdInput = {
  awsDeviceId: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Device` being updated. */
  devicePatch: DevicePatch;
};

/** All input for the `updateDeviceByDeviceId` mutation. */
export type UpdateDeviceByDeviceIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Device` being updated. */
  devicePatch: DevicePatch;
};

/** All input for the `updateDevice` mutation. */
export type UpdateDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Device` being updated. */
  devicePatch: DevicePatch;
  /** The globally unique `ID` which will identify a single `Device` to be updated. */
  nodeId: Scalars['ID'];
};

/** All input for the `updateDeviceMetaByDeviceId` mutation. */
export type UpdateDeviceMetaByDeviceIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
  /** An object where the defined keys will be set on the `DeviceMeta` being updated. */
  deviceMetaPatch: DeviceMetaPatch;
};

/** All input for the `updateDeviceMeta` mutation. */
export type UpdateDeviceMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `DeviceMeta` being updated. */
  deviceMetaPatch: DeviceMetaPatch;
  /** The globally unique `ID` which will identify a single `DeviceMeta` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `DeviceMeta` mutation. */
export type UpdateDeviceMetaPayload = {
  __typename?: 'UpdateDeviceMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `DeviceMeta`. */
  deviceByDeviceId?: Maybe<Device>;
  /** The `DeviceMeta` that was updated by this mutation. */
  deviceMeta?: Maybe<DeviceMeta>;
  /** An edge for our `DeviceMeta`. May be used by Relay 1. */
  deviceMetaEdge?: Maybe<DeviceMetasEdge>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `DeviceMeta` mutation. */
export type UpdateDeviceMetaPayloadDeviceMetaEdgeArgs = {
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};

/** The output of our update `Device` mutation. */
export type UpdateDevicePayload = {
  __typename?: 'UpdateDevicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Device` that was updated by this mutation. */
  device?: Maybe<Device>;
  /** An edge for our `Device`. May be used by Relay 1. */
  deviceEdge?: Maybe<DevicesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Device` mutation. */
export type UpdateDevicePayloadDeviceEdgeArgs = {
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};

/** All input for the `updateDevmsgById` mutation. */
export type UpdateDevmsgByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Devmsg` being updated. */
  devmsgPatch: DevmsgPatch;
  id: Scalars['Int'];
};

/** All input for the `updateDevmsg` mutation. */
export type UpdateDevmsgInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Devmsg` being updated. */
  devmsgPatch: DevmsgPatch;
  /** The globally unique `ID` which will identify a single `Devmsg` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `Devmsg` mutation. */
export type UpdateDevmsgPayload = {
  __typename?: 'UpdateDevmsgPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Devmsg` that was updated by this mutation. */
  devmsg?: Maybe<Devmsg>;
  /** An edge for our `Devmsg`. May be used by Relay 1. */
  devmsgEdge?: Maybe<DevmsgsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Devmsg` mutation. */
export type UpdateDevmsgPayloadDevmsgEdgeArgs = {
  orderBy?: InputMaybe<Array<DevmsgsOrderBy>>;
};

/** All input for the `updateGatewayByAwsGatewayId` mutation. */
export type UpdateGatewayByAwsGatewayIdInput = {
  awsGatewayId: Scalars['String'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Gateway` being updated. */
  gatewayPatch: GatewayPatch;
};

/** All input for the `updateGatewayByGatewayId` mutation. */
export type UpdateGatewayByGatewayIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Gateway` being updated. */
  gatewayPatch: GatewayPatch;
};

/** All input for the `updateGateway` mutation. */
export type UpdateGatewayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Gateway` being updated. */
  gatewayPatch: GatewayPatch;
  /** The globally unique `ID` which will identify a single `Gateway` to be updated. */
  nodeId: Scalars['ID'];
};

/** All input for the `updateGatewayMetaByGatewayId` mutation. */
export type UpdateGatewayMetaByGatewayIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
  /** An object where the defined keys will be set on the `GatewayMeta` being updated. */
  gatewayMetaPatch: GatewayMetaPatch;
};

/** All input for the `updateGatewayMeta` mutation. */
export type UpdateGatewayMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GatewayMeta` being updated. */
  gatewayMetaPatch: GatewayMetaPatch;
  /** The globally unique `ID` which will identify a single `GatewayMeta` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `GatewayMeta` mutation. */
export type UpdateGatewayMetaPayload = {
  __typename?: 'UpdateGatewayMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Gateway` that is related to this `GatewayMeta`. */
  gatewayByGatewayId?: Maybe<Gateway>;
  /** The `GatewayMeta` that was updated by this mutation. */
  gatewayMeta?: Maybe<GatewayMeta>;
  /** An edge for our `GatewayMeta`. May be used by Relay 1. */
  gatewayMetaEdge?: Maybe<GatewayMetasEdge>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `GatewayMeta` mutation. */
export type UpdateGatewayMetaPayloadGatewayMetaEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};

/** The output of our update `Gateway` mutation. */
export type UpdateGatewayPayload = {
  __typename?: 'UpdateGatewayPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Gateway` that was updated by this mutation. */
  gateway?: Maybe<Gateway>;
  /** An edge for our `Gateway`. May be used by Relay 1. */
  gatewayEdge?: Maybe<GatewaysEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Gateway` mutation. */
export type UpdateGatewayPayloadGatewayEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};

/** All input for the `updateLocationByLocId` mutation. */
export type UpdateLocationByLocIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  locId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Location` being updated. */
  locationPatch: LocationPatch;
};

/** All input for the `updateLocation` mutation. */
export type UpdateLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Location` being updated. */
  locationPatch: LocationPatch;
  /** The globally unique `ID` which will identify a single `Location` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `Location` mutation. */
export type UpdateLocationPayload = {
  __typename?: 'UpdateLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Location` that was updated by this mutation. */
  location?: Maybe<Location>;
  /** An edge for our `Location`. May be used by Relay 1. */
  locationEdge?: Maybe<LocationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Location` mutation. */
export type UpdateLocationPayloadLocationEdgeArgs = {
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};

/** All input for the `updatePhySensorByPhySensorId` mutation. */
export type UpdatePhySensorByPhySensorIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  phySensorId: Scalars['Int'];
  /** An object where the defined keys will be set on the `PhySensor` being updated. */
  phySensorPatch: PhySensorPatch;
};

/** All input for the `updatePhySensor` mutation. */
export type UpdatePhySensorInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PhySensor` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PhySensor` being updated. */
  phySensorPatch: PhySensorPatch;
};

/** The output of our update `PhySensor` mutation. */
export type UpdatePhySensorPayload = {
  __typename?: 'UpdatePhySensorPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `PhySensor`. */
  deviceByDeviceId?: Maybe<Device>;
  /** The `PhySensor` that was updated by this mutation. */
  phySensor?: Maybe<PhySensor>;
  /** An edge for our `PhySensor`. May be used by Relay 1. */
  phySensorEdge?: Maybe<PhySensorsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `PhySensor` mutation. */
export type UpdatePhySensorPayloadPhySensorEdgeArgs = {
  orderBy?: InputMaybe<Array<PhySensorsOrderBy>>;
};

/** All input for the `updateReadingByReadingId` mutation. */
export type UpdateReadingByReadingIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  readingId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Reading` being updated. */
  readingPatch: ReadingPatch;
};

/** All input for the `updateReading` mutation. */
export type UpdateReadingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Reading` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Reading` being updated. */
  readingPatch: ReadingPatch;
};

/** The output of our update `Reading` mutation. */
export type UpdateReadingPayload = {
  __typename?: 'UpdateReadingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `Reading`. */
  deviceByDeviceId?: Maybe<Device>;
  /** Reads a single `Location` that is related to this `Reading`. */
  locationByLocId?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reading` that was updated by this mutation. */
  reading?: Maybe<Reading>;
  /** An edge for our `Reading`. May be used by Relay 1. */
  readingEdge?: Maybe<ReadingsEdge>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChanBySensorChanId?: Maybe<SensorChan>;
};


/** The output of our update `Reading` mutation. */
export type UpdateReadingPayloadReadingEdgeArgs = {
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/** All input for the `updateSensorChanByName` mutation. */
export type UpdateSensorChanByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  /** An object where the defined keys will be set on the `SensorChan` being updated. */
  sensorChanPatch: SensorChanPatch;
};

/** All input for the `updateSensorChanBySensorChanId` mutation. */
export type UpdateSensorChanBySensorChanIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  sensorChanId: Scalars['Int'];
  /** An object where the defined keys will be set on the `SensorChan` being updated. */
  sensorChanPatch: SensorChanPatch;
};

/** All input for the `updateSensorChan` mutation. */
export type UpdateSensorChanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SensorChan` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SensorChan` being updated. */
  sensorChanPatch: SensorChanPatch;
};

/** The output of our update `SensorChan` mutation. */
export type UpdateSensorChanPayload = {
  __typename?: 'UpdateSensorChanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `SensorChan` that was updated by this mutation. */
  sensorChan?: Maybe<SensorChan>;
  /** An edge for our `SensorChan`. May be used by Relay 1. */
  sensorChanEdge?: Maybe<SensorChansEdge>;
};


/** The output of our update `SensorChan` mutation. */
export type UpdateSensorChanPayloadSensorChanEdgeArgs = {
  orderBy?: InputMaybe<Array<SensorChansOrderBy>>;
};

export enum UserAlertMethod {
  Email = 'EMAIL',
  Sms = 'SMS'
}

export type DevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type DevicesQuery = { __typename?: 'Query', devices?: { __typename?: 'DevicesConnection', nodes: Array<{ __typename?: 'Device', deviceId: number, name: string } | null> } | null };

export type GatewaysQueryVariables = Exact<{ [key: string]: never; }>;


export type GatewaysQuery = { __typename?: 'Query', gateways?: { __typename?: 'GatewaysConnection', nodes: Array<{ __typename?: 'Gateway', gatewayId: number, name: string } | null> } | null };


export const DevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DevicesQuery, DevicesQueryVariables>;
export const GatewaysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Gateways"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gateways"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gatewayId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GatewaysQuery, GatewaysQueryVariables>;