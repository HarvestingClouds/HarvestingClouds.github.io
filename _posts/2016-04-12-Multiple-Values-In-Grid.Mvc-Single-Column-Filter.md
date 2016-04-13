---
layout: post
title: Multiple Values In Grid.Mvc Single Column Filter via Checkboxes with Code Sample
comments: true
redirect_from: "/2016/04/12/Multiple-Values-In-Grid.Mvc-Single-Column-Filter/"
permalink: Multiple-Values-In-Grid.Mvc-Single-Column-Filter
---

I have been struggling to implement multiple filters in a single column in Grid.Mvc tool. I have solved this by altering the code and updating the custom widget.
**Note:** The WithMultipleFilters() option will not help you in this. That option enables multiple filters on different columns. To have multiple filters in the same column you need to update the way filtering works in the tool itself.

I have used a list of checkboxes and any or all of the elements selected in this checkbox list will be used for filtering the column values.

You can find the code in my fork of the official Grid.Mvc repo at below link:
[Fork of Grid.Mvc repo with Advance Filters](https://github.com/HarvestingClouds/Grid.Mvc){:target="_blank"}

I have also created a pull request for the same so that more people get benefit from this if they refer the master branch of the main repo.

### What are the changes I have done?
I have made changes to two files:

 1. **DefaultColumnFilter.cs** file in "**GridMvc**" class library project under the Filters folder. I have updated the GetFilterExpression method to create multiple expressions based on the pipeline character in filter values.
 2. **gridmvc.customwidgets.js** file in "**GridMvc.Site**" web application project

Both of these paths are shown below:
Location of DefaultColumnFilter.cs:
![DefaultColumnFilter.cs](/assets/Grid.Mvc/CSFile.png "DefaultColumnFilter.cs")

Location of gridmvc.customwidgets.js:
![gridmvc.customwidgets.js](/assets/Grid.Mvc/JSFile.png "gridmvc.customwidgets.js")

How the end result look like:
![Checkbox Filtering](/assets/Grid.Mvc/EndResult.png "Checkbox Filtering")

You can directly use the code if you want. Just honor the license of the original author.

Let me know in the comments below if you have any doubts and I will be happy to address them.
