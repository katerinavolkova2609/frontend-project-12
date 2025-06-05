import { useState, useRef, useCallback } from 'react';
import useClickOutside from '../utils/useClickOutside.jsx';
import { removeChannel } from '../api.js';

const ChannelList = ({
  channels,
  selectedChannelId,
  onSelect,
  token,
  onRemove,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [openMenuChannelId, setOpenMenuChannelId] = useState();
  const dropdounRef = useRef(null);

  const toggleMenu = useCallback((channelId) => {
    setOpenMenuChannelId((prev) => (prev === channelId ? null : channelId));
  }, []);

  useClickOutside(dropdounRef, toggleMenu);

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels.map((channel) => (
        <li key={channel.id} className="nav-item w-100">
          {channel.removable ? (
            <div
              ref={dropdounRef}
              role="group"
              className={`d-flex dropdown btn-group ${
                openMenuChannelId === channel.id && 'show'
              }`}
            >
              <button
                onClick={() => onSelect(channel)}
                type="button"
                className={`w-100 rounded-0 text-start text-truncate btn ${
                  selectedChannelId === channel.id ? ' btn-secondary' : ''
                }`}
              >
                <span class="me-1">#</span>
                {channel.name}
              </button>
              <button
                onClick={() => toggleMenu(channel.id)}
                aria-expanded={openMenuChannelId === channel.id}
                type="button"
                id="react-aria5336511287-:r0:"
                className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${
                  openMenuChannelId === channel.id && ' show'
                }${selectedChannelId === channel.id ? ' btn-secondary' : ''}`}
              >
                <span class="visually-hidden">Управление каналом</span>
              </button>
              {openMenuChannelId === channel.id && (
                <div
                  x-placement="bottom-start"
                  aria-labelledby="react-aria2809273870-:r1:"
                  className="dropdown-menu show"
                  data-popper-reference-hidden="false"
                  data-popper-escaped="false"
                  data-popper-placement="bottom-start"
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    transform: 'translate3d(-8px, 40px, 0px',
                  }}
                >
                  <a
                    onClick={async () => await onRemove(token, channel.id)}
                    data-rr-ui-dropdown-item=""
                    className="dropdown-item"
                    role="button"
                    tabindex="0"
                    href="#"
                  >
                    Удалить
                  </a>
                  <a
                    data-rr-ui-dropdown-item=""
                    className="dropdown-item"
                    role="button"
                    tabindex="0"
                    href="#"
                  >
                    Переименовать
                  </a>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onSelect(channel)}
              type="button"
              className={`w-100 rounded-0 text-start btn ${
                selectedChannelId === channel.id ? ' btn-secondary' : ''
              }`}
            >
              <span className="me-1">#</span>
              {channel.name}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
