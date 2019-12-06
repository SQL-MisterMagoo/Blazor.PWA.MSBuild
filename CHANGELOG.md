#### 06/12/2019

- PR #5 from @chucker merged with these changes
- Bug: **Property** **`ManifestBaseUrl`** - used to specify the base Url in the manifest.json was not being used in the index `<head>` link for **manifest.json**
- Bug: **Property** **`ServiceWorkerBaseUrl`** - used to specify the base Url in the ServiceWorker was not being used in the _required files_ list.
- Bug: **Property** **`ServiceWorkerBaseUrl`** - used to specify the base Url in the ServiceWorker was not being used in the index `<head>` link for **ServiceWorker.js**
- Also @SQL-MisterMagoo 
- Added code to automatically add leading and trailing slashes to **Property** **`ManifestBaseUrl`** 
- Added code to automatically add leading and trailing slashes to **Property** **`ServiceWorkerBaseUrl`** 
 
#### 11/11/2019

- Added new **Property** **`ServiceWorkerIgnoreHosts`** - used to prevent service worker installation on specific hosts e.g. localhost
 
#### 16/10/2019

- Added new **Property** **`BlazorProjectType`** - used to select the type of Blazor project (SSB/CSB). This property will auto-configure but can be overridden in your csproj file in cases where auto-configure is wrong.
- Added new **ServiceWorkerPattern** value - "none" - primarily intended for SSB projects (where it is the default) - this service worker does nothing.
- Removed **Property** **`ServiceWorkerIndexUrl`** 
- Added new **Property** **`ProjectIndexPage`** - used to identify the name of a _CSB_ index page - defaults to `index.html`
- Added new **Property** **`ProjectHomePage`** - used to identify the name of a _SSB_ index page - defaults to `Pages\_Host.cshtml`
- Added **`BlazorProjectType`** to build output.

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