# Blazor PWA Builder - MSBuild

The easiest way to turn your Server Side And Client Side Blazor projects into Progressive Web Apps (PWA).

This project, when added to your build process, will generate the required files to enable basic PWA abilities for your project.

It generates a manifest.json, a Service Worker with pre-caching of all required files (Blazor WebAssembly only) and an installer for the Service Worker.

It currently includes a simple banner, by default, to notify the user that your application can be installed, and a simple alert to notify users when your application has been updated (CSB Only).

This is now an official release - I am looking for feedback/issues/requests.

## Installation

Install the nuget BlazorPWA.MsBuild

#### Package Manager:
`Install-Package BlazorPWA.MSBuild -Version 1.0.1`

#### .NET Cli:
`dotnet add package BlazorPWA.MSBuild --version 1.0.1`

#### Package Reference
`<PackageReference Include="BlazorPWA.MSBuild" Version="1.0.1"/>`

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

Please see the full README on GitHub for more details.
