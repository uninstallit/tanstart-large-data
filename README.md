### Get started

Required node 18+

`pnpm install` \
`pnpm run dev`

In the `useLargeDataHook` file:

- When count = 3000, <span style="color:red">Access failed - CORS Error</span>
- When count = 100, <span style="color:red">ERR_CONNECTION_RESET 431 (Request Header Fields Too Large)</span>
