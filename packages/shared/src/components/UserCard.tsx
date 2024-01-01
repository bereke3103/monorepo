const UserCard = ({ username }: { username?: string }) => {
  return (
    <div style={{ border: '1px solid green', padding: '20px' }}>
      <div> username: {username ?? 'not user'}</div>
      <div>password: 222</div>
    </div>
  );
};

export default UserCard;
