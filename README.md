# new-or-ui

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

```
yarn run test:unit
```

### Serve story book

```
yarn run storybook:serve
```

### Create a symlink to test locally in app

```
yarn link
```

### Upgrade package version

```
yarn version
```

### Push a single tag

```
git push origin {tagName}
```

### Changes workflow
# 1 - Commit your changes without the dist folder
# 2 - Rebase your branch with master
# 3 - Upgrade the library package version (push version commit & tag)
# 4 - Upgrade the version of the library used in IRIS (or another repository) in package.json to use the new tag
