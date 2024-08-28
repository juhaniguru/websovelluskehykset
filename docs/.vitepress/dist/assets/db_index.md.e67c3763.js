import{_ as e,y as a,x as t,W as s}from"./plugin-vue_export-helper.86aaabad.js";var o="/assets/1.81516429.png";const g='{"title":"WHAT IS A DATABASE","description":"","frontmatter":{},"headers":[{"level":2,"title":"WHY NOT JUST USE FLAT FILES?","slug":"why-not-just-use-flat-files"},{"level":2,"title":"WHY ARE THERE SO MANY DIFFERENT TYPES OF DATABASES","slug":"why-are-there-so-many-different-types-of-databases"},{"level":3,"title":"OLTP vs. OLAP","slug":"oltp-vs-olap"}],"relativePath":"db/index.md","lastUpdated":1693941066907}',n={},i=s('<h1 id="what-is-a-database" tabindex="-1">WHAT IS A DATABASE <a class="header-anchor" href="#what-is-a-database" aria-hidden="true">#</a></h1><p><img src="'+o+'" alt="db"></p><p>Databases were developed in the 1970s for storing data persistently</p><div class="info custom-block"><p class="custom-block-title">Persistent Storage</p><p>Any device that retains data after power to the device is shut off</p></div><p>Computer&#39;s RAM (Random Access Memory) is fast to read and write but RAM is of finite amount. There&#39;s so much different kind of data from various kind of devices (mobile, iot etc.) that not every piece of it can fit into computer&#39;s RAM at once. That&#39;s why persistent storage - databases are needed.</p><h2 id="why-not-just-use-flat-files" tabindex="-1">WHY NOT JUST USE FLAT FILES? <a class="header-anchor" href="#why-not-just-use-flat-files" aria-hidden="true">#</a></h2><p>Nowadays you can for example read a large CSV file into a Pandas dataframe, filter and run aggreagations on it...Sure. But what if two data engineers / data scientists were to read that one CSV file at exactly the same time? the file would get locked the moment the first data scientist opens the file for reading and the other one would be left empty-handed.</p><p>You can of course read the whole file into memory and free the filehandle for the others to read...Yeah, but the file could be so big that you run out of memory</p><p>You could either develop a system to chunk the file into smaller pieces or you can use database to store the data. Concurrent usage of resources is taken care of by the database management system and it&#39;s not your responsibility.</p><p>Besides before Pandas and other tools alike if you wanted to find one specific row in a flat file you needed to loop through the whole file as long as the row got found</p><p>Database management systems come with query languages built-in so that you can find specific rows in the database without going thru the whole dataset.</p><h2 id="why-are-there-so-many-different-types-of-databases" tabindex="-1">WHY ARE THERE SO MANY DIFFERENT TYPES OF DATABASES <a class="header-anchor" href="#why-are-there-so-many-different-types-of-databases" aria-hidden="true">#</a></h2><p>A few decades ago, starting from the 70s and 80s it was enough to just have relational databases but as the amount of data stored grew and the data formats multiplied storing everything in a rigid relational database wasn&#39;t applicable anymore...And NoSQL was born..</p><h3 id="oltp-vs-olap" tabindex="-1">OLTP vs. OLAP <a class="header-anchor" href="#oltp-vs-olap" aria-hidden="true">#</a></h3><h4 id="oltp-online-transactional-processing" tabindex="-1">OLTP (Online Transactional Processing) <a class="header-anchor" href="#oltp-online-transactional-processing" aria-hidden="true">#</a></h4><ul><li>multiple short and fast queries</li><li>for example product searches in a e-commerce platform, customer adding products into a cart, customers login / logout, customers update passwords, etc.</li></ul><h4 id="olap-online-analytical-processing" tabindex="-1">OLAP (Online Analytical Processing) <a class="header-anchor" href="#olap-online-analytical-processing" aria-hidden="true">#</a></h4><ul><li>Analysing that e-commerce platform data to better understand customers and how they are spending money</li></ul><div class="info custom-block"><p class="custom-block-title">INFO</p><p>You as future data engineers might be more interested in the analytical side of things. It&#39;s likely that you won&#39;t ever be designing and / or developing any transactional databases, but still you, being responsible for engineering transactional data into more analyzable format, need to know how transactional database design principles work.</p></div>',19),r=[i];function d(l,h,c,u,p,f){return t(),a("div",null,r)}var y=e(n,[["render",d]]);export{g as __pageData,y as default};