<%*
/* Templater snippet: insert protection anchor, stamp decision, and set option cap */
const title = tp.file.title || "Untitled";
const now = tp.date.now("YYYY-MM-DD HH:mm");
-%>
![[Mirror_Protection_Anchor_v2.1]]

**Decision stamp**
- actor: Paul
- time: <%- now %>
- file: <%- title %>

**Options**
- cap: 2
- default_pick: apply after 60s
