---
layout: post
title: Migrating from Azure ASM to ARM portal
comments: true
redirect_from: "/2016/04/21/Migrating-from-Azure-ASM-to-ARM-portal/"
permalink: Migrating-from-Azure-ASM-to-ARM-portal
---

With co-existing Azure Service Management or ASM portal (older) and Azure Resource Manager or ARM portal (newer) there has been lots of confusions and problems for IT administrators.
The bottom line of all the discussion around the two portals is that **ARM is the future and is here to stay**. It means that you need to **plan and migrate** your resources from ASM portal to the ARM portal.

The key resource is your infrastructure which primarily consists of virtual machines. To migrate a single Virtual Machine (VM) from ASM portal to ARM portal you can leverage a set of PowerShell scripts called ASM2ARM.
You can download these scripts and check their description on [GitHub here on the **ASM2ARM** page](https://github.com/fullscale180/asm2arm){:target="_blank"}. You can check the detailed instructions there too.

To plan this right now is very important as the transitioning to Azure Resource Manager model is already underway. Any future development and investment seems to be happening only in the newer portal only.

**Reference:** [ASM2ARM scripts on GitHub](https://github.com/fullscale180/asm2arm){:target="_blank"}
