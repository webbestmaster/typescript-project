// wasm-pack build -t web --out-dir "./my-web-asm" --release

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{window, CustomEvent};

// функция, доступная из JavaScript
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn remove(a: i32, b: i32) -> i32 {
    a - b
}

#[wasm_bindgen]
pub fn start() -> Result<(), JsValue> {
    let window = window().unwrap();
    let document = window.document().unwrap();

    // СЛУШАЕМ событие
    let listener = Closure::<dyn FnMut(_)>::new(move |event: web_sys::Event| {
        web_sys::console::log_1(&"Получено событие из JS".into());
        web_sys::console::log_1(&event.type_().into());
    });

    document.add_event_listener_with_callback(
        "my-rust-event",
        listener.as_ref().unchecked_ref(),
    )?;

    listener.forget(); // чтобы не был удалён GC

    // ОТПРАВЛЯЕМ событие
    let custom_event = CustomEvent::new("my-rust-event")?;
    document.dispatch_event(&custom_event)?;

    Ok(())
}