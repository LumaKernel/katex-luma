import { assertSnapshot } from "@std/testing/snapshot";
import { katexLumaRenderToString } from "./main.ts";

Deno.test({
  name: "katexLumaRenderToStringTest",
  async fn(t) {
    await assertSnapshot(t, katexLumaRenderToString(String.raw`\tau_1`));
  },
  permissions: {
    read: true,
    write: ["__snapshots__"],
  },
});
