const UserProfile = (props) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '16px',
        margin: '16px auto',
        maxWidth: '420px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        backgroundColor: '#fff',
      }}
    >
      <h2 style={{ color: 'royalblue', margin: '0 0 8px' }}>{props.name}</h2>
      <p style={{ margin: '4px 0' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ margin: '4px 0', color: '#444' }}>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
