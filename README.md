# Create React App Chrome Extension
Turn your shiny new `create-react-app` into a chrome extension.

## Installation
The preferred method is using `npx`, which ships with npm 5.2+. In your new react app directory, run `npx create-react-app-chrome-extension`. This will add all of the relevant files.

If you don't have `npx`, you can run

```bash
yarn add -D create-react-app-chrome-extension
./node_modules/.bin/create-react-app-chrome-extension
yarn remove create-react-app-chrome-extension
```

## Adding to Chrome
Go to `chrome://extensions`, and on the upper right toggle developer mode on. Run `yarn build` to create your bundle, and then drop the entire `build` folder onto the extensions page. And you're done!

## Options
* `--public=<dirname>` - the public directory where to place `background.js`, `entry.js`, and where the `manifest.json` is located.

## Issues
Feel free to open issues or future features you would like to see added! Even better is an issue submitted with a PR. See the [Contributing](#Contributing) section for more details.

## Contributing
I would love more help on future features. Check out [CONTRIBUTING.md](CONTRIBUTING.md) for more information!

## Acknowledgements
Many thanks to the authors and maintainers of `create-react-app` for making such a useful tool.

## License
MIT
