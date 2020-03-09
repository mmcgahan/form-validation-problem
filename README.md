# [Form validation problem](https://springload.github.io/form-validation-problem/)

## Setup

1. Install dependendencies

   ```sh
   $ npm i
   ```

2. Test src

   ```sh
   $ npx jest
   ```

2. Build assets
   
   ```sh
   $ npm run build
   ```

3. Start dev server

   ```sh
   $ npx static-server
   ```

4. navigate to http://localhost:9080

## Considerations

### a11y

I would far prefer to use server-side rendered HTML for this app, but setting
up the backend for that is beyond the scope of (and time allotted for) this
task. A GatsbyJS solution would be excellent, although other dynamic SSR solutions
are also available.

A receiving backend that matched the FE validation logic would be ideal - errors
can be passed in on initial render using `props.errors`.

### Progressive enhancement

Again, rendering the whole form server-side and hydrating state from React would
make the form work better across environments, but would require a fair amount
of redundant validation work on the server's POST endpoint.

As-you-type validation is a relatively simple addition (particularly with the
use of a `didTouch` boolean for each field), but I wanted to stay within time
recommendations - this would be a progressive enhancement that would activate when
the client app bundle was downloaded, but the form would rely on server-side
validation in the `noscript` state.

### Browser compatibility

Setting up the `@babel/preset-env` build rule is a quick and easy way to have
reasonably high confidence that the final bundle will work in target browsers.
Its default set of target browsers is reasonably broad, but can be tuned to whatever
a particular app needs to support.

### Testing

I've set up a simple demo of Jest unit testing, although I've avoided adding the
libraries and config needed to do 'deep' testing of the React components themselves.
I prefer unit testing the handlers and setting up end to end tests that can
be run locally and as part of a CI/CD workflow for user interactions.

### Tooling: Why set up a build pipeline?

This problem could definitely be solved without using a bundler (e.g. Webpack),
but as a demonstration of how I would like to build production applications,
separating dependencies into modules and using a simple build pipeline communicates
intent and experience a little better. There is always a balance to be struck
between over-engineering these things in order to demonstrate skillset and using
the simplest MVP approach in order to match requirements.

<hr />

We've created this problem to evaluate how developers tackle a real-world problem. If you've been assigned this problem you should spend around **2 hours** working on it. The last thing we want you to do is toil away for days on end!

If you've stumbled across this and want to work at [Springload](https://www.springload.co.nz/) feel free to submit it too. We're always on the lookout for skilled developers.

## Problem definition

Included in this repository is an [index.html](index.html) file that contains a form. You must ensure all of the following rules are met before the form is posted to the (in this case imaginary) server:

* `Email` must be a valid email address.
* `Password` must be longer than 8 characters.
* `Colour` must be selected.
* At least two `Animal`s must be chosen.
* If `Tiger` is one of the chosen `Animal`s then `Type of tiger` is required to be a non-empty string.

## Other requirements

If the form is submitted and an error occurs, the error element's parent should have a CSS `error` class added to it.

```html
<p class="error">
    <label for="field"></label>
    <input id="field" type="text" value="foo">
</p>
```

Please write a little bit about the technology you chose and why, including any limitations or possibilities of this approach.

## The cherry on the cake

Beyond the problem statement, show us the consideration you have given to some or all of the following:

- Documentation
- Accessibility
- Progressive enhancement
- Browser support
- Testing
- Tooling

## Submission

Please email us a link to your fork of this repository, or a zip of your solution to `1337h4x0r@springload.co.nz`.
