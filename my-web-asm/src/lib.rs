// wasm-pack build -t web --out-dir "./my-web-asm" --release
use std::{thread, time};
use std::cell::RefCell;
use std::rc::Rc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{CustomEvent};

// функция, доступная из JavaScript
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn remove(a: i32, b: i32) -> i32 {
    a - b
}

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn request_animation_frame(f: &Closure<dyn FnMut()>) {
    window()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK");
}

#[wasm_bindgen]
pub fn start() -> Result<(), JsValue> {
    let window = window();
    let document = window.document().unwrap();

    // СЛУШАЕМ событие
    let listener = Closure::<dyn FnMut(_)>::new(move |event: web_sys::Event| {
        web_sys::console::log_1(&"Получено событие из JS1".into());
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


    let delay = time::Duration::from_secs(3);


    let f = Rc::new(RefCell::new(None));
    let g = f.clone();

    let mut i = 0;
    *g.borrow_mut() = Some(Closure::new(move || {
        if i > 300 {
            // body().set_text_content(Some("All done!"));

            // Drop our handle to this closure so that it will get cleaned
            // up once we return.
            let _ = f.borrow_mut().take();
            return;
        }

        let custom_event = CustomEvent::new("my-rust-event").unwrap();
        document.dispatch_event(&custom_event);
        // Set the body's text content to how many times this
        // requestAnimationFrame callback has fired.
        i += 1;
        // let text = format!("requestAnimationFrame has been called {} times.", i);
        // body().set_text_content(Some(&text));

        // Schedule ourself for another requestAnimationFrame callback.
        request_animation_frame(f.borrow().as_ref().unwrap());
    }));

    request_animation_frame(g.borrow().as_ref().unwrap());

/*    loop{

        let custom_event = CustomEvent::new("my-rust-event")?;
        document.dispatch_event(&custom_event)?;

        thread::sleep(delay);
    }
*/    Ok(())
}
