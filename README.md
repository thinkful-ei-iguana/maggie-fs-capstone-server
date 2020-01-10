# Street Beat

## Can you hear that?

...It's the sound of silence where your bandmates would usually be sidebarring in disorganized fashion with eachother about what the group plans to play at that evening's gig via various unconnected platforms 
and mediums (texting, Slacking, emailing, calling, etc). You're all connected on Street Beat now, and everyone knows the plan for the gig, because they're sharing access to Street Beat's setlist creator and archiver!

Street Beat is a site specifically designed for members of the international street band community - think guerrilla marching bands, a la New Orleans. On Street Beat, band members can sign up for an individual profile and use a private dashboard to manage the bands that they are in (pictured above).  

Each band's page displays the current bandmembers who are registered with Street Beat. The site allows users to manage and add to the group's repertoire, as well as build and save setlists designed with a duration counter that enables a user to see at an approximate glance whether or not the selected tunes measure up to the length of the gig or practice.
![Image - Street Beat setlist creator](imgs/createSetlist.png)

## So... check it out!

[Street Beat live app](https://street-beat.now.sh/ "Street Beat")

[GitHub repository (client)](https://github.com/thinkful-ei-iguana/maggie-fs-capstone-client "Street Beat client repo")

## More to come

This is merely version 1 of what will be a long-standing passion project. As a regularly gigging musician, I have myriad ideas for ways in which Street Beat can serve street band musicians across the world! Here are a few upcoming features that are in development (or soon to be):

*Band pages will be exclusive to those who are confirmed members (verified by an admin/owner in each band)
*Band pages will be a central place to keep useful resources that are typically decentralized (if they exist at all)
*Integration with/referencing to external resources (including bands' public websites, calendars, [gig-o-matic](https://gig-o-matic.appspot.com/ "The Gig-o"), ReverbNation, etc)
*Under consideration: Band page message interactivity, where members can post messages and customizations to their band dashboard

My priorities revolve around band-facing functionality, but I eventually intend to allow users to connect with other users outside of the band context. Ideas for this will be in continual development, but one such idea is a master calendar/events page to connect bands and festivals across the world.

## Technology used

**Front-End:** *ReactJS | CSS*

**Back-End:** *NodeJS | KnexJS | ExpressJS | PostgreSQL*

**Testing:** *Mocha | Chai*

## API Documentation

| **HTTP Verb** | **Path**                           | **Used for**         |
| --------- |:--------------------------------------:| --------------------:|
| POST      | /auth/login                            | login authorization  |
| POST      | /users                                 | create new user      |
| GET       | /bands                                 | search all bands     |
| POST      | /bands                                 | register band        |
| GET       | /bands/mybands                         | view user's bands    |
| GET       | /bands/:band_id                        | band dashboard       |
| GET       | /bands/:band_id/setlists               | view saved setlists  |
| POST      | /bands/:band_id/join                   | join a band          |
| GET       | /bands/:band_id/bandmembers            | view bandmembers     |
| GET       | /bands/:band_id/songs                  | view band repertoire |
| POST      | /bands/:band_id/songs                  | add new song         |
| GET       | /bands/:band_id/setlists/:setlist_id   | view saved setlist   |
| POST      | /bands/:band_id/setlists/create        | create new setlist   |
