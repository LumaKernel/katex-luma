import { assertSnapshot } from "@std/testing/snapshot";
import { katexLumaRenderToString } from "./mod.ts";

Deno.test({
  name: "katexLumaRenderToStringTest simple",
  async fn(t) {
    await assertSnapshot(t, katexLumaRenderToString(String.raw`\tau_1`));
  },
  permissions: {
    read: ["__snapshots__"],
    write: ["__snapshots__"],
  },
});

Deno.test({
  name: "katexLumaRenderToStringTest html",
  async fn(t) {
    await assertSnapshot(
      t,
      katexLumaRenderToString(
        String.raw`\gdef\load#1{\htmlData{load=#1}{}}\load{hello}`,
        {
          strict: false,
          trust: true,
        },
      ),
    );
  },
  permissions: {
    read: ["__snapshots__"],
    write: ["__snapshots__"],
  },
});
