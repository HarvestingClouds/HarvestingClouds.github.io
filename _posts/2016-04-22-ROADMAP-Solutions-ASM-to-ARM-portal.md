---
layout: post
title: ROADMAP - Solutions to help with Migration from Azre ASM to ARM portal
comments: true
redirect_from: "/2016/04/22/ROADMAP-Solutions-ASM-to-ARM-portal/"
permalink: ROADMAP-Solutions-ASM-to-ARM-portal
---

In additional to the tool I mentioned yesterday regarding [Migrating from Azure ASM to ARM portal](http://harvestingclouds.com/Migrating-from-Azure-ASM-to-ARM-portal){:target="_blank"} there are various solutions in the pipeline. This post looks at the high level Roadmap for the same from Microsoft.

Microsoft has promised that they are committed to make the migration more easier from ASM (older) to ARM (newer) portal. Various solutions are already in the pipeline for this.
Below are the details and roadmap for the tentative timelines for these solutions.

<table border="1" cellpadding="0" cellspacing="0"> <tbody> <tr> <td valign="top" width="29%"> <p><b>Solution</b></p> </td> <td valign="top" width="51%"> <p><b>Customer Experience</b></p> </td> <td valign="top" width="18%"> <p><b>Expected availability in 2016</b></p> </td> </tr> <tr> <td valign="top" width="29%"> <p>Script migration</p> </td> <td valign="top" width="51%"> <p>VM is rebooted as it is recreated in the Resource Manager model. While the Virtual Machines for the environment are recreated, the network is disconnected.</p> </td> <td valign="top" width="18%"> <p align="center">Q1</p> </td> </tr> <tr> <td valign="top" width="29%"> <p>Virtual Machines, no VNET</p> </td> <td valign="top" width="51%"> <p>As all Virtual Machines deployed in the Resource Manager model must be in a VNet, Virtual Machines will be migrated and placed in a new VNET. This will result in a change in network configuration, requiring a reboot to reconnect.</p> </td> <td valign="top" width="18%"> <p align="center">Q2</p> </td> </tr> <tr> <td valign="top" width="29%"> <p>Virtual Machines with VNET</p> </td> <td valign="top" width="51%"> <p>Starting in Q2, the platform will offer Virtual Machine migration from ASM to Resource Manager model without disrupting the running Virtual Machine. This will require disconnecting any VNets connected on-premises, whether via ExpressRoute or VPN, before doing the migration.</p> </td> <td valign="top" width="18%"> <p align="center">Q2</p> </td> </tr> <tr> <td valign="top" width="29%"> <p>Virtual Machines with basic hybrid (one connection)</p> </td> <td valign="top" width="51%"> <p>Starting in Q3, the platform will offer Virtual Machine migration from ASM to Resource Manager model without disrupting the running Virtual Machine and with minimal disruption to a basic hybrid connection, limited to just one connection back on-premises. More complex connections will require disconnecting before doing the migration.</p> </td> <td valign="top" width="18%"> <p align="center">Q3</p> </td> </tr> </tbody> </table>

Reference: [Transitioning to the Resource Manager model](https://azure.microsoft.com/en-us/blog/transitioning-to-the-resource-manager-model/){:target="_blank"}
