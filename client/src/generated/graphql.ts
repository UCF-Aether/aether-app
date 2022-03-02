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
  /** The `GeoJSON` scalar type represents GeoJSON values as specified by[RFC 7946](https://tools.ietf.org/html/rfc7946). */
  GeoJSON: any;
  /** A JavaScript object encoded in the JSON format as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

export type AlertDef = Node & {
  __typename?: 'AlertDef';
  alertDefId: Scalars['Int'];
  /** Reads and enables pagination through a set of `AlertEvent`. */
  alertEvents: AlertEventsConnection;
  alertMethod?: Maybe<UserAlertMethod>;
  alertTo?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Profile` that is related to this `AlertDef`. */
  profile?: Maybe<Profile>;
  profileId: Scalars['UUID'];
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChan?: Maybe<SensorChan>;
  sensorChanId?: Maybe<Scalars['Int']>;
  triggerVal?: Maybe<Scalars['Float']>;
};


export type AlertDefAlertEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertEventCondition>;
  filter?: InputMaybe<AlertEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertEventsOrderBy>>;
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
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `sensorChanId` field. */
  sensorChanId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `triggerVal` field. */
  triggerVal?: InputMaybe<Scalars['Float']>;
};

/** A filter to be used against `AlertDef` object types. All fields are combined with a logical ‘and.’ */
export type AlertDefFilter = {
  /** Filter by the object’s `alertDefId` field. */
  alertDefId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `alertMethod` field. */
  alertMethod?: InputMaybe<UserAlertMethodFilter>;
  /** Filter by the object’s `alertTo` field. */
  alertTo?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AlertDefFilter>>;
  /** Negates the expression. */
  not?: InputMaybe<AlertDefFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AlertDefFilter>>;
  /** Filter by the object’s `profileId` field. */
  profileId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `sensorChanId` field. */
  sensorChanId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `triggerVal` field. */
  triggerVal?: InputMaybe<FloatFilter>;
};

/** An input for mutations affecting `AlertDef` */
export type AlertDefInput = {
  alertMethod?: InputMaybe<UserAlertMethod>;
  alertTo?: InputMaybe<Scalars['String']>;
  profileId: Scalars['UUID'];
  sensorChanId?: InputMaybe<Scalars['Int']>;
  triggerVal?: InputMaybe<Scalars['Float']>;
};

/** Represents an update to a `AlertDef`. Fields that are set will be updated. */
export type AlertDefPatch = {
  alertMethod?: InputMaybe<UserAlertMethod>;
  alertTo?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['UUID']>;
  sensorChanId?: InputMaybe<Scalars['Int']>;
  triggerVal?: InputMaybe<Scalars['Float']>;
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
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC',
  SensorChanIdAsc = 'SENSOR_CHAN_ID_ASC',
  SensorChanIdDesc = 'SENSOR_CHAN_ID_DESC',
  TriggerValAsc = 'TRIGGER_VAL_ASC',
  TriggerValDesc = 'TRIGGER_VAL_DESC'
}

export type AlertEvent = {
  __typename?: 'AlertEvent';
  /** Reads a single `AlertDef` that is related to this `AlertEvent`. */
  alertDef?: Maybe<AlertDef>;
  alertDefId?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  profileId?: Maybe<Scalars['UUID']>;
  rawEvent?: Maybe<Scalars['JSON']>;
  /** Reads a single `Reading` that is related to this `AlertEvent`. */
  reading?: Maybe<Reading>;
  readingId?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['Datetime']>;
};

/**
 * A condition to be used against `AlertEvent` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type AlertEventCondition = {
  /** Checks for equality with the object’s `alertDefId` field. */
  alertDefId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `rawEvent` field. */
  rawEvent?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `readingId` field. */
  readingId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `AlertEvent` object types. All fields are combined with a logical ‘and.’ */
export type AlertEventFilter = {
  /** Filter by the object’s `alertDefId` field. */
  alertDefId?: InputMaybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AlertEventFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AlertEventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AlertEventFilter>>;
  /** Filter by the object’s `profileId` field. */
  profileId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `readingId` field. */
  readingId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `time` field. */
  time?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `AlertEvent` */
export type AlertEventInput = {
  alertDefId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  profileId?: InputMaybe<Scalars['UUID']>;
  rawEvent?: InputMaybe<Scalars['JSON']>;
  readingId?: InputMaybe<Scalars['Int']>;
  time?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `AlertEvent` values. */
export type AlertEventsConnection = {
  __typename?: 'AlertEventsConnection';
  /** A list of edges which contains the `AlertEvent` and cursor to aid in pagination. */
  edges: Array<AlertEventsEdge>;
  /** A list of `AlertEvent` objects. */
  nodes: Array<Maybe<AlertEvent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AlertEvent` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `AlertEvent` edge in the connection. */
export type AlertEventsEdge = {
  __typename?: 'AlertEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AlertEvent` at the end of the edge. */
  node?: Maybe<AlertEvent>;
};

/** Methods to use when ordering `AlertEvent`. */
export enum AlertEventsOrderBy {
  AlertDefIdAsc = 'ALERT_DEF_ID_ASC',
  AlertDefIdDesc = 'ALERT_DEF_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC',
  RawEventAsc = 'RAW_EVENT_ASC',
  RawEventDesc = 'RAW_EVENT_DESC',
  ReadingIdAsc = 'READING_ID_ASC',
  ReadingIdDesc = 'READING_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
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
  /** Reads a single `Profile` that is related to this `AlertDef`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChan?: Maybe<SensorChan>;
};


/** The output of our create `AlertDef` mutation. */
export type CreateAlertDefPayloadAlertDefEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};

