<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://i.imgur.com/qJfD1cr.png">
    <img src="https://i.imgur.com/qJfD1cr.png" alt="Logo" height="120">
  </a>

  <h2 align="center">Strackify</h2>

  <p align="center">
    An app that links books to playlists
</a>

![Alt Text](https://i.imgur.com/CWYlqfD.gif)
    <br />
    <br />
    <a href="https://strackify.com">Google Play</a>
    ·
    <a href="https://github.com/juniorklawa/strackify-app-public/issues">Report Bug</a>
    ·
    <a href="https://github.com/juniorklawa/DoggoBot/strackify-app-public">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
 * [Built With](#built-with)
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project


Strackify is an App for those who like to read to the sound of a playlist or soundtrack. With it you can search, bookmark and create playlists that match the book you are currently reading

### Built With
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [React Native](https://reactnative.dev/)
* [Firebase](https://firebase.google.com/)
* [Express](https://expressjs.com/)
* [Google Books](https://books.google.com.br/)


<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Clone the repo
```sh
git clone https://github.com/juniorklawa/strackify-app-public.git
```
3. Install packages
```sh
yarn or npm install
```
4. Enter your Spotify credentials in `env_config` file
```JS
  SPOTIFY_API: 'https://api.spotify.com/v1',
  SPOTIFY_CLIENT_ID: 'YOUR ID',
  SPOTIFY_REDIRECT_URL: 'YOUR REDIRECT URL',
  SPOTIFY_TOKEN_REFRESH_URL: 'YOUR TOKEN REFRESH',
  SPOTIFY_TOKEN_SWAP_URL: 'YOUR SWAP URL',
```
5. Add your firebase project `google_services.json` in `android/app` folder

6. Add your keystore `SHA1 signature` and `package name` in Spotify Developer dashboard

5. Run 
```JS
react-native run-android
```

<!-- ROADMAP -->
## Known issues

 - Pagination

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Everaldo Junior - [Linkedin](https://www.linkedin.com/in/everaldojuniorklawa/)
