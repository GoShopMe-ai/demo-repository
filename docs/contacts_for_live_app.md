# Add Friends / Choose Contacts — Demo vs Live App

## Why the web demo is limited

- **Browsers:** The only standard web API for “choose from device contacts” is the **Contact Picker API**. It is supported only in **Chrome on Android** (and only over HTTPS).  
- **iOS Safari, Firefox, Opera, Edge, etc.** do **not** support this API. So in a normal browser or “add to home screen” PWA, the app **cannot** open the device contact list on iPhones or most desktop browsers.

So: **PWA alone does not solve contact access on iOS.** A PWA is still a browser tab; it has the same web APIs. There is no way today to get “choose from device contacts” on iOS from pure web/PWA.

## What the demo does today

- **All platforms:** We show the same button: **“Choose contacts to add”**.
- **Chrome on Android (HTTPS):** Tapping it opens the **native contact picker** (Contact Picker API). User selects contacts; they are added to the list.
- **iOS, Safari, Firefox, Opera, Edge, etc.:** Tapping it opens a **manual “Add by name and number”** form. User types name and phone; we add that contact to the list. So invite/add-friend is still usable on iPhone and all other browsers, just without a device contact picker.

## How the live app can support contacts on iOS and all browsers

To have **“Choose contacts to add”** open the **real device contact list on both iOS and Android**, the app must run inside a **native wrapper** that can call the OS contact picker, not only inside a browser.

### Recommended: wrap as a native app (e.g. Capacitor)

1. **Wrap the existing web app** with **Capacitor** (or Cordova, etc.) so you ship an iOS app and an Android app that load your current HTML/JS.
2. **Add a contacts plugin** that exposes the native contact picker to JavaScript, for example:
   - **Capacitor:** e.g. `@capacitor-community/contacts` or a custom plugin that calls iOS `CNContactPickerViewController` and Android’s contact picker.
3. **In your JS (e.g. `add-friend-contacts.js`):**
   - **If running inside the native wrapper:** when the user taps “Choose contacts to add”, call the **plugin** (e.g. `Contacts.pick()`) and use the returned contacts to update the list.
   - **If running in the browser (PWA / shared link):** keep current behavior: Contact Picker API on Chrome Android, manual “Add by name and number” on iOS and other browsers.

Result:

- **Live app (native wrapper):** “Choose contacts to add” uses the **native contact picker on both iOS and Android**.
- **PWA / browser:** Same UX as the demo: native picker only where the web API exists; elsewhere, manual entry.

### Summary

| Context              | iOS / Safari / Firefox / Opera / Edge | Android Chrome (HTTPS)   |
|----------------------|----------------------------------------|---------------------------|
| **Demo (web/PWA)**   | Manual “Add by name and number”       | Native contact picker     |
| **Live app (wrapped)** | Native contact picker (via plugin)  | Native contact picker     |

So: **wrapping the app for iOS and Android (e.g. as a Capacitor app) and using a contacts plugin is what makes “choose from device contacts” available on iPhones and all target browsers in the live app.** PWA alone does not enable it on iOS; the native wrapper does.
