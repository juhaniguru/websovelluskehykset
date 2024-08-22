import{_ as n,y as a,x as s,W as t}from"./plugin-vue_export-helper.86aaabad.js";var e="/assets/1.265594a8.png",o="/assets/2.4e2e05de.png";const f='{"title":"NOSQL","description":"","frontmatter":{},"headers":[{"level":2,"title":"NOSQL","slug":"nosql"},{"level":2,"title":"How to know what to choose?","slug":"how-to-know-what-to-choose"},{"level":3,"title":"CAP-theorem","slug":"cap-theorem"},{"level":3,"title":"ACID","slug":"acid"},{"level":3,"title":"BASE","slug":"base"},{"level":2,"title":"MongoDB","slug":"mongodb"},{"level":3,"title":"COMMANDS","slug":"commands"},{"level":2,"title":"KEY FEATURES OF MONGODB","slug":"key-features-of-mongodb"},{"level":3,"title":"DOCUMENT MODEL","slug":"document-model"},{"level":3,"title":"SCHEMA-LESS DESING","slug":"schema-less-desing"},{"level":3,"title":"SHARDING","slug":"sharding"},{"level":2,"title":"DATA MODELING","slug":"data-modeling"},{"level":3,"title":"FLEXIBLE SCHEMA","slug":"flexible-schema"},{"level":3,"title":"DOCUMENT STRUCTURE","slug":"document-structure"},{"level":3,"title":"REFERENCES","slug":"references"},{"level":3,"title":"ATOMICITY","slug":"atomicity"},{"level":3,"title":"DATA USE AND PERFORMANCE","slug":"data-use-and-performance"},{"level":2,"title":"OPREATIONAL FACTORS AND DATA MODELS","slug":"opreational-factors-and-data-models"},{"level":3,"title":"EMBEDDED DATA MODEL","slug":"embedded-data-model"},{"level":3,"title":"MULTI-DOCUMENT TRANSACTIONS","slug":"multi-document-transactions"},{"level":3,"title":"INDEXES","slug":"indexes"},{"level":3,"title":"LARGE NUMBER OF COLLECTIONS","slug":"large-number-of-collections"},{"level":3,"title":"COLLECTION CONTAINING MANY SMALL DOCUMENTS","slug":"collection-containing-many-small-documents"},{"level":3,"title":"STORAGE OPIMIZATION FOR SMALL DOCUMENTS","slug":"storage-opimization-for-small-documents"},{"level":2,"title":"MODELING ONE-TO-ONE","slug":"modeling-one-to-one"},{"level":2,"title":"MODELING ONE-TO-MANY","slug":"modeling-one-to-many"},{"level":3,"title":"SUBSET PATTERN","slug":"subset-pattern"},{"level":2,"title":"MODELING WITH RELATIONS","slug":"modeling-with-relations"},{"level":3,"title":"MODELING TREE STRUCTURES","slug":"modeling-tree-structures"},{"level":3,"title":"AGGREGATION PIPELINE","slug":"aggregation-pipeline"},{"level":3,"title":"ABOUT STAGE ORDER","slug":"about-stage-order"}],"relativePath":"nosql/index.md","lastUpdated":1700731379304}',p={},c=t('<h2 id="nosql" tabindex="-1">NOSQL <a class="header-anchor" href="#nosql" aria-hidden="true">#</a></h2><p>As a term NoSQL is quite loosely determined, you could think of it as &quot;not just SQL&quot;, or everything else but the relational databases.</p><h2 id="how-to-know-what-to-choose" tabindex="-1">How to know what to choose? <a class="header-anchor" href="#how-to-know-what-to-choose" aria-hidden="true">#</a></h2><h3 id="cap-theorem" tabindex="-1">CAP-theorem <a class="header-anchor" href="#cap-theorem" aria-hidden="true">#</a></h3><p>CAP theorem&#39;s keypoints can help you choose the right database for the job</p><ul><li>Consistency <ul><li>If your application&#39;s integrity is critical and changes need to be seen immediately choose relational database</li></ul></li><li>Availability <ul><li>Every request is responded (meaning the request doesn&#39;t end up in an error</li></ul></li><li>Partitioning tolerance <ul><li><p>How well does your system tolerate errors</p><ul><li>You either rollback all the changes to ensure data integrity</li><li>or you can let the application to run so that it&#39;s basically always available but the data and its integrity might take a hit</li></ul></li><li><p>For example if you have a cloud-based application that encounters a problem on one server, you might redirect all the traffic to another node in another country to ensure availability. The data in that node that&#39;s available might not be the latest</p></li></ul></li></ul><p><img src="'+e+'" alt="design"></p><h3 id="acid" tabindex="-1">ACID <a class="header-anchor" href="#acid" aria-hidden="true">#</a></h3><ul><li>Atomicity <ul><li>In a relational database there are so called transactions. There can be multiple queries in one transaction. When you commit the transaction all the queries in it will be executed atomically in a single unit or if just one fails, all will fail</li></ul></li><li>Consistency</li></ul><ul><li>Every piece of information is intact and up-to-date</li></ul><ul><li>Isolation <ul><li>Like atomicity, isolation too has to do with transactionss. Isolation determines how different transactions are visible to other transactions</li><li>Different isolation types are out of scope of this course but jsut remember that isolation guarantees that multiple users can use same app concurrenlty without messing up the data and its integrity in a database</li></ul></li><li>Durability <ul><li>durability ensures that commited trnasations will be stored permanently</li></ul></li></ul><h3 id="base" tabindex="-1">BASE <a class="header-anchor" href="#base" aria-hidden="true">#</a></h3><ul><li>Basic availability <ul><li>Data is practically always available but not necessarilly up-to-date</li></ul></li><li>Soft State <ul><li>Changes are not atomic, updates can take time</li></ul></li><li>Eventual Consistency</li></ul><h2 id="mongodb" tabindex="-1">MongoDB <a class="header-anchor" href="#mongodb" aria-hidden="true">#</a></h2><ul><li>MongoDB is a good choice for storing unstructured / semi-structured data</li><li>Fast to use for prototyping if the final schema isn&#39;t clear yet</li><li>Good and flexible aggregation tools</li></ul><ul><li>If you use MongoDB for strictly structured data to replace RDBMS you need to manually implement many features that are built-in in every RDBMS</li></ul><p>As you know in a relational database it&#39;s not possible to model a n:m relationship without a bridge table but MongoDB provides complex datatypes that enable modeling complex nested data structures.</p><ul><li>nested documents</li><li>arrays</li><li>nested objects</li></ul><p><img src="'+o+`" alt="design"></p><p>MongoDB was developed by a company called DoubleClick, an online marketing company, that provided 400000 commercials per second. They could be a lot variations between the contents of the commercials and thus it became hard to maintain and update a relational datbase</p><p>With MongoDB horizontal scaling is also quite easy compared to RDBMS</p><div class="info custom-block"><p class="custom-block-title">Horizontal Scaling?</p><p>With a relational database management system, database tables are inter-linked with different kind of relationships so distributing a database into a cluster of multiple nodes isn&#39;t as easy as distributing a MongoDB database that has no relations</p></div><div class="info custom-block"><p class="custom-block-title">Sharding</p><p>Sharding is a mechanism that enables distributing large junks of data seemlesly into multiple different servers without user even noticing anything. User can perform one query and MongoDB takes care of collecting data</p></div><h3 id="commands" tabindex="-1">COMMANDS <a class="header-anchor" href="#commands" aria-hidden="true">#</a></h3><h4 id="find" tabindex="-1">find <a class="header-anchor" href="#find" aria-hidden="true">#</a></h4><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Fetches documents</p></div><h4 id="filterointi" tabindex="-1">Filter\xF6inti <a class="header-anchor" href="#filterointi" aria-hidden="true">#</a></h4><div class="language-js"><pre><code><span class="token comment">// finds always start with</span>
db<span class="token punctuation">.</span>collection<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// db is always the database that user is connected to</span>
<span class="token comment">// collection is the name of the collection you performs queries on</span>

<span class="token comment">// for example: let&#39;s fetch all the documents  in a user collection</span>
<span class="token comment">// find without any filtering conditions fetches all the documents</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// the query below fetches all the documents having a role key with the value of &#39;admin&#39;</span>
<span class="token comment">// ie. it fetches all the admins in a user collection</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// you can combine multiple conditions like so:</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">hometown</span><span class="token operator">:</span> <span class="token string">&#39;Rovaniemi&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// with SQL it would be like this.</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> role <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span> <span class="token constant">AND</span> hometown <span class="token operator">=</span> <span class="token string">&#39;Rovaniemi&#39;</span><span class="token punctuation">;</span>



<span class="token comment">// OR goes like this</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">$or</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">hometown</span><span class="token operator">:</span> <span class="token string">&#39;Rovaniemi&#39;</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token comment">// MongoDB has an $or operator that takes an array of conditions as a parameter</span>
<span class="token comment">// with SQL it would be like this</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> role <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span> <span class="token constant">OR</span> hometown <span class="token operator">=</span> <span class="token string">&#39;Rovaniemi&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// OR &amp; AND combined</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">eye_color</span><span class="token operator">:</span> <span class="token string">&#39;brown&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">$or</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">hometown</span><span class="token operator">:</span> <span class="token string">&#39;Rovaniemi&#39;</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> eye_color <span class="token operator">=</span> <span class="token string">&#39;brown&#39;</span> <span class="token constant">AND</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span> <span class="token constant">OR</span> hometown <span class="token operator">=</span> <span class="token string">&#39;Rovaniemi&#39;</span><span class="token punctuation">)</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">$or</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span><span class="token literal-property property">eye_color</span><span class="token operator">:</span> <span class="token string">&#39;brown&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token literal-property property">hometown</span><span class="token operator">:</span> <span class="token string">&#39;Rovaniemi&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">eye_color</span><span class="token operator">:</span> <span class="token string">&#39;brown&#39;</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> <span class="token punctuation">(</span>role <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span> <span class="token constant">AND</span> eye_color <span class="token operator">=</span> <span class="token string">&#39;brown&#39;</span><span class="token punctuation">)</span> <span class="token constant">OR</span> <span class="token punctuation">(</span>hometown <span class="token operator">=</span> <span class="token string">&#39;Rovaniemi&#39;</span> <span class="token constant">AND</span> eye_color <span class="token operator">=</span> <span class="token string">&#39;brown&#39;</span><span class="token punctuation">)</span>


</code></pre></div><h4 id="comparison-operators" tabindex="-1">Comparison operators <a class="header-anchor" href="#comparison-operators" aria-hidden="true">#</a></h4><div class="info custom-block"><p class="custom-block-title">INFO</p><p>With MongoDB you cannot use = sign to compare, it&#39;s like this: {key: &#39;value&#39;} and for every comparison operator there&#39;s a keyword in MongoDB</p></div><div class="language-js"><pre><code><span class="token comment">// not equal</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">last_name</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$neq</span><span class="token operator">:</span> <span class="token string">&#39;kuru&#39;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL:</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> last_name <span class="token operator">&lt;</span><span class="token operator">&gt;</span> <span class="token string">&#39;kuru&#39;</span>
<span class="token comment">// or</span>
<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> last_name <span class="token operator">!=</span> <span class="token string">&#39;kuru&#39;</span>

<span class="token comment">// greater than / less than / greater than or equals / less than or equals</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$gt</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> age <span class="token operator">&gt;</span> <span class="token number">18</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$gte</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> age <span class="token operator">&gt;=</span> <span class="token number">18</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$lt</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> age <span class="token operator">&lt;</span> <span class="token number">18</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$lte</span><span class="token operator">:</span> <span class="token number">18</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> age <span class="token operator">&lt;=</span> <span class="token number">18</span>


</code></pre></div><h4 id="in-ja-not-in" tabindex="-1">IN ja NOT IN <a class="header-anchor" href="#in-ja-not-in" aria-hidden="true">#</a></h4><div class="language-js"><pre><code>
<span class="token comment">// in</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token punctuation">{</span>$<span class="token keyword">in</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> role <span class="token constant">IN</span> <span class="token punctuation">(</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// not in</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$nin</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> role <span class="token constant">NOT</span> <span class="token constant">IN</span> <span class="token punctuation">(</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;user&#39;</span><span class="token punctuation">)</span>

</code></pre></div><h4 id="is-null-is-not-null" tabindex="-1">IS NULL / IS NOT NULL <a class="header-anchor" href="#is-null-is-not-null" aria-hidden="true">#</a></h4><div class="language-js"><pre><code>
<span class="token comment">// With MongoDB, because of flexible schema, a key value pair can be null or the key can be omitted complitely</span>

<span class="token comment">// is null is not null</span>

<span class="token comment">// hair_color-kentt\xE4 exists but it&#39;s not set</span>
db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">hair_color</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// hair_color exists and it&#39;s set</span>
db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">hair_color</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$ne</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// key exists but it&#39;s value makes no difference</span>
db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">hair_color</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$exists</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// the key doesnt exist</span>
db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">hair_color</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">$exists</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre></div><h4 id="how-to-select-keys-in-a-document" tabindex="-1">How to SELECT keys in a document <a class="header-anchor" href="#how-to-select-keys-in-a-document" aria-hidden="true">#</a></h4><div class="info custom-block"><p class="custom-block-title">INFO</p><p>MongoDB find() returns all the keys in all the documents that match the query conditions.</p><p>So there&#39;s no SELECT but find funtion&#39;s second projection argument can be used as a SELECT statement in SQL</p></div><div class="language-js"><pre><code>
<span class="token comment">// fetch only first_name keys in users collection</span>
db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">first_name</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> first_name <span class="token constant">FROM</span> users<span class="token punctuation">;</span>

<span class="token comment">// fetch first_name and last_name of every admin</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">first_name</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token literal-property property">last_name</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// alternatively you can mark only the keys you don&#39;t want to be fetched</span>

<span class="token comment">// fetch all but last_name</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">last_name</span><span class="token operator">:</span><span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">)</span>



</code></pre></div><h4 id="limit" tabindex="-1">LIMIT <a class="header-anchor" href="#limit" aria-hidden="true">#</a></h4><div class="language-js"><pre><code>
db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">SELECT</span> <span class="token operator">*</span> <span class="token constant">FROM</span> users <span class="token constant">LIMIT</span> <span class="token number">1</span><span class="token punctuation">,</span><span class="token number">1</span>
</code></pre></div><p>With MongoDB you can use findOne</p><h4 id="insert" tabindex="-1">INSERT <a class="header-anchor" href="#insert" aria-hidden="true">#</a></h4><p>You can use insertOne or insertMany</p><div class="language-js"><pre><code>
<span class="token comment">// insert one document</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">first_name</span><span class="token operator">:</span> <span class="token string">&#39;new user&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// lis\xE4t\xE4\xE4n yhdell\xE4 kertaa useampi dokumentti </span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">{</span>
    <span class="token literal-property property">first_name</span><span class="token operator">:</span> <span class="token string">&#39;first&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">first_name</span><span class="token operator">:</span> <span class="token string">&#39;second&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">first_name</span><span class="token operator">:</span> <span class="token string">&#39;third&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token comment">// separately</span>

<span class="token constant">INSERT</span> <span class="token constant">INTO</span> <span class="token function">users</span><span class="token punctuation">(</span>first_name<span class="token punctuation">)</span> <span class="token constant">VALUES</span><span class="token punctuation">(</span><span class="token string">&#39;new user&#39;</span><span class="token punctuation">)</span>

<span class="token comment">// batch insert</span>

<span class="token constant">INSERT</span> <span class="token constant">INTO</span> <span class="token function">users</span><span class="token punctuation">(</span>first_name<span class="token punctuation">)</span> <span class="token constant">VALUES</span><span class="token punctuation">(</span><span class="token string">&#39;first&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
                                    <span class="token punctuation">(</span><span class="token string">&#39;second&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
                                    <span class="token punctuation">(</span><span class="token string">&#39;third&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre></div><p>insertOne and InsertMany return an object containing the objectID-fields of the newly added documents</p><h4 id="update" tabindex="-1">UPDATE <a class="header-anchor" href="#update" aria-hidden="true">#</a></h4><p>The first argument of updateOne and updateMany is the collection of filtering conditions just like in find and the second argument states, what keys to update</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>With MongoDB you can set new keys using update because the schema is flexible</p></div><div class="language-js"><pre><code>
<span class="token comment">// this updates the brown-eyed hair_long to true</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">eye_color</span><span class="token operator">:</span> <span class="token string">&#39;brown&#39;</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">hair_long</span><span class="token operator">:</span><span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">UPDATE</span> users <span class="token constant">SET</span> hair_long <span class="token operator">=</span> <span class="token number">1</span> <span class="token constant">WHERE</span> eye_color <span class="token operator">=</span> <span class="token string">&#39;brown&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// update only one document</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">updateOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">_id</span><span class="token operator">:</span> <span class="token function">ObjectId</span><span class="token punctuation">(</span><span class="token string">&#39;63e362b9415552734e896049&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;admin&#39;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">UPDATE</span> users <span class="token constant">SET</span> role <span class="token operator">=</span> <span class="token string">&#39;admin&#39;</span> <span class="token constant">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>


</code></pre></div><h4 id="delete" tabindex="-1">DELETE <a class="header-anchor" href="#delete" aria-hidden="true">#</a></h4><p>deleteMany removes the documents matching the filtering conditions deleteOne removes one document</p><div class="language-js"><pre><code><span class="token comment">// remove all the users</span>
db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">deleteMany</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">DELETE</span> <span class="token constant">FROM</span> users<span class="token punctuation">;</span>

<span class="token comment">// remove all the moderators</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">deleteMany</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">role</span><span class="token operator">:</span> <span class="token string">&#39;moderator&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">DELETE</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> role <span class="token operator">=</span> <span class="token string">&#39;moderator&#39;</span><span class="token punctuation">;</span>

<span class="token comment">// remove only one</span>

db<span class="token punctuation">.</span>users<span class="token punctuation">.</span><span class="token function">deleteOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">_id</span><span class="token operator">:</span> <span class="token function">ObjectId</span><span class="token punctuation">(</span><span class="token string">&#39;63e362b9415552734e896049&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// SQL</span>

<span class="token constant">DELETE</span> <span class="token constant">FROM</span> users <span class="token constant">WHERE</span> id <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>


</code></pre></div><h2 id="key-features-of-mongodb" tabindex="-1">KEY FEATURES OF MONGODB <a class="header-anchor" href="#key-features-of-mongodb" aria-hidden="true">#</a></h2><h3 id="document-model" tabindex="-1">DOCUMENT MODEL <a class="header-anchor" href="#document-model" aria-hidden="true">#</a></h3><p>MongoDB collections consist of documents. It might be easier for a developer to understand the data models compared to complex relational models</p><h3 id="schema-less-desing" tabindex="-1">SCHEMA-LESS DESING <a class="header-anchor" href="#schema-less-desing" aria-hidden="true">#</a></h3><p>MongoDB documents can consist of multiple embedded documents and multiple complex datatypes such as arrays</p><h3 id="sharding" tabindex="-1">SHARDING <a class="header-anchor" href="#sharding" aria-hidden="true">#</a></h3><p>Sharing large data and spreading it across multiple machines</p><h2 id="data-modeling" tabindex="-1">DATA MODELING <a class="header-anchor" href="#data-modeling" aria-hidden="true">#</a></h2><h3 id="flexible-schema" tabindex="-1">FLEXIBLE SCHEMA <a class="header-anchor" href="#flexible-schema" aria-hidden="true">#</a></h3><ul><li>The structure and datatypes can differ inside one collection across documents</li><li>Flexible schema makes modifying structure fast</li><li>It&#39;s easier to model real-world entities compared to relational databases</li></ul><h3 id="document-structure" tabindex="-1">DOCUMENT STRUCTURE <a class="header-anchor" href="#document-structure" aria-hidden="true">#</a></h3><p>MongoDB allows modeling relational data as embedded documents. It&#39;s possible to embed documents in a field or an array within another document. This way you can retrieve data in a single database operation</p><h3 id="references" tabindex="-1">REFERENCES <a class="header-anchor" href="#references" aria-hidden="true">#</a></h3><p>References store relationships between data by including links from one document to another, much like primary key / foreign key relation in a relational database</p><h3 id="atomicity" tabindex="-1">ATOMICITY <a class="header-anchor" href="#atomicity" aria-hidden="true">#</a></h3><p>MongoDB can ensure single document atomicity. If your update query affects multiple documents, each of the documents will get updated atomically but the operation as a whole is not atomic</p><h3 id="data-use-and-performance" tabindex="-1">DATA USE AND PERFORMANCE <a class="header-anchor" href="#data-use-and-performance" aria-hidden="true">#</a></h3><p>If your app will mostly use recently inserted data, consider using capped documents. Then on the other hand, if there&#39;s a lot of reading from database, consider indexing fields that get used often in queries.</p><h4 id="capped-collections" tabindex="-1">CAPPED COLLECTIONS <a class="header-anchor" href="#capped-collections" aria-hidden="true">#</a></h4><p>Capped collections are of fixed size. Once the limit has been reached, the oldest documents get deleted making room for newer documents</p><div class="info custom-block"><p class="custom-block-title">Rolling update</p><p>Remember rolling update ETL, that always removes the oldest rows and keeps only a certain amount of data</p></div><h2 id="opreational-factors-and-data-models" tabindex="-1">OPREATIONAL FACTORS AND DATA MODELS <a class="header-anchor" href="#opreational-factors-and-data-models" aria-hidden="true">#</a></h2><h3 id="embedded-data-model" tabindex="-1">EMBEDDED DATA MODEL <a class="header-anchor" href="#embedded-data-model" aria-hidden="true">#</a></h3><p>All related data is combined in a single embedded document instead of normalizing data across multiple smaller documents</p><h3 id="multi-document-transactions" tabindex="-1">MULTI-DOCUMENT TRANSACTIONS <a class="header-anchor" href="#multi-document-transactions" aria-hidden="true">#</a></h3><p>Data models that store references across multiple documents, operations that affect relative data, require multiple queries, because there are no joins in MongoDB. These can be very costly performance-wise. In many cases it&#39;s more efficient to stick to embedded document model</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>In many cases, if you find yourself using MongoDB like a relational database, you should change to relational database</p></div><h3 id="indexes" tabindex="-1">INDEXES <a class="header-anchor" href="#indexes" aria-hidden="true">#</a></h3><p>You can use indexes to improve query performance. Build indexes on fields that appera often in queries and for all operations that return sorted results. _id field is automatically indexed</p><ul><li>Each index requires space atleast 8kb</li><li>Indexing has a negative impact on write operations, because indexes need to updated</li></ul><h3 id="large-number-of-collections" tabindex="-1">LARGE NUMBER OF COLLECTIONS <a class="header-anchor" href="#large-number-of-collections" aria-hidden="true">#</a></h3><p>It might be good idea to distribute a large number of documents across multiple collections, for example by type. Let&#39;s say you have many iot sensors that produce same kind of measurements, but others are humidity sensors and other temperature sensors. It might be good to make these into different collections</p><p>Generally having a large number of collection doesn&#39;t affect performance negatively</p><h3 id="collection-containing-many-small-documents" tabindex="-1">COLLECTION CONTAINING MANY SMALL DOCUMENTS <a class="header-anchor" href="#collection-containing-many-small-documents" aria-hidden="true">#</a></h3><p>You should consider &quot;rolling up&quot; smaller documents by grouping them logically and thus creating larger embedded documents. Rolling up reduces random disk access and can use indexing more effectively</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>&quot;However, if you often only need to retrieve a subset of the documents within the group, then &quot;rolling-up&quot; the documents may not provide better performance. Furthermore, if small, separate documents represent the natural model for the data, you should maintain that model.&quot;</p></div><h3 id="storage-opimization-for-small-documents" tabindex="-1">STORAGE OPIMIZATION FOR SMALL DOCUMENTS <a class="header-anchor" href="#storage-opimization-for-small-documents" aria-hidden="true">#</a></h3><ul><li><p>use _id field explicitly</p><ul><li>MongoDB creates and indexes _id field automatically, if you have multiple small documents, it takes up a lot of space</li><li>Provide manually a unique _id value that is of another type than ObjectId</li></ul></li><li><p>Use shorter field names</p><ul><li>MongoDB always stores every field name in every document, so making names shorter can save space</li><li>This is something that should never affect usability and readability</li></ul></li></ul><h2 id="modeling-one-to-one" tabindex="-1">MODELING ONE-TO-ONE <a class="header-anchor" href="#modeling-one-to-one" aria-hidden="true">#</a></h2><div class="language-json"><pre><code>
<span class="token punctuation">{</span>
    <span class="token property">&quot;username&quot;</span><span class="token operator">:</span> <span class="token string">&quot;juhani&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;address&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>

        <span class="token property">&quot;street&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Jokiv\xE4yl\xE4, 11&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;zip_code&quot;</span><span class="token operator">:</span> <span class="token number">96300</span><span class="token punctuation">,</span>
        <span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Rovaniemi&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre></div><h2 id="modeling-one-to-many" tabindex="-1">MODELING ONE-TO-MANY <a class="header-anchor" href="#modeling-one-to-many" aria-hidden="true">#</a></h2><div class="language-json"><pre><code>
<span class="token punctuation">{</span>
    <span class="token property">&quot;username&quot;</span><span class="token operator">:</span> <span class="token string">&quot;juhani&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;addresses&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>

        <span class="token property">&quot;street&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Jokiv\xE4yl\xE4, 11&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;zip_code&quot;</span><span class="token operator">:</span> <span class="token number">96300</span><span class="token punctuation">,</span>
        <span class="token property">&quot;city&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Rovaniemi&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre></div><h3 id="subset-pattern" tabindex="-1">SUBSET PATTERN <a class="header-anchor" href="#subset-pattern" aria-hidden="true">#</a></h3><p>With the embedded document model there is a pontential problem of documents growing in size. Instead of fetching all the embedded documents, you can fetch only the once you need, ie. a subset of documents.</p><div class="info custom-block"><p class="custom-block-title">What to load</p><p>When considering what to load, the most visited parts of your data, should be loaded first</p></div><h4 id="trade-offs-of-subset-pattern" tabindex="-1">TRADE-OFFS OF SUBSET PATTERN <a class="header-anchor" href="#trade-offs-of-subset-pattern" aria-hidden="true">#</a></h4><p>Subset pattern can improve query performance by making smaller documents, but it can lead to data duplication</p><p>For example in a e-commerce platform, where you always want to show 10 newest reviews for each product. It might be a smart move to store reviews in a collection of their own and in addition to that keep store the then newest reviews for each product in products collections.</p><p>This makes querying 10 newest reviews faster, but you will need to maintain product reviews in two different collections</p><h2 id="modeling-with-relations" tabindex="-1">MODELING WITH RELATIONS <a class="header-anchor" href="#modeling-with-relations" aria-hidden="true">#</a></h2><div class="language-json"><pre><code>



<span class="token punctuation">{</span>
    <span class="token comment">// book</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;3wl4kj34&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;MongoDB&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;publisher_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;WSOY&quot;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">{</span>
    <span class="token comment">// publisher</span>
    <span class="token property">&quot;_id&quot;</span><span class="token operator">:</span> <span class="token string">&quot;WSOY&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;WSOY&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;founded&quot;</span><span class="token operator">:</span> <span class="token number">1900</span>
<span class="token punctuation">}</span>




</code></pre></div><h3 id="modeling-tree-structures" tabindex="-1">MODELING TREE STRUCTURES <a class="header-anchor" href="#modeling-tree-structures" aria-hidden="true">#</a></h3><h4 id="with-parent" tabindex="-1">WITH PARENT <a class="header-anchor" href="#with-parent" aria-hidden="true">#</a></h4><div class="language-json"><pre><code>
<span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Juhani&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;parent&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Heikki&quot;</span>
<span class="token punctuation">}</span>

<span class="token punctuation">{</span>

    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Heikki&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;parent&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span>
<span class="token punctuation">}</span>



</code></pre></div><h4 id="with-children" tabindex="-1">WITH CHILDREN <a class="header-anchor" href="#with-children" aria-hidden="true">#</a></h4><div class="language-json"><pre><code>

<span class="token punctuation">{</span>
    <span class="token property">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;Heikki&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;children&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;Jukka&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Juhani&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>

</code></pre></div><h3 id="aggregation-pipeline" tabindex="-1">AGGREGATION PIPELINE <a class="header-anchor" href="#aggregation-pipeline" aria-hidden="true">#</a></h3><p>Aggregation pipline consists of one or more stages</p><h4 id="stage" tabindex="-1">STAGE <a class="header-anchor" href="#stage" aria-hidden="true">#</a></h4><p>Stage in an aggregation pipeline is an operation and a pipeline has many of them</p><div class="info custom-block"><p class="custom-block-title">Stages</p><p>For more detailed list of pipeline stages, see here: <a href="https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#std-label-aggregation-pipeline-operator-reference" target="_blank" rel="noopener noreferrer">https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#std-label-aggregation-pipeline-operator-reference</a></p></div><table><thead><tr><th>Stage</th><th>Desc</th></tr></thead><tbody><tr><td>$addFields</td><td>You can add fields in every document in the result set for example based on another column in a document</td></tr><tr><td>$project</td><td>You can leave obsolete field out of the resutl set (I might be a good thing to not select _id fields, because aggregation leaves them out</td></tr><tr><td>$match</td><td>Can be used like WHERE in SQL query to filter out documents that you don&#39;t use</td></tr><tr><td>$group</td><td>Works like SQL GROUP BY. Needs a accumulative field for aggregatation </td></tr><tr><td>$avg</td><td>Calculates average based on the columns provided in $group stage</td></tr><tr><td>$sum</td><td>Can be used just like $avg in a group stage but instead of course calculates sum</td></tr></tbody></table><h3 id="about-stage-order" tabindex="-1">ABOUT STAGE ORDER <a class="header-anchor" href="#about-stage-order" aria-hidden="true">#</a></h3><p>SQL language is very strict about word ordering and the order of execution is not the same as the order of words in SQL clause. MongoDB aggregation pipeline stages are executed as they are ordered. For example if you only want to calculate AVG of a certain subset of documents, first, filter all the others out and then calculate AVG to more effective execution</p>`,116),l=[c];function i(r,u,d,k,h,m){return s(),a("div",null,l)}var y=n(p,[["render",i]]);export{f as __pageData,y as default};