/** All input for the create `AlertEvent` mutation. */
export type CreateAlertEventInput = {
  /** The `AlertEvent` to be created by this mutation. */
  alertEvent: AlertEventInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `AlertEvent` mutation. */
export type CreateAlertEventPayload = {
  __typename?: 'CreateAlertEventPayload';
  /** Reads a single `AlertDef` that is related to this `AlertEvent`. */
  alertDef?: Maybe<AlertDef>;
  /** The `AlertEvent` that was created by this mutation. */
  alertEvent?: Maybe<AlertEvent>;
  /** An edge for our `AlertEvent`. May be used by Relay 1. */
  alertEventEdge?: Maybe<AlertEventsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Reading` that is related to this `AlertEvent`. */
  reading?: Maybe<Reading>;
};


/** The output of our create `AlertEvent` mutation. */
export type CreateAlertEventPayloadAlertEventEdgeArgs = {
  orderBy?: InputMaybe<Array<AlertEventsOrderBy>>;
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
  device?: Maybe<Device>;
  /** The `DeviceMeta` that was created by this mutation. */
  deviceMeta?: Maybe<DeviceMeta>;
  /** An edge for our `DeviceMeta`. May be used by Relay 1. */
  deviceMetaEdge?: Maybe<DeviceMetasEdge>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  loc?: Maybe<Location>;
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
  /** Reads a single `Profile` that is related to this `Device`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Device` mutation. */
export type CreateDevicePayloadDeviceEdgeArgs = {
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};

/** All input for the create `Event` mutation. */
export type CreateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Event` to be created by this mutation. */
  event: EventInput;
};

/** The output of our create `Event` mutation. */
export type CreateEventPayload = {
  __typename?: 'CreateEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` that was created by this mutation. */
  event?: Maybe<Event>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
  /** Reads a single `Profile` that is related to this `Event`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Event` mutation. */
export type CreateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
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
  gateway?: Maybe<Gateway>;
  /** The `GatewayMeta` that was created by this mutation. */
  gatewayMeta?: Maybe<GatewayMeta>;
  /** An edge for our `GatewayMeta`. May be used by Relay 1. */
  gatewayMetaEdge?: Maybe<GatewayMetasEdge>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  loc?: Maybe<Location>;
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
  /** Reads a single `Profile` that is related to this `Gateway`. */
  profile?: Maybe<Profile>;
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

/** All input for the create `NodeEvent` mutation. */
export type CreateNodeEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `NodeEvent` to be created by this mutation. */
  nodeEvent: NodeEventInput;
};

/** The output of our create `NodeEvent` mutation. */
export type CreateNodeEventPayload = {
  __typename?: 'CreateNodeEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `NodeEvent`. */
  device?: Maybe<Device>;
  /** Reads a single `Gateway` that is related to this `NodeEvent`. */
  gateway?: Maybe<Gateway>;
  /** Reads a single `Location` that is related to this `NodeEvent`. */
  loc?: Maybe<Location>;
  /** The `NodeEvent` that was created by this mutation. */
  nodeEvent?: Maybe<NodeEvent>;
  /** An edge for our `NodeEvent`. May be used by Relay 1. */
  nodeEventEdge?: Maybe<NodeEventsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Reading` that is related to this `NodeEvent`. */
  reading?: Maybe<Reading>;
};


/** The output of our create `NodeEvent` mutation. */
export type CreateNodeEventPayloadNodeEventEdgeArgs = {
  orderBy?: InputMaybe<Array<NodeEventsOrderBy>>;
};

/** All input for the create `Profile` mutation. */
export type CreateProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Profile` to be created by this mutation. */
  profile: ProfileInput;
};

/** The output of our create `Profile` mutation. */
export type CreateProfilePayload = {
  __typename?: 'CreateProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Profile` that was created by this mutation. */
  profile?: Maybe<Profile>;
  /** An edge for our `Profile`. May be used by Relay 1. */
  profileEdge?: Maybe<ProfilesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Profile` mutation. */
export type CreateProfilePayloadProfileEdgeArgs = {
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** All input for the `createRandomDevices` mutation. */
export type CreateRandomDevicesInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  forProfile?: InputMaybe<Scalars['UUID']>;
  num?: InputMaybe<Scalars['Int']>;
};

/** The output of our `createRandomDevices` mutation. */
export type CreateRandomDevicesPayload = {
  __typename?: 'CreateRandomDevicesPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `createRandomReadings` mutation. */
export type CreateRandomReadingsInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  forProfile?: InputMaybe<Scalars['UUID']>;
  loc?: InputMaybe<Scalars['GeoJSON']>;
  num?: InputMaybe<Scalars['Int']>;
  radius?: InputMaybe<Scalars['Float']>;
};

/** The output of our `createRandomReadings` mutation. */
export type CreateRandomReadingsPayload = {
  __typename?: 'CreateRandomReadingsPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
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
  device?: Maybe<Device>;
  /** Reads a single `Location` that is related to this `Reading`. */
  loc?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reading` that was created by this mutation. */
  reading?: Maybe<Reading>;
  /** An edge for our `Reading`. May be used by Relay 1. */
  readingEdge?: Maybe<ReadingsEdge>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChan?: Maybe<SensorChan>;
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

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

/** All input for the `deleteAlertDefByNodeId` mutation. */
export type DeleteAlertDefByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AlertDef` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteAlertDef` mutation. */
export type DeleteAlertDefInput = {
  alertDefId: Scalars['Int'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
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
  deletedAlertDefNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Profile` that is related to this `AlertDef`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChan?: Maybe<SensorChan>;
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

/** All input for the `deleteDeviceByDevEui` mutation. */
export type DeleteDeviceByDevEuiInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  devEui: Scalars['String'];
};

/** All input for the `deleteDeviceByNodeId` mutation. */
export type DeleteDeviceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Device` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteDevice` mutation. */
export type DeleteDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
};

/** All input for the `deleteDeviceMetaByNodeId` mutation. */
export type DeleteDeviceMetaByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `DeviceMeta` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteDeviceMeta` mutation. */
export type DeleteDeviceMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
};

/** The output of our delete `DeviceMeta` mutation. */
export type DeleteDeviceMetaPayload = {
  __typename?: 'DeleteDeviceMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedDeviceMetaNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Device` that is related to this `DeviceMeta`. */
  device?: Maybe<Device>;
  /** The `DeviceMeta` that was deleted by this mutation. */
  deviceMeta?: Maybe<DeviceMeta>;
  /** An edge for our `DeviceMeta`. May be used by Relay 1. */
  deviceMetaEdge?: Maybe<DeviceMetasEdge>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  loc?: Maybe<Location>;
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
  deletedDeviceNodeId?: Maybe<Scalars['ID']>;
  /** The `Device` that was deleted by this mutation. */
  device?: Maybe<Device>;
  /** An edge for our `Device`. May be used by Relay 1. */
  deviceEdge?: Maybe<DevicesEdge>;
  /** Reads a single `Profile` that is related to this `Device`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Device` mutation. */
export type DeleteDevicePayloadDeviceEdgeArgs = {
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};

/** All input for the `deleteEventByNodeId` mutation. */
export type DeleteEventByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Event` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteEvent` mutation. */
export type DeleteEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Event` mutation. */
export type DeleteEventPayload = {
  __typename?: 'DeleteEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedEventNodeId?: Maybe<Scalars['ID']>;
  /** The `Event` that was deleted by this mutation. */
  event?: Maybe<Event>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
  /** Reads a single `Profile` that is related to this `Event`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Event` mutation. */
export type DeleteEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
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

/** All input for the `deleteGatewayByNodeId` mutation. */
export type DeleteGatewayByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Gateway` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGateway` mutation. */
export type DeleteGatewayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
};

/** All input for the `deleteGatewayMetaByNodeId` mutation. */
export type DeleteGatewayMetaByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GatewayMeta` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGatewayMeta` mutation. */
export type DeleteGatewayMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
};

/** The output of our delete `GatewayMeta` mutation. */
export type DeleteGatewayMetaPayload = {
  __typename?: 'DeleteGatewayMetaPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedGatewayMetaNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Gateway` that is related to this `GatewayMeta`. */
  gateway?: Maybe<Gateway>;
  /** The `GatewayMeta` that was deleted by this mutation. */
  gatewayMeta?: Maybe<GatewayMeta>;
  /** An edge for our `GatewayMeta`. May be used by Relay 1. */
  gatewayMetaEdge?: Maybe<GatewayMetasEdge>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  loc?: Maybe<Location>;
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
  deletedGatewayNodeId?: Maybe<Scalars['ID']>;
  /** The `Gateway` that was deleted by this mutation. */
  gateway?: Maybe<Gateway>;
  /** An edge for our `Gateway`. May be used by Relay 1. */
  gatewayEdge?: Maybe<GatewaysEdge>;
  /** Reads a single `Profile` that is related to this `Gateway`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Gateway` mutation. */
export type DeleteGatewayPayloadGatewayEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};

/** All input for the `deleteLocationByNodeId` mutation. */
export type DeleteLocationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Location` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteLocation` mutation. */
export type DeleteLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  locId: Scalars['Int'];
};

/** The output of our delete `Location` mutation. */
export type DeleteLocationPayload = {
  __typename?: 'DeleteLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedLocationNodeId?: Maybe<Scalars['ID']>;
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

/** All input for the `deleteProfileByNodeId` mutation. */
export type DeleteProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Profile` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteProfile` mutation. */
export type DeleteProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  profileId: Scalars['UUID'];
};

/** The output of our delete `Profile` mutation. */
export type DeleteProfilePayload = {
  __typename?: 'DeleteProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedProfileNodeId?: Maybe<Scalars['ID']>;
  /** The `Profile` that was deleted by this mutation. */
  profile?: Maybe<Profile>;
  /** An edge for our `Profile`. May be used by Relay 1. */
  profileEdge?: Maybe<ProfilesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Profile` mutation. */
export type DeleteProfilePayloadProfileEdgeArgs = {
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** All input for the `deleteReadingByNodeId` mutation. */
export type DeleteReadingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Reading` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteReading` mutation. */
export type DeleteReadingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  readingId: Scalars['Int'];
};

/** The output of our delete `Reading` mutation. */
export type DeleteReadingPayload = {
  __typename?: 'DeleteReadingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedReadingNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Device` that is related to this `Reading`. */
  device?: Maybe<Device>;
  /** Reads a single `Location` that is related to this `Reading`. */
  loc?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reading` that was deleted by this mutation. */
  reading?: Maybe<Reading>;
  /** An edge for our `Reading`. May be used by Relay 1. */
  readingEdge?: Maybe<ReadingsEdge>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChan?: Maybe<SensorChan>;
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

/** All input for the `deleteSensorChanByNodeId` mutation. */
export type DeleteSensorChanByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SensorChan` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSensorChan` mutation. */
export type DeleteSensorChanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  sensorChanId: Scalars['Int'];
};

/** The output of our delete `SensorChan` mutation. */
export type DeleteSensorChanPayload = {
  __typename?: 'DeleteSensorChanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedSensorChanNodeId?: Maybe<Scalars['ID']>;
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
  activationMethod?: Maybe<LorawanActivationMethod>;
  appEui?: Maybe<Scalars['String']>;
  appKey?: Maybe<Scalars['String']>;
  appSkey?: Maybe<Scalars['String']>;
  awsDeviceId: Scalars['String'];
  bmeConfig?: Maybe<Scalars['JSON']>;
  bmeState?: Maybe<Scalars['JSON']>;
  devEui: Scalars['String'];
  deviceId: Scalars['Int'];
  /** Reads a single `DeviceMeta` that is related to this `Device`. */
  deviceMeta?: Maybe<DeviceMeta>;
  /**
   * Reads and enables pagination through a set of `DeviceMeta`.
   * @deprecated Please use deviceMeta instead
   */
  deviceMetas: DeviceMetasConnection;
  name: Scalars['String'];
  /** Reads and enables pagination through a set of `NodeEvent`. */
  nodeEvents: NodeEventsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  nwkSkey?: Maybe<Scalars['String']>;
  /** Reads a single `Profile` that is related to this `Device`. */
  profile?: Maybe<Profile>;
  profileId: Scalars['UUID'];
  /** Reads and enables pagination through a set of `Reading`. */
  readings: ReadingsConnection;
};


export type DeviceDeviceMetasArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceMetaCondition>;
  filter?: InputMaybe<DeviceMetaFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};


export type DeviceNodeEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<NodeEventCondition>;
  filter?: InputMaybe<NodeEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NodeEventsOrderBy>>;
};


export type DeviceReadingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  filter?: InputMaybe<ReadingFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/** All input for the `deviceByDeveui` mutation. */
export type DeviceByDeveuiInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  lookupDevEui?: InputMaybe<Scalars['String']>;
};

/** The output of our `deviceByDeveui` mutation. */
export type DeviceByDeveuiPayload = {
  __typename?: 'DeviceByDeveuiPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  device?: Maybe<Device>;
  /** An edge for our `Device`. May be used by Relay 1. */
  deviceEdge?: Maybe<DevicesEdge>;
  /** Reads a single `Profile` that is related to this `Device`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `deviceByDeveui` mutation. */
export type DeviceByDeveuiPayloadDeviceEdgeArgs = {
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};

/** A condition to be used against `Device` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type DeviceCondition = {
  /** Checks for equality with the object’s `activationMethod` field. */
  activationMethod?: InputMaybe<LorawanActivationMethod>;
  /** Checks for equality with the object’s `appEui` field. */
  appEui?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `appKey` field. */
  appKey?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `appSkey` field. */
  appSkey?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `awsDeviceId` field. */
  awsDeviceId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `bmeConfig` field. */
  bmeConfig?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `bmeState` field. */
  bmeState?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `devEui` field. */
  devEui?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `deviceId` field. */
  deviceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `nwkSkey` field. */
  nwkSkey?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `Device` object types. All fields are combined with a logical ‘and.’ */
export type DeviceFilter = {
  /** Filter by the object’s `activationMethod` field. */
  activationMethod?: InputMaybe<LorawanActivationMethodFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<DeviceFilter>>;
  /** Filter by the object’s `appEui` field. */
  appEui?: InputMaybe<StringFilter>;
  /** Filter by the object’s `appKey` field. */
  appKey?: InputMaybe<StringFilter>;
  /** Filter by the object’s `appSkey` field. */
  appSkey?: InputMaybe<StringFilter>;
  /** Filter by the object’s `awsDeviceId` field. */
  awsDeviceId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `devEui` field. */
  devEui?: InputMaybe<StringFilter>;
  /** Filter by the object’s `deviceId` field. */
  deviceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<DeviceFilter>;
  /** Filter by the object’s `nwkSkey` field. */
  nwkSkey?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<DeviceFilter>>;
  /** Filter by the object’s `profileId` field. */
  profileId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Device` */
export type DeviceInput = {
  activationMethod?: InputMaybe<LorawanActivationMethod>;
  appEui?: InputMaybe<Scalars['String']>;
  appKey?: InputMaybe<Scalars['String']>;
  appSkey?: InputMaybe<Scalars['String']>;
  awsDeviceId: Scalars['String'];
  bmeConfig?: InputMaybe<Scalars['JSON']>;
  bmeState?: InputMaybe<Scalars['JSON']>;
  devEui: Scalars['String'];
  name: Scalars['String'];
  nwkSkey?: InputMaybe<Scalars['String']>;
  profileId: Scalars['UUID'];
};

export enum DeviceLocMethod {
  GwApprox = 'GW_APPROX',
  Manual = 'MANUAL'
}

/** A filter to be used against DeviceLocMethod fields. All fields are combined with a logical ‘and.’ */
export type DeviceLocMethodFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<DeviceLocMethod>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<DeviceLocMethod>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<DeviceLocMethod>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<DeviceLocMethod>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<DeviceLocMethod>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<DeviceLocMethod>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<DeviceLocMethod>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<DeviceLocMethod>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<DeviceLocMethod>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<DeviceLocMethod>>;
};

export type DeviceMeta = Node & {
  __typename?: 'DeviceMeta';
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Device` that is related to this `DeviceMeta`. */
  device?: Maybe<Device>;
  deviceId: Scalars['Int'];
  lastDownlinkAt?: Maybe<Scalars['Datetime']>;
  lastUplinkAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  loc?: Maybe<Location>;
  locAccuracy?: Maybe<Scalars['Float']>;
  locId?: Maybe<Scalars['Int']>;
  locMethod?: Maybe<DeviceLocMethod>;
  locUpdatedAt?: Maybe<Scalars['Datetime']>;
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

/** A filter to be used against `DeviceMeta` object types. All fields are combined with a logical ‘and.’ */
export type DeviceMetaFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<DeviceMetaFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `deviceId` field. */
  deviceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `lastDownlinkAt` field. */
  lastDownlinkAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `lastUplinkAt` field. */
  lastUplinkAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `locAccuracy` field. */
  locAccuracy?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `locId` field. */
  locId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `locMethod` field. */
  locMethod?: InputMaybe<DeviceLocMethodFilter>;
  /** Filter by the object’s `locUpdatedAt` field. */
  locUpdatedAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<DeviceMetaFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<DeviceMetaFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
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
  activationMethod?: InputMaybe<LorawanActivationMethod>;
  appEui?: InputMaybe<Scalars['String']>;
  appKey?: InputMaybe<Scalars['String']>;
  appSkey?: InputMaybe<Scalars['String']>;
  awsDeviceId?: InputMaybe<Scalars['String']>;
  bmeConfig?: InputMaybe<Scalars['JSON']>;
  bmeState?: InputMaybe<Scalars['JSON']>;
  devEui?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nwkSkey?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['UUID']>;
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
  ActivationMethodAsc = 'ACTIVATION_METHOD_ASC',
  ActivationMethodDesc = 'ACTIVATION_METHOD_DESC',
  AppEuiAsc = 'APP_EUI_ASC',
  AppEuiDesc = 'APP_EUI_DESC',
  AppKeyAsc = 'APP_KEY_ASC',
  AppKeyDesc = 'APP_KEY_DESC',
  AppSkeyAsc = 'APP_SKEY_ASC',
  AppSkeyDesc = 'APP_SKEY_DESC',
  AwsDeviceIdAsc = 'AWS_DEVICE_ID_ASC',
  AwsDeviceIdDesc = 'AWS_DEVICE_ID_DESC',
  BmeConfigAsc = 'BME_CONFIG_ASC',
  BmeConfigDesc = 'BME_CONFIG_DESC',
  BmeStateAsc = 'BME_STATE_ASC',
  BmeStateDesc = 'BME_STATE_DESC',
  DeviceIdAsc = 'DEVICE_ID_ASC',
  DeviceIdDesc = 'DEVICE_ID_DESC',
  DevEuiAsc = 'DEV_EUI_ASC',
  DevEuiDesc = 'DEV_EUI_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  NwkSkeyAsc = 'NWK_SKEY_ASC',
  NwkSkeyDesc = 'NWK_SKEY_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC'
}

export type Event = Node & {
  __typename?: 'Event';
  id: Scalars['Int'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Profile` that is related to this `Event`. */
  profile?: Maybe<Profile>;
  profileId?: Maybe<Scalars['UUID']>;
  rawEvent?: Maybe<Scalars['JSON']>;
  time?: Maybe<Scalars['Datetime']>;
};

/** A condition to be used against `Event` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EventCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `rawEvent` field. */
  rawEvent?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Event` object types. All fields are combined with a logical ‘and.’ */
export type EventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<EventFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<EventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<EventFilter>>;
  /** Filter by the object’s `profileId` field. */
  profileId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `time` field. */
  time?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Event` */
export type EventInput = {
  profileId?: InputMaybe<Scalars['UUID']>;
  rawEvent?: InputMaybe<Scalars['JSON']>;
  time?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Event`. Fields that are set will be updated. */
export type EventPatch = {
  profileId?: InputMaybe<Scalars['UUID']>;
  rawEvent?: InputMaybe<Scalars['JSON']>;
  time?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Event` values. */
export type EventsConnection = {
  __typename?: 'EventsConnection';
  /** A list of edges which contains the `Event` and cursor to aid in pagination. */
  edges: Array<EventsEdge>;
  /** A list of `Event` objects. */
  nodes: Array<Maybe<Event>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Event` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Event` edge in the connection. */
export type EventsEdge = {
  __typename?: 'EventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Event` at the end of the edge. */
  node?: Maybe<Event>;
};

/** Methods to use when ordering `Event`. */
export enum EventsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC',
  RawEventAsc = 'RAW_EVENT_ASC',
  RawEventDesc = 'RAW_EVENT_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

/** A filter to be used against Float fields. All fields are combined with a logical ‘and.’ */
export type FloatFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Float']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Float']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Float']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Float']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Float']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Float']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Float']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type Gateway = Node & {
  __typename?: 'Gateway';
  awsGatewayId: Scalars['String'];
  gatewayId: Scalars['Int'];
  /** Reads a single `GatewayMeta` that is related to this `Gateway`. */
  gatewayMeta?: Maybe<GatewayMeta>;
  /**
   * Reads and enables pagination through a set of `GatewayMeta`.
   * @deprecated Please use gatewayMeta instead
   */
  gatewayMetas: GatewayMetasConnection;
  name: Scalars['String'];
  /** Reads and enables pagination through a set of `NodeEvent`. */
  nodeEvents: NodeEventsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Profile` that is related to this `Gateway`. */
  profile?: Maybe<Profile>;
  profileId: Scalars['UUID'];
};


export type GatewayGatewayMetasArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayMetaCondition>;
  filter?: InputMaybe<GatewayMetaFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};


export type GatewayNodeEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<NodeEventCondition>;
  filter?: InputMaybe<NodeEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NodeEventsOrderBy>>;
};

/** A condition to be used against `Gateway` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GatewayCondition = {
  /** Checks for equality with the object’s `awsGatewayId` field. */
  awsGatewayId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `gatewayId` field. */
  gatewayId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `Gateway` object types. All fields are combined with a logical ‘and.’ */
export type GatewayFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GatewayFilter>>;
  /** Filter by the object’s `awsGatewayId` field. */
  awsGatewayId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `gatewayId` field. */
  gatewayId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<GatewayFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GatewayFilter>>;
  /** Filter by the object’s `profileId` field. */
  profileId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Gateway` */
