<div align="center">
  <a href="https://github.com/tabbykatz/game-night/README.md">
    <img src="app/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h1 align="center">Game Night</h1>

  <p align="center">An app for boardgame enthusiasts who attend in-person gaming meetups.</p>
  <a href="https://gameknightapp.herokuapp.com/">View Demo</a> - <a href="https://github.com/tabbykatz/game-night/issues">Report Bug</a> - <a href="https://github.com/tabbykatz/game-night/issues">Request Feature</a>

  </div>

## About The Project

[![Game Night Screen Shot][app-screenshot]](https://gameknightapp.herokuapp.com/)

This is my capstone project for my study with Techtonica.

Why?

- I was challenged to build a PERN stack app harnessing at least one external API.
- I love board games!
- I learn best while doing.

### Built With

- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/)
- [postgreSQL](https://www.postgresql.org/)
- [express](https://expressjs.com/)
- [Sass](https://sass-lang.com/)
- [Docker][docker-url]
- [Heroku](https://heroku.com)

## Getting Started

### Prerequisites

#### Docker

This project relies on Docker to run the PostgreSQL server. You must install
Docker first before continuing.

Use one of these methods:

- Use [Homebrew][homebrew-url] on macOS: `brew install --cask docker`
- [Follow the instructions on the Docker website][docker-url]

Once you've installed Docker Desktop, you'll need to launch the app. On macOS,
it's located in `/Applications/Docker`.

#### Node and npm

You'll need to install Node v16 and npm v8 or above. [`nvm`][nvm-url] is highly
recommended.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://www.boardgameatlas.com/api/docs](https://www.boardgameatlas.com/api/docs)
2. Clone the repo
   ```sh
   git clone https://github.com/tabbykatz/game-night.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Copy the example environment files. You will need to configure Auth0 and use your own values.

   ```sh
   cp .env.example .env
   ```

   ```sh
   cd app
   cp .env.example .env
   ```

5. Initialize the database.

   ```sh
   npm run db:init
   ```

6. Run

   ```sh
   npm start
   ```

## Roadmap

- [ ] Email invites to friends
- [ ] Unified accounts with Auth0
- [ ] Add events to calendar
- [ ] Event chat
- [ ] Light and Dark Modes

See the [open issues](https://github.com/tabbykatz/game-night/issues) for a full list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this app better, please fork the repo and create a pull request. You can also simply open an issue with the label "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## Contact

Tabitha O'Melay - [@tabby\_\_katz](https://twitter.com/tabby__katz) - tomelay@gmail.com

Game Night: [Game Night on Heroku](https://gameknightapp.herokuapp.com/)

## Acknowledgments

- [PERN Project Template](https://github.com/gsong/express-react-project-starter)
- [Josh W. Comeau](https://www.joshwcomeau.com/)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
   <td align="center"><a href="https://www.tabbykatz.com/"><img src="https://avatars.githubusercontent.com/u/55110763?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tabitha O'Melay</b></sub></a><br />
   <a href="https://github.com/tabbykatz/game-night/commits?author=tabbykatz" title="Code">💻</a>
   <a href="https://github.com/tabbykatz/game-night/commits?author=tabbykatz" title="Content">🖋</a>
   <a href="https://github.com/tabbykatz/game-night/commits?author=tabbykatz" title="Design">🎨</a>
   <a href="https://github.com/tabbykatz/game-night/commits?author=tabbykatz" title="Documentation">📖</a>
   <a href="https://github.com/tabbykatz/game-night/commits?author=tabbykatz" title="Ideas">🤔</a>
   <a href="https://github.com/tabbykatz/game-night/issues/created_by/tabbykatz" title="Bug Reports">🐛</a>
   <a href="https://github.com/tabbykatz/game-night/commits?author=tabbykatz" title="Test">⚠️</a> </td> 
  <td align="center"><a href="https://github.com/gsong"><img src="https://avatars.githubusercontent.com/u/607420?v=4?s=100" width="100px;" alt=""/><br /><sub><b>George Song</b></sub></a><br /><a href="https://github.com/tabbykatz/game-night/commits?author=gsong" title="Code">💻</a> <a href="https://github.com/tabbykatz/game-night/pulls?q=%40gsong" title="Review">👀</a><a href="https://github.com/tabbykatz/game-night/commits?author=gsong" title="Bug Reports">🐛</a> <a href="#infra-gsong" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-gsong" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[app-screenshot]: app/public/game_collection_desktop.png
[homebrew-url]: https://brew.sh/
[docker-url]: https://docker.com/
[nvm-url]: https://github.com/nvm-sh/nvm
