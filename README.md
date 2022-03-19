# IPFS Versioner
IPFS Versioner is a chrome extension that records the changes of static content on the web. The goal is to prevent misinformation and promote accountability on the web.

# How to use
1. Go to the extension directory in your terminal
2. run `npm run watch`
3. go to chrome://extensions/ and select load unpacked
4. Upload the contents from the extension/build/ directory

# IDEA

Problem >
Websites change, articles change. No good way to hold them accountable to what they say, no good way to see previous versions (or diffs)


Solution >
Use IPFS with a chrome extension so users can mark sites to be held accountable and to me checked against previous versions


## Inspiration

In today's current events, there is a lot of uncertainty about the information that is spread over the internet and its truthfulness. Oftentimes when I read an article I will share a link with my peers, and frequently by the time they open the link, the contents of the article have changed. Seemingly static content on the internet is constantly changing, and can cause lots of confusion. There are plenty of examples of news website "changing facts" and companies changing their policies in a way that you can't see what was there before

## What it does

IPFS Versioner sets out to solve this problem when using a desktop browser. It allows users to save versions of static webpages and compare the versions to each other (much like a git diff)

## How we built it

IPFS Versioner is a chrome extension, and the majority of the code lives in the extension directory. The chrome apis allow for message passing between scripts. which then read/write from IPFS to see the changes, and persist metadata about the versions in an OrbitDB, which is built on top of IPFS.

## Challenges we ran into

Learning how some of the chrome extension services worked with the IPFS client I was creating took a lot of trial and error, but overall a great learning experience.

## Accomplishments that we're proud of

I'm proud that I am able to load the extension bundle into chrome locally and actually use the extension as I browse

## What we learned

I've learned a lot about IPFS and the utilites that exist to work with it in projects

## What's next for IPFS Versioner

IPFS Versioner has a lot of potential, the next big milestone would be getting the extenstion to work with metamask so that users can make sure important versions are persisted on the network and could provide filecoin through the extension



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
