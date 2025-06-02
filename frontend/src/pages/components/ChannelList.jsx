const ChannelList = ({ channels, selectedChannelId, onSelect }) => {
  console.log(channels);
  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          {/* {onSelect && <div role='group' className='d-flex dropdown btn-group'></div>} */}
          <button
            onClick={() => onSelect(channel)}
            type="button"
            className={`w-100 rounded-0 text-start btn${
              selectedChannelId === channel.id ? ' btn-secondary' : ''
            }`}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
