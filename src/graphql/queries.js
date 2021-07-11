/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLandlord = /* GraphQL */ `
  query GetLandlord($id: ID!) {
    getLandlord(id: $id) {
      id
      name
      properties
      createdAt
      updatedAt
    }
  }
`;
export const listLandlords = /* GraphQL */ `
  query ListLandlords(
    $filter: ModelLandlordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLandlords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        properties
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSubtask = /* GraphQL */ `
  query GetSubtask($id: ID!) {
    getSubtask(id: $id) {
      id
      title
      inprogress
      createdAt
      updatedAt
    }
  }
`;
export const listSubtasks = /* GraphQL */ `
  query ListSubtasks(
    $filter: ModelSubtaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubtasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        inprogress
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      name
      color
      subtasks
      createdAt
      updatedAt
    }
  }
`;
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        color
        subtasks
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInvitation = /* GraphQL */ `
  query GetInvitation($id: ID!) {
    getInvitation(id: $id) {
      id
      propertyID
      leaseTerm
      leaseStart
      rentAmount
      createdAt
      updatedAt
    }
  }
`;
export const listInvitations = /* GraphQL */ `
  query ListInvitations(
    $filter: ModelInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvitations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        propertyID
        leaseTerm
        leaseStart
        rentAmount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTenant = /* GraphQL */ `
  query GetTenant($id: ID!) {
    getTenant(id: $id) {
      id
      name
      invitations
      accepted
      createdAt
      updatedAt
    }
  }
`;
export const listTenants = /* GraphQL */ `
  query ListTenants(
    $filter: ModelTenantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTenants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        invitations
        accepted
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProperty = /* GraphQL */ `
  query GetProperty($id: ID!) {
    getProperty(id: $id) {
      id
      address
      number
      houseNumber
      streetName
      city
      province
      country
      issues
      tasks
      tenants
      landlord
      createdAt
      updatedAt
    }
  }
`;
export const listProperties = /* GraphQL */ `
  query ListProperties(
    $filter: ModelPropertyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProperties(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        address
        number
        houseNumber
        streetName
        city
        province
        country
        issues
        tasks
        tenants
        landlord
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
