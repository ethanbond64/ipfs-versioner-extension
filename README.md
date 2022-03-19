# IPFS Versioner
IPFS Versioner is a chrome extension that records the changes of static content on the web. The goal is to prevent misinformation and promote accountability on the web.

# IDEA

Problem >
Websites change, articles change. No good way to hold them accountable to what they say, no good way to see previous versions (or diffs)


Solution >
Use IPFS with a chrome extension so users can mark sites to be held accountable and to me checked against previous versions



# Planning
## Phase 1
Extension records versions by url
Client page catalogoues recorded urls/pages
## Phase 2
Add filecoin when submitting a page to incentivize persisting versions on the network
## Phase 3
Gamification with filecoin rewards paid back to those who record newer versions ?

# Brainstorming
What can webpages be keyed by? 
How do you ensure an accurate diff?
Restrict to certain sites and customize to specific patterns?
What about screenshots?

Could have the users highlight the article
Persisting the text will be less expensive
Then you can have future users highlight to check the diff

Decentralized DB for persistence

Table: records
- int ID unique pkey
- String url unique
- Time original_timestamp
- Text info ?
- int versions

Table: record_version_href
- int record_id pkey fkey
- int ipfs_address pkey
- Time created_at
