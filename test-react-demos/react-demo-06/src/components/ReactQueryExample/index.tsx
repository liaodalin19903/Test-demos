import React from 'react'


import { useProfile } from './hooks'

export function UserProfileExample() {
  const { data, isLoading, error } = useProfile()
  
  if (isLoading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div>Error fetching user data: {error.message}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {data.name}</p>
      <p>Email: {data.email}</p>
    </div>
  );
}