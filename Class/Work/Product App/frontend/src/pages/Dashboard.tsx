import React from 'react';
import { useUser } from '@/context/UserContext';

export default function Dashboard() {
  const { user, products } = useUser()!;

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>User Information</h2>
      {user ? (
        <div>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>No user information available</p>
      )}

      <h2>Product List</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>No products available</p>
      )}
    </div>
  )
}
