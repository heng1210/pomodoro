#![cfg_attr(not(any(feature = "custom-protocol")), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_notification::init())
        .setup(|app| {
            // 窗口关闭时隐藏到托盘
            let window = app.get_webview_window("main").unwrap();
            window.on_window_event(|event| {
                if let tauri::WindowEvent::CloseRequested { api, .. } = event {
                    api.prevent_close();
                    // 隐藏窗口
                }
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("运行错误");
}
