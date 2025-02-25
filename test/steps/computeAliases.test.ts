import { computeAliases } from "~/steps/computeAliases";

describe("steps/computeAliases", () => {
  it("computes aliases correctly", () => {
    const aliases = computeAliases(".", {
      compilerOptions: {
        paths: {
          "~/*": ["./src/*", "./root/*"],
          "@app": ["./src/app/*"],
        },
      },
    });

    expect(aliases).toHaveLength(2);
    expect(aliases[0].prefix).toEqual("~/");
    expect(aliases[1].prefix).toEqual("@app");

    const cwd = process.cwd();
    expect(aliases[0].aliasPaths).toEqual([`${cwd}/src`, `${cwd}/root`]);
    expect(aliases[1].aliasPaths).toEqual([`${cwd}/src/app`]);
  });
});
