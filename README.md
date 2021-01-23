# Image Tunneler

This is a very barebones implementation of a CORS proxy that also attempts to pass the correct referrer information to bypass server-side restrictions to hotlinking.

To use this, simply append an image's direct URL to the end of `https://img-referrer-tunnel.herokuapp.com/`, so for example, `https://img-referrer-tunnel.herokuapp.com/https://i.imgur.com/RbnS7Ba.jpeg`.

If the origin server is rejecting the response, try playing with the `host` query parameter. For example, `https://img-referrer-tunnel.herokuapp.com/https://i.imgur.com/RbnS7Ba.jpeg?host=imgur.com`.

## Known Mappings

In order to skip the host parameter requirement, known domains are mapped to the host the server expects. Currently known mappings are stored in [mapping.json](./mapping.json).

## Testing

Every URL in [endpoints.json](./test/endpoints.json) will be tested against the proxy to verify that the proxy successfully loads.

## Contributions

If you'd like to add an additional mapping, feel free to open a PR. Please also add a test for the domain if you do so.
