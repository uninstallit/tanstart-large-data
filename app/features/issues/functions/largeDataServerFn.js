import { createServerFn } from "@tanstack/start";

const largeDataServerFn = createServerFn().handler(async ({ data }) => {
  console.log("\n\n data length: ", data.length);
});

export { largeDataServerFn };
