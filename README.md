# Built with PostgreSQL, Express, and React

End-to-end React app backed by an Express API server, persisting data to
PostgreSQL database.

<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/tabbykatz/game-night/README.md">
    <img src="app/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Game Night</h3>

  <p align="center">An app for boardgame enthusiasts who attend in-person gaming meetups
    
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/tabbykatz/game-night/issues">Report Bug</a>
    ·
    <a href="https://github.com/tabbykatz/game-night/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

[![Game Night Screen Shot][product-screenshot]](https://example.com)

This is my capstone project for my study with Techtonica.

Why?

- I was challenged to build a PERN stack app harnessing at least one external API.
- I love board games!
- I learn best while doing.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/en/)
- [React.js](https://reactjs.org/)
- [postgreSQL](https://www.postgresql.org/)
- [express](https://expressjs.com/)
- [Sass](https://sass-lang.com/)
- [Docker][docker-url]
- [Heroku](https://heroku.com)

<p align="right">(<a href="#top">back to top</a>)</p>

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
4. Copy the example environment file

   ```sh
   cp .env.example .env
   ```

5. Initialize the Database

Let's set up the database server, create the application database, and seed it
with some data. You only need to do this the first time you set up your
development environment.

```sh
npm run db:init
```

//TODO: make sure I have all the steps in here

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage

_This will be an area to show the flow of using the app_

<p align="right">(<a href="#top">back to top</a>)</p>

## Roadmap

- [ ] Email invites to friends
- [ ] Unified accounts with Auth0
- [ ] Add events to calendar
- [ ] Event chat
- [ ] Light and Dark Modes

See the [open issues](https://github.com/tabbykatz/game-night/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Tabitha O'Melay - [@tabby\_\_katz](https://twitter.com/tabby__katz) - tomelay@gmail.com

Game Night: [https://github.com/tabbykatz/game-night](https://github.com/tabbykatz/game-night)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [PERN Project Template](https://github.com/gsong/express-react-project-starter)
- [Josh W. Comeau](https://www.joshwcomeau.com/)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>

[contributors-shield]: https://img.shields.io/github/contributors/tabbykatz/game-night.svg?
[contributors-url]: https://github.com/tabbykatz/game-night/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tabbykatz/game-night.svg?
[forks-url]: https://github.com/tabbykatz/game-night/network/members
[stars-shield]: https://img.shields.io/github/stars/tabbykatz/game-night.svg?
[stars-url]: https://github.com/tabbykatz/game-night/stargazers
[issues-shield]: https://img.shields.io/github/issues/tabbykatz/game-night.svg?
[issues-url]: https://github.com/tabbykatz/game-night/issues
[license-shield]: https://img.shields.io/github/license/tabbykatz/game-night.svg?
[license-url]: https://github.com/tabbykatz/game-night/blob/main/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/tabithaomelay
[product-screenshot]: app/public/logo.png
[homebrew-url]: https://brew.sh/
[docker-url]: https://docker.com/
[nvm-url]: https://github.com/nvm-sh/nvm
