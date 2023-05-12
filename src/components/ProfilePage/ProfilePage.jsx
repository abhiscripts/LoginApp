

export const ProfilePage = () => {
  return <div>{`Hello ${localStorage.getItem("user")}`}</div>;
};
