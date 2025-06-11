import { useState, useRef, useCallback } from 'react';
import useClickOutside from '../utils/useClickOutside.jsx';
import { useTranslation } from 'react-i18next';
import {clean} from 'leo-profanity';

const ChannelList = ({
  channels,
  selectedChannelId,
  onSelect,
  openDeleteModal,
  openEditModal,
}) => {
  const [openMenuChannelId, setOpenMenuChannelId] = useState();
  const dropdounRef = useRef(null);
  const { t } = useTranslation();

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
              ref={openMenuChannelId === channel.id ? dropdounRef : null}
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
                <span className="me-1">#</span>
                {clean(channel.name)}
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
                <span className="visually-hidden">{t('controlChannel')}</span>
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
                    onClick={(e) => {
                      e.preventDefault();
                      openDeleteModal(channel.id);
                    }}
                    data-rr-ui-dropdown-item=""
                    className="dropdown-item"
                    role="button"
                    tabindex="0"
                    href="#"
                  >
                    {t('delete')}
                  </a>
                  <a
                     onClick={(e) => {
                      e.preventDefault();
                      openEditModal(channel.id);
                    }}
                    data-rr-ui-dropdown-item=""
                    className="dropdown-item"
                    role="button"
                    tabindex="0"
                    href="#"
                  >
                    {t('rename')}
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
              {clean(channel.name)}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ChannelList;
