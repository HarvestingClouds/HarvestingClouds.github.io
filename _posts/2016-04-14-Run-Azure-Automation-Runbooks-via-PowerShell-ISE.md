---
layout: post
title: Run Azure Automation Runbooks via PowerShell ISE
comments: true
redirect_from: "/2016/04/14/Run-Azure-Automation-Runbooks-via-PowerShell-ISE/"
permalink: Run-Azure-Automation-Runbooks-via-PowerShell-ISE
---

Today I came across this blog post from my friend:
[Azure Automation PowerShell ISE add-on] (https://scomanswers.wordpress.com/2016/04/11/azure-automation-powershell-ise-add-on/){:target="_blank"}

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

### How much time it would take me
In all it would take you under 10 mins to get setup and rolling.

### Where is more information on this and screenshots
Go to the official [Technet blog by clicking HERE.](https://blogs.technet.microsoft.com/msoms/2016/04/08/the-way-cool-azure-automation-powershell-ise-add-on/){:target="_blank"}

Start playing around and let us know your initial impression in the comments below. If you have any doubts and I will be happy to address them.
