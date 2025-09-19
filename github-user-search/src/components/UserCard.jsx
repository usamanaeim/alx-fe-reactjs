import React from 'react';

export default function UserCard({ user }) {
  if (!user) return null;
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      border: '1px solid #ddd', padding: 12, borderRadius: 8, marginBottom: 10
    }}>
      <img src={user.avatar_url} alt="avatar" style={{ width: 64, height: 64, borderRadius: 8 }} />
      <div>
        <a href={user.html_url} target="_blank" rel="noreferrer" style={{ fontWeight: 700, textDecoration: 'none' }}>
          {user.login}
        </a>
        <div style={{ fontSize: 13, color: '#555' }}>{user.type}</div>
      </div>
    </div>
  );
}
