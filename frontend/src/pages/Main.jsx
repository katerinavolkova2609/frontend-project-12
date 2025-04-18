const Main = () => {
  return (
        <div class="d-flex flex-column vh-100" id="chat">
          <nav class="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div class="container">
              <a class="navbar-brand" href="/">
                Hexlet Chat
              </a>
              <button type="button" class="btn btn-primary">
                Выйти
              </button>
            </div>
          </nav>
          <div class="container h-100 my-4 overflow-hidden rounded shadow">
            <div class="row h-100 bg-white flex-md-row">
              <div class="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                <div class="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                  <b>Каналы</b>
                  <button
                    type="button"
                    class="p-0 text-primary btn btn-group-vertical"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                    </svg>
                    <span class="visually-hidden">+</span>
                  </button>
                </div>
                <ul
                  id="channels-box"
                  class="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
                >
                  <li class="nav-item w-100">
                    <button
                      type="button"
                      class="w-100 rounded-0 text-start btn btn-secondary"
                    >
                      <span class="me-1">#</span>
                      general
                    </button>
                  </li>
                  <li class="nav-item w-100">
                    <button
                      type="button"
                      class="w-100 rounded-0 text-start btn"
                    >
                      <span class="me-1">#</span>
                      random
                    </button>
                  </li>
                </ul>
              </div>
              <div class="col p-0 h-100">
                <div class="d-flex flex-column h-100">
                  <div class="bg-light mb-4 p-3 shadow-sm small">
                    <p class="m-0">
                      <b># general</b>
                    </p>
                    <span class="text-muted">0 сообщений</span>
                  </div>
                  <div
                    id="messages-box"
                    class="chat-messages overflow-auto px-5 "
                  ></div>
                  <div class="mt-auto px-5 py-3">
                    <form novalidate="" class="py-1 border rounded-2">
                      <div class="input-group has-validation">
                        <input
                          name="body"
                          aria-label="Новое сообщение"
                          placeholder="Введите сообщение..."
                          class="border-0 p-0 ps-2 form-control"
                          value=""
                        />
                        <button
                          type="submit"
                          disabled=""
                          class="btn btn-group-vertical"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width="20"
                            height="20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                            ></path>
                          </svg>
                          <span class="visually-hidden">Отправить</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div class="Toastify"></div>
    </div>
  );
};

export { Main };
