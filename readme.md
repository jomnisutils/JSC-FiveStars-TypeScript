# FiveStarsTS

TypeScript adaptation of the Omnis FiveStars tutorial

## How to use it

0. Follow the Omnis FiveStars tutorial ([https://developer.omnis.net/technotes/tnjc0009.jsp](https://developer.omnis.net/technotes/tnjc0009.jsp))
1. Download the files from the repos, install the dependencies and build the component

```
$ npm install
$ npm run build
```

2. Copy the file `ctl_omnis_fivestars.js` and `./dist/fivestars.umd.js` to `<Omnis>/html/scripts/`
3. Update the `jsctempl.html` to include `fivestars.umd.js` before the `ctl_net_omnis_fivestars.js`:

```html
<!-- Omnis Studio JavaScript client scripts -->
<script type="text/javascript" src="scripts/ssz.js"></script>
<script type="text/javascript" src="scripts/omjsclnt.js"></script>
<script type="text/javascript" src="scripts/omjqclnt.js"></script>
<link type="text/css" href="css/rating.css" rel="stylesheet" />
<script type="text/javascript" src="scripts/rating.js"></script>

<!--bundled/compiled TS component -->
<script type="text/javascript" src="scripts/fivestars.umd.js"></script>

<script type="text/javascript" src="scripts/ctl_net_omnis_fivestar.js"></script>
```

4. Test the tutorial Form
