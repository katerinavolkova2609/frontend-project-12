import React from 'react';

const ChannelList = ({ channels, selectedChannelId, onSelect }) => (
  <ul
    id="channels-box"
    className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
  >
    {channels.map((channel) => (
      <li key={channel.id} className="nav-item w-100">
        <button
          onClick={() => onSelect(channel)}
          type="button"
          className={`w-100 rounded-0 text-start ${selectedChannelId === channel.id ? 'btn-secondary' : 'btn'}`}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    ))}
  </ul>
);

export default ChannelList;