---
layout: post
title: Run Azure Automation Runbooks via PowerShell ISE
comments: true
redirect_from: "/2016/04/14/Run-Azure-Automation-Runbooks-via-PowerShell-ISE/"
permalink: Run-Azure-Automation-Runbooks-via-PowerShell-ISE
---

Today I came across this blog post from my friend: [Azure Automation PowerShell ISE add-on](https://scomanswers.wordpress.com/2016/04/11/azure-automation-powershell-ise-add-on/){:target="_blank"}

What I came to know is that now you can Run the Azure Automation Runbooks via PowerShell ISE. This solves a big pain point for all Azure developers.
Now you will be able to develop and test your scripts right from the convenience of your laptop's local PowerShell ISE. 

### What you need to do
All you need to do is install the PowerShell Add-On using the below cmdlet:

```powershell
Find-Module AzureAutomationAuthoringToolkit | Install-Module -Scope CurrentUser
```

Then import the module using below cmdlet:

```powershell
Import-Module AzureAutomationAuthoringToolkit
```

You can configure the Add-On using a Configuration tab in the add-on and start getting your hands dirty. 

### Official Information from the Add-On Help

#### Capabilities

 - Test runbooks on your local machine and in the Azure Automation service: 
 - Store and edit Automation Assets locally 
 - Use Automation Activities (Get-AutomationVariable, Get-AutomationPSCredential, etc) in local PowerShell scripts 
 - Sync changes back to your Automation Account 
 - Run test jobs in Automation and view results 

#### Notes
Assets

 - Secret values (passwords, encrypted variables) are not downloaded automatically; they need to be set manually the first time the account is synced 
 - Values that haven't been downloaded will be highlighted 
 - Asset values you enter locally will not get overwritten when you sync from the cloud 

Runbooks 

 - Native PowerShell and PowerShell Workflow runbooks are supported 

Check the screenshot regarding this information below:
![Official Notes](/assets/AzureAutoPSAddOn/Notes.png "Official Notes")

### How much time it would take me
In all it would take you under 10 mins to get setup and rolling.

### Where is more information on this and screenshots
Go to the official [Technet blog by clicking HERE.](https://blogs.technet.microsoft.com/msoms/2016/04/08/the-way-cool-azure-automation-powershell-ise-add-on/){:target="_blank"}

Start playing around and let us know your initial impression in the comments below. If you have any doubts and I will be happy to address them.
