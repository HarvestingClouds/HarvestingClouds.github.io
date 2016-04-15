---
layout: post
title: Azure Authentication - Authenticating any Azure API Request in your Application
comments: true
redirect_from: "/2016/04/15/Azure-Authentication-Authenticating-any-Azure-API-Request/"
permalink: Azure-Authentication-Authenticating-any-Azure-API-Request
---

I have created a code sample to showcase how you can authenticate any request programatically with Azure. 
This also contains **a Reusable Authentication Helper class** which you can directly use in your code.

### Where is the code

You can find the complete code sample along with the reusable Azure Authentication Helper class library from this GitHub repo:
[Azure Authentication Sample](https://github.com/HarvestingClouds/AzureAuthentication){:target="_blank"}

### What are my authentication Options

You have the following options

 - Authenticating by **Prompting** for Credentials from end user. (This needs end user interaction)
 - Authenticating by **Credentials** i.e. using a password. (This does not need any end user interaction)
 - Authenticating by using a **Certificate** ( This also does not need any end user interaction)

I have provided this functionality in 3 separate methods, in a separate class file along with it's interface. 
You can follow the instructions in the ReadMe file in the GitHub repo and start using any one of the method.

I hope you find this usefull and this will avoid the trouble of figuring things out, which I have already undergone. 

Let me know in the comments below if you have any questions or anything to add to this.
