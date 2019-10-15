# Blazor PWA Builder - MSBuild

The easiest way to turn your Server Side And Client Side Blazor projects into Progressive Web Apps (PWA).

This project, when added to your build process, will generate the required files to enable basic PWA abilities for your project.

It generates a manifest.json, a Service Worker with pre-caching of all required files (Blazor WebAssembly only) and an installer for the Service Worker.

It currently includes a simple banner, by default, to notify the user that your application can be installed, and a simple alert to notify users when your application has been updated (CSB Only).

This is now an official release - I am looking for feedback/issues/requests.

### Browser compatibility

Note that chromium browsers will prompt you to install a PWA on a desktop computer.
Firefox does not currently provide this experience on desktop.
I don't have a Mac, but I believe Safari does not prompt on desktop either.

## Installation

Install the nuget BlazorPWA.MsBuild

#### Package Manager:
`Install-Package BlazorPWA.MSBuild -Version 0.0.1-beta20190808-20`

#### .NET Cli:
`dotnet add package BlazorPWA.MSBuild --version 0.0.1-beta20190808-20`

#### Package Reference
`<PackageReference Include="BlazorPWA.MSBuild" Version="0.0.1-beta20190808-20"/>`

## Configuration

Required configuration: none *.

**Really! try it!*

This PWA builder is constructed using MSBuild targets, which get installed in your .nuget cache.

You are free to inspect those targets and customise any part of the build by adding Properties to your csproj, or to a **.props** file in the source tree.

For example, by default, the PWA builder will only generate the PWA files once, which means, should you want to, you can add it to your project, build once - you will have the required files for a PWA and will be free to modify them to suit.

Should you want to re-generate the PWA files every build, you can add this Property to your **csproj**

**`<ServiceWorkerForce>true</ServiceWorkerForce>`**

When you want to publish an update to your app, you may need to supply a new browser cache version - if you don't change anything in the Service Worker the end user will not use your new code!

*Note: PWAs update when they detect a change in the Service Worker code - this cache version number is used in the Service Worker, so updating the cache version number will trigger an update of the PWA for the end user. It's also important as the cache is where your code is stored - if you don't update the cache version, it will not refresh with your new code*

**`<ServiceWorkerCacheVersion>2</ServiceWorkerCacheVersion>`**

The web manifest has properties for the application name, which are taken, by default, from your project and solution names, but you can override them

**`<ManifestShortName>My Project</ManifestShortName>`**

**`<ManifestLongName>My Really Great Project</ManifestLongName>`**

There are dozens of Properties in the *targets* files supplied by this package - you *could* customise them all, but you probably don't need to, so proceed with caution.

### Handing the "Installable PWA" event in Blazor

When a Chromium based browser detects an installable PWA, it fires an event that your application 
can use to display a prompt to the user.

The default for this package is to simply display a bar at the bottom of the
browser window prompting the user to install your app.

You can customise the message, or you can override that and pass the event
over to your Blazor application - by setting the property 
**`ServiceWorkerRegisterInstallableType`** to **`installable-blazor`** in your **.csproj**

This will generate code in your **ServiceWorkerRegister.js** to make an
interop call to Blazor when the **beforeinstallprompt** event fires in the browser.

In your Blazor application, you will need code to handle this call
- by default it will use the **ProjectName** and method name **"InstallPWA"** to 
 perform a `DotNet.InvokeAsync()`
- These values can be customised using the properties **`ServiceWorkerBlazorAssembly`** 
 and  **`ServiceWorkerBlazorInstallMethod`**

Here is an example Blazor implementation which could be added to **MainLayout**

``` HTML
@if (Installable)
{
    <div class="fixed-bottom w-100 alert alert-dark d-flex align-items-center" @onclick="InstallClicked">
        <h3>Install this app?</h3>
        <small class="ml-auto mr-1 rounded-pill"><button @onclick="@(()=>Installable=false)">X</button></small>
    </div>
}
```
This will display a bar at the bottom of the browser, which can be dismissed or clicked.


The `code` section has the `JSInvokable` method **InstallPWS** that we called
earlier from the browser and some supporting code to toggle the display and 
make an interop call back to the browser to trigger the app installation.
``` C#
@code
{
    [Inject] IJSRuntime JSRuntime { get; set; }

    static bool Installable = false;
    static Action ml;
    protected override void OnInitialized()
    {
        ml = () => InvokeAsync(StateHasChanged);
    }
    [JSInvokable]
    public static Task InstallPWA()
    {
        Installable = true;
        ml.Invoke();
        return Task.CompletedTask;
    }
    Task InstallClicked(UIMouseEventArgs args)
    {
        Installable = false;
        return JSRuntime.InvokeAsync<object>("BlazorPWA.installPWA");
    }
}
```

## Roadmap

- [ ] At the moment, there is only one choice for caching strategy - Cache First/Network Fallback - I will add more (https://developers.google.com/web/ilt/pwa/introduction-to-progressive-web-app-architectures#caching_strategies_supported_by_sw-toolbox)
- [x] The current method for alerting the user that the app is installable is semi-hard coded (you can adjust it manually after generation) - this will change to allow hooks/callbacks into Blazor via project properties
- [ ] The current method for alerting the user when an update is available is semi-hard coded (you can adjust it manually after generation) - this will change to allow hooks/callbacks into Blazor via project properties
- [ ] Document all of the configuration Properties (they all have comments in the code - so you are able to understand their purpose without documentation...)
- [ ] Bug fixes

## Contribute

Please feel free to create issues, ask questions and submit Pull Requests.