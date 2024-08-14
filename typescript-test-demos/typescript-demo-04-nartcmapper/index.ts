import { createMapper, createMap, forMember, mapFrom } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';

interface NestedUser {
  name: string;
  address: {
    street: string;
    city: string;
  };
}

interface FlatUser {
  'name': string;
  'address.street': string;
  'address.city': string;
}

const nestedUser: NestedUser = {
  name: 'John',
  address: {
    street: '123 Main St',
    city: 'New York'
  }
};

const mapper = createMapper({
    strategyInitializer: pojos()
  });

PojosMetadataMap.create<NestedUser>('SomeTokenForNestedUser', {
    name: String,
    address: ... //
});

PojosMetadataMap.create<UserDto>('SomeTokenForUserDto', {
  firstName: String,
  lastName: String,
  fullName: String
});