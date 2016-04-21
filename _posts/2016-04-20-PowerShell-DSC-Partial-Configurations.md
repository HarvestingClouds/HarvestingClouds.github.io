---
layout: post
title: PowerShell DSC - Partial Configurations
comments: true
redirect_from: "/2016/04/20/PowerShell-DSC-Partial-Configurations/"
permalink: PowerShell-DSC-Partial-Configurations
---

**Partial Configurations** is a new feature in PowerShell 5.0 Desired State Configuration or DSC. It allows the configurations to be delivered in parts or fragments. These configurations can come from various sources.
The Local Configuration Manager or LCM on the target node puts these partial configurations from different sources together and after that apply the same as a single configuration.

This opens various possibilities for Enterprises to manage their infrastructure and designate the responsibility to various teams for a single node. The team expert in a particular field can focus on that feature without worrying about other features.

You can have partial configurations in following modes:

 1. Push Mode
 2. Pull Mode
 3. Hybrid Mode (i.e. combination of Push and Pull)
 
### Configuration for the PUSH Mode

You need to follow three steps to configure Partial configurations for the PUSH mode:

 - Configure the LCM, on the target node, to expect partial configurations
 - Push each partial configuration from different sources using **Publish-DSCConfiguration** cmdlet. Target node will automatically combine the partial configurations into single configuration.
 - Apply the configuration by calling the **Start-DSCConfiguration**cmdlet
 
### Configuration for the PULL Mode

This is bit complex than the Push mode. In nutshell you only need couple of steps:

 - Configure the LCM, on the target node, to receive partial configurations but from PULL servers
 - Name and locate the configuration documents properly on the pull servers
 
To know more about DSC Partial configurations follow the below references:

   - [Detailed Blog by AutomationNext with very valuable insights](https://automationnext.wordpress.com/2016/04/19/powershell-desired-state-configuration-partial-configurations-without-configurationid/){:target="_blank"}  
   - [Official MSDN Article](https://msdn.microsoft.com/en-us/powershell/dsc/partialconfigs){:target="_blank"}

