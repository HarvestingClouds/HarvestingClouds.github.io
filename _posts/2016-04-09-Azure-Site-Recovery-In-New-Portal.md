---
layout: post
title: Getting Started - Azure Site Recovery (ASR) In New Azure Portal
comments: true
redirect_from: "/2016/04/09/Azure-Site-Recovery-In-New-Portal/"
permalink: Azure-Site-Recovery-In-New-Portal
---

Azure Site Recovery or ASR is now available in the new Azure Resource Manager or ARM portal (codename Ibiza) with modern user interface. It is in preview at this stage. But it is production ready for all the Hyper-V related scenarios.
**Your older Vaults (created via Classic ASM Azure Portal) will not be available in ASR preview feature.**

### What are the new features

The new features include:

* All the goodness of Azure Resource Manager in ASR
* Lean experience for various ASR scenarios
* Enhancements to the specific Site Recovery scenarios

### Lets take a quick look at some of these.

If you Browse and search for "Recovery" you get Recovery Services Vaults as Preview feature.
![Browse and Search](/assets/01ASRPreview/BrowseAndSearch.png "Browse and Search")

Clicking on it will open up the blade for "Recovery Services valuts". Notice that Microsoft has PREVIEW text in this.
![alt text](/assets/01ASRPreview/ASRVault.png "ASR Vault")

Clicking on the Add button brings up the ASR vault creation blade. Notice the locations available for vault creation here.
![Vault Creation](/assets/01ASRPreview/VaultCreation.png "Vault Creation")

After you hit create the Vault gets deployed really quickly. I tested for East US location and it was created in under 10 secs.
Refresh to view your newly created vault. Click on it to open the NEW ASR Vault features. Notice that the Backup feature is also there in the ASR vault now.
![New Vault](/assets/01ASRPreview/NewVault.png "New Vault")

To find the options for replication go to Settings -> Getting Started section -> Site Recovery -> Follow Wizard.
![New Site Recovery Wizard](/assets/01ASRPreview/GettingStarted.png "New Site Recovery Wizard")

The Scenario Types available are only two. But all the scenarios are covered here:

* From my site to Azure
* From my site to another site

Based on the scenario you select you are asked for different options. The options for Virtualization/Management Server type for "From my site to Azure" are:

* VMM
* Stand alone Hyper-V hosts
* vCenter
* Physical machines (not virtualized)
![Creation Options](/assets/01ASRPreview/CreationOptions.png "Creation Options")

### Backup in ASR vault
Another feature is creation of Backups from the same vault. Click on the + icon for Backup in the Vault main blade and then follow the wizard for the preview feature.
![Backup In ASR](/assets/01ASRPreview/BackupInASR.png "Backup In ASR")
Notice in the screenshot above that the backup types available are:

* Azure virtual machine backup
* File Folder backup
* System Center Data Protection Manager

Selecting each option provides you with details for next steps. You can then create a backup policy and configure Items to backup.

Give these features a try and let us know in comments below how you find the new features.
Happy Exploring!
