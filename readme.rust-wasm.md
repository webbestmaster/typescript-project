# DRAFT - need better idea to do it

# RUST-WASM _inline_ front-end

1 - build the wasm for web
```bash
$ wasm-pack build -t web  --release
```

2 - add the pkg to `node_modules`, just copy folder and rename

3 - run code, example
```typescript
import initWasm, {get_available_move_path_list} from "rust-wasm";
import wasmData from "rust-wasm/rust_wasm_bg.wasm";

console.warn(initWasm);
console.warn(wasmData);

(async () => {
    const res = await initWasm(wasmData);

    console.warn(res);

    // this function will work after initalisation only
    console.warn(get_available_move_path_list(0, 0, 2, [1, 2, 3, 4, 5].join(","), 2));
})();
```
