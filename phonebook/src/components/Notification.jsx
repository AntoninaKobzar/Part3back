const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  let className = 'message';
  if (type === 'success') {
    className += ' success'; 
  } else if (type === 'error') {
    className += ' error'; 
  }

  return (
    <div className={className}>
      {message}
    </div>
  );
};
  export default Notification