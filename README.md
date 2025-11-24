## Getting Started

```bash
npm i
npm run dev
```

# KEY POINTS

- `Responsive Layout`: with respect to any device size
- `Themes`: Light - Dark themes with ability to expand further
- `API Errors`: Handled all kind of api errors gracefully with centralized approach
- `Performance`: No performance degradation while showing large number of (thousands) records
- `Reusability`: Made sure to keep modular, self contained components, hooks, functions with ability to reuse. And ability to scale and expand further
- `Architecture`: Used clean and organized architecture so project can be scaled easily and manageable structure

# MAIN ROUTES

There will be 2 main pages

1. /overview
2. /sessions

# 1. USER-OVERVIEW

This page conatains

- Top Performers List
- Teams Avg. Scroe Bar Chart
- Users Table with filters
- Filters states are sync with URL, and can be restored on back and forward navigations
- Applying any filter will result in filtered data as per value on all three sections (i.e Top Performers List, Bar Chart, User Table)
- User Table Rows are draggable, clickable
- Clicking on any row will show dialog, with sync url state with dialog data id
- Clicking on User Table columns will sort the data of that columns in Asc, Desc and Default state
- Applied virtualization to the User Table to maintain the app performance and smooth scrolling while showing the large number of data

# 2. USER-SESSIONS

This page conatains

- Session Trends Line Chart with days (7 days, 30 days, 90 days) filter with sync state with URL, all api errors are handled gracefully here
- Then comes the Sessions Table: Paginated Data - fetches next page data like a infinite scroll
- Sessions table is also configured that way so it can show thousands of records without compromising performance, all api errors are handled gracefully like refetching and next page fetch fail
- Handled Table header visibility with some columns not allowed to hide/show
- All table rows are draggable with option to have simple table without draggable rows
- While clicking on row further shows details in dialog of specific session like transcript with thousands of data
- Showed large no. of list of transcript records with smooth scrolling and fast performance
- Handled Transcript api error with ability to refetch

```

```