export type GatewayInput = {
  awsGatewayId: Scalars['String'];
  name: Scalars['String'];
  profileId: Scalars['UUID'];
};

export enum GatewayLocMethod {
  Gps = 'GPS',
  Manual = 'MANUAL'
}

/** A filter to be used against GatewayLocMethod fields. All fields are combined with a logical ‘and.’ */
export type GatewayLocMethodFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<GatewayLocMethod>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<GatewayLocMethod>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<GatewayLocMethod>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<GatewayLocMethod>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<GatewayLocMethod>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<GatewayLocMethod>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<GatewayLocMethod>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<GatewayLocMethod>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<GatewayLocMethod>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<GatewayLocMethod>>;
};

export type GatewayMeta = Node & {
  __typename?: 'GatewayMeta';
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Gateway` that is related to this `GatewayMeta`. */
  gateway?: Maybe<Gateway>;
  gatewayId: Scalars['Int'];
  lastDownlinkAt?: Maybe<Scalars['Datetime']>;
  lastUplinkAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  loc?: Maybe<Location>;
  locAccuracy?: Maybe<Scalars['Float']>;
  locId?: Maybe<Scalars['Int']>;
  locMethod?: Maybe<GatewayLocMethod>;
  locUpdatedAt?: Maybe<Scalars['Datetime']>;
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

/** A filter to be used against `GatewayMeta` object types. All fields are combined with a logical ‘and.’ */
export type GatewayMetaFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<GatewayMetaFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `gatewayId` field. */
  gatewayId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `lastDownlinkAt` field. */
  lastDownlinkAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `lastUplinkAt` field. */
  lastUplinkAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `locAccuracy` field. */
  locAccuracy?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `locId` field. */
  locId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `locMethod` field. */
  locMethod?: InputMaybe<GatewayLocMethodFilter>;
  /** Filter by the object’s `locUpdatedAt` field. */
  locUpdatedAt?: InputMaybe<DatetimeFilter>;
  /** Negates the expression. */
  not?: InputMaybe<GatewayMetaFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<GatewayMetaFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
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
  profileId?: InputMaybe<Scalars['UUID']>;
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
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC'
}

/** All input for the `generateEui` mutation. */
export type GenerateEuiInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our `generateEui` mutation. */
export type GenerateEuiPayload = {
  __typename?: 'GenerateEuiPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  string?: Maybe<Scalars['String']>;
};

/** All input for the `generateRandomLocation` mutation. */
export type GenerateRandomLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  radius?: InputMaybe<Scalars['Float']>;
};

/** The output of our `generateRandomLocation` mutation. */
export type GenerateRandomLocationPayload = {
  __typename?: 'GenerateRandomLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  integer?: Maybe<Scalars['Int']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `generateRandomPoint` mutation. */
export type GenerateRandomPointInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
  radius?: InputMaybe<Scalars['Float']>;
};

/** The output of our `generateRandomPoint` mutation. */
export type GenerateRandomPointPayload = {
  __typename?: 'GenerateRandomPointPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  geographyInterface?: Maybe<GeographyInterface>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All geography XY types implement this interface */
export type GeographyGeometry = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

export type GeographyGeometryCollection = GeographyGeometry & GeographyInterface & {
  __typename?: 'GeographyGeometryCollection';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeographyGeometry>>>;
  srid: Scalars['Int'];
};

export type GeographyGeometryCollectionM = GeographyGeometryM & GeographyInterface & {
  __typename?: 'GeographyGeometryCollectionM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeographyGeometryM>>>;
  srid: Scalars['Int'];
};

export type GeographyGeometryCollectionZ = GeographyGeometryZ & GeographyInterface & {
  __typename?: 'GeographyGeometryCollectionZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeographyGeometryZ>>>;
  srid: Scalars['Int'];
};

export type GeographyGeometryCollectionZm = GeographyGeometryZm & GeographyInterface & {
  __typename?: 'GeographyGeometryCollectionZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeographyGeometryZm>>>;
  srid: Scalars['Int'];
};

/** All geography XYM types implement this interface */
export type GeographyGeometryM = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geography XYZ types implement this interface */
export type GeographyGeometryZ = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geography XYZM types implement this interface */
export type GeographyGeometryZm = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geography types implement this interface */
export type GeographyInterface = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

export type GeographyLineString = GeographyGeometry & GeographyInterface & {
  __typename?: 'GeographyLineString';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPoint>>>;
  srid: Scalars['Int'];
};

export type GeographyLineStringM = GeographyGeometryM & GeographyInterface & {
  __typename?: 'GeographyLineStringM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPointM>>>;
  srid: Scalars['Int'];
};

export type GeographyLineStringZ = GeographyGeometryZ & GeographyInterface & {
  __typename?: 'GeographyLineStringZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPointZ>>>;
  srid: Scalars['Int'];
};

export type GeographyLineStringZm = GeographyGeometryZm & GeographyInterface & {
  __typename?: 'GeographyLineStringZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPointZm>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiLineString = GeographyGeometry & GeographyInterface & {
  __typename?: 'GeographyMultiLineString';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeographyLineString>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiLineStringM = GeographyGeometryM & GeographyInterface & {
  __typename?: 'GeographyMultiLineStringM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeographyLineStringM>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiLineStringZ = GeographyGeometryZ & GeographyInterface & {
  __typename?: 'GeographyMultiLineStringZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeographyLineStringZ>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiLineStringZm = GeographyGeometryZm & GeographyInterface & {
  __typename?: 'GeographyMultiLineStringZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeographyLineStringZm>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPoint = GeographyGeometry & GeographyInterface & {
  __typename?: 'GeographyMultiPoint';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPoint>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPointM = GeographyGeometryM & GeographyInterface & {
  __typename?: 'GeographyMultiPointM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPointM>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPointZ = GeographyGeometryZ & GeographyInterface & {
  __typename?: 'GeographyMultiPointZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPointZ>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPointZm = GeographyGeometryZm & GeographyInterface & {
  __typename?: 'GeographyMultiPointZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeographyPointZm>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPolygon = GeographyGeometry & GeographyInterface & {
  __typename?: 'GeographyMultiPolygon';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeographyPolygon>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPolygonM = GeographyGeometryM & GeographyInterface & {
  __typename?: 'GeographyMultiPolygonM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeographyPolygonM>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPolygonZ = GeographyGeometryZ & GeographyInterface & {
  __typename?: 'GeographyMultiPolygonZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeographyPolygonZ>>>;
  srid: Scalars['Int'];
};

export type GeographyMultiPolygonZm = GeographyGeometryZm & GeographyInterface & {
  __typename?: 'GeographyMultiPolygonZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeographyPolygonZm>>>;
  srid: Scalars['Int'];
};

export type GeographyPoint = GeographyGeometry & GeographyInterface & {
  __typename?: 'GeographyPoint';
  geojson?: Maybe<Scalars['GeoJSON']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  srid: Scalars['Int'];
};

export type GeographyPointM = GeographyGeometryM & GeographyInterface & {
  __typename?: 'GeographyPointM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  srid: Scalars['Int'];
};

export type GeographyPointZ = GeographyGeometryZ & GeographyInterface & {
  __typename?: 'GeographyPointZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  srid: Scalars['Int'];
};

export type GeographyPointZm = GeographyGeometryZm & GeographyInterface & {
  __typename?: 'GeographyPointZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  srid: Scalars['Int'];
};

export type GeographyPolygon = GeographyGeometry & GeographyInterface & {
  __typename?: 'GeographyPolygon';
  exterior?: Maybe<GeographyLineString>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeographyLineString>>>;
  srid: Scalars['Int'];
};

export type GeographyPolygonM = GeographyGeometryM & GeographyInterface & {
  __typename?: 'GeographyPolygonM';
  exterior?: Maybe<GeographyLineStringM>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeographyLineStringM>>>;
  srid: Scalars['Int'];
};

export type GeographyPolygonZ = GeographyGeometryZ & GeographyInterface & {
  __typename?: 'GeographyPolygonZ';
  exterior?: Maybe<GeographyLineStringZ>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeographyLineStringZ>>>;
  srid: Scalars['Int'];
};

export type GeographyPolygonZm = GeographyGeometryZm & GeographyInterface & {
  __typename?: 'GeographyPolygonZM';
  exterior?: Maybe<GeographyLineStringZm>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeographyLineStringZm>>>;
  srid: Scalars['Int'];
};

/** All geometry XY types implement this interface */
export type GeometryGeometry = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

export type GeometryGeometryCollection = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryGeometryCollection';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometry>>>;
  srid: Scalars['Int'];
};

export type GeometryGeometryCollectionM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryGeometryCollectionM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometryM>>>;
  srid: Scalars['Int'];
};

export type GeometryGeometryCollectionZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryGeometryCollectionZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometryZ>>>;
  srid: Scalars['Int'];
};

export type GeometryGeometryCollectionZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryGeometryCollectionZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometryZm>>>;
  srid: Scalars['Int'];
};

/** All geometry XYM types implement this interface */
export type GeometryGeometryM = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geometry XYZ types implement this interface */
export type GeometryGeometryZ = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geometry XYZM types implement this interface */
export type GeometryGeometryZm = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geometry types implement this interface */
export type GeometryInterface = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

export type GeometryLineString = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryLineString';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPoint>>>;
  srid: Scalars['Int'];
};

export type GeometryLineStringM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryLineStringM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointM>>>;
  srid: Scalars['Int'];
};

export type GeometryLineStringZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryLineStringZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZ>>>;
  srid: Scalars['Int'];
};

export type GeometryLineStringZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryLineStringZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZm>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineString = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryMultiLineString';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineString>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineStringM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryMultiLineStringM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineStringM>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineStringZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryMultiLineStringZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineStringZ>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineStringZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryMultiLineStringZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineStringZm>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPoint = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryMultiPoint';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPoint>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPointM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryMultiPointM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointM>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPointZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryMultiPointZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZ>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPointZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryMultiPointZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZm>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygon = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryMultiPolygon';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygon>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygonM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryMultiPolygonM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygonM>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygonZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryMultiPolygonZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygonZ>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygonZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryMultiPolygonZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygonZm>>>;
  srid: Scalars['Int'];
};

export type GeometryPoint = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryPoint';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPointM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryPointM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPointZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryPointZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPointZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryPointZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPolygon = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryPolygon';
  exterior?: Maybe<GeometryLineString>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineString>>>;
  srid: Scalars['Int'];
};

export type GeometryPolygonM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryPolygonM';
  exterior?: Maybe<GeometryLineStringM>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineStringM>>>;
  srid: Scalars['Int'];
};

export type GeometryPolygonZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryPolygonZ';
  exterior?: Maybe<GeometryLineStringZ>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineStringZ>>>;
  srid: Scalars['Int'];
};

export type GeometryPolygonZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryPolygonZM';
  exterior?: Maybe<GeometryLineStringZm>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineStringZm>>>;
  srid: Scalars['Int'];
};

/** All input for the `getDeviceLocation` mutation. */
export type GetDeviceLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** The output of our `getDeviceLocation` mutation. */
export type GetDeviceLocationPayload = {
  __typename?: 'GetDeviceLocationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  /** An edge for our `Location`. May be used by Relay 1. */
  locationEdge?: Maybe<LocationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `getDeviceLocation` mutation. */
export type GetDeviceLocationPayloadLocationEdgeArgs = {
  orderBy?: InputMaybe<Array<LocationsOrderBy>>;
};

/** All input for the `getDeviceOwner` mutation. */
export type GetDeviceOwnerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  reqDeviceId?: InputMaybe<Scalars['Int']>;
};

/** The output of our `getDeviceOwner` mutation. */
export type GetDeviceOwnerPayload = {
  __typename?: 'GetDeviceOwnerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the `getGatewayOwner` mutation. */
export type GetGatewayOwnerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  reqGatewayId?: InputMaybe<Scalars['Int']>;
};

/** The output of our `getGatewayOwner` mutation. */
export type GetGatewayOwnerPayload = {
  __typename?: 'GetGatewayOwnerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export enum LinkDirection {
  Downlink = 'DOWNLINK',
  Uplink = 'UPLINK'
}

/** A filter to be used against LinkDirection fields. All fields are combined with a logical ‘and.’ */
export type LinkDirectionFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<LinkDirection>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<LinkDirection>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<LinkDirection>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<LinkDirection>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<LinkDirection>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<LinkDirection>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<LinkDirection>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<LinkDirection>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<LinkDirection>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<LinkDirection>>;
};

export type Location = Node & {
  __typename?: 'Location';
  /** Reads and enables pagination through a set of `DeviceMeta`. */
  deviceMetasByLocId: DeviceMetasConnection;
  /** Reads and enables pagination through a set of `GatewayMeta`. */
  gatewayMetasByLocId: GatewayMetasConnection;
  locGeog: GeographyPoint;
  locId: Scalars['Int'];
  /** Reads and enables pagination through a set of `NodeEvent`. */
  nodeEventsByLocId: NodeEventsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Reading`. */
  readingsByLocId: ReadingsConnection;
};


export type LocationDeviceMetasByLocIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceMetaCondition>;
  filter?: InputMaybe<DeviceMetaFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DeviceMetasOrderBy>>;
};


export type LocationGatewayMetasByLocIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayMetaCondition>;
  filter?: InputMaybe<GatewayMetaFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewayMetasOrderBy>>;
};


export type LocationNodeEventsByLocIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<NodeEventCondition>;
  filter?: InputMaybe<NodeEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NodeEventsOrderBy>>;
};


export type LocationReadingsByLocIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  filter?: InputMaybe<ReadingFilter>;
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
  locGeog?: InputMaybe<Scalars['GeoJSON']>;
  /** Checks for equality with the object’s `locId` field. */
  locId?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against `Location` object types. All fields are combined with a logical ‘and.’ */
export type LocationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<LocationFilter>>;
  /** Filter by the object’s `locId` field. */
  locId?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<LocationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<LocationFilter>>;
};

/** An input for mutations affecting `Location` */
export type LocationInput = {
  locGeog: Scalars['GeoJSON'];
};

/** Represents an update to a `Location`. Fields that are set will be updated. */
export type LocationPatch = {
  locGeog?: InputMaybe<Scalars['GeoJSON']>;
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

export enum LorawanActivationMethod {
  Abp = 'ABP',
  Otaa = 'OTAA'
}

/** A filter to be used against LorawanActivationMethod fields. All fields are combined with a logical ‘and.’ */
export type LorawanActivationMethodFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<LorawanActivationMethod>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<LorawanActivationMethod>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<LorawanActivationMethod>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<LorawanActivationMethod>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<LorawanActivationMethod>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<LorawanActivationMethod>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<LorawanActivationMethod>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<LorawanActivationMethod>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<LorawanActivationMethod>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<LorawanActivationMethod>>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `AlertDef`. */
  createAlertDef?: Maybe<CreateAlertDefPayload>;
  /** Creates a single `AlertEvent`. */
  createAlertEvent?: Maybe<CreateAlertEventPayload>;
  /** Creates a single `Device`. */
  createDevice?: Maybe<CreateDevicePayload>;
  /** Creates a single `DeviceMeta`. */
  createDeviceMeta?: Maybe<CreateDeviceMetaPayload>;
  /** Creates a single `Event`. */
  createEvent?: Maybe<CreateEventPayload>;
  /** Creates a single `Gateway`. */
  createGateway?: Maybe<CreateGatewayPayload>;
  /** Creates a single `GatewayMeta`. */
  createGatewayMeta?: Maybe<CreateGatewayMetaPayload>;
  /** Creates a single `Location`. */
  createLocation?: Maybe<CreateLocationPayload>;
  /** Creates a single `NodeEvent`. */
  createNodeEvent?: Maybe<CreateNodeEventPayload>;
  /** Creates a single `Profile`. */
  createProfile?: Maybe<CreateProfilePayload>;
  createRandomDevices?: Maybe<CreateRandomDevicesPayload>;
  createRandomReadings?: Maybe<CreateRandomReadingsPayload>;
  /** Creates a single `Reading`. */
  createReading?: Maybe<CreateReadingPayload>;
  /** Creates a single `SensorChan`. */
  createSensorChan?: Maybe<CreateSensorChanPayload>;
  /** Deletes a single `AlertDef` using a unique key. */
  deleteAlertDef?: Maybe<DeleteAlertDefPayload>;
  /** Deletes a single `AlertDef` using its globally unique id. */
  deleteAlertDefByNodeId?: Maybe<DeleteAlertDefPayload>;
  /** Deletes a single `Device` using a unique key. */
  deleteDevice?: Maybe<DeleteDevicePayload>;
  /** Deletes a single `Device` using a unique key. */
  deleteDeviceByAwsDeviceId?: Maybe<DeleteDevicePayload>;
  /** Deletes a single `Device` using a unique key. */
  deleteDeviceByDevEui?: Maybe<DeleteDevicePayload>;
  /** Deletes a single `Device` using its globally unique id. */
  deleteDeviceByNodeId?: Maybe<DeleteDevicePayload>;
  /** Deletes a single `DeviceMeta` using a unique key. */
  deleteDeviceMeta?: Maybe<DeleteDeviceMetaPayload>;
  /** Deletes a single `DeviceMeta` using its globally unique id. */
  deleteDeviceMetaByNodeId?: Maybe<DeleteDeviceMetaPayload>;
  /** Deletes a single `Event` using a unique key. */
  deleteEvent?: Maybe<DeleteEventPayload>;
  /** Deletes a single `Event` using its globally unique id. */
  deleteEventByNodeId?: Maybe<DeleteEventPayload>;
  /** Deletes a single `Gateway` using a unique key. */
  deleteGateway?: Maybe<DeleteGatewayPayload>;
  /** Deletes a single `Gateway` using a unique key. */
  deleteGatewayByAwsGatewayId?: Maybe<DeleteGatewayPayload>;
  /** Deletes a single `Gateway` using its globally unique id. */
  deleteGatewayByNodeId?: Maybe<DeleteGatewayPayload>;
  /** Deletes a single `GatewayMeta` using a unique key. */
  deleteGatewayMeta?: Maybe<DeleteGatewayMetaPayload>;
  /** Deletes a single `GatewayMeta` using its globally unique id. */
  deleteGatewayMetaByNodeId?: Maybe<DeleteGatewayMetaPayload>;
  /** Deletes a single `Location` using a unique key. */
  deleteLocation?: Maybe<DeleteLocationPayload>;
  /** Deletes a single `Location` using its globally unique id. */
  deleteLocationByNodeId?: Maybe<DeleteLocationPayload>;
  /** Deletes a single `Profile` using a unique key. */
  deleteProfile?: Maybe<DeleteProfilePayload>;
  /** Deletes a single `Profile` using its globally unique id. */
  deleteProfileByNodeId?: Maybe<DeleteProfilePayload>;
  /** Deletes a single `Reading` using a unique key. */
  deleteReading?: Maybe<DeleteReadingPayload>;
  /** Deletes a single `Reading` using its globally unique id. */
  deleteReadingByNodeId?: Maybe<DeleteReadingPayload>;
  /** Deletes a single `SensorChan` using a unique key. */
  deleteSensorChan?: Maybe<DeleteSensorChanPayload>;
  /** Deletes a single `SensorChan` using a unique key. */
  deleteSensorChanByName?: Maybe<DeleteSensorChanPayload>;
  /** Deletes a single `SensorChan` using its globally unique id. */
  deleteSensorChanByNodeId?: Maybe<DeleteSensorChanPayload>;
  deviceByDeveui?: Maybe<DeviceByDeveuiPayload>;
  generateEui?: Maybe<GenerateEuiPayload>;
  generateRandomLocation?: Maybe<GenerateRandomLocationPayload>;
  generateRandomPoint?: Maybe<GenerateRandomPointPayload>;
  getDeviceLocation?: Maybe<GetDeviceLocationPayload>;
  getDeviceOwner?: Maybe<GetDeviceOwnerPayload>;
  getGatewayOwner?: Maybe<GetGatewayOwnerPayload>;
  newReading?: Maybe<NewReadingPayload>;
  /** Updates a single `AlertDef` using a unique key and a patch. */
  updateAlertDef?: Maybe<UpdateAlertDefPayload>;
  /** Updates a single `AlertDef` using its globally unique id and a patch. */
  updateAlertDefByNodeId?: Maybe<UpdateAlertDefPayload>;
  /** Updates a single `Device` using a unique key and a patch. */
  updateDevice?: Maybe<UpdateDevicePayload>;
  /** Updates a single `Device` using a unique key and a patch. */
  updateDeviceByAwsDeviceId?: Maybe<UpdateDevicePayload>;
  /** Updates a single `Device` using a unique key and a patch. */
  updateDeviceByDevEui?: Maybe<UpdateDevicePayload>;
  /** Updates a single `Device` using its globally unique id and a patch. */
  updateDeviceByNodeId?: Maybe<UpdateDevicePayload>;
  /** Updates a single `DeviceMeta` using a unique key and a patch. */
  updateDeviceMeta?: Maybe<UpdateDeviceMetaPayload>;
  /** Updates a single `DeviceMeta` using its globally unique id and a patch. */
  updateDeviceMetaByNodeId?: Maybe<UpdateDeviceMetaPayload>;
  /** Updates a single `Event` using a unique key and a patch. */
  updateEvent?: Maybe<UpdateEventPayload>;
  /** Updates a single `Event` using its globally unique id and a patch. */
  updateEventByNodeId?: Maybe<UpdateEventPayload>;
  /** Updates a single `Gateway` using a unique key and a patch. */
  updateGateway?: Maybe<UpdateGatewayPayload>;
  /** Updates a single `Gateway` using a unique key and a patch. */
  updateGatewayByAwsGatewayId?: Maybe<UpdateGatewayPayload>;
  /** Updates a single `Gateway` using its globally unique id and a patch. */
  updateGatewayByNodeId?: Maybe<UpdateGatewayPayload>;
  /** Updates a single `GatewayMeta` using a unique key and a patch. */
  updateGatewayMeta?: Maybe<UpdateGatewayMetaPayload>;
  /** Updates a single `GatewayMeta` using its globally unique id and a patch. */
  updateGatewayMetaByNodeId?: Maybe<UpdateGatewayMetaPayload>;
  /** Updates a single `Location` using a unique key and a patch. */
  updateLocation?: Maybe<UpdateLocationPayload>;
  /** Updates a single `Location` using its globally unique id and a patch. */
  updateLocationByNodeId?: Maybe<UpdateLocationPayload>;
  /** Updates a single `Profile` using a unique key and a patch. */
  updateProfile?: Maybe<UpdateProfilePayload>;
  /** Updates a single `Profile` using its globally unique id and a patch. */
  updateProfileByNodeId?: Maybe<UpdateProfilePayload>;
  /** Updates a single `Reading` using a unique key and a patch. */
  updateReading?: Maybe<UpdateReadingPayload>;
  /** Updates a single `Reading` using its globally unique id and a patch. */
  updateReadingByNodeId?: Maybe<UpdateReadingPayload>;
  /** Updates a single `SensorChan` using a unique key and a patch. */
  updateSensorChan?: Maybe<UpdateSensorChanPayload>;
  /** Updates a single `SensorChan` using a unique key and a patch. */
  updateSensorChanByName?: Maybe<UpdateSensorChanPayload>;
  /** Updates a single `SensorChan` using its globally unique id and a patch. */
  updateSensorChanByNodeId?: Maybe<UpdateSensorChanPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAlertDefArgs = {
  input: CreateAlertDefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAlertEventArgs = {
  input: CreateAlertEventInput;
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
export type MutationCreateEventArgs = {
  input: CreateEventInput;
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
export type MutationCreateNodeEventArgs = {
  input: CreateNodeEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProfileArgs = {
  input: CreateProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRandomDevicesArgs = {
  input: CreateRandomDevicesInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRandomReadingsArgs = {
  input: CreateRandomReadingsInput;
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
export type MutationDeleteAlertDefByNodeIdArgs = {
  input: DeleteAlertDefByNodeIdInput;
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
export type MutationDeleteDeviceByDevEuiArgs = {
  input: DeleteDeviceByDevEuiInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceByNodeIdArgs = {
  input: DeleteDeviceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceMetaArgs = {
  input: DeleteDeviceMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteDeviceMetaByNodeIdArgs = {
  input: DeleteDeviceMetaByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventArgs = {
  input: DeleteEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEventByNodeIdArgs = {
  input: DeleteEventByNodeIdInput;
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
export type MutationDeleteGatewayByNodeIdArgs = {
  input: DeleteGatewayByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGatewayMetaArgs = {
  input: DeleteGatewayMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGatewayMetaByNodeIdArgs = {
  input: DeleteGatewayMetaByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLocationArgs = {
  input: DeleteLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLocationByNodeIdArgs = {
  input: DeleteLocationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfileArgs = {
  input: DeleteProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProfileByNodeIdArgs = {
  input: DeleteProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReadingArgs = {
  input: DeleteReadingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteReadingByNodeIdArgs = {
  input: DeleteReadingByNodeIdInput;
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
export type MutationDeleteSensorChanByNodeIdArgs = {
  input: DeleteSensorChanByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeviceByDeveuiArgs = {
  input: DeviceByDeveuiInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGenerateEuiArgs = {
  input: GenerateEuiInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGenerateRandomLocationArgs = {
  input: GenerateRandomLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGenerateRandomPointArgs = {
  input: GenerateRandomPointInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGetDeviceLocationArgs = {
  input: GetDeviceLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGetDeviceOwnerArgs = {
  input: GetDeviceOwnerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationGetGatewayOwnerArgs = {
  input: GetGatewayOwnerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationNewReadingArgs = {
  input: NewReadingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAlertDefArgs = {
  input: UpdateAlertDefInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAlertDefByNodeIdArgs = {
  input: UpdateAlertDefByNodeIdInput;
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
export type MutationUpdateDeviceByDevEuiArgs = {
  input: UpdateDeviceByDevEuiInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceByNodeIdArgs = {
  input: UpdateDeviceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceMetaArgs = {
  input: UpdateDeviceMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateDeviceMetaByNodeIdArgs = {
  input: UpdateDeviceMetaByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEventByNodeIdArgs = {
  input: UpdateEventByNodeIdInput;
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
export type MutationUpdateGatewayByNodeIdArgs = {
  input: UpdateGatewayByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGatewayMetaArgs = {
  input: UpdateGatewayMetaInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGatewayMetaByNodeIdArgs = {
  input: UpdateGatewayMetaByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLocationArgs = {
  input: UpdateLocationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLocationByNodeIdArgs = {
  input: UpdateLocationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProfileByNodeIdArgs = {
  input: UpdateProfileByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReadingArgs = {
  input: UpdateReadingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateReadingByNodeIdArgs = {
  input: UpdateReadingByNodeIdInput;
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
export type MutationUpdateSensorChanByNodeIdArgs = {
  input: UpdateSensorChanByNodeIdInput;
};

/** All input for the `newReading` mutation. */
export type NewReadingInput = {
  at?: InputMaybe<Scalars['Datetime']>;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  devEui?: InputMaybe<Scalars['String']>;
  sensorChannel?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['Float']>;
};

/** The output of our `newReading` mutation. */
export type NewReadingPayload = {
  __typename?: 'NewReadingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Device` that is related to this `Reading`. */
  device?: Maybe<Device>;
  /** Reads a single `Location` that is related to this `Reading`. */
  loc?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  reading?: Maybe<Reading>;
  /** An edge for our `Reading`. May be used by Relay 1. */
  readingEdge?: Maybe<ReadingsEdge>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChan?: Maybe<SensorChan>;
};


/** The output of our `newReading` mutation. */
export type NewReadingPayloadReadingEdgeArgs = {
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type NodeEvent = {
  __typename?: 'NodeEvent';
  /** Reads a single `Device` that is related to this `NodeEvent`. */
  device?: Maybe<Device>;
  deviceId?: Maybe<Scalars['Int']>;
  deviceRfMeta?: Maybe<Scalars['JSON']>;
  /** Reads a single `Gateway` that is related to this `NodeEvent`. */
  gateway?: Maybe<Gateway>;
  gatewayId?: Maybe<Scalars['Int']>;
  gatewayRfMeta?: Maybe<Scalars['JSON']>;
  id: Scalars['Int'];
  linkDir?: Maybe<LinkDirection>;
  /** Reads a single `Location` that is related to this `NodeEvent`. */
  loc?: Maybe<Location>;
  locId?: Maybe<Scalars['Int']>;
  locMethod?: Maybe<NodeLocMethod>;
  profileId?: Maybe<Scalars['UUID']>;
  rawEvent?: Maybe<Scalars['JSON']>;
  /** Reads a single `Reading` that is related to this `NodeEvent`. */
  reading?: Maybe<Reading>;
  readingId?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['Datetime']>;
};

/**
 * A condition to be used against `NodeEvent` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type NodeEventCondition = {
  /** Checks for equality with the object’s `deviceId` field. */
  deviceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `deviceRfMeta` field. */
  deviceRfMeta?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `gatewayId` field. */
  gatewayId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `gatewayRfMeta` field. */
  gatewayRfMeta?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `linkDir` field. */
  linkDir?: InputMaybe<LinkDirection>;
  /** Checks for equality with the object’s `locId` field. */
  locId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `locMethod` field. */
  locMethod?: InputMaybe<NodeLocMethod>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `rawEvent` field. */
  rawEvent?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `readingId` field. */
  readingId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `time` field. */
  time?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `NodeEvent` object types. All fields are combined with a logical ‘and.’ */
export type NodeEventFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<NodeEventFilter>>;
  /** Filter by the object’s `deviceId` field. */
  deviceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `gatewayId` field. */
  gatewayId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `linkDir` field. */
  linkDir?: InputMaybe<LinkDirectionFilter>;
  /** Filter by the object’s `locId` field. */
  locId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `locMethod` field. */
  locMethod?: InputMaybe<NodeLocMethodFilter>;
  /** Negates the expression. */
  not?: InputMaybe<NodeEventFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<NodeEventFilter>>;
  /** Filter by the object’s `profileId` field. */
  profileId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `readingId` field. */
  readingId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `time` field. */
  time?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `NodeEvent` */
export type NodeEventInput = {
  deviceId?: InputMaybe<Scalars['Int']>;
  deviceRfMeta?: InputMaybe<Scalars['JSON']>;
  gatewayId?: InputMaybe<Scalars['Int']>;
  gatewayRfMeta?: InputMaybe<Scalars['JSON']>;
  id: Scalars['Int'];
  linkDir?: InputMaybe<LinkDirection>;
  locId?: InputMaybe<Scalars['Int']>;
  locMethod?: InputMaybe<NodeLocMethod>;
  profileId?: InputMaybe<Scalars['UUID']>;
  rawEvent?: InputMaybe<Scalars['JSON']>;
  readingId?: InputMaybe<Scalars['Int']>;
  time?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `NodeEvent` values. */
export type NodeEventsConnection = {
  __typename?: 'NodeEventsConnection';
  /** A list of edges which contains the `NodeEvent` and cursor to aid in pagination. */
  edges: Array<NodeEventsEdge>;
  /** A list of `NodeEvent` objects. */
  nodes: Array<Maybe<NodeEvent>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `NodeEvent` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `NodeEvent` edge in the connection. */
export type NodeEventsEdge = {
  __typename?: 'NodeEventsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `NodeEvent` at the end of the edge. */
  node?: Maybe<NodeEvent>;
};

/** Methods to use when ordering `NodeEvent`. */
export enum NodeEventsOrderBy {
  DeviceIdAsc = 'DEVICE_ID_ASC',
  DeviceIdDesc = 'DEVICE_ID_DESC',
  DeviceRfMetaAsc = 'DEVICE_RF_META_ASC',
  DeviceRfMetaDesc = 'DEVICE_RF_META_DESC',
  GatewayIdAsc = 'GATEWAY_ID_ASC',
  GatewayIdDesc = 'GATEWAY_ID_DESC',
  GatewayRfMetaAsc = 'GATEWAY_RF_META_ASC',
  GatewayRfMetaDesc = 'GATEWAY_RF_META_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LinkDirAsc = 'LINK_DIR_ASC',
  LinkDirDesc = 'LINK_DIR_DESC',
  LocIdAsc = 'LOC_ID_ASC',
  LocIdDesc = 'LOC_ID_DESC',
  LocMethodAsc = 'LOC_METHOD_ASC',
  LocMethodDesc = 'LOC_METHOD_DESC',
  Natural = 'NATURAL',
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC',
  RawEventAsc = 'RAW_EVENT_ASC',
  RawEventDesc = 'RAW_EVENT_DESC',
  ReadingIdAsc = 'READING_ID_ASC',
  ReadingIdDesc = 'READING_ID_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC'
}

export enum NodeLocMethod {
  Gps = 'GPS',
  GwApprox = 'GW_APPROX',
  Manual = 'MANUAL'
}

/** A filter to be used against NodeLocMethod fields. All fields are combined with a logical ‘and.’ */
export type NodeLocMethodFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<NodeLocMethod>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<NodeLocMethod>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<NodeLocMethod>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<NodeLocMethod>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<NodeLocMethod>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<NodeLocMethod>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<NodeLocMethod>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<NodeLocMethod>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<NodeLocMethod>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<NodeLocMethod>>;
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

export type Profile = Node & {
  __typename?: 'Profile';
  /** Reads and enables pagination through a set of `AlertDef`. */
  alertDefs: AlertDefsConnection;
  /** Reads and enables pagination through a set of `Device`. */
  devices: DevicesConnection;
  /** Reads and enables pagination through a set of `Event`. */
  events: EventsConnection;
  firstName?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Gateway`. */
  gateways: GatewaysConnection;
  lastName?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  profileId: Scalars['UUID'];
};


export type ProfileAlertDefsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertDefCondition>;
  filter?: InputMaybe<AlertDefFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};


export type ProfileDevicesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceCondition>;
  filter?: InputMaybe<DeviceFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};


export type ProfileEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EventCondition>;
  filter?: InputMaybe<EventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};


export type ProfileGatewaysArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayCondition>;
  filter?: InputMaybe<GatewayFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};

/** A condition to be used against `Profile` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProfileCondition = {
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `profileId` field. */
  profileId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `Profile` object types. All fields are combined with a logical ‘and.’ */
export type ProfileFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProfileFilter>>;
  /** Filter by the object’s `firstName` field. */
  firstName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lastName` field. */
  lastName?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProfileFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProfileFilter>>;
  /** Filter by the object’s `profileId` field. */
  profileId?: InputMaybe<UuidFilter>;
};

/** An input for mutations affecting `Profile` */
export type ProfileInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  profileId: Scalars['UUID'];
};

/** Represents an update to a `Profile`. Fields that are set will be updated. */
export type ProfilePatch = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `Profile` values. */
export type ProfilesConnection = {
  __typename?: 'ProfilesConnection';
  /** A list of edges which contains the `Profile` and cursor to aid in pagination. */
  edges: Array<ProfilesEdge>;
  /** A list of `Profile` objects. */
  nodes: Array<Maybe<Profile>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Profile` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Profile` edge in the connection. */
export type ProfilesEdge = {
  __typename?: 'ProfilesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Profile` at the end of the edge. */
  node?: Maybe<Profile>;
};

/** Methods to use when ordering `Profile`. */
export enum ProfilesOrderBy {
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProfileIdAsc = 'PROFILE_ID_ASC',
  ProfileIdDesc = 'PROFILE_ID_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  alertDef?: Maybe<AlertDef>;
  /** Reads a single `AlertDef` using its globally unique `ID`. */
  alertDefByNodeId?: Maybe<AlertDef>;
  /** Reads and enables pagination through a set of `AlertDef`. */
  alertDefs?: Maybe<AlertDefsConnection>;
  /** Reads and enables pagination through a set of `AlertEvent`. */
  alertEvents?: Maybe<AlertEventsConnection>;
  device?: Maybe<Device>;
  deviceByAwsDeviceId?: Maybe<Device>;
  deviceByDevEui?: Maybe<Device>;
  /** Reads a single `Device` using its globally unique `ID`. */
  deviceByNodeId?: Maybe<Device>;
  deviceMeta?: Maybe<DeviceMeta>;
  /** Reads a single `DeviceMeta` using its globally unique `ID`. */
  deviceMetaByNodeId?: Maybe<DeviceMeta>;
  /** Reads and enables pagination through a set of `DeviceMeta`. */
  deviceMetas?: Maybe<DeviceMetasConnection>;
  /** Reads and enables pagination through a set of `Device`. */
  devices?: Maybe<DevicesConnection>;
  event?: Maybe<Event>;
  /** Reads a single `Event` using its globally unique `ID`. */
  eventByNodeId?: Maybe<Event>;
  /** Reads and enables pagination through a set of `Event`. */
  events?: Maybe<EventsConnection>;
  gateway?: Maybe<Gateway>;
  gatewayByAwsGatewayId?: Maybe<Gateway>;
  /** Reads a single `Gateway` using its globally unique `ID`. */
  gatewayByNodeId?: Maybe<Gateway>;
  gatewayMeta?: Maybe<GatewayMeta>;
  /** Reads a single `GatewayMeta` using its globally unique `ID`. */
  gatewayMetaByNodeId?: Maybe<GatewayMeta>;
  /** Reads and enables pagination through a set of `GatewayMeta`. */
  gatewayMetas?: Maybe<GatewayMetasConnection>;
  /** Reads and enables pagination through a set of `Gateway`. */
  gateways?: Maybe<GatewaysConnection>;
  location?: Maybe<Location>;
  /** Reads a single `Location` using its globally unique `ID`. */
  locationByNodeId?: Maybe<Location>;
  /** Reads and enables pagination through a set of `Location`. */
  locations?: Maybe<LocationsConnection>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `NodeEvent`. */
  nodeEvents?: Maybe<NodeEventsConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  profile?: Maybe<Profile>;
  /** Reads a single `Profile` using its globally unique `ID`. */
  profileByNodeId?: Maybe<Profile>;
  /** Reads and enables pagination through a set of `Profile`. */
  profiles?: Maybe<ProfilesConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  reading?: Maybe<Reading>;
  /** Reads and enables pagination through a set of `ReadingByChan`. */
  readingByChans?: Maybe<ReadingByChansConnection>;
  /** Reads a single `Reading` using its globally unique `ID`. */
  readingByNodeId?: Maybe<Reading>;
  /** Reads and enables pagination through a set of `Reading`. */
  readings?: Maybe<ReadingsConnection>;
  /** Reads and enables pagination through a set of `ReadingWLoc`. */
  readingsWithin?: Maybe<ReadingWLocsConnection>;
  sensorChan?: Maybe<SensorChan>;
  sensorChanByName?: Maybe<SensorChan>;
  /** Reads a single `SensorChan` using its globally unique `ID`. */
  sensorChanByNodeId?: Maybe<SensorChan>;
  /** Reads and enables pagination through a set of `SensorChan`. */
  sensorChans?: Maybe<SensorChansConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertDefArgs = {
  alertDefId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertDefByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertDefsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertDefCondition>;
  filter?: InputMaybe<AlertDefFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAlertEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertEventCondition>;
  filter?: InputMaybe<AlertEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertEventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceArgs = {
  deviceId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceByAwsDeviceIdArgs = {
  awsDeviceId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceByDevEuiArgs = {
  devEui: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceMetaArgs = {
  deviceId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceMetaByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryDeviceMetasArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<DeviceMetaCondition>;
  filter?: InputMaybe<DeviceMetaFilter>;
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
  filter?: InputMaybe<DeviceFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEventArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<EventCondition>;
  filter?: InputMaybe<EventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayArgs = {
  gatewayId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayByAwsGatewayIdArgs = {
  awsGatewayId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayMetaArgs = {
  gatewayId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayMetaByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGatewayMetasArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<GatewayMetaCondition>;
  filter?: InputMaybe<GatewayMetaFilter>;
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
  filter?: InputMaybe<GatewayFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationArgs = {
  locId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLocationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<LocationCondition>;
  filter?: InputMaybe<LocationFilter>;
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
export type QueryNodeEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<NodeEventCondition>;
  filter?: InputMaybe<NodeEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NodeEventsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProfileArgs = {
  profileId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProfileByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProfilesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProfileCondition>;
  filter?: InputMaybe<ProfileFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingArgs = {
  readingId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingByChansArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingByChanCondition>;
  filter?: InputMaybe<ReadingByChanFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingByChansOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  filter?: InputMaybe<ReadingFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ReadingsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryReadingsWithinArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  centerLat?: InputMaybe<Scalars['Float']>;
  centerLon?: InputMaybe<Scalars['Float']>;
  chan?: InputMaybe<Scalars['String']>;
  endAt?: InputMaybe<Scalars['Datetime']>;
  filter?: InputMaybe<ReadingWLocFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  radius?: InputMaybe<Scalars['Float']>;
  startAt?: InputMaybe<Scalars['Datetime']>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChanArgs = {
  sensorChanId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChanByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChanByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySensorChansArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<SensorChanCondition>;
  filter?: InputMaybe<SensorChanFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SensorChansOrderBy>>;
};

export type Reading = Node & {
  __typename?: 'Reading';
  /** Reads and enables pagination through a set of `AlertEvent`. */
  alertEvents: AlertEventsConnection;
  /** Reads a single `Device` that is related to this `Reading`. */
  device?: Maybe<Device>;
  deviceId: Scalars['Int'];
  /** Reads a single `Location` that is related to this `Reading`. */
  loc?: Maybe<Location>;
  locId: Scalars['Int'];
  /** Reads and enables pagination through a set of `NodeEvent`. */
  nodeEvents: NodeEventsConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  readingId: Scalars['Int'];
  receivedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChan?: Maybe<SensorChan>;
  sensorChanId: Scalars['Int'];
  takenAt: Scalars['Datetime'];
  val: Scalars['Float'];
};


export type ReadingAlertEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertEventCondition>;
  filter?: InputMaybe<AlertEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertEventsOrderBy>>;
};


export type ReadingNodeEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<NodeEventCondition>;
  filter?: InputMaybe<NodeEventFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NodeEventsOrderBy>>;
};

export type ReadingByChan = {
  __typename?: 'ReadingByChan';
  chanName?: Maybe<Scalars['String']>;
  chanUnits?: Maybe<Scalars['String']>;
  deviceId?: Maybe<Scalars['Int']>;
  geog?: Maybe<GeographyPoint>;
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
  /** Checks for equality with the object’s `geog` field. */
  geog?: InputMaybe<Scalars['GeoJSON']>;
  /** Checks for equality with the object’s `readingId` field. */
  readingId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `receivedAt` field. */
  receivedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `takenAt` field. */
  takenAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `val` field. */
  val?: InputMaybe<Scalars['Float']>;
};

/** A filter to be used against `ReadingByChan` object types. All fields are combined with a logical ‘and.’ */
export type ReadingByChanFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ReadingByChanFilter>>;
  /** Filter by the object’s `chanName` field. */
  chanName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `chanUnits` field. */
  chanUnits?: InputMaybe<StringFilter>;
  /** Filter by the object’s `deviceId` field. */
  deviceId?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ReadingByChanFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ReadingByChanFilter>>;
  /** Filter by the object’s `readingId` field. */
  readingId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `receivedAt` field. */
  receivedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `takenAt` field. */
  takenAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `val` field. */
  val?: InputMaybe<FloatFilter>;
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
  GeogAsc = 'GEOG_ASC',
  GeogDesc = 'GEOG_DESC',
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

/** A filter to be used against `Reading` object types. All fields are combined with a logical ‘and.’ */
export type ReadingFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ReadingFilter>>;
  /** Filter by the object’s `deviceId` field. */
  deviceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `locId` field. */
  locId?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ReadingFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ReadingFilter>>;
  /** Filter by the object’s `readingId` field. */
  readingId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `receivedAt` field. */
  receivedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `sensorChanId` field. */
  sensorChanId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `takenAt` field. */
  takenAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `val` field. */
  val?: InputMaybe<FloatFilter>;
};

/** An input for mutations affecting `Reading` */
export type ReadingInput = {
  deviceId: Scalars['Int'];
  locId: Scalars['Int'];
  receivedAt?: InputMaybe<Scalars['Datetime']>;
  sensorChanId: Scalars['Int'];
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
  geog?: Maybe<GeographyPoint>;
  readingId?: Maybe<Scalars['Int']>;
  receivedAt?: Maybe<Scalars['Datetime']>;
  takenAt?: Maybe<Scalars['Datetime']>;
  units?: Maybe<Scalars['String']>;
  val?: Maybe<Scalars['Float']>;
};

/** A filter to be used against `ReadingWLoc` object types. All fields are combined with a logical ‘and.’ */
export type ReadingWLocFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ReadingWLocFilter>>;
  /** Filter by the object’s `chan` field. */
  chan?: InputMaybe<StringFilter>;
  /** Filter by the object’s `deviceId` field. */
  deviceId?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ReadingWLocFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ReadingWLocFilter>>;
  /** Filter by the object’s `readingId` field. */
  readingId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `receivedAt` field. */
  receivedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `takenAt` field. */
  takenAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `units` field. */
  units?: InputMaybe<StringFilter>;
  /** Filter by the object’s `val` field. */
  val?: InputMaybe<FloatFilter>;
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
  alertDefs: AlertDefsConnection;
  name?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads and enables pagination through a set of `Reading`. */
  readings: ReadingsConnection;
  sensorChanId: Scalars['Int'];
  units?: Maybe<Scalars['String']>;
};


export type SensorChanAlertDefsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<AlertDefCondition>;
  filter?: InputMaybe<AlertDefFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<AlertDefsOrderBy>>;
};


export type SensorChanReadingsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ReadingCondition>;
  filter?: InputMaybe<ReadingFilter>;
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

/** A filter to be used against `SensorChan` object types. All fields are combined with a logical ‘and.’ */
export type SensorChanFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SensorChanFilter>>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SensorChanFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SensorChanFilter>>;
  /** Filter by the object’s `sensorChanId` field. */
  sensorChanId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `units` field. */
  units?: InputMaybe<StringFilter>;
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

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']>>;
};

/** All input for the `updateAlertDefByNodeId` mutation. */
export type UpdateAlertDefByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AlertDef` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `AlertDef` being updated. */
  patch: AlertDefPatch;
};

/** All input for the `updateAlertDef` mutation. */
export type UpdateAlertDefInput = {
  alertDefId: Scalars['Int'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AlertDef` being updated. */
  patch: AlertDefPatch;
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
  /** Reads a single `Profile` that is related to this `AlertDef`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `SensorChan` that is related to this `AlertDef`. */
  sensorChan?: Maybe<SensorChan>;
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
  patch: DevicePatch;
};

/** All input for the `updateDeviceByDevEui` mutation. */
export type UpdateDeviceByDevEuiInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  devEui: Scalars['String'];
  /** An object where the defined keys will be set on the `Device` being updated. */
  patch: DevicePatch;
};

/** All input for the `updateDeviceByNodeId` mutation. */
export type UpdateDeviceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Device` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Device` being updated. */
  patch: DevicePatch;
};

/** All input for the `updateDevice` mutation. */
export type UpdateDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Device` being updated. */
  patch: DevicePatch;
};

/** All input for the `updateDeviceMetaByNodeId` mutation. */
export type UpdateDeviceMetaByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `DeviceMeta` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `DeviceMeta` being updated. */
  patch: DeviceMetaPatch;
};

/** All input for the `updateDeviceMeta` mutation. */
export type UpdateDeviceMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  deviceId: Scalars['Int'];
  /** An object where the defined keys will be set on the `DeviceMeta` being updated. */
  patch: DeviceMetaPatch;
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
  device?: Maybe<Device>;
  /** The `DeviceMeta` that was updated by this mutation. */
  deviceMeta?: Maybe<DeviceMeta>;
  /** An edge for our `DeviceMeta`. May be used by Relay 1. */
  deviceMetaEdge?: Maybe<DeviceMetasEdge>;
  /** Reads a single `Location` that is related to this `DeviceMeta`. */
  loc?: Maybe<Location>;
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
  /** Reads a single `Profile` that is related to this `Device`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Device` mutation. */
export type UpdateDevicePayloadDeviceEdgeArgs = {
  orderBy?: InputMaybe<Array<DevicesOrderBy>>;
};

/** All input for the `updateEventByNodeId` mutation. */
export type UpdateEventByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Event` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Event` being updated. */
  patch: EventPatch;
};

/** All input for the `updateEvent` mutation. */
export type UpdateEventInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Event` being updated. */
  patch: EventPatch;
};

/** The output of our update `Event` mutation. */
export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Event` that was updated by this mutation. */
  event?: Maybe<Event>;
  /** An edge for our `Event`. May be used by Relay 1. */
  eventEdge?: Maybe<EventsEdge>;
  /** Reads a single `Profile` that is related to this `Event`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Event` mutation. */
export type UpdateEventPayloadEventEdgeArgs = {
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
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
  patch: GatewayPatch;
};

/** All input for the `updateGatewayByNodeId` mutation. */
export type UpdateGatewayByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Gateway` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Gateway` being updated. */
  patch: GatewayPatch;
};

/** All input for the `updateGateway` mutation. */
export type UpdateGatewayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Gateway` being updated. */
  patch: GatewayPatch;
};

/** All input for the `updateGatewayMetaByNodeId` mutation. */
export type UpdateGatewayMetaByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GatewayMeta` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `GatewayMeta` being updated. */
  patch: GatewayMetaPatch;
};

/** All input for the `updateGatewayMeta` mutation. */
export type UpdateGatewayMetaInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  gatewayId: Scalars['Int'];
  /** An object where the defined keys will be set on the `GatewayMeta` being updated. */
  patch: GatewayMetaPatch;
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
  gateway?: Maybe<Gateway>;
  /** The `GatewayMeta` that was updated by this mutation. */
  gatewayMeta?: Maybe<GatewayMeta>;
  /** An edge for our `GatewayMeta`. May be used by Relay 1. */
  gatewayMetaEdge?: Maybe<GatewayMetasEdge>;
  /** Reads a single `Location` that is related to this `GatewayMeta`. */
  loc?: Maybe<Location>;
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
  /** Reads a single `Profile` that is related to this `Gateway`. */
  profile?: Maybe<Profile>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Gateway` mutation. */
export type UpdateGatewayPayloadGatewayEdgeArgs = {
  orderBy?: InputMaybe<Array<GatewaysOrderBy>>;
};

/** All input for the `updateLocationByNodeId` mutation. */
export type UpdateLocationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Location` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Location` being updated. */
  patch: LocationPatch;
};

/** All input for the `updateLocation` mutation. */
export type UpdateLocationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  locId: Scalars['Int'];
  /** An object where the defined keys will be set on the `Location` being updated. */
  patch: LocationPatch;
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

/** All input for the `updateProfileByNodeId` mutation. */
export type UpdateProfileByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Profile` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Profile` being updated. */
  patch: ProfilePatch;
};

/** All input for the `updateProfile` mutation. */
export type UpdateProfileInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Profile` being updated. */
  patch: ProfilePatch;
  profileId: Scalars['UUID'];
};

/** The output of our update `Profile` mutation. */
export type UpdateProfilePayload = {
  __typename?: 'UpdateProfilePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Profile` that was updated by this mutation. */
  profile?: Maybe<Profile>;
  /** An edge for our `Profile`. May be used by Relay 1. */
  profileEdge?: Maybe<ProfilesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Profile` mutation. */
export type UpdateProfilePayloadProfileEdgeArgs = {
  orderBy?: InputMaybe<Array<ProfilesOrderBy>>;
};

/** All input for the `updateReadingByNodeId` mutation. */
export type UpdateReadingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Reading` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Reading` being updated. */
  patch: ReadingPatch;
};

/** All input for the `updateReading` mutation. */
export type UpdateReadingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Reading` being updated. */
  patch: ReadingPatch;
  readingId: Scalars['Int'];
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
  device?: Maybe<Device>;
  /** Reads a single `Location` that is related to this `Reading`. */
  loc?: Maybe<Location>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Reading` that was updated by this mutation. */
  reading?: Maybe<Reading>;
  /** An edge for our `Reading`. May be used by Relay 1. */
  readingEdge?: Maybe<ReadingsEdge>;
  /** Reads a single `SensorChan` that is related to this `Reading`. */
  sensorChan?: Maybe<SensorChan>;
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
  patch: SensorChanPatch;
};

/** All input for the `updateSensorChanByNodeId` mutation. */
export type UpdateSensorChanByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SensorChan` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SensorChan` being updated. */
  patch: SensorChanPatch;
};

/** All input for the `updateSensorChan` mutation. */
export type UpdateSensorChanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SensorChan` being updated. */
  patch: SensorChanPatch;
  sensorChanId: Scalars['Int'];
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

/** A filter to be used against UserAlertMethod fields. All fields are combined with a logical ‘and.’ */
export type UserAlertMethodFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<UserAlertMethod>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<UserAlertMethod>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<UserAlertMethod>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<UserAlertMethod>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<UserAlertMethod>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<UserAlertMethod>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<UserAlertMethod>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<UserAlertMethod>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<UserAlertMethod>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<UserAlertMethod>>;
};

export type DeviceInfoQueryVariables = Exact<{
  deviceId: Scalars['Int'];
}>;


export type DeviceInfoQuery = { __typename?: 'Query', device?: { __typename?: 'Device', name: string, devEui: string, activationMethod?: LorawanActivationMethod | null, deviceMeta?: { __typename?: 'DeviceMeta', createdAt?: any | null, updatedAt?: any | null, locUpdatedAt?: any | null, lastUplinkAt?: any | null, lastDownlinkAt?: any | null, locMethod?: DeviceLocMethod | null, loc?: { __typename?: 'Location', locGeog: { __typename?: 'GeographyPoint', longitude: number, latitude: number } } | null } | null } | null };

export type DeviceReadingsQueryVariables = Exact<{
  deviceId: Scalars['Int'];
  start?: InputMaybe<Scalars['Datetime']>;
}>;


export type DeviceReadingsQuery = { __typename?: 'Query', aqi?: { __typename?: 'ReadingByChansConnection', nodes: Array<{ __typename?: 'ReadingByChan', val?: number | null, takenAt?: any | null, geog?: { __typename?: 'GeographyPoint', latitude: number, longitude: number } | null } | null> } | null, pm2_5?: { __typename?: 'ReadingByChansConnection', nodes: Array<{ __typename?: 'ReadingByChan', val?: number | null, takenAt?: any | null, geog?: { __typename?: 'GeographyPoint', latitude: number, longitude: number } | null } | null> } | null, voc?: { __typename?: 'ReadingByChansConnection', nodes: Array<{ __typename?: 'ReadingByChan', val?: number | null, takenAt?: any | null, geog?: { __typename?: 'GeographyPoint', latitude: number, longitude: number } | null } | null> } | null, temperature?: { __typename?: 'ReadingByChansConnection', nodes: Array<{ __typename?: 'ReadingByChan', val?: number | null, takenAt?: any | null, geog?: { __typename?: 'GeographyPoint', latitude: number, longitude: number } | null } | null> } | null };

export type ReadingFieldsFragment = { __typename?: 'ReadingByChansConnection', nodes: Array<{ __typename?: 'ReadingByChan', val?: number | null, takenAt?: any | null, geog?: { __typename?: 'GeographyPoint', latitude: number, longitude: number } | null } | null> };

export type DevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type DevicesQuery = { __typename?: 'Query', devices?: { __typename?: 'DevicesConnection', nodes: Array<{ __typename?: 'Device', deviceId: number, name: string } | null> } | null };

export type GatewaysQueryVariables = Exact<{ [key: string]: never; }>;


export type GatewaysQuery = { __typename?: 'Query', gateways?: { __typename?: 'GatewaysConnection', nodes: Array<{ __typename?: 'Gateway', gatewayId: number, name: string } | null> } | null };

export type ReadingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ReadingsQuery = { __typename?: 'Query', readingsWithin?: { __typename?: 'ReadingWLocsConnection', nodes: Array<{ __typename?: 'ReadingWLoc', val?: number | null, chan?: string | null, deviceId?: number | null, takenAt?: any | null, geog?: { __typename?: 'GeographyPoint', latitude: number, longitude: number } | null } | null> } | null };

export const ReadingFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ReadingFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ReadingByChansConnection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"val"}},{"kind":"Field","name":{"kind":"Name","value":"takenAt"}},{"kind":"Field","name":{"kind":"Name","value":"geog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}}]}}]} as unknown as DocumentNode<ReadingFieldsFragment, unknown>;
export const DeviceInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DeviceInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"device"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"deviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"devEui"}},{"kind":"Field","name":{"kind":"Name","value":"activationMethod"}},{"kind":"Field","name":{"kind":"Name","value":"deviceMeta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"locUpdatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastUplinkAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastDownlinkAt"}},{"kind":"Field","name":{"kind":"Name","value":"locMethod"}},{"kind":"Field","name":{"kind":"Name","value":"loc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"locGeog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"longitude"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<DeviceInfoQuery, DeviceInfoQueryVariables>;
export const DeviceReadingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DeviceReadings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Datetime"}},"defaultValue":{"kind":"StringValue","value":"2000-01-01","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"aqi"},"name":{"kind":"Name","value":"readingByChans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"deviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"chanName"},"value":{"kind":"StringValue","value":"AQI","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"takenAt"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"greaterThanOrEqualTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReadingFields"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"pm2_5"},"name":{"kind":"Name","value":"readingByChans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"deviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"chanName"},"value":{"kind":"StringValue","value":"PM2.5","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"takenAt"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"greaterThanOrEqualTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReadingFields"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"voc"},"name":{"kind":"Name","value":"readingByChans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"deviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"chanName"},"value":{"kind":"StringValue","value":"VOC","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"takenAt"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"greaterThanOrEqualTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReadingFields"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"temperature"},"name":{"kind":"Name","value":"readingByChans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"deviceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deviceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"chanName"},"value":{"kind":"StringValue","value":"TEMPERATURE","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"takenAt"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"greaterThanOrEqualTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ReadingFields"}}]}}]}},...ReadingFieldsFragmentDoc.definitions]} as unknown as DocumentNode<DeviceReadingsQuery, DeviceReadingsQueryVariables>;
export const DevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DevicesQuery, DevicesQueryVariables>;
export const GatewaysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Gateways"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gateways"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gatewayId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GatewaysQuery, GatewaysQueryVariables>;
export const ReadingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Readings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readingsWithin"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"val"}},{"kind":"Field","name":{"kind":"Name","value":"geog"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chan"}},{"kind":"Field","name":{"kind":"Name","value":"deviceId"}},{"kind":"Field","name":{"kind":"Name","value":"takenAt"}}]}}]}}]}}]} as unknown as DocumentNode<ReadingsQuery, ReadingsQueryVariables>;