#### 10/08/2019 - 13/08/2019

- Added new **Property** **`ServiceWorkerUpdateAlertText`** - used to change the default text in the "Update available alert".
- Added new **Property** **`ServiceWorkerRegisterUpdateType`** - used to select the "Update available alert" type.
- Added new **Property** **`ServiceWorkerRegisterUpdateTemplate`** - The name of the template file for the "update available" event.
- Added new **Property** **`ServiceWorkerRegisterInstallableType`** - used to select the "Installable PWA alert" type.
- Added new **Property** **`ServiceWorkerRegisterInstallableTemplate`** - The name of the template file for the "Installable PWA alert" event.
- Added new **Property** **`ServiceWorkerRegisterBeforeInstallPromptType`** - used to select the "Before Install Prompt" type.
- Added new **Property** **`ServiceWorkerRegisterBeforeInstallPromptTemplate`** - The name of the template file for the "Before Install Prompt" event.
- Moved the "Update available alert" to it's own template so we can have alternates
- Moved the "Installable PWA alert" to it's own template so we can have alternates
- Moved the "Before Install Prompt" to it's own template so we can have alternates
- Tidied up default install alert a bit
- Added new Installable PWA Alert type - "installable-blazor" which will call a Blazor static method, which is defined  by:
  - **`ServiceWorkerBlazorAssembly`** which is used to define the Blazor Assembly namespace - defaults to the project name
  - **`ServiceWorkerBlazorInstallMethod`** which is used to define the Blazor method to call - defaults to 'PWAInstallable'
- Updated README with Blazor interop example.

#### 08/08/2019 Initial Release